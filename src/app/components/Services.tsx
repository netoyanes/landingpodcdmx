import { useState } from 'react';

const services = [
  {
    number: '001',
    title: 'Art Gallery',
    description: 'Rotating exhibitions from resident and guest artists.',
    accent: 'curated space',
  },
  {
    number: '002',
    title: 'Coworking',
    description: 'A creative workspace for thinkers, makers, and visitors.',
    accent: 'work together',
  },
  {
    number: '003',
    title: 'Coffee Bar',
    description: 'Specialty coffee and slow mornings.',
    accent: 'slow down',
  },
  {
    number: '004',
    title: 'Rooftop',
    description: 'Sunset views, music, and gatherings above Condesa.',
    accent: 'see the city',
  },
  {
    number: '005',
    title: 'Wellness',
    description: 'Breathwork, sound healing, and somatic experiences.',
    accent: 'find center',
  },
  {
    number: '006',
    title: 'Events',
    description: 'Friends & family openings, talks, and resident artist nights.',
    accent: 'come together',
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#EFEFE0] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div
          className="text-[#4A4233] mb-12 uppercase tracking-[0.25em]"
          style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '10px' }}
        >
          (002) WHAT YOU'LL FIND
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.number}
              className="relative border transition-all duration-200 p-8 cursor-pointer"
              style={{
                borderColor: hoveredIndex === index ? '#4A4233' : '#111111',
                backgroundColor: hoveredIndex === index ? '#4A4233' : '#EFEFE0',
                color: hoveredIndex === index ? '#EFEFE0' : '#111111',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="absolute top-4 right-4 tracking-[0.25em]"
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: '10px',
                  color: hoveredIndex === index ? '#EFEFE0' : '#4A4233',
                }}
              >
                ({service.number})
              </div>

              <h3
                className="mb-3"
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 700,
                  fontSize: '32px',
                  letterSpacing: '-0.01em',
                }}
              >
                {service.title}
              </h3>

              <div
                className="mb-4"
                style={{
                  fontFamily: 'Caveat',
                  fontWeight: 700,
                  fontSize: '20px',
                  transform: 'rotate(-2deg)',
                  color: hoveredIndex === index ? '#EFEFE0' : '#4A4233',
                }}
              >
                {service.accent}
              </div>

              <p
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '1.6',
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
