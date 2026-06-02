import WavePattern from './WavePattern';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = () => {
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.animation = 'bounce 2s infinite';
      }
    };
    animate();
  }, []);

  return (
    <section className="relative min-h-screen bg-[#EFEFE0] flex flex-col">
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(10px); }
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-container:hover .marquee-content {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="flex justify-between items-start p-6 md:p-8">
        <div
          className="uppercase tracking-[0.25em]"
          style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '10px' }}
        >
          POD · CONDESA
        </div>
        <div
          className="uppercase tracking-[0.25em] text-right"
          style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '10px' }}
        >
          EST · 2025 — CDMX
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative px-6">
        <WavePattern className="w-full h-full top-0 left-0 opacity-90" strokeWidth={80} />

        <div className="relative z-10 text-center">
          <h1
            className="text-[#111111] leading-[0.85] tracking-[-0.02em]"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 800,
              fontSize: 'clamp(120px, 18vw, 280px)'
            }}
          >
            pod.
          </h1>
          <div
            className="mt-4 text-[#4A4233]"
            style={{
              fontFamily: 'Caveat',
              fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 56px)',
              transform: 'rotate(-2deg)',
            }}
          >
            a new place for creativity
          </div>
        </div>
      </div>

      <div className="marquee-container overflow-hidden py-6 border-t border-[#111111]">
        <div
          className="marquee-content flex whitespace-nowrap"
          style={{ animation: 'marquee 30s linear infinite' }}
        >
          <span className="inline-block px-8" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
            art gallery · coworking · coffee · music · rooftop · community · friends · family · creativity ·
          </span>
          <span className="inline-block px-8" style={{ fontFamily: 'Poppins', fontWeight: 500 }}>
            art gallery · coworking · coffee · music · rooftop · community · friends · family · creativity ·
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2">
        <div
          className="text-[10px] uppercase tracking-[0.25em]"
          style={{ fontFamily: 'Poppins', fontWeight: 600 }}
        >
          scroll
        </div>
        <div ref={scrollIndicatorRef} className="w-[1px] h-12 bg-[#111111]" />
      </div>
    </section>
  );
}
