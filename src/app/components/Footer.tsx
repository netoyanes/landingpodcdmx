import { useState } from 'react';
import WavePattern from './WavePattern';
import PodLogo from './PodLogo';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-[#EFEFE0] relative pt-24 pb-8">
      <WavePattern className="w-full h-32 top-0 left-0" variant="footer" strokeWidth={40} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="mb-4">
              <PodLogo color="#4A4233" size={60} />
            </div>

            <div
              className="text-[#111111] mb-4"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 800,
                fontSize: '32px',
                letterSpacing: '-0.02em',
              }}
            >
              pod
            </div>

            <p
              className="text-[#111111] max-w-xs"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '1.6',
              }}
            >
              A space where contemporary art, wellness, and creativity converge in the heart of
              Condesa.
            </p>
          </div>

          <div>
            <div
              className="text-[#111111] mb-6 uppercase tracking-[0.25em]"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: '10px',
              }}
            >
              Quick Links
            </div>

            <ul className="space-y-3">
              {['Visit', 'Artists', 'Events', 'Press', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-[#111111] hover:text-[#4A4233] transition-colors duration-200"
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 500,
                      fontSize: '16px',
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div
              className="text-[#111111] mb-6 uppercase tracking-[0.25em]"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: '10px',
              }}
            >
              Newsletter
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your email"
                className="w-full bg-transparent border-b-2 border-[#111111] pb-3 pr-12 text-[#111111] placeholder-[#111111]/40 focus:outline-none focus:border-[#4A4233] transition-colors duration-200"
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontSize: '16px',
                }}
                required
              />
              <button
                type="submit"
                className="absolute right-0 bottom-3 text-[#4A4233] hover:scale-110 transition-transform duration-200"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#111111]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div
            className="text-[#111111] uppercase tracking-[0.25em]"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '10px',
            }}
          >
            © POD CONDESA 2025
          </div>

          <div className="flex gap-6">
            {['Instagram', 'Twitter', 'Email'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[#111111] hover:text-[#4A4233] transition-colors duration-200 uppercase tracking-[0.25em]"
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: '10px',
                }}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
