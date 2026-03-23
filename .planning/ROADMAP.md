# Roadmap: Caerus Latin — GCSE Section

## Overview

This roadmap builds the OCR J282 GCSE Latin section on top of the existing Caerus Latin site. The work moves from infrastructure (gating, nav, landing) through content depth (vocabulary, grammar accidence, syntax) to applied practice (translation, literature tools, mock papers). Every phase delivers a coherent, usable capability. A student who completes the full section can revise every examinable element of J282 in one place.

## Phases

- [ ] **Phase 1: Infrastructure** - GCSE product gate, nav, and landing page
- [x] **Phase 2: Vocabulary** - Extend DVL to 450 words with GCSE drills (completed 2026-03-23)
- [ ] **Phase 3: Grammar (Accidence)** - 4th/5th declension, passive, subjunctive, deponents, gerundive, pronouns
- [ ] **Phase 4: Syntax** - 10 construction pages covering the full J282 syntax syllabus
- [ ] **Phase 5: Translation Practice** - Unseen passage library and English-to-Latin sets
- [ ] **Phase 6: Literature Tools** - PETE, MANGOES, essay skills, Literature & Culture
- [ ] **Phase 7: Mock Papers** - 4 full J282/01 papers + "Coming from CE?" orientation

## Phase Details

### Phase 1: Infrastructure
**Goal**: GCSE section is accessible as a separate paid product — gated, navigable, and welcomes students on arrival
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03
**Success Criteria** (what must be TRUE):
  1. A user with `latin-gcse` access_grant can reach GCSE pages and is blocked without it
  2. Every existing CE page shows a GCSE nav section without breaking CE functionality
  3. The GCSE landing page loads and explains what the section covers
  4. A user without a grant is redirected to a purchase/login flow
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md — GCSE nav CSS styles + Supabase gate documentation (INFRA-01)
- [x] 01-02-PLAN.md — Nav injection script: add GCSE item to all 15 CE pages (INFRA-02)
- [ ] 01-03-PLAN.md — GCSE landing page with dual-view (sales / subscriber hub) (INFRA-03)

### Phase 2: Vocabulary
**Goal**: Students can drill the full J282 DVL (450 words) including GCSE-only words and verb principal parts
**Depends on**: Phase 1
**Requirements**: VOC-01, VOC-02
**Success Criteria** (what must be TRUE):
  1. The vocabulary data file contains ~450 words with GCSE tagging distinguishing new words from CE carry-overs
  2. A student can filter drills to show only GCSE-new words
  3. A student can practice verb principal parts from the drill interface
  4. Flashcard and speed-recall modes are both functional across the full DVL
**Plans**: 2 plans

Plans:
- [ ] 02-01-PLAN.md — Extend data/vocabulary/all.json to ~450 words with gcse_only tagging and principal_parts (VOC-01)
- [ ] 02-02-PLAN.md — gcse/vocabulary.html + gcse/js/vocabulary.js: browse, GCSE-new filter, flashcard + speed-recall drill modes (VOC-02)

### Phase 3: Grammar (Accidence)
**Goal**: Students can study and practise every accidence topic examined in J282 that goes beyond CE coverage
**Depends on**: Phase 2
**Requirements**: GRAM-01, GRAM-02, GRAM-03, GRAM-04, GRAM-05, GRAM-06
**Success Criteria** (what must be TRUE):
  1. 4th and 5th declension noun tables are visible with at least one exercise per declension
  2. Full passive voice paradigms (all tenses) are displayed with exercises
  3. Subjunctive tables (present, imperfect, pluperfect active and passive) are present with exercises
  4. Deponent verbs page exists with parsing exercises
  5. Gerund and gerundive page is present, and extended pronouns page covers hic, ille, qui, ipse
**Plans**: TBD

### Phase 4: Syntax
**Goal**: Every J282-examinable syntax construction has its own dedicated page with explanation and practice
**Depends on**: Phase 3
**Requirements**: SYN-01
**Success Criteria** (what must be TRUE):
  1. All 10 syntax constructions have individual pages (indirect statement, purpose, result, indirect commands, indirect questions, ablative absolute, temporal/causal/concessive, conditionals, fearing clauses, participles)
  2. Each page explains the construction and provides at least one worked example
  3. Each page includes a practice element (identification or translation exercise)
  4. All 10 pages are linked from the GCSE nav
**Plans**: TBD

### Phase 5: Translation Practice
**Goal**: Students can practise unseen translation and English-to-Latin composition at exam level
**Depends on**: Phase 4
**Requirements**: TRANS-01, TRANS-02
**Success Criteria** (what must be TRUE):
  1. The passage library contains 6–8 tagged unseen passages at appropriate difficulty
  2. Students can filter passages by topic or difficulty tag
  3. English-to-Latin sets (10 sets × 3 sentences) are accessible with mark schemes or model answers
  4. A student can attempt a passage and check their translation against a provided version
**Plans**: TBD

### Phase 6: Literature Tools
**Goal**: Students have the analytical frameworks and cultural knowledge needed for the Literature component
**Depends on**: Phase 5
**Requirements**: LIT-01, LIT-02, LIT-03
**Success Criteria** (what must be TRUE):
  1. PETE method page and MANGOES literary devices page both exist and explain each term with examples
  2. 10-mark essay skills page includes a writing template and at least one model answer
  3. Literature & Culture pages exist for all 3 themes (Entertainment, Romans in Britain, Myths and Beliefs)
  4. A student can navigate from the GCSE landing page to all literature content without hitting dead links
**Plans**: TBD

### Phase 7: Mock Papers
**Goal**: Students can attempt full-length mock exams under timed conditions and check against mark schemes
**Depends on**: Phase 6
**Requirements**: MOCK-01, MOCK-02
**Success Criteria** (what must be TRUE):
  1. 4 complete J282/01 mock Language papers are available as printable or on-screen PDFs/pages with mark schemes
  2. A student who passes the "Coming from CE?" orientation page understands what J282 adds to CE
  3. The "Coming from CE?" page links to the relevant GCSE pages for each gap area
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Infrastructure | 2/3 | In progress | - |
| 2. Vocabulary | 2/2 | Complete   | 2026-03-23 |
| 3. Grammar (Accidence) | 3/5 | In Progress|  |
| 4. Syntax | 0/TBD | Not started | - |
| 5. Translation Practice | 0/TBD | Not started | - |
| 6. Literature Tools | 0/TBD | Not started | - |
| 7. Mock Papers | 0/TBD | Not started | - |
