import React from 'react';
import { useIsIndia } from '../lib/market';

// "The outputs" — what Salvia produces. Balanced bento of real, filled product
// surfaces (form, policy check, outcome trend, register). Brand: navy + orange,
// white cards with hairline borders. No empty colour blocks.

const INK = '#0F172A';
const MUTED = '#64748B';
const FAINT = '#94A3B8';
const LINE = 'rgba(15,23,42,0.08)';
const cardShadow = '0 1px 2px rgba(15,23,42,0.04), 0 26px 48px -30px rgba(15,23,42,0.22)';

const Card: React.FC<{ accent: string; span: string; eyebrow: string; title: string; desc: string; children: React.ReactNode }> = ({ accent, span, eyebrow, title, desc, children }) => (
  <div style={{ gridColumn: span, background: '#fff', border: `1px solid ${LINE}`, borderRadius: 20, padding: '1.9rem', display: 'flex', flexDirection: 'column', boxShadow: cardShadow, position: 'relative', overflow: 'hidden' }}>
    <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.55rem' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent }} />
      <span style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent }}>{eyebrow}</span>
    </div>
    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: INK, letterSpacing: '-0.02em' }}>{title}</div>
    <p style={{ fontSize: '0.92rem', color: MUTED, lineHeight: 1.55, margin: '0.45rem 0 1.4rem', maxWidth: 360 }}>{desc}</p>
    <div style={{ marginTop: 'auto' }}>{children}</div>
  </div>
);

const FieldRow: React.FC<{ label: React.ReactNode; value: React.ReactNode; last?: boolean }> = ({ label, value, last }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: last ? 'none' : `1px solid ${LINE}` }}>
    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', color: INK, fontWeight: 600 }}>{label}</span>
    <span style={{ fontSize: '0.84rem', color: MUTED }}>{value}</span>
  </div>
);

const Tag: React.FC<{ t: string; c: string }> = ({ t, c }) => (
  <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.04em', color: c, background: `${c}1A`, padding: '0.18rem 0.5rem', borderRadius: 6 }}>{t}</span>
);

const Status: React.FC<{ ok?: boolean; warn?: boolean; label: string }> = ({ ok, warn, label }) => {
  const c = ok ? '#16A34A' : warn ? '#D97706' : '#64748B';
  const bg = ok ? '#F0FDF4' : warn ? '#FFFBEB' : '#F8FAFC';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.74rem', fontWeight: 700, color: c, background: bg, padding: '0.3rem 0.6rem', borderRadius: 999 }}>
      {ok && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
      {warn && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>}
      {label}
    </span>
  );
};

export const BentoReinvented: React.FC = () => {
  const isIndia = useIsIndia();
  return (
  <section id="outputs" style={{ padding: 'clamp(5.5rem, 9vw, 8rem) 0', backgroundColor: 'transparent', position: 'relative', zIndex: 10 }}>
    <style>{`
      .bento3 { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1.35rem; align-items: stretch; }
      .bento3 > div { min-height: 280px; }
      @media (max-width: 900px) { .bento3 { grid-template-columns: 1fr; } .bento3 > div { grid-column: auto !important; min-height: 0; } }
    `}</style>

    <div className="container" style={{ maxWidth: '760px', textAlign: 'center', marginBottom: '3.5rem' }}>
      <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--salvia-accent)' }}>The outputs</span>
      <h2 style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.1rem)', fontWeight: 800, letterSpacing: '-0.035em', color: 'var(--salvia-primary)', margin: '1.1rem auto 1.1rem', maxWidth: '620px', lineHeight: 1.08 }}>
        Every record an assessor can read
      </h2>
      <p style={{ fontSize: '1.15rem', color: 'var(--salvia-text-muted)', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto' }}>
        Not free text — structured widgets and signed reports, cross-checked against your policies and exported on demand.
      </p>
    </div>

    <div className="container" style={{ maxWidth: '1140px' }}>
      <div className="bento3">
        {/* Inside a form */}
        <Card span="span 7" accent="#FF4E00" eyebrow="Inside a form" title="Typed widgets, not paragraphs" desc="Consent, drugs, pain and witness captured as structured records — assembled live as the clinician speaks.">
          <div style={{ background: '#FBFAF8', border: `1px solid ${LINE}`, borderRadius: 14, padding: '1.1rem 1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.92rem', fontWeight: 800, color: INK }}>Surgical consent</span>
              <Tag t="WITNESSED" c="#0EA5E9" />
            </div>
            <p style={{ fontSize: '0.82rem', color: MUTED, lineHeight: 1.5, margin: '0 0 0.4rem' }}>
              {isIndia
                ? '"…procedure, anaesthesia and ₹18,000 explained in Malayalam, understood by the patient."'
                : '"…procedure, anaesthesia and $1,200 explained in plain English, understood by the patient."'}
            </p>
            <FieldRow label="Witness" value={isIndia ? 'Dr Nair · NMC 4421' : 'Dr Adams · Reg. 4421'} />
            <FieldRow label={<>Tramadol 50&thinsp;mg <Tag t={isIndia ? 'SCH H1' : 'CD'} c="#DC2626" /></>} value={<span style={{ fontFamily: 'monospace', color: '#16A34A', fontWeight: 700 }}>bal 18 → 16</span>} />
            <FieldRow label="Pain · NPRS" value={<span style={{ fontFamily: 'monospace' }}>6 / 10</span>} last />
          </div>
        </Card>

        {/* Policy check */}
        <Card span="span 5" accent="#16A34A" eyebrow="Policy check" title="Checked before sign-off" desc="Your linked rulebook scored clause-by-clause — must, should, try-to.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {[
              { tag: 'MUST', tc: '#DC2626', clause: 'Consent before H1 drug', ok: true },
              { tag: 'SHOULD', tc: '#D97706', clause: 'Vitals documented', ok: true },
              { tag: 'TRY', tc: '#0EA5E9', clause: 'Allergy history noted', warn: true },
            ].map((r) => (
              <div key={r.clause} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem', background: '#FBFAF8', border: `1px solid ${LINE}`, borderRadius: 12, padding: '0.7rem 0.85rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', minWidth: 0 }}>
                  <Tag t={r.tag} c={r.tc} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.clause}</span>
                </span>
                <Status ok={r.ok} warn={r.warn} label={r.ok ? 'Satisfied' : 'Flagged'} />
              </div>
            ))}
          </div>
        </Card>

        {/* Outcome trends */}
        <Card span="span 5" accent="#7C3AED" eyebrow="Outcomes" title="Trends across the episode" desc="NPRS and recovery measures tracked visit-over-visit.">
          <div style={{ background: '#FBFAF8', border: `1px solid ${LINE}`, borderRadius: 14, padding: '1.1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.7rem' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: INK }}>Pain · NPRS · 4 weeks</span>
              <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#16A34A' }}>−67%</span>
            </div>
            <svg viewBox="0 0 260 90" style={{ width: '100%', height: 90, display: 'block' }}>
              {[0, 1, 2, 3].map((i) => <line key={i} x1="0" x2="260" y1={12 + i * 22} y2={12 + i * 22} stroke="rgba(15,23,42,0.06)" strokeWidth="1" />)}
              <polyline points="8,20 66,30 124,26 182,58 240,74" fill="none" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              {[[8, 20], [66, 30], [124, 26], [182, 58], [240, 74]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" fill="#fff" stroke="#7C3AED" strokeWidth="2.5" />)}
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.7rem', color: FAINT, fontFamily: 'monospace' }}>
              <span>wk 1 · NPRS 6</span><span>wk 4 · NPRS 2</span>
            </div>
          </div>
        </Card>

        {/* Registers */}
        <Card span="span 7" accent="#D97706" eyebrow="Registers" title="Audit-ready, reconciled, exportable" desc="Controlled-drug register, vaccine log and incident log build themselves — one-click export for the assessor.">
          <div style={{ background: '#FBFAF8', border: `1px solid ${LINE}`, borderRadius: 14, padding: '1.1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.7rem' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: INK }}>Controlled drug register · June</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.66rem', fontWeight: 800, color: '#16A34A', background: '#F0FDF4', padding: '0.25rem 0.6rem', borderRadius: 999 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                RECONCILED
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 0.8fr 0.8fr 0.5fr', columnGap: '0.6rem', rowGap: '0.55rem', fontSize: '0.78rem', alignItems: 'center' }}>
              {['Drug', 'Batch', 'Given', 'Balance', 'Sch'].map((h) => <span key={h} style={{ color: FAINT, fontWeight: 800, fontSize: '0.62rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</span>)}
              {[
                ['Tramadol 50mg', 'TZ-8841', '2 amp', '16', '#DC2626'],
                ['Ketamine', 'KT-2290', '1 vial', '9', '#DC2626'],
                ['Buprenorphine', 'BP-5512', '1 amp', '23', '#16A34A'],
              ].map((r) => (
                <React.Fragment key={r[0]}>
                  <span style={{ color: INK, fontWeight: 700 }}>{r[0]}</span>
                  <span style={{ color: MUTED, fontFamily: 'monospace' }}>{r[1]}</span>
                  <span style={{ color: MUTED }}>{r[2]}</span>
                  <span style={{ color: INK, fontWeight: 800, fontFamily: 'monospace' }}>{r[3]}</span>
                  <span><Tag t="H1" c={r[4] as string} /></span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>
  );
};
