import { useState } from 'react';
import PodLogo from './PodLogo';

const artists = [
  {
    name: 'Antonia Markakis',
    role: 'Visual Artist',
    bio: 'Contemporary artist exploring the intersection of light, space, and emotion through mixed media installations.',
  },
  {
    name: 'Severin Hallauer',
    role: 'Sculptor',
    bio: 'Creating immersive sculptural experiences that challenge perception and invite contemplation.',
  },
  {
    name: 'Eve',
    role: 'Multimedia Artist',
    bio: 'Bridging digital and physical realms through interactive installations and experimental video art.',
  },
  {
    name: 'Ewa Zawieja',
    role: 'Painter',
    bio: 'Exploring themes of identity and belonging through bold, expressive paintings and murals.',
  },
  {
    name: 'Miqui',
    role: 'Photographer',
    bio: 'Capturing the essence of urban life and human connection through documentary photography.',
  },
];

export default function ResidentArtists() {
  const [selectedArtist, setSelectedArtist] = useState<number | null>(null);

  return (
    <>
      <section className="bg-[#4A4233] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-[#EFEFE0] mb-4"
            style={{
              fontFamily: 'Caveat',
              fontWeight: 700,
              fontSize: 'clamp(40px, 6vw, 72px)',
              transform: 'rotate(-3deg)',
            }}
          >
            meet the
          </div>

          <h2
            className="text-[#EFEFE0] leading-[0.9] tracking-[-0.02em] mb-16"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 800,
              fontSize: 'clamp(80px, 12vw, 160px)',
            }}
          >
            RESIDENT ARTISTS.
          </h2>

          <div className="overflow-x-auto -mx-6 px-6 pb-6">
            <div className="flex gap-6 min-w-max md:justify-start">
              {artists.map((artist, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[280px] cursor-pointer group"
                  onClick={() => setSelectedArtist(index)}
                >
                  <div className="aspect-[3/4] bg-[#EFEFE0] mb-4 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] to-[#111111] group-hover:scale-105 transition-transform duration-300">
                      <PodLogo color="#EFEFE0" size={60} className="opacity-30" />
                    </div>
                  </div>

                  <h3
                    className="text-[#EFEFE0] mb-1"
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 700,
                      fontSize: '24px',
                    }}
                  >
                    {artist.name}
                  </h3>

                  <div
                    className="text-[#EFEFE0]/70 uppercase tracking-[0.25em]"
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      fontSize: '10px',
                    }}
                  >
                    {artist.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedArtist !== null && (
        <div
          className="fixed inset-0 bg-[#0A0A0A]/90 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedArtist(null)}
        >
          <div
            className="bg-[#EFEFE0] max-w-2xl w-full p-8 md:p-12 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-[#111111] hover:text-[#4A4233]"
              onClick={() => setSelectedArtist(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h3
              className="text-[#111111] mb-2"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: '36px',
              }}
            >
              {artists[selectedArtist].name}
            </h3>

            <div
              className="text-[#4A4233] uppercase tracking-[0.25em] mb-6"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: '10px',
              }}
            >
              {artists[selectedArtist].role}
            </div>

            <p
              className="text-[#111111] leading-relaxed mb-8"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '16px',
              }}
            >
              {artists[selectedArtist].bio}
            </p>

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-[#111111]/10" />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
