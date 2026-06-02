import { useEffect, useState } from 'react';
import PodLogo from './components/PodLogo';
import BookingFlow from './components/BookingFlow';
import heroImage from '../imports/image.png';
import dinnerImage from '../imports/IMG_2842.JPG';
import imgRectangle2 from '../imports/Artboard1-2/ddf546bc1f2cc7ddbc00d75a46dd602ebe310932.png';
import imgRectangle3 from '../imports/Artboard1-2/6f6c82969f97fa4aca641aef0f73d9ff481b8bdc.png';
import imgLayer2 from '../imports/Artboard1-2/52017034b5f556025947bd39ad6a8d47dc19eb13.png';
import imgLayer3 from '../imports/Artboard1-2/3a58c355dc08dc1a0b1856a1aae9b53db1d331c9.png';
import imgLayer4 from '../imports/Artboard1-2/ad1951afac795234f658fc4eb664d99c510aa06c.png';
import imgLayer5 from '../imports/Artboard1-2/29ec86f0b336ff1de1f49102cf1fb93765be649c.png';
import imgEstrella from '../imports/Artboard1-2/755d2341c16b11039427b72216e8ce890aed9d52.png';
import imgHog from '../imports/Artboard1-2/d6e757fe4fd9c742a7d50472e5fceefc57b53510.png';
import imgFallenGrape from '../imports/Artboard1-2/91d6cb94d1edb3dd1b6c213301df7cc47113e2b1.png';
import imgVectorSmartObject from '../imports/Artboard1-2/2eda8c556e6be46840dc1527f7efcb692b409781.png';
import imgAmaras from '../imports/Artboard1-2/0f7f710cb9205c333e9f7903be68951a76117ce6.png';
import imgPodArtHouse from '../imports/Artboard1-2/afe3da367efffaf56ea7cb30fc59ede353bd789d.png';
import imgLayer6 from '../imports/Artboard1-2/41171619227ad67c88970294e7d53ac6bbe4d3fc.png';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-section').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .fade-section {
            opacity: 0;
          }
          .fade-section.fade-in {
            animation: fadeInUp 600ms ease-out forwards;
          }
        `}
      </style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-[1440px] mx-auto px-8 md:px-[80px] py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PodLogo color="#EFEFE0" size={32} />
            <div>
              <div
                className="text-[#EFEFE0] tracking-[7.5px]"
                style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '11px' }}
              >
                POD ART HOUSE
              </div>
              <div
                className="text-[#EFEFE0]/70 tracking-[4px]"
                style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '9px' }}
              >
                NUEVO LEÓN 108 - CDMX
              </div>
            </div>
          </div>

          <a
            href="#contact"
            className="border border-[#EFEFE0] text-[#EFEFE0] px-6 py-3 tracking-[3px] hover:bg-[#EFEFE0] hover:text-[#0D0D0D] transition-all duration-200"
            style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '11px' }}
          >
            RSVP
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section>
        {/* Photo — full bleed, no text on mobile */}
        <div className="relative w-full" style={{ height: '100svh' }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          {/* Desktop: dark gradient at bottom so text reads */}
          <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-[#0D0D0D]/70 via-[#0D0D0D]/20 to-transparent" />
          {/* Mobile: subtle gradient at very bottom leading into the dark text block */}
          <div className="absolute bottom-0 left-0 right-0 h-32 md:hidden" style={{ background: 'linear-gradient(to bottom, transparent, #0D0D0D)' }} />

          {/* Desktop text — overlaid at bottom */}
          <div className="hidden md:flex absolute inset-0 items-end px-[80px] pb-24">
            <div className="max-w-[1440px] mx-auto w-full">
              <div className="max-w-[700px]">
                <div className="text-[#EFEFE0] tracking-[3px] mb-6" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '11px' }}>
                  OPENING NIGHT · MAY 22, 2026
                </div>
                <h1 className="text-[#EFEFE0] leading-[1.2] mb-8" style={{ fontFamily: 'Playfair Display', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 56px)' }}>
                  It happened here.
                </h1>
                <div className="h-[1px] bg-[#EFEFE0] w-[60px] mb-8" />
                <p className="text-[#EFEFE0] leading-[1.8] mb-12" style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '14px' }}>
                  An inaugural gathering of artists, performers and collaborators. The evening opened with SOMA EP.01 — ÆTHER, a live sound and movement performance featuring Masha Zdrok, Julia Skyresident, Hemmer and Franchesca Amore. Works by Antonia Markakis (GR), Alexandra Roca (ES), Evgenia Berestneva (RU), Ewa Zawieja (PL), Miqui (MX) and Severin Hallauer (CH) lined the gallery walls. The night closed with Audaks on the rooftop. Mezcal Amaraz accompanied the experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile text block — dark background, flows naturally from photo */}
        <div className="md:hidden bg-[#0D0D0D] px-8 pt-10 pb-16">
          <div className="text-[#EFEFE0] tracking-[3px] mb-5" style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '11px' }}>
            OPENING NIGHT · MAY 22, 2026
          </div>
          <h1 className="text-[#EFEFE0] leading-[1.2] mb-6" style={{ fontFamily: 'Playfair Display', fontWeight: 900, fontSize: 'clamp(28px, 8vw, 42px)' }}>
            It happened here.
          </h1>
          <div className="h-[1px] bg-[#EFEFE0] w-[40px] mb-6" />
          <p className="text-[#EFEFE0] leading-[1.8]" style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '13px' }}>
            An inaugural gathering of artists, performers and collaborators. The evening opened with SOMA EP.01 — ÆTHER, a live sound and movement performance featuring Masha Zdrok, Julia Skyresident, Hemmer and Franchesca Amore. Works by Antonia Markakis (GR), Alexandra Roca (ES), Evgenia Berestneva (RU), Ewa Zawieja (PL), Miqui (MX) and Severin Hallauer (CH) lined the gallery walls. The night closed with Audaks on the rooftop. Mezcal Amaraz accompanied the experience.
          </p>
        </div>
      </section>

      {/* Football Exhibition */}
      <section className="fade-section relative min-h-screen overflow-hidden">
        {/* Green background - top 50% */}
        <div className="absolute inset-0 top-0 h-[50%] bg-[#326B3E]">
          {/* Football diagram composition - locked proportions with air space */}
          <div className="absolute inset-0 p-[5%] md:p-[8%]">
            <div className="relative w-full h-full">
              {/* Based on original aspect ratio, these positions maintain the composition */}
              <img
                src={imgRectangle2}
                alt=""
                className="absolute left-[1%] top-[8%] w-[48%] h-auto object-contain"
              />
              <img
                src={imgRectangle3}
                alt=""
                className="absolute right-[1%] top-[6%] w-[43%] h-auto object-contain"
              />
              <img
                src={imgLayer2}
                alt=""
                className="absolute left-[52%] top-[27%] w-[13%] h-auto object-contain"
              />
              <img
                src={imgLayer3}
                alt=""
                className="absolute right-[8%] top-[52%] w-[11%] h-auto object-contain"
              />
              <img
                src={imgLayer4}
                alt=""
                className="absolute left-[54%] top-[75%] w-[12%] h-auto object-contain"
              />
              <img
                src={imgLayer5}
                alt=""
                className="absolute right-[10%] top-[68%] w-[11%] h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Orange background - bottom 50% */}
        <div className="absolute inset-0 top-[50%] bg-[#A52B0A]">
          {/* Content locked to orange section */}
          <div className="absolute inset-0 flex flex-col justify-center py-[8%] text-center">
            <div className="w-full max-w-[1200px] mx-auto px-8 md:px-[80px]">
              {/* Main Title */}
              <h1
                className="text-[#c6c2b4] mb-6 max-md:mb-3"
                style={{
                  fontFamily: 'Mexcellent, Playfair Display',
                  fontWeight: 'normal',
                  fontSize: 'clamp(48px, 10vw, 140px)',
                  lineHeight: '1',
                  letterSpacing: '0.01em',
                }}
              >
                LA PELOTA NO SE MANCHA
              </h1>

              {/* Subtitle row */}
              <div className="flex justify-between items-center mb-8 max-md:flex-col max-md:gap-2 max-md:mb-4">
                <div
                  className="text-[#c6c2b4]"
                  style={{
                    fontFamily: 'Mexcellent, Playfair Display',
                    fontWeight: 'normal',
                    fontSize: 'clamp(20px, 3.5vw, 48px)',
                    lineHeight: '1',
                    letterSpacing: '0.01em',
                  }}
                >
                  ART EXHIBITION
                </div>
                <div
                  className="text-[#c6c2b4]"
                  style={{
                    fontFamily: 'Mexcellent, Playfair Display',
                    fontWeight: 'normal',
                    fontSize: 'clamp(20px, 3.5vw, 48px)',
                    lineHeight: '1',
                    letterSpacing: '0.01em',
                  }}
                >
                  5 JUNE - 29 JULY
                </div>
              </div>

              {/* Credits */}
              <div
                className="text-[#c6c2b4] mb-6 max-md:mb-4 max-w-[800px] mx-auto"
                style={{
                  fontFamily: 'Poppins',
                  fontSize: 'clamp(9px, 0.9vw, 12px)',
                  lineHeight: '1.6',
                  opacity: 0.75,
                }}
              >
                <span style={{ fontWeight: 600 }}>Curated by:</span>
                <span style={{ fontWeight: 400 }}> Ezequiel Suranyi. </span>
                <span style={{ fontWeight: 600 }}>Artists: </span>
                <span style={{ fontWeight: 400 }}>
                  Alistair Woods, Carlos Herrera, Carlos Sarraf, Dani Yako, Eduardo Longoni, Ezequiel Suranyi, Giovanni de Cataldo, Grant Fleming, Hans Van der Meer, Jordi Alós, Jorge Viejo, Jürgen Rank, Malena Guerrieri, Mariana Lopez, Pablo Grinberg, Ricardo Alfieri, Zooligan.
                </span>
              </div>

              {/* Logos row */}
              <div className="flex justify-center items-center gap-4 md:gap-6 max-md:flex-wrap">
                <img
                  src={imgVectorSmartObject}
                  alt=""
                  className="h-[30px] md:h-[40px] w-auto object-contain"
                />
                <img
                  src={imgHog}
                  alt=""
                  className="h-[20px] md:h-[25px] w-auto object-contain"
                />
                <img
                  src={imgAmaras}
                  alt="Amaras"
                  className="h-[35px] md:h-[45px] w-auto object-contain"
                />
                <img
                  src={imgFallenGrape}
                  alt=""
                  className="h-[35px] md:h-[45px] w-auto object-contain"
                />
                <img
                  src={imgEstrella}
                  alt=""
                  className="h-[45px] md:h-[60px] w-auto object-contain"
                />
                <div
                  className="text-[#c6c2b4]"
                  style={{
                    fontFamily: 'Futura, Poppins',
                    fontWeight: 600,
                    fontSize: 'clamp(13px, 1.4vw, 19px)',
                    letterSpacing: '0.12em',
                  }}
                >
                  FUTBOLITIS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-24 mix-blend-plus-lighter pointer-events-none">
          <img
            src={imgLayer6}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Thursday Dinner Booking */}
      <section className="fade-section relative flex flex-col md:flex-row min-h-screen">

        {/* Left — full-bleed photo */}
        <div className="relative md:w-1/2 min-h-[50vh] md:min-h-screen overflow-hidden">
          <img
            src={dinnerImage}
            alt="Thursday Dinner at POD"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ transform: 'scale(1.04)', transition: 'transform 8s ease' }}
          />
          {/* Dark gradient from bottom */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0D0D0D 0%, rgba(13,13,13,0.3) 50%, transparent 100%)' }} />
          {/* Dark gradient from right edge (blends into right panel) */}
          <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(to right, transparent 60%, #0D0D0D 100%)' }} />

          {/* Editorial line over photo */}
          <div className="absolute bottom-0 left-0 p-10 md:p-14">
            <div style={{ fontFamily: 'Poppins', fontSize: '9px', fontWeight: 600, letterSpacing: '4px', color: 'rgba(239,239,224,0.5)', marginBottom: '12px' }}>
              EVERY THURSDAY
            </div>
            <div style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', color: '#EFEFE0', lineHeight: 1.15 }}>
              A table where<br />art meets appetite.
            </div>
          </div>
        </div>

        {/* Right — menu & CTA */}
        <div
          className="md:w-1/2 flex flex-col justify-center px-10 md:px-16 py-16 md:py-24"
          style={{ background: '#0D0D0D' }}
        >
          <div className="max-w-[480px]">

            {/* Label */}
            <div style={{ fontFamily: 'Poppins', fontSize: '9px', fontWeight: 600, letterSpacing: '4px', color: 'rgba(239,239,224,0.4)', marginBottom: '20px' }}>
              WEEKLY GATHERING · CONDESA
            </div>

            {/* Title */}
            <h2 style={{ fontFamily: 'Playfair Display', fontWeight: 900, fontSize: 'clamp(36px, 4vw, 60px)', color: '#EFEFE0', lineHeight: 1.05, marginBottom: '8px' }}>
              Thursday<br />Dinners
            </h2>
            <div style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '13px', color: 'rgba(239,239,224,0.45)', marginBottom: '32px' }}>
              June 5 · 8:00 PM · Nuevo León 108
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(239,239,224,0.2), transparent)', marginBottom: '28px' }} />

            {/* Chef + Experience tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
              {[
                { icon: '◎', label: 'Chef Andrés Kerbel Laiter' },
                { icon: '♩', label: 'Live performance & DJ' },
                { icon: '◈', label: 'Mezcal Amaraz' },
              ].map(({ icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 12px', border: '1px solid rgba(239,239,224,0.12)', background: 'rgba(239,239,224,0.04)' }}>
                  <span style={{ fontSize: '10px', color: 'rgba(239,239,224,0.4)' }}>{icon}</span>
                  <span style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '9px', letterSpacing: '1px', color: 'rgba(239,239,224,0.6)' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <p style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '14px', lineHeight: 1.9, color: 'rgba(239,239,224,0.65)', marginBottom: '36px' }}>
              An intimate gathering of 36 guests inside the gallery. Four courses, four wines — each one chosen to extend the conversation already happening on the walls. The night ends with a live performance and DJ set.
            </p>

            {/* Menu courses */}
            <div style={{ marginBottom: '36px' }}>
              <div style={{ fontFamily: 'Poppins', fontSize: '8px', fontWeight: 600, letterSpacing: '3px', color: 'rgba(239,239,224,0.3)', marginBottom: '16px' }}>
                THE MENU · · ·
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {[
                  { dish: 'Listones del Huerto', desc: 'Labneh · garbanzo al za\'atar · pepino · vinagreta de hierbas', wine: 'Verdejo · Vinho Verde' },
                  { dish: 'Cous Cous Cremoso', desc: 'Feta · kalamata · jitomate deshidratado · alcachofa', wine: 'Falanghina · Sauv Blanc de BDX' },
                  { dish: 'Pesca Levantina', desc: 'Pescado al sumac · tahini tibio · broccolini al harissa', wine: 'Assyrtiko · Riesling Alemán Seco' },
                  { dish: 'Sesame Cheesecake', desc: 'Crust de ajonjolí · melaza de granada · frutos secos', wine: 'Donnafugata Ben Ryé · Vin Santo' },
                ].map(({ dish, desc, wine }) => (
                  <div key={dish} style={{ display: 'flex', gap: '16px', paddingBottom: '18px', borderBottom: '1px solid rgba(239,239,224,0.06)' }}>
                    <div style={{ width: '4px', minWidth: '4px', height: '4px', borderRadius: '50%', background: 'rgba(239,239,224,0.3)', marginTop: '7px' }} />
                    <div>
                      <div style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '16px', color: '#EFEFE0', lineHeight: 1.2, marginBottom: '4px' }}>
                        {dish}
                      </div>
                      <div style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '11px', color: 'rgba(239,239,224,0.45)', marginBottom: '4px', lineHeight: 1.5 }}>
                        {desc}
                      </div>
                      <div style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '9px', letterSpacing: '1.5px', color: 'rgba(239,239,224,0.3)' }}>
                        {wine}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price + scarcity */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px' }}>
              <div>
                <div style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '42px', color: '#EFEFE0', lineHeight: 1 }}>
                  MX$1,500
                </div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '11px', color: 'rgba(239,239,224,0.4)', marginTop: '4px' }}>
                  por persona · maridaje incluido
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '11px', color: '#EFEFE0' }}>
                  36 seats
                </div>
                <div style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '10px', color: 'rgba(239,239,224,0.35)', marginTop: '2px' }}>
                  limited availability
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => setBookingOpen(true)}
              className="w-full py-5 tracking-[4px] hover:opacity-90 active:scale-[0.99] transition-all duration-200"
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '11px', background: '#EFEFE0', color: '#0D0D0D', border: 'none', cursor: 'pointer' }}
            >
              RESERVE YOUR TABLE
            </button>

            <div style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '10px', color: 'rgba(239,239,224,0.25)', textAlign: 'center', marginTop: '14px' }}>
              Reservación confirmada al pagar · Mezcal Amaraz incluido
            </div>
          </div>
        </div>
      </section>

      {bookingOpen && <BookingFlow onClose={() => setBookingOpen(false)} />}

      {/* Footer */}
      <footer id="contact" className="bg-[#1A1A1A] py-20 px-[80px] md:px-[80px] px-5">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-20 mb-20">
            <div>
              <div
                className="text-[#CDCDB9] mb-2"
                style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '12px', lineHeight: '1.8' }}
              >
                Nuevo León 108
                <br />
                Condesa, CDMX
              </div>
            </div>

            <div className="md:text-right">
              <div
                className="text-[#CDCDB9] mb-2"
                style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '12px' }}
              >
                @podcondesa
              </div>
              <div
                className="text-[#CDCDB9]"
                style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '12px' }}
              >
                hola@podcondesa.com
              </div>
            </div>
          </div>

          <div className="text-center">
            <div
              className="text-[#CDCDB9] opacity-40"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '9px' }}
            >
              © 2025 POD ART HOUSE
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
