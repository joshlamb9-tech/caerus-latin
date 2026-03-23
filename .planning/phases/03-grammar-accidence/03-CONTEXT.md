# Phase 3: Grammar (Accidence) - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Build 6 GCSE grammar topic pages covering accidence that goes beyond CE: 4th/5th declension nouns, full passive voice (all tenses), subjunctive mood (present/imperfect/pluperfect), deponent verbs, gerund and gerundive, and extended pronouns (hic, ille, qui, ipse). Each page has a paradigm table, full explanation, worked examples, exercises, and an exam tip. Syntax constructions (indirect statement, clauses, etc.) are Phase 4.

</domain>

<decisions>
## Implementation Decisions

### Page structure
- One separate HTML page per grammar topic — 6 pages total
- URL path: `gcse/grammar/{topic}.html` (subdirectory under gcse/)
  - `gcse/grammar/declensions.html` — 4th and 5th declension nouns
  - `gcse/grammar/passive.html` — full passive voice (all tenses)
  - `gcse/grammar/subjunctive.html` — subjunctive (present, imperfect, pluperfect)
  - `gcse/grammar/deponents.html` — deponent verbs with parsing exercises
  - `gcse/grammar/gerunds.html` — gerund and gerundive
  - `gcse/grammar/pronouns.html` — hic/haec/hoc, ille/illa/illud, qui/quae/quod, ipse/ipsa/ipsum
- GCSE hub (`gcse/index.html`) gets 6 direct grammar cards — no intermediate grammar index page
- Auth guard on all 6 pages: `product = 'latin-gcse'` (same pattern as gcse/vocabulary.html)

### Exercise format
- 8–10 gap-fill questions per page (multiple choice, 4 options, correct answer + explanation shown after)
- 1 parsing question per page: given a Latin form, student picks the correct grammatical description from 4 options (e.g. "amabantur" → "3rd person plural imperfect passive")
- Total per page: 9–11 questions
- Explanation shown after every answer — matches CE gap-fill behaviour exactly
- Exercise data in separate per-topic JSON files (see data strategy below)

### Data strategy
- Grammar table data: new GCSE-specific files
  - `data/grammar/gcse-nouns.json` — 4th/5th declension paradigms (same schema as nouns.json)
  - `data/grammar/gcse-verbs.json` — passive tenses, subjunctive, deponent patterns (same schema as verbs.json, extended with voice/mood fields)
- Exercise data: one JSON file per topic, in `data/exercises/`
  - `data/exercises/gcse-declensions.json`
  - `data/exercises/gcse-passive.json`
  - `data/exercises/gcse-subjunctive.json`
  - `data/exercises/gcse-deponents.json`
  - `data/exercises/gcse-gerunds.json`
  - `data/exercises/gcse-pronouns.json`
- Existing CE data files (`data/grammar/nouns.json`, `data/grammar/verbs.json`) are NOT modified — GCSE data is fully separate

### Content depth
- Each page has a full explanation section: concept explanation, formation rules, 2–3 worked example sentences with Latin + English translation
- One "Exam Tip" callout box per page (styled consistently) — J282-specific tip (e.g. for passives: look for the agent in the ablative; for subjunctives: recognise the trigger word)
- Same depth across all 6 pages — gerund/gerundive and pronouns get the same full treatment as passive and subjunctive (both are tricky and exam-relevant)
- Page structure within each page: [Auth guard] → [Heading + intro] → [Explanation + formation rules] → [Worked examples] → [Paradigm table(s)] → [Exam Tip callout] → [Exercises]

### Claude's Discretion
- Exact styling of the Exam Tip callout box (must be visually distinct but consistent with site style)
- Whether pronoun page uses tabs or a scrollable layout for 4 paradigm tables
- Precise wording of explanations and example sentences (Latin content correctness is what matters)
- Exercise engine implementation (can reuse CE gap-fill JS pattern)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Auth guard and page patterns
- `gcse/vocabulary.html` — Most recent GCSE page; use as the template for new gcse/grammar/*.html pages (auth guard, nav, latin-gcse product check, redirect behaviour)
- `grammar.html` — CE grammar page: existing table + exercise pattern to replicate/extend for GCSE

### Exercise data schema
- `data/exercises/gap-fill.json` — CE gap-fill schema: `id`, `sentence`, `blank_word`, `display`, `translation`, `options`, `correct`, `explanation` — GCSE exercise files MUST follow this exact schema
- `data/grammar/nouns.json` — CE noun declension schema: `declension`, `name`, `gender`, `example_noun`, `cases`, `singular`, `plural` — gcse-nouns.json extends this
- `data/grammar/verbs.json` — CE verb conjugation schema: `conjugation`, `name`, `example_verb`, `tenses` → `singular`/`plural` — gcse-verbs.json extends this with voice/mood

### Style and nav
- `css/style.css` — All existing styles; new pages extend, never modify
- `gcse/index.html` — Hub page; grammar cards must be added here to make pages reachable (update coming-soon if applicable)

### Project constraints
- `.planning/PROJECT.md` — Tech stack: plain HTML/CSS/JS, EB Garamond + Playfair Display, no build system, no framework
- `.planning/REQUIREMENTS.md` — GRAM-01 through GRAM-06 acceptance criteria

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Auth guard inline script (from `gcse/vocabulary.html`): copy-paste into every `gcse/grammar/*.html`, change nothing except the `thisPage` path value
- CE gap-fill exercise engine (from `grammar.html`): the JS that reads a JSON file and renders gap-fill questions can be reused or adapted for GCSE pages
- `data/grammar/nouns.json` schema: direct model for `data/grammar/gcse-nouns.json`
- `data/grammar/verbs.json` schema: direct model for `data/grammar/gcse-verbs.json`

### Established Patterns
- Every page is standalone HTML — no templating, no build step. Nav and auth guard are copy-pasted inline.
- Auth guard hides entire body (`visibility: hidden`) until `access_grants` check resolves
- `window.CR_AUTH` and `cr-auth` custom event signal auth completion to page JS
- Exercise engine pattern: fetch JSON → render questions → track score → show explanation on answer
- Data files use macron-accented Latin (e.g. `"puellā"` not `"puella"`) — GCSE data must follow the same convention

### Integration Points
- `gcse/index.html` hub cards: 6 new grammar cards needed (one per topic page) — update coming-soon placeholders or add new cards
- New subdirectory `gcse/grammar/` requires relative paths adjusting: `../js/...`, `../../css/style.css`, `../../data/...`
- Nav in `gcse/grammar/*.html` pages: use same nav as other GCSE pages, relative paths one level deeper

</code_context>

<specifics>
## Specific Ideas

- Passive page should note the agent construction (a/ab + ablative) with a worked example — this is a common exam ask
- Subjunctive page should clarify which constructions trigger each tense (sequence of tenses basics) — just enough to recognise, not full syntax (that's Phase 4)
- Deponent parsing exercise should use a verb that appears in the J282 DVL (e.g. loquor, sequor, patior) — keeps exercises grounded in exam vocabulary
- Pronouns page: 4 paradigm tables is a lot — consider accordion or tab layout so the page doesn't overwhelm

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-grammar-accidence*
*Context gathered: 2026-03-23*
