import { useEffect, useRef } from 'react';
import PodLogo from './PodLogo';

export default function TheBrand() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (headlineRef.current) {
      observer.observe(headlineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes reveal {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-reveal {
            animation: reveal 0.8s ease-out forwards;
          }
        `}
      </style>
      <section className="bg-[#EFEFE0] py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div
            className="text-[#4A4233] mb-8 uppercase tracking-[0.25em]"
            style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '10px' }}
          >
            (001) THE BRAND
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-10">
              <h2
                ref={headlineRef}
                className="text-[#111111] leading-[1.1] tracking-[-0.02em] mb-8 opacity-0"
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 800,
                  fontSize: 'clamp(48px, 8vw, 120px)',
                }}
              >
                A space where art, wellness and creativity converge.
              </h2>

              <p
                className="text-[#111111] max-w-[480px] leading-relaxed"
                style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '18px' }}
              >
                POD evolves into a multidisciplinary space where contemporary art, wellness, and
                creativity meet. A gallery, a creative coworking hub, and a wellness meeting point —
                inside a community in constant motion.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-[#0A0A0A] rounded-sm overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:rotate-1"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <PodLogo color="#EFEFE0" size={80} className="opacity-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
