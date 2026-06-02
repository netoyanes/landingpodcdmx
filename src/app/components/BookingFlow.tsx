import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import DinnerCard from './DinnerCard';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const PRICE_PER_PERSON = 1500;

const MENU = [
  { dish: 'Listones del Huerto', wine: 'Verdejo · Vinho Verde' },
  { dish: 'Cous Cous Cremoso', wine: 'Falanghina · Sauv Blanc de BDX' },
  { dish: 'Pesca Levantina', wine: 'Assyrtiko · Riesling Alemán Seco' },
  { dish: 'Sesame Cheesecake', wine: 'Donnafugata Ben Ryé · Vin Santo' },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  guests: number;
}

function generateReservationId() {
  return `POD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
}

// ── Step 1: Guest info ──────────────────────────────────────────────────────

function StepInfo({ onNext }: { onNext: (data: FormData) => void }) {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', guests: 2 });

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: k === 'guests' ? Number(e.target.value) : e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(form);
  };

  const total = form.guests * PRICE_PER_PERSON;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { id: 'name', label: 'NAME', type: 'text', key: 'name' as const },
        { id: 'email', label: 'EMAIL', type: 'email', key: 'email' as const },
        { id: 'phone', label: 'PHONE', type: 'tel', key: 'phone' as const },
      ].map(({ id, label, type, key }) => (
        <div key={id}>
          <label className="block mb-2" style={labelStyle}>{label}</label>
          <input
            type={type}
            id={id}
            required
            value={form[key] as string}
            onChange={set(key)}
            style={inputStyle}
            className="w-full bg-transparent border border-[#EFEFE0]/20 text-[#EFEFE0] px-4 py-3 focus:outline-none focus:border-[#EFEFE0]/60 transition-colors"
          />
        </div>
      ))}

      <div>
        <label className="block mb-2" style={labelStyle}>NUMBER OF GUESTS</label>
        <select
          value={form.guests}
          onChange={set('guests')}
          style={{ ...inputStyle, background: '#0D0D0D' }}
          className="w-full border border-[#EFEFE0]/20 text-[#EFEFE0] px-4 py-3 focus:outline-none focus:border-[#EFEFE0]/60 transition-colors"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-between items-center pt-2" style={{ borderTop: '1px solid rgba(239,239,224,0.1)' }}>
        <span style={{ ...labelStyle, letterSpacing: '1px' }}>TOTAL</span>
        <span style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '20px', color: '#EFEFE0' }}>
          MX${total.toLocaleString()}
        </span>
      </div>

      <button type="submit" style={btnStyle} className="w-full py-4 tracking-[3px] hover:opacity-90 transition-opacity">
        CONTINUE TO PAYMENT
      </button>
    </form>
  );
}

// ── Step 2: Payment ─────────────────────────────────────────────────────────

function PaymentForm({ formData, onSuccess }: { formData: FormData; onSuccess: (id: string) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guests: formData.guests, name: formData.name, email: formData.email }),
      });
      const { clientSecret, error: serverError } = await res.json();
      if (serverError) throw new Error(serverError);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { name: formData.name, email: formData.email, phone: formData.phone },
        },
      });

      if (result.error) throw new Error(result.error.message);
      onSuccess(generateReservationId());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay} className="space-y-5">
      {/* Menu preview */}
      <div className="space-y-2 pb-4" style={{ borderBottom: '1px solid rgba(239,239,224,0.1)' }}>
        <div style={labelStyle} className="mb-3">YOUR MENU · · ·</div>
        {MENU.map((item) => (
          <div key={item.dish} className="flex justify-between items-start gap-4">
            <span style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '13px', color: '#EFEFE0' }}>
              {item.dish}
            </span>
            <span style={{ fontFamily: 'Poppins', fontSize: '9px', fontWeight: 300, color: 'rgba(239,239,224,0.4)', textAlign: 'right', whiteSpace: 'nowrap' }}>
              {item.wine}
            </span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex justify-between">
        <span style={labelStyle}>{formData.guests} × MX$1,500</span>
        <span style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '18px', color: '#EFEFE0' }}>
          MX${(formData.guests * PRICE_PER_PERSON).toLocaleString()}
        </span>
      </div>

      {/* Stripe card element */}
      <div>
        <label className="block mb-2" style={labelStyle}>CARD DETAILS</label>
        <div className="border border-[#EFEFE0]/20 px-4 py-3 focus-within:border-[#EFEFE0]/60 transition-colors">
          <CardElement
            options={{
              style: {
                base: {
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  color: '#EFEFE0',
                  '::placeholder': { color: 'rgba(239,239,224,0.3)' },
                },
                invalid: { color: '#ff6b6b' },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <p style={{ fontFamily: 'Poppins', fontSize: '11px', color: '#ff6b6b' }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        style={btnStyle}
        className="w-full py-4 tracking-[3px] hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        {loading ? 'PROCESSING...' : `PAY MX$${(formData.guests * PRICE_PER_PERSON).toLocaleString()}`}
      </button>

      <p style={{ fontFamily: 'Poppins', fontSize: '9px', fontWeight: 300, color: 'rgba(239,239,224,0.3)', textAlign: 'center' }}>
        Secured by Stripe · Payments processed in MXN
      </p>
    </form>
  );
}

// ── Main BookingFlow ────────────────────────────────────────────────────────

interface BookingFlowProps {
  onClose: () => void;
}

export default function BookingFlow({ onClose }: BookingFlowProps) {
  const [step, setStep] = useState<'info' | 'payment' | 'card'>('info');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [reservationId, setReservationId] = useState('');

  if (step === 'card' && formData) {
    return (
      <DinnerCard
        name={formData.name}
        guests={formData.guests}
        reservationId={reservationId}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.80)' }}>
      <div
        className="w-full max-w-md relative"
        style={{
          background: 'linear-gradient(160deg, #141412 0%, #0D0D0B 100%)',
          border: '1px solid rgba(239,239,224,0.12)',
        }}
      >
        {/* Top bar */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(239,239,224,0.3), transparent)' }} />

        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <div style={labelStyle}>WEEKLY GATHERING</div>
              <h2 style={{ fontFamily: 'Playfair Display', fontWeight: 900, fontSize: '26px', color: '#EFEFE0', marginTop: '4px', lineHeight: 1.2 }}>
                Thursday<br />Dinner
              </h2>
              <div style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '11px', color: 'rgba(239,239,224,0.5)', marginTop: '4px' }}>
                June 5 · 8:00 PM · Condesa
              </div>
            </div>
            <button onClick={onClose} style={{ color: 'rgba(239,239,224,0.3)', fontSize: '20px', lineHeight: 1 }} className="hover:opacity-60 transition-opacity">
              ×
            </button>
          </div>

          {/* Steps indicator */}
          <div className="flex gap-2 mb-8">
            {(['info', 'payment'] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  style={{
                    width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: step === s ? '#EFEFE0' : 'rgba(239,239,224,0.1)',
                    fontFamily: 'Poppins', fontSize: '9px', fontWeight: 600,
                    color: step === s ? '#0D0D0D' : 'rgba(239,239,224,0.3)',
                    transition: 'all 0.3s',
                  }}
                >
                  {i + 1}
                </div>
                <span style={{ fontFamily: 'Poppins', fontSize: '9px', fontWeight: 600, letterSpacing: '2px', color: step === s ? 'rgba(239,239,224,0.7)' : 'rgba(239,239,224,0.2)' }}>
                  {s === 'info' ? 'DETAILS' : 'PAYMENT'}
                </span>
                {i < 1 && <div style={{ width: '20px', height: '1px', background: 'rgba(239,239,224,0.15)' }} />}
              </div>
            ))}
          </div>

          {/* Step content */}
          {step === 'info' && (
            <StepInfo
              onNext={(data) => {
                setFormData(data);
                setStep('payment');
              }}
            />
          )}

          {step === 'payment' && formData && (
            stripePromise ? (
              <Elements stripe={stripePromise}>
                <PaymentForm
                  formData={formData}
                  onSuccess={(id) => {
                    setReservationId(id);
                    setStep('card');
                  }}
                />
              </Elements>
            ) : (
              <div className="space-y-6">
                <div style={{ padding: '20px', border: '1px solid rgba(239,239,224,0.15)', background: 'rgba(239,239,224,0.04)' }}>
                  <p style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '11px', letterSpacing: '1px', color: 'rgba(239,239,224,0.7)', marginBottom: '8px' }}>
                    STRIPE NOT CONFIGURED YET
                  </p>
                  <p style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '12px', color: 'rgba(239,239,224,0.45)', lineHeight: 1.7 }}>
                    Add your <code style={{ background: 'rgba(239,239,224,0.1)', padding: '1px 5px' }}>VITE_STRIPE_PUBLISHABLE_KEY</code> and <code style={{ background: 'rgba(239,239,224,0.1)', padding: '1px 5px' }}>STRIPE_SECRET_KEY</code> in Vercel → Settings → Environment Variables to enable payments.
                  </p>
                </div>
                <button
                  onClick={() => { setReservationId('DEMO-' + Math.random().toString(36).substring(2,7).toUpperCase()); setStep('card'); }}
                  style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '10px', letterSpacing: '3px', background: 'rgba(239,239,224,0.15)', color: '#EFEFE0', border: '1px solid rgba(239,239,224,0.2)', cursor: 'pointer', width: '100%', padding: '16px' }}
                >
                  PREVIEW CONFIRMATION CARD →
                </button>
              </div>
            )
          )}
        </div>

        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(239,239,224,0.1), transparent)' }} />
      </div>
    </div>
  );
}

// ── Shared styles ───────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: 'Poppins',
  fontWeight: 600,
  fontSize: '9px',
  letterSpacing: '2px',
  color: 'rgba(239,239,224,0.45)',
};

const inputStyle: React.CSSProperties = {
  fontFamily: 'Poppins',
  fontWeight: 300,
  fontSize: '14px',
};

const btnStyle: React.CSSProperties = {
  fontFamily: 'Poppins',
  fontWeight: 600,
  fontSize: '10px',
  background: '#EFEFE0',
  color: '#0D0D0D',
  cursor: 'pointer',
  border: 'none',
};
