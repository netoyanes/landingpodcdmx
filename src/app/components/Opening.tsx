export default function Opening() {
  return (
    <section className="bg-[#EFEFE0] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div
          className="text-[#4A4233] mb-12 uppercase tracking-[0.25em] text-center"
          style={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '10px' }}
        >
          (004) THE OPENING
        </div>

        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-8 mb-12">
            <div
              className="text-[#111111] leading-[0.8] tracking-[-0.02em]"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 800,
                fontSize: 'clamp(100px, 20vw, 200px)',
              }}
            >
              MAY
            </div>

            <svg
              width="80"
              height="80"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                d="M10 50 Q 30 20, 50 50 T 90 50"
                stroke="#4A4233"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            <div
              className="text-[#111111] leading-[0.8] tracking-[-0.02em]"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 800,
                fontSize: 'clamp(100px, 20vw, 200px)',
              }}
            >
              22
            </div>
          </div>

          <div
            className="text-[#4A4233] mb-2"
            style={{
              fontFamily: 'Caveat',
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 40px)',
              transform: 'rotate(-2deg)',
            }}
          >
            friends & family
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="border border-[#111111] p-8">
            <div
              className="mb-3"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: '24px',
                color: '#111111',
              }}
            >
              8 PM — First Floor
            </div>
            <div
              className="text-[#4A4233]"
              style={{
                fontFamily: 'Caveat',
                fontWeight: 700,
                fontSize: '24px',
                transform: 'rotate(-1deg)',
              }}
            >
              Art & Wine pre-launch
            </div>
          </div>

          <div className="bg-[#0A0A0A] p-8">
            <div
              className="mb-3"
              style={{
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: '24px',
                color: '#EFEFE0',
              }}
            >
              11 PM — Rooftop
            </div>
            <div
              className="text-[#4A4233]"
              style={{
                fontFamily: 'Caveat',
                fontWeight: 700,
                fontSize: '24px',
                transform: 'rotate(-1deg)',
              }}
            >
              HOG party
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            className="px-12 py-4 border-2 border-[#111111] text-[#111111] transition-all duration-200 hover:bg-[#4A4233] hover:border-[#4A4233] hover:text-[#EFEFE0]"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '16px',
              borderRadius: '50px',
            }}
          >
            RSVP →
          </button>

          <div
            className="text-[#111111]/60 uppercase tracking-[0.25em]"
            style={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '10px',
            }}
          >
            Friends & Family · By Invitation
          </div>
        </div>
      </div>
    </section>
  );
}
