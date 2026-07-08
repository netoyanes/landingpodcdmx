import { forwardRef, useEffect, useRef, useState } from 'react';
import heroImage from '../imports/image.png';
import dinnerImage from '../imports/IMG_2842.JPG'; // used in filmstrip for dinner events
import logoUrl from '../imports/logo.svg';

/* ── design tokens ─────────────────────────────────────── */
const T = {
  bg: '#0D0D0D',
  ink: '#F5F0E8',
  inkDim: 'rgba(245,240,232,0.58)',
  inkFaint: 'rgba(245,240,232,0.34)',
  sand: '#C8B89A',
  surface: '#1A1A1A',
  surface2: '#161616',
  surface3: '#2A2A2A',
  border: 'rgba(200,184,154,0.20)',
  borderFaint: 'rgba(245,240,232,0.08)',
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', -apple-system, sans-serif",
};

const EXHIBITION = {
  title: 'La Pelota No Se Mancha',
  type: 'Group Exhibition',
  tagline: 'Football as a global cultural phenomenon.',
  dates: 'Jun 5 — Jul 29, 2026',
  curator: 'Curated by Ezequiel Suranyi',
  collab: 'FUTBOLITIS × POD Art House',
};

/* ── page theme (new POD Condesa layout) ───────────────── */
const P = {
  cream: '#EFEFE0',       // primary bg (nav, about, this-week)
  cream2: '#F5F5EC',      // lighter cream (statement, CTA strips)
  ink: '#0D0D0D',         // near-black (dark sections + text on cream)
  ink2: '#252525',
  taupe: '#B3B3A8',       // muted body text on dark
  poppins: "'Poppins', -apple-system, sans-serif",
  plex: "'IBM Plex Sans', -apple-system, sans-serif",
};

const COMING_SOON = [
  { type: 'Exhibition', title: 'Gabriel Orozco: Public Nature', dates: '2 Jul — 2 Aug' },
  { type: 'Exhibition', title: 'Gabriel Orozco: Public Nature', dates: '2 Jul — 2 Aug' },
  { type: 'Exhibition', title: 'Gabriel Orozco: Public Nature', dates: '2 Jul — 2 Aug' },
];

/* ── events data ───────────────────────────────────────── */
interface Event {
  n: string; d: string; day: string; t: string; type: string; desc: string;
  dinner?: boolean; imageUrl?: string; airtableId?: string;
}

const FALLBACK_EVENTS: Event[] = [
  { n: 'Drink & Draw with Ricardo Santos', d: 'JUN 12', day: 'FRI', t: '7 PM', type: 'Workshop',
    desc: 'Life-drawing led by Ricardo Santos. Materials, a glass and a model — no experience required, only attention.' },
  { n: "Rosas presenta 'Jardín'", d: 'JUN 12', day: 'FRI', t: '9 PM', type: 'Music',
    desc: "An intimate live set from Rosas debuting 'Jardín' — botanical soundscapes for the late hours." },
  { n: 'Argentina Night', d: 'JUN 16', day: 'TUE', t: '8 PM', type: 'Music',
    desc: 'Tango, vinyl and Malbec. A Buenos Aires evening in the heart of Condesa.' },
  { n: 'Colombian Brunch', d: 'JUN 17', day: 'WED', t: '12 PM', type: 'Music',
    desc: 'Midday cumbia, arepas and slow coffee. A sunlit Colombian table.' },
  { n: 'Colombian Night', d: 'JUN 23', day: 'TUE', t: '7 PM', type: 'Music',
    desc: 'Salsa and champeta until late. Bring movement; we bring the rhythm.' },
  { n: 'PRIDE NIGHT', d: 'JUN 26', day: 'FRI', t: '7 PM', type: 'Community',
    desc: 'A celebration of queer art, music and community. All welcome, all seen.' },
  { n: 'French Afternoon', d: 'JUN 26', day: 'FRI', t: 'TBD', type: 'Community',
    desc: 'Apéritif hour à la française — pétanque, pastis and unhurried conversation.' },
  { n: 'Vinyl Market', d: 'JUN 27', day: 'SAT', t: '12 PM', type: 'Music',
    desc: "Crate-diggers' market. Independent sellers, rare pressings and live selectors all day." },
];

/* ── Supabase event loader ─────────────────────────────── */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

async function fetchSupabaseEvents(): Promise<Event[] | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  const today = new Date().toISOString().split('T')[0];
  const url = `${SUPABASE_URL}/rest/v1/events?select=id,title,date_pill,day,time,type,description,image_url&is_visible=eq.true&date=gte.${today}&order=date.asc,time.asc`;
  try {
    const res = await fetch(url, { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } });
    if (!res.ok) return null;
    const rows = await res.json() as Array<{ id: string; title: string; date_pill: string; day: string; time: string; type: string; description: string; image_url: string | null }>;
    return rows.map(r => ({
      n: r.title,
      d: r.date_pill || '',
      day: (r.day || '').slice(0, 3).toUpperCase(),
      t: r.time || '',
      type: r.type || 'Event',
      desc: r.description || '',
      imageUrl: r.image_url || undefined,
      dinner: r.type === 'Dinner',
      airtableId: r.id,
    }));
  } catch { return null; }
}

/* ── card data ─────────────────────────────────────────── */
interface SavedCard {
  id: number;
  folio: string;
  name: string;
  email: string;
  ig: string;
  kind: 'exhibition' | 'event';
  refIdx?: number;
}

function genFolio() { return '№ ' + String(Math.floor(1000 + Math.random() * 9000)); }

async function downloadCard(el: HTMLElement, filename: string) {
  const { default: html2canvas } = await import('html2canvas');
  const canvas = await html2canvas(el, { backgroundColor: '#1A1A1A', scale: 4, useCORS: true, logging: false });
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function refOf(card: SavedCard, EVENTS: Event[]) {
  if (card.kind === 'exhibition') {
    return { title: EXHIBITION.title, type: 'Exhibition · On View', datePill: 'JUN 5 – JUL 29', time: 'On View' };
  }
  const ev = EVENTS[card.refIdx!];
  return { title: ev.n, type: ev.type + ' · 2026', datePill: ev.day + ' · ' + ev.d, time: ev.t };
}

/* ── AccessPass ────────────────────────────────────────── */
const AccessPass = forwardRef<HTMLDivElement, { card: SavedCard; EVENTS: Event[] }>(function AccessPass({ card, EVENTS }, ref) {
  const r = refOf(card, EVENTS);
  const ev = card.kind === 'event' ? EVENTS[card.refIdx!] : null;
  const imgSrc = ev?.imageUrl || (ev?.dinner ? dinnerImage : null);

  return (
    <div ref={ref} style={{ width: '312px', background: T.surface, border: `1px solid ${T.border}`, borderRadius: '8px', boxShadow: '0 24px 60px -28px rgba(0,0,0,.9)', flexShrink: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px 13px' }}>
        <span style={{ fontFamily: T.sans, fontWeight: 600, fontSize: '9.5px', letterSpacing: '.22em', textTransform: 'uppercase' as const, color: T.ink }}>POD ART HOUSE</span>
        <span style={{ fontFamily: T.sans, fontSize: '10px', letterSpacing: '.1em', color: T.inkFaint }}>{card.folio}</span>
      </div>
      <div style={{ position: 'relative', height: '128px', borderTop: `1px solid ${T.borderFaint}`, borderBottom: `1px solid ${T.borderFaint}`, background: T.surface2, overflow: 'hidden' }}>
        {imgSrc
          ? <img src={imgSrc} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: T.sand, opacity: .7 }}>{r.type.split(' ·')[0]}</span>
            </div>
        }
        <span style={{ position: 'absolute', right: '12px', bottom: '11px', zIndex: 3, fontFamily: T.sans, fontWeight: 600, fontSize: '8.5px', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: T.sand, border: `1px solid ${T.sand}`, borderRadius: '3px', padding: '5px 9px', transform: 'rotate(-6deg)', background: 'rgba(13,13,13,0.5)' }}>Access Confirmed</span>
      </div>
      <div style={{ padding: '18px' }}>
        <div style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: T.inkFaint }}>{r.type}</div>
        <h4 style={{ fontFamily: T.serif, fontWeight: 500, fontSize: '1.55rem', lineHeight: 1.08, color: T.ink, margin: '9px 0 16px' }}>{r.title}</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px', flexWrap: 'wrap' as const }}>
          <span style={{ display: 'inline-flex', fontFamily: T.sans, fontWeight: 600, fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: '#0D0D0D', background: T.sand, padding: '6px 11px', borderRadius: '3px' }}>{r.datePill}</span>
          <span style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '12px', color: T.sand, letterSpacing: '.04em' }}>{r.time}</span>
        </div>
      </div>
      {/* perforation */}
      <div style={{ position: 'relative', height: 0, borderTop: `1px dashed ${T.border}`, margin: '2px 18px' }}>
        <div style={{ position: 'absolute', top: '-9px', left: '-27px', width: '18px', height: '18px', borderRadius: '50%', background: T.surface2 }} />
        <div style={{ position: 'absolute', top: '-9px', right: '-27px', width: '18px', height: '18px', borderRadius: '50%', background: T.surface2 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', padding: '15px 18px 18px' }}>
        <div>
          <div style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '8.5px', letterSpacing: '.18em', textTransform: 'uppercase' as const, color: T.inkFaint }}>Admit one</div>
          <div style={{ fontFamily: T.sans, fontWeight: 400, fontSize: '11px', color: T.ink, marginTop: '5px' }}>{card.name}{card.ig ? ` · ${card.ig}` : ''}</div>
        </div>
        <div style={{ textAlign: 'right' as const }}>
          <div style={{ fontFamily: T.sans, fontSize: '8.5px', color: T.inkFaint, lineHeight: 1.55 }}>Av. Nuevo León 108<br />Hipódromo Condesa, CDMX</div>
        </div>
      </div>
    </div>
  );
});

/* ── RSVPSheet ─────────────────────────────────────────── */
function RSVPSheet({ target, EVENTS, onClose, onSave }: {
  target: { kind: 'exhibition' | 'event'; refIdx?: number };
  EVENTS: Event[];
  onClose: () => void;
  onSave: (card: SavedCard) => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ig, setIg] = useState('');
  const [errors, setErrors] = useState({ name: false, email: false });
  const [card, setCard] = useState<SavedCard | null>(null);
  const [saved, setSaved] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const r = target.kind === 'exhibition'
    ? { title: EXHIBITION.title, datePill: 'JUN 5 – JUL 29', time: 'On View', type: EXHIBITION.type }
    : (() => { const ev = EVENTS[target.refIdx!]; return { title: ev.n, datePill: ev.day + ' · ' + ev.d, time: ev.t, type: ev.type }; })();

  const submit = () => {
    const nameOk = name.trim().length > 0;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setErrors({ name: !nameOk, email: !emailOk });
    if (!nameOk || !emailOk) return;
    const igClean = ig.trim() ? (ig[0] === '@' ? ig.trim() : '@' + ig.trim()) : '';
    const newCard: SavedCard = { id: Date.now(), folio: genFolio(), name: name.trim(), email: email.trim(), ig: igClean, kind: target.kind, refIdx: target.refIdx };
    setCard(newCard);
    fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim(), ig: igClean, kind: target.kind, eventTitle: r.title, airtableEventId: target.kind === 'event' ? EVENTS[target.refIdx!]?.airtableId : undefined }),
    }).then(async res => {
      if (!res.ok) console.error('[RSVP]', res.status, await res.text());
      else console.log('[RSVP] saved to Airtable');
    }).catch(err => console.error('[RSVP] fetch failed', err));
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: card ? '380px' : '460px', maxHeight: '90vh', overflowY: 'auto', background: T.surface2, border: `1px solid ${T.border}`, borderRadius: '6px', padding: '38px 38px 34px', animation: 'sheetin .4s cubic-bezier(.2,.8,.3,1)' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '18px', width: '34px', height: '34px', borderRadius: '50%', border: `1px solid ${T.borderFaint}`, background: 'transparent', color: T.inkDim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer' }}>✕</button>

      {!card ? (
        <>
          <span style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '.28em', textTransform: 'uppercase' as const, color: T.sand }}>
            {target.kind === 'exhibition' ? 'Reserve access' : 'Reserve your spot'}
          </span>
          <h3 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: '2.1rem', lineHeight: 1.05, margin: '8px 0 0', color: T.ink }}>{r.title}</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const, margin: '18px 0 28px' }}>
            {[r.datePill, r.time, r.type].map(p => (
              <span key={p} style={{ display: 'inline-flex', alignItems: 'center', fontFamily: T.sans, fontWeight: 500, fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: p === r.datePill ? '#0D0D0D' : T.ink, background: p === r.datePill ? T.sand : 'transparent', border: p === r.datePill ? 'none' : `1px solid ${T.border}`, borderRadius: p === r.datePill ? '3px' : '40px', padding: '9px 16px' }}>{p}</span>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '22px' }}>
            {[
              { label: 'First name', val: name, set: setName, err: errors.name, msg: 'Please add your name.', ph: 'Your name' },
              { label: 'Email', val: email, set: setEmail, err: errors.email, msg: 'Add a valid email.', ph: 'you@email.com' },
            ].map(f => (
              <div key={f.label} style={{ position: 'relative' }}>
                <label style={{ display: 'block', fontFamily: T.sans, fontWeight: 500, fontSize: '10px', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: T.inkFaint, marginBottom: '9px' }}>{f.label}</label>
                <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                  style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${f.err ? '#c47a63' : T.border}`, color: T.ink, fontFamily: T.sans, fontSize: '15px', fontWeight: 300, padding: '8px 0', outline: 'none' }} />
                {f.err && <div style={{ fontSize: '10px', color: '#c47a63', marginTop: '5px', letterSpacing: '.04em' }}>{f.msg}</div>}
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontFamily: T.sans, fontWeight: 500, fontSize: '10px', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: T.inkFaint, marginBottom: '9px' }}>Phone <em style={{ fontStyle: 'normal', textTransform: 'none', letterSpacing: 0, color: T.inkFaint }}>(optional)</em></label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+52 55 0000 0000"
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${T.border}`, color: T.ink, fontFamily: T.sans, fontSize: '15px', fontWeight: 300, padding: '8px 0', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: T.sans, fontWeight: 500, fontSize: '10px', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: T.inkFaint, marginBottom: '9px' }}>Instagram <em style={{ fontStyle: 'normal', textTransform: 'none', letterSpacing: 0, color: T.inkFaint }}>(optional)</em></label>
              <input value={ig} onChange={e => setIg(e.target.value)} placeholder="@handle"
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${T.border}`, color: T.ink, fontFamily: T.sans, fontSize: '15px', fontWeight: 300, padding: '8px 0', outline: 'none' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' as const, marginTop: '34px' }}>
            <span style={{ fontFamily: T.sans, fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase' as const, color: T.inkFaint }}>Limited capacity · Curated guest list</span>
            <button onClick={submit} style={{ display: 'inline-flex', alignItems: 'center', gap: '11px', fontFamily: T.sans, fontWeight: 500, fontSize: '11.5px', letterSpacing: '.18em', textTransform: 'uppercase' as const, padding: '14px 26px', borderRadius: '2px', color: '#0D0D0D', background: T.sand, border: `1px solid ${T.sand}`, cursor: 'pointer' }}>
              Generate access card <span>→</span>
            </button>
          </div>
        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', textAlign: 'center' as const }}>
          <div style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '10px', letterSpacing: '.24em', textTransform: 'uppercase' as const, color: T.sand, marginBottom: '22px' }}>Your access card</div>
          <AccessPass ref={cardRef} card={card} EVENTS={EVENTS} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '30px', flexWrap: 'wrap' as const, justifyContent: 'center' }}>
            <button onClick={() => { onSave(card); setSaved(true); }} disabled={saved}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '11px', fontFamily: T.sans, fontWeight: 500, fontSize: '11.5px', letterSpacing: '.18em', textTransform: 'uppercase' as const, padding: '14px 26px', borderRadius: '2px', color: '#0D0D0D', background: saved ? T.inkFaint : T.sand, border: `1px solid ${saved ? T.inkFaint : T.sand}`, cursor: saved ? 'default' : 'pointer', opacity: saved ? .65 : 1 }}>
              {saved ? '✓ Saved to gallery' : 'Save to my gallery'}
            </button>
            <button onClick={() => cardRef.current && downloadCard(cardRef.current, `pod-access-${card.folio.replace('№ ', '')}.png`)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', border: `1px solid ${T.border}`, color: T.ink, fontFamily: T.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase' as const, padding: '10px 18px', borderRadius: '2px', cursor: 'pointer' }}>
              ↓ Download
            </button>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: T.inkDim, fontFamily: T.sans, fontWeight: 400, fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase' as const, cursor: 'pointer' }}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── GalleryCard ───────────────────────────────────────── */
function GalleryCard({ card, EVENTS, onRemove }: { card: SavedCard; EVENTS: Event[]; onRemove: (id: number) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => onRemove(card.id)} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 6, width: '26px', height: '26px', borderRadius: '50%', border: `1px solid ${T.borderFaint}`, background: 'rgba(13,13,13,.7)', color: T.inkDim, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>✕</button>
      <div ref={cardRef} style={{ transform: 'scale(0.85)', transformOrigin: 'top left', width: '118%' }}>
        <AccessPass card={card} EVENTS={EVENTS} />
      </div>
      <button onClick={() => cardRef.current && downloadCard(cardRef.current.firstElementChild as HTMLElement, `pod-access-${card.folio.replace('№ ', '')}.png`)}
        style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'transparent', border: `1px solid ${T.border}`, color: T.inkDim, fontFamily: T.sans, fontWeight: 500, fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase' as const, padding: '7px 13px', borderRadius: '2px', cursor: 'pointer' }}>
        ↓ Download
      </button>
    </div>
  );
}

/* ── GallerySheet ──────────────────────────────────────── */
function GallerySheet({ gallery, EVENTS, onClose, onRemove }: { gallery: SavedCard[]; EVENTS: Event[]; onClose: () => void; onRemove: (id: number) => void }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '920px', maxHeight: '90vh', overflowY: 'auto', background: T.surface2, border: `1px solid ${T.border}`, borderRadius: '6px', padding: '38px 38px 34px', animation: 'sheetin .4s cubic-bezier(.2,.8,.3,1)' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '18px', width: '34px', height: '34px', borderRadius: '50%', border: `1px solid ${T.borderFaint}`, background: 'transparent', color: T.inkDim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer' }}>✕</button>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap' as const, marginBottom: '30px' }}>
        <div>
          <span style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '.28em', textTransform: 'uppercase' as const, color: T.sand }}>Curated guest list</span>
          <h3 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: '2.1rem', lineHeight: 1.05, margin: '6px 0 0', color: T.ink }}>My Gallery</h3>
        </div>
        <span style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase' as const, color: T.inkFaint }}>{gallery.length} card{gallery.length !== 1 ? 's' : ''} collected</span>
      </div>
      {gallery.length === 0 ? (
        <div style={{ fontFamily: T.serif, fontWeight: 300, fontSize: '1.5rem', color: T.inkDim, textAlign: 'center' as const, padding: '50px 10px', lineHeight: 1.5 }}>
          No cards yet.
          <span style={{ display: 'block', fontFamily: T.sans, fontSize: '12px', color: T.inkFaint, marginTop: '14px' }}>RSVP to the exhibition or any event to collect your first access card.</span>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '26px' }}>
          {gallery.map(c => <GalleryCard key={c.id} card={c} EVENTS={EVENTS} onRemove={onRemove} />)}
        </div>
      )}
    </div>
  );
}

/* ── EventRow (This Week at POD list) ──────────────────── */
function EventRow({ ev, reserved, onRSVP }: { ev: Event; reserved: boolean; onRSVP: () => void }) {
  const [hovered, setHovered] = useState(false);
  const imgSrc = ev.imageUrl || (ev.dinner ? dinnerImage : null);

  return (
    <article
      className="event-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px,2vw,26px)', width: '100%', paddingBottom: 'clamp(20px,2.4vw,28px)', borderBottom: `1px solid rgba(13,13,13,0.12)` }}
    >
      <div onClick={onRSVP} className="event-row-img" style={{ position: 'relative', flexShrink: 0, width: 'clamp(120px,14vw,186px)', height: 'clamp(120px,14vw,186px)', overflow: 'hidden', background: P.ink, cursor: 'pointer' }}>
        {imgSrc
          ? <img src={imgSrc} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s cubic-bezier(.2,.7,.3,1)', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
          : <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: P.plex, fontWeight: 400, fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase' as const, color: P.taupe }}>{ev.type}</span>
            </div>
        }
        {!reserved && <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0, transition: 'opacity .3s ease', background: 'rgba(13,13,13,0.5)' }}><span style={{ fontFamily: P.plex, fontWeight: 500, fontSize: '12px', letterSpacing: '.18em', textTransform: 'uppercase' as const, color: P.cream, border: `1px solid ${P.cream}`, padding: '8px 16px' }}>RSVP</span></span>}
      </div>

      <div className="event-row-date" style={{ flexShrink: 0, width: 'clamp(120px,14vw,200px)', textAlign: 'center' as const, fontFamily: P.plex, textTransform: 'uppercase' as const, color: P.ink, letterSpacing: '.1em' }}>
        <div style={{ fontWeight: 500, fontSize: 'clamp(16px,1.6vw,22px)' }}>{ev.d || (ev.day + ' ' + ev.d)}</div>
        <div style={{ fontWeight: 300, fontSize: 'clamp(13px,1.2vw,17px)', marginTop: '4px', color: P.ink2 }}>{ev.t}</div>
      </div>

      <div className="event-row-body" style={{ flex: 1, minWidth: 0, color: P.ink, textTransform: 'uppercase' as const }}>
        <div style={{ fontFamily: P.poppins, fontWeight: 400, fontSize: 'clamp(13px,1.2vw,18px)', letterSpacing: '.1em', color: P.ink2 }}>{ev.type}</div>
        <div style={{ fontFamily: P.poppins, fontWeight: 700, fontSize: 'clamp(20px,2.4vw,30px)', letterSpacing: '.06em', lineHeight: 1.1, marginTop: '6px', color: hovered ? P.ink2 : P.ink, transition: 'color .3s ease' }}>{ev.n}</div>
      </div>

      <button onClick={onRSVP} className="event-row-rsvp" style={{ flexShrink: 0, background: 'transparent', border: reserved ? '1px solid rgba(13,13,13,0.25)' : `1px solid ${P.ink}`, color: P.ink, fontFamily: P.plex, fontWeight: 500, fontSize: 'clamp(14px,1.4vw,20px)', letterSpacing: '.12em', textTransform: 'uppercase' as const, padding: 'clamp(10px,1.1vw,15px) clamp(20px,2.4vw,40px)', cursor: reserved ? 'default' : 'pointer', opacity: reserved ? .5 : 1, transition: 'background .25s ease, color .25s ease', ...(hovered && !reserved ? { background: P.ink, color: P.cream } : {}) }}>
        {reserved ? 'Reserved' : 'RSVP'}
      </button>
    </article>
  );
}


/* ── main App (POD Condesa layout) ─────────────────────── */
export default function App() {
  const [rsvpTarget, setRsvpTarget] = useState<{ kind: 'exhibition' | 'event'; refIdx?: number } | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [gallery, setGallery] = useState<SavedCard[]>(() => {
    try { return JSON.parse(localStorage.getItem('pod_gallery') || '[]'); } catch { return []; }
  });
  const [toast, setToast] = useState('');
  const [EVENTS, setEvents] = useState<Event[]>(FALLBACK_EVENTS);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetchSupabaseEvents().then(evs => { if (evs && evs.length > 0) setEvents(evs); });
  }, []);

  const saveCard = (card: SavedCard) => {
    setGallery(g => {
      if (g.some(c => c.id === card.id)) return g;
      const next = [...g, card];
      localStorage.setItem('pod_gallery', JSON.stringify(next));
      return next;
    });
    showToast('Saved to My Gallery');
  };

  const removeCard = (id: number) => {
    setGallery(g => {
      const next = g.filter(c => c.id !== id);
      localStorage.setItem('pod_gallery', JSON.stringify(next));
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2200);
  };

  useEffect(() => {
    const els = document.querySelectorAll('.fx');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [EVENTS]);

  const isReserved = (idx: number) => gallery.some(c => c.kind === 'event' && c.refIdx === idx);
  const overlayOpen = rsvpTarget !== null || galleryOpen;

  const PAD = 'clamp(24px,6vw,102px)';
  const navLink = { fontFamily: P.poppins, fontWeight: 300, fontSize: 'clamp(12px,1vw,15px)', letterSpacing: '.12em', textTransform: 'uppercase' as const, color: P.ink, background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'none' };
  const sectionHeading = { fontFamily: P.poppins, fontWeight: 600, fontSize: 'clamp(28px,4.4vw,40px)', letterSpacing: '.06em', textTransform: 'uppercase' as const, margin: 0 };

  const goto = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div style={{ background: P.cream, color: P.ink, fontFamily: P.plex, lineHeight: 1.6, minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @keyframes sheetin { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
        * { box-sizing:border-box; }
        ::selection { background:${P.ink}; color:${P.cream}; }
        @media (prefers-reduced-motion: no-preference) {
          .fx { opacity:0; transform:translateY(20px); }
          .fx.in { opacity:1; transform:none; transition:opacity .9s ease, transform .9s cubic-bezier(.2,.7,.3,1); }
        }
        .nav-links { display:flex; align-items:center; gap:clamp(20px,3vw,52px); }
        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,6vw,96px); align-items:start; }
        .exh-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(32px,5vw,80px); align-items:center; }
        .soon-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(20px,2.4vw,34px); }
        @media (max-width:860px) {
          .nav-links { gap:16px; }
          .nav-links .nav-hide { display:none; }
          .about-grid, .exh-grid, .soon-grid { grid-template-columns:1fr; }
          .exh-image { order:-1; }
          .event-row { flex-wrap:wrap; gap:16px; }
          .event-row-date { width:auto !important; text-align:left !important; }
          .event-row-body { flex:1 1 100% !important; order:3; }
          .event-row-rsvp { margin-left:auto; }
        }
      `}</style>

      {/* Nav */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: P.cream, height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${PAD}`, borderBottom: `1px solid rgba(13,13,13,0.08)` }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ fontFamily: P.poppins, fontWeight: 600, fontSize: 'clamp(16px,1.8vw,24px)', letterSpacing: '.08em', textTransform: 'uppercase', color: P.ink, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>POD Condesa</button>
        <nav className="nav-links">
          <button className="nav-hide" style={navLink} onClick={() => goto('exhibition')}>Exhibitions</button>
          <button className="nav-hide" style={navLink} onClick={() => goto('events')}>Events</button>
          <button className="nav-hide" style={navLink} onClick={() => goto('contact')}>Contact us</button>
          <button onClick={() => setGalleryOpen(true)} style={{ ...navLink, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            My Gallery
            <span style={{ minWidth: '20px', height: '20px', padding: '0 6px', borderRadius: '40px', background: gallery.length > 0 ? P.ink : 'transparent', color: gallery.length > 0 ? P.cream : P.ink, border: gallery.length > 0 ? 'none' : `1px solid rgba(13,13,13,0.3)`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '11px' }}>{gallery.length}</span>
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section style={{ position: 'relative', width: '100%', height: 'clamp(360px,62vh,680px)', overflow: 'hidden', background: P.ink }}>
        <img src={heroImage} alt="POD Condesa gallery" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '212px', background: `linear-gradient(to top, ${P.cream} 0%, rgba(239,239,224,0) 100%)`, pointerEvents: 'none' }} />
      </section>

      {/* About */}
      <section style={{ background: P.cream, padding: `clamp(48px,7vw,90px) ${PAD}` }}>
        <div className="about-grid fx">
          <div>
            <div style={{ fontFamily: P.plex, fontWeight: 300, fontSize: 'clamp(16px,1.6vw,22px)', letterSpacing: '.04em', textTransform: 'uppercase', color: P.ink }}>[about]</div>
            <h1 style={{ fontFamily: P.poppins, fontWeight: 600, fontSize: 'clamp(38px,6vw,56px)', letterSpacing: '.07em', textTransform: 'uppercase', color: P.ink, margin: '8px 0 0', lineHeight: 1.05 }}>POD Condesa</h1>
          </div>
          <div>
            <p style={{ fontFamily: P.plex, fontWeight: 400, fontSize: 'clamp(16px,1.5vw,20px)', lineHeight: 1.7, color: P.ink, margin: 0 }}>
              POD Condesa is an art house in the heart of Colonia Condesa — a space where exhibitions, live music, workshops and community gather under one roof. We program art as a way of connecting people, ideas and the neighbourhood.
            </p>
            <div style={{ display: 'flex', gap: '24px', marginTop: '28px' }}>
              {['Art House', 'Community'].map(t => (
                <span key={t} style={{ fontFamily: P.plex, fontWeight: 300, fontSize: 'clamp(15px,1.4vw,20px)', letterSpacing: '.02em', color: P.ink, textDecoration: 'underline', textUnderlineOffset: '4px' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current exhibition (dark) */}
      <section id="exhibition" style={{ background: P.ink, color: P.cream, padding: `clamp(56px,8vw,110px) ${PAD}` }}>
        <div className="exh-grid fx">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', fontFamily: P.plex, fontWeight: 300, fontSize: 'clamp(12px,1.1vw,16px)', letterSpacing: '.1em', textTransform: 'uppercase', color: P.cream }}>
              <span>[Current exhibition]</span>
              <span>{EXHIBITION.dates}</span>
            </div>
            <h2 style={{ fontFamily: P.poppins, fontWeight: 600, fontSize: 'clamp(28px,4vw,40px)', letterSpacing: '.05em', textTransform: 'uppercase', color: P.cream, margin: '22px 0 0', lineHeight: 1.1 }}>La Pelota No Se Mancha</h2>
            <p style={{ fontFamily: P.plex, fontWeight: 300, fontSize: 'clamp(18px,1.9vw,24px)', lineHeight: 1.4, color: P.cream, margin: '26px 0 0' }}>
              To mark Mexico's historic third hosting of the FIFA World Cup — <strong style={{ fontWeight: 700 }}>football as a global cultural phenomenon.</strong>
            </p>
            <p style={{ fontFamily: P.plex, fontWeight: 300, fontSize: 'clamp(15px,1.5vw,20px)', lineHeight: 1.6, color: P.taupe, margin: '24px 0 0', maxWidth: '52ch' }}>
              FUTBOLITIS joins forces with POD Art House — an international group exhibition bringing together painting, photography, video and installation spanning contemporary and vintage work. 18 artists from Argentina, Mexico, Italy, the United Kingdom, Germany, the Netherlands and France.
            </p>
            <button onClick={() => setRsvpTarget({ kind: 'exhibition' })} style={{ marginTop: '30px', fontFamily: P.plex, fontWeight: 400, fontSize: 'clamp(14px,1.3vw,16px)', letterSpacing: '.12em', textTransform: 'uppercase', color: P.cream, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>See more &rarr;</button>
          </div>
          <div className="exh-image" style={{ width: '100%', aspectRatio: '664 / 464', overflow: 'hidden', background: P.ink2 }}>
            <img src={heroImage} alt="La Pelota No Se Mancha" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Coming soon (dark) */}
      <section style={{ background: P.ink, color: P.cream, padding: `clamp(24px,3vw,40px) ${PAD} clamp(56px,8vw,90px)` }}>
        <h2 style={{ ...sectionHeading, color: P.cream, marginBottom: 'clamp(28px,4vw,50px)' }}>Coming Soon</h2>
        <div className="soon-grid fx">
          {COMING_SOON.map((c, i) => (
            <article key={i}>
              <div style={{ width: '100%', aspectRatio: '434 / 266', overflow: 'hidden', background: P.ink2 }}>
                <img src={i === 1 ? dinnerImage : heroImage} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ marginTop: '18px', fontFamily: P.plex, fontWeight: 300, fontSize: 'clamp(12px,1.1vw,16px)', letterSpacing: '.06em', textTransform: 'uppercase', color: P.taupe }}>{c.type}</div>
              <div style={{ fontFamily: P.poppins, fontWeight: 600, fontSize: 'clamp(16px,1.7vw,20px)', letterSpacing: '.04em', textTransform: 'uppercase', color: P.cream, margin: '6px 0 8px', lineHeight: 1.2 }}>{c.title}</div>
              <div style={{ fontFamily: P.poppins, fontWeight: 300, fontSize: 'clamp(14px,1.4vw,20px)', color: P.cream }}>{c.dates}</div>
            </article>
          ))}
        </div>
      </section>

      {/* Statement strip */}
      <section style={{ background: P.cream2, padding: `clamp(48px,6vw,86px) ${PAD}` }}>
        <p style={{ fontFamily: P.poppins, fontWeight: 400, fontSize: 'clamp(18px,2vw,24px)', lineHeight: 1.5, color: P.ink, margin: '0 auto', maxWidth: '1118px', textAlign: 'center' }}>
          POD Art House explores art as a way of connecting with the community — bringing together exhibitions, music, food and ideas in the heart of Condesa.
        </p>
      </section>

      {/* This week at POD */}
      <section id="events" style={{ background: P.cream, padding: `clamp(56px,7vw,90px) ${PAD}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' as const, marginBottom: 'clamp(34px,5vw,60px)' }}>
          <h2 style={{ ...sectionHeading, color: P.ink2 }}>This Week at POD</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontFamily: P.plex, fontSize: 'clamp(14px,1.3vw,20px)', letterSpacing: '.1em', textTransform: 'uppercase', color: P.ink }}>
            <span style={{ fontWeight: 600 }}>Schedule</span>
            <span style={{ width: '1px', height: '28px', background: 'rgba(13,13,13,0.3)' }} />
            <span style={{ fontWeight: 300, color: 'rgba(13,13,13,0.5)' }}>Calendar</span>
          </div>
        </div>
        <div className="fx" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px,2.4vw,28px)' }}>
          {EVENTS.map((ev, i) => (
            <EventRow key={i} ev={ev} reserved={isReserved(i)} onRSVP={() => setRsvpTarget({ kind: 'event', refIdx: i })} />
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section id="contact" style={{ background: P.cream2, padding: `clamp(40px,5vw,66px) ${PAD}` }}>
        <p style={{ fontFamily: P.poppins, fontWeight: 400, fontSize: 'clamp(17px,1.9vw,24px)', lineHeight: 1.5, color: P.ink, margin: '0 auto', maxWidth: '1118px', textAlign: 'center' }}>
          Have an idea for your event? Need a space for your exhibition? <a href="mailto:hola@podcondesa.mx" style={{ color: P.ink, textDecoration: 'underline', textUnderlineOffset: '4px' }}>Get in touch with us.</a>
        </p>
      </section>

      {/* Footer */}
      <footer style={{ background: P.ink, color: P.cream, padding: `clamp(48px,6vw,78px) ${PAD}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' as const }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={logoUrl} alt="POD Condesa" style={{ width: '42px', height: '42px' }} />
            <span style={{ fontFamily: P.poppins, fontWeight: 600, fontSize: 'clamp(22px,3vw,36px)', letterSpacing: '.18em', textTransform: 'uppercase', color: P.cream }}>POD Condesa</span>
          </div>
          <div style={{ textAlign: 'right' as const, color: P.cream, textTransform: 'uppercase' as const }}>
            <div style={{ fontFamily: P.poppins, fontWeight: 400, fontSize: 'clamp(16px,1.8vw,24px)', letterSpacing: '.05em', lineHeight: 1.3 }}>Av. Nuevo León 108</div>
            <div style={{ fontFamily: P.poppins, fontWeight: 400, fontSize: 'clamp(12px,1.2vw,16px)', letterSpacing: '.05em', lineHeight: 1.3 }}>Hipódromo Condesa, Ciudad de México</div>
            <div style={{ fontFamily: P.plex, fontWeight: 300, fontSize: 'clamp(12px,1.2vw,16px)', letterSpacing: '.06em', marginTop: '12px' }}>@pod_condesa</div>
          </div>
        </div>
      </footer>

      {/* Overlay (RSVP + Gallery) */}
      {overlayOpen && (
        <div onClick={(e) => { if (e.target === e.currentTarget) { setRsvpTarget(null); setGalleryOpen(false); } }}
          style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'rgba(8,8,8,0.72)', backdropFilter: 'blur(5px)' }}>
          {rsvpTarget !== null && (
            <RSVPSheet target={rsvpTarget} EVENTS={EVENTS} onClose={() => setRsvpTarget(null)} onSave={(card) => { saveCard(card); }} />
          )}
          {galleryOpen && (
            <GallerySheet gallery={gallery} EVENTS={EVENTS} onClose={() => setGalleryOpen(false)} onRemove={(id) => { removeCard(id); }} />
          )}
        </div>
      )}

      {/* Toast */}
      <div style={{ position: 'fixed', left: '50%', bottom: '28px', transform: `translateX(-50%) translateY(${toast ? '0' : '24px'})`, zIndex: 120, background: P.ink, color: P.cream, fontFamily: P.plex, fontWeight: 500, fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', padding: '13px 22px', borderRadius: '40px', opacity: toast ? 1 : 0, transition: 'all .35s cubic-bezier(.2,.8,.3,1)', pointerEvents: 'none' }}>
        {toast}
      </div>
    </div>
  );
}
