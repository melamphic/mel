import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { Rv } from '../components/grass/Rv';

// /general-practice — the vertical page for GPs and general clinics.
// Story: NMC/NABH/ABDM-ready records from a voice note; prescribing log,
// referral trail and consent handled. Grass design language.

const REGULATORS = ['NMC', 'NABH', 'ABDM', 'CEA 2010', 'CGHS / PM-JAY', 'DPDP Act'];

const FAQS = [
  {
    q: 'Which regulatory frameworks does Salvia support for general practice?',
    a: 'Salvia keeps records aligned with NMC clinical record-keeping requirements, the Clinical Establishments Act 2010 register and documentation norms, NABH documentation standards, and CGHS / PM-JAY (AB-PMJAY) claim record needs.',
  },
  {
    q: 'Does it handle controlled drug and prescribing records?',
    a: 'Yes. Every prescription and controlled substance administration is logged with the required fields — drug, dose, route, patient, date, prescribing doctor. Schedule X and other controlled drugs maintain a running register with witness fields.',
  },
  {
    q: 'How does it handle after-hours and locum documentation?',
    a: 'Locum records are signed by the treating doctor with their own NMC registration number. The practice record shows exactly who saw the patient and when — no ambiguity about authorship for complaints or audits.',
  },
  {
    q: 'Can it be used for multi-doctor practices?',
    a: "Yes. Role-based access means each doctor signs their own records. Practice managers can view the full practice record set. Each clinician's records are independent and auditable separately.",
  },
];

const RECORD_CARDS: { img: string; label: string; value: string }[] = [
  { img: '/illustrations/tpl_cd_register.webp', label: 'Prescribing & drug register', value: 'Drug, dose, route, indication on every script; controlled register maintained on administration.' },
  { img: '/illustrations/tpl_referral.webp', label: 'Referral & follow-up trail', value: 'Sent, received, follow-up due — one trail. No lost-in-the-system defence needed.' },
  { img: '/illustrations/vet_estimate.webp', label: 'Consent documentation', value: 'Procedure-specific consent with risk discussion, signed before invasive procedures.' },
  { img: '/illustrations/shield_cross.webp', label: 'Immutable audit trail', value: 'Every edit and addendum locked with a timestamp; the full encounter file in seconds.' },
];

const BEFORE_FACTS: { label: string; value: string }[] = [
  { label: 'End of day', value: 'Catch-up on records — some details remembered, some not' },
  { label: 'Drug register', value: 'Kept by hand; the register drifts and the inspector finds a gap' },
  { label: 'Referrals', value: 'Sent, then the patient drops off the radar' },
  { label: 'Locums', value: 'Different note style, different completeness' },
  { label: 'The inspector asks', value: 'A long search for one consent record' },
];

const AFTER_FACTS: { label: string; value: string }[] = [
  { label: 'End of consult', value: 'Speak in any Indian language; a structured SOAP record before you leave the room' },
  { label: 'Drug register', value: 'Every prescription logged; controlled register accurate and witnessed' },
  { label: 'Referrals', value: 'Sent + receipt + follow-up captured in one defensible trail' },
  { label: 'Locums', value: 'Every clinician signs with their own NMC registration' },
  { label: 'The inspector asks', value: 'Filter and export in seconds' },
];

const SCOPE_DO: { title: string; body: string }[] = [
  { title: 'Voice → clinical note', body: 'Audio in any Indian language becomes a structured SOAP record — history, examination, assessment, plan — with a timestamp on every entry.' },
  { title: 'Prescribing + drug register', body: 'Every prescription logged with drug, dose, route and indication; the controlled register maintained automatically.' },
  { title: 'Referral and follow-up trail', body: 'Referral sent, received and follow-up due, tracked in the record.' },
  { title: 'Immutable audit trail', body: 'Aligned to NMC record-keeping norms, NABH documentation and the Clinical Establishments Act — with ABHA-ready, FHIR-structured output.' },
  { title: 'Multi-doctor practice', body: 'Role-based access for nurses, reception and admin; each doctor signs and audits independently.' },
];

const SCOPE_DONT: string[] = [
  'Replace your practice management software',
  'Connect to ABDM / national health systems yet (ABHA-ready output, full integration coming)',
  'Make you NABH-accredited or claim regulatory sign-off on your behalf',
  'Auto-publish records without your review',
  'Provide clinical decision-making — you stay in the loop',
];

// Drawn product UI: a GP consult record.
const GPConsultPanel = () => (
  <div className="g-ui g-ui--panel">
    <div className="g-ui-head">
      <div>
        <div className="g-ui-head-title">Consult — Lakshmi Devi · 62 / F</div>
        <div className="g-ui-head-sub">General Medicine · 6 Jul, 9:40 am · Dr. Varma</div>
      </div>
      <span className="g-ui-tag">Policy check passed</span>
    </div>
    <div style={{ padding: '10px 16px 14px' }}>
      <div className="g-ui-field">
        <span className="g-ui-f-label">History</span>
        <span className="g-ui-f-value">T2DM follow-up · occasional giddiness</span>
        <span className="g-ui-conf">AI · 97%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Vitals</span>
        <span className="g-ui-f-value">BP 150/90 · RBS 178 · PR 84</span>
        <span className="g-ui-conf">AI · 98%</span>
      </div>
      <div className="g-ui-evidence">"…BP ek sau pachaas by nabbe… sugar random ek sau athattar…"</div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Assessment</span>
        <span className="g-ui-f-value">Suboptimal glycaemic control<span className="g-ui-badge-edited">EDITED</span></span>
        <span className="g-ui-conf g-ui-conf--med"><span className="g-ui-glyph">≈</span>AI · 72%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Plan</span>
        <span className="g-ui-f-value">Metformin revised 1 g BD · HbA1c ordered · review 2 wks</span>
        <span className="g-ui-conf">AI · 98%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Rx logged</span>
        <span className="g-ui-f-value">Metformin 1 g BD × 14 d — prescribing log</span>
        <span className="g-ui-conf">AI · 99%</span>
      </div>
      <div className="g-ui-meta-row">
        <span className="g-ui-audio-play"><i />Original audio · 0:47</span>
        <span className="g-ui-tag g-ui-tag--ink">hi-IN + en</span>
        <span className="g-ui-tag g-ui-tag--ink">Signed — Dr. Varma · NMC reg. no.</span>
      </div>
    </div>
  </div>
);

// Drawn product UI: the prescribing log / controlled register.
const PrescribingLogPanel = () => (
  <div className="g-ui g-ui--panel">
    <div className="g-ui-head">
      <div>
        <div className="g-ui-head-title">Prescribing log — controlled drug register</div>
        <div className="g-ui-head-sub">Schedule X witness fields · running balance</div>
      </div>
      <span className="g-ui-tag">Balanced</span>
    </div>
    <table className="g-ui-table">
      <thead>
        <tr><th>Date</th><th>Patient</th><th>Drug &amp; dose</th><th>Indication</th><th>Doctor</th><th>Balance</th></tr>
      </thead>
      <tbody>
        <tr><td className="g-dim">6 Jul</td><td>Suresh M</td><td>Alprazolam 0.25 mg × 10</td><td>Anxiety — short course</td><td className="g-dim">Dr. Varma</td><td>54</td></tr>
        <tr><td className="g-dim">5 Jul</td><td>Fatima B</td><td>Tramadol 50 mg × 6</td><td>Post-op pain</td><td className="g-dim">Dr. Rao</td><td>112</td></tr>
        <tr><td className="g-dim">5 Jul</td><td>Lakshmi Devi</td><td>Metformin 1 g × 28</td><td>T2DM</td><td className="g-dim">Dr. Varma</td><td className="g-dim">—</td></tr>
        <tr><td className="g-dim">4 Jul</td><td>Joseph K</td><td>Codeine syrup 100 ml</td><td>Dry cough</td><td className="g-dim">Dr. Rao</td><td>9</td></tr>
      </tbody>
    </table>
    <div className="g-ui-meta-row" style={{ padding: '12px 16px 14px' }}>
      <span className="g-ui-tag g-ui-tag--ink">Witnessed entries for controlled drugs</span>
      <span className="g-ui-tag g-ui-tag--ink">Every row traceable to a signed note</span>
    </div>
  </div>
);

export const GeneralClinicPage = () => {
  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });

  return (
    <>
      <SEO
        title="General Practice Compliance Software"
        description="Salvia keeps clinic and general practice records audit-ready for NMC, NABH, and ABDM. Voice note in any Indian language after each consult — structured clinical records, prescribing logs, referral trails, and consent documentation."
        path="/general-practice"
        keywords={[
          'general practice compliance software', 'clinic records software', 'NMC record-keeping',
          'ABDM medical records', 'NABH documentation', 'clinical documentation doctor',
          'general clinic audit trail', 'prescribing records software India',
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <GrassHeader />
      <main style={{ flex: 1, zIndex: 10, background: '#fff' }}>

        {/* Hero */}
        <section className="g-section" style={{ padding: '148px 0 72px' }}>
          <div className="g-container">
            <div className="g-split">
              <div>
                <Rv as="h1" className="g-h1" style={{ fontSize: 'clamp(38px, 4.6vw, 66px)', marginBottom: 20 }}>
                  Clinical records that <span className="g-hl">hold up under scrutiny.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  NMC, NABH, ABDM. Speak in any Indian language after each consult — Salvia
                  structures the <b>clinical record, prescribing log, referral trail and
                  consent</b>. Audit-ready before you leave the room.
                </Rv>
                <Rv className="g-hero-ctas" delay={2} style={{ justifyContent: 'flex-start', marginTop: 30 }}>
                  <Link className="g-btn g-btn--green" to="/start">
                    Book a demo
                  </Link>
                  <Link className="g-btn g-btn--ghost" to="/pricing">
                    See pricing
                  </Link>
                </Rv>
              </div>
              <Rv className="g-split-art" delay={1}>
                <img
                  src="/illustrations/clinic_world.webp"
                  alt="A miniature general practice clinic where a consult becomes documents sealed in a vault"
                />
              </Rv>
            </div>
            <Rv delay={3} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 52 }}>
              <span className="g-small" style={{ fontWeight: 600 }}>Designed for</span>
              {REGULATORS.map((r) => (
                <span
                  key={r}
                  style={{
                    fontFamily: 'var(--g-font)', fontSize: 12.5, fontWeight: 700,
                    color: 'var(--g-ink-soft)', border: '1px solid var(--g-line)',
                    borderRadius: 999, padding: '5px 13px',
                  }}
                >
                  {r}
                </span>
              ))}
            </Rv>
          </div>
        </section>

        {/* Voice → clinical note */}
        <section className="g-section">
          <div className="g-container">
            <div className="g-split">
              <div>
                <Rv as="h2" className="g-h2">
                  Speak the consult. <span className="g-hl">Sign the record.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  A 30-second voice note after each patient — Malayalam, Hindi, English or all
                  three in one sentence — becomes a structured SOAP record: <b>history,
                  examination, assessment, plan</b>, with every prescription logged. You review
                  and sign; the original audio stays attached as evidence.
                </Rv>
                <Rv className="g-facts" delay={2}>
                  <div className="g-fact"><span>Record norms</span><b>NMC contemporaneous record-keeping</b></div>
                  <div className="g-fact"><span>Prescriptions</span><b>Drug, dose, route, indication — every script</b></div>
                  <div className="g-fact"><span>Locums</span><b>Each doctor signs with their own NMC reg.</b></div>
                  <div className="g-fact"><span>Output</span><b>ABHA-ready, FHIR-structured records</b></div>
                </Rv>
              </div>
              <Rv className="g-split-art" delay={1} style={{ display: 'block' }}>
                <GPConsultPanel />
              </Rv>
            </div>
          </div>
        </section>

        {/* Prescribing log */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              Prescribing that <span className="g-hl">defends itself.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              Every prescription carries its indication, and controlled drugs keep a witnessed
              running register — filled from the consult itself, not reconstructed the night
              before an inspection.
            </Rv>
            <Rv delay={2} style={{ marginTop: 44 }}>
              <div className="g-showcase">
                <PrescribingLogPanel />
              </div>
            </Rv>
          </div>
        </section>

        {/* The records a regulator expects */}
        <section className="g-section g-center">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              Every record a regulator <span className="g-hl">expects to see.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              The four trails that decide complaints and inspections — all of them by-products
              of everyday Salvia use.
            </Rv>
            <div className="g-tpl-grid" style={{ textAlign: 'left', marginTop: 52 }}>
              {RECORD_CARDS.map((f, i) => (
                <Rv className="g-card" key={f.label} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                  <img src={f.img} alt="" loading="lazy" />
                  <h3 className="g-h3" style={{ fontSize: 17 }}>{f.label}</h3>
                  <p>{f.value}</p>
                </Rv>
              ))}
            </div>
          </div>
        </section>

        {/* Before / after */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              What changes <span className="g-hl">on day one.</span>
            </Rv>
            <div className="g-split" style={{ alignItems: 'start', marginTop: 40 }}>
              <Rv delay={1}>
                <h3 className="g-h3">Without Salvia</h3>
                <div className="g-facts" style={{ marginTop: 16 }}>
                  {BEFORE_FACTS.map((f) => (
                    <div className="g-fact" key={f.label}>
                      <span>{f.label}</span>
                      <b>{f.value}</b>
                    </div>
                  ))}
                </div>
              </Rv>
              <Rv delay={2}>
                <h3 className="g-h3">
                  With <span className="g-hl">Salvia</span>
                </h3>
                <div className="g-facts" style={{ marginTop: 16 }}>
                  {AFTER_FACTS.map((f) => (
                    <div className="g-fact" key={f.label}>
                      <span>{f.label}</span>
                      <b>{f.value}</b>
                    </div>
                  ))}
                </div>
              </Rv>
            </div>
          </div>
        </section>

        {/* Honest scope */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              What it does — <span className="g-hl">and what it doesn't.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              Salvia is the compliance and records layer that sits alongside your practice
              software. It never replaces booking or billing, and it never signs for you.
            </Rv>
            <div className="g-split" style={{ alignItems: 'start', marginTop: 24 }}>
              <div>
                {SCOPE_DO.map((s, i) => (
                  <Rv className="g-check" key={s.title} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                    <span className="g-ck">✓</span>
                    <div>
                      <h4>{s.title}</h4>
                      <p>{s.body}</p>
                    </div>
                  </Rv>
                ))}
              </div>
              <Rv delay={2}>
                <h3 className="g-h3" style={{ marginTop: 22 }}>Salvia won't</h3>
                <div className="g-facts" style={{ marginTop: 14 }}>
                  {SCOPE_DONT.map((line) => (
                    <div className="g-fact" key={line} style={{ justifyContent: 'flex-start' }}>
                      <span style={{ flex: 'none' }}>✕</span>
                      <b style={{ textAlign: 'left', fontWeight: 500, color: 'var(--g-ink-soft)' }}>{line}</b>
                    </div>
                  ))}
                </div>
              </Rv>
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="g-section g-center">
          <div className="g-container">
            <Rv delay={1}>
              <img
                src="/illustrations/mic.webp"
                alt=""
                loading="lazy"
                style={{ width: 120, height: 'auto', margin: '0 auto 18px', display: 'block' }}
              />
            </Rv>
            <Rv as="h2" className="g-h2">
              From ₹999 a month. <span className="g-hl">Everything included.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              The Starter plan covers 400 AI notes a month with the full compliance suite —
              drug register, consent, incidents, branded PDF export — and <b>unlimited
              staff</b>. You pay per note, never per doctor.
            </Rv>
            <Rv className="g-hero-ctas" delay={2} style={{ marginTop: 30 }}>
              <Link className="g-btn g-btn--green" to="/start">
                Start free
              </Link>
              <Link className="g-btn g-btn--ghost" to="/pricing">
                Full pricing
              </Link>
            </Rv>
            <Rv as="p" className="g-hero-note" delay={3}>
              First 50 notes free · Annual billing = 2 months free · Prices exclude GST
            </Rv>
          </div>
        </section>

        {/* FAQ */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              What general practices <span className="g-hl">ask us.</span>
            </Rv>
            <div style={{ maxWidth: 820, marginTop: 40 }}>
              {FAQS.map((faq, i) => (
                <Rv key={faq.q} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4} style={{ borderTop: '1px solid var(--g-line-soft)', padding: '26px 0' }}>
                  <h3 className="g-h3" style={{ marginBottom: 8 }}>{faq.q}</h3>
                  <p style={{ fontFamily: 'var(--g-font)', fontSize: 15, color: 'var(--g-ink-soft)', lineHeight: 1.7, margin: 0 }}>
                    {faq.a}
                  </p>
                </Rv>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="g-final">
          <div className="g-container">
            <div className="g-final-grid">
              <div>
                <Rv as="h2" className="g-h2">
                  Defensible records, <span className="g-hl">every consult.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1} style={{ marginTop: 14 }}>
                  Book a 20-minute demo to see how Salvia works in a GP or general clinic
                  workflow — no slides, no pitch.
                </Rv>
                <Rv className="g-hero-ctas" delay={2} style={{ marginTop: 30 }}>
                  <Link className="g-btn g-btn--green" to="/start">
                    Book a demo
                  </Link>
                  <Link className="g-btn g-btn--ghost" to="/start">
                    Start free
                  </Link>
                </Rv>
              </div>
              <Rv className="g-final-art" delay={1}>
                <img
                  src="/illustrations/ill_speak.webp"
                  alt="A doctor speaking with a microphone capturing the consult"
                  loading="lazy"
                />
              </Rv>
            </div>
          </div>
        </section>

      </main>
      <GrassFooter />
    </>
  );
};
