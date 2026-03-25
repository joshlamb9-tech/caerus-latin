---
phase: 04-syntax
plan: 01
subsystem: content
tags: [json, latin, gcse, exercises, mcq, syntax]

# Dependency graph
requires: []
provides:
  - 10 syntax exercise JSON files in data/exercises/, one per J282 construction
  - Each file contains 10 MCQ questions (5 identification + 5 translation)
  - All files schema-compliant with gap-fill.json field structure
affects:
  - 04-syntax plans 02 and 03 (construction pages that fetch these JSON files)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Syntax exercise JSON uses blank_word "" (empty) since no gap-fill; engine ignores it
    - ID questions: full sentence displayed; options = construction names; translation = English gloss
    - Translation questions: full sentence displayed; translation = "" (empty — student must translate)
    - Questions 1–5 are identification MCQ; questions 6–10 are translation MCQ per file
    - ID options pool rotates 4 construction names for each construction type

key-files:
  created:
    - data/exercises/gcse-indirect-statement.json
    - data/exercises/gcse-indirect-commands.json
    - data/exercises/gcse-indirect-questions.json
    - data/exercises/gcse-participles.json
    - data/exercises/gcse-purpose.json
    - data/exercises/gcse-result.json
    - data/exercises/gcse-fearing.json
    - data/exercises/gcse-ablative-absolute.json
    - data/exercises/gcse-temporal-causal-concessive.json
    - data/exercises/gcse-conditionals.json
  modified: []

key-decisions:
  - "Syntax exercises use blank_word: '' (empty string) — engine ignores this field for non-gap-fill questions"
  - "Options pool for ID questions uses exactly 4 construction names that are plausible distractors for each file"
  - "Fearing clause uses nē = positive fear / ut = negative fear — the counter-intuitive reversal is explicitly called out in explanations"
  - "Conditionals use open (indicative), unfulfilled present (imperfect subjunctive), and unfulfilled past (pluperfect subjunctive) as distinct option labels"
  - "Ablative absolute explanations always confirm the ablative noun is NOT the main clause subject — this is the diagnostic criterion"

patterns-established:
  - "Explanation field: always names the construction, identifies the key signal (verb/conjunction/ending), and gives translation logic"
  - "Translation options include: correct answer + plausible same-construction variant + two other construction type distractors"
  - "Latin sentences use macron-accented forms throughout (dīcō not dico, nē not ne, etc.)"

requirements-completed: [SYN-01]

# Metrics
duration: 6min
completed: 2026-03-25
---

# Phase 4 Plan 01: Syntax Exercise JSON Files Summary

**10 syntax MCQ exercise files covering all J282 constructions — 100 questions total, schema-validated, macron Latin throughout, ready for fetch() by construction pages**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-25T14:59:24Z
- **Completed:** 2026-03-25T15:05:08Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments

- Created 10 exercise JSON files in data/exercises/ — one per OCR J282 construction
- Each file contains exactly 10 questions: 5 identification MCQ (identify the construction) + 5 translation MCQ (select the correct English translation)
- All files pass full schema validation: 8 required fields per question, correct value in options array, 4 options per question, macron Latin throughout

## Task Commits

1. **Task 1: Indirect statement, commands, questions, participles** - `f16b3f0` (feat)
2. **Task 2: Purpose, result, fearing, ablative absolute, temporal/causal/concessive, conditionals** - `b0c51a8` (feat)

## Files Created/Modified

- `data/exercises/gcse-indirect-statement.json` - 10 MCQ, accusative + infinitive (was already present, committed with task 1)
- `data/exercises/gcse-indirect-commands.json` - 10 MCQ, ut/nē + subjunctive after verbs of requesting/ordering
- `data/exercises/gcse-indirect-questions.json` - 10 MCQ, question word + subjunctive after verbs of asking/wondering
- `data/exercises/gcse-participles.json` - 10 MCQ, present active / PPP / future active participial phrases
- `data/exercises/gcse-purpose.json` - 10 MCQ, ut/nē + subjunctive purpose + ad + gerundive
- `data/exercises/gcse-result.json` - 10 MCQ, tam/ita/adeō/tantus + ut + subjunctive
- `data/exercises/gcse-fearing.json` - 10 MCQ, timeō/vereor/metuō + nē (positive) / ut (negative)
- `data/exercises/gcse-ablative-absolute.json` - 10 MCQ, ablative noun + PPP or present participle
- `data/exercises/gcse-temporal-causal-concessive.json` - 10 MCQ, cum + indicative/subjunctive, quamquam, dum
- `data/exercises/gcse-conditionals.json` - 10 MCQ, sī/nisi + indicative / imperfect subjunctive / pluperfect subjunctive

## Decisions Made

- Syntax exercises use `blank_word: ""` (empty string) since no gap-fill functionality is needed; the engine ignores this field when empty
- Fearing clause file explicitly distinguishes nē = positive fear ("that it will happen") from ut = negative fear ("that it will not happen") — the counter-intuitive reversal is stressed in every relevant explanation
- Conditionals file uses clear option labels: "open conditional", "unfulfilled conditional (present)", "unfulfilled conditional (past)" — these match the terminology expected in J282 mark schemes
- Ablative absolute explanations always confirm the ablative noun is not the main clause subject — this is the key diagnostic students must learn

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 10 exercise JSON files are ready for fetch() by construction pages in plans 02 and 03
- Files follow the exact schema established by existing exercise files — no page-side changes needed
- Construction names used in options pools match expected page content (plans 02 and 03 authors can reference these files for exact construction names and question formats)

---
*Phase: 04-syntax*
*Completed: 2026-03-25*

## Self-Check: PASSED

- All 10 exercise JSON files confirmed present on disk
- Task commits f16b3f0 and b0c51a8 confirmed in git log
