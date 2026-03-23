---
phase: 02-vocabulary
plan: 02
subsystem: gcse-vocabulary
tags: [gcse, vocabulary, flashcard, speed-recall, auth-gate]
dependency_graph:
  requires: [02-01]
  provides: [gcse/vocabulary.html, gcse/js/vocabulary.js]
  affects: [gcse/index.html]
tech_stack:
  added: []
  patterns: [auth-guard-redirect, fetch-json, fisher-yates-shuffle, countdown-timer]
key_files:
  created:
    - gcse/js/vocabulary.js
    - gcse/vocabulary.html
  modified:
    - gcse/index.html
decisions:
  - vocabulary.html uses hard redirect on no-grant (unlike gcse/index.html which teases)
  - Speed-recall uses 4s countdown + 1.5s reveal (simpler than progress bar)
  - Nav structure matches gcse/index.html shell (hamburger + dropdown groups)
metrics:
  duration: 3 min
  completed_date: "2026-03-23"
  tasks_completed: 2
  files_changed: 3
---

# Phase 02 Plan 02: GCSE Vocabulary Page Summary

GCSE vocabulary browse + drill page at `gcse/vocabulary.html`, gated by `latin-gcse` Supabase product grant, powered by standalone `gcse/js/vocabulary.js` with browse, flashcard, and speed-recall modes against the full 441-word DVL.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Create gcse/js/vocabulary.js | d1e2833 | gcse/js/vocabulary.js (created) |
| 2 | Create gcse/vocabulary.html | 2a6da6a | gcse/vocabulary.html (created) |

## What Was Built

### gcse/js/vocabulary.js

Standalone ES5/ES6-compatible file (no imports) providing three modes via URL params:

- **Browse mode** (default): Renders all 441 DVL words with GCSE-new badge, filter nav (All / GCSE-new only / by POS), word count summary ("224 CE + 217 GCSE-new"), and "Drill this list" links to flashcard/speed-recall with current params preserved.
- **Flashcard mode** (`?mode=flashcard`): Fisher-Yates shuffled deck, front shows Latin, back reveals English + meta + principal parts for verbs (nulls filtered), correct/wrong tracking, end-of-deck score.
- **Speed-recall mode** (`?mode=speed-recall`): 4-second countdown per word, tap to reveal early, 1.5s answer reveal then auto-advance, end count of words seen.

Data fetched from `../data/vocabulary/all.json` (correct path from `gcse/js/` subdirectory).

### gcse/vocabulary.html

GCSE-gated page using the `latin-gcse` product gate. Auth guard flow:
1. Body hidden via `<style id="auth-guard">` until grant confirmed.
2. No session → redirect to `../login.html?next=gcse/vocabulary.html`.
3. Session but no `latin-gcse` grant → redirect to `index.html` (purchase/upgrade page).
4. Grant confirmed → guard removed, sign-out injected into nav, `gcse/js/vocabulary.js` renders content into `#app`.

Nav shell matches `gcse/index.html` exactly (hamburger toggle, dropdown groups, GCSE nav badge).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed coming-soon status from vocabulary hub card**
- **Found during:** Post-task verification
- **Issue:** `gcse/index.html` still showed the Vocabulary card as "Coming soon" with `pointer-events: none`, making the newly-built page unreachable from the hub
- **Fix:** Removed `coming-soon` CSS class and badge `<span>` from vocabulary card
- **Files modified:** gcse/index.html
- **Commit:** 45c5449

## Verification Results

- Total vocabulary words: 441 (224 CE + 217 GCSE-only)
- All 124 verbs have `principal_parts` arrays
- `fetch('../data/vocabulary/all.json')` path confirmed correct
- `latin-gcse` product gate appears 3 times in vocabulary.html
- All acceptance criteria passed for both tasks

## Self-Check

Files created:
- gcse/js/vocabulary.js — FOUND
- gcse/vocabulary.html — FOUND
- gcse/index.html — MODIFIED (FOUND)

Commits:
- d1e2833 — Task 1 (vocabulary.js)
- 2a6da6a — Task 2 (vocabulary.html)
- 45c5449 — Deviation fix (index.html hub card)

## Self-Check: PASSED
