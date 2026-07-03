import React from 'react';

// "One engine" — the in → core → out transformation, as one cohesive system
// panel (not a flow-chart of loose pills). Brand: navy + orange, warm/white.

const INK = 'var(--salvia-primary)';
const MUTED = 'var(--salvia-text-muted)';
const FAINT = '#94A3B8';
const LINE = 'var(--border-subtle)';

const INPUTS = [
  { l: 'Consent', c: 'var(--salvia-accent)', d: 'witnessed' },
  { l: 'Drug register', c: 'var(--salvia-error)', d: 'Schedule H1' },
  { l: 'Pain · NPRS', c: 'var(--accent-outcomes)', d: '0–10 scored' },
  { l: 'Incidents', c: 'var(--salvia-warning)', d: 'logged' },
  { l: 'Witness', c: 'var(--accent-vet)', d: 'VCI / DCI no.' },
];

const OUTPUTS = [
  { l: 'Signed clinical note', d: 'PDF · versioned · hashed' },
  { l: 'Controlled-drug register', d: 'reconciled monthly' },
  { l: 'Audit Pack', d: 'one-click .zip export' },
];

const Arrow: React.FC = () => (
  <div className="hub-arrow" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 0.6rem', background: '#fff' }}>
    <span className="hub-rail" style={{ position: 'absolute', top: 0, bottom: 0, width: 1, background: LINE }} />
    <span style={{ position: 'relative', zIndex: 1, width: 34, height: 34, borderRadius: '50%', background: '#fff', border: `1px solid ${LINE}`, boxShadow: 'var(--shadow-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--salvia-accent)' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
    </span>
  </div>
);

const ZoneLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="eyebrow" style={{ color: FAINT, marginBottom: '1rem' }}>{children}</div>
);

export const HubSpoke: React.FC = () => (
  <section id="compliance-core" style={{ padding: 'var(--section-pad) 0', backgroundColor: 'var(--salvia-surface)', position: 'relative', zIndex: 10 }}>
    <style>{`
      .hub-grid {
        display: grid; grid-template-columns: 1fr auto 1.1fr auto 1.05fr; align-items: stretch;
        background: #fff; border: 1px solid ${LINE}; border-radius: var(--radius-xl);
        box-shadow: var(--shadow-1), var(--shadow-3);
        overflow: hidden;
      }
      .hub-zone { padding: 2.1rem 2rem; }
      @media (max-width: 860px) {
        .hub-grid { grid-template-columns: 1fr; }
        .hub-arrow { transform: rotate(90deg); padding: 0.5rem 0 !important; }
        .hub-rail { display: none; }
        .hub-zone { padding: 1.7rem; }
      }
    `}</style>

    <div className="container" style={{ maxWidth: '760px', textAlign: 'center', marginBottom: '3.5rem' }}>
      <span className="eyebrow">One engine</span>
      <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: '-0.035em', color: 'var(--salvia-primary)', margin: '1.1rem auto 1.1rem', maxWidth: '640px', lineHeight: 1.08 }}>
        Typed widgets in.<br />Audit-ready reports out.
      </h2>
      <p style={{ fontSize: 'var(--text-md)', color: 'var(--salvia-text-muted)', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto' }}>
        Every compliance widget feeds one core that checks your policies and produces the signed records an assessor expects.
      </p>
    </div>

    <div className="container" style={{ maxWidth: '1200px' }}>
      <div className="hub-grid">
        {/* IN */}
        <div className="hub-zone">
          <ZoneLabel>What goes in</ZoneLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {INPUTS.map((w) => (
              <div key={w.l} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', background: '#FBFAF8', border: `1px solid ${LINE}`, borderRadius: 'var(--radius-md)', padding: '0.6rem 0.8rem' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: w.c, flexShrink: 0 }} />
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: INK }}>{w.l}</span>
                <span style={{ marginLeft: 'auto', fontSize: 'var(--text-2xs)', color: FAINT }}>{w.d}</span>
              </div>
            ))}
          </div>
        </div>

        <Arrow />

        {/* CORE */}
        <div className="hub-zone" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'linear-gradient(180deg, #FBFAF8 0%, #fff 100%)' }}>
          <ZoneLabel>The core</ZoneLabel>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'linear-gradient(135deg,var(--salvia-primary),#1E293B)', color: '#fff', borderRadius: 'var(--salvia-radius-full)', padding: '0.85rem 1.5rem', boxShadow: 'var(--shadow-3)' }}>
            <span style={{ width: 22, height: 22, borderRadius: 'var(--radius-sm)', background: 'linear-gradient(135deg,var(--salvia-accent),#ff8a4d)' }} />
            <span style={{ fontSize: 'var(--text-md)', fontWeight: 800, letterSpacing: '-0.01em' }}>Salvia core</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginTop: '1.4rem', width: '100%' }}>
            {['Policy-checked', 'Versioned & edit-tracked', 'Hashed & audit-locked'].map((t) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', fontSize: 'var(--text-xs)', fontWeight: 600, color: MUTED }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                {t}
              </div>
            ))}
          </div>
        </div>

        <Arrow />

        {/* OUT */}
        <div className="hub-zone" style={{ background: '#FBFAF8' }}>
          <ZoneLabel>What comes out</ZoneLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {OUTPUTS.map((o) => (
              <div key={o.l} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', background: '#fff', border: `1px solid ${LINE}`, borderRadius: 'var(--radius-md)', padding: '0.75rem 0.85rem', boxShadow: 'var(--shadow-2)' }}>
                <span style={{ width: 30, height: 30, borderRadius: 'var(--radius-sm)', background: 'rgba(255,78,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--salvia-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                </span>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: INK }}>{o.l}</div>
                  <div style={{ fontSize: 'var(--text-2xs)', color: FAINT }}>{o.d}</div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 'var(--text-2xs)', color: MUTED, textAlign: 'center', marginTop: '0.2rem' }}>
              on your clinic letterhead · <strong style={{ color: INK }}>31 templates</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
