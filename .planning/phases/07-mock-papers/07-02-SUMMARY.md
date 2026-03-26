---
phase: 07-mock-papers
plan: 02
subsystem: ui
tags: [html, latin, gcse, mock-papers, j282, auth-guard]

requires:
  - phase: 07-mock-papers
    provides: Paper scaffold established in plan 01 (auth guard pattern, section structure, toggleAnswers JS)

provides:
  - gcse/mock-papers/paper-3.html — full J282/01 Language paper (education/farming topics)
  - gcse/mock-papers/paper-4.html — full J282/01 Language paper (Pliny/Vesuvius and religion topics)
  - gcse/coming-from-ce.html — CE-to-GCSE orientation page with 9 gap areas and direct links

affects:
  - 07-mock-papers (plan 03 — hub integration needs to link to these pages)
  - phase-wide: all pages with nav should eventually include Coming from CE link

tech-stack:
  added: []
  patterns:
    - Paper pages use inline CSS (copied from plan-01 scaffold) — no external paper stylesheet
    - Nav at gcse/mock-papers/ depth uses ../ prefix for all links to gcse/ pages
    - Nav at gcse/ depth uses direct relative paths (grammar/passive.html, etc.)
    - ce-knows / gcse-adds CSS classes for dual-audience gap cards
    - Deponent verb precātus est tested in Paper 4 mark scheme — active meaning, passive form highlighted

key-files:
  created:
    - gcse/mock-papers/paper-3.html
    - gcse/mock-papers/paper-4.html
    - gcse/coming-from-ce.html
  modified: []

key-decisions:
  - "Paper 3 topics: Roman school/education (A1) + farming/rural life (A2) + Roman justice + Orpheus myth (B) — distinct from papers 1-2"
  - "Paper 4 topics: Pliny/Vesuvius (A1) + Roman religious ritual (A2) + Roman politics/Caesar + family life (B) — distinct from papers 1-3"
  - "Paper 3 Section C constructions: fearing clause, indirect question with num, gerundive of obligation, participle agreement, cum+pluperfect subjunctive"
  - "Paper 4 Section C constructions: future infinitive indirect statement, relative purpose clause, ablative of agent with passive, past unfulfilled conditional, relative clause of characteristic"
  - "coming-from-ce.html lives at gcse/ top level (not mock-papers/) per D-13 — uses ../css/style.css and ../login.html paths"

patterns-established:
  - "Gap cards use .ce-knows (green #2e7d32) and .gcse-adds (orange #e65100) to colour-code what student knows vs. what is new"
  - "::before pseudo-element on .ce-knows and .gcse-adds provides 'CE:' and 'GCSE adds:' prefix labels automatically"

requirements-completed: [MOCK-01, MOCK-02]

duration: 9min
completed: 2026-03-26
---

# Phase 07 Plan 02: Mock Papers Summary

**Mock Papers 3 and 4 (full J282/01 Language papers with unique topics) plus CE-to-GCSE orientation page with 9 annotated gap areas linking to relevant revision content**

## Performance

- **Duration:** ~9 min
- **Started:** 2026-03-26T12:24:52Z
- **Completed:** 2026-03-26T12:33:00Z
- **Tasks:** 2
- **Files modified:** 3 (all created)

## Accomplishments

- Paper 3: full J282/01 structure (3 sections, 100 marks, 1h 30min) with Roman school/education and farming passages; Roman justice and Orpheus myth in Section B; 5 Section C constructions including fearing clause and gerundive of obligation; per-section mark scheme reveals
- Paper 4: full J282/01 structure with Pliny/Vesuvius and Roman religious ritual passages; Roman politics/Caesar and family life in Section B; 5 Section C constructions including future infinitive indirect statement and past unfulfilled conditional; per-section mark scheme reveals
- Coming from CE page: 9 gap cards with encouraging framing, colour-coded CE-knows vs. GCSE-adds, direct links to all 9 relevant GCSE sections

## Task Commits

1. **Task 1: Create Mock Papers 3 and 4** - `9ecb53b` (feat)
2. **Task 2: Create Coming from CE? orientation page** - `64c8155` (feat)

## Files Created/Modified

- `gcse/mock-papers/paper-3.html` — Full J282/01 Language paper: Roman education (A1), farming (A2), Roman justice + Orpheus (B), 5 English-to-Latin sentences (C)
- `gcse/mock-papers/paper-4.html` — Full J282/01 Language paper: Pliny/Vesuvius (A1), Roman religious ritual (A2), Caesar/politics + family (B), 5 English-to-Latin sentences (C)
- `gcse/coming-from-ce.html` — Orientation page at gcse/ top level; 9 gap cards for passive, subjunctive, deponents, gerunds, pronouns, 4th/5th declension, syntax, translation, literature

## Decisions Made

- Paper 3 and 4 topics chosen to differ from each other and from any prior papers; covers: military, festival, education, sea voyage/disaster as Section A main passage topics across all 4 papers
- Paper 3 Section C: fearing clause (ne), indirect question (num), gerundive of obligation, participle agreement, cum+pluperfect subjunctive
- Paper 4 Section C: future infinitive in indirect statement, relative purpose clause (qui + subjunctive), ablative of agent, past unfulfilled conditional (si + pluperfect subjunctive), relative clause of characteristic
- coming-from-ce.html placed at gcse/ (not gcse/mock-papers/) per D-13 with ../css/style.css relative path
- Gap card design uses CSS ::before pseudo-elements for "CE:" / "GCSE adds:" labels — no extra markup needed

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Papers 3 and 4 are complete; combined with plan 01 papers the 4-paper set is ready
- Coming from CE page is live; plan 03 (hub integration) should add a link/card for it on gcse/index.html
- All 3 files are auth-gated and will be ready once the plan 03 hub activation commit lands

---
*Phase: 07-mock-papers*
*Completed: 2026-03-26*
