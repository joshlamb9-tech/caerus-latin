---
phase: 04-syntax
plan: 03
subsystem: ui
tags: [html, auth, supabase, latin-gcse, syntax, exercises]

# Dependency graph
requires:
  - phase: 04-01
    provides: exercise JSON files for all 10 J282 syntax constructions
  - phase: 03-grammar-accidence
    provides: auth guard pattern, inline styles, renderExercises function, nav structure

provides:
  - "purpose.html — purpose clauses construction page with ut/ne + subjunctive, Purpose vs Result comparison table, exercises"
  - "result.html — result clauses construction page with tam/ita/adeo intensifiers, Purpose vs Result comparison table, exercises"
  - "fearing.html — fearing clauses construction page with reversed ne/ut logic, exercises"
  - "temporal-causal-concessive.html — cum indicative vs subjunctive comparison table with dum/quamquam/quod, exercises"
  - "conditionals.html — open/unfulfilled conditional types table with indicative and subjunctive, exercises"
  - "sequence-of-tenses.html — reference page with primary/secondary sequence table, no exercises"
  - "gcse/index.html Syntax card updated to syntax/index.html with 11 constructions badge"
  - "gcse/index.html Syntax nav dropdown added with all 11 construction links"

affects:
  - 04-02 (plan 02 creates syntax/index.html and 5 other construction pages; this plan's pages must be consistent with that nav)
  - future translation and literature phases (these syntax pages are the revision foundation)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Auth guard pattern: style id='auth-guard' hidden body + Supabase session check + grant check + removal on confirm"
    - "renderExercises: random MCQ from JSON pool, shuffle options, correct/wrong feedback with explanation"
    - "Comparison tables on look-alike constructions (purpose vs result, tcc types, conditional types)"
    - "sequence-of-tenses.html as reference hub — no exercises, linked from all subjunctive-using pages"

key-files:
  created:
    - gcse/syntax/purpose.html
    - gcse/syntax/result.html
    - gcse/syntax/fearing.html
    - gcse/syntax/temporal-causal-concessive.html
    - gcse/syntax/conditionals.html
    - gcse/syntax/sequence-of-tenses.html
  modified:
    - gcse/index.html

key-decisions:
  - "sequence-of-tenses.html is reference-only (no exercises) — it is a reference destination linked from all subjunctive construction pages, not a practise page"
  - "Syntax nav added to gcse/index.html alongside Grammar nav — users can jump directly to any construction from the hub"
  - "coming-soon class removed from Syntax card in gcse/index.html; card now links syntax/index.html (created by plan 02)"

patterns-established:
  - "Comparison tables on look-alike constructions: purpose.html and result.html share identical Purpose vs Result table — reinforces distinction"
  - "All subjunctive-using construction pages link to sequence-of-tenses.html in both explanation and See Also"

requirements-completed: [SYN-01]

# Metrics
duration: 20min
completed: 2026-03-25
---

# Phase 4 Plan 3: Syntax Construction Pages (Wave 2) Summary

**6 HTML syntax pages covering purpose/result/fearing/temporal-causal-concessive/conditionals/sequence-of-tenses, each auth-gated with comparison tables for look-alike constructions and gcse/index.html Syntax card activated**

## Performance

- **Duration:** 20 min
- **Started:** 2026-03-25T15:01:47Z
- **Completed:** 2026-03-25T15:21:55Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- 5 auth-gated construction pages with full content: worked examples, exam tips, comparison tables, and MCQ exercises fetching from correct JSON files
- sequence-of-tenses.html as a reference hub (no exercises) with primary/secondary sequence table, linked from all subjunctive-using pages
- gcse/index.html Syntax card updated from coming-soon to active link (syntax/index.html), Syntax nav dropdown added with all 11 constructions

## Task Commits

Each task was committed atomically:

1. **Task 1: Create 5 construction pages** - `3332582` (feat)
2. **Task 2: sequence-of-tenses and gcse/index.html update** - `a8a3932` (feat)

## Files Created/Modified
- `gcse/syntax/purpose.html` — purpose clauses: ut/ne + subjunctive, Purpose vs Result comparison table, sequence of tenses link, exercises
- `gcse/syntax/result.html` — result clauses: tam/ita/adeo/tantus/tot intensifiers, same comparison table, exercises
- `gcse/syntax/fearing.html` — fearing clauses: timeo/vereor/metuo + reversed ne/ut logic, exercises
- `gcse/syntax/temporal-causal-concessive.html` — cum indicative vs subjunctive, comparison table across 5 signal types, exercises
- `gcse/syntax/conditionals.html` — open/unfulfilled present/past, Types of Conditional table, exercises
- `gcse/syntax/sequence-of-tenses.html` — reference page with primary/secondary sequence table, no exercises, links to all 6 related constructions
- `gcse/index.html` — Syntax card replaced (syntax/index.html, 11 constructions badge, no coming-soon), Syntax nav dropdown added

## Decisions Made
- sequence-of-tenses.html is reference-only with no exercises — it is a destination page that provides the underlying rule, not a separate drill
- Syntax nav group added to gcse/index.html alongside Grammar — enables direct navigation to any construction from the GCSE hub

## Deviations from Plan

None — plan executed exactly as written. The only context gap was that gcse/syntax/indirect-statement.html (plan 02 reference) did not yet exist; passive.html was used as the structural reference instead, which produces identical output since both follow the same pattern.

## Issues Encountered
None.

## User Setup Required
None — no external service configuration required.

## Next Phase Readiness
- Phase 4 wave 2 complete: 6 syntax construction pages created, gcse/index.html updated
- Plan 02 (wave 2 parallel) still needs execution to create syntax/index.html and 5 more construction pages (participles, ablative absolute, indirect statement, indirect commands, indirect questions)
- Once plan 02 is complete, all 12 syntax files will be present and the Syntax card will be fully functional

---
*Phase: 04-syntax*
*Completed: 2026-03-25*

## Self-Check: PASSED

All 7 files confirmed on disk. Both task commits (3332582, a8a3932) confirmed in git log.
