---
phase: 02-vocabulary
verified: 2026-03-23T16:30:00Z
status: passed
score: 6/6 must-haves verified
re_verification: false
---

# Phase 2: Vocabulary Verification Report

**Phase Goal:** Students can drill the full J282 DVL (450 words) including GCSE-only words and verb principal parts
**Verified:** 2026-03-23
**Status:** PASSED
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #  | Truth                                                                                                    | Status     | Evidence                                                                                  |
|----|----------------------------------------------------------------------------------------------------------|------------|-------------------------------------------------------------------------------------------|
| 1  | The vocabulary data file contains approximately 450 words total                                          | VERIFIED   | `data/vocabulary/all.json` has 441 entries (224 CE + 217 GCSE-only)                       |
| 2  | Every entry has a `gcse_only` field (true or false)                                                      | VERIFIED   | Python check: 0 entries missing `gcse_only` field                                         |
| 3  | Every verb entry has a `principal_parts` array field                                                     | VERIFIED   | Python check: all 124 verbs have `principal_parts` as a list; 0 null                      |
| 4  | A student can browse all DVL words on a GCSE vocabulary page protected by the `latin-gcse` gate         | VERIFIED   | `gcse/vocabulary.html` exists, redirects no-grant users to `index.html`                   |
| 5  | A student can filter the list to show only GCSE-new words (`gcse_only: true`)                           | VERIFIED   | `applyFilters` checks `?gcse=1` and filters on `w.gcse_only === true`; nav link present   |
| 6  | A student can launch flashcard mode with verb principal parts on card back, and speed-recall mode        | VERIFIED   | `runFlashcard` renders principal parts for verbs; `runSpeedRecall` implements 4s countdown |

**Score:** 6/6 truths verified

### Required Artifacts

| Artifact                        | Expected                                                          | Status     | Details                                                                     |
|---------------------------------|-------------------------------------------------------------------|------------|-----------------------------------------------------------------------------|
| `data/vocabulary/all.json`      | Extended DVL: ~450 words, `gcse_only` and `principal_parts`       | VERIFIED   | 441 entries, all fields present, 124 verbs all have `principal_parts` array |
| `gcse/vocabulary.html`          | GCSE browse + drill launch page, gated by `latin-gcse`            | VERIFIED   | 152 lines; all required elements present; hard redirect on no grant          |
| `gcse/js/vocabulary.js`         | Browse, filter, flashcard, speed-recall, principal parts display  | VERIFIED   | 416 lines; all 8 function/pattern checks pass                               |

### Key Link Verification

| From                       | To                              | Via                                           | Status   | Details                                                                          |
|----------------------------|---------------------------------|-----------------------------------------------|----------|----------------------------------------------------------------------------------|
| `gcse/vocabulary.html`     | `data/vocabulary/all.json`      | `fetch('../data/vocabulary/all.json')` in JS  | WIRED    | Exact path confirmed on line 14 of `gcse/js/vocabulary.js`                       |
| `gcse/vocabulary.html`     | `latin-gcse` Supabase gate      | Auth guard inline script                      | WIRED    | `latin-gcse` appears 3 times in `gcse/vocabulary.html`; redirect on no-grant confirmed |
| `gcse/js/vocabulary.js`    | `gcse_only` filter              | `applyFilters` function                       | WIRED    | Filter reads `?gcse=1` param and applies `w.gcse_only === true` test             |
| `gcse/js/vocabulary.js`    | `principal_parts` on card back  | `runFlashcard` verb check                     | WIRED    | Lines 193-200 check `word.part_of_speech === 'verb'` and render joined array     |
| `gcse/index.html` hub card | `gcse/vocabulary.html`          | Link and no `coming-soon` class               | WIRED    | Hub card at line 279 links to `vocabulary.html` with no `coming-soon` class      |

### Requirements Coverage

| Requirement | Source Plan | Description                                                              | Status    | Evidence                                                                      |
|-------------|-------------|--------------------------------------------------------------------------|-----------|-------------------------------------------------------------------------------|
| VOC-01      | 02-01-PLAN  | DVL vocabulary extended from 219 to ~450 words with GCSE tagging         | SATISFIED | 441 entries; all have `gcse_only`; 124 verbs all have `principal_parts`       |
| VOC-02      | 02-02-PLAN  | Vocabulary drills: flashcards, speed recall, GCSE-new filter, verb parts | SATISFIED | `gcse/vocabulary.html` + `gcse/js/vocabulary.js` fully implement all modes    |

Both phase requirements confirmed satisfied. No orphaned requirements identified (REQUIREMENTS.md traceability table marks both VOC-01 and VOC-02 as Complete / Phase 2).

### Anti-Patterns Found

No anti-patterns detected. Scans of `gcse/js/vocabulary.js` and `gcse/vocabulary.html` returned zero matches for:
- TODO / FIXME / PLACEHOLDER comments
- Stub return patterns (`return null`, `return {}`, `return []`)
- Coming-soon placeholders

The `gcse/index.html` hub card for Vocabulary no longer carries the `coming-soon` CSS class — that fix was applied in the deviation commit (45c5449).

### Human Verification Required

The following items pass automated checks but cannot be confirmed programmatically:

#### 1. Auth gate redirect in browser

**Test:** Open `gcse/vocabulary.html` in a browser while signed out (or with no `latin-gcse` grant).
**Expected:** Page remains hidden (body visibility:hidden) and immediately redirects to `gcse/index.html`.
**Why human:** Supabase async auth flow cannot be tested without a live browser and real session state.

#### 2. Flashcard principal parts display for verbs

**Test:** Launch flashcard mode at `gcse/vocabulary.html?mode=flashcard&pos=verb`, reveal a card for a verb.
**Expected:** Card back shows English, conjugation meta, and the principal parts as a comma-separated italic string (e.g. "amo, amare, amavi, amatum").
**Why human:** DOM rendering of dynamically built elements requires a live browser.

#### 3. Speed-recall 4-second auto-advance

**Test:** Launch speed-recall mode at `gcse/vocabulary.html?mode=speed-recall`. Do not tap — wait.
**Expected:** Countdown from 4 to 0, then English answer appears for ~1.5 seconds, then next word loads.
**Why human:** Timer behaviour (setInterval/setTimeout) requires a running browser environment.

#### 4. GCSE-new filter word count

**Test:** Load `gcse/vocabulary.html?gcse=1`.
**Expected:** Only GCSE-new words appear (should be 217), with "217 words" shown above the list.
**Why human:** Requires verifying rendered output matches filtered data in a browser.

### Gaps Summary

No gaps. All six observable truths are verified, all three artifacts exist and are substantive and wired, both key links are confirmed, and both phase requirements are satisfied. The phase goal — students can drill the full J282 DVL (441 words) with GCSE-only words distinguishable and verb principal parts shown in flashcard mode — is achieved by the codebase as it stands.

The four human-verification items above are confirmations of correct behaviour, not suspected failures.

---

_Verified: 2026-03-23_
_Verifier: Claude (gsd-verifier)_
