import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { Rv } from '../components/grass/Rv';

// /dental — the vertical page for Indian dental clinics.
// Story: audits fail on missing fields (BPE, STE, radiograph justification,
// treatment plans); Salvia makes them required. Grass design language.

const REGULATORS = ['DCI', 'Dentists Act 1948', 'NABH', 'AERB', 'CEA 2010', 'DPDP Act'];

const FAQS = [
  {
    q: 'Does Salvia help dental clinics meet Clinical Establishments Act and DCI record-keeping requirements?',
    a: 'Yes. Salvia structures records to include the elements regulators and NABH assessors look for: medical history review at every appointment, BPE scoring, soft tissue examination, radiograph justification, and written treatment plans signed before treatment begins.',
  },
  {
    q: 'Does it capture BPE scores and periodontal records?',
    a: 'Yes. BPE scoring is a required field in every examination record — it cannot be skipped before the note is saved. Six-point pocket depths are captured for patients with identified periodontal disease.',
  },
  {
    q: 'What about radiograph justification for AERB radiation safety compliance?',
    a: 'Every radiograph requires a documented justification — clinical indication, patient history, and decision rationale — at the time of exposure. The record produces an AERB-aligned justification trail automatically.',
  },
  {
    q: 'Does it work for DCI and the Dentists Act 1948?',
    a: "Yes. Salvia's records support Dental Council of India expectations under the Dentists Act 1948: contemporaneous notes, medical history reviewed at every visit, treatment plans in writing with costs documented before treatment, and a complete radiograph audit trail.",
  },
  {
    q: 'How does the consent workflow work for treatment plans?',
    a: 'Salvia generates a written treatment plan with itemised costs before the treatment appointment. The patient signs digitally. The signed plan, cost estimate, and date are locked into the record — the documented consent NABH assessors and DCI expect.',
  },
];

const AUDIT_FIELDS: { img: string; label: string; value: string }[] = [
  { img: '/illustrations/tpl_dental_chart.webp', label: 'BPE & charting', value: 'Required at every exam — the note cannot save without it.' },
  { img: '/illustrations/dental_xray.webp', label: 'Radiograph justification', value: 'Clinical indication logged per exposure, AERB-aligned.' },
  { img: '/illustrations/vet_estimate.webp', label: 'Written treatment plans', value: 'Itemised costs, signed before treatment begins.' },
  { img: '/illustrations/shield_cross.webp', label: 'Medical history review', value: 'Prompted at every visit, review date locked to the record.' },
];

const BEFORE_FACTS: { label: string; value: string }[] = [
  { label: 'End of day', value: 'Chart updates from memory; BPE skipped on a busy day' },
  { label: 'Radiographs', value: 'Justification kept "in my head" — an AERB review finds gaps' },
  { label: 'Treatment plans', value: 'Discussed verbally; the patient disputes the bill afterwards' },
  { label: 'Visiting dentists', value: 'Different note format, different completeness, different defensibility' },
  { label: 'The assessor asks', value: 'Fifteen minutes of scrolling for one medical-history entry' },
];

const AFTER_FACTS: { label: string; value: string }[] = [
  { label: 'End of appointment', value: 'A voice note in any Indian language; BPE required before the note saves' },
  { label: 'Radiographs', value: 'Justification captured at the time of exposure — the AERB trail builds itself' },
  { label: 'Treatment plans', value: 'Itemised costs signed before treatment — consent documented, DCI-ready' },
  { label: 'Visiting dentists', value: 'Each signs with their own DCI registration number' },
  { label: 'The assessor asks', value: 'Filter medical-history reviews and export in seconds' },
];

const SCOPE_DO: { title: string; body: string }[] = [
  { title: 'Voice → dental chart', body: 'Audio in any Indian language becomes examination findings, BPE, STE and treatment notes — with contemporaneous timestamps.' },
  { title: 'Radiograph justification', body: 'Clinical indication per exposure with an AERB-aligned audit trail, produced on demand.' },
  { title: 'Treatment plan + e-signature', body: 'Itemised cost estimate generated and signed before treatment — the informed consent DCI and NABH expect.' },
  { title: 'Immutable audit trail', body: 'Every edit, addendum and version locked for DCI, NABH and Clinical Establishments Act records.' },
  { title: 'Multi-dentist clinic', body: 'Role-based access for hygienists, nurses and admin — every clinician signs with their own registration.' },
];

const SCOPE_DONT: string[] = [
  'Replace your clinic management software',
  'Bill insurers or process NHCX claims directly',
  'Make you NABH-accredited or claim regulatory sign-off on your behalf',
  'Auto-publish records without your review',
  'Provide clinical decision-making — you stay in the loop',
];

const RECENT_POSTS = [
  { slug: 'cqc-dental-2026', title: 'NABH dental accreditation 2026 — what assessors actually expect in your clinical notes', tag: 'NABH Assessment', ic: '/illustrations/tpl_work_cert.webp' },
  { slug: 'ahpra-dental-records', title: 'DCI dental complaints are records-first — is your charting defensible?', tag: 'DCI', ic: '/illustrations/tpl_soap.webp' },
  { slug: 'malpractice-dental', title: 'Missed a perio pocket two years ago — patient now has bone loss. How do I defend my charting?', tag: 'Malpractice', ic: '/illustrations/shield_cross.webp' },
  { slug: 'signed-edits-dental', title: 'Billed the wrong NHCX code on a signed note — how do I fix it without looking dodgy?', tag: 'Corrections', ic: '/illustrations/tpl_referral.webp' },
];

// Drawn product UI: a dental check-up record with the required fields.
const DentalExamPanel = () => (
  <div className="g-ui g-ui--panel">
    <div className="g-ui-head">
      <div>
        <div className="g-ui-head-title">Check-up — Anita Rao · 29 / F</div>
        <div className="g-ui-head-sub">Dental · 6 Jul, 10:15 am · Dr. Kapoor</div>
      </div>
      <span className="g-ui-tag">All required fields captured</span>
    </div>
    <div style={{ padding: '10px 16px 14px' }}>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Medical history</span>
        <span className="g-ui-f-value">Reviewed — no changes since January</span>
        <span className="g-ui-conf">AI · 98%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">BPE</span>
        <span className="g-ui-f-value">2 1 2 / 1 1 2</span>
        <span className="g-ui-conf">AI · 97%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Soft tissue exam</span>
        <span className="g-ui-f-value">NAD — screening documented</span>
        <span className="g-ui-conf">AI · 96%</span>
      </div>
      <div className="g-ui-evidence">"…BPE do-ek-do… soft tissue bilkul normal…"</div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Findings</span>
        <span className="g-ui-f-value">16 distal caries · 47 fractured cusp<span className="g-ui-badge-edited">EDITED</span></span>
        <span className="g-ui-conf g-ui-conf--med"><span className="g-ui-glyph">≈</span>AI · 76%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Plan</span>
        <span className="g-ui-f-value">Composite 16 · onlay 47 · fluoride varnish</span>
        <span className="g-ui-conf">AI · 98%</span>
      </div>
      <div className="g-ui-meta-row">
        <span className="g-ui-audio-play"><i />Original audio · 0:51</span>
        <span className="g-ui-tag g-ui-tag--ink">hi-IN + en</span>
        <span className="g-ui-tag g-ui-tag--ink">Signed — Dr. Kapoor · DCI reg. no.</span>
      </div>
    </div>
  </div>
);

// Drawn product UI: the radiograph justification register.
const RadiographRegisterPanel = () => (
  <div className="g-ui g-ui--panel">
    <div className="g-ui-head">
      <div>
        <div className="g-ui-head-title">Radiograph register — justification trail</div>
        <div className="g-ui-head-sub">AERB-aligned · every exposure indicated</div>
      </div>
      <span className="g-ui-tag">Complete</span>
    </div>
    <table className="g-ui-table">
      <thead>
        <tr><th>Date</th><th>Patient</th><th>View</th><th>Justification</th><th>Dentist</th></tr>
      </thead>
      <tbody>
        <tr><td className="g-dim">6 Jul</td><td>Anita Rao</td><td>IOPA 16</td><td>Suspected proximal caries</td><td className="g-dim">Dr. Kapoor</td></tr>
        <tr><td className="g-dim">5 Jul</td><td>Vikram S</td><td>Bitewings</td><td>Caries recall — 12 months</td><td className="g-dim">Dr. Kapoor</td></tr>
        <tr><td className="g-dim">4 Jul</td><td>Meera Pillai</td><td>OPG</td><td>Third molar assessment</td><td className="g-dim">Dr. Shah</td></tr>
        <tr><td className="g-dim">3 Jul</td><td>Joseph K</td><td>IOPA 47</td><td>Post-endo evaluation</td><td className="g-dim">Dr. Shah</td></tr>
      </tbody>
    </table>
    <div className="g-ui-meta-row" style={{ padding: '12px 16px 14px' }}>
      <span className="g-ui-tag g-ui-tag--ink">Logged at time of exposure</span>
      <span className="g-ui-tag g-ui-tag--ink">Produces the AERB trail on demand</span>
    </div>
  </div>
);

export const DentalPage = () => {
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
        title="Dental Compliance Software"
        description="Salvia keeps dental clinic records audit-ready for DCI, NABH, and AERB. BPE, STE, radiograph justification, and treatment plans captured at every visit — no audit catches you off guard."
        path="/dental"
        keywords={[
          'dental compliance software India', 'DCI dental records', 'NABH dental accreditation',
          'AERB dental compliance', 'dental charting software', 'BPE recording software',
          'radiograph justification dental', 'dental audit trail', 'dental governance software',
          'Clinical Establishments Act dental',
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
                  Every field an audit looks for. <span className="g-hl">Captured.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  DCI record-keeping. NABH standards. AERB radiation safety. One voice note after
                  each appointment, in any Indian language — <b>BPE, STE, radiograph
                  justification, treatment plan and audit trail</b> all handled. Your clinic
                  software keeps booking and billing; Salvia keeps you defensible.
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
                  src="/illustrations/dental_world.webp"
                  alt="A miniature dental clinic where a check-up becomes documents sealed in a vault"
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

        {/* Voice → dental chart */}
        <section className="g-section">
          <div className="g-container">
            <div className="g-split">
              <div>
                <Rv as="h2" className="g-h2">
                  One voice note. <span className="g-hl">Every required field.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  After each appointment, speak for 30 seconds to a few minutes. Salvia maps the
                  audio to <b>examination findings, BPE, soft tissue exam and treatment
                  notes</b> — and refuses to save a check-up without the fields assessors flag
                  most. You review and sign; the original audio stays attached.
                </Rv>
                <Rv className="g-facts" delay={2}>
                  <div className="g-fact"><span>BPE</span><b>Required at every examination</b></div>
                  <div className="g-fact"><span>Soft tissue exam</span><b>Oral cancer screening documented per visit</b></div>
                  <div className="g-fact"><span>Timestamps</span><b>Contemporaneous, built in</b></div>
                  <div className="g-fact"><span>Attribution</span><b>Each dentist signs with their DCI reg. number</b></div>
                </Rv>
              </div>
              <Rv className="g-split-art" delay={1} style={{ display: 'block' }}>
                <DentalExamPanel />
              </Rv>
            </div>
          </div>
        </section>

        {/* Radiograph register */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              Every exposure, justified <span className="g-hl">at the time.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              An "unnecessary X-ray" complaint is answered with the indication you logged when
              you took it — not a reconstruction. Every radiograph carries its clinical
              indication, patient history and decision rationale, so the <b>AERB-aligned
              justification trail</b> is a by-product of daily work.
            </Rv>
            <Rv delay={2} style={{ marginTop: 44 }}>
              <div className="g-showcase">
                <RadiographRegisterPanel />
              </div>
            </Rv>
          </div>
        </section>

        {/* The audit gap — 9/20 */}
        <section className="g-section g-center">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              Audits fail on missing fields, <span className="g-hl">not bad dentistry.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              The gaps assessors flag aren't complex clinical failures — they're empty fields.
              Salvia makes them required.
            </Rv>
            <Rv className="g-giant" style={{ marginTop: 48 }}>
              <div className="g-n">9/20</div>
              <div className="g-c">records in a typical underprepared clinic audit are missing BPE scores.</div>
              <div className="g-s">11 of 20 lack written treatment plans · 7 have no radiograph reporting</div>
            </Rv>
            <div className="g-tpl-grid" style={{ textAlign: 'left', marginTop: 52 }}>
              {AUDIT_FIELDS.map((f, i) => (
                <Rv className="g-card" key={f.label} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                  <img src={f.img} alt="" loading="lazy" />
                  <h3 className="g-h3" style={{ fontSize: 17 }}>{f.label}</h3>
                  <p>{f.value}</p>
                </Rv>
              ))}
            </div>
            <Rv as="p" className="g-small" delay={3} style={{ marginTop: 26 }}>
              <Link to="/blog/malpractice-dental" style={{ color: 'var(--g-green)', fontWeight: 600 }}>
                Read the dental charting breakdown →
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
              Salvia is the compliance and records layer that sits alongside your clinic
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
                src="/illustrations/tpl_dental_chart.webp"
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
              charting, radiograph trail, consent, incidents, branded PDF export — and{' '}
              <b>unlimited staff</b>. You pay per note, never per dentist.
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
              What dental clinics <span className="g-hl">ask us.</span>
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
                  Pass your next audit, <span className="g-hl">first time.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1} style={{ marginTop: 14 }}>
                  See how Salvia works in a real dental clinic — no slides, no pitch.
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
                  src="/illustrations/ill_verify.webp"
                  alt="A hand holding a verified clinical record under a magnifier"
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
