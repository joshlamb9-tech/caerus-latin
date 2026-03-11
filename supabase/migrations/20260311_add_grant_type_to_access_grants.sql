-- Migration: add grant_type column to access_grants
-- Run this in the Supabase SQL editor (Dashboard > SQL Editor > New query)
--
-- Context: The free trial system requires distinguishing trial grants from paid
-- grants. This migration adds a grant_type column (default 'paid' so existing
-- rows are unaffected) and backfills any rows that may have been written by the
-- start-trial edge function before the column existed.
--
-- Safe to run multiple times (uses IF NOT EXISTS / DO $$ guards).

-- 1. Add the column if it doesn't already exist
ALTER TABLE access_grants
  ADD COLUMN IF NOT EXISTS grant_type TEXT NOT NULL DEFAULT 'paid';

-- 2. Add a check constraint so only known values are allowed
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'access_grants'
      AND constraint_name = 'access_grants_grant_type_check'
  ) THEN
    ALTER TABLE access_grants
      ADD CONSTRAINT access_grants_grant_type_check
      CHECK (grant_type IN ('paid', 'trial'));
  END IF;
END
$$;

-- 3. Index on (user_id, product, grant_type) so the trial-detection query is fast
CREATE INDEX IF NOT EXISTS idx_access_grants_user_product_type
  ON access_grants (user_id, product, grant_type);

-- 4. If the access_grants table doesn't exist at all, create it from scratch.
--    (The ALTER above will have already failed gracefully in that case — run
--    this block instead if starting from a clean database.)
--
-- CREATE TABLE IF NOT EXISTS access_grants (
--   id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
--   email       TEXT        NOT NULL,
--   product     TEXT        NOT NULL,
--   grant_type  TEXT        NOT NULL DEFAULT 'paid'
--                           CHECK (grant_type IN ('paid', 'trial')),
--   valid_until TIMESTAMPTZ NOT NULL,
--   created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
-- );
--
-- CREATE INDEX IF NOT EXISTS idx_access_grants_user_product
--   ON access_grants (user_id, product);
-- CREATE INDEX IF NOT EXISTS idx_access_grants_email_product
--   ON access_grants (email, product);
-- CREATE INDEX IF NOT EXISTS idx_access_grants_user_product_type
--   ON access_grants (user_id, product, grant_type);

-- 5. RLS: the start-trial edge function uses the service role key so it bypasses
--    RLS when writing grants. The read-side policy for authenticated users should
--    already exist; confirm it allows users to read their own rows:
--
--   SELECT * FROM pg_policies WHERE tablename = 'access_grants';
--
--    If no policy exists yet, add:
--
-- ALTER TABLE access_grants ENABLE ROW LEVEL SECURITY;
--
-- CREATE POLICY "Users can read their own grants" ON access_grants
--   FOR SELECT USING (auth.uid() = user_id);
