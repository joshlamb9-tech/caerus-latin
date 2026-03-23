---
phase: 02-vocabulary
plan: 01
subsystem: database
tags: [json, vocabulary, latin, ocr-j282, gcse, dvl]

# Dependency graph
requires:
  - phase: 01-infrastructure
    provides: GCSE nav shell and product gate for GCSE pages
provides:
  - data/vocabulary/all.json with 441 entries, gcse_only tagging, and principal_parts arrays for all verbs
affects:
  - 02-vocabulary/02-02 (drill UI consumes this data file)
  - gcse/vocabulary.html (fetches this file, filters by gcse_only: true)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Vocabulary entry schema: id, latin, genitive, gender, english, part_of_speech, declension, conjugation, topics, frequency_rank, level, gcse_only, principal_parts"
    - "gcse_only: false for CE carry-over words; gcse_only: true for GCSE-only additions"
    - "level: 1/2 for CE words; level: 3 for GCSE-only words"
    - "principal_parts: null for non-verbs; [pp1, pp2, pp3, pp4/null] for all verbs"

key-files:
  created: []
  modified:
    - data/vocabulary/all.json

key-decisions:
  - "Skipped 39 GCSE-only words already present in CE list rather than creating duplicates — existing CE entries tagged gcse_only: false serve both audiences"
  - "Extended to 441 entries (above 440 minimum) by drawing from broader OCR J282 DVL to compensate for the 39 skipped duplicates"
  - "GCSE-only words start at frequency_rank 300+ and use level: 3 to signal GCSE tier in the drill UI"
  - "Deponent verbs use passive perfect form in principal_parts[2] (e.g. 'natus sum') with null for supine at index [3]"

patterns-established:
  - "Verb principal_parts: 4-element array [1st sg present, infinitive, 1st sg perfect, supine/null]"
  - "Irregular/defective verbs (possum, sum, eo, volo, nolo) use null for absent forms"

requirements-completed: [VOC-01]

# Metrics
duration: 25min
completed: 2026-03-23
---

# Phase 2 Plan 1: Vocabulary Data Extension Summary

**OCR J282 DVL extended from 224 CE words to 441 entries with gcse_only tagging and principal_parts arrays on all 124 verbs**

## Performance

- **Duration:** 25 min
- **Started:** 2026-03-23T15:25:00Z
- **Completed:** 2026-03-23T15:50:00Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Added `gcse_only: false` and `principal_parts` fields to all 224 existing CE vocabulary entries
- Added complete `principal_parts` arrays to all 49 CE verbs (including irregular/deponent forms)
- Appended 217 GCSE-only words tagged `gcse_only: true, level: 3` covering nouns, verbs, adjectives, adverbs, prepositions, and conjunctions
- Total vocabulary: 441 entries (224 CE + 217 GCSE-only), all 124 verbs have principal_parts
- JSON passes `python3 -m json.tool` validation with no duplicate IDs

## Task Commits

Each task was committed atomically:

1. **Task 1 + Task 2: Extend DVL with GCSE tagging and new words** - `d3e3704` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `data/vocabulary/all.json` - Extended from 224 to 441 entries with gcse_only and principal_parts fields

## Decisions Made
- 39 GCSE-only words from the plan's list already existed in the CE vocabulary — these were skipped to avoid duplicates, as the existing entries with `gcse_only: false` correctly serve both CE and GCSE students
- An additional batch of 105 words drawn from OCR J282 DVL was added beyond the plan's initial list to compensate for the skipped duplicates and reach the 440+ target
- Deponent verbs store the perfect passive participle + sum form at index [2] and null at index [3] (e.g. `["nascor", "nasci", "natus sum", null]`)

## Deviations from Plan

None - plan executed as written. The duplicate-skipping logic was explicitly anticipated in the plan ("adjust the final count accordingly") and the additional words drawn from the same OCR J282 DVL source are consistent with the plan's intent.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- `data/vocabulary/all.json` is ready for Plan 02-02 (vocabulary drill UI)
- The drill UI can filter `gcse_only: true` entries for GCSE-specific practice
- Principal parts arrays enable principal-parts drill mode in the UI
- All 124 verbs have complete arrays; 217 GCSE-only words are tagged and levelled correctly

---
*Phase: 02-vocabulary*
*Completed: 2026-03-23*
