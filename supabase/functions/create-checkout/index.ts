// Caerus Revision — Create Stripe Embedded Checkout Session

const ALLOWED_ORIGIN = 'https://latin.caerusrevision.co.uk';

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'authorization, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }

  try {
    // Verify user JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return json({ error: 'Unauthorized' }, 401);

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')!;

    // Get user from Supabase
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: authHeader,
        apikey: SUPABASE_ANON_KEY,
      },
    });

    if (!userRes.ok) return json({ error: 'Unauthorized' }, 401);
    const user = await userRes.json();
    if (!user?.id) return json({ error: 'Unauthorized' }, 401);

    // Check for existing valid grant
    const grantRes = await fetch(
      `${SUPABASE_URL}/rest/v1/access_grants?user_id=eq.${user.id}&product=eq.latin&valid_until=gt.${new Date().toISOString()}&select=id&limit=1`,
      {
        headers: {
          Authorization: authHeader,
          apikey: SUPABASE_ANON_KEY,
        },
      },
    );
    const grants = await grantRes.json();
    if (Array.isArray(grants) && grants.length > 0) {
      return json({ alreadyGranted: true });
    }

    // Create Stripe checkout session
    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'ui_mode': 'embedded',
        'mode': 'payment',
        'line_items[0][price_data][currency]': 'gbp',
        'line_items[0][price_data][product_data][name]': 'Caerus Latin — Annual Access',
        'line_items[0][price_data][product_data][description]': 'Full access to vocabulary, grammar, exercises, and practice papers for CE Latin.',
        'line_items[0][price_data][unit_amount]': '4999',
        'line_items[0][quantity]': '1',
        'client_reference_id': user.id,
        'customer_email': user.email ?? '',
        'return_url': 'https://latin.caerusrevision.co.uk/welcome.html?session_id={CHECKOUT_SESSION_ID}',
      }),
    });

    const session = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error('Stripe error:', session);
      return json({ error: session?.error?.message ?? 'Stripe error' }, 500);
    }

    return json({ clientSecret: session.client_secret });

  } catch (err) {
    console.error('Unhandled error:', err);
    return json({ error: String(err) }, 500);
  }
});
