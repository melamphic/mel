import React from 'react';

const CONTENTS = [
  { label: 'Signed clinical note', sub: 'PDF · versioned · hashed', icon: 'doc' },
  { label: 'Original audio', sub: 'Encrypted · immutable', icon: 'audio' },
  { label: 'Full transcript', sub: 'With per-word confidence', icon: 'txt' },
  { label: 'Evidence trace', sub: 'Every field → source line', icon: 'link' },
  { label: 'Policy report', sub: 'Clause-by-clause satisfaction', icon: 'shield' },
  { label: 'Edit history', sub: 'Who, what, when, why', icon: 'history' },
  { label: 'Form snapshot', sub: 'Version at time of sign-off', icon: 'form' },
  { label: 'Policy snapshot', sub: 'Version at time of sign-off', icon: 'gov' },
];

const ICONS: Record<string, React.ReactNode> = {
  doc: <><rect x="3" y="4" width="14" height="18" rx="2" /><line x1="7" y1="9" x2="13" y2="9" /><line x1="7" y1="13" x2="13" y2="13" /><line x1="7" y1="17" x2="11" y2="17" /></>,
  audio: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
  txt: <><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="14" y2="18" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></>,
  history: <><path d="M3 3v5h5" /><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" /><polyline points="12 7 12 12 16 14" /></>,
  form: <><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="8" y1="9" x2="16" y2="9" /><line x1="8" y1="13" x2="12" y2="13" /></>,
  gov: <><path d="M3 21h18" /><path d="M5 21V10l7-5 7 5v11" /><path d="M9 21v-6h6v6" /></>,
};

export const AuditPack: React.FC = () => (
  <section style={{
    padding: '6rem 0',
    backgroundColor: 'var(--salvia-bg)',
    position: 'relative',
    zIndex: 10,
  }}>
    <div className="container" style={{ maxWidth: '1200px' }}>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.3fr',
        gap: '4rem',
        alignItems: 'center',
      }} className="mobile-stack">

        {/* Left: copy */}
        <div>
          <span style={{
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--salvia-accent)',
          }}>
            Named artifact
          </span>
          <h2 style={{
            fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
            fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1,
            color: 'var(--salvia-primary)',
            marginTop: '0.7rem',
            marginBottom: '1.25rem',
          }}>
            The Audit Pack.
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--salvia-text-muted)',
            lineHeight: 1.65,
            marginBottom: '1.5rem',
          }}>
            When an auditor, insurer, or regulator asks for the record — you hand them an Audit Pack.
            Everything they need to verify the note is inside, already tied together, already hashed.
          </p>
          <p style={{
            fontSize: '1rem',
            color: 'var(--salvia-text-muted)',
            lineHeight: 1.65,
            marginBottom: '2rem',
          }}>
            You don't go scrambling through chart software, audio storage, version logs, and policy PDFs.
            One click. One file. Defensible.
          </p>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            backgroundColor: '#fff',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '10px',
            fontSize: '0.85rem',
            color: 'var(--salvia-primary)',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(25,56,46,0.04)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--salvia-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Exports as a single signed ZIP — ~12 MB per record
          </div>
        </div>

        {/* Right: visual Audit Pack mockup */}
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '20px',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 24px 60px -12px rgba(15,23,42,0.12)',
          overflow: 'hidden',
        }}>
          {/* Header bar */}
          <div style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            backgroundColor: '#F8FAFC',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '8px',
                backgroundColor: 'var(--salvia-accent)',
                color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--salvia-primary)', letterSpacing: '-0.01em' }}>
                  audit-pack-record-8821.zip
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--salvia-text-muted)', fontFamily: 'monospace', marginTop: '2px' }}>
                  SHA256 · 4e7a…b9c3
                </div>
              </div>
            </div>
            <div style={{
              fontSize: '0.62rem', fontWeight: 700,
              color: '#059669', backgroundColor: '#ECFDF5',
              padding: '0.28rem 0.6rem', borderRadius: '999px',
              letterSpacing: '0.04em',
            }}>
              VERIFIED
            </div>
          </div>

          {/* Contents grid */}
          <div className="audit-pack-contents" style={{
            padding: '1.25rem 1.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
          }}>
            {CONTENTS.map((c) => (
              <div key={c.label} style={{
                display: 'flex', alignItems: 'center', gap: '0.65rem',
                padding: '0.75rem 0.85rem',
                border: '1px solid #F1F5F9',
                borderRadius: '8px',
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '6px',
                  backgroundColor: '#F8FAFC',
                  color: 'var(--salvia-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {ICONS[c.icon]}
                  </svg>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--salvia-primary)', letterSpacing: '-0.01em' }}>
                    {c.label}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--salvia-text-muted)', marginTop: '1px' }}>
                    {c.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            padding: '0.85rem 1.5rem',
            borderTop: '1px solid #F1F5F9',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontSize: '0.72rem',
            color: 'var(--salvia-text-muted)',
          }}>
            <span>Generated 2026-04-20 · 14:32</span>
            <span style={{ fontFamily: 'monospace' }}>Tamper-evident</span>
          </div>
        </div>
      </div>
    </div>
    <style>{`
      @media (max-width: 768px) {
        .audit-pack-contents {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
  </section>
);
