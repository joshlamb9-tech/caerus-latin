# Phase 1: Infrastructure - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Add a GCSE product gate (`latin-gcse`) to Supabase, insert a GCSE nav item into all 15 existing CE HTML pages, and build a GCSE landing page. This phase makes the GCSE section discoverable and purchasable — content comes in later phases.

</domain>

<decisions>
## Implementation Decisions

### GCSE nav placement
- Visual separator approach: GCSE link is styled differently from CE nav items (accent colour or a "NEW" badge) to communicate the product boundary
- Position: after the Leaderboard link, before the Account link
- Goes on ALL existing CE pages (INFRA-02 confirmed as all-pages requirement)
- Single link to GCSE landing page — not a dropdown group at this stage (will expand in later phases as GCSE content grows)

### Auth flow for GCSE pages
- GCSE pages check `product = 'latin-gcse'` in `access_grants` (mirrors existing CE guard pattern)
- Users without `latin-gcse` access see a teaser: page content is blurred/overlaid with a centred "Unlock GCSE — £49.99/year" panel
- The teaser CTA links directly to Stripe checkout for the `latin-gcse` product
- Logged-in CE users who lack a GCSE grant see an upgrade prompt in the teaser (same mechanism, different copy: "You have CE access — upgrade to GCSE")
- The teaser pattern is self-contained per GCSE page — no changes to login.html required

### GCSE landing page
- Dual-view page: non-subscribers see a sales pitch (what's included, pricing, buy CTA); subscribers see a hub (starting points, section links)
- View selection is done client-side after auth check (same auth guard pattern as other pages, then branch on access)
- Includes a full content inventory with placeholder links for sections not yet built — sections marked "Coming soon" until phases complete
- Core message: "Everything for OCR J282 in one place — vocabulary, grammar, syntax, translation, literature, mock papers"
- The buy CTA links directly to Stripe checkout

### Nav update method
- Existing 15 CE HTML files: update via a one-off Node.js injection script that adds the GCSE nav item to every `.html` file in the root directory
- The script runs once and is then deleted (or kept in `scripts/` for reference)
- New GCSE pages: hardcode nav same as CE — copy-paste pattern, no shared include

### Claude's Discretion
- Exact accent colour / badge design for the GCSE nav link (must not clash with existing style.css)
- Blur intensity and overlay opacity for the teaser
- Precise copy on the landing page and teaser panels
- Stripe product creation steps (external to codebase — noted for planner to flag as a prerequisite)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Auth guard pattern
- `index.html` — Reference implementation of the CE auth guard (inline script, `product = 'latin'`, `access_grants` table query, session handling, sign-out injection)
- `grammar.html` — Simpler CE page with the same guard pattern — use as the template for new GCSE pages

### Nav structure
- `index.html` — Full nav HTML (`.site-nav`, `nav-group`, `nav-group-toggle`, `nav-group-menu` classes) — replicate this pattern in GCSE pages
- `css/style.css` — All existing nav styles; GCSE item styling must extend, not override

### Data and config
- `.env` — Supabase URL and anon key (already in use; GCSE guard uses same credentials)

### Project constraints
- `.planning/REQUIREMENTS.md` — INFRA-01, INFRA-02, INFRA-03 acceptance criteria
- `.planning/PROJECT.md` — Tech stack constraints (plain HTML/CSS/JS, EB Garamond + Playfair Display fonts, no build system)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Auth guard (inline `<script>` block): copy-paste into every new GCSE page, change `product` from `'latin'` to `'latin-gcse'`
- Nav HTML block: copy-paste with GCSE item added (after Leaderboard)
- `css/style.css`: all existing styles; extend with GCSE-specific classes, don't modify existing rules

### Established Patterns
- Every page is standalone HTML — no templating, no build step
- Auth guard hides the entire body (`visibility: hidden`) until access is confirmed
- `window.CR_AUTH` and `cr-auth` custom event used by page JS to know auth is done
- Sign-out link is injected dynamically into the nav by the auth guard script

### Integration Points
- New GCSE landing page: `gcse/index.html` (or `gcse-home.html` in root — planner to decide directory structure)
- Injection script: targets all `.html` files in root, inserts GCSE `<li>` after the Leaderboard `<li>`
- Supabase `access_grants` table: needs a `latin-gcse` product row — this is the gate (INFRA-01)

</code_context>

<specifics>
## Specific Ideas

- GCSE nav item should visually communicate "this is different / new" — accent colour or a "NEW" badge are both acceptable; must not look out of place in the dark navy header
- Teaser blur/overlay should feel like a paywall, not a broken page — clear messaging and a prominent CTA
- Landing page "coming soon" placeholders should be present from launch so subscribers know what's coming — not a surprise when phases complete

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-infrastructure*
*Context gathered: 2026-03-23*
