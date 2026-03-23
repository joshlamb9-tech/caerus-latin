# Supabase: GCSE Product Gate Setup

## What this does

Adds the `latin-gcse` product identifier to Supabase so the auth guard on GCSE pages can check for it.
This is a one-time manual step in the Supabase dashboard.

## Step 1 — Create a test access_grants row (SQL Editor)

Open the Supabase dashboard → SQL Editor and run:

```sql
-- Check current access_grants columns
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'access_grants'
ORDER BY ordinal_position;
```

Confirm the table has: `user_id`, `product`, `valid_until`, `grant_type`.

## Step 2 — Insert a grant for your own account (for local testing)

```sql
-- Replace <YOUR_USER_ID> with your Supabase auth user ID
-- Find it: Authentication → Users → your email → copy the UUID
INSERT INTO access_grants (user_id, product, valid_until, grant_type)
VALUES (
  '<YOUR_USER_ID>',
  'latin-gcse',
  '2027-12-31T00:00:00Z',
  'subscription'
);
```

## Step 3 — Verify

```sql
SELECT * FROM access_grants WHERE product = 'latin-gcse';
```

Should return the row you just inserted.

## Step 4 — Stripe product (separate step)

A separate Stripe product for `latin-gcse` at £49.99/year is needed before the buy CTA on the landing page can link to a real checkout URL. Create this in the Stripe dashboard and note the payment link URL — it will be hardcoded into the GCSE landing page buy CTA.

## Auth guard change for GCSE pages

Every GCSE page auth guard checks:
```javascript
.eq('product', 'latin-gcse')
```
instead of:
```javascript
.eq('product', 'latin')
```
No changes to the Supabase schema are required — the `product` column is already a free-text field.
