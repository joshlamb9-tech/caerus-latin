# Phase 5: Translation Practice - Context

**Gathered:** 2026-03-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a practice passage library (6–8 tagged unseen Latin passages with model translations) and English-to-Latin composition sets (10 sets × 3 sentences with model answers). Students can filter passages by topic/difficulty and self-assess against provided translations. No automated marking — translation is open-ended.

</domain>

<decisions>
## Implementation Decisions

### Passage interaction model
- Student sees the full Latin passage with line numbers and vocabulary help notes (glossed words that may not be in DVL)
- Below the passage: a "Show translation" button reveals the model translation
- Translation displayed paragraph-by-paragraph below the Latin (not side-by-side — too cramped on mobile)
- No typing or submission — self-assessment against model translation (matches J282 exam format where translation is handwritten)
- Key phrases in the model translation highlighted to show where marks would fall

### English-to-Latin format
- Single page: `gcse/translation/english-to-latin.html`
- 10 sets displayed as expandable cards/sections on one page
- Each set has 3 English sentences with individual "Show answer" reveal buttons for the Latin model answer
- Sets organised by grammar topic (e.g. "Set 1: Passive voice", "Set 3: Purpose clauses") so students can target weak areas
- Mark scheme notes per sentence explaining the key constructions expected (e.g. "requires purpose clause with ut + subjunctive")

### Passage library page
- Single page: `gcse/translation/passages.html` (or `gcse/translation/index.html` serving as the translation hub)
- Filter bar at top with clickable tag buttons (not a dropdown) for topic and difficulty
- Topic tags: mythology, military, daily life, historical narrative, religion (derived from passage content)
- Difficulty tags: Foundation / Higher (matching J282 tier language)
- "All" button to reset filters
- Each passage card shows: title, difficulty badge, topic tags, word count, brief description
- Clicking a passage card expands or navigates to the full passage view

### Answer checking approach
- Self-mark against model translation — no automated scoring
- Model translation provided with key phrases highlighted (bold or coloured) showing where marks would fall
- For English-to-Latin: model answer + mark scheme notes showing required constructions
- No scoring system — students compare their attempt against the model (matches real exam marking approach)

### Data strategy
- Passage data: `data/passages/` directory, one JSON file per passage (e.g. `data/passages/gcse-passage-01.json`)
- Passage JSON schema: `id`, `title`, `difficulty`, `topics[]`, `word_count`, `description`, `latin_text` (with line numbers), `vocabulary_notes[]`, `model_translation`, `key_phrases[]`
- English-to-Latin data: `data/exercises/gcse-english-to-latin.json` — array of 10 sets, each with `set_number`, `topic`, `sentences[]` (each: `english`, `latin_answer`, `mark_scheme_note`)
- All Latin text uses macron accents throughout (consistent with all prior data files)

### Hub integration
- GCSE hub (`gcse/index.html`) gets a 'Translation Practice' card linking to a translation landing page or directly to the passage library
- Translation landing page (`gcse/translation/index.html`) could serve as a mini-hub with two sections: "Unseen Passages" and "English to Latin"
- Replace any coming-soon placeholder for translation content

### Claude's Discretion
- Whether passages live on separate pages or expand inline on the library page
- Exact passage content (Latin text, translations) — correctness and exam-level difficulty are what matter
- Visual design of the filter bar and passage cards
- Whether the translation hub is a separate page or if passages.html serves as the hub
- Vocabulary help note styling (tooltip, footnote, or inline gloss)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Auth guard and page patterns
- `gcse/syntax/index.html` — Most recent hub-style page with teaser pattern for non-subscribers; translation hub follows same approach
- `gcse/syntax/participles.html` — Auth-gated content page with exercises; use as template for passage pages

### Exercise and data patterns
- `data/exercises/gcse-indirect-statement.json` — MCQ exercise schema reference (for understanding existing data patterns)
- `data/exercises/gap-fill.json` — CE gap-fill schema (existing exercise format reference)

### Style and nav
- `css/style.css` — All existing styles; extend only
- `gcse/index.html` — Hub page with card pattern and count badges

### Project constraints
- `.planning/PROJECT.md` — Tech stack: plain HTML/CSS/JS, EB Garamond + Playfair Display, no build system
- `.planning/REQUIREMENTS.md` — TRANS-01, TRANS-02 acceptance criteria

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Auth guard inline script (from `gcse/syntax/*.html`): copy-paste verbatim for `gcse/translation/*.html` pages
- Exam Tip callout CSS (`.exam-tip`): reuse for mark scheme notes styling
- Grammar table CSS (`.grammar-table`): reuse for vocabulary help tables if needed
- Hub card pattern from `gcse/index.html`: reuse for translation card addition
- Filter button pattern: new for this phase — no existing filter UI, but tag-based filtering is straightforward vanilla JS

### Established Patterns
- Every page is standalone HTML — no templating, no build step
- Auth guard hides entire body until access_grants check resolves
- `window.CR_AUTH` and `cr-auth` custom event signal auth completion
- Relative paths from `gcse/translation/`: `../../css/style.css`, `../../data/...`, `../../login.html`
- JSON data files fetched via `fetch()` — same pattern as exercise files

### Integration Points
- New subdirectory `gcse/translation/` — same depth as `gcse/syntax/` and `gcse/grammar/`
- `gcse/index.html` hub: add Translation Practice card (replace coming-soon if present)
- New `data/passages/` directory for passage JSON files
- `data/exercises/gcse-english-to-latin.json` for composition sets

</code_context>

<specifics>
## Specific Ideas

- Passages should be at genuine J282 unseen-level difficulty — not simplified. Use authentic-style Latin with appropriate vocabulary range.
- English-to-Latin sets should target specific constructions so students can practise their weak points (not random sentences)
- Vocabulary help notes on passages cover words NOT in the DVL — mimics the exam paper's glossary
- Key phrase highlighting in model translations helps students understand where marks are awarded (J282 marking rewards specific phrases, not general sense)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 05-translation-practice*
*Context gathered: 2026-03-25*
