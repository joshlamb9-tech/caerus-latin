# Phase 4: Syntax - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Build 11 pages covering every J282-examinable syntax construction: indirect statement, purpose clauses, result clauses, indirect commands, indirect questions, ablative absolute, temporal/causal/concessive clauses, conditionals, fearing clauses, participles, and a dedicated sequence-of-tenses page. Each construction page explains the rule, provides worked examples, a comparison table for look-alike constructions, a See Also section, an Exam Tip, and 10 mixed exercises. A syntax index page (gcse/syntax/index.html) serves as the hub for all 11 pages.

</domain>

<decisions>
## Implementation Decisions

### Exercise format
- Mixed: ~5 identification MCQ + ~5 translation MCQ per page (50/50, every page)
- Identification MCQ: given a Latin sentence, pick which construction is being used (4 options)
- Translation MCQ: given a Latin sentence with the construction present, pick the correct English translation (4 options)
- Same JSON schema and data/exercises/ directory as accidence exercises — e.g. `data/exercises/gcse-indirect-statement.json`, `data/exercises/gcse-purpose.json`, etc.
- Both question types include explanation shown after every answer (matches existing CE gap-fill + accidence behaviour)

### Hub / nav integration
- Syntax index page: `gcse/syntax/index.html` — teaser visible to all (not auth-gated), same approach as gcse/index.html teasing non-subscribers
- Individual construction pages: auth-gated with `product = 'latin-gcse'`
- GCSE hub (`gcse/index.html`) gets one 'Syntax' card with a count badge (e.g. '11 constructions')
- Syntax hub card replaces any coming-soon placeholder

### Content depth
- Full treatment per page: explain construction, formation rules, 3+ worked examples with Latin + English
- Comparison table on pages where look-alike constructions exist (e.g. purpose vs result, indirect statement / command / question, temporal / causal / concessive)
- See Also section at the bottom of every page linking to related construction pages
- Sequence of tenses: dedicated page (`gcse/syntax/sequence-of-tenses.html`); individual pages that involve subjunctives link to it rather than repeating the content
- Exam Tip callout box on every page (same style as grammar pages)

### Page ordering and grouping
- Index page lists constructions in pedagogically logical order: simpler constructions first, building toward more complex
- Suggested order: Participles → Ablative Absolute → Indirect Statement → Indirect Commands → Indirect Questions → Purpose Clauses → Result Clauses → Fearing Clauses → Temporal/Causal/Concessive → Conditionals → (Sequence of Tenses)
- Index page groups constructions with section headings (e.g. 'Participles & Ablative Absolute', 'Indirect Constructions', 'Purpose, Result & Fearing', 'Other Clauses')
- Sequence-of-tenses page listed as a reference item below the grouped constructions

### Page structure (per construction page)
1. Auth guard (same pattern as gcse/grammar/*.html)
2. Heading + brief intro (1–2 sentences: what this construction does)
3. Explanation + formation rules
4. Worked examples (3+ sentences, Latin + English)
5. Comparison table (where related look-alikes exist)
6. Exam Tip callout box
7. Link to sequence-of-tenses page (for subjunctive-using constructions)
8. Exercises (10 questions: ~5 ID MCQ + ~5 translation MCQ)
9. See Also links

### Temporal / causal / concessive
- One combined page (`gcse/syntax/temporal-causal-concessive.html`) — matches spec grouping
- Comparison table on this page is especially important: shows how conjunction + mood signals which type (cum + indicative = temporal; cum + subjunctive = causal or concessive; quamquam = concessive)

### URL structure
- All pages at `gcse/syntax/{slug}.html` — consistent with grammar subdirectory pattern
- Slugs: `indirect-statement`, `purpose`, `result`, `indirect-commands`, `indirect-questions`, `ablative-absolute`, `temporal-causal-concessive`, `conditionals`, `fearing`, `participles`, `sequence-of-tenses`
- Relative paths: `../../css/style.css`, `../../data/...`, `../../login.html` (two levels deep)

### Claude's Discretion
- Exact wording of Latin example sentences (correctness is what matters; authenticity preferred)
- Visual design of the comparison tables (should be consistent with existing grammar-table styles)
- Exact grouping labels on the syntax index page
- Whether sequence-of-tenses page includes exercises or is reference-only

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Auth guard and page patterns
- `gcse/grammar/passive.html` — Most recent auth-gated GCSE grammar page; copy auth guard, nav, relative path pattern for gcse/syntax/*.html
- `gcse/vocabulary.html` — Auth guard reference for hard redirect on no-grant
- `gcse/index.html` — Hub page with teaser pattern for non-subscribers; syntax index page uses the same approach

### Exercise data schema
- `data/exercises/gap-fill.json` — CE gap-fill schema: `id`, `sentence`, `blank_word`, `display`, `translation`, `options`, `correct`, `explanation` — GCSE syntax exercise files follow this schema (adapt field usage for ID vs translation questions)

### Style and nav
- `css/style.css` — All existing styles; extend only, never modify
- `gcse/grammar/passive.html` — Exam Tip callout, grammar-table, page layout reference

### Project constraints
- `.planning/PROJECT.md` — Tech stack: plain HTML/CSS/JS, EB Garamond + Playfair Display, no build system
- `.planning/REQUIREMENTS.md` — SYN-01 acceptance criteria

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Auth guard inline script (from `gcse/grammar/passive.html`): copy-paste verbatim, update only the `thisPage` path and redirect target
- Exam Tip callout CSS (from `gcse/grammar/passive.html`): `.exam-tip` class — gold left border, cream background — reuse directly
- Grammar table CSS (`.grammar-table`): reuse for comparison tables and any paradigm displays on syntax pages
- Gap-fill exercise engine: adapt for two question types (ID MCQ + translation MCQ) — same engine, different question framing

### Established Patterns
- Every page is standalone HTML — no templating, no imports. Nav and auth guard copy-pasted inline.
- Auth guard hides entire body (`visibility: hidden`) until access_grants check resolves
- `window.CR_AUTH` and `cr-auth` custom event signal auth completion to page JS
- Relative paths from `gcse/syntax/`: `../../css/style.css`, `../../data/...`, `../../login.html`
- Macron-accented Latin throughout (e.g. `amātur` not `amatur`)

### Integration Points
- `gcse/index.html` hub: replace/add one 'Syntax' card with count badge linking to `gcse/syntax/index.html`
- New subdirectory `gcse/syntax/` — same depth as `gcse/grammar/`, same relative path adjustments
- Exercise JSON files in `data/exercises/` alongside existing `gcse-passive.json`, `gcse-subjunctive.json` etc.

</code_context>

<specifics>
## Specific Ideas

- Sequence of tenses as a dedicated reference page — students on any subjunctive-using construction page can jump straight to it
- Index page groups constructions rather than listing flat — helps students see "indirect statement / command / question are a family"
- Comparison tables especially important for purpose vs result (both use ut + subjunctive; distinguished by meaning) and the three indirect constructions (different trigger verbs and moods)
- Pedagogical order on index: start with participles (recognisable from CE active participles) and build toward more abstract constructions like fearing clauses and conditionals

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-syntax*
*Context gathered: 2026-03-23*
