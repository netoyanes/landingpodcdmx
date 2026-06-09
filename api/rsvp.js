export const config = { runtime: 'edge' };

const BASE_ID  = 'appAotfQn6AhgeUko';
const TABLE_ID = 'tbll6xvatTKtLcwK4';

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body;
  try { body = await req.json(); } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const { name, email, ig, kind, eventTitle } = body;
  if (!name || !email) {
    return new Response(JSON.stringify({ error: 'name and email required' }), { status: 400 });
  }

  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    return new Response(JSON.stringify({ error: 'not configured' }), { status: 500 });
  }

  const notes = [
    ig ? `Instagram: ${ig}` : null,
    kind === 'exhibition' ? 'RSVP: Exhibition' : 'RSVP: Event',
  ].filter(Boolean).join('\n');

  const payload = {
    records: [{
      fields: {
        Name:                 name,
        Email:                email,
        'Brand/Event Name':   eventTitle || 'POD Art House',
        Notes:                notes,
      },
    }],
  };

  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    return new Response(JSON.stringify({ error: err }), { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
