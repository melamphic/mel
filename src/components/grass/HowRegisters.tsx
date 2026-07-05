import React, { useEffect, useRef } from 'react';

import { Rv, useScrollFx } from './Rv';

export const HowItWorksGrass: React.FC = () => (
  <div className="g-panel g-panel--green" id="how-it-works">
    <div className="g-container">
      <Rv as="span" className="g-kicker">
        <span className="g-dot" />
        How it works
      </Rv>
      <Rv as="h2" className="g-h2">
        You talk. It becomes
        <br />
        <span className="g-serif">the record.</span>
      </Rv>
      <Rv as="p" className="g-sub" delay={1}>
        No new habits, no typing after hours. Salvia fits the way Indian clinics and wards
        already run.
      </Rv>

      <div className="g-steps">
        <Rv className="g-step" delay={1}>
          <span className="g-step-num">01</span>
          <div className="g-medallion">
            <img src="/illustrations/mic.webp" alt="" loading="lazy" />
          </div>
          <h3>Speak.</h3>
          <p>
            Capture the consult the way it happens — <b>ambient in the OPD</b>, a quick voice
            note after, or guided speech on rounds.
          </p>
          <div className="g-mini-ui">
            <div className="g-wave" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
          </div>
          <div className="g-mode-chips">
            <span>Ambient OPD</span>
            <span>Post-consult note</span>
            <span>Guided rounds</span>
          </div>
        </Rv>

        <Rv className="g-step" delay={2}>
          <span className="g-step-num">02</span>
          <div className="g-medallion">
            <img src="/illustrations/form.webp" alt="" loading="lazy" />
          </div>
          <h3>Verify.</h3>
          <p>
            The AI fills the right clinical form — <b>your form</b> — and shows what it heard.
            Nothing enters the record without the clinician's eyes on it.
          </p>
          <div className="g-mini-ui">
            <div className="g-frow">
              <span className="g-k">Chief complaint</span>
              <span className="g-v g-tick">✓ filled</span>
            </div>
            <div className="g-frow">
              <span className="g-k">Diagnosis</span>
              <span className="g-v g-tick">✓ filled</span>
            </div>
            <div className="g-frow">
              <span className="g-k">Dosage</span>
              <span className="g-v g-review">review</span>
            </div>
          </div>
        </Rv>

        <Rv className="g-step" delay={3}>
          <span className="g-step-num">03</span>
          <div className="g-medallion">
            <img src="/illustrations/shield.webp" alt="" loading="lazy" />
          </div>
          <h3>Seal.</h3>
          <p>
            Every field is checked against your policies before signing, then sealed —{' '}
            <b>with the audio and the policy version attached.</b>
          </p>
          <div className="g-mini-ui" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="g-seal-chip">✓ Policy check passed</span>
            <span className="g-seal-chip g-seal-chip--amber">🔒 Sealed · audio attached</span>
          </div>
        </Rv>
      </div>
    </div>
  </div>
);

interface RegisterCard {
  tint: 1 | 2 | 3 | 4 | 5;
  icon: string;
  title: string;
  blurb: string;
  rows: [string, string][];
}

const REGISTERS: RegisterCard[] = [
  {
    tint: 1,
    icon: '/illustrations/stetho.webp',
    title: 'OPD consults',
    blurb: 'Complete notes from the words you already say.',
    rows: [
      ['Vitals', '✓'],
      ['History', '✓'],
      ['Advice & Rx', '✓'],
    ],
  },
  {
    tint: 2,
    icon: '/illustrations/form.webp',
    title: 'Consent forms',
    blurb: 'Typed consent widgets — never a free-text paragraph.',
    rows: [
      ['Procedure explained', '✓'],
      ['Risks stated', '✓'],
      ['Signature', '✓'],
    ],
  },
  {
    tint: 3,
    icon: '/illustrations/policy.webp',
    title: 'Drug registers',
    blurb: 'Schedule H1 entries, three-year retention, inspection-ready.',
    rows: [
      ['Prescriber', '✓'],
      ['Patient & drug', '✓'],
      ['Quantity', '✓'],
    ],
  },
  {
    tint: 4,
    icon: '/illustrations/shield.webp',
    title: 'Incident reports',
    blurb: 'Structured, timestamped, and impossible to lose in a drawer.',
    rows: [
      ['Event captured', '✓'],
      ['Action taken', '✓'],
      ['Reported', '✓'],
    ],
  },
  {
    tint: 5,
    icon: '/illustrations/vault.webp',
    title: 'Discharge summaries',
    blurb: "Assembled from the stay's records — not memory at 9 pm.",
    rows: [
      ['Course of stay', '✓'],
      ['Medications', '✓'],
      ['Follow-up', '✓'],
    ],
  },
];

// Act 02 — pinned horizontal travel through the registers. Vertical scroll
// drives the track sideways on desktop; mobile falls back to native swipe.
export const RegistersCarousel: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useScrollFx(wrapRef, { mode: 'pin' });

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    const measure = () => {
      wrap.style.setProperty('--g-overflow', String(Math.max(0, track.scrollWidth - window.innerWidth)));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div className="g-hscroll" id="products" ref={wrapRef}>
      <div className="g-hscroll-sticky">
        <div className="g-container">
          <Rv as="span" className="g-kicker">
            <span className="g-dot" />
            Act 02 · Every register
          </Rv>
          <Rv as="h2" className="g-h2">
            The paperwork that can sink you. <span className="g-serif">Handled.</span>
          </Rv>
        </div>
        <div className="g-hscroll-track" ref={trackRef}>
          {REGISTERS.map((r) => (
            <div key={r.title} className={`g-ccard g-ccard--${r.tint}`}>
              <img className="g-spot" src={r.icon} alt="" loading="lazy" />
              <h4>{r.title}</h4>
              <p>{r.blurb}</p>
              <div className="g-ccard-ui">
                {r.rows.map(([k, v]) => (
                  <div className="g-frow" key={k}>
                    <span className="g-k">{k}</span>
                    <span className="g-v g-tick">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
