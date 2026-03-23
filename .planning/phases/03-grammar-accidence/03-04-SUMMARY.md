---
phase: 03-grammar-accidence
plan: "04"
subsystem: ui
tags: [html, latin, gcse, auth-guard, exercise-engine, supabase]

# Dependency graph
requires:
  - phase: 03-grammar-accidence/03-01
    provides: exercise JSON files (gcse-gerunds.json, gcse-pronouns.json)
  - phase: 03-grammar-accidence/03-02
    provides: page template pattern (declensions.html — auth guard, exercise engine, inline styles)
provides:
  - gcse/grammar/gerunds.html — gerund and gerundive revision page with formation tables, worked examples, obligation construction, exam tip, and 9 MCQ exercises
  - gcse/grammar/pronouns.html — extended pronouns revision page (hic, ille, qui, ipse) with tabbed layout, 4 paradigm tables, worked examples, exam tip, and 10 MCQ exercises
affects: [gcse-index, navigation, 04-syntax]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Tabbed layout for multi-paradigm pages using pronoun-tab-btn / pronoun-panel CSS classes and vanilla JS toggle"
    - "Auth-guard + exercise-engine pattern (all JS inline, no external scripts) continued from 03-02"

key-files:
  created:
    - gcse/grammar/gerunds.html
    - gcse/grammar/pronouns.html
  modified: []

key-decisions:
  - "Gerundive of obligation construction given its own subsection (with sum) — most exam-critical use case"
  - "Gerundive replacing gerund+object construction included as a separate note — common in J282 unseen texts"
  - "Pronoun tab layout activates hic panel by default (most common pronoun encountered first)"
  - "All 4 pronoun paradigms (hic, ille, qui, ipse) on one page — pedagogically coherent, avoids page proliferation"

patterns-established:
  - "Tab layout pattern: .pronoun-tabs + .pronoun-tab-btn + .pronoun-panel with vanilla JS data-tab switching"
  - "Hardcoded paradigm tables (no JSON fetch) — appropriate for compact, static paradigm data"

requirements-completed: [GRAM-05, GRAM-06]

# Metrics
duration: 12min
completed: 2026-03-23
---

# Phase 3 Plan 4: Gerund/Gerundive and Extended Pronouns Summary

**Standalone gerund/gerundive page with formation tables and obligation construction, plus a tabbed four-pronoun paradigm page (hic, ille, qui, ipse), both with auth guard and 9–10 MCQ exercises**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-03-23T~20:00:00Z
- **Completed:** 2026-03-23T~20:12:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- gcse/grammar/gerunds.html built with full gerund formation table (all 4 conjugations, 4 cases), gerundive of obligation, gerundive-replacing-gerund construction, exam tip, and 9 MCQ exercises from gcse-gerunds.json
- gcse/grammar/pronouns.html built with tabbed layout showing all 4 pronoun paradigms (hic, ille, qui, ipse), worked examples, exam tip, and 10 MCQ exercises from gcse-pronouns.json
- Both pages follow established auth guard pattern: no session → ../../login.html, no latin-gcse grant → ../index.html

## Task Commits

Each task was committed atomically:

1. **Task 1: Build gcse/grammar/gerunds.html** - (feat(03-04): build gerunds.html — gerund/gerundive page with formation tables)
2. **Task 2: Build gcse/grammar/pronouns.html** - (feat(03-04): build pronouns.html — tabbed four-pronoun paradigm page)

**Plan metadata:** (docs(03-04): complete gerunds and pronouns plan)

## Files Created/Modified
- `gcse/grammar/gerunds.html` - Gerund and gerundive revision page with formation table, worked examples, obligation construction with sum, gerundive-replacing-gerund note, exam tip, and 9 MCQ exercises
- `gcse/grammar/pronouns.html` - Extended pronouns page with tab UI showing hic/haec/hoc, ille/illa/illud, qui/quae/quod, ipse/ipsa/ipsum paradigms, worked examples, exam tip, and 10 MCQ exercises

## Decisions Made
- Gerundive of obligation given its own named subsection with 3 worked examples (liber legendus est, pax petenda est, hostes vincendi sunt) — most exam-critical use of gerundive
- Gerundive replacing gerund+object included as a brief note — appears in J282 texts, important to recognise
- Pronoun tab layout activates hic panel by default as it is the most frequently encountered pronoun in texts
- All 4 pronouns on one page — avoids proliferating pages, keeps related paradigms together for comparative learning

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 03 grammar accidence is now complete: declensions, passive, subjunctive, deponents, gerunds, and pronouns pages all built
- Phase 04 (syntax) can begin — all grammar accidence prerequisites are in place
- Navigation links within gcse/grammar/ may need updating to cross-link the new pages

---
*Phase: 03-grammar-accidence*
*Completed: 2026-03-23*
