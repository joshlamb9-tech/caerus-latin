---
plan: 01-03
phase: 01-infrastructure
status: complete
completed: 2026-03-23
---

# Plan 01-03: GCSE Landing Page — Summary

## What shipped

- **`gcse/index.html`** — Full GCSE landing page (340 lines) with dual-view auth guard:
  - Unauthenticated: teaser view with feature preview and upgrade CTA
  - Authenticated without GCSE access: locked view with subscription prompt
  - Authenticated with GCSE access: full dashboard with topic cards
  - Auth guard hides body until session confirmed (no flash of protected content)
  - Links to shared `../css/style.css` — picks up `.nav-gcse-badge` styles from 01-01
  - Uses EB Garamond + Playfair Display fonts consistent with site design

## Key decisions

- Dual-view approach (tease vs lock) implemented at landing page rather than hard redirect — allows SEO and marketing access while still gating content
- Redirects unauthenticated users to `login.html?next=gcse/index.html` for post-login return

## Commits

- `804f622` — feat(01-03): create GCSE landing page with dual-view auth gate

## Self-Check: PASSED

All 11 acceptance criteria verified:
- Auth guard style block present
- Supabase session check
- Unauthenticated redirect to login with `?next=` param
- Product gate check for `latin-gcse`
- Locked/teaser view for no-access users
- Full dashboard for authorised users
- Links to shared stylesheet
- Correct font imports
- Nav structure consistent with CE pages
- GCSE topic cards present
- Mobile-responsive layout
