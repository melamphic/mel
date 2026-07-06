import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { CountUp, Rv } from '../components/grass/Rv';

// /veterinary — the vertical page for Indian vet practices.
// Story: one voice note per consult; VCI / IVC Act 1984 / Schedule H1
// records stay audit-ready every day. Redesigned in the .g-* (grass)
// language: white page, Archivo, green accent, drawn product UI.

const REGULATORS = ['VCI', 'IVC Act 1984', 'Schedule H1', 'CCSEA', 'State Councils', 'DPDP Act'];

const FAQS = [
  {
    q: 'Does Salvia work for Indian vets under VCI requirements?',
    a: 'Yes. Salvia keeps your clinical documentation and daily records audit-ready against the Indian Veterinary Council Act 1984 and your state veterinary council expectations: structured case records, written treatment estimates, controlled drug logs, and complaint audit trails. It does not make your practice accredited — it makes sure that when an assessor asks, your records are ready.',
  },
  {
    q: 'Does it handle the Schedule H1 controlled drug register?',
    a: 'Yes. Every drug administration flows into the controlled drug register automatically — date, patient, drug, quantity, dose, route, administering vet. Running balance is maintained. The register is audit-ready on demand, in line with Schedule H1 of the Drugs & Cosmetics Act.',
  },
  {
    q: 'Is it compatible with our existing practice management software?',
    a: 'Salvia sits alongside your PMS — it handles the compliance and records layer (structured records, drug logs, consent, audit trail) rather than replacing appointment booking or billing.',
  },
  {
    q: 'What regulatory frameworks does it support?',
    a: 'The Indian Veterinary Council Act 1984, VCI standards of professional conduct, state veterinary council requirements, CCSEA animal-ethics expectations, Schedule H1 of the Drugs & Cosmetics Act, and the DPDP Act for data protection.',
  },
  {
    q: 'How does the voice note workflow work?',
    a: 'After each consult, you leave a brief voice note in any Indian language — anything from 30 seconds to a few minutes. Salvia maps the audio to a structured clinical record: history, exam findings, assessment, plan, drugs administered. You review and sign. No typing, no templates to fill.',
  },
];

const DAILY_RECORDS: { img: string; label: string; value: string }[] = [
  { img: '/illustrations/vet_billing.webp', label: 'Itemised billing', value: 'Every line maps to the clinical record behind it.' },
  { img: '/illustrations/vet_estimate.webp', label: 'Written estimates', value: 'Signed before treatment, locked to the record.' },
  { img: '/illustrations/tpl_cd_register.webp', label: 'Schedule H1 drug logs', value: 'Running balance always accurate, witness fields filled.' },
  { img: '/illustrations/vet_shield_paw.webp', label: 'Complaint trail', value: 'The full encounter record, produced in seconds.' },
];

const BEFORE_FACTS: { label: string; value: string }[] = [
  { label: 'End of day', value: 'Typing into a generic SOAP template — or end-of-week catch-up' },
  { label: 'Drug register', value: 'Kept on paper; the running balance drifts and the inspector finds gaps' },
  { label: 'Estimates', value: 'Given verbally; the owner disputes the bill and there is no paper trail' },
  { label: 'Visiting vets', value: 'Different handwriting, different format, no clear attribution' },
  { label: 'The assessor asks', value: 'A two-hour fire drill for one records file' },
];

const AFTER_FACTS: { label: string; value: string }[] = [
  { label: 'End of consult', value: 'A voice note in any Indian language; the structured record is ready in seconds' },
  { label: 'Drug register', value: 'Auto-populated on every administration; balance always accurate' },
  { label: 'Estimates', value: 'Signed before treatment and locked to the record' },
  { label: 'Visiting vets', value: 'Each signs with their own VCI registration number' },
  { label: 'The assessor asks', value: 'One click exports the complete, timestamped file' },
];

const SCOPE_DO: { title: string; body: string }[] = [
  { title: 'Voice → structured record', body: 'Audio in any Indian language becomes history, exam, assessment, plan and drug entries — with contemporaneous timestamps.' },
  { title: 'Controlled drug register', body: 'Schedule H1 entries with witness fields, running balance and reconciliation reports.' },
  { title: 'Consent + written estimate', body: 'Procedure-specific consent — pre-op, dental, euthanasia — with the cost estimate signed before treatment.' },
  { title: 'Immutable audit trail', body: 'Every version, edit and signature timestamped and locked, aligned to the IVC Act 1984 and state council requirements.' },
  { title: 'Multi-vet practice', body: 'Role-based access for principals, associates, technicians and visiting vets — each signs with their own VCI registration number.' },
];

const SCOPE_DONT: string[] = [
  'Replace your practice management software — your PMS sits alongside',
  'Bill clients or process payments directly',
  'Make your practice accredited or grant regulatory sign-off',
  'Auto-publish records without your review',
  'Provide clinical decision-making — you stay in the loop',
];

const RECENT_POSTS = [
  { slug: 'cma-vet-deadline', title: 'Daily records that hold up: what your state veterinary council actually checks', tag: 'VCI Compliance', ic: '/illustrations/tpl_soap.webp' },
  { slug: 'rcvs-record-inspection', title: 'What assessors actually check in your clinical records under the IVC Act 1984', tag: 'VCI Standards', ic: '/illustrations/tpl_work_cert.webp' },
  { slug: 'vcnz-records-standard', title: 'Schedule H1 controlled drugs — keeping a register your inspector can trust', tag: 'Schedule H1', ic: '/illustrations/tpl_cd_register.webp' },
  { slug: 'au-vet-board-records', title: 'Multilingual case notes: capturing consults in any Indian language', tag: 'Documentation', ic: '/illustrations/tpl_referral.webp' },
];

// Drawn product UI: a verified vet consult record (screenshot fidelity).
const VetConsultPanel = () => (
  <div className="g-ui g-ui--panel">
    <div className="g-ui-head">
      <div>
        <div className="g-ui-head-title">Consult — Bruno · 4 y · Labrador</div>
        <div className="g-ui-head-sub">Canine · 5 Jul, 6:40 pm · Dr. Menon</div>
      </div>
      <span className="g-ui-tag">Policy check passed</span>
    </div>
    <div style={{ padding: '10px 16px 14px' }}>
      <div className="g-ui-field">
        <span className="g-ui-f-label">History</span>
        <span className="g-ui-f-value">Vomiting since last night · ate garbage on walk</span>
        <span className="g-ui-conf">AI · 97%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Exam</span>
        <span className="g-ui-f-value">Mild dehydration · temp 102.8°F · abdomen soft</span>
        <span className="g-ui-conf">AI · 96%</span>
      </div>
      <div className="g-ui-evidence">"…thoda dehydration hai… temperature ek sau do point aath…"</div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Assessment</span>
        <span className="g-ui-f-value">Dietary indiscretion — gastritis<span className="g-ui-badge-edited">EDITED</span></span>
        <span className="g-ui-conf g-ui-conf--med"><span className="g-ui-glyph">≈</span>AI · 74%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Plan</span>
        <span className="g-ui-f-value">Ondansetron 0.2 mg/kg IV · bland diet 48 h · review tomorrow</span>
        <span className="g-ui-conf">AI · 98%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Drugs given</span>
        <span className="g-ui-f-value">Ondansetron 4 mg IV — entered in register</span>
        <span className="g-ui-conf">AI · 99%</span>
      </div>
      <div className="g-ui-meta-row">
        <span className="g-ui-audio-play"><i />Original audio · 1:04</span>
        <span className="g-ui-tag g-ui-tag--ink">hi-IN + en</span>
        <span className="g-ui-tag g-ui-tag--ink">Signed — Dr. Menon · VCI reg. no.</span>
      </div>
    </div>
  </div>
);

// Drawn product UI: the Schedule H1 register, vet edition.
const VetDrugRegisterPanel = () => (
  <div className="g-ui g-ui--panel">
    <div className="g-ui-head">
      <div>
        <div className="g-ui-head-title">Controlled drug register — Schedule H1</div>
        <div className="g-ui-head-sub">Running balance · witness fields · 3-year retention</div>
      </div>
      <span className="g-ui-tag">Balanced</span>
    </div>
    <table className="g-ui-table">
      <thead>
        <tr><th>Date</th><th>Patient</th><th>Drug &amp; strength</th><th>Qty</th><th>Vet</th><th>Balance</th></tr>
      </thead>
      <tbody>
        <tr><td className="g-dim">5 Jul</td><td>Bruno · canine</td><td>Tramadol 50 mg</td><td>2</td><td className="g-dim">Dr. Menon</td><td>84</td></tr>
        <tr><td className="g-dim">5 Jul</td><td>Misty · feline</td><td>Ketamine 100 mg/ml</td><td>0.4 ml</td><td className="g-dim">Dr. Menon</td><td>9.2 ml</td></tr>
        <tr><td className="g-dim">4 Jul</td><td>Rocky · canine</td><td>Butorphanol 10 mg/ml</td><td>0.6 ml</td><td className="g-dim">Dr. Iyer</td><td>4.8 ml</td></tr>
        <tr><td className="g-dim">3 Jul</td><td>Sheru · canine</td><td>Diazepam 5 mg</td><td>2</td><td className="g-dim">Dr. Iyer</td><td>56</td></tr>
      </tbody>
    </table>
    <div className="g-ui-meta-row" style={{ padding: '12px 16px 14px' }}>
      <span className="g-ui-tag g-ui-tag--ink">Auto-filled on administration</span>
      <span className="g-ui-tag g-ui-tag--ink">Every row traceable to a signed record</span>
    </div>
  </div>
);

export const VeterinaryPage = () => {
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
        title="Veterinary Compliance Software"
        description="Salvia keeps vet practice records audit-ready for VCI, the IVC Act 1984, Schedule H1 and state veterinary councils. Voice note in any Indian language after each consult — clinical records, controlled drug logs, consent, and audit trail out the other side."
        path="/veterinary"
        keywords={[
          'veterinary compliance software', 'vet records software India', 'VCI records', 'IVC Act 1984 compliance',
          'controlled drug register vets', 'Schedule H1 register', 'state veterinary council compliance', 'veterinary audit trail',
          'vet clinical documentation', 'multilingual vet notes',
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
                  Records that survive <span className="g-hl">any inspection.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  VCI standards. IVC Act 1984. Schedule H1 drug register. One voice note in any
                  Indian language after each consult — Salvia handles the <b>structured record,
                  controlled drug log, consent and audit trail</b>. Your PMS keeps booking and
                  billing; Salvia keeps you defensible.
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
                  src="/illustrations/vet_world.webp"
                  alt="A miniature veterinary clinic where a vet examines a dog and the consult flows as documents into a sealed vault"
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

        {/* Voice → structured record */}
        <section className="g-section">
          <div className="g-container">
            <div className="g-split">
              <div>
                <Rv as="h2" className="g-h2">
                  One voice note. <span className="g-hl">The whole record.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  After each consult, speak for 30 seconds to a few minutes — Malayalam, Hindi,
                  English or all three in one sentence. Salvia maps the audio to{' '}
                  <b>history, exam, assessment, plan and drugs administered</b>. You review and
                  sign. No typing, no template-bashing, and the original audio stays attached
                  as evidence.
                </Rv>
                <Rv className="g-facts" delay={2}>
                  <div className="g-fact"><span>Timestamps</span><b>Contemporaneous, built in</b></div>
                  <div className="g-fact"><span>Languages</span><b>Any Indian language, mixed freely</b></div>
                  <div className="g-fact"><span>Attribution</span><b>Each vet signs with their VCI reg. number</b></div>
                  <div className="g-fact"><span>Audit trail</span><b>Every edit versioned and locked</b></div>
                </Rv>
              </div>
              <Rv className="g-split-art" delay={1} style={{ display: 'block' }}>
                <div className="g-panel-scene">
                  <VetConsultPanel />
                  <img
                    className="g-scene-img g-scene-img--br"
                    src="/illustrations/vet_mic_dog.webp"
                    alt=""
                    loading="lazy"
                    style={{ bottom: -46, right: -34, width: 150 }}
                  />
                </div>
              </Rv>
            </div>
          </div>
        </section>

        {/* Schedule H1 register */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              The register your inspector <span className="g-hl">opens first.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              Every controlled drug administration flows into the Schedule H1 register
              automatically — date, patient, drug, quantity, dose, route, administering vet.
              The running balance never drifts, because the register is a <b>by-product of the
              record</b>, not a separate chore.
            </Rv>
            <Rv delay={2} style={{ marginTop: 44 }}>
              <div className="g-panel-scene">
                <div className="g-showcase">
                  <VetDrugRegisterPanel />
                </div>
                <img
                  className="g-scene-img g-scene-img--bl"
                  src="/illustrations/tpl_vaccination.webp"
                  alt=""
                  loading="lazy"
                  style={{ bottom: -36, left: -28, width: 118 }}
                />
              </div>
            </Rv>
          </div>
        </section>

        {/* Daily readiness — 365 */}
        <section className="g-section g-center">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              Audit-readiness is a daily habit, <span className="g-hl">not an event.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              Most practices keep good case notes but lose hours when the assessor asks. Four
              records get scrutinised — and all four fall out of everyday Salvia use.
            </Rv>
            <Rv className="g-giant" style={{ marginTop: 48 }}>
              <div className="g-n">
                <CountUp value={365} />
              </div>
              <div className="g-c">days a year your records stay assessment-ready.</div>
              <div className="g-s">No pre-inspection scramble — the file already exists</div>
            </Rv>
            <div className="g-tpl-grid" style={{ textAlign: 'left', marginTop: 52 }}>
              {DAILY_RECORDS.map((f, i) => (
                <Rv className="g-card" key={f.label} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                  <img src={f.img} alt="" loading="lazy" />
                  <h3 className="g-h3" style={{ fontSize: 17 }}>{f.label}</h3>
                  <p>{f.value}</p>
                </Rv>
              ))}
            </div>
            <Rv as="p" className="g-small" delay={3} style={{ marginTop: 26 }}>
              <Link to="/blog/vet-audit-prep" style={{ color: 'var(--g-green)', fontWeight: 600 }}>
                Read the full audit-prep breakdown →
              </Link>
            </Rv>
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
              Salvia is the compliance and records layer that sits alongside your PMS. It never
              replaces booking or billing, and it never signs for you.
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
            <Rv as="h2" className="g-h2">
              From ₹999 a month. <span className="g-hl">Everything included.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              The Starter plan covers 400 AI notes a month with the full compliance suite —
              drug register, consent, incidents, branded PDF export — and <b>unlimited staff</b>.
              You pay per note, never per vet.
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
              What vet practices <span className="g-hl">ask us.</span>
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

        {/* From the compliance desk */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              From the compliance desk.
            </Rv>
            <div className="g-tpl-grid">
              {RECENT_POSTS.map((p, i) => (
                <Rv key={p.slug} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                  <Link to={`/blog/${p.slug}`} className="g-tpl" style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                    <img className="g-tpl-ic" src={p.ic} alt="" loading="lazy" />
                    <div className="g-tpl-name">{p.title}</div>
                    <div className="g-tpl-meta">
                      <span className="g-tpl-vert">{p.tag}</span>
                    </div>
                  </Link>
                </Rv>
              ))}
            </div>
            <Rv as="p" className="g-small" delay={3} style={{ marginTop: 24 }}>
              <Link to="/blog" style={{ color: 'var(--g-green)', fontWeight: 600 }}>
                All posts →
              </Link>
            </Rv>
          </div>
        </section>

        {/* Final CTA */}
        <section className="g-final">
          <div className="g-container">
            <div className="g-final-grid">
              <div>
                <Rv as="h2" className="g-h2">
                  Audit-ready records, <span className="g-hl">from day one.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1} style={{ marginTop: 14 }}>
                  See how Salvia works in a real vet practice workflow — no slides, no pitch.
                  Book a 20-minute demo.
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
                  src="/illustrations/ill_seal.webp"
                  alt="A clinical record sealed inside a vault"
                  loading="lazy"
                  onError={(e) => ((e.target as HTMLImageElement).src = '/illustrations/vault.webp')}
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
