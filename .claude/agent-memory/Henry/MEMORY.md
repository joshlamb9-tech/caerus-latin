# Henry — Memory for Caerus Latin

## Product Facts

- URL: https://latin.caerusrevision.co.uk
- Price: £29.99/year per user (annual access, one payment, via Stripe)
- Auth: Supabase auth + access_grants table checked on every page load
- Stack: vanilla JS, GitHub Pages hosted, Supabase backend, Stripe embedded checkout
- PWA: installable, works offline
- Content: full ISEB CE vocabulary, grammar tables, flashcards, quizzes, translation drills, past papers, original practice papers at Levels 1/2/3
- Credibility lines: "Built on R.C. Bass (Nova Latina) methodology · Reviewed by Heads of Classics"
- Visual identity: navy (#1a2744), gold (#c9a84c), cream (#faf8f3), Playfair Display + EB Garamond — premium, classical aesthetic

## Market Intelligence (as of March 2026)

- The CE Latin revision digital space is essentially EMPTY. No dedicated paid online CE Latin revision product exists.
- Parent communities (Mumsnet) recommend only physical books: Galore Park guides, past papers, CGP books. No digital products mentioned at all.
- Existing online Latin resources: "Vir Drinks Beer" (free, old), Cambridge Latin Course (curriculum-based, not CE-focused), Quizlet (generic).
- ISEB endorses Galore Park books — there is no ISEB-endorsed digital resource for Latin.
- Target universe: ~500 IAPS prep schools in UK. Latin is optional at CE but commonly taken at prep schools aiming for top senior schools (Eton, Harrow, Winchester, etc.).
- Parents in this segment are highly motivated, anxious about CE outcomes, and financially comfortable. £29.99 is not a meaningful price barrier.
- Key parent anxiety phrase (Mumsnet): "where do we even start with revision?" — they don't know what good looks like.
- Mumsnet is the single best organic channel for reaching these parents.

## Advertising Strategy Notes (March 2026)

- Primary audience: PARENTS of Year 7/8 prep school pupils taking Latin for CE, not pupils themselves
- Secondary audience: the pupils themselves (but parents hold the card)
- Best timing: September (CE year starts), January (post-Christmas panic), March-April (final push before May/June exams)
- Best channels in priority order: (1) Mumsnet organic/paid, (2) Facebook groups for prep school parents, (3) Google search ads on intent keywords, (4) Instagram targeting parents aged 35-50
- Avoid: LinkedIn (wrong context), TikTok (wrong demographic for buyers), Product Hunt (irrelevant audience)
- The landing page (login.html) doubles as the sales page — this is a gap. No public marketing landing page exists.
- A public landing page at caerusrevision.co.uk or latin.caerusrevision.co.uk/about should be the first build priority before any paid advertising spend.

## Key Decisions Pending

- No public marketing landing page exists — paid ads have nowhere good to send traffic
- No email capture for non-purchasers — losing warm leads
- Stripe key in login.html is still test mode (pk_test_...) — must go live before real sales
