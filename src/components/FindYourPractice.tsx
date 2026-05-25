// "Find your practice" picker — sitewide internal-link booster + UX
// helper. Renders real <Link>s so Google sees and follows them
// (good SEO signal); colourful cards so a visitor lands on their
// own discipline page without scanning the dropdown.

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ALLIED_DISCIPLINES } from '../data/alliedDisciplines';

const PRIMARY = [
  { to: '/veterinary',        label: 'Veterinary',       sub: 'RCVS · VCNZ · AHPRA · CMA', accent: '#FF4E00' },
  { to: '/dental',            label: 'Dental',           sub: 'CQC · GDC · AHPRA · ARPANSA', accent: '#10B981' },
  { to: '/general-practice',  label: 'General Practice', sub: 'CQC · AHPRA · MCNZ · RACGP', accent: '#D97706' },
  { to: '/allied-health',     label: 'Allied Health',    sub: 'CORU · HCPC · AHPRA · PBNZ', accent: '#0891B2' },
];

export const FindYourPractice = () => {
  const [query, setQuery] = useState('');

  // Combine into one searchable list: primary + 6 allied disciplines.
  const all = useMemo(() => [
    ...PRIMARY.map((p) => ({
      to: p.to, label: p.label, sub: p.sub,
      accent: p.accent, tag: 'Practice',
    })),
    ...ALLIED_DISCIPLINES.map((d) => ({
      to: `/${d.slug}`,
      label: d.name,
      sub: d.regulators.slice(0, 4).map((r) => r.body).join(' · '),
      accent: d.accent,
      tag: 'Allied',
    })),
  ], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter((c) =>
      c.label.toLowerCase().includes(q) ||
      c.sub.toLowerCase().includes(q),
    );
  }, [all, query]);

  return (
    <section id="find-your-practice" style={{
      padding: '7rem 0',
      backgroundColor: '#fff',
      borderTop: '1px solid #F1F5F9',
      position: 'relative',
      zIndex: 10,
    }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 800, color: 'var(--salvia-accent)',
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem',
          }}>
            Find your practice
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800,
            color: 'var(--salvia-primary)', letterSpacing: '-0.03em', margin: 0,
          }}>
            Built for your discipline.
          </h2>
          <p style={{
            color: 'var(--salvia-text-muted)', fontSize: '1rem',
            maxWidth: '600px', margin: '0.75rem auto 0', lineHeight: 1.65,
          }}>
            Pick the practice page closest to what you do. Each page covers the regulator pack, record format, and FAQ specific to you.
          </p>
        </div>

        {/* Search */}
        <div style={{ maxWidth: '480px', margin: '0 auto 2.5rem' }}>
          <div style={{
            position: 'relative',
            backgroundColor: '#fff',
            border: '1.5px solid #EEF2F6',
            borderRadius: '14px',
            padding: '0.85rem 1rem 0.85rem 2.75rem',
            display: 'flex', alignItems: 'center',
          }}>
            <svg
              width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              style={{ position: 'absolute', left: '1rem', color: 'var(--salvia-text-muted)' }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try 'physio', 'CORU', 'GP', 'CMA'…"
              style={{
                flex: 1, border: 'none', outline: 'none',
                fontSize: '0.95rem', color: 'var(--salvia-text)',
                background: 'transparent',
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--salvia-text-muted)', padding: '0.25rem',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Card grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}>
          {filtered.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              style={{ textDecoration: 'none' }}
              className="fyp-card"
            >
              <div style={{
                padding: '1.5rem',
                borderRadius: '16px',
                backgroundColor: '#FAFBFC',
                border: '1px solid #EEF2F6',
                height: '100%',
                display: 'flex', flexDirection: 'column', gap: '0.65rem',
                transition: 'all 0.2s ease',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    backgroundColor: c.accent,
                    boxShadow: `0 0 0 3px ${c.accent}15`,
                  }} />
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 800,
                    color: 'var(--salvia-text-muted)',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                  }}>{c.tag}</span>
                </div>
                <h3 style={{
                  fontSize: '1.05rem', fontWeight: 800,
                  color: 'var(--salvia-primary)', letterSpacing: '-0.02em',
                  margin: 0,
                }}>{c.label}</h3>
                <div style={{
                  fontSize: '0.75rem', color: 'var(--salvia-text-muted)',
                  lineHeight: 1.4, fontWeight: 600,
                }}>{c.sub}</div>
                <div style={{
                  marginTop: 'auto', paddingTop: '0.5rem',
                  fontSize: '0.78rem', fontWeight: 700,
                  color: c.accent,
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                }}>
                  View page
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '3rem 1rem',
            color: 'var(--salvia-text-muted)',
          }}>
            <p style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
              No matches. Don't see your discipline?
            </p>
            <Link to="/start" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              backgroundColor: 'var(--salvia-primary)', color: '#fff',
              padding: '0.7rem 1.4rem', borderRadius: '10px',
              fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
            }}>
              Talk to us — we'll build the regulator pack
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        )}

        {/* "Don't see your practice?" fallback always visible */}
        {filtered.length > 0 && (
          <div style={{
            marginTop: '2.5rem', textAlign: 'center',
            fontSize: '0.88rem', color: 'var(--salvia-text-muted)',
          }}>
            Don't see your discipline?{' '}
            <Link to="/start" style={{
              color: 'var(--salvia-accent)', fontWeight: 700, textDecoration: 'none',
            }}>
              Request a custom framework →
            </Link>
          </div>
        )}
      </div>

      <style>{`
        .fyp-card:hover > div {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(15,23,42,0.06);
          border-color: rgba(15,23,42,0.12);
          background-color: #fff;
        }
      `}</style>
    </section>
  );
};
