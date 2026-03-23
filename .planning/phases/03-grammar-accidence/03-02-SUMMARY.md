---
phase: 03-grammar-accidence
plan: "02"
subsystem: ui
tags: [html, supabase, auth-guard, latin-gcse, grammar, paradigm-tables, mcq]

# Dependency graph
requires:
  - phase: 03-01
    provides: gcse-nouns.json, gcse-verbs.json, gcse-declensions.json, gcse-passive.json exercise data
  - phase: 02-vocabulary
    provides: gcse/vocabulary.html auth guard pattern, nav structure, CSS, exercise engine pattern
provides:
  - gcse/grammar/declensions.html — 4th and 5th declension revision page with paradigm tables
  - gcse/grammar/passive.html — full passive voice revision page (5 tenses) with agent construction
affects: [03-03, 03-04, 03-05, 03-06]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Standalone grammar page pattern (auth guard + nav + content + inline exercise engine, no external JS)
    - Dynamic paradigm table rendering from JSON data via fetch()
    - gcse/grammar/ depth requires ../../ prefix for all paths (CSS, data, auth redirects)

key-files:
  created:
    - gcse/grammar/declensions.html
    - gcse/grammar/passive.html
  modified: []

key-decisions:
  - "Grammar pages are fully standalone — all JS inline, no external script imports — consistent with vocabulary.html pattern"
  - "gcse/grammar/ pages use ../../ relative paths (two levels deeper than gcse/vocabulary.html which uses ../)"
  - "Passive paradigm tables render only the passive indicative group (voice=passive, mood!=subjunctive) — subjunctive and deponent handled in later plans"

patterns-established:
  - "Grammar page structure: [auth guard] → [h1 + intro] → [explanation sections with formation rules + worked examples] → [dynamic paradigm tables] → [exam tip callout] → [exercises]"
  - "Exam tip callout: div.exam-tip with gold left border #c9a84c and cream background #fdf8ee"
  - "MCQ exercise engine: inline IIFE, showQuestion() with anti-repeat random, qcheck-* CSS classes, explanation shown after every answer"

requirements-completed: [GRAM-01, GRAM-02]

# Metrics
duration: 46min
completed: 2026-03-23
---

# Phase 3 Plan 02: Grammar Pages (Declensions + Passive) Summary

**Two standalone GCSE grammar pages: 4th/5th declension paradigms from gcse-nouns.json and full passive voice (5 tenses) from gcse-verbs.json, both with latin-gcse auth guard and inline MCQ exercise engine**

## Performance

- **Duration:** 46 min
- **Started:** 2026-03-23T18:51:58Z
- **Completed:** 2026-03-23T19:37:00Z
- **Tasks:** 2
- **Files modified:** 2 (created)

## Accomplishments
- Built `gcse/grammar/declensions.html` — 4th and 5th declension paradigm tables rendered dynamically from gcse-nouns.json, with formation rules, worked examples, exam tip, and 9-question MCQ exercise pool
- Built `gcse/grammar/passive.html` — all 5 passive tenses (present, imperfect, future, perfect, pluperfect) rendered from gcse-verbs.json, agent construction explained with examples, exam tip, and 10-question MCQ exercise pool
- Established the grammar page template pattern for the remaining 4 pages in this phase (03-03 through 03-06)

## Task Commits

Each task was committed atomically:

1. **Task 1: Build gcse/grammar/declensions.html** - `892a688` (feat)
2. **Task 2: Build gcse/grammar/passive.html** - `431fe66` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified
- `gcse/grammar/declensions.html` — 4th and 5th declension revision page; auth-guarded, dynamic tables, MCQ exercises
- `gcse/grammar/passive.html` — Passive voice revision page; auth-guarded, 5-tense dynamic tables, agent construction, MCQ exercises

## Decisions Made
- Grammar pages use fully inline JS — no external script files — preserving the self-contained pattern of vocabulary.html. This avoids build complexity and keeps each page independently deployable.
- Passive page renders only the indicative passive group from gcse-verbs.json (filtering `voice === 'passive' && mood !== 'subjunctive'`). The subjunctive passive forms in the JSON are reserved for the subjunctive page (03-04).
- `gcse/grammar/` depth means all relative paths use `../../` — this was confirmed against the vocabulary.html pattern at `gcse/` depth which uses `../`.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness
- Grammar page template fully established — tasks 03-03 through 03-06 can copy the same auth guard, nav, CSS, and exercise engine pattern, changing only content and data paths
- gcse/grammar/ directory created and ready for additional pages
- Both GRAM-01 and GRAM-02 requirements are complete

---
*Phase: 03-grammar-accidence*
*Completed: 2026-03-23*

## Self-Check: PASSED

- FOUND: gcse/grammar/declensions.html
- FOUND: gcse/grammar/passive.html
- FOUND: .planning/phases/03-grammar-accidence/03-02-SUMMARY.md
- FOUND: commit 892a688 (declensions.html)
- FOUND: commit 431fe66 (passive.html)
