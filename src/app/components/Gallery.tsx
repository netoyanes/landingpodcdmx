import { useState } from 'react';
import Masonry from 'react-responsive-masonry';
import PodLogo from './PodLogo';

const images = [
  { type: 'image', aspectRatio: '3/4' },
  { type: 'image', aspectRatio: '4/3' },
  { type: 'text', text: 'new place.\nfor everyone.' },
  { type: 'image', aspectRatio: '1/1' },
  { type: 'image', aspectRatio: '3/4' },
  { type: 'image', aspectRatio: '16/9' },
  { type: 'image', aspectRatio: '4/3' },
  { type: 'image', aspectRatio: '3/4' },
  { type: 'image', aspectRatio: '1/1' },
];

export default function Gallery() {
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);

  return (
    <>
      <section className="bg-[#EFEFE0] py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-[#4A4233] mb-12 uppercase tracking-[0.25em]"
            style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '10px' }}
          >
            (005) THE SPACE
          </div>

          <Masonry columnsCount={3} gutter="24px">
            {images.map((item, index) => (
              <div
                key={index}
                className={`overflow-hidden ${item.type === 'image' ? 'cursor-pointer' : ''}`}
                onClick={() => item.type === 'image' && setLightboxImage(index)}
              >
                {item.type === 'image' ? (
                  <div
                    className="bg-gradient-to-br from-[#0A0A0A] to-[#111111] flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
                    style={{
                      aspectRatio: item.aspectRatio,
                      transform: `rotate(${Math.random() * 2 - 1}deg)`,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                    <PodLogo color="#EFEFE0" size={60} className="opacity-20" />
                  </div>
                ) : (
                  <div
                    className="bg-[#4A4233] p-12 flex items-center justify-center aspect-square"
                    style={{
                      transform: `rotate(${Math.random() * 2 - 1}deg)`,
                    }}
                  >
                    <div className="text-center">
                      {item.text?.split('\n').map((line, i) => (
                        <div key={i}>
                          {i === 0 ? (
                            <div
                              className="text-[#EFEFE0]"
                              style={{
                                fontFamily: 'Caveat',
                                fontWeight: 700,
                                fontSize: '48px',
                              }}
                            >
                              {line}
                            </div>
                          ) : (
                            <div
                              className="text-[#EFEFE0]"
                              style={{
                                fontFamily: 'Poppins',
                                fontWeight: 800,
                                fontSize: '56px',
                                letterSpacing: '-0.02em',
                              }}
                            >
                              {line}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Masonry>
        </div>
      </section>

      {lightboxImage !== null && (
        <div
          className="fixed inset-0 bg-[#EFEFE0] z-50 flex items-center justify-center p-12"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-[#111111] hover:text-[#4A4233]"
            onClick={() => setLightboxImage(null)}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="max-w-4xl max-h-full">
            <div
              className="bg-gradient-to-br from-[#0A0A0A] to-[#111111] flex items-center justify-center"
              style={{
                aspectRatio: images[lightboxImage]?.aspectRatio || '1/1',
                maxHeight: '80vh',
              }}
            >
              <PodLogo color="#EFEFE0" size={120} className="opacity-30" />
            </div>
            <div
              className="text-[#111111] text-center mt-6 uppercase tracking-[0.25em]"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: '10px',
              }}
            >
              POD Condesa · Image {lightboxImage + 1}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
