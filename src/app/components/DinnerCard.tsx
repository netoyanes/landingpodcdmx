import { QRCodeSVG } from 'qrcode.react';

interface DinnerCardProps {
  name: string;
  guests: number;
  reservationId: string;
  onClose: () => void;
}

const MENU = [
  {
    course: 'Entrada',
    dish: 'Listones del Huerto',
    desc: 'Calabacita y pepino, vinagreta de hierbas, labneh, garbanzo al za\'atar, cebolla morada encurtida',
    wine: 'VERDEJO · VINHO VERDE',
  },
  {
    course: 'Primero',
    dish: 'Cous Cous Cremoso',
    desc: 'Feta, kalamata, jitomate deshidratado y cherry, chícharo, alcachofa',
    wine: 'FALANGHINA · SAUV BLANC DE BDX',
  },
  {
    course: 'Principal',
    dish: 'Pesca Levantina',
    desc: 'Pescado al sumac, crocante de papa al limón, tahini tibio, broccolini al harissa',
    wine: 'ASSYRTIKO · RIESLING ALEMÁN SECO',
  },
  {
    course: 'Postre',
    dish: 'Sesame Cheesecake',
    desc: 'Crust de ajonjolí, frutos secos, melaza de granada',
    wine: 'DONNAFUGATA BEN RYÉ · VIN SANTO',
  },
];

export default function DinnerCard({ name, guests, reservationId, onClose }: DinnerCardProps) {
  const qrData = `POD-DINNER:${reservationId}:${name}:${guests}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }}>
      {/* Outer glow */}
      <div className="relative w-full max-w-sm" style={{ filter: 'drop-shadow(0 0 40px rgba(239,239,224,0.15))' }}>

        {/* Card */}
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: 'linear-gradient(160deg, #1C1C1A 0%, #0D0D0B 60%, #1A1A14 100%)',
            border: '1px solid rgba(239,239,224,0.12)',
          }}
        >
          {/* Top shimmer line */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(239,239,224,0.4), transparent)' }} />

          {/* Header */}
          <div className="px-7 pt-7 pb-5">
            <div className="flex items-start justify-between">
              <div>
                <div style={{ fontFamily: 'Poppins', fontSize: '9px', fontWeight: 600, letterSpacing: '3px', color: 'rgba(239,239,224,0.45)' }}>
                  POD CONDESA
                </div>
                <div style={{ fontFamily: 'Playfair Display', fontSize: '22px', fontWeight: 900, color: '#EFEFE0', marginTop: '4px', lineHeight: 1.1 }}>
                  Thursday<br />Dinner
                </div>
              </div>
              <div className="text-right">
                <div style={{ fontFamily: 'Poppins', fontSize: '9px', fontWeight: 600, letterSpacing: '2px', color: 'rgba(239,239,224,0.45)' }}>
                  DATE
                </div>
                <div style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 600, color: '#EFEFE0', marginTop: '4px' }}>
                  JUN 5, 2025
                </div>
                <div style={{ fontFamily: 'Poppins', fontSize: '11px', fontWeight: 300, color: 'rgba(239,239,224,0.6)', marginTop: '2px' }}>
                  8:00 PM
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-7" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(239,239,224,0.15), transparent)' }} />

          {/* Guest info */}
          <div className="px-7 py-5 grid grid-cols-2 gap-4">
            <div>
              <div style={{ fontFamily: 'Poppins', fontSize: '8px', fontWeight: 600, letterSpacing: '2px', color: 'rgba(239,239,224,0.4)' }}>
                GUEST
              </div>
              <div style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 500, color: '#EFEFE0', marginTop: '4px' }}>
                {name}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'Poppins', fontSize: '8px', fontWeight: 600, letterSpacing: '2px', color: 'rgba(239,239,224,0.4)' }}>
                SEATS
              </div>
              <div style={{ fontFamily: 'Poppins', fontSize: '13px', fontWeight: 500, color: '#EFEFE0', marginTop: '4px' }}>
                {guests} {guests === 1 ? 'Guest' : 'Guests'}
              </div>
            </div>
            <div className="col-span-2">
              <div style={{ fontFamily: 'Poppins', fontSize: '8px', fontWeight: 600, letterSpacing: '2px', color: 'rgba(239,239,224,0.4)' }}>
                VENUE
              </div>
              <div style={{ fontFamily: 'Poppins', fontSize: '12px', fontWeight: 300, color: 'rgba(239,239,224,0.8)', marginTop: '4px' }}>
                Nuevo León 108, Condesa, CDMX
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-7" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(239,239,224,0.15), transparent)' }} />

          {/* Menu */}
          <div className="px-7 py-5">
            <div style={{ fontFamily: 'Poppins', fontSize: '8px', fontWeight: 600, letterSpacing: '3px', color: 'rgba(239,239,224,0.4)', marginBottom: '12px' }}>
              MENÚ · · ·
            </div>
            <div className="space-y-3">
              {MENU.map((item) => (
                <div key={item.course} className="flex gap-3">
                  <div style={{ fontFamily: 'Poppins', fontSize: '8px', fontWeight: 600, letterSpacing: '1px', color: 'rgba(239,239,224,0.35)', minWidth: '48px', paddingTop: '2px' }}>
                    {item.course.toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '12px', color: '#EFEFE0', lineHeight: 1.3 }}>
                      {item.dish}
                    </div>
                    <div style={{ fontFamily: 'Poppins', fontSize: '9px', fontWeight: 300, color: 'rgba(239,239,224,0.45)', marginTop: '2px', lineHeight: 1.4 }}>
                      {item.wine}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom perforated divider */}
          <div className="relative mx-7 my-1">
            <div style={{ height: '1px', borderTop: '1px dashed rgba(239,239,224,0.2)' }} />
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full" style={{ background: 'rgba(0,0,0,0.85)' }} />
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full" style={{ background: 'rgba(0,0,0,0.85)' }} />
          </div>

          {/* QR section */}
          <div className="px-7 py-5 flex items-center gap-5">
            <div
              className="p-2 rounded-xl"
              style={{ background: '#EFEFE0' }}
            >
              <QRCodeSVG
                value={qrData}
                size={72}
                bgColor="#EFEFE0"
                fgColor="#0D0D0D"
                level="M"
              />
            </div>
            <div>
              <div style={{ fontFamily: 'Poppins', fontSize: '8px', fontWeight: 600, letterSpacing: '2px', color: 'rgba(239,239,224,0.4)' }}>
                RESERVATION ID
              </div>
              <div style={{ fontFamily: 'Poppins', fontSize: '11px', fontWeight: 500, color: '#EFEFE0', marginTop: '4px', letterSpacing: '1px' }}>
                {reservationId.toUpperCase()}
              </div>
              <div style={{ fontFamily: 'Poppins', fontSize: '9px', fontWeight: 300, color: 'rgba(239,239,224,0.4)', marginTop: '6px', lineHeight: 1.5 }}>
                Present this code<br />at the entrance
              </div>
            </div>
          </div>

          {/* Bottom shimmer */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(239,239,224,0.15), transparent)' }} />

          {/* Footer */}
          <div className="px-7 py-4 flex items-center justify-between">
            <div style={{ fontFamily: 'Poppins', fontSize: '8px', fontWeight: 300, letterSpacing: '2px', color: 'rgba(239,239,224,0.3)' }}>
              POD ART HOUSE · CONDESA
            </div>
            <div style={{ fontFamily: 'Poppins', fontSize: '8px', fontWeight: 300, letterSpacing: '1px', color: 'rgba(239,239,224,0.3)' }}>
              MX$1,500 PP
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 tracking-widest transition-opacity hover:opacity-70"
          style={{ fontFamily: 'Poppins', fontSize: '10px', fontWeight: 600, letterSpacing: '3px', color: 'rgba(239,239,224,0.5)' }}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}
