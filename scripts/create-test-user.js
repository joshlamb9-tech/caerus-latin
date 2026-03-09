#!/usr/bin/env node
/**
 * create-test-user.js
 * Creates a Supabase user and grants them full Caerus Latin access.
 *
 * Usage:
 *   node scripts/create-test-user.js <email> <password> [valid-until]
 *
 * Example:
 *   node scripts/create-test-user.js test@example.com password123
 *   node scripts/create-test-user.js test@example.com password123 2027-12-31
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in the environment or a .env file
 * in this directory. Get it from:
 *   Supabase Dashboard → Project Settings → API → service_role key
 */

// ── Config ──────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://dlcseuejvducbsjhqvze.supabase.co';

// Load .env if present (simple parser, no dependencies)
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  try {
    const envPath = resolve(__dir, '../.env');
    const lines = readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  } catch (_) { /* no .env — use system env */ }
}

loadEnv();

const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('\n❌  SUPABASE_SERVICE_ROLE_KEY not found.');
  console.error('   Add it to .env in the project root:');
  console.error('   SUPABASE_SERVICE_ROLE_KEY=eyJ...\n');
  console.error('   Get it from: Supabase → Project Settings → API → service_role\n');
  process.exit(1);
}

// ── Args ─────────────────────────────────────────────────────────────
const [email, password, validUntilArg] = process.argv.slice(2);

if (!email || !password) {
  console.error('\nUsage: node scripts/create-test-user.js <email> <password> [valid-until]\n');
  process.exit(1);
}

const validUntil = validUntilArg
  ? new Date(validUntilArg).toISOString()
  : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(); // 1 year from now

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
  'apikey': SERVICE_ROLE_KEY,
};

// ── Main ─────────────────────────────────────────────────────────────
async function main() {
  console.log(`\nCreating user: ${email}`);

  // 1. Create user via Auth Admin API
  const createRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password,
      email_confirm: true, // skip email confirmation
    }),
  });

  const created = await createRes.json();

  if (!createRes.ok) {
    // If user already exists, look them up instead
    if (created.msg && created.msg.includes('already')) {
      console.log('  User already exists — looking up ID...');
      const listRes = await fetch(
        `${SUPABASE_URL}/auth/v1/admin/users?email=${encodeURIComponent(email)}`,
        { headers }
      );
      const list = await listRes.json();
      const existing = list.users && list.users[0];
      if (!existing) {
        console.error('❌  Could not find existing user:', created);
        process.exit(1);
      }
      return grantAccess(existing.id, email);
    }
    console.error('❌  Failed to create user:', created);
    process.exit(1);
  }

  const userId = created.id;
  console.log(`  ✓ User created: ${userId}`);
  return grantAccess(userId, email);
}

async function grantAccess(userId, email) {
  console.log(`  Granting Latin access until ${validUntil.split('T')[0]}...`);

  const grantRes = await fetch(`${SUPABASE_URL}/rest/v1/access_grants`, {
    method: 'POST',
    headers: { ...headers, 'Prefer': 'resolution=merge-duplicates' },
    body: JSON.stringify({
      user_id: userId,
      email,
      product: 'latin',
      valid_until: validUntil,
    }),
  });

  if (!grantRes.ok) {
    const err = await grantRes.text();
    console.error('❌  Failed to insert access grant:', err);
    process.exit(1);
  }

  console.log(`\n✅  Done!\n`);
  console.log(`   Email:    ${email}`);
  console.log(`   Password: (as set)`);
  console.log(`   Access:   Caerus Latin until ${validUntil.split('T')[0]}`);
  console.log(`   Site:     https://latin.caerusrevision.co.uk/login.html\n`);
}

main().catch(err => {
  console.error('❌  Unexpected error:', err.message);
  process.exit(1);
});
