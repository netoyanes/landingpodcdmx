import PodLogo from './PodLogo';

export default function FindUs() {
  const hours = [
    { day: 'MON — FRI', time: '8:00 AM — 10:00 PM' },
    { day: 'SAT', time: '9:00 AM — 11:00 PM' },
    { day: 'SUN', time: '9:00 AM — 8:00 PM' },
  ];

  return (
    <section className="bg-[#EFEFE0] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div
          className="text-[#4A4233] mb-12 uppercase tracking-[0.25em]"
          style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '10px' }}
        >
          (006) FIND US
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div>
            <div
              className="text-[#111111] leading-[1.1] mb-6"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: 'clamp(32px, 5vw, 56px)',
                letterSpacing: '-0.01em',
              }}
            >
              NUEVO LEÓN 108<br />
              CONDESA<br />
              CIUDAD DE MÉXICO
            </div>

            <div
              className="text-[#4A4233] mb-12"
              style={{
                fontFamily: 'Caveat',
                fontWeight: 700,
                fontSize: '40px',
                transform: 'rotate(-3deg)',
              }}
            >
              come find us.
            </div>

            <div className="space-y-4">
              {hours.map((item, index) => (
                <div key={index} className="flex justify-between border-b border-[#111111]/20 pb-3">
                  <div
                    className="uppercase tracking-[0.25em]"
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      fontSize: '10px',
                      color: '#111111',
                    }}
                  >
                    {item.day}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Poppins',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#111111',
                    }}
                  >
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="aspect-square md:aspect-[4/3] bg-gradient-to-br from-[#111111] to-[#0A0A0A] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <PodLogo color="#4A4233" size={80} />
            </div>

            <div
              className="absolute bottom-4 left-4 text-[#EFEFE0] uppercase tracking-[0.25em]"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: '10px',
              }}
            >
              NUEVO LEÓN 108, CONDESA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
