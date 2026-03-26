---
phase: 07-mock-papers
plan: 01
subsystem: ui
tags: [html, gcse, latin, mock-papers, auth-guard, mark-scheme]

# Dependency graph
requires:
  - phase: 06-literature-tools
    provides: nav structure with Literature dropdown for GCSE pages
  - phase: 05-translation-practice
    provides: auth guard pattern, toggle reveal JS pattern from passages.html
provides:
  - gcse/mock-papers/paper-1.html — Full J282/01 Language mock paper with 3 sections and per-section mark scheme reveals
  - gcse/mock-papers/paper-2.html — Full J282/01 Language mock paper with different passage topics and per-section mark scheme reveals
affects: [07-02, 07-03]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Per-section mark scheme toggle: toggleAnswers(section) function toggles .mark-scheme.shown, updates button text
    - Paper banner: .paper-banner with gold top border, timing guidance, total marks
    - Latin text block: .latin-text with .line-num spans for numbered lines
    - Vocab help: .vocab-help (dl/dt/dd) for non-DVL word glossary

key-files:
  created:
    - gcse/mock-papers/paper-1.html
    - gcse/mock-papers/paper-2.html
  modified: []

key-decisions:
  - "Mock papers live in gcse/mock-papers/ subdirectory — ../../ relative paths for css and login"
  - "Per-section toggle (A/B/C) preferred over full-paper reveal — allows section-by-section self-marking"
  - "Nav includes Mock Papers dropdown group with all 4 paper links — anticipates papers 3 and 4"
  - "Latin text macrons used throughout — consistent with all prior GCSE data and pages"
  - "Paper 1 topics: military (centurion letter) + daily life (villa routine); Section B: mythology (Orpheus) + religion"
  - "Paper 2 topics: Saturnalia festival + sea trade; Section B: Caesar in Gaul + Roman building/aqueducts"
  - "Section C tests different constructions per paper — Paper 1: acc+inf, purpose, ablative absolute, passive, relative; Paper 2: cum+subj, indirect command, deponent, gerundive, conditional"

patterns-established:
  - "toggleAnswers(section): toggles .mark-scheme div shown class and updates button text for Show/Hide"
  - "paper-banner: centered with gold top border, timing and marks in a single line"
  - "latin-text div with line-num spans for numbered passage display"
  - "Auth guard with hard redirect to ../../login.html?next= and no-grant redirect to ../index.html"

requirements-completed: [MOCK-01]

# Metrics
duration: 7min
completed: 2026-03-26
---

# Phase 7 Plan 01: Mock Papers 1 & 2 Summary

**Two complete J282/01 Language mock papers with authentic 3-section structure (100 marks, 1h 30min), per-section mark scheme reveals, and latin-gcse auth gate**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-26T12:24:27Z
- **Completed:** 2026-03-26T12:30:54Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Paper 1 (military/daily life topics): Section A comprehension + grammar + translation (50 marks), Section B language analysis of Orpheus and Roman religion excerpts (30 marks), Section C English-to-Latin sentences (20 marks)
- Paper 2 (Saturnalia/trade topics): identical J282/01 structure with entirely different passages — Caesar in Gaul excerpt, Roman building/aqueducts, gerundive of obligation in Section C
- Per-section toggle reveals (Show/Hide mark scheme for Section A/B/C) with bold key phrases and mark allocations in [N marks] format
- Auth guard on both pages with latin-gcse product check and hard redirect pattern
- Nav extended with Mock Papers dropdown group (all 4 paper links) on both pages

## Task Commits

1. **Task 1: Create Mock Paper 1** - `873aca6` (feat)
2. **Task 2: Create Mock Paper 2** - `7260deb` (feat)

## Files Created/Modified

- `gcse/mock-papers/paper-1.html` — Full mock paper: centurion letter + villa routine passages; Orpheus + religion excerpts; 5 English-to-Latin sentences
- `gcse/mock-papers/paper-2.html` — Full mock paper: Saturnalia festival + merchant voyage passages; Caesar/Gaul + aqueducts excerpts; 5 English-to-Latin sentences

## Decisions Made

- Per-section mark scheme reveal (Section A/B/C separately) rather than a single full-paper reveal — allows students to self-mark section by section before moving on
- Mock Papers nav dropdown added with paper-3 and paper-4 links as placeholders — anticipates plan 02 (papers 3 and 4)
- Both papers follow exact J282/01 structure: Section A 50 marks, Section B 30 marks, Section C 20 marks = 100 total

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Papers 1 and 2 ready; plan 02 will create papers 3 and 4 in the same directory
- Mock Papers nav group already present on both pages — papers 3 and 4 just need the HTML files created
- Plan 03 (coming-from-ce.html + hub integration) can proceed independently

---
*Phase: 07-mock-papers*
*Completed: 2026-03-26*
