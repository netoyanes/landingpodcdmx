import { useEffect, useState } from 'react';
import PodLogo from './components/PodLogo';
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
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    guests: '2',
    phone: '',
  });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('submitting');

    // TODO: This will connect to Supabase once configured
    // For now, just simulate a submission
    setTimeout(() => {
      console.log('Booking submitted:', bookingForm);
      setBookingStatus('success');
      setTimeout(() => {
        setBookingStatus('idle');
        setBookingForm({ name: '', email: '', guests: '2', phone: '' });
      }, 3000);
    }, 1000);
  };

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
        <div className="max-w-[1440px] mx-auto px-[80px] py-6 flex items-center justify-between">
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

          <div className="hidden md:flex gap-8">
            {['EXHIBITIONS', 'EVENTS', 'SPACE', 'CONTACT'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[#EFEFE0] tracking-[3px] hover:opacity-60 transition-opacity duration-200"
                style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '11px' }}
              >
                {link}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-[#EFEFE0]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-[#0D0D0D] flex flex-col items-center justify-center z-40">
            <button
              className="absolute top-6 right-6 text-[#EFEFE0]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="flex flex-col gap-12 text-center">
              {['EXHIBITIONS', 'EVENTS', 'SPACE', 'CONTACT'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-[#EFEFE0]"
                  style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontWeight: 400, fontSize: '32px' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="min-h-screen relative flex items-end pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 via-transparent to-transparent" />

        <div className="relative z-10 w-full px-[80px] md:px-[80px] px-5 pb-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-[700px]">
              <div
                className="text-[#EFEFE0] tracking-[3px] mb-6"
                style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '11px' }}
              >
                FRIENDS & FAMILY
              </div>

              <h1
                className="text-[#EFEFE0] leading-[1.2] mb-8"
                style={{
                  fontFamily: 'Playfair Display',
                  fontWeight: 900,
                  fontSize: 'clamp(32px, 5vw, 56px)',
                }}
              >
                Opening Night · Art House · May 22, 2026
              </h1>

              <div className="h-[1px] bg-[#EFEFE0] w-[60px] mb-8" />

              <p
                className="text-[#EFEFE0] leading-[1.8] mb-12"
                style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '14px' }}
              >
                An inaugural gathering of artists, performers and collaborators. The evening opened with SOMA EP.01 — ÆTHER, a live sound and movement performance featuring Masha Zdrok, Julia Skyresident, Hemmer and Franchesca Amore. Works by Antonia Markakis (GR), Alexandra Roca (ES), Evgenia Berestneva (RU), Ewa Zawieja (PL), Miqui (MX) and Severin Hallauer (CH) lined the gallery walls. The night closed with Audaks on the rooftop. Mezcal Amaraz accompanied the experience.
              </p>

              <a
                href="https://airtable.com/appAotfQn6AhgeUko/pagGD51WT6du5zbSo/form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-[#EFEFE0] text-[#EFEFE0] px-8 py-[14px] tracking-[3px] hover:bg-[#EFEFE0] hover:text-[#0D0D0D] transition-all duration-200"
                style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '11px' }}
              >
                RSVP
              </a>
            </div>
          </div>
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
          <div className="absolute inset-0 flex flex-col justify-center py-[5%] text-center">
            <div className="w-full">
              {/* Main Title */}
              <h1
                className="text-[#c6c2b4] mb-6 max-md:mb-3 px-[3%] md:px-[4%]"
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
              <div className="flex justify-between items-center mb-8 max-md:flex-col max-md:gap-2 max-md:mb-4 px-[5%] md:px-[8%]">
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
                className="text-[#c6c2b4] mb-6 max-md:mb-4 max-w-[900px] mx-auto px-[5%] md:px-[8%]"
                style={{
                  fontFamily: 'Poppins',
                  fontSize: 'clamp(12px, 1.5vw, 20px)',
                  lineHeight: '1.4',
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
              <div className="flex justify-center items-center gap-4 md:gap-6 max-md:flex-wrap px-[5%] md:px-[8%]">
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
      <section className="fade-section relative min-h-screen flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${dinnerImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/70 via-[#0D0D0D]/40 to-transparent" />

        <div className="relative z-10 w-full px-[80px] md:px-[80px] px-5 pb-20 pt-24">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-end">
              {/* Left side - Info */}
              <div className="max-w-[600px]">
                <div
                  className="text-[#EFEFE0] tracking-[3px] mb-6"
                  style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '11px' }}
                >
                  WEEKLY GATHERING
                </div>

                <h1
                  className="text-[#EFEFE0] leading-[1.2] mb-8"
                  style={{
                    fontFamily: 'Playfair Display',
                    fontWeight: 900,
                    fontSize: 'clamp(32px, 5vw, 56px)',
                  }}
                >
                  Thursday Dinners
                </h1>

                <div className="h-[1px] bg-[#EFEFE0] w-[60px] mb-8" />

                <p
                  className="text-[#EFEFE0] leading-[1.8]"
                  style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '14px' }}
                >
                  Join us every Thursday evening for an intimate dinner experience. A carefully curated menu paired with art, conversation, and mezcal. Limited to 20 guests per evening.
                </p>
              </div>

              {/* Right side - Booking Form */}
              <div className="bg-[#0D0D0D]/60 backdrop-blur-sm border border-[#EFEFE0]/20 p-8 max-w-[500px] md:ml-auto">
                <h3
                  className="text-[#EFEFE0] mb-6"
                  style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px', letterSpacing: '2px' }}
                >
                  RESERVE YOUR TABLE
                </h3>

                {bookingStatus === 'success' ? (
                  <div className="text-[#EFEFE0] py-8 text-center">
                    <div className="mb-4 text-2xl">✓</div>
                    <p style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px' }}>
                      Reservation confirmed! We'll send you details shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[#EFEFE0] mb-2"
                        style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '11px', letterSpacing: '1px' }}
                      >
                        NAME
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        className="w-full bg-transparent border border-[#EFEFE0]/30 text-[#EFEFE0] px-4 py-3 focus:outline-none focus:border-[#EFEFE0]"
                        style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '14px' }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[#EFEFE0] mb-2"
                        style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '11px', letterSpacing: '1px' }}
                      >
                        EMAIL
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        className="w-full bg-transparent border border-[#EFEFE0]/30 text-[#EFEFE0] px-4 py-3 focus:outline-none focus:border-[#EFEFE0]"
                        style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '14px' }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-[#EFEFE0] mb-2"
                        style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '11px', letterSpacing: '1px' }}
                      >
                        PHONE
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        className="w-full bg-transparent border border-[#EFEFE0]/30 text-[#EFEFE0] px-4 py-3 focus:outline-none focus:border-[#EFEFE0]"
                        style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '14px' }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="guests"
                        className="block text-[#EFEFE0] mb-2"
                        style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '11px', letterSpacing: '1px' }}
                      >
                        NUMBER OF GUESTS
                      </label>
                      <select
                        id="guests"
                        value={bookingForm.guests}
                        onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })}
                        className="w-full bg-[#0D0D0D] border border-[#EFEFE0]/30 text-[#EFEFE0] px-4 py-3 focus:outline-none focus:border-[#EFEFE0]"
                        style={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '14px' }}
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={bookingStatus === 'submitting'}
                      className="w-full bg-[#EFEFE0] text-[#0D0D0D] px-8 py-4 tracking-[3px] hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
                      style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '11px' }}
                    >
                      {bookingStatus === 'submitting' ? 'SUBMITTING...' : 'RESERVE NOW'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

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
