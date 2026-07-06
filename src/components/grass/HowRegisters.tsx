import React from 'react';

import { Rv } from './Rv';

const hide = (e: React.SyntheticEvent<HTMLImageElement>) =>
  ((e.target as HTMLImageElement).style.display = 'none');

export const HowItWorksGrass: React.FC = () => (
  <section className="g-section g-center" id="how-it-works">
    <div className="g-container">
      <Rv as="h2" className="g-h2">
        You talk. It becomes <span className="g-hl">the record.</span>
      </Rv>
      <Rv as="p" className="g-sub" delay={1}>
        No new habits, no typing after hours. Salvia fits the way Indian clinics and wards
        already run.
      </Rv>
      <div className="g-how">
        <Rv className="g-how-item" delay={1}>
          <img src="/illustrations/ill_speak.webp" alt="A doctor speaking, sound waves flowing from a microphone" loading="lazy" onError={hide} />
          <h3 className="g-h3">Speak</h3>
          <p>
            Capture the consult the way it happens — <b>ambient in the OPD</b>, a quick voice
            note after, or guided speech on rounds.
          </p>
        </Rv>
        <Rv className="g-how-item" delay={2}>
          <img src="/illustrations/ill_verify.webp" alt="A clinical form under a magnifying glass" loading="lazy" onError={hide} />
          <h3 className="g-h3">Verify</h3>
          <p>
            The AI fills the right clinical form — <b>your form</b> — and shows what it heard.
            Nothing enters the record without the clinician's eyes on it.
          </p>
        </Rv>
        <Rv className="g-how-item" delay={3}>
          <img src="/illustrations/ill_seal.webp" alt="A document sealed inside a vault" loading="lazy" onError={hide} />
          <h3 className="g-h3">Seal</h3>
          <p>
            Every field is checked against your policies before signing, then sealed —{' '}
            <b>with the audio and the policy version attached.</b>
          </p>
        </Rv>
      </div>
    </div>
  </section>
);

const REGISTERS = [
  { icon: '/illustrations/stetho.webp', title: 'OPD consults', blurb: 'Complete notes from the words you already say.' },
  { icon: '/illustrations/form.webp', title: 'Consent forms', blurb: 'Structured consent capture — never a free-text paragraph.' },
  { icon: '/illustrations/policy.webp', title: 'Drug registers', blurb: 'Schedule H1 entries, three-year retention, inspection-ready.' },
  { icon: '/illustrations/shield.webp', title: 'Incident reports', blurb: 'Structured, timestamped, and impossible to lose in a drawer.' },
  { icon: '/illustrations/vault.webp', title: 'Discharge summaries', blurb: "Assembled from the stay's records — not memory at 9 pm." },
  { icon: '/illustrations/mic.webp', title: 'Vaccination records', blurb: 'Batch, site and schedule — captured in the same breath.' },
];

export const RegistersGrid: React.FC = () => (
  <section className="g-section" id="products">
    <div className="g-container">
      <Rv as="h2" className="g-h2">
        The paperwork that can sink you. <span className="g-hl">Handled.</span>
      </Rv>
      <Rv as="p" className="g-sub" delay={1}>
        Every register your clinic answers for, filled from the consult itself.
      </Rv>
      <div className="g-grid">
        {REGISTERS.map((r, i) => (
          <Rv className="g-card" key={r.title} delay={(Math.min(i % 3 + 1, 4)) as 1 | 2 | 3 | 4}>
            <img src={r.icon} alt="" loading="lazy" onError={hide} />
            <h3 className="g-h3">{r.title}</h3>
            <p>{r.blurb}</p>
          </Rv>
        ))}
      </div>
    </div>
  </section>
);
