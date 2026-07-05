import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import { Rv, CountUp, useScrollFx } from './Rv';

export const ClaimsBand: React.FC = () => (
  <div className="g-panel g-panel--dark" style={{ padding: '80px 0' }}>
    <div className="g-container">
      <div className="g-band-grid">
        <Rv className="g-band-item">
          <img src="/illustrations/mic.webp" alt="" loading="lazy" />
          <h4>Everything said, captured.</h4>
          <p>Audio from the OPD, the voice note, the rounds — retained and replayable.</p>
        </Rv>
        <Rv className="g-band-item" delay={1}>
          <img src="/illustrations/policy.webp" alt="" loading="lazy" />
          <h4>Every record, policy-checked.</h4>
          <p>Checked against your protocols before it's signed — not after the audit finds it.</p>
        </Rv>
        <Rv className="g-band-item" delay={2}>
          <img src="/illustrations/vault.webp" alt="" loading="lazy" />
          <h4>Sealed, with proof attached.</h4>
          <p>Signature, audio and the exact policy version — retrievable in minutes, years later.</p>
        </Rv>
      </div>
    </div>
  </div>
);

// "The six-year test" — sourced worst-day scenario. Same verified figures and
// source links as the previous SixYearTest component, in the grass language.
const STATS: { value: string; label: string }[] = [
  { value: '6 yrs', label: 'average life of a medical-negligence consumer case — the longest run 18+' },
  { value: '22%', label: 'of proven NCDRC negligence cases involved a failure to keep accurate records' },
  { value: '₹2 crore', label: 'a single NCDRC award, 2022 — benchmark awards now run ₹75 lakh to ₹11 crore' },
  { value: '19%', label: 'of civil medical-negligence cases ever reach a judgment — the rest linger for years' },
];

const SOURCES: { label: string; url: string }[] = [
  { label: 'IJME — NCDRC 5-yr review (253 cases)', url: 'https://ijme.in/articles/medical-negligence-in-cases-decided-by-the-national-consumer-disputes-redressal-commission-a-five-year-retrospective-review/' },
  { label: 'Indian J Urology — records & case law', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2779965/' },
  { label: 'NCDRC ₹2 cr award (2022)', url: 'https://indialegallive.com/constitutional-law-news/courts-news/ncdrc-awards-rs-2-crore-compensation-for-medical-negligence-after-surgeon-removes-healthy-kidney/' },
  { label: 'TNM/Newslaundry — case timelines', url: 'https://www.newslaundry.com/2024/09/28/in-kerala-medical-negligence-victims-face-a-broken-system-of-delays-and-bias' },
];

const TIMELINE: { at: string; year: string; label: string }[] = [
  { at: '2%', year: '2020', label: 'The consult' },
  { at: '34%', year: '2021', label: 'The doctor moves on' },
  { at: '67%', year: '2024', label: 'Complaint filed' },
  { at: '98%', year: '2026', label: 'Commission notice arrives' },
];

export const SixYearGrass: React.FC = () => {
  const actRef = useRef<HTMLDivElement>(null);
  useScrollFx(actRef, { mode: 'view' });

  return (
    <div className="g-act-dark g-grain" id="six-year-test" ref={actRef}>
      <div className="g-container" style={{ position: 'relative', zIndex: 2 }}>
        <Rv as="span" className="g-kicker">
          <span className="g-dot" />
          Act 03 · The six-year test
        </Rv>
        <div style={{ maxWidth: 820 }}>
          <Rv as="h2" className="g-h2">
            A complaint from 2020 just arrived. The treating doctor{' '}
            <span className="g-serif" style={{ color: 'var(--g-coral)' }}>left last year.</span>
          </Rv>
          <Rv as="p" className="g-sub" delay={1} style={{ maxWidth: 720 }}>
            The consumer commission wants the complete file — notes, consents, drug charts,
            vitals. Reconstructing it after the notice reads as concealment, and courts draw an{' '}
            <em>adverse inference</em> from records you cannot produce.{' '}
            <b>What do you hand over?</b>
          </Rv>
        </div>

        {/* the six years, drawn by scroll */}
        <div className="g-timeline" aria-hidden="true">
          <div className="g-timeline-bar" />
          {TIMELINE.map((n, i) => (
            <div
              className={`g-tl-node${i === 0 ? ' g-tl-node--first' : ''}${i === TIMELINE.length - 1 ? ' g-tl-node--last' : ''}`}
              key={n.year}
              style={{ left: n.at }}
            >
              <i />
              <b>{n.year}</b>
              <span>{n.label}</span>
            </div>
          ))}
        </div>

      <div className="g-stat-row">
        {STATS.map((s, i) => (
          <Rv className="g-stat" key={s.value} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
            <div className="g-num">{s.value}</div>
            <div className="g-lbl">{s.label}</div>
          </Rv>
        ))}
      </div>

      <Rv className="g-giant">
        <div className="g-n">
          <i>
            <CountUp value={22} suffix="%" />
          </i>
        </div>
        <div className="g-c">of proven negligence cases turned on the records, not the treatment.</div>
        <div className="g-s">IJME five-year review of 253 NCDRC judgments · second most common error category</div>
      </Rv>

      <Rv className="g-quote">
        <p>
          "Poor records mean poor defense.
          <br />
          No records mean no defense."
        </p>
        <span>Indian Journal of Urology — on medical record-keeping</span>
      </Rv>

        <Rv className="g-srcs" delay={1}>
          <Link to="/blog/consumer-court-records" style={{ fontWeight: 700, color: 'var(--g-coral)', fontSize: 13.5, fontFamily: 'var(--g-body)' }}>
            Will I lose the case if my records aren't there? →
          </Link>
          {SOURCES.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </Rv>
      </div>
    </div>
  );
};

export const ProveIt: React.FC = () => (
  <section className="g-section">
    <div className="g-container">
      <div className="g-proof-grid">
        <div>
          <Rv as="span" className="g-kicker">
            <span className="g-dot" />
            Why it holds up
          </Rv>
          <Rv as="h2" className="g-h2">
            Built for the day someone asks: <span className="g-serif">"prove it."</span>
          </Rv>
          <Rv as="p" className="g-sub" delay={1}>
            A regulator, an insurer, a consumer court, an NABH assessor. A Salvia record
            answers — with detail no reconstructed note can match.
          </Rv>
          <Rv className="g-proof" delay={1}>
            <span className="g-proof-tick">✓</span>
            <div>
              <h4>Who said what, and when</h4>
              <p>Every record traces back to the original audio and the clinician who verified and signed it.</p>
            </div>
          </Rv>
          <Rv className="g-proof" delay={2}>
            <span className="g-proof-tick">✓</span>
            <div>
              <h4>Which policy applied</h4>
              <p>Records carry the exact policy version they were checked against — even years later.</p>
            </div>
          </Rv>
          <Rv className="g-proof" delay={3}>
            <span className="g-proof-tick">✓</span>
            <div>
              <h4>Produce it in minutes</h4>
              <p>Courts may draw adverse inference when records can't be produced. Salvia retrieves the full sealed file — instantly.</p>
            </div>
          </Rv>
          <Rv className="g-reg-chips" delay={3}>
            <span>72-hour records rule · NMC Ethics Reg 1.3.2</span>
            <span>3-year retention · Reg 1.3.1</span>
            <span>EMR duty · Clinical Establishments Act</span>
            <span>CPA 2019 · consumer-court ready</span>
          </Rv>
        </div>
        <Rv className="g-vault-visual" delay={1}>
          <span className="g-vault-blob" aria-hidden="true" />
          <img src="/illustrations/vault.webp" alt="Sealed clinical evidence vault" loading="lazy" />
        </Rv>
      </div>
    </div>
  </section>
);
