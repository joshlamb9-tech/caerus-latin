'use strict';

const SRS = (() => {
  const KEY = 'ce-latin-srs-v1';

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      // Safari private mode — silently continue
    }
  }

  // ── Supabase sync ──────────────────────────────────────────────
  let _syncClient = null;
  let _syncUserId = null;
  let _syncPending = {};
  let _syncTimer   = null;
  const SYNC_DEBOUNCE = 3000; // ms

  function initSync(client, userId) {
    _syncClient = client;
    _syncUserId = userId;
    // Load cloud state on first init
    _loadFromSupabase();
  }

  function _loadFromSupabase() {
    if (!_syncClient || !_syncUserId) return;
    _syncClient
      .from('user_progress')
      .select('word_id, score, correct, seen, last_seen')
      .eq('user_id', _syncUserId)
      .eq('product', 'latin')
      .then(function (result) {
        if (result.error || !result.data) return;
        const local = load();
        result.data.forEach(function (row) {
          const existing = local[row.word_id];
          // Cloud wins unless local has a higher score (offline progress)
          if (!existing || row.score >= (existing.score || 0)) {
            local[row.word_id] = {
              score:   row.score,
              correct: row.correct,
              seen:    row.seen,
              last:    row.last_seen,
            };
          }
        });
        save(local);
      });
  }

  function _queueSync(wordId, entry) {
    if (!_syncClient || !_syncUserId) return;
    _syncPending[wordId] = entry;
    clearTimeout(_syncTimer);
    _syncTimer = setTimeout(_flushSync, SYNC_DEBOUNCE);
  }

  function _flushSync() {
    if (!_syncClient || !_syncUserId || Object.keys(_syncPending).length === 0) return;
    const rows = Object.entries(_syncPending).map(function ([wordId, entry]) {
      return {
        user_id:   _syncUserId,
        product:   'latin',
        word_id:   wordId,
        score:     entry.score   || 0,
        correct:   entry.correct || 0,
        seen:      entry.seen    || 0,
        last_seen: entry.last    || null,
        updated_at: new Date().toISOString(),
      };
    });
    _syncPending = {};
    _syncClient
      .from('user_progress')
      .upsert(rows, { onConflict: 'user_id,product,word_id' })
      .then(function (result) {
        if (result.error) console.warn('SRS sync error:', result.error.message);
      });
  }
  // ──────────────────────────────────────────────────────────────

  // wordId: string (matches vocabulary all.json id field)
  // rating: 'know' | 'learning' | 'dont-know'
  function rate(wordId, rating) {
    const state = load();
    const entry = state[wordId] || { score: 0, correct: 0, seen: 0 };
    entry.seen = (entry.seen || 0) + 1;
    entry.last = Date.now();

    if (rating === 'know') {
      entry.correct = (entry.correct || 0) + 1;
      entry.score = Math.min((entry.score || 0) + 1, 4);
    } else if (rating === 'learning') {
      entry.score = Math.max((entry.score || 0), 1); // at least seen once
    } else {
      // dont-know: reset score but keep history
      entry.score = 0;
    }

    state[wordId] = entry;
    save(state);
    _queueSync(wordId, entry);
    return entry;
  }

  // Returns mastery level string for a wordId
  function level(wordId) {
    const state = load();
    const entry = state[wordId];
    if (!entry) return 'new';
    if (entry.score >= 3) return 'mastered';
    if (entry.score >= 1) return 'learning';
    return 'new';
  }

  // Returns { new, learning, mastered, total } counts for an array of wordIds
  function summary(wordIds) {
    const counts = { new: 0, learning: 0, mastered: 0, total: wordIds.length };
    wordIds.forEach(id => {
      counts[level(id)]++;
    });
    return counts;
  }

  // Sort words: unmastered first, prioritise low-score words
  function prioritise(words) {
    const state = load();
    return [...words].sort((a, b) => {
      const sa = (state[a.id] || {}).score || 0;
      const sb = (state[b.id] || {}).score || 0;
      return sa - sb; // lowest score first
    });
  }

  // Return words filtered to only those below mastery threshold
  function unmastered(words) {
    return words.filter(w => level(w.id) !== 'mastered');
  }

  function reset(wordIds) {
    const state = load();
    (wordIds || []).forEach(id => { delete state[id]; });
    save(state);
  }

  function resetAll() {
    save({});
  }

  // Listen for auth context from login wall
  document.addEventListener('cr-auth', function (e) {
    initSync(e.detail.client, e.detail.userId);
  });

  // Also pick up auth context if already set before srs.js loaded
  if (window.CR_AUTH) {
    initSync(window.CR_AUTH.client, window.CR_AUTH.userId);
  }

  return { rate, level, summary, prioritise, unmastered, reset, resetAll, load, initSync };
})();
