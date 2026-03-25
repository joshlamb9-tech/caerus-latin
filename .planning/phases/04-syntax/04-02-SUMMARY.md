---
phase: 04-syntax
plan: 02
subsystem: ui
tags: [html, supabase, latin-gcse, syntax, auth-gate, exercises]

# Dependency graph
requires:
  - phase: 04-syntax-01
    provides: 10 syntax exercise JSON files (gcse-participles.json, gcse-ablative-absolute.json, gcse-indirect-statement.json, gcse-indirect-commands.json, gcse-indirect-questions.json, plus 5 more for plan 03)
provides:
  - gcse/syntax/index.html — syntax hub with teaser/hub dual-view, all 11 construction links
  - gcse/syntax/participles.html — participles construction page with exercises
  - gcse/syntax/ablative-absolute.html — ablative absolute page with comparison table and exercises
  - gcse/syntax/indirect-statement.html — indirect statement page with three-construction comparison table and exercises
  - gcse/syntax/indirect-commands.html — indirect commands page with sequence-of-tenses link and exercises
  - gcse/syntax/indirect-questions.html — indirect questions page with comparison table, sequence-of-tenses link and exercises
affects:
  - 04-syntax-03 (builds the remaining 6 syntax pages in the same directory)
  - gcse/index.html (syntax card links to syntax/index.html)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Teaser/hub dual-view auth pattern (tease-not-redirect) extended from gcse/index.html to section index page
    - Construction page pattern: auth guard, inline styles, nav with Grammar+Syntax dropdowns, grammar-page div, explanation, worked examples, exam-tip, exercises, see-also, renderExercises fetch

key-files:
  created:
    - gcse/syntax/index.html
    - gcse/syntax/participles.html
    - gcse/syntax/ablative-absolute.html
    - gcse/syntax/indirect-statement.html
    - gcse/syntax/indirect-commands.html
    - gcse/syntax/indirect-questions.html
  modified: []

key-decisions:
  - "Syntax hub index uses tease-not-redirect (same as gcse/index.html) — construction sub-pages use hard redirect on no-grant"
  - "Nav on all syntax pages includes both Grammar and Syntax dropdown groups — Syntax group lists all 11 constructions"
  - "Ablative absolute comparison table covers: case of noun, grammatical link to main clause, typical translation"
  - "Indirect statement has three-construction comparison table (indirect statement vs indirect command vs indirect question)"
  - "Indirect questions page has brief two-column comparison table (indirect question vs indirect command)"
  - "iubeō exception (acc+inf not ut+subjunctive) documented in indirect-commands.html"

patterns-established:
  - "Construction page structure: head with auth-guard style + Supabase + .exam-tip + .grammar-table styles + auth script; body with header/nav, main grammar-page div, h1, page-intro, #explanation, #examples, .exam-tip, #exercises with exercise-container, #see-also; scripts for nav toggle + exercise fetch+renderExercises"
  - "Sequence of tenses: subjunctive pages (indirect-commands, indirect-questions) always link to sequence-of-tenses.html"

requirements-completed: [SYN-01]

# Metrics
duration: 11min
completed: 2026-03-25
---

# Phase 4 Plan 02: Syntax Hub and First 5 Construction Pages Summary

**Syntax hub (index.html) + 5 auth-gated construction pages covering participles, ablative absolute, indirect statement, indirect commands, and indirect questions — each with explanation, worked examples, exam tip, comparison table (where specified), and exercise MCQ fetching from plan-01 JSON files**

## Performance

- **Duration:** 11 min
- **Started:** 2026-03-25T15:13:27Z
- **Completed:** 2026-03-25T15:24:24Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Syntax hub with teaser/hub dual-view and all 11 construction links grouped in 4 labelled sections
- 5 fully content-complete construction pages, all auth-gated with latin-gcse product check
- Comparison tables on ablative-absolute.html, indirect-statement.html, and indirect-questions.html
- Sequence-of-tenses links on both subjunctive-verb pages (indirect-commands, indirect-questions)
- renderExercises MCQ engine present on all 5 construction pages, each fetching its own JSON file

## Task Commits

Each task was committed atomically:

1. **Task 1: Create gcse/syntax/index.html** - `e4747b0` (feat)
2. **Task 2: Create 5 construction pages** - `0c8e1c3` (feat)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified
- `gcse/syntax/index.html` - Syntax hub: teaser/hub dual-view, 4 groups, 11 construction card links
- `gcse/syntax/participles.html` - Present active, PPP, future active participles with 4 worked examples
- `gcse/syntax/ablative-absolute.html` - Ablative absolute with AA vs participial phrase comparison table
- `gcse/syntax/indirect-statement.html` - Acc+inf construction with three-construction comparison table
- `gcse/syntax/indirect-commands.html` - ut/nē + subjunctive; iubeō exception; sequence-of-tenses link
- `gcse/syntax/indirect-questions.html` - Question word + subjunctive; question word table; comparison table

## Decisions Made
- Syntax hub index uses tease-not-redirect pattern (consistent with gcse/index.html) — construction sub-pages use hard redirect on no-grant (consistent with grammar pages)
- Both Grammar and Syntax nav dropdown groups included on all syntax pages — full nav as specified in plan interfaces
- iubeō exception (accusative + infinitive, not ut + subjunctive) documented in indirect-commands.html as the most commonly tested exception

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Self-Check: PASSED

All 6 HTML files confirmed present. Both task commits (e4747b0, 0c8e1c3) confirmed in git log.

## Next Phase Readiness
- gcse/syntax/ directory established with consistent construction page pattern
- Plan 03 (wave 2 parallel) can now create the remaining 6 syntax pages (purpose, result, fearing, temporal-causal-concessive, conditionals, sequence-of-tenses) in the same directory following the same pattern
- sequence-of-tenses.html is linked from indirect-commands.html and indirect-questions.html — plan 03 must create that target page

---
*Phase: 04-syntax*
*Completed: 2026-03-25*
