# Phase 7: Mock Papers - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Build 4 full-length mock Language papers (J282/01) as HTML pages with per-section mark scheme reveals, plus a "Coming from CE?" orientation page that maps CE→GCSE gaps with direct links to the relevant GCSE content pages. This is the final phase of the GCSE milestone.

</domain>

<decisions>
## Implementation Decisions

### Paper format and delivery
- **D-01:** Each mock paper is a standalone HTML page in `gcse/mock-papers/` (e.g. `paper-1.html`, `paper-2.html`, etc.)
- **D-02:** Papers are on-screen HTML, not PDFs — students can print via browser if they want paper copies
- **D-03:** Each paper page includes timing guidance (1h 30min) and total marks (100) in a header banner
- **D-04:** Auth-gated with `latin-gcse` product check — hard redirect pattern (same as syntax/grammar sub-pages)

### Mark scheme presentation
- **D-05:** Mark schemes are revealed per-section via toggle buttons — "Show answers for Section A", "Show answers for Section B", etc.
- **D-06:** Same reveal pattern as translation passage pages (gcse/translation/passages.html) — button toggles visibility of answer div
- **D-07:** Key marking phrases highlighted in bold within revealed answers
- **D-08:** Each answer shows mark allocation (e.g. "[2 marks]") matching OCR mark scheme format

### Paper content scope
- **D-09:** All 4 papers follow authentic J282/01 Language paper structure: Section A (unseen passage comprehension + translation), Section B (shorter passages + grammar questions), Section C (English-to-Latin sentences)
- **D-10:** All 4 papers at genuine exam-level difficulty — no simplified or progressive difficulty
- **D-11:** Variety comes from different passage topics and question types, not difficulty levels
- **D-12:** Latin text uses macron accents throughout (consistent with all prior data)

### Coming from CE? page
- **D-13:** Lives at `gcse/coming-from-ce.html` (top-level in gcse/, not in mock-papers/)
- **D-14:** Gap analysis framing: "You already know X from CE, now learn Y for GCSE"
- **D-15:** Each gap area links directly to the relevant GCSE page (e.g. passive voice → gcse/grammar/passive.html)
- **D-16:** Key gap areas: passive voice, subjunctive, deponents, gerunds/gerundives, extended pronouns, syntax constructions (10 types), translation technique, literature analysis (PETE/MANGOES)
- **D-17:** Auth-gated with `latin-gcse` — hard redirect pattern

### Hub integration
- **D-18:** GCSE hub (`gcse/index.html`) Mock Papers card activated (remove coming-soon, link to mock-papers/index.html or directly to paper list)
- **D-19:** Mock Papers nav group added to nav on all GCSE pages (matching Grammar, Syntax, Translation, Literature pattern)
- **D-20:** "Coming from CE?" gets its own link in the nav or a card on the GCSE hub

### Claude's Discretion
- Whether mock papers need a hub/index page or if the GCSE hub card links directly to individual papers
- Exact passage content, questions, and mark schemes — correctness and J282 authenticity matter
- Visual design of the timer/marks banner on paper pages
- How to present the section structure within each paper page
- Whether "Coming from CE?" is a card on the GCSE hub or just a nav link

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Auth guard and page patterns
- `gcse/translation/passages.html` — Toggle reveal pattern for mark scheme sections; auth-gated content page
- `gcse/syntax/index.html` — Hub page with tease pattern (if mock-papers hub is created)
- `gcse/literature/index.html` — Most recent hub page pattern

### Existing paper patterns
- `practice-papers.html` — CE practice papers page (existing site pattern for paper-style content)

### Hub and nav
- `gcse/index.html` — Hub page with coming-soon Mock Papers card to activate; nav group structure
- `css/style.css` — All existing styles; extend only

### Project constraints
- `.planning/PROJECT.md` — Tech stack: plain HTML/CSS/JS, EB Garamond + Playfair Display, no build system
- `.planning/REQUIREMENTS.md` — MOCK-01, MOCK-02 acceptance criteria

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Toggle reveal JS pattern from `gcse/translation/passages.html` — showTranslation() function toggles visibility of answer divs; reuse for mark scheme reveals
- Auth guard inline script (from any `gcse/` sub-page) — copy-paste for all mock-papers pages
- Exam Tip callout CSS (`.exam-tip`) — reuse for marking guidance callouts
- Hub card pattern from `gcse/index.html` — reuse for Mock Papers card activation
- Nav group pattern (Grammar, Syntax, Translation, Literature dropdowns) — extend with Mock Papers group

### Established Patterns
- Every page is standalone HTML — no templating, no build step
- Auth guard hides entire body until access_grants check resolves
- Relative paths from `gcse/mock-papers/`: `../../css/style.css`, `../../login.html`
- Relative paths from `gcse/coming-from-ce.html`: `../css/style.css`, `../login.html`

### Integration Points
- New subdirectory `gcse/mock-papers/` for paper HTML pages
- New file `gcse/coming-from-ce.html` for CE orientation
- `gcse/index.html` hub: activate Mock Papers card + add Mock Papers nav group + add Coming from CE link/card

</code_context>

<specifics>
## Specific Ideas

- Papers should feel like a real OCR exam — section headers, mark allocations, timing guidance all match the official J282/01 format
- "Coming from CE?" should be encouraging, not overwhelming — frame GCSE additions as building on a strong CE foundation
- Mark scheme reveals per section allow students to self-mark section by section, which is more useful than a single reveal at the end

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 07-mock-papers*
*Context gathered: 2026-03-26*
