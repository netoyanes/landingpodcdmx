import { createClient } from '@supabase/supabase-js';

export const config = { runtime: 'edge' };

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'event-images';

const FIELDS = {
  title:          'fldfXSaO4mPPfJLJZ',
  name:           'fld6z8yr5kcj9UZKC',
  date:           'fldeaM4YlZrRgnGkf',
  day:            'fldwMiChGRoEd3nKF',
  time:           'fldjlHvuBOm5w6whD',
  type:           'fldNxqRvZJxIp7pqZ',
  description:    'fldwuDUBt3MYHARNb',
  caption:        'fldakJPT9nX2QRur1',
  picture:        'fld88yznfu0OH0I0l',
  price:          'fldsxAiwC0aip4ApO',
  ticketLink:     'fldHLhzG8LATi8wKC',
  capacity:       'fldJ7VsLHjC1Ik7Ab',
  approvalStatus: 'fldD7uBEUMgVGRKin',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const secret = req.headers.get('x-airtable-secret');
  if (secret !== process.env.AIRTABLE_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const records = body.records
    ? body.records
    : body.record
    ? [body.record]
    : [];

  if (records.length === 0) {
    return new Response(JSON.stringify({ ok: true, processed: 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const results = await Promise.allSettled(records.map(processRecord));
  const succeeded = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;

  return new Response(JSON.stringify({ ok: true, processed: succeeded, failed }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function processRecord(record) {
  const f = record.fields || record.cellValuesByFieldId || {};
  const id = record.id;

  const title          = f[FIELDS.title] || f[FIELDS.name] || 'Untitled Event';
  const nameRaw        = f[FIELDS.name] || null;
  const date           = f[FIELDS.date] || null;
  const day            = f[FIELDS.day]?.name || null;
  const time           = f[FIELDS.time]?.name || null;
  const type           = f[FIELDS.type]?.name || 'Event';
  const description    = f[FIELDS.description] || f[FIELDS.caption] || null;
  const price          = f[FIELDS.price] ?? 0;
  const ticketLink     = f[FIELDS.ticketLink] || null;
  const capacity       = f[FIELDS.capacity] || null;
  const approvalStatus = f[FIELDS.approvalStatus]?.name || null;

  const dateFormatted = formatDateLong(date);
  const datePill      = formatDatePill(date, day);

  let imageUrl = null, imageWidth = null, imageHeight = null, imageFilename = null;
  const attachments = f[FIELDS.picture];
  if (attachments?.length > 0) {
    const att = attachments[0];
    const sourceUrl = att.thumbnails?.large?.url || att.url;
    imageWidth    = att.thumbnails?.large?.width  || att.width  || null;
    imageHeight   = att.thumbnails?.large?.height || att.height || null;
    imageFilename = att.filename || null;
    imageUrl = await reHostImage(id, sourceUrl, imageFilename);
  }

  const { error } = await supabase.from('events').upsert({
    id, title, name_raw: nameRaw, date, date_formatted: dateFormatted, date_pill: datePill,
    day, time, type, description, price, ticket_link: ticketLink, capacity,
    approval_status: approvalStatus, image_url: imageUrl, image_width: imageWidth,
    image_height: imageHeight, image_filename: imageFilename, airtable_raw: f,
    synced_at: new Date().toISOString(),
  }, { onConflict: 'id' });

  if (error) throw new Error(`Supabase upsert failed: ${error.message}`);
  return { id, title };
}

async function reHostImage(recordId, sourceUrl, filename) {
  try {
    const response = await fetch(sourceUrl);
    if (!response.ok) return null;
    const buffer = await response.arrayBuffer();
    const ext = filename?.split('.').pop() || 'jpg';
    const storagePath = `events/${recordId}.${ext}`;
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const { error } = await supabase.storage.from(BUCKET).upload(storagePath, buffer, { contentType, upsert: true });
    if (error) { console.error('Storage upload failed:', error.message); return null; }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
    return data.publicUrl;
  } catch (err) {
    console.error('Image re-host failed:', err.message);
    return null;
  }
}

function formatDateLong(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function formatDatePill(dateStr, dayName) {
  if (!dateStr) return null;
  const [, month, day] = dateStr.split('-').map(Number);
  const monthShort = new Date(2026, month - 1, 1).toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const dayShort = dayName ? dayName.slice(0, 3).toUpperCase() : '';
  return `${dayShort} · ${monthShort} ${day}`;
}
