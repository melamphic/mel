import React, { useState } from 'react';

import { Rv } from './Rv';

// Razorpay-style product showcase: tab bar + one large drawn product surface
// per register, at screenshot fidelity. White page; the product is the color.

const OPDNote: React.FC = () => (
  <div className="g-ui g-ui--panel">
    <div className="g-ui-head">
      <div>
        <div className="g-ui-head-title">OPD Consult — Ravi Sharma · 46 / M</div>
        <div className="g-ui-head-sub">General Medicine · 4 Jul, 11:20 am · Dr. Nair</div>
      </div>
      <span className="g-ui-tag">Policy check passed</span>
    </div>
    <div style={{ padding: '10px 16px 14px' }}>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Chief complaint</span>
        <span className="g-ui-f-value">Fever × 3 days, headache</span>
        <span className="g-ui-conf">AI · 98%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Vitals</span>
        <span className="g-ui-f-value">BP 130/85 · Temp 99.8°F · PR 88</span>
        <span className="g-ui-conf">AI · 97%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Examination</span>
        <span className="g-ui-f-value">Throat congestion, no organomegaly</span>
        <span className="g-ui-conf">AI · 95%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Rx</span>
        <span className="g-ui-f-value">Paracetamol 650 mg · TDS × 3d</span>
        <span className="g-ui-conf">AI · 99%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Advice</span>
        <span className="g-ui-f-value">Fluids, rest · review Monday</span>
        <span className="g-ui-conf">AI · 96%</span>
      </div>
      <div className="g-ui-meta-row">
        <span className="g-ui-audio-play"><i />Original audio · 0:42</span>
        <span className="g-ui-tag g-ui-tag--ink">hi-IN + en</span>
        <span className="g-ui-tag g-ui-tag--ink">Verified by Dr. Nair</span>
      </div>
    </div>
  </div>
);

const Consent: React.FC = () => (
  <div className="g-ui g-ui--panel">
    <div className="g-ui-head">
      <div>
        <div className="g-ui-head-title">Consent — Tooth extraction (47)</div>
        <div className="g-ui-head-sub">Meera Pillai · 34 / F · Dental · 4 Jul</div>
      </div>
      <span className="g-ui-tag">Captured</span>
    </div>
    <div style={{ padding: '12px 16px 16px' }}>
      <div className="g-ui-consent-row"><span className="g-ui-checkbox" />Procedure explained in the patient's language — Malayalam</div>
      <div className="g-ui-consent-row"><span className="g-ui-checkbox" />Risks discussed: bleeding, dry socket, infection</div>
      <div className="g-ui-consent-row"><span className="g-ui-checkbox" />Alternatives discussed, questions answered</div>
      <div className="g-ui-consent-row"><span className="g-ui-checkbox" />Consent given freely, fit to consent</div>
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-end', marginTop: 14 }}>
        <div className="g-ui-sign-pad">
          <svg width="110" height="30" viewBox="0 0 110 30" fill="none">
            <path d="M6 22c9-12 14-14 17-9s2 11 7 9 8-13 14-13 5 12 11 12 9-10 15-10 7 9 13 9 9-6 13-8" stroke="#16181D" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          </svg>
          <div style={{ fontSize: 9.5, color: 'var(--g-ink-faint)', fontWeight: 700, marginTop: 2 }}>Patient signature</div>
        </div>
        <div className="g-ui-sign-pad">
          <svg width="90" height="30" viewBox="0 0 90 30" fill="none">
            <path d="M6 20c7-9 11-11 14-6s3 9 8 7 6-10 12-10 5 9 10 9 8-7 13-7 6 6 11 6" stroke="#16181D" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          </svg>
          <div style={{ fontSize: 9.5, color: 'var(--g-ink-faint)', fontWeight: 700, marginTop: 2 }}>Witness · Staff nurse</div>
        </div>
        <span className="g-ui-tag g-ui-tag--ink" style={{ marginLeft: 'auto' }}>Sealed with note</span>
      </div>
    </div>
  </div>
);

const DrugRegister: React.FC = () => (
  <div className="g-ui g-ui--panel">
    <div className="g-ui-head">
      <div>
        <div className="g-ui-head-title">Drug register — Schedule H1</div>
        <div className="g-ui-head-sub">July 2026 · 3-year retention · inspection-ready</div>
      </div>
      <span className="g-ui-tag">Balanced</span>
    </div>
    <table className="g-ui-table">
      <thead>
        <tr><th>Date</th><th>Patient</th><th>Drug &amp; strength</th><th>Qty</th><th>Prescriber</th><th>Balance</th></tr>
      </thead>
      <tbody>
        <tr><td className="g-dim">4 Jul</td><td>Ravi Sharma</td><td>Azithromycin 500 mg</td><td>3</td><td className="g-dim">Dr. Nair</td><td>42</td></tr>
        <tr><td className="g-dim">4 Jul</td><td>Meera Pillai</td><td>Tramadol 50 mg</td><td>6</td><td className="g-dim">Dr. Rao</td><td>118</td></tr>
        <tr><td className="g-dim">3 Jul</td><td>Joseph K</td><td>Alprazolam 0.25 mg</td><td>10</td><td className="g-dim">Dr. Nair</td><td>60</td></tr>
        <tr><td className="g-dim">3 Jul</td><td>Fatima B</td><td>Codeine syrup 100 ml</td><td>1</td><td className="g-dim">Dr. Rao</td><td>11</td></tr>
      </tbody>
    </table>
    <div className="g-ui-meta-row" style={{ padding: '12px 16px 14px' }}>
      <span className="g-ui-tag g-ui-tag--ink">Rule 65(3)(h), D&amp;C Rules</span>
      <span className="g-ui-tag g-ui-tag--ink">Every row traceable to a signed note</span>
    </div>
  </div>
);

const Incidents: React.FC = () => (
  <div className="g-ui g-ui--panel">
    <div className="g-ui-head">
      <div>
        <div className="g-ui-head-title">Incident log</div>
        <div className="g-ui-head-sub">Structured, timestamped, reviewed</div>
      </div>
      <span className="g-ui-tag">2 open</span>
    </div>
    <table className="g-ui-table">
      <thead>
        <tr><th>When</th><th>Incident</th><th>Severity</th><th>Action taken</th><th>Status</th></tr>
      </thead>
      <tbody>
        <tr><td className="g-dim">4 Jul, 3:10 pm</td><td>Needle-stick — staff nurse</td><td>Moderate</td><td className="g-dim">PEP started, reported</td><td><span className="g-ui-tag">Reviewed</span></td></tr>
        <tr><td className="g-dim">2 Jul, 9:40 am</td><td>Medication near-miss</td><td>Low</td><td className="g-dim">Double-check added</td><td><span className="g-ui-tag">Reviewed</span></td></tr>
        <tr><td className="g-dim">28 Jun, 6:05 pm</td><td>Patient fall — waiting area</td><td>Moderate</td><td className="g-dim">Family informed, X-ray</td><td><span className="g-ui-tag g-ui-tag--ink">CAPA open</span></td></tr>
      </tbody>
    </table>
    <div className="g-ui-meta-row" style={{ padding: '12px 16px 14px' }}>
      <span className="g-ui-tag g-ui-tag--ink">NABH incident reporting trail</span>
    </div>
  </div>
);

const Discharge: React.FC = () => (
  <div className="g-ui g-ui--panel">
    <div className="g-ui-head">
      <div>
        <div className="g-ui-head-title">Discharge summary — Joseph K · 58 / M</div>
        <div className="g-ui-head-sub">IP 2214 · Admitted 28 Jun → Discharged 4 Jul</div>
      </div>
      <span className="g-ui-tag">Assembled from stay</span>
    </div>
    <div style={{ padding: '10px 16px 14px' }}>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Diagnosis</span>
        <span className="g-ui-f-value">Community-acquired pneumonia</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Course</span>
        <span className="g-ui-f-value">IV antibiotics D1–D4, afebrile from D3</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Meds at discharge</span>
        <span className="g-ui-f-value">Amoxiclav 625 · BD × 5d</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Follow-up</span>
        <span className="g-ui-f-value">Chest OPD · 11 Jul · Dr. Rao</span>
      </div>
      <div className="g-ui-meta-row">
        <span className="g-ui-tag g-ui-tag--ink">Built from 14 sealed notes</span>
        <span className="g-ui-tag g-ui-tag--ink">PDF · clinic letterhead</span>
      </div>
    </div>
  </div>
);

const TABS = [
  { key: 'opd', label: 'OPD notes', el: <OPDNote /> },
  { key: 'consent', label: 'Consent', el: <Consent /> },
  { key: 'drugs', label: 'Drug register', el: <DrugRegister /> },
  { key: 'incidents', label: 'Incidents', el: <Incidents /> },
  { key: 'discharge', label: 'Discharge', el: <Discharge /> },
];

export const RegisterShowcase: React.FC = () => {
  const [tab, setTab] = useState('opd');
  const active = TABS.find((t) => t.key === tab) ?? TABS[0];
  return (
    <section className="g-section g-section--muted" id="products">
      <div className="g-container">
        <Rv as="h2" className="g-h2">
          The paperwork that can sink you. <span className="g-hl">Handled.</span>
        </Rv>
        <Rv as="p" className="g-sub" delay={1}>
          Every register your clinic answers for, filled from the consult itself — and every
          row traceable back to a sealed, signed note.
        </Rv>
        <Rv delay={2}>
          <div className="g-tabs" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                className={`g-tab${tab === t.key ? ' g-tab--on' : ''}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="g-showcase">
            <div className="g-showcase-inner" key={active.key}>
              {active.el}
            </div>
          </div>
        </Rv>
      </div>
    </section>
  );
};
