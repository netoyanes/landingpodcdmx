import { useEffect, useRef } from 'react';

interface WavePatternProps {
  className?: string;
  strokeWidth?: number;
  variant?: 'hero' | 'footer';
}

export default function WavePattern({ className = '', strokeWidth = 60, variant = 'hero' }: WavePatternProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${pathLength}`;
      pathRef.current.style.strokeDashoffset = `${pathLength}`;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              pathRef.current!.style.strokeDashoffset = '0';
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(pathRef.current);

      return () => observer.disconnect();
    }
  }, []);

  const paths = {
    hero: 'M-50 100 Q 200 0, 450 100 T 950 100 T 1450 100',
    footer: 'M-50 50 Q 150 100, 350 50 T 750 50 T 1250 50 T 1750 50',
  };

  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      viewBox="0 0 1400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d={paths[variant]}
        stroke="#4A4233"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{
          transition: 'stroke-dashoffset 1.2s ease-out',
        }}
      />
    </svg>
  );
}
