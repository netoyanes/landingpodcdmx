import { useEffect, useRef, useState } from 'react';
import BookingFlow from './components/BookingFlow';
import heroImage from '../imports/image.png';
import dinnerImage from '../imports/IMG_2842.JPG'; // used in filmstrip for dinner events

/* ── design tokens ─────────────────────────────────────── */
const T = {
  bg: '#0D0D0D',
  ink: '#F5F0E8',
  inkDim: 'rgba(245,240,232,0.58)',
  inkFaint: 'rgba(245,240,232,0.34)',
  sand: '#C8B89A',
  surface: '#1A1A1A',
  surface2: '#161616',
  border: 'rgba(200,184,154,0.20)',
  borderFaint: 'rgba(245,240,232,0.08)',
  serif: "'Cormorant Garamond', Georgia, serif",
  sans: "'Inter', -apple-system, sans-serif",
  mexcellent: "'Mexcellent', 'Cormorant Garamond', serif",
};

/* ── events data ───────────────────────────────────────── */
interface Event {
  n: string; d: string; day: string; t: string; type: string; desc: string;
  dinner?: boolean; imageUrl?: string;
}

const FALLBACK_EVENTS: Event[] = [
  { n: 'Thursday Dinner', d: 'JUN 5', day: 'THU', t: '8 PM', type: 'Dinner', dinner: true,
    desc: 'Chef Andrés Kerbel Laiter · 4-course Levantine menu with wine pairings · Live performance & DJ · 36 seats.' },
  { n: "Drink & Draw", d: 'JUN 12', day: 'FRI', t: '7 PM', type: 'Workshop',
    desc: 'Life-drawing session — materials, a glass and a model. No experience required, only attention.' },
  { n: "Rosas presenta 'Jardín'", d: 'JUN 12', day: 'FRI', t: '9 PM', type: 'Music',
    desc: 'An intimate live set from Rosas debuting Jardín — botanical soundscapes for the late hours.' },
  { n: 'Argentina Night', d: 'JUN 16', day: 'TUE', t: '8 PM', type: 'Music',
    desc: 'Tango, vinyl and Malbec. A Buenos Aires evening in the heart of Condesa.' },
  { n: 'Colombian Brunch', d: 'JUN 17', day: 'WED', t: '12 PM', type: 'Music',
    desc: 'Midday cumbia, arepas and slow coffee. A sunlit Colombian table.' },
  { n: 'PRIDE NIGHT', d: 'JUN 26', day: 'FRI', t: '7 PM', type: 'Community',
    desc: 'A celebration of queer art, music and community. All welcome, all seen.' },
  { n: 'French Afternoon', d: 'JUN 26', day: 'FRI', t: 'TBD', type: 'Community',
    desc: 'Apéritif hour à la française — pétanque, pastis and unhurried conversation.' },
  { n: 'Vinyl Market', d: 'JUN 27', day: 'SAT', t: '12 PM', type: 'Music',
    desc: 'Crate-diggers market. Independent sellers, rare pressings and live selectors all day.' },
];

/* ── Supabase event loader ─────────────────────────────── */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

async function fetchSupabaseEvents(): Promise<Event[] | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  const today = new Date().toISOString().split('T')[0];
  const url = `${SUPABASE_URL}/rest/v1/events?select=title,date_pill,day,time,type,description,image_url&is_visible=eq.true&date=gte.${today}&order=date.asc,time.asc`;
  try {
    const res = await fetch(url, { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } });
    if (!res.ok) return null;
    const rows = await res.json() as Array<{ title: string; date_pill: string; day: string; time: string; type: string; description: string; image_url: string | null }>;
    return rows.map(r => ({
      n: r.title,
      d: r.date_pill || '',
      day: (r.day || '').slice(0, 3).toUpperCase(),
      t: r.time || '',
      type: r.type || 'Event',
      desc: r.description || '',
      imageUrl: r.image_url || undefined,
      dinner: r.type === 'Dinner',
    }));
  } catch { return null; }
}

/* ── access card data ──────────────────────────────────── */
interface SavedCard {
  id: number;
  folio: string;
  name: string;
  email: string;
  ig: string;
  eventIdx: number;
}

function genFolio() { return '№ ' + String(Math.floor(1000 + Math.random() * 9000)); }

/* ── sub-components ────────────────────────────────────── */

function AccessPass({ card }: { card: SavedCard }) {
  const ev = EVENTS[card.eventIdx];
  return (
    <div style={{
      width: '312px', background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: '8px', boxShadow: '0 24px 60px -28px rgba(0,0,0,.9)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 18px 13px' }}>
        <span style={{ fontFamily: T.sans, fontWeight: 600, fontSize: '9.5px', letterSpacing: '.22em', textTransform: 'uppercase', color: T.ink }}>POD ART HOUSE</span>
        <span style={{ fontFamily: T.sans, fontSize: '10px', letterSpacing: '.1em', color: T.inkFaint }}>{card.folio}</span>
      </div>
      <div style={{ height: '80px', borderTop: `1px solid ${T.borderFaint}`, borderBottom: `1px solid ${T.borderFaint}`, background: T.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <span style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: T.sand, opacity: .7 }}>{ev.type}</span>
        <span style={{ position: 'absolute', right: '12px', bottom: '11px', fontFamily: T.sans, fontWeight: 600, fontSize: '8.5px', letterSpacing: '.16em', textTransform: 'uppercase', color: T.sand, border: `1px solid ${T.sand}`, borderRadius: '3px', padding: '5px 9px', transform: 'rotate(-6deg)', background: 'rgba(13,13,13,0.5)' }}>Access Confirmed</span>
      </div>
      <div style={{ padding: '18px' }}>
        <div style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '9px', letterSpacing: '.2em', textTransform: 'uppercase', color: T.inkFaint }}>{ev.type} · 2026</div>
        <h4 style={{ fontFamily: T.serif, fontWeight: 500, fontSize: '1.45rem', lineHeight: 1.08, color: T.ink, margin: '9px 0 16px' }}>{ev.n}</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
          <span style={{ display: 'inline-flex', fontFamily: T.sans, fontWeight: 600, fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#0D0D0D', background: T.sand, padding: '6px 11px', borderRadius: '3px' }}>{ev.day} · {ev.d}</span>
          <span style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '12px', color: T.sand }}>{ev.t}</span>
        </div>
      </div>
      <div style={{ position: 'relative', height: 0, borderTop: `1px dashed ${T.border}`, margin: '2px 18px' }}>
        <div style={{ position: 'absolute', top: '-9px', left: '-27px', width: '18px', height: '18px', borderRadius: '50%', background: T.surface2 }} />
        <div style={{ position: 'absolute', top: '-9px', right: '-27px', width: '18px', height: '18px', borderRadius: '50%', background: T.surface2 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px', padding: '15px 18px 18px' }}>
        <div>
          <div style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '8.5px', letterSpacing: '.18em', textTransform: 'uppercase', color: T.inkFaint }}>Admit one</div>
          <div style={{ fontFamily: T.sans, fontWeight: 400, fontSize: '11px', color: T.ink, marginTop: '5px' }}>{card.name}{card.ig ? ` · ${card.ig}` : ''}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: T.sans, fontSize: '8.5px', color: T.inkFaint, lineHeight: 1.55 }}>Av. Nuevo León 108<br />Hipódromo Condesa, CDMX</div>
        </div>
      </div>
    </div>
  );
}

function RSVPSheet({ eventIdx, onClose, onSave }: { eventIdx: number; onClose: () => void; onSave: (card: SavedCard) => void }) {
  const ev = EVENTS[eventIdx];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ig, setIg] = useState('');
  const [errors, setErrors] = useState({ name: false, email: false });
  const [card, setCard] = useState<SavedCard | null>(null);
  const [saved, setSaved] = useState(false);

  const submit = () => {
    const nameOk = name.trim().length > 0;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setErrors({ name: !nameOk, email: !emailOk });
    if (!nameOk || !emailOk) return;
    setCard({ id: Date.now(), folio: genFolio(), name: name.trim(), email: email.trim(), ig: ig.trim() ? (ig[0] === '@' ? ig.trim() : '@' + ig.trim()) : '', eventIdx });
  };

  const save = () => {
    if (!card) return;
    onSave(card);
    setSaved(true);
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: card ? '380px' : '460px', maxHeight: '90vh', overflowY: 'auto', background: T.surface2, border: `1px solid ${T.border}`, borderRadius: '6px', padding: '38px 38px 34px', animation: 'sheetin .4s cubic-bezier(.2,.8,.3,1)' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '18px', width: '34px', height: '34px', borderRadius: '50%', border: `1px solid ${T.borderFaint}`, background: 'transparent', color: T.inkDim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer' }}>✕</button>

      {!card ? (
        <>
          <span style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '.28em', textTransform: 'uppercase', color: T.sand }}>Reserve your spot</span>
          <h3 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: '2.1rem', lineHeight: 1.05, margin: '8px 0 18px', color: T.ink }}>{ev.n}</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const, marginBottom: '28px' }}>
            {[ev.day + ' · ' + ev.d, ev.t, ev.type].map(p => (
              <span key={p} style={{ display: 'inline-flex', alignItems: 'center', fontFamily: T.sans, fontWeight: 500, fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: T.ink, background: 'transparent', border: `1px solid ${T.border}`, borderRadius: '40px', padding: '9px 16px' }}>{p}</span>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {[
              { label: 'First name', val: name, set: setName, err: errors.name, msg: 'Please add your name.', ph: 'Your name' },
              { label: 'Email', val: email, set: setEmail, err: errors.email, msg: 'Add a valid email.', ph: 'you@email.com' },
            ].map(f => (
              <div key={f.label} style={{ position: 'relative' }}>
                <label style={{ display: 'block', fontFamily: T.sans, fontWeight: 500, fontSize: '10px', letterSpacing: '.16em', textTransform: 'uppercase', color: T.inkFaint, marginBottom: '9px' }}>{f.label}</label>
                <input value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph}
                  style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${f.err ? '#c47a63' : T.border}`, color: T.ink, fontFamily: T.sans, fontSize: '15px', fontWeight: 300, padding: '8px 0', outline: 'none' }} />
                {f.err && <div style={{ fontSize: '10px', color: '#c47a63', marginTop: '5px' }}>{f.msg}</div>}
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontFamily: T.sans, fontWeight: 500, fontSize: '10px', letterSpacing: '.16em', textTransform: 'uppercase', color: T.inkFaint, marginBottom: '9px' }}>Instagram <em style={{ fontStyle: 'normal', textTransform: 'none', letterSpacing: 0, color: T.inkFaint }}>(optional)</em></label>
              <input value={ig} onChange={e => setIg(e.target.value)} placeholder="@handle"
                style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: `1px solid ${T.border}`, color: T.ink, fontFamily: T.sans, fontSize: '15px', fontWeight: 300, padding: '8px 0', outline: 'none' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' as const, marginTop: '34px' }}>
            <span style={{ fontFamily: T.sans, fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: T.inkFaint }}>Limited capacity · Curated guest list</span>
            <button onClick={submit} style={{ display: 'inline-flex', alignItems: 'center', gap: '11px', fontFamily: T.sans, fontWeight: 500, fontSize: '11.5px', letterSpacing: '.18em', textTransform: 'uppercase', padding: '14px 26px', borderRadius: '2px', color: '#0D0D0D', background: T.sand, border: `1px solid ${T.sand}`, cursor: 'pointer' }}>
              Generate access card <span>→</span>
            </button>
          </div>
        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '10px', letterSpacing: '.24em', textTransform: 'uppercase', color: T.sand, marginBottom: '22px' }}>Your access card</div>
          <AccessPass card={card} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '30px', flexWrap: 'wrap' as const, justifyContent: 'center' }}>
            <button onClick={save} disabled={saved}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '11px', fontFamily: T.sans, fontWeight: 500, fontSize: '11.5px', letterSpacing: '.18em', textTransform: 'uppercase', padding: '14px 26px', borderRadius: '2px', color: '#0D0D0D', background: saved ? T.inkFaint : T.sand, border: `1px solid ${saved ? T.inkFaint : T.sand}`, cursor: saved ? 'default' : 'pointer', opacity: saved ? .65 : 1 }}>
              {saved ? '✓ Saved to gallery' : 'Save to my gallery'}
            </button>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: T.inkDim, fontFamily: T.sans, fontWeight: 400, fontSize: '11px', letterSpacing: '.12em', textTransform: 'uppercase', cursor: 'pointer' }}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

function GallerySheet({ gallery, onClose, onRemove }: { gallery: SavedCard[]; onClose: () => void; onRemove: (id: number) => void }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '860px', maxHeight: '90vh', overflowY: 'auto', background: T.surface2, border: `1px solid ${T.border}`, borderRadius: '6px', padding: '38px 38px 34px', animation: 'sheetin .4s cubic-bezier(.2,.8,.3,1)' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '18px', width: '34px', height: '34px', borderRadius: '50%', border: `1px solid ${T.borderFaint}`, background: 'transparent', color: T.inkDim, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer' }}>✕</button>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap' as const, marginBottom: '30px' }}>
        <div>
          <span style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '.28em', textTransform: 'uppercase', color: T.sand }}>Curated guest list</span>
          <h3 style={{ fontFamily: T.serif, fontWeight: 300, fontSize: '2.1rem', lineHeight: 1.05, margin: '6px 0 0', color: T.ink }}>My Gallery</h3>
        </div>
        <span style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: T.inkFaint }}>{gallery.length} card{gallery.length !== 1 ? 's' : ''} collected</span>
      </div>
      {gallery.length === 0 ? (
        <div style={{ fontFamily: T.serif, fontWeight: 300, fontSize: '1.5rem', color: T.inkDim, textAlign: 'center', padding: '50px 10px', lineHeight: 1.5 }}>
          No cards yet.
          <span style={{ display: 'block', fontFamily: T.sans, fontSize: '12px', color: T.inkFaint, marginTop: '14px' }}>RSVP to any event to collect your first access card.</span>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '26px' }}>
          {gallery.map(c => (
            <div key={c.id} style={{ position: 'relative' }}>
              <button onClick={() => onRemove(c.id)} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 6, width: '26px', height: '26px', borderRadius: '50%', border: `1px solid ${T.borderFaint}`, background: 'rgba(13,13,13,.7)', color: T.inkDim, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>✕</button>
              <AccessPass card={c} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── main App ──────────────────────────────────────────── */
export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [rsvpIdx, setRsvpIdx] = useState<number | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [gallery, setGallery] = useState<SavedCard[]>(() => {
    try { return JSON.parse(localStorage.getItem('pod_gallery') || '[]'); } catch { return []; }
  });
  const [topbarSolid, setTopbarSolid] = useState(false);
  const [stickyShow, setStickyShow] = useState(false);
  const [toast, setToast] = useState('');
  const [EVENTS, setEvents] = useState<Event[]>(FALLBACK_EVENTS);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

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
    const hero = heroRef.current;
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => {
      const gone = !e.isIntersecting;
      setTopbarSolid(gone);
      setStickyShow(gone);
    }, { rootMargin: '-65% 0px 0px 0px' });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.fx');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const isReserved = (idx: number) => gallery.some(c => c.eventIdx === idx);
  const overlayOpen = rsvpIdx !== null || galleryOpen;

  return (
    <div style={{ background: T.bg, color: T.ink, fontFamily: T.sans, fontWeight: 300, lineHeight: 1.6, minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @keyframes sheetin { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
        @keyframes scrollcue { 0%,100%{ transform:scaleX(.3); opacity:.4; } 50%{ transform:scaleX(1); opacity:1; } }
        @media (prefers-reduced-motion: no-preference) {
          .fx { opacity:0; transform:translateY(20px); }
          .fx.in { opacity:1; transform:none; transition:opacity .9s ease, transform .9s cubic-bezier(.2,.7,.3,1); }
        }
        * { box-sizing:border-box; }
        ::selection { background:${T.sand}; color:#0D0D0D; }
        input { background:transparent; border:none; border-bottom:1px solid ${T.border}; color:${T.ink}; font-family:${T.sans}; font-size:15px; font-weight:300; padding:8px 0; outline:none; width:100%; }
        input::placeholder { color:${T.inkFaint}; }
        input:focus { border-bottom-color:${T.sand}; }
        .filmstrip { display:flex; gap:clamp(20px,2.4vw,34px); overflow-x:auto; padding-bottom:14px; scroll-snap-type:x mandatory; scrollbar-width:thin; scrollbar-color:${T.border} transparent; }
        .filmstrip::-webkit-scrollbar { height:5px; }
        .filmstrip::-webkit-scrollbar-thumb { background:${T.border}; border-radius:40px; }
      `}</style>

      {/* Film grain */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: .05, mixBlendMode: 'overlay',
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Index rail */}
      <aside aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '62px', zIndex: 40, borderRight: `1px solid ${T.borderFaint}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0', background: 'rgba(13,13,13,0.4)', backdropFilter: 'blur(6px)' }} className="hidden md:flex">
        <div style={{ fontFamily: T.sans, fontSize: '10px', letterSpacing: '.12em', color: T.inkFaint }}>№ 001</div>
        <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: T.sans, fontWeight: 500, fontSize: '10px', letterSpacing: '.34em', textTransform: 'uppercase', color: T.inkDim }}>Hipódromo Condesa · CDMX</div>
        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: T.sand }} />
      </aside>

      {/* Top bar */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 45, height: topbarSolid ? '60px' : '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(22px,5vw,72px) 0 calc(62px + clamp(22px,5vw,72px))', transition: 'background .4s ease, height .3s ease', background: topbarSolid ? 'rgba(13,13,13,0.82)' : 'transparent', backdropFilter: topbarSolid ? 'blur(12px)' : 'none', borderBottom: topbarSolid ? `1px solid ${T.borderFaint}` : '1px solid transparent' }}>
        <div style={{ fontFamily: T.sans, fontWeight: 600, fontSize: '13px', letterSpacing: '.26em', textTransform: 'uppercase', color: T.ink }}>POD Art House</div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          <button onClick={() => setGalleryOpen(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'transparent', border: 'none', color: T.ink, fontFamily: T.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', cursor: 'pointer' }}>
            My Gallery
            <span style={{ minWidth: '20px', height: '20px', padding: '0 6px', borderRadius: '40px', background: gallery.length > 0 ? T.sand : 'transparent', color: gallery.length > 0 ? '#0D0D0D' : T.inkFaint, border: gallery.length > 0 ? 'none' : `1px solid ${T.border}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '10px' }}>
              {gallery.length}
            </span>
          </button>
          <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '11px', fontFamily: T.sans, fontWeight: 500, fontSize: '11.5px', letterSpacing: '.18em', textTransform: 'uppercase', padding: '10px 18px', color: T.sand, border: `1px solid ${T.sand}`, borderRadius: '2px', textDecoration: 'none' }}>
            RSVP <span>→</span>
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'flex-end', padding: '0 clamp(22px,5vw,72px) clamp(56px,8vh,100px) calc(62px + clamp(22px,5vw,72px))', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={heroImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        </div>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.5) 38%, rgba(13,13,13,0.15) 64%, rgba(13,13,13,0.45) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1040px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="fx" style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '.28em', textTransform: 'uppercase', color: T.sand }}>Opening Night · May 22, 2026</div>
          <h1 className="fx" style={{ fontFamily: T.serif, fontWeight: 300, color: T.ink, margin: '.2em 0 0', fontSize: 'clamp(3.1rem,8vw,6rem)', lineHeight: 1.0, letterSpacing: '-.02em' }}>It happened <span style={{ fontStyle: 'italic', fontWeight: 400 }}>here.</span></h1>
          <p className="fx" style={{ fontFamily: T.serif, fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(1.15rem,2.4vw,1.6rem)', color: T.ink, opacity: .86, maxWidth: '30ch', margin: '.55em 0 2em' }}>An inaugural gathering of artists, performers and collaborators.</p>
          <p className="fx" style={{ fontFamily: T.sans, fontWeight: 300, fontSize: '13px', lineHeight: 1.8, color: T.inkDim, maxWidth: '52ch' }}>
            The evening opened with SOMA EP.01 — ÆTHER, a live sound and movement performance. Works by Antonia Markakis, Alexandra Roca, Evgenia Berestneva, Ewa Zawieja, Miqui and Severin Hallauer lined the gallery walls. The night closed with Audaks on the rooftop. Mezcal Amaraz accompanied the experience.
          </p>
        </div>
        <div aria-hidden="true" style={{ position: 'absolute', left: 'calc(62px + clamp(22px,5vw,72px))', bottom: '26px', zIndex: 2, display: 'flex', alignItems: 'center', gap: '10px', color: T.inkFaint, fontSize: '10px', letterSpacing: '.22em', textTransform: 'uppercase' }}>
          <span style={{ width: '46px', height: '1px', background: T.sand, transformOrigin: 'left', animation: 'scrollcue 2.6s ease-in-out infinite' }} />
          Scroll
        </div>
      </section>

      <main style={{ marginLeft: '62px' }}>

        {/* About strip */}
        <section className="fx" style={{ padding: 'clamp(64px,9vw,120px) clamp(22px,5vw,72px)', position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: 'minmax(160px,220px) 1fr', gap: 'clamp(28px,5vw,80px)', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[['Space', 'Gallery + Community'], ['Location', 'Av. Nuevo León 108,\nHipódromo Condesa, CDMX'], ['Open', 'Tue – Sun · 11am – 8pm']].map(([label, val]) => (
              <div key={label}>
                <span style={{ display: 'block', fontFamily: T.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: T.inkFaint, marginBottom: '7px' }}>{label}</span>
                <div style={{ fontFamily: T.serif, fontSize: '1.05rem', color: T.ink, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{val}</div>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 'clamp(1.4rem,2.6vw,2rem)', lineHeight: 1.45, color: T.ink, margin: '0 0 1.4em', maxWidth: '28ch' }}>
              A space where art, food and community share the same table.
            </p>
            <p style={{ fontFamily: T.sans, fontWeight: 300, fontSize: '15px', lineHeight: 1.8, color: T.inkDim, maxWidth: '54ch', margin: 0 }}>
              POD Art House is a gallery, dining room and gathering place in the Hipódromo Condesa. We programme exhibitions, weekly dinners and live events — all under one roof, all with the same intention: to bring people together around what matters.
            </p>
          </div>
        </section>

        <div style={{ height: '1px', background: T.borderFaint, margin: '0 clamp(22px,5vw,72px)' }} />

        {/* Events filmstrip */}
        <section id="events" style={{ padding: 'clamp(64px,9vw,140px) clamp(22px,5vw,72px)', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' as const, marginBottom: 'clamp(34px,4vw,56px)' }}>
            <div>
              <span style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '.28em', textTransform: 'uppercase', color: T.sand }}>POD Art House</span>
              <h2 className="fx" style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 'clamp(2.6rem,6vw,3.4rem)', lineHeight: 1, color: T.ink, margin: '.28em 0 0' }}>What's On</h2>
              <p style={{ fontFamily: T.sans, fontSize: '13px', color: T.inkDim, letterSpacing: '.02em' }}>Curated experiences. Limited capacity.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '.2em', textTransform: 'uppercase', color: T.inkFaint }}>{EVENTS.length} upcoming</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['prev', 'next'] as const).map(dir => (
                  <button key={dir} onClick={() => stripRef.current?.scrollBy({ left: dir === 'prev' ? -320 : 320, behavior: 'smooth' })}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', border: `1px solid ${T.border}`, background: 'transparent', color: T.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px' }}>
                    {dir === 'prev' ? '←' : '→'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div ref={stripRef} className="filmstrip">
            {EVENTS.map((ev, i) => (
              <article key={i} style={{ flex: '0 0 clamp(240px,26vw,300px)', scrollSnapAlign: 'start' }}>
                <div style={{ position: 'relative', width: '100%', paddingBottom: '125%', overflow: 'hidden', background: (ev.dinner || ev.imageUrl) ? 'transparent' : T.surface, border: `1px solid ${T.borderFaint}` }}>
                  {(ev.dinner || ev.imageUrl) ? (
                    <img src={ev.imageUrl || dinnerImage} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase', color: T.sand, opacity: .7 }}>{ev.type}</span>
                    </div>
                  )}
                  <span style={{ position: 'absolute', top: '12px', left: '13px', zIndex: 3, fontFamily: T.sans, fontWeight: 500, fontSize: '10px', letterSpacing: '.14em', color: T.inkDim }}>{String(i + 1).padStart(2, '0')}</span>
                  {(ev.dinner || ev.imageUrl) && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 60%)' }} />}
                </div>
                <div style={{ paddingTop: '16px' }}>
                  <span style={{ display: 'inline-flex', fontFamily: T.sans, fontWeight: 600, fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#0D0D0D', background: T.sand, padding: '6px 11px', borderRadius: '3px' }}>{ev.day} · {ev.d}</span>
                  <h3 style={{ fontFamily: T.serif, fontWeight: 500, fontSize: '1.4rem', lineHeight: 1.12, color: T.ink, margin: '13px 0 8px' }}>{ev.n}</h3>
                  <div style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: T.inkFaint }}>{ev.type}</div>
                  <p style={{ fontFamily: T.sans, fontWeight: 300, fontSize: '13px', lineHeight: 1.65, color: T.inkDim, margin: '12px 0 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{ev.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '14px', borderTop: `1px solid ${T.borderFaint}` }}>
                    <span style={{ fontFamily: T.sans, fontWeight: 500, fontSize: '12px', letterSpacing: '.08em', color: T.sand }}>{ev.t}</span>
                    {ev.dinner ? (
                      <button onClick={() => setBookingOpen(true)} style={{ background: 'transparent', border: 'none', color: T.sand, fontFamily: T.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '7px', cursor: 'pointer' }}>
                        Book <span>→</span>
                      </button>
                    ) : (
                      <button onClick={() => setRsvpIdx(i)} style={{ background: 'transparent', border: 'none', color: isReserved(i) ? T.inkFaint : T.sand, fontFamily: T.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '7px', cursor: 'pointer' }}>
                        {isReserved(i) ? 'Reserved ✓' : 'RSVP'} {!isReserved(i) && <span>→</span>}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" style={{ padding: 'clamp(48px,7vw,90px) clamp(22px,5vw,72px) 40px', borderTop: `1px solid ${T.borderFaint}`, position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '30px', flexWrap: 'wrap' as const, alignItems: 'flex-start', marginBottom: '48px' }}>
            <div style={{ fontFamily: T.serif, fontWeight: 300, fontSize: 'clamp(2rem,5vw,3rem)', lineHeight: 1, color: T.ink }}>POD Art House</div>
            <div style={{ fontFamily: T.sans, fontSize: '13px', lineHeight: 1.9, color: T.inkDim, textAlign: 'right' }}>
              Av. Nuevo León 108<br />Hipódromo Condesa<br />Ciudad de México<br />
              <span style={{ color: T.sand }}>@podarthouse</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' as const, paddingTop: '22px', borderTop: `1px solid ${T.borderFaint}` }}>
            {['Productivity · Wellness · Art · Community', '© 2026 POD Art House'].map(t => (
              <span key={t} style={{ fontFamily: T.sans, fontSize: '10.5px', letterSpacing: '.12em', textTransform: 'uppercase', color: T.inkFaint }}>{t}</span>
            ))}
          </div>
        </footer>
      </main>

      {/* Sticky bar */}
      <div style={{ position: 'fixed', left: '62px', right: 0, bottom: 0, zIndex: 38, transform: stickyShow ? 'translateY(0)' : 'translateY(110%)', transition: 'transform .5s cubic-bezier(.2,.7,.3,1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' as const, padding: '15px clamp(22px,5vw,72px)', background: 'rgba(13,13,13,0.9)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${T.sand}` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
            <span style={{ fontFamily: T.serif, fontStyle: 'italic', fontSize: '1.25rem', color: T.ink }}>POD Art House</span>
            <span style={{ fontFamily: T.sans, fontSize: '10.5px', letterSpacing: '.14em', textTransform: 'uppercase', color: T.inkFaint }}>Gallery · Dining · Community · Condesa</span>
          </div>
          <a href="#events" style={{ display: 'inline-flex', alignItems: 'center', gap: '11px', fontFamily: T.sans, fontWeight: 500, fontSize: '10.5px', letterSpacing: '.16em', textTransform: 'uppercase', padding: '10px 18px', color: T.sand, border: `1px solid ${T.sand}`, borderRadius: '2px', textDecoration: 'none' }}>
            Reserve access <span>→</span>
          </a>
        </div>
      </div>

      {/* Overlay */}
      {overlayOpen && (
        <div onClick={(e) => { if (e.target === e.currentTarget) { setRsvpIdx(null); setGalleryOpen(false); } }}
          style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'rgba(8,8,8,0.72)', backdropFilter: 'blur(5px)' }}>
          {rsvpIdx !== null && (
            <RSVPSheet eventIdx={rsvpIdx} onClose={() => setRsvpIdx(null)} onSave={(card) => { saveCard(card); }} />
          )}
          {galleryOpen && (
            <GallerySheet gallery={gallery} onClose={() => setGalleryOpen(false)} onRemove={(id) => { removeCard(id); }} />
          )}
        </div>
      )}

      {/* Booking flow (Stripe — Thursday dinner) */}
      {bookingOpen && <BookingFlow onClose={() => setBookingOpen(false)} />}

      {/* Toast */}
      <div style={{ position: 'fixed', left: '50%', bottom: '28px', transform: `translateX(-50%) translateY(${toast ? '0' : '24px'})`, zIndex: 120, background: T.ink, color: '#0D0D0D', fontFamily: T.sans, fontWeight: 500, fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', padding: '13px 22px', borderRadius: '40px', opacity: toast ? 1 : 0, transition: 'all .35s cubic-bezier(.2,.8,.3,1)', pointerEvents: 'none' }}>
        {toast}
      </div>
    </div>
  );
}
