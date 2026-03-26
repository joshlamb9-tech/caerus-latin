-- Migration: french_scores table + get_french_leaderboard RPC
-- Run this in the Supabase SQL editor (Dashboard > SQL Editor > New query)
--
-- Context: The Speed Recall activity on the French revision site lets students
-- submit their scores and view a leaderboard. No auth is required — students
-- just enter initials. This migration creates the scores table, opens it up
-- for anonymous insert/select, and creates the leaderboard RPC function.
--
-- Safe to run multiple times (uses IF NOT EXISTS / OR REPLACE guards).

-- ── 1. Table ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS french_scores (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  initials   TEXT        NOT NULL,
  score      INTEGER     NOT NULL CHECK (score >= 0),
  mode       TEXT        NOT NULL DEFAULT 'supported',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_french_scores_mode_score
  ON french_scores (mode, score DESC);

-- ── 2. Row Level Security ─────────────────────────────────────────────────────

ALTER TABLE french_scores ENABLE ROW LEVEL SECURITY;

-- Anyone can read all scores (needed for the leaderboard)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'french_scores' AND policyname = 'Public read french_scores'
  ) THEN
    CREATE POLICY "Public read french_scores" ON french_scores
      FOR SELECT USING (true);
  END IF;
END
$$;

-- Anyone can insert a score (no login required)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'french_scores' AND policyname = 'Public insert french_scores'
  ) THEN
    CREATE POLICY "Public insert french_scores" ON french_scores
      FOR INSERT WITH CHECK (true);
  END IF;
END
$$;

-- ── 3. Leaderboard RPC ────────────────────────────────────────────────────────
--
-- Returns one row per initials for the given mode, showing each player's
-- personal best score. The frontend sorts and takes the top 10.
--
-- Called by: db.rpc('get_french_leaderboard', { p_mode: mode })
-- Returns:   [ { initials: 'ABC', best_score: 42 }, ... ]

CREATE OR REPLACE FUNCTION get_french_leaderboard(p_mode TEXT)
RETURNS TABLE (initials TEXT, best_score INTEGER)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT
    fs.initials,
    MAX(fs.score) AS best_score
  FROM french_scores fs
  WHERE fs.mode = p_mode
  GROUP BY fs.initials
  ORDER BY best_score DESC
  LIMIT 50;
$$;

-- Grant execute to anon and authenticated roles so the JS client can call it
GRANT EXECUTE ON FUNCTION get_french_leaderboard(TEXT) TO anon, authenticated;
