'use strict';

// ============================================================
// GCSE Vocabulary — browse, filter, flashcard, speed-recall
// Standalone file — no imports, no external dependencies.
// Loaded by gcse/vocabulary.html; fetches ../data/vocabulary/all.json
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var mode   = params.get('mode');
  var app    = document.getElementById('app');

  fetch('../data/vocabulary/all.json')
    .then(function (r) { if (!r.ok) throw new Error('vocab load failed'); return r.json(); })
    .then(function (allWords) {
      var words = applyFilters(allWords, params);
      if (mode === 'flashcard')    return runFlashcard(app, words, params);
      if (mode === 'speed-recall') return runSpeedRecall(app, words, params);
      return renderBrowse(app, words, allWords, params);
    })
    .catch(function () {
      app.innerHTML = '<p class="error">Could not load vocabulary. Please reload.</p>';
    });
});

// ============================================================
// Filter logic
// ============================================================

function applyFilters(words, params) {
  var result = words;

  if (params.get('gcse') === '1') {
    result = result.filter(function (w) { return w.gcse_only === true; });
  }

  var pos = params.get('pos');
  if (pos === 'other') {
    result = result.filter(function (w) {
      return ['preposition', 'conjunction', 'numeral', 'pronoun'].indexOf(w.part_of_speech) !== -1;
    });
  } else if (pos) {
    result = result.filter(function (w) { return w.part_of_speech === pos; });
  }

  return result;
}

// ============================================================
// Browse mode
// ============================================================

function renderBrowse(app, words, allWords, params) {
  app.innerHTML = '';

  var h1 = el('h1', {}, 'GCSE Vocabulary');
  app.appendChild(h1);

  // Filter nav
  app.appendChild(renderFilterNav(params));

  // Count line
  var gcseOnly  = allWords.filter(function (w) { return w.gcse_only === true; }).length;
  var ceWords   = allWords.length - gcseOnly;
  var countEl   = el('p', { className: 'vocab-count' });
  var noFilter  = !params.get('gcse') && !params.get('pos');
  if (noFilter) {
    countEl.textContent = ceWords + ' CE + ' + gcseOnly + ' GCSE-new — ' + allWords.length + ' total';
  } else {
    countEl.textContent = words.length + ' word' + (words.length !== 1 ? 's' : '');
  }
  app.appendChild(countEl);

  // Empty state
  if (words.length === 0) {
    app.appendChild(el('p', { className: 'vocab-empty' }, 'No words found for this filter.'));
    return;
  }

  // Word list
  var list = el('div', { className: 'vocab-list' });
  words.forEach(function (word) { list.appendChild(renderWordItem(word)); });
  app.appendChild(list);
}

function renderFilterNav(params) {
  var gcseActive = params.get('gcse') === '1';
  var posActive  = params.get('pos');
  var nav = el('nav', { className: 'vocab-filters' });

  // ── Filter section ────────────────────────────────────────
  addSectionLabel(nav, 'Filter');
  addFilterLink(nav, 'All words',      'vocabulary.html',      !gcseActive && !posActive);
  addFilterLink(nav, 'GCSE-new only',  'vocabulary.html?gcse=1', gcseActive);

  // ── By Part of Speech ─────────────────────────────────────
  addSectionLabel(nav, 'By Part of Speech');
  var baseParams = gcseActive ? '?gcse=1&pos=' : '?pos=';
  addFilterLink(nav, 'Nouns',       'vocabulary.html' + baseParams + 'noun',       posActive === 'noun');
  addFilterLink(nav, 'Verbs',       'vocabulary.html' + baseParams + 'verb',       posActive === 'verb');
  addFilterLink(nav, 'Adjectives',  'vocabulary.html' + baseParams + 'adjective',  posActive === 'adjective');
  addFilterLink(nav, 'Adverbs',     'vocabulary.html' + baseParams + 'adverb',     posActive === 'adverb');
  addFilterLink(nav, 'Other',       'vocabulary.html' + baseParams + 'other',      posActive === 'other');

  // ── Drill this list ───────────────────────────────────────
  addSectionLabel(nav, 'Drill this list');
  var search = window.location.search;
  var sep = search ? '&' : '?';
  // Strip any existing mode param from current search before appending
  var baseSearch = search.replace(/[?&]mode=[^&]*/g, '');
  var drillBase = 'vocabulary.html' + baseSearch;
  var modeSep   = baseSearch ? '&' : '?';
  addFilterLink(nav, 'Flashcards',   drillBase + modeSep + 'mode=flashcard',    false);
  addFilterLink(nav, 'Speed recall', drillBase + modeSep + 'mode=speed-recall', false);

  return nav;
}

function addSectionLabel(nav, text) {
  var span = el('span', { className: 'vocab-filter-label' }, text);
  nav.appendChild(span);
}

function addFilterLink(nav, label, href, isActive) {
  var a = el('a', { className: 'vocab-filter-link' + (isActive ? ' active' : ''), href: href }, label);
  nav.appendChild(a);
}

function renderWordItem(word) {
  var div = el('div', { className: 'vocab-item' });

  div.appendChild(el('span', { className: 'vocab-latin' },   buildLatinDisplay(word)));
  div.appendChild(el('span', { className: 'vocab-english' }, word.english));
  div.appendChild(el('span', { className: 'vocab-meta' },    buildMeta(word)));

  var level = el('span', { className: 'vocab-level vocab-level--' + (word.level || 2) }, 'L' + (word.level || 2));
  div.appendChild(level);

  if (word.gcse_only) {
    var badge = el('span', { className: 'nav-gcse-badge' }, 'GCSE');
    badge.style.fontSize  = '0.7rem';
    badge.style.padding   = '2px 7px';
    div.appendChild(badge);
  }

  return div;
}

// ============================================================
// Flashcard mode
// ============================================================

function runFlashcard(app, words, params) {
  if (words.length === 0) {
    app.innerHTML = '<h1>Flashcards</h1><p>No words match this filter.</p><a class="btn" href="vocabulary.html">Back to Vocabulary</a>';
    return;
  }

  var deck    = shuffle(words.slice());
  var index   = 0;
  var correct = 0;
  var wrong   = 0;

  function render() {
    if (index >= deck.length) {
      renderFlashcardEnd(app, correct, wrong, params);
      return;
    }

    var word = deck[index];
    app.innerHTML = '';

    var header = el('div', { className: 'ex-header' });
    header.appendChild(el('h1', {}, 'GCSE Flashcards'));
    header.appendChild(el('p', { className: 'ex-progress' }, (index + 1) + ' / ' + deck.length));
    app.appendChild(header);

    var card  = el('div', { id: 'gcse-fc-card', className: 'ex-card flashcard' });
    var front = el('div', { className: 'flashcard-front' });
    front.appendChild(el('span', { className: 'flashcard-latin' }, word.latin));

    var revealBtn = el('button', { className: 'btn btn-secondary flashcard-reveal-btn' }, 'Tap to reveal');
    front.appendChild(revealBtn);
    card.appendChild(front);

    var back = el('div', { className: 'flashcard-back' });
    back.style.display = 'none';
    back.appendChild(el('span', { className: 'flashcard-english' }, word.english));
    back.appendChild(el('span', { className: 'flashcard-meta' }, buildMeta(word)));

    // Principal parts for verbs
    if (word.part_of_speech === 'verb' && Array.isArray(word.principal_parts)) {
      var pp = word.principal_parts.filter(function (p) { return p !== null && p !== undefined && p !== ''; });
      if (pp.length > 0) {
        var ppSpan = el('span', { className: 'flashcard-meta' }, pp.join(', '));
        ppSpan.style.fontStyle = 'italic';
        back.appendChild(ppSpan);
      }
    }

    var actions = el('div', { className: 'flashcard-actions' });
    var wrongBtn = el('button', { id: 'gcse-fc-wrong', className: 'btn btn-secondary' }, 'Got it wrong');
    var rightBtn = el('button', { id: 'gcse-fc-right', className: 'btn' }, 'Got it right');
    actions.appendChild(wrongBtn);
    actions.appendChild(rightBtn);
    back.appendChild(actions);
    card.appendChild(back);
    app.appendChild(card);

    var progress = el('p', {}, (index + 1) + ' / ' + deck.length);
    progress.style.textAlign = 'center';
    progress.style.color     = '#666';
    app.appendChild(progress);

    // Reveal handler
    function reveal() {
      front.style.display = 'none';
      back.style.display  = '';
    }
    revealBtn.addEventListener('click', reveal);
    card.addEventListener('click', function (e) {
      if (e.target.tagName !== 'BUTTON') reveal();
    });

    wrongBtn.addEventListener('click', function () { wrong++;  index++; render(); });
    rightBtn.addEventListener('click', function () { correct++; index++; render(); });
  }

  render();
}

function renderFlashcardEnd(app, correct, wrong, params) {
  var total = correct + wrong;
  app.innerHTML = '';
  app.appendChild(el('h1', {}, 'Session complete'));
  app.appendChild(el('p', { className: 'ex-score-big' }, correct + ' / ' + total + ' correct'));

  if (correct === total) {
    app.appendChild(el('p', { className: 'ex-feedback-positive' }, 'Excellent — you knew every word in this session.'));
  } else if (correct >= total * 0.7) {
    app.appendChild(el('p', { className: 'ex-feedback-positive' }, 'Good session. The ' + wrong + ' you missed will come back first next time.'));
  } else {
    app.appendChild(el('p', { className: 'ex-feedback-neutral' }, 'Keep going — those ' + wrong + ' words need more practice.'));
  }

  var goAgainHref = buildGoAgainUrl(params);
  var actions = el('div', { className: 'ex-actions' });
  actions.appendChild(el('a', { className: 'btn', href: goAgainHref }, 'Go again'));
  actions.appendChild(el('a', { className: 'btn btn-secondary', href: 'vocabulary.html' + stripMode(params) }, 'Back to list'));
  app.appendChild(actions);
}

// ============================================================
// Speed-recall mode
// ============================================================

function runSpeedRecall(app, words, params) {
  if (words.length === 0) {
    app.innerHTML = '<h1>Speed Recall</h1><p>No words match this filter.</p><a class="btn" href="vocabulary.html">Back to Vocabulary</a>';
    return;
  }

  var deck  = shuffle(words.slice());
  var index = 0;
  var seen  = 0;
  var timer = null;
  var countdown = 4;

  function renderCard() {
    if (index >= deck.length) {
      renderSpeedRecallEnd(app, seen, params);
      return;
    }

    var word = deck[index];
    app.innerHTML = '';

    var header = el('div', { className: 'ex-header' });
    header.appendChild(el('h1', {}, 'Speed Recall'));
    header.appendChild(el('p', { className: 'ex-progress' }, (index + 1) + ' / ' + deck.length));
    app.appendChild(header);

    var countdownEl = el('p', { id: 'sr-countdown' }, countdown + '...');
    countdownEl.style.textAlign  = 'center';
    countdownEl.style.fontSize   = '2rem';
    countdownEl.style.color      = '#c9a84c';
    countdownEl.style.fontWeight = '700';
    app.appendChild(countdownEl);

    var wordEl = el('div', { className: 'ex-card' });
    wordEl.style.textAlign = 'center';
    wordEl.style.padding   = '2rem';
    var latinEl = el('span', { className: 'flashcard-latin' }, word.latin);
    wordEl.appendChild(latinEl);

    var tapHint = el('p', {}, 'Tap to reveal');
    tapHint.style.color    = '#999';
    tapHint.style.fontSize = '0.9rem';
    tapHint.style.marginTop = '1rem';
    wordEl.appendChild(tapHint);
    app.appendChild(wordEl);

    countdown = 4;
    if (timer) clearInterval(timer);
    timer = setInterval(function () {
      countdown--;
      var el_ = document.getElementById('sr-countdown');
      if (el_) el_.textContent = countdown > 0 ? countdown + '...' : 'Time!';
      if (countdown <= 0) {
        clearInterval(timer);
        timer = null;
        revealAnswer(word);
      }
    }, 1000);

    wordEl.addEventListener('click', function () {
      if (timer) { clearInterval(timer); timer = null; }
      revealAnswer(word);
    });
  }

  function revealAnswer(word) {
    seen++;
    app.innerHTML = '';

    var revealCard = el('div', { className: 'ex-card' });
    revealCard.style.textAlign = 'center';
    revealCard.style.padding   = '2rem';
    revealCard.appendChild(el('span', { className: 'flashcard-latin' },   word.latin));
    revealCard.appendChild(el('span', { className: 'flashcard-english' }, word.english));
    revealCard.appendChild(el('span', { className: 'flashcard-meta' },    buildMeta(word)));
    app.appendChild(revealCard);

    setTimeout(function () {
      index++;
      countdown = 4;
      renderCard();
    }, 1500);
  }

  renderCard();
}

function renderSpeedRecallEnd(app, seen, params) {
  app.innerHTML = '';
  app.appendChild(el('h1', {}, 'Speed Recall complete'));
  app.appendChild(el('p', { className: 'ex-score-big' }, seen + ' words seen'));

  var goAgainHref = buildGoAgainUrl(params);
  var actions = el('div', { className: 'ex-actions' });
  actions.appendChild(el('a', { className: 'btn', href: goAgainHref }, 'Go again'));
  actions.appendChild(el('a', { className: 'btn btn-secondary', href: 'vocabulary.html' + stripMode(params) }, 'Back to list'));
  app.appendChild(actions);
}

// ============================================================
// Helpers
// ============================================================

function buildLatinDisplay(word) {
  if (word.part_of_speech === 'noun' && word.genitive) {
    return word.latin + ', ' + word.genitive;
  }
  return word.latin;
}

function buildMeta(word) {
  var pos = word.part_of_speech;
  if (pos === 'noun') {
    var genderMap = { m: 'masc.', f: 'fem.', n: 'neut.' };
    var g = genderMap[word.gender] || word.gender || '';
    return g + (g ? ' \u00b7 ' : '') + ordinal(word.declension) + ' decl.';
  }
  if (pos === 'verb') {
    return word.conjugation ? ordinal(word.conjugation) + ' conj.' : 'irreg.';
  }
  return pos;
}

function ordinal(n) {
  return ['', '1st', '2nd', '3rd', '4th', '5th'][n] || (n + 'th');
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }
  return arr;
}

/** Return the current search string stripped of any mode= param */
function stripMode(params) {
  var p = new URLSearchParams(params.toString());
  p.delete('mode');
  var s = p.toString();
  return s ? '?' + s : '';
}

function buildGoAgainUrl(params) {
  return 'vocabulary.html' + (params.toString() ? '?' + params.toString() : '');
}

function el(tag, props, text) {
  var node = document.createElement(tag);
  if (props) {
    if (props.className) node.className = props.className;
    if (props.id)        node.id        = props.id;
    if (props.href)      node.href      = props.href;
    if (props.style)     node.style.cssText = props.style;
  }
  if (text !== undefined) node.textContent = text;
  return node;
}
