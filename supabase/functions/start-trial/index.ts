// Caerus Latin — Start Free Trial
// Creates a Supabase user account and writes a 7-day trial access grant.
// No payment required. Called from login.html trial tab.
//
// Deploy: supabase functions deploy start-trial
// Env vars required:
//   SUPABASE_URL              — auto-injected
//   SUPABASE_SERVICE_ROLE_KEY — auto-injected (needed to create users + write grants)

const ALLOWED_ORIGIN = 'https://latin.caerusrevision.co.uk';
const TRIAL_DAYS = 7;

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'content-type, authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }

  let email: string, password: string;
  try {
    const body = await req.json();
    email    = (body.email    || '').trim().toLowerCase();
    password = (body.password || '').trim();
  } catch {
    return json({ error: 'Invalid request body' }, 400);
  }

  if (!email || !password) {
    return json({ error: 'Email and password are required' }, 400);
  }

  if (password.length < 8) {
    return json({ error: 'Password must be at least 8 characters' }, 400);
  }

  const SUPABASE_URL          = Deno.env.get('SUPABASE_URL')!;
  const SUPABASE_ANON_KEY     = Deno.env.get('SUPABASE_ANON_KEY')!;
  const SERVICE_ROLE_KEY      = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

  // ── 1. Check if this email already has any access grant (paid or trial) ──
  const existingGrantRes = await fetch(
    `${SUPABASE_URL}/rest/v1/access_grants?email=eq.${encodeURIComponent(email)}&product=eq.latin&select=id,grant_type,valid_until&limit=1`,
    {
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
    },
  );
  const existingGrants = await existingGrantRes.json();

  if (Array.isArray(existingGrants) && existingGrants.length > 0) {
    const grant = existingGrants[0];
    const isExpired = new Date(grant.valid_until) < new Date();

    if (grant.grant_type === 'paid') {
      // Already a paying customer — just tell them to sign in
      return json({ error: 'already_paid', message: 'You already have a paid subscription. Please sign in.' }, 409);
    }

    if (grant.grant_type === 'trial' && !isExpired) {
      // Trial still active — tell them to sign in
      return json({ error: 'trial_active', message: 'You already have an active trial. Please sign in.' }, 409);
    }

    if (grant.grant_type === 'trial' && isExpired) {
      // Trial has expired — nudge to pay
      return json({ error: 'trial_expired', message: 'Your free trial has ended. Please subscribe to continue.' }, 409);
    }
  }

  // ── 2. Try to create the user account ──
  const signUpRes = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ email, password }),
  });

  const signUpData = await signUpRes.json();

  // Supabase returns 200 even for duplicate emails (to prevent enumeration)
  // but the session will be null if email confirmation is required
  // and if the user exists, we get a specific error
  if (!signUpRes.ok) {
    console.error('SignUp error:', signUpData);
    // If user already exists, we get error about existing user
    if (signUpData?.code === 'user_already_exists' || signUpData?.msg?.includes('already')) {
      return json({ error: 'email_taken', message: 'An account with this email already exists. Please sign in.' }, 409);
    }
    return json({ error: signUpData?.msg || signUpData?.message || 'Could not create account' }, 400);
  }

  // If email confirmation is enabled, signUpData.session will be null
  // We need to handle both cases
  let userId: string | null = null;
  let accessToken: string | null = null;
  let refreshToken: string | null = null;

  if (signUpData?.user?.id) {
    userId = signUpData.user.id;
  }
  if (signUpData?.session?.access_token) {
    accessToken  = signUpData.session.access_token;
    refreshToken = signUpData.session.refresh_token;
  }

  // If no user ID came back, something unexpected happened
  if (!userId) {
    // Check if the user already exists (Supabase sometimes returns 200 with no user)
    // Look them up via admin API
    const listRes = await fetch(
      `${SUPABASE_URL}/auth/v1/admin/users?email=${encodeURIComponent(email)}`,
      {
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        },
      },
    );

    if (listRes.ok) {
      const listData = await listRes.json();
      const existingUser = listData?.users?.[0];
      if (existingUser?.id) {
        userId = existingUser.id;
      }
    }

    if (!userId) {
      return json({ error: 'Could not create account. Please try again.' }, 500);
    }
  }

  // ── 3. If no session yet (email confirmation required), sign in to get one ──
  // We disable email confirmation for trial flow by signing in directly.
  // For Supabase projects with "Enable email confirmations" off, signUp returns a session.
  // If confirmations are on, we need a different approach — use admin to confirm then sign in.
  if (!accessToken) {
    // Try to confirm the user via admin API
    const confirmRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ email_confirm: true }),
    });

    if (!confirmRes.ok) {
      console.error('Could not confirm user:', await confirmRes.text());
    }

    // Now sign in to get a session
    const signInRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ email, password }),
    });

    const signInData = await signInRes.json();

    if (!signInRes.ok || !signInData?.access_token) {
      console.error('Sign-in after confirm failed:', signInData);
      return json({ error: 'Account created but could not sign in automatically. Please sign in manually.' }, 500);
    }

    accessToken  = signInData.access_token;
    refreshToken = signInData.refresh_token;
    if (!userId && signInData?.user?.id) {
      userId = signInData.user.id;
    }
  }

  // ── 4. Write the trial access grant ──
  const trialUntil = new Date();
  trialUntil.setDate(trialUntil.getDate() + TRIAL_DAYS);

  const grantRes = await fetch(`${SUPABASE_URL}/rest/v1/access_grants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      user_id:    userId,
      email:      email,
      product:    'latin',
      grant_type: 'trial',
      valid_until: trialUntil.toISOString(),
    }),
  });

  if (!grantRes.ok) {
    const grantErr = await grantRes.text();
    console.error('Could not write trial grant:', grantErr);
    // Don't fail the user — they have an account, just no grant yet
    // Return success with a note
  }

  // ── 5. Return the session so the client can sign the user in ──
  return json({
    access_token:  accessToken,
    refresh_token: refreshToken,
    trial_until:   trialUntil.toISOString(),
  });
});
