---
phase: 06-literature-tools
plan: 01
subsystem: ui
tags: [html, gcse, literature, exam-technique]

# Dependency graph
requires:
  - phase: 05-translation-practice
    provides: Translation nav group and page structure patterns for GCSE pages
provides:
  - gcse/literature/pete.html — PETE analytical method page with 4 steps and Latin examples
  - gcse/literature/mangoes.html — MANGOES 7-device reference page with Latin examples and analysis tips
  - gcse/literature/essay-skills.html — 10-mark essay skills page with template, mark scheme, and model answer
  - Literature nav group established with 6 links (pete, mangoes, essay-skills, entertainment, romans-in-britain, myths-and-beliefs)
affects:
  - 06-02: Literature & Culture pages (entertainment, romans-in-britain, myths-and-beliefs) use same Literature nav group
  - 06-03: Any additional literature content shares these page patterns

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Literature pages follow syntax/purpose.html pattern — hard-redirect auth, inline CSS, ../../css/style.css
    - Literature nav group added to all literature pages alongside Grammar, Syntax, Translation groups

key-files:
  created:
    - gcse/literature/pete.html
    - gcse/literature/mangoes.html
    - gcse/literature/essay-skills.html
  modified: []

key-decisions:
  - "Literature pages use hard-redirect auth (not tease) — subscribers only, same as syntax pages"
  - "Literature nav group includes all 6 planned pages including future culture pages (entertainment, romans-in-britain, myths-and-beliefs) — consistent nav from day 1"
  - "Model answer in essay-skills.html uses original Latin passage about a general rallying troops — avoids any copyright concern with published texts"
  - "device-card component pattern used in mangoes.html — card per device with definition, Latin example, and analysis tip — more scannable than plain prose"

patterns-established:
  - "Literature page pattern: hard-redirect auth, ../../css/style.css, Literature nav group, inline CSS with .exam-tip and .grammar-table, nav toggle JS at bottom"
  - "Analysis format: Latin example in italic box with gold left border, analysis tip below — consistent with exam technique pedagogy"

requirements-completed: [LIT-01, LIT-02]

# Metrics
duration: 4min
completed: 2026-03-26
---

# Phase 6 Plan 1: Literature Tools Summary

**Three GCSE literature exam technique pages — PETE method, MANGOES 7-device reference, and 10-mark essay skills with model answer — all with hard-redirect auth and Literature nav group**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-26T10:08:17Z
- **Completed:** 2026-03-26T10:12:59Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Created `gcse/literature/pete.html`: Point, Evidence, Translation, Explanation — each step with definition, Latin example, and analysis guidance
- Created `gcse/literature/mangoes.html`: all 7 MANGOES devices (Metaphor, Alliteration, Noun clusters, Graphic, Onomatopoeia, Enjambment, Simile) with Latin examples, translations, and analysis tips in card-per-device layout
- Created `gcse/literature/essay-skills.html`: 5-step writing template, mark scheme table (1–10 bands), complete 3-paragraph model answer using original Latin passage, examiner commentary, and common mistakes list

## Task Commits

1. **Task 1: PETE and MANGOES pages** — `a75aa2a` (feat)
2. **Task 2: Essay skills page** — `ace29d5` (feat)

## Files Created/Modified

- `gcse/literature/pete.html` — PETE analytical method: 4 steps with Latin examples and cross-references to mangoes.html and essay-skills.html
- `gcse/literature/mangoes.html` — 7 literary devices reference: device-card layout, Latin examples, analysis tips, cross-reference to pete.html
- `gcse/literature/essay-skills.html` — 10-mark essay skills: writing template, mark scheme, model answer with 3 PETE paragraphs, examiner commentary, common mistakes

## Decisions Made

- Literature pages use hard-redirect auth (not tease pattern) — same as syntax pages, subscribers only
- Literature nav group includes all 6 planned pages from the start (pete, mangoes, essay-skills, entertainment, romans-in-britain, myths-and-beliefs) for consistent navigation even before culture pages exist
- Model answer uses an original Latin passage (Roman general rallying troops) to avoid copyright concerns
- device-card layout in MANGOES provides better scanability than plain prose — definition, boxed Latin example, then analysis tip per device

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Known Stubs

- `gcse/literature/entertainment.html`, `gcse/literature/romans-in-britain.html`, `gcse/literature/myths-and-beliefs.html` are linked in the Literature nav group but do not yet exist — these are the subject of plans 06-02 and 06-03. The nav links will 404 until those plans execute.

## Next Phase Readiness

- Literature analytical framework pages complete — students can access PETE, MANGOES, and essay skills
- Literature nav group established and consistent across all 3 pages
- Plans 06-02 and 06-03 can proceed — they will add the Literature & Culture theme pages that the nav already links to

## Self-Check: PASSED

- gcse/literature/pete.html: FOUND
- gcse/literature/mangoes.html: FOUND
- gcse/literature/essay-skills.html: FOUND
- Commit a75aa2a: FOUND
- Commit ace29d5: FOUND

---
*Phase: 06-literature-tools*
*Completed: 2026-03-26*
