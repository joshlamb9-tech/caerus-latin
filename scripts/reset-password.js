import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(resolve(__dir, '../.env'), 'utf8');
const key = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.+)/)[1].trim();

const SUPABASE_URL = 'https://dlcseuejvducbsjhqvze.supabase.co';
const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}`, 'apikey': key };

const [email, password] = process.argv.slice(2);

const listRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?email=${encodeURIComponent(email)}`, { headers });
const list = await listRes.json();
const user = list.users && list.users[0];

if (!user) { console.error('User not found'); process.exit(1); }

const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${user.id}`, {
  method: 'PUT',
  headers,
  body: JSON.stringify({ password }),
});

const data = await res.json();
if (res.ok) {
  console.log(`✅  Password reset for ${data.email}`);
} else {
  console.error('❌  Failed:', data);
}
