import React from 'react';
import { useIsIndia } from '../lib/market';

// ── Tiny mock tiles ──────────────────────────────────────────────────
const AudioTile: React.FC = () => {
  const bars = [14, 22, 32, 20, 38, 28, 44, 30, 38, 24, 34, 28];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '48px', padding: '0 0.25rem' }}>
      {bars.map((h, i) => (
        <div
          key={i}
          className={i < 8 ? 'salvia-audio-bar' : undefined}
          style={{
            flex: 1, height: `${h}px`,
            backgroundColor: i < 8 ? 'var(--salvia-accent)' : '#CBD5E1',
            opacity: i < 8 ? 1 : 0.55,
            borderRadius: '1.5px',
            transformOrigin: 'center',
            animationDelay: i < 8 ? `${i * 90}ms` : undefined,
          }}
        />
      ))}
    </div>
  );
};

const FormTile: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '0.25rem 0.1rem' }}>
    {[
      { w: '70%', c: 'var(--salvia-primary)' },
      { w: '55%', c: 'var(--salvia-text-muted)' },
      { w: '80%', c: 'var(--salvia-accent)' },
      { w: '40%', c: 'var(--salvia-text-muted)' },
    ].map((r, i) => (
      <div
        key={i}
        className={i === 2 ? 'salvia-form-row salvia-form-active' : 'salvia-form-row'}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '0.3rem 0.4rem',
          backgroundColor: i === 2 ? '#FFF7F2' : '#F8FAFC',
          borderRadius: '3px',
          border: i === 2 ? '1px solid rgba(255,78,0,0.25)' : '1px solid transparent',
          animationDelay: `${i * 250}ms`,
        }}>
        <div
          className="salvia-form-dot"
          style={{
            width: 5, height: 5, backgroundColor: r.c, borderRadius: '50%',
            animationDelay: `${i * 250}ms`,
          }}
        />
        <div
          className="salvia-form-bar"
          style={{
            width: r.w, height: 4, backgroundColor: r.c, opacity: 0.55, borderRadius: '2px',
            transformOrigin: 'left',
            animationDelay: `${i * 250}ms`,
          }}
        />
      </div>
    ))}
  </div>
);

const PolicyTile: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '0.25rem 0.1rem' }}>
    {[
      { tag: 'MUST', color: 'var(--salvia-error)', bg: '#FEF2F2', w: '70%' },
      { tag: 'MUST', color: 'var(--salvia-error)', bg: '#FEF2F2', w: '55%' },
      { tag: 'MAYBE', color: 'var(--salvia-warning)', bg: '#FFFBEB', w: '65%' },
      { tag: 'TRY', color: 'var(--accent-dental)', bg: '#ECFDF5', w: '45%' },
    ].map((r, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <div
          className="salvia-policy-tag"
          style={{
            fontSize: '0.48rem', fontWeight: 800, color: r.color, backgroundColor: r.bg,
            padding: '0.12rem 0.3rem', borderRadius: '2px', letterSpacing: '0.05em',
            width: 34, textAlign: 'center',
            animationDelay: `${i * 280}ms`,
          }}>
          {r.tag}
        </div>
        <div
          className="salvia-policy-bar"
          style={{
            flex: 1, height: 3, backgroundColor: '#CBD5E1', borderRadius: '2px', width: r.w,
            transformOrigin: 'left',
            // CSS var used by the keyframe to tint the bar to its tag color
            ['--bar-color' as never]: r.color,
            animationDelay: `${i * 280}ms`,
          }}
        />
      </div>
    ))}
  </div>
);

const AuditTile: React.FC = () => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: '4px', padding: '0.15rem 0',
  }}>
    <div
      className="salvia-audit-doc"
      style={{
        width: 46, height: 56,
        backgroundColor: '#fff',
        border: '1.5px solid var(--salvia-primary)',
        borderRadius: '4px',
        position: 'relative',
        boxShadow: '2px 2px 0 var(--salvia-primary)',
        overflow: 'hidden',
      }}>
      <div
        className="salvia-audit-line"
        style={{ position: 'absolute', top: 6, left: 6, right: 6, height: 2, backgroundColor: '#CBD5E1', borderRadius: 1, transformOrigin: 'left', animationDelay: '0ms' }}
      />
      <div
        className="salvia-audit-line"
        style={{ position: 'absolute', top: 12, left: 6, right: 12, height: 2, backgroundColor: '#CBD5E1', borderRadius: 1, transformOrigin: 'left', animationDelay: '200ms' }}
      />
      <div
        className="salvia-audit-line"
        style={{ position: 'absolute', top: 18, left: 6, right: 10, height: 2, backgroundColor: '#CBD5E1', borderRadius: 1, transformOrigin: 'left', animationDelay: '400ms' }}
      />
      {/* Sealing shimmer sweeps across once the lines are drawn */}
      <div className="salvia-audit-shimmer" />
      <div
        className="salvia-audit-check"
        style={{
          position: 'absolute', bottom: -8, right: -6,
          width: 22, height: 22, borderRadius: '50%',
          backgroundColor: 'var(--salvia-accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '0.55rem', fontWeight: 800,
          boxShadow: '0 2px 6px rgba(255,78,0,0.35)',
          transformOrigin: 'center',
        }}>
        ✓
      </div>
    </div>
    <div className="salvia-audit-sha" style={{
      fontFamily: 'monospace', fontSize: '0.52rem', fontWeight: 600,
      color: '#94A3B8', letterSpacing: '0.05em', marginTop: '6px',
    }}>
      SHA 7f3a…
    </div>
  </div>
);

const Arrow: React.FC<{ index: number }> = ({ index }) => (
  <svg
    width="28" height="16" viewBox="0 0 28 16" fill="none"
    className="salvia-arrow"
    style={{ flexShrink: 0, animationDelay: `${index * 200}ms` }}
  >
    <path d="M1 8 H22 M17 3 L22 8 L17 13" stroke="var(--salvia-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Main section ─────────────────────────────────────────────────────
export const WhatSalviaIs: React.FC = () => {
  const isIndia = useIsIndia();
  const tiles = [
    { label: 'Audio', sub: isIndia ? 'Any Indian language' : 'Any language', ui: <AudioTile /> },
    { label: 'Forms', sub: 'AI-filled fields', ui: <FormTile /> },
    { label: 'Policy', sub: 'Your rulebook', ui: <PolicyTile /> },
    { label: 'Audit Pack', sub: 'Sealed + signed', ui: <AuditTile /> },
  ];

  return (
    <section className="section" style={{
      position: 'relative',
      zIndex: 10,
    }}>
      <div className="container container--content">

        {/* Eyebrow */}
        <div className="eyebrow" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          marginBottom: '1.5rem',
        }}>
          What Salvia is
        </div>

        {/* Hero statement */}
        <h2 style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          lineHeight: 1.1,
          color: 'var(--salvia-primary)',
          textAlign: 'center',
          maxWidth: '880px',
          margin: '0 auto 1.5rem',
        }}>
          <span style={{ color: 'var(--salvia-accent)' }}>AI clinical documentation</span> — built as a <em style={{ fontStyle: 'normal', textDecoration: 'underline', textDecorationColor: 'var(--salvia-accent)', textDecorationThickness: '3px', textUnderlineOffset: '6px' }}>compliance suite</em>, not a scribe.
        </h2>

        {/* Two-paragraph explainer */}
        <div style={{ maxWidth: '720px', margin: '0 auto 3.5rem', textAlign: 'center' }}>
          <p style={{
            fontSize: 'clamp(1rem, 1.6vw, 1.1rem)',
            color: 'var(--salvia-text-muted)',
            lineHeight: 1.7,
            margin: '0 0 1rem',
          }}>
            Staff picks the subject, speaks in {isIndia ? 'any Indian language — Hindi, Malayalam, Tamil, English or code-mixed' : 'any language'} — and selects the forms to fill. Salvia transcribes the audio,
            drops evidence into each field, and — if the form has a linked policy — runs the
            policy check automatically.
          </p>
          <p style={{
            fontSize: 'clamp(1rem, 1.6vw, 1.1rem)',
            color: 'var(--salvia-text-muted)',
            lineHeight: 1.7,
            margin: 0,
          }}>
            Other AI scribes end at the note. Salvia keeps going — every record is versioned,
            edit-tracked, policy-checked, and audit-ready the moment it's approved.
          </p>
        </div>

        {/* The equation — 4 tiles with arrows */}
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.25rem 2rem',
          boxShadow: 'var(--shadow-2)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)',
            backgroundColor: 'var(--salvia-primary)',
            color: '#fff',
            fontSize: 'var(--text-2xs)', fontWeight: 800,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            padding: '0.4rem 0.9rem', borderRadius: 'var(--salvia-radius-full)',
            whiteSpace: 'nowrap',
          }}>
            The Salvia stack
          </div>

          <div className="salvia-equation" style={{
            display: 'flex', alignItems: 'stretch', justifyContent: 'space-between',
            gap: '0.5rem',
          }}>
            {tiles.map((t, i) => (
              <React.Fragment key={t.label}>
                <div style={{
                  flex: 1,
                  display: 'flex', flexDirection: 'column',
                  padding: '0.75rem 0.5rem 1rem',
                  minWidth: 0,
                }}>
                  <div style={{
                    fontSize: '0.58rem', fontWeight: 800,
                    color: 'var(--salvia-text-muted)',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    textAlign: 'center', marginBottom: '0.5rem',
                  }}>
                    Step {i + 1}
                  </div>

                  {/* mock UI */}
                  <div style={{
                    backgroundColor: '#FAFBFC',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 0.6rem',
                    minHeight: '96px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    marginBottom: '0.85rem',
                  }}>
                    {t.ui}
                  </div>

                  <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                    <div style={{
                      fontSize: 'var(--text-base)', fontWeight: 800,
                      color: 'var(--salvia-primary)',
                      letterSpacing: '-0.02em',
                    }}>
                      {t.label}
                    </div>
                    <div style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--salvia-text-muted)',
                      marginTop: '0.15rem',
                    }}>
                      {t.sub}
                    </div>
                  </div>
                </div>

                {i < tiles.length - 1 && (
                  <div className="salvia-eq-arrow" style={{
                    display: 'flex', alignItems: 'center',
                  }}>
                    <Arrow index={i} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* What it's NOT line */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          marginTop: '2.25rem',
          flexWrap: 'wrap',
          fontSize: 'var(--text-sm)',
          color: 'var(--salvia-text-muted)',
          textAlign: 'center',
        }}>
          <span style={{ color: '#94A3B8', textDecoration: 'line-through', textDecorationColor: '#CBD5E1' }}>
            Not a bedside dictation app.
          </span>
          <span style={{ color: '#94A3B8', textDecoration: 'line-through', textDecorationColor: '#CBD5E1' }}>
            Not a SOAP-only scribe.
          </span>
          <span style={{ color: '#94A3B8', textDecoration: 'line-through', textDecorationColor: '#CBD5E1' }}>
            Not just transcription.
          </span>
          <span style={{ fontWeight: 700, color: 'var(--salvia-primary)' }}>
            → A compliance-grade documentation suite.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .salvia-equation {
            flex-direction: column !important;
            gap: 0.75rem !important;
          }
          .salvia-eq-arrow {
            justify-content: center !important;
            transform: rotate(90deg);
          }
        }

        /* Audio: bars wave continuously, staggered */
        .salvia-audio-bar {
          animation: salvia-bar-wave 1.4s ease-in-out infinite;
        }
        @keyframes salvia-bar-wave {
          0%, 100% { transform: scaleY(0.45); }
          50%     { transform: scaleY(1.05); }
        }

        /* Arrows: orange glide between tiles */
        .salvia-arrow {
          animation: salvia-arrow-glide 1.8s ease-in-out infinite;
        }
        @keyframes salvia-arrow-glide {
          0%, 100% { opacity: 0.4; transform: translateX(-3px); }
          50%     { opacity: 1;   transform: translateX(2px); }
        }

        /* Forms: each row's progress bar fills L→R in sequence,
           the dot pulses as its row "lands", and the accent row gets a soft ring. */
        .salvia-form-bar {
          animation: salvia-form-fill 3.6s cubic-bezier(.4,0,.2,1) infinite;
        }
        @keyframes salvia-form-fill {
          0%      { transform: scaleX(0);   opacity: 0.25; }
          22%     { transform: scaleX(1);   opacity: 0.9; }
          85%     { transform: scaleX(1);   opacity: 0.9; }
          95%     { transform: scaleX(1);   opacity: 0.55; }
          100%    { transform: scaleX(0);   opacity: 0.25; }
        }
        .salvia-form-dot {
          animation: salvia-form-dot 3.6s ease-out infinite;
        }
        @keyframes salvia-form-dot {
          0%, 18%  { transform: scale(0.6); opacity: 0.35; }
          25%      { transform: scale(1.4); opacity: 1; }
          40%, 90% { transform: scale(1);   opacity: 1; }
          100%     { transform: scale(0.6); opacity: 0.35; }
        }
        .salvia-form-active {
          animation: salvia-form-pulse 3.6s ease-in-out infinite;
        }
        @keyframes salvia-form-pulse {
          0%, 60%, 100% { box-shadow: 0 0 0 0 rgba(255,78,0,0); }
          75%           { box-shadow: 0 0 0 3px rgba(255,78,0,0.20); }
        }

        /* Policy: bars grow from gray to their tag color in sequence,
           tags flash slightly when their rule "fires". */
        .salvia-policy-bar {
          background-color: #CBD5E1;
          animation: salvia-policy-check 3.6s cubic-bezier(.4,0,.2,1) infinite;
        }
        @keyframes salvia-policy-check {
          0%, 12%  { background-color: #CBD5E1; transform: scaleX(0.6); }
          32%      { background-color: var(--bar-color); transform: scaleX(1); }
          85%      { background-color: var(--bar-color); transform: scaleX(1); }
          100%     { background-color: #CBD5E1; transform: scaleX(0.6); }
        }
        .salvia-policy-tag {
          animation: salvia-policy-tag 3.6s ease-out infinite;
        }
        @keyframes salvia-policy-tag {
          0%, 18%  { transform: scale(1);    filter: brightness(1); }
          25%      { transform: scale(1.12); filter: brightness(1.15); }
          40%, 100% { transform: scale(1);   filter: brightness(1); }
        }

        /* Audit: doc lines draw L→R staggered, shimmer sweeps across the
           sealed page, then the check badge stamps in. */
        .salvia-audit-line {
          animation: salvia-audit-draw 4.2s cubic-bezier(.5,.0,.2,1) infinite;
        }
        @keyframes salvia-audit-draw {
          0%, 5%   { transform: scaleX(0); opacity: 0.4; }
          22%      { transform: scaleX(1); opacity: 1; }
          90%      { transform: scaleX(1); opacity: 1; }
          100%     { transform: scaleX(0); opacity: 0.4; }
        }
        .salvia-audit-shimmer {
          position: absolute;
          top: 0; bottom: 0;
          left: -40%;
          width: 40%;
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,78,0,0.18) 50%,
            rgba(255,255,255,0) 100%
          );
          pointer-events: none;
          animation: salvia-audit-shimmer 4.2s ease-in-out infinite;
          animation-delay: 0.6s;
        }
        @keyframes salvia-audit-shimmer {
          0%, 35%   { transform: translateX(0);    opacity: 0; }
          45%       { opacity: 1; }
          70%       { transform: translateX(300%); opacity: 0; }
          100%      { transform: translateX(300%); opacity: 0; }
        }
        .salvia-audit-check {
          opacity: 0;
          animation: salvia-audit-stamp 4.2s cubic-bezier(.34,1.56,.64,1) infinite;
        }
        @keyframes salvia-audit-stamp {
          0%, 55%   { transform: scale(0); opacity: 0; }
          65%       { transform: scale(1.25); opacity: 1; box-shadow: 0 4px 14px rgba(255,78,0,0.55); }
          75%, 92%  { transform: scale(1);   opacity: 1; box-shadow: 0 2px 6px rgba(255,78,0,0.35); }
          100%      { transform: scale(0);   opacity: 0; }
        }
        .salvia-audit-sha {
          animation: salvia-audit-sha 4.2s ease-out infinite;
        }
        @keyframes salvia-audit-sha {
          0%, 60%   { opacity: 0.35; }
          75%, 92%  { opacity: 1; color: #475569; }
          100%      { opacity: 0.35; color: #94A3B8; }
        }

        @media (prefers-reduced-motion: reduce) {
          .salvia-audio-bar,
          .salvia-arrow,
          .salvia-form-bar,
          .salvia-form-dot,
          .salvia-form-active,
          .salvia-policy-bar,
          .salvia-policy-tag,
          .salvia-audit-line,
          .salvia-audit-shimmer,
          .salvia-audit-check,
          .salvia-audit-sha {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .salvia-policy-bar { background-color: #CBD5E1 !important; }
        }
      `}</style>
    </section>
  );
};
