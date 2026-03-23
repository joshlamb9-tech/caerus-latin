---
phase: 03-grammar-accidence
plan: "01"
subsystem: data
tags: [json, latin, grammar, gcse, paradigms, exercises]

# Dependency graph
requires:
  - phase: 02-vocabulary
    provides: gap-fill.json schema and exercise data pattern used by all exercise files
provides:
  - "data/grammar/gcse-nouns.json — 4th and 5th declension paradigm tables"
  - "data/grammar/gcse-verbs.json — passive, subjunctive, and deponent verb paradigm tables"
  - "data/exercises/gcse-declensions.json — 9 MCQ questions on 4th/5th declension"
  - "data/exercises/gcse-passive.json — 10 MCQ questions on passive voice"
  - "data/exercises/gcse-subjunctive.json — 10 MCQ questions on subjunctive"
  - "data/exercises/gcse-deponents.json — 9 MCQ questions on deponent verbs"
  - "data/exercises/gcse-gerunds.json — 9 MCQ questions on gerunds/gerundives"
  - "data/exercises/gcse-pronouns.json — 10 MCQ questions on hic, ille, qui, ipse"
affects:
  - 03-02 (grammar pages fetch these data files)
  - 03-03 (grammar hub page links to all grammar pages)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "gcse-nouns.json follows same outer schema as nouns.json (declensions array) but adds macron forms and 4th/5th declension entries"
    - "gcse-verbs.json extends verbs.json schema with voice/mood fields per tense and deponent: true flag"
    - "All exercise files follow gap-fill.json schema exactly: 7 required fields per question"

key-files:
  created:
    - data/grammar/gcse-nouns.json
    - data/grammar/gcse-verbs.json
    - data/exercises/gcse-declensions.json
    - data/exercises/gcse-passive.json
    - data/exercises/gcse-subjunctive.json
    - data/exercises/gcse-deponents.json
    - data/exercises/gcse-gerunds.json
    - data/exercises/gcse-pronouns.json
  modified: []

key-decisions:
  - "gcse-verbs.json organises tenses into 3 conjugation groups (passive indicative, subjunctive, deponent) rather than per-conjugation — matches the GCSE teaching structure"
  - "Each tense in gcse-verbs.json carries explicit voice and mood fields to support page-level filtering without client-side parsing"
  - "gcse-ger-06 corrected during authoring: 'librī legendī sunt' not 'legenda sunt' — gerundive must agree with librī (masc. pl.)"

patterns-established:
  - "Grammar paradigm files: outer key matches CE schema (declensions / conjugations array), GCSE-specific fields added inline"
  - "Exercise files: always arrays, always 9–11 items, always all 7 gap-fill fields, macron Latin throughout"

requirements-completed: [GRAM-01, GRAM-02, GRAM-03, GRAM-04, GRAM-05, GRAM-06]

# Metrics
duration: 15min
completed: 2026-03-23
---

# Phase 3 Plan 01: Grammar Data Files Summary

**8 JSON data files covering GCSE grammar: 4th/5th declension and verb paradigms (passive, subjunctive, deponent) plus 57 MCQ exercise questions across 6 grammar topics**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-23T17:30:00Z
- **Completed:** 2026-03-23T17:45:00Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments
- Created gcse-nouns.json with 4th declension (manus) and 5th declension (rēs) complete paradigm tables following the CE nouns.json schema
- Created gcse-verbs.json with 5 passive indicative tenses, 6 subjunctive tenses (active + passive), and 3 deponent tenses for loquor — each tense carrying explicit voice/mood fields
- Created 6 exercise JSON files (57 questions total) covering all GCSE grammar topics, following the gap-fill.json schema exactly with macron Latin throughout

## Task Commits

Each task was committed atomically:

1. **Task 1: Create gcse-nouns.json** - `001d2e8` (feat)
2. **Task 2: Create gcse-verbs.json** - `13a469c` (feat)
3. **Task 3: Create all 6 exercise JSON files** - `c5e5217` (feat)

## Files Created/Modified
- `data/grammar/gcse-nouns.json` - 4th and 5th declension paradigm tables (2 entries)
- `data/grammar/gcse-verbs.json` - Passive, subjunctive, and deponent paradigm data (3 groups, 14 tenses total)
- `data/exercises/gcse-declensions.json` - 9 questions on 4th/5th declension forms
- `data/exercises/gcse-passive.json` - 10 questions on passive voice, agents, perfect passive
- `data/exercises/gcse-subjunctive.json` - 10 questions on subjunctive uses and sequence of tenses
- `data/exercises/gcse-deponents.json` - 9 questions on deponent verbs (loquor, sequor, patior, hortor)
- `data/exercises/gcse-gerunds.json` - 9 questions on gerunds and gerundives including obligation construction
- `data/exercises/gcse-pronouns.json` - 10 questions on hic, ille, qui, ipse

## Decisions Made
- gcse-verbs.json organises data by pedagogical group (passive / subjunctive / deponent) rather than by conjugation number — more useful for grammar pages that display one topic at a time
- Each tense carries explicit `voice` and `mood` fields to allow page JS to filter without parsing tense key names
- Fixed gcse-ger-06 during authoring: gerundive agreement with librī (masc. pl.) requires legendī, not legenda

## Deviations from Plan

None - plan executed exactly as written. The gcse-ger-06 correction was noted in the plan itself and applied as specified.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All 8 data files are valid JSON, verified by Node.js parse check
- Wave 2 (03-02) can now build the six grammar HTML pages with concrete data to fetch
- Schema is consistent with existing CE files — page JS can use the same fetch/render patterns

## Self-Check: PASSED

All 8 data files confirmed present and valid JSON. All 3 task commits confirmed in git log.

---
*Phase: 03-grammar-accidence*
*Completed: 2026-03-23*
