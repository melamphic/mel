import React from 'react';
import { Link } from 'react-router-dom';

import { Rv, CountUp } from './Rv';

// "The six-year test" — sourced worst-day scenario. Same verified figures and
// source links as the previous SixYearTest component.
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

export const SixYearGrass: React.FC = () => (
  <section className="g-section" id="six-year-test">
    <div className="g-container">
      <div style={{ maxWidth: 780 }}>
        <Rv as="h2" className="g-h2">
          A complaint from 2020 just arrived. The treating doctor left last year.
        </Rv>
        <Rv as="p" className="g-sub" delay={1} style={{ maxWidth: 720 }}>
          The consumer commission wants the complete file — notes, consents, drug charts,
          vitals. Reconstructing it after the notice reads as concealment, and courts draw an{' '}
          <em>adverse inference</em> from records you cannot produce.{' '}
          <b>What do you hand over?</b>
        </Rv>
      </div>

      <div className="g-stats">
        {STATS.map((s, i) => (
          <Rv className="g-stat" key={s.value} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
            <div className="g-num">{s.value}</div>
            <div className="g-lbl">{s.label}</div>
          </Rv>
        ))}
      </div>

      <Rv className="g-giant">
        <div className="g-n">
          <CountUp value={22} suffix="%" />
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
        <span>— Indian Journal of Urology, on medical record-keeping</span>
      </Rv>

      <Rv className="g-srcs" delay={1}>
        <Link to="/blog/consumer-court-records" style={{ fontWeight: 600, color: 'var(--g-green)', fontSize: 13, fontFamily: 'var(--g-font)' }}>
          Will I lose the case if my records aren't there? →
        </Link>
        {SOURCES.map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
      </Rv>
    </div>
  </section>
);

export const ProveIt: React.FC = () => (
  <section className="g-section">
    <div className="g-container">
      <div className="g-split">
        <div>
          <Rv as="h2" className="g-h2">
            Built for the day someone asks: <span className="g-hl">"prove it."</span>
          </Rv>
          <Rv as="p" className="g-sub" delay={1}>
            A regulator, an insurer, a consumer court, an NABH assessor. A Salvia record
            answers — with detail no reconstructed note can match.
          </Rv>
          <Rv className="g-check" delay={1}>
            <span className="g-ck">✓</span>
            <div>
              <h4>Who said what, and when</h4>
              <p>Every record traces back to the original audio and the clinician who verified and signed it.</p>
            </div>
          </Rv>
          <Rv className="g-check" delay={2}>
            <span className="g-ck">✓</span>
            <div>
              <h4>Which policy applied</h4>
              <p>Records carry the exact policy version they were checked against — even years later.</p>
            </div>
          </Rv>
          <Rv className="g-check" delay={3}>
            <span className="g-ck">✓</span>
            <div>
              <h4>Produce it in minutes</h4>
              <p>Courts may draw adverse inference when records can't be produced. Salvia retrieves the full sealed file — instantly.</p>
            </div>
          </Rv>
          <Rv as="p" className="g-small" delay={3} style={{ marginTop: 26 }}>
            Aligned with the 72-hour records rule (NMC Ethics Reg 1.3.2), 3-year retention
            (Reg 1.3.1), the Clinical Establishments Act EMR duty, and CPA 2019.
          </Rv>
        </div>
        <Rv className="g-split-art" delay={1}>
          <img
            src="/illustrations/ill_seal.webp"
            alt="A clinical record sealed inside a vault"
            loading="lazy"
            onError={(e) => ((e.target as HTMLImageElement).src = '/illustrations/vault.webp')}
          />
        </Rv>
      </div>
    </div>
  </section>
);
