const PAINS = [
  {
    num: '01',
    tag: 'After-hours charting',
    title: 'Notes that follow you home.',
    body: 'Doctors lose a third to half of every day to records. With Salvia, you speak a short note in any Indian language — Hindi, Malayalam, Tamil — pick your forms, and the draft is already filled in before you sit down to review.',
    stat: '½ day',
    statSub: 'lost to paperwork by the average Indian doctor',
    accent: 'var(--salvia-accent)',
  },
  {
    num: '02',
    tag: 'Policy drift',
    title: 'Policies live in a PDF nobody reads.',
    body: 'NABH, Clinical Establishments Act, DPDP, ABDM — your team can\'t memorise every clause. Salvia links your rulebook directly to each form field and flags gaps before a note is ever signed.',
    stat: '~95%',
    statSub: 'of India\'s ~6 lakh facilities are not NABH-accredited',
    accent: '#0F172A',
  },
  {
    num: '03',
    tag: 'Undefendable records',
    title: "If it wasn't documented, it didn't happen.",
    body: "A NABH assessor or CGHS audit can mean weeks of scrambling — drug register, consent and incidents still live in paper books. Salvia keeps a hashed, timestamped trail: every field traceable back to the original audio.",
    stat: '100%',
    statSub: 'of Salvia records are audit-locked with full edit history',
    accent: '#059669',
  },
];

export const PainSection = () => (
  <section style={{
    padding: '6rem 0',
    position: 'relative',
    zIndex: 10,
    backgroundColor: 'transparent',
  }}>
    <style>{`
      @media (max-width: 768px) {
        .pain-stat-block { 
          align-items: flex-start !important; 
          text-align: left !important; 
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 1rem;
        }
      }
    `}</style>
    <div className="container" style={{ maxWidth: '1200px' }}>

      {/* Section label */}
      <div style={{ marginBottom: '3.5rem' }}>
        <span style={{
          fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--salvia-accent)',
        }}>
          The Problem
        </span>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.05,
          color: 'var(--salvia-primary)', marginTop: '0.5rem',
          maxWidth: '560px',
        }}>
          Documentation is breaking your team.
        </h2>
      </div>

      {/* Editorial pain rows */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {PAINS.map((p, i) => (
          <div
            key={p.num}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 1fr',
              gap: '0',
              borderTop: i === 0 ? '2px solid var(--salvia-primary)' : '1px solid rgba(0,0,0,0.08)',
              paddingTop: '2rem',
              paddingBottom: '2.5rem',
              alignItems: 'start',
            }}
            className="mobile-stack"
          >
            {/* Number */}
            <div style={{
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em',
              color: 'rgba(0,0,0,0.25)', paddingTop: '0.15rem',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {p.num}
            </div>

            {/* Left — title + body */}
            <div style={{ paddingRight: '3rem' }}>
              <div style={{
                display: 'inline-block',
                fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: p.accent,
                marginBottom: '0.7rem',
                borderBottom: `2px solid ${p.accent}`,
                paddingBottom: '0.1rem',
              }}>
                {p.tag}
              </div>
              <h3 style={{
                fontSize: '1.25rem', fontWeight: 600,
                letterSpacing: '-0.03em', lineHeight: 1.2,
                color: 'var(--salvia-primary)', marginBottom: '0.85rem',
              }}>
                {p.title}
              </h3>
              <p style={{
                fontSize: '0.88rem', color: 'var(--salvia-text-muted)',
                lineHeight: 1.7, maxWidth: '420px',
              }}>
                {p.body}
              </p>
            </div>

            {/* Right — dominant stat */}
            <div
              style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'flex-end', textAlign: 'right',
              }}
              className="pain-stat-block"
            >
              <div style={{
                fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1,
                color: p.accent,
              }}>
                {p.stat}
              </div>
              <div style={{
                fontSize: '0.75rem', color: 'var(--salvia-text-muted)',
                lineHeight: 1.45, maxWidth: '200px', marginTop: '0.5rem',
              }}>
                {p.statSub}
              </div>
            </div>
          </div>
        ))}
        {/* Bottom rule */}
        <div style={{ height: '2px', backgroundColor: 'var(--salvia-primary)', width: '100%' }} />
      </div>
    </div>
  </section>
);
