import React from 'react';
import { ParticleSphere } from './ParticleSphere';

// "The core" — fuses the outputs story with the 3D orb into one scene: the orb
// is the protected core, and the real record widgets (consent, policy check,
// outcome trend) float around it like satellites in orbit. One section, one
// metaphor made literal.

const INK = '#0F172A';
const MUTED = '#64748B';
const FAINT = '#94A3B8';
const LINE = 'rgba(15,23,42,0.08)';
const cardShadow = '0 1px 2px rgba(15,23,42,0.05), 0 30px 60px -28px rgba(15,23,42,0.28)';

const Tag: React.FC<{ t: string; c: string }> = ({ t, c }) => (
  <span style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.04em', color: c, background: `${c}1A`, padding: '0.18rem 0.5rem', borderRadius: 6 }}>{t}</span>
);

const FieldRow: React.FC<{ label: React.ReactNode; value: React.ReactNode; last?: boolean }> = ({ label, value, last }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.55rem 0', borderBottom: last ? 'none' : `1px solid ${LINE}` }}>
    <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', color: INK, fontWeight: 600 }}>{label}</span>
    <span style={{ fontSize: '0.82rem', color: MUTED }}>{value}</span>
  </div>
);

export const ComplianceCore: React.FC = () => (
  <section id="outputs" style={{ padding: 'clamp(5rem, 9vw, 8rem) 0', backgroundColor: 'transparent', position: 'relative', zIndex: 10, overflow: 'hidden' }}>
    <style>{`
      .cc-wrap { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 2rem; align-items: center; }
      .cc-stage { position: relative; height: clamp(440px, 46vw, 600px); }
      .cc-card { position: absolute; background: #fff; border: 1px solid ${LINE}; border-radius: 16px; box-shadow: ${cardShadow}; z-index: 3; }
      .cc-ring { position: absolute; top: 50%; left: 54%; transform: translate(-50%,-50%); border-radius: 50%; border: 1px dashed rgba(15,23,42,0.10); z-index: 1; pointer-events: none; }
      @keyframes cc-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      .cc-f1 { animation: cc-float 7s ease-in-out infinite; }
      .cc-f2 { animation: cc-float 6s ease-in-out infinite 0.8s; }
      .cc-f3 { animation: cc-float 8s ease-in-out infinite 1.4s; }
      @media (prefers-reduced-motion: reduce) { .cc-f1,.cc-f2,.cc-f3 { animation: none; } }
      @media (max-width: 900px) {
        .cc-wrap { grid-template-columns: 1fr; gap: 2.5rem; text-align: center; }
        .cc-copy { max-width: 560px; margin: 0 auto; }
        .cc-stage { height: 420px; }
        .cc-mini { display: none !important; }
        .cc-main { left: 50% !important; right: auto !important; transform: translateX(-50%); top: 18% !important; }
        .cc-f1 { animation: none; }
      }
    `}</style>

    <div className="container" style={{ maxWidth: '1180px' }}>
      <div className="cc-wrap">
        {/* Copy */}
        <div className="cc-copy">
          <span style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--salvia-accent)' }}>The outputs</span>
          <h2 style={{ fontSize: 'clamp(2.1rem, 4.8vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.035em', color: 'var(--salvia-primary)', margin: '1rem 0 1.1rem', lineHeight: 1.06 }}>
            Every record an assessor can read
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--salvia-text-muted)', lineHeight: 1.6, maxWidth: '440px' }}>
            Not free text. Each spoken note breaks into structured widgets and signed reports —
            cross-checked against your policies and exported on demand. Everything orbits one
            tamper-evident core.
          </p>
        </div>

        {/* Stage: orb as the core, records orbiting */}
        <div className="cc-stage">
          {/* orbit rings */}
          <span className="cc-ring" style={{ width: 'min(540px, 80%)', aspectRatio: '1' }} />
          <span className="cc-ring" style={{ width: 'min(380px, 58%)', aspectRatio: '1' }} />

          {/* the core */}
          <div style={{ position: 'absolute', top: '50%', left: '54%', transform: 'translate(-50%,-50%)', width: 'min(460px, 78%)', zIndex: 2 }}>
            <ParticleSphere style={{ maxWidth: 'none', margin: 0 }} />
          </div>

          {/* satellite 1 — the form / consent widget */}
          <div className="cc-card cc-main cc-f1" style={{ left: '-4%', top: '26%', width: 'min(320px, 78%)', padding: '1rem 1.15rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: INK }}>Surgical consent</span>
              <Tag t="WITNESSED" c="#0EA5E9" />
            </div>
            <p style={{ fontSize: '0.8rem', color: MUTED, lineHeight: 1.5, margin: '0 0 0.4rem' }}>
              “…procedure, anaesthesia and ₹18,000 explained in Malayalam, understood by the patient.”
            </p>
            <FieldRow label="Witness" value="Dr Nair · NMC 4421" />
            <FieldRow label={<>Tramadol 50&thinsp;mg <Tag t="SCH H1" c="#DC2626" /></>} value={<span style={{ fontFamily: 'monospace', color: '#16A34A', fontWeight: 700 }}>bal 18 → 16</span>} />
            <FieldRow label="Pain · NPRS" value={<span style={{ fontFamily: 'monospace' }}>6 / 10</span>} last />
          </div>

          {/* satellite 2 — policy check pill card */}
          <div className="cc-card cc-mini cc-f2" style={{ right: '0%', top: '4%', width: 'min(230px, 60%)', padding: '0.85rem 1rem' }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#16A34A', marginBottom: '0.5rem' }}>Policy check</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <span style={{ width: 26, height: 26, borderRadius: '50%', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: INK }}>Satisfied</div>
                <div style={{ fontSize: '0.72rem', color: MUTED }}>Consent before H1 drug · MUST</div>
              </div>
            </div>
          </div>

          {/* satellite 3 — outcome trend mini */}
          <div className="cc-card cc-mini cc-f3" style={{ right: '4%', bottom: '2%', width: 'min(250px, 66%)', padding: '0.9rem 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: INK }}>Pain · NPRS · 4 wks</span>
              <span style={{ fontSize: '0.86rem', fontWeight: 800, color: '#16A34A' }}>−67%</span>
            </div>
            <svg viewBox="0 0 260 70" style={{ width: '100%', height: 56, display: 'block' }}>
              {[0, 1, 2].map((i) => <line key={i} x1="0" x2="260" y1={10 + i * 22} y2={10 + i * 22} stroke="rgba(15,23,42,0.06)" strokeWidth="1" />)}
              <polyline points="8,16 66,24 124,20 182,46 240,58" fill="none" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              {[[8, 16], [66, 24], [124, 20], [182, 46], [240, 58]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" stroke="#7C3AED" strokeWidth="2.5" />)}
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
);
