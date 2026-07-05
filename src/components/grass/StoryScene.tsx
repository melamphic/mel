import React, { useRef } from 'react';

import { useScrollFx } from './Rv';

// Act 01 — the pinned product story. One consult, four beats, driven by
// scroll: spoken words → form fills itself → policy check → sealed record.
// On mobile the scenes stack statically (no pinning).

export const StoryScene: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useScrollFx(ref, { mode: 'pin', stages: [0, 0.28, 0.56, 0.82] });

  return (
    <div className="g-story" id="how-it-works" ref={ref} data-stage="1">
      <div className="g-story-sticky g-grain">
        <div className="g-story-progress" aria-hidden="true">
          <i /><i /><i /><i />
        </div>
        <div className="g-story-head">
          <span className="g-kicker">
            <span className="g-dot" />
            Act 01 · How it works
          </span>
          <h2 className="g-h2">
            Watch one consult become <span className="g-serif">evidence.</span>
          </h2>
        </div>

        <div className="g-story-stage">
          {/* Beat 1 — spoken */}
          <Scene on="1">
            <span className="g-scene-label">01 · The doctor speaks</span>
            <div className="g-wave g-wave--story" aria-hidden="true">
              {Array.from({ length: 22 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
            <p className="g-spoken">
              <span className="g-said g-said--1">"Sharma ji, BP aaj 140 over 90 hai…</span>{' '}
              <span className="g-said g-said--2">paracetamol 500, do baar, khane ke baad…</span>{' '}
              <span className="g-said g-said--3">Friday ko follow-up."</span>
            </p>
          </Scene>

          {/* Beat 2 — the form fills itself */}
          <Scene on="2">
            <span className="g-scene-label">02 · The form fills itself</span>
            <div className="g-formcard">
              <h5>
                OPD Consult — General Medicine <span>Dr. Nair</span>
              </h5>
              <div className="g-fill-row">
                <span className="g-k">Chief complaint</span>
                <span className="g-v">Headache, 3 days</span>
              </div>
              <div className="g-fill-row">
                <span className="g-k">Blood pressure</span>
                <span className="g-v">
                  140/90 <span className="g-review">· review</span>
                </span>
              </div>
              <div className="g-fill-row">
                <span className="g-k">Rx</span>
                <span className="g-v">Paracetamol 500mg · BD · after food</span>
              </div>
              <div className="g-fill-row">
                <span className="g-k">Follow-up</span>
                <span className="g-v">Friday OPD</span>
              </div>
            </div>
            <p className="g-scene-note">Nothing enters the record without the clinician's eyes on it.</p>
          </Scene>

          {/* Beat 3 — policy check */}
          <Scene on="3">
            <span className="g-scene-label">03 · Checked against your policies</span>
            <div className="g-policy-scan">
              <div className="g-policy-row"><span className="g-pt">✓</span> Vitals recorded for hypertensive patient</div>
              <div className="g-policy-row"><span className="g-pt">✓</span> Dosage within adult limits</div>
              <div className="g-policy-row"><span className="g-pt">✓</span> Follow-up documented</div>
              <div className="g-policy-row"><span className="g-pt">✓</span> Checked against Clinic Policy v3.2</div>
            </div>
            <p className="g-scene-note">Before it's signed — not after the audit finds it.</p>
          </Scene>

          {/* Beat 4 — sealed */}
          <Scene on="4">
            <span className="g-scene-label">04 · Sealed as evidence</span>
            <div className="g-sealcard">
              <span className="g-seal-stamp">SEALED</span>
              <h5 style={{ fontFamily: 'var(--g-display)', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>
                OPD Consult — verified &amp; signed
              </h5>
              <p style={{ fontSize: 14.5, color: 'var(--g-ink-soft)' }}>
                Signed by Dr. Nair · 6:42 pm · original audio and policy version attached.
              </p>
              <div className="g-seal-meta">
                <span className="g-seal-chip">🎙 Audio attached</span>
                <span className="g-seal-chip">📋 Policy v3.2</span>
                <span className="g-seal-chip g-seal-chip--amber">Retrievable in minutes, years later</span>
              </div>
            </div>
          </Scene>
        </div>
      </div>
    </div>
  );
};

const Scene: React.FC<{ on: string; children: React.ReactNode }> = ({ on, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  // Scene visibility is CSS-driven off the parent's data-stage.
  return (
    <div className={`g-scene g-scene--${on}`} ref={ref}>
      {children}
    </div>
  );
};
