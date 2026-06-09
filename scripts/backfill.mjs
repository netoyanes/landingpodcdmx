// One-time backfill: push existing Airtable records into Supabase via the webhook.
// Usage: AIRTABLE_TOKEN=xxx AIRTABLE_WEBHOOK_SECRET=xxx node scripts/backfill.mjs

const AIRTABLE_TOKEN  = process.env.AIRTABLE_TOKEN;
const BASE_ID         = 'appAotfQn6AhgeUko';
const TABLE_ID        = 'tblL7Ad76S6Izk2uf';
const WEBHOOK_URL     = process.env.WEBHOOK_URL || 'https://landingpodcdmx.vercel.app/api/webhook/airtable';
const WEBHOOK_SECRET  = process.env.AIRTABLE_WEBHOOK_SECRET;

if (!AIRTABLE_TOKEN || !WEBHOOK_SECRET) {
  console.error('Set AIRTABLE_TOKEN and AIRTABLE_WEBHOOK_SECRET env vars.');
  process.exit(1);
}

const res = await fetch(
  `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?sort[0][field]=fldeaM4YlZrRgnGkf&sort[0][direction]=asc`,
  { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
);
const { records, error } = await res.json();
if (error) { console.error('Airtable error:', error); process.exit(1); }

console.log(`Backfilling ${records.length} records…`);

for (let i = 0; i < records.length; i += 5) {
  const batch = records.slice(i, i + 5);
  const r = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-airtable-secret': WEBHOOK_SECRET },
    body: JSON.stringify({ records: batch }),
  });
  const body = await r.json();
  console.log(`[${Math.min(i + 5, records.length)}/${records.length}]`, body);
  await new Promise(r => setTimeout(r, 500));
}

console.log('Backfill complete.');
