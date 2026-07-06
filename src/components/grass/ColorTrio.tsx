import React from 'react';

import { Rv } from './Rv';

// super.money-style saturated color blocks, each holding the real product.
export const ColorTrio: React.FC = () => (
  <section className="g-section" id="how-it-works">
    <div className="g-container g-center">
      <Rv as="h2" className="g-h2">
        You talk. It becomes <span className="g-hl">the record.</span>
      </Rv>
      <div className="g-trio" style={{ textAlign: 'left' }}>
        <Rv className="g-block g-block--teal" delay={1}>
          <h3>Speak, it writes.</h3>
          <p>Ambient in the OPD or a quick voice note — Hindi, English, or mixed.</p>
          <div className="g-block-app">
            <div className="g-cap" style={{ padding: 0 }}>
              <div className="g-cap-label"><i />Listening…</div>
              <div className="g-cap-name">Ravi Sharma</div>
              <div className="g-cap-meta">OPD follow-up · General Medicine</div>
              <div className="g-cap-wave">
                {Array.from({ length: 14 }, (_, i) => (
                  <i key={i} style={{ animationDelay: `${(i % 5) * 0.09}s` }} />
                ))}
              </div>
              <div className="g-cap-timer">0:42</div>
            </div>
          </div>
        </Rv>
        <Rv className="g-block g-block--lime" delay={2}>
          <h3>Checked before signed.</h3>
          <p>Every note runs against your policies — a blocking violation can't slip through.</p>
          <div className="g-block-app">
            <div className="g-check-row g-check-row--pass"><span className="g-ck-ic" /><span><b>Dosage within adult limits</b></span></div>
            <div className="g-check-row g-check-row--pass"><span className="g-ck-ic" /><span><b>Follow-up documented</b></span></div>
            <div className="g-check-row g-check-row--fail"><span className="g-ck-ic" /><span><b>Verify allergies before NSAIDs</b><span className="g-ck-note">No allergy status found.</span></span></div>
            <span className="g-ui-tag" style={{ marginTop: 10, display: 'inline-block' }}>3 of 4 clauses pass</span>
          </div>
        </Rv>
        <Rv className="g-block g-block--gold" delay={3}>
          <h3>Sealed as evidence.</h3>
          <p>Signed, audio attached, hash on every page — retrievable years later.</p>
          <div className="g-block-app">
            <div className="g-pdf-idcard" style={{ marginBottom: 8 }}>
              <span className="g-ui-avatar">RS</span>
              <div>
                <div className="g-pdf-id-name">OPD Consult — signed</div>
                <div className="g-pdf-id-meta">Dr. Nair · 4 Jul · 6:42 pm</div>
              </div>
            </div>
            <div className="g-pdf-syscard" style={{ margin: '8px 0' }}>
              <small>Controlled drug ledger</small>
              <div className="g-pdf-sys-line">℞ Paracetamol 650 mg <span className="g-ui-tag">Witness signed</span></div>
            </div>
            <div className="g-pdf-foot" style={{ padding: '6px 2px 0', background: 'none', borderTop: '1px solid #EFEFEF' }}>
              <code>SHA-256 · 7e3b1c4a9d22…</code><span>Page 1 of 2</span>
            </div>
          </div>
        </Rv>
      </div>
    </div>
  </section>
);
