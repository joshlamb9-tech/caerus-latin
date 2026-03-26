# Caerus Latin — GCSE Section

## What This Is

A new GCSE Latin revision section added to the existing Caerus Latin site (latin.caerusrevision.co.uk), which currently covers ISEB Common Entrance. The GCSE section targets OCR J282 (9–1) and provides vocabulary, grammar, syntax, translation practice, literature tools, and Literature & Culture content. It is gated as a separate product (`latin-gcse`) at £49.99/year via the existing Supabase + Stripe infrastructure.

## Core Value

A GCSE student using this site should be able to revise every examinable element of OCR J282 in one place — vocabulary, grammar, syntax constructions, translation technique, and literature skills — without needing a tutor or textbook alongside it.

## Requirements

### Validated

- ✓ Static HTML/CSS/JS site on GitHub Pages — existing
- ✓ Supabase auth + access_grants paywall — existing
- ✓ Stripe payments — existing
- ✓ CE Latin vocabulary (219 words), grammar (declensions 1–3, conjugations 1–4, active only), exercises, practice papers — existing
- ✓ GCSE product gate (`latin-gcse`) in Supabase access_grants — Phase 1
- ✓ GCSE nav section added to all existing pages — Phase 1
- ✓ GCSE section landing/home page — Phase 1
- ✓ DVL vocabulary extended from 219 to ~450 words with GCSE tagging — Phase 2
- ✓ Vocabulary drills covering full DVL (flashcards, speed recall, GCSE-new filter, verb principal parts) — Phase 2
- ✓ 4th and 5th declension noun tables with exercises — Phase 3
- ✓ Full passive voice tables (all tenses) with exercises — Phase 3
- ✓ Subjunctive tables (present, imperfect, pluperfect) with exercises — Phase 3
- ✓ Deponent verb page with parsing exercises — Phase 3
- ✓ Gerund and gerundive page — Phase 3
- ✓ Extended pronoun tables (hic/haec/hoc, ille/illa/illud, qui/quae/quod, ipse) — Phase 3
- ✓ 10 syntax pages: indirect statement, purpose clauses, result clauses, indirect commands, indirect questions, ablative absolute, temporal/causal/concessive clauses, conditionals, fearing clauses, participles — Phase 4
- ✓ English-to-Latin practice sets (10 sets × 3 sentences) — Phase 5
- ✓ Practice passage library (6–8 tagged unseen passages) — Phase 5
- ✓ PETE method + MANGOES literary devices page — Phase 6
- ✓ 10-mark essay skills page with template and model — Phase 6
- ✓ Literature & Culture pages for 3 themes (Entertainment, Romans in Britain, Myths and Beliefs) — Phase 6

- ✓ 4 mock Language papers (J282/01) with mark schemes — Phase 7
- ✓ "Coming from CE?" orientation page — Phase 7

### Active

All v1.0 requirements complete. No active requirements remain.

### Out of Scope

- Set-text-specific literature content — texts rotate every 2 years, too volatile for v1; generic literature tools only
- Mobile app — web-first
- Gamification/leaderboard for GCSE — CE leaderboard exists; GCSE v1 focuses on content depth
- Audio/listening content — no audio in J282 Language paper

## Context

- **Existing site:** latin.caerusrevision.co.uk — plain HTML/CSS/JS, GitHub Pages, no build system. Every page is a standalone .html file with nav and auth guard duplicated inline.
- **Auth guard:** Inline script in every page checks `access_grants` table for `product = 'latin'` with valid `valid_until`. GCSE pages will check `product = 'latin-gcse'`.
- **Nav:** Hardcoded in every HTML file. Adding GCSE section requires editing all existing pages.
- **Data:** Clean JSON files in `/data/vocabulary/` and `/data/grammar/`. Extend, don't rebuild.
- **Spec source:** OCR J282 specification researched via NotebookLM notebook (21 sources). Grammar requirements, assessment structure, and content plan fully documented.
- **Content plan:** Bob (R.C. Bass agent) produced a complete 12-phase developer brief covering all spec requirements in priority order.
- **Pricing:** £49.99/year — same as CE Latin. Separate Stripe product needed.

## Constraints

- **Tech stack:** Plain HTML/CSS/JS only — no framework, no build system, no TypeScript
- **Fonts:** EB Garamond (body) + Playfair Display (headings) — must match existing site
- **Auth:** Supabase + existing auth guard pattern — copy-paste per page, no refactor
- **Compatibility:** Must not break existing CE Latin section

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Separate product gate (`latin-gcse`) | Enables independent pricing and future bundling | — Pending |
| £49.99/year pricing | Accessible price to build user base; matches CE price | — Pending |
| Language component first | 50% of marks, compulsory — highest ROI | — Pending |
| Generic literature tools only (no set texts) | Set texts rotate every 2 years — too volatile for v1 | — Pending |
| Reuse existing exercise engine | Avoids rebuilding; extend data + filters | ✓ Confirmed — MCQ engine copy-pasted per page works reliably |
| Syntax pages use MCQ not gap-fill | Syntax identification/translation suits MCQ; gap-fill reserved for grammar | ✓ Phase 4 |
| Sequence of tenses as reference-only page | Cross-cutting rule referenced by 6 constructions; no standalone exercises needed | ✓ Phase 4 |

---
*Last updated: 2026-03-26 after Phase 7 (Mock Papers) — v1.0 MILESTONE COMPLETE*
