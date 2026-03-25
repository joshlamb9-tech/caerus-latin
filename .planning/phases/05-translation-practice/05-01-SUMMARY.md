---
phase: 05-translation-practice
plan: 01
subsystem: content-data
tags: [json, latin, gcse, j282, passages, translation, composition]

# Dependency graph
requires:
  - phase: 04-syntax
    provides: syntax exercise data file patterns (gap-fill.json, indirect-statement.json schemas)
provides:
  - 8 unseen Latin passage JSON files covering Foundation and Higher tiers
  - 10 English-to-Latin composition sets with model answers and mark scheme notes
  - data/passages/ directory for all passage content
affects: [05-02-translation-ui, gcse/translation/passages.html, gcse/translation/english-to-latin.html]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Passage JSON schema: id, title, difficulty, topics, word_count, description, latin_text (line-numbered), vocabulary_notes, model_translation (paragraph-numbered), key_phrases
    - Composition set JSON schema: set_number, topic, sentences (english, latin_answer, mark_scheme_note)
    - vocabulary_notes covers only non-DVL words — mimics J282 exam paper glossary
    - key_phrases array identifies mark-scoring phrases in model translations

key-files:
  created:
    - data/passages/gcse-passage-01.json
    - data/passages/gcse-passage-02.json
    - data/passages/gcse-passage-03.json
    - data/passages/gcse-passage-04.json
    - data/passages/gcse-passage-05.json
    - data/passages/gcse-passage-06.json
    - data/passages/gcse-passage-07.json
    - data/passages/gcse-passage-08.json
    - data/exercises/gcse-english-to-latin.json
  modified: []

key-decisions:
  - "Passage latin_text uses line-numbered array entries — enables line-by-line display in UI and mirrors J282 exam paper format"
  - "model_translation uses paragraph-numbered array — supports paragraph-by-paragraph reveal in UI (decided in 05-CONTEXT.md)"
  - "vocabulary_notes limited to non-DVL words only — mirrors exam paper glossary convention, avoids teaching vocabulary already covered in Phase 2"
  - "key_phrases extracted as a separate top-level array — UI can use these to highlight mark-scoring phrases in model translation"
  - "English-to-Latin sets ordered pedagogically, not randomly — students can target specific weak construction areas"
  - "mark_scheme_note per sentence (not per set) — examiner-level specificity for each construction"

patterns-established:
  - "Passage JSON schema: established in this plan — all future passage data must follow exactly"
  - "Composition set JSON schema: established in this plan — english-to-latin format fixed for plan 02 UI consumption"

requirements-completed: [TRANS-01, TRANS-02]

# Metrics
duration: 5min
completed: 2026-03-25
---

# Phase 5 Plan 01: Translation Practice Data Summary

**9 JSON content files for GCSE translation practice: 8 Foundation/Higher unseen Latin passages and 10 English-to-Latin composition sets covering all major J282 constructions**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-25T15:45:38Z
- **Completed:** 2026-03-25T15:50:21Z
- **Tasks:** 2
- **Files created:** 9

## Accomplishments
- Created `data/passages/` directory with 8 passage JSON files at authentic J282 exam difficulty
- 4 Foundation passages (Troy, Roman Baths, Hannibal, Roman Wedding) with 50-65 words each
- 4 Higher passages (Caesar, Cyclops, Masada, Vestal Virgins) with 79-88 words each, including ablative absolutes, subjunctive constructions, indirect speech
- Created `data/exercises/gcse-english-to-latin.json` with 10 sets x 3 sentences = 30 composition exercises
- All 9 files validated — parse without error, all required schema fields present

## Task Commits

Each task was committed atomically:

1. **Task 1: Create 8 unseen passage JSON files** - `83bb371` (feat)
2. **Task 2: Create English-to-Latin composition sets JSON** - `c445f83` (feat)

## Files Created/Modified
- `data/passages/gcse-passage-01.json` - "The Fall of Troy" — mythology, Foundation, 63 words
- `data/passages/gcse-passage-02.json` - "A Day at the Baths" — daily life, Foundation, 60 words
- `data/passages/gcse-passage-03.json` - "Hannibal Crosses the Alps" — military, Foundation, 65 words
- `data/passages/gcse-passage-04.json` - "A Roman Wedding" — daily life, Foundation, 62 words
- `data/passages/gcse-passage-05.json` - "The Death of Caesar" — historical narrative, Higher, 85 words
- `data/passages/gcse-passage-06.json` - "Odysseus and the Cyclops" — mythology, Higher, 88 words
- `data/passages/gcse-passage-07.json` - "The Siege of Masada" — military, Higher, 82 words
- `data/passages/gcse-passage-08.json` - "The Vestal Virgins" — religion, Higher, 79 words
- `data/exercises/gcse-english-to-latin.json` - 10 composition sets, 30 sentences total

## Decisions Made
- Passage `latin_text` entries numbered by line (not paragraph) to mirror how J282 exam papers present unseen passages
- `vocabulary_notes` restricted to non-DVL words only — replicates the exam paper glossary convention
- `key_phrases` array makes mark-scoring phrases explicit — plan 02 UI can highlight these in model translations
- `mark_scheme_note` is per sentence (not per topic set) for precise examiner-level guidance
- Composition sets ordered by construction type so students can target weak areas

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None — no external service configuration required.

## Next Phase Readiness
- All 9 data files ready for consumption by plan 02 (UI pages)
- `gcse/translation/passages.html` can `fetch()` from `data/passages/gcse-passage-0*.json`
- `gcse/translation/english-to-latin.html` can `fetch()` from `data/exercises/gcse-english-to-latin.json`
- Schema is fully defined — plan 02 can build UI against it without data changes

---
*Phase: 05-translation-practice*
*Completed: 2026-03-25*
