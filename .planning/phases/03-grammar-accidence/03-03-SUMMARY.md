---
phase: 03-grammar-accidence
plan: "03"
subsystem: gcse-grammar
tags: [grammar, subjunctive, deponents, gcse, html, exercises]
dependency_graph:
  requires: [03-01, 03-02]
  provides: [subjunctive-page, deponents-page]
  affects: [gcse-grammar-index]
tech_stack:
  added: []
  patterns: [auth-guard, exercise-engine, paradigm-tables-from-json]
key_files:
  created:
    - gcse/grammar/subjunctive.html
    - gcse/grammar/deponents.html
  modified: []
decisions:
  - Subjunctive tenses rendered in gcse-verbs.json insertion order (present/imperfect/pluperfect active then passive) — matches pedagogical progression
  - Deponent meanings table uses present-tense gloss only (speak/follow/etc.) rather than tense-adjusted meanings — simpler and sufficient for parsing
metrics:
  duration: 4 min
  completed_date: "2026-03-23"
  tasks_completed: 2
  files_created: 2
---

# Phase 03 Plan 03: Subjunctive and Deponent Pages Summary

Subjunctive mood revision page and deponent verbs revision page — both with auth-gated access, live paradigm tables from gcse-verbs.json, and MCQ exercise engines.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Build gcse/grammar/subjunctive.html | 3afcf69 | gcse/grammar/subjunctive.html |
| 2 | Build gcse/grammar/deponents.html | fa39cf4 | gcse/grammar/deponents.html |

## What Was Built

**subjunctive.html** — Covers the subjunctive mood for GCSE. Includes:
- Formation rules for present, imperfect, and pluperfect subjunctive (active and passive)
- Sequence of tenses table (primary/secondary) with worked examples
- Six live paradigm tables rendered from gcse-verbs.json (conjugations[1] where mood === 'subjunctive')
- Exam tip covering trigger words (ut, cum, ne) and translation strategy
- 10-question MCQ exercise pool from gcse-subjunctive.json

**deponents.html** — Covers deponent verbs for GCSE. Includes:
- Explanation of passive-form/active-meaning pattern with key identification signs
- Table of 5 common GCSE deponent verbs (loquor, sequor, patior, hortor, moror) with infinitives, perfects, and meanings
- Three paradigm tables (present, imperfect, perfect) for loquor rendered from gcse-verbs.json (deponent === true), with added Meaning column
- Parsing walkthrough with worked examples (loquitur, secuti sunt)
- Exam tip on the deponent perfect trap (locutus est = he spoke, not "he was spoken")
- 9-question MCQ exercise pool from gcse-deponents.json

Both pages follow the identical pattern from Plans 01 and 02:
- Auth guard hides body until session and latin-gcse product grant confirmed
- No session redirects to ../../login.html with ?next= param
- No grant redirects to ../index.html
- Sign-out injects into nav and redirects to ../../login.html
- All JS inline, no external script imports

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

- [x] gcse/grammar/subjunctive.html exists and contains all required elements
- [x] gcse/grammar/deponents.html exists and contains all required elements
- [x] Commit 3afcf69 exists (subjunctive.html)
- [x] Commit fa39cf4 exists (deponents.html)

## Self-Check: PASSED
