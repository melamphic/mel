import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { Rv } from '../components/grass/Rv';
import { ALLIED_DISCIPLINES } from '../data/alliedDisciplines';

// /allied-health — umbrella vertical for six disciplines (physio, osteo,
// chiro, OT, podiatry, speech). One engine, per-discipline framework packs.
// Grass design language.

const REGULATORS = ['NCAHP', 'RCI', 'NABH', 'ABDM', 'CEA 2010', 'DPDP Act'];

const FAQS = [
  {
    q: 'Why one umbrella vertical for six disciplines?',
    a: 'Allied health disciplines share the same workflow shape: post-encounter notes, outcome measures, episode-of-care tracking, discharge summary. We deliver the engine once and tune it per discipline with framework-aware AI context. Cleaner for us to ship, simpler for you to buy.',
  },
  {
    q: 'Does it actually know my discipline-specific frameworks?',
    a: 'Yes. Each clinic registers a discipline at onboarding (physio / osteo / chiro / OT / podiatry / SLT) and a country. Salvia loads the matching framework pack (NCAHP record-keeping norms, RCI standards, ABDM record formats etc) into every AI generation. You can adjust the active framework set in settings.',
  },
  {
    q: 'What if my clinic has clinicians from multiple disciplines?',
    a: 'Common in MDT practices. Each clinician is registered with their own discipline and registration number. Their records reflect their discipline-specific framework. Records remain visible across the practice with role-based access.',
  },
  {
    q: 'Can we pick which frameworks apply to our records?',
    a: 'Yes. Settings → Compliance Frameworks lists every framework valid for your country and discipline. Multi-select what applies (e.g. NCAHP + DPDP Act + ABDM record formats if relevant). All AI generation honours the selected set.',
  },
  {
    q: 'How is the pricing different from your dental or vet pricing?',
    a: 'Same tier structure (Practice 1–3 clinicians, Pro 4–7 clinicians), same per-market pricing. Allied health has a slightly higher monthly note cap because allied caseloads typically run more frequent, shorter sessions than vet or GP.',
  },
  {
    q: 'Can clinicians dictate in their own language?',
    a: 'Yes. A clinician can speak the note in English, Hindi, or another Indian language and Salvia returns a clean, structured English record. The time saved on typing is the same whichever language you work in.',
  },
];

const EPISODE_CARDS: { img: string; label: string; value: string }[] = [
  { img: '/illustrations/tpl_painad.webp', label: 'Outcome measures', value: 'NPRS, ROM, functional scores — tracked across the episode, not scattered in prose.' },
  { img: '/illustrations/tpl_allied.webp', label: 'Treatment & exercise log', value: 'Session-by-session record of what was done, progressed and prescribed.' },
  { img: '/illustrations/vet_estimate.webp', label: 'Consent documentation', value: 'Discipline-specific consent captured and signed before treatment.' },
  { img: '/illustrations/tpl_work_cert.webp', label: 'Discharge summary', value: 'Assembled from the episode itself — outcomes in, summary out.' },
];

const FRAMEWORK_FACTS: { label: string; value: string }[] = [
  { label: 'NCAHP', value: 'Statutory register and record-keeping norms' },
  { label: 'Profession councils', value: 'Physio, OT, podiatry, SLP councils under NCAHP' },
  { label: 'RCI', value: 'Rehabilitation and communication-disorder professionals' },
  { label: 'ABDM', value: 'ABHA-linked, FHIR-structured record output' },
  { label: 'DPDP Act', value: 'Data-protection duties across every discipline' },
];

const SCOPE_DO: { title: string; body: string }[] = [
  { title: 'Voice → session record', body: 'Audio in any Indian language becomes a structured SOAP record with outcome measures — timestamped per session.' },
  { title: 'Episode-of-care tracking', body: 'Sessions numbered within the episode; progress visible across the whole course of care.' },
  { title: 'Consent + treatment log', body: 'Discipline-specific consent and a session-by-session treatment and exercise log.' },
  { title: 'Discharge summary', body: 'Built from the sealed session records — not retyped at the end.' },
  { title: 'Framework-aware records', body: 'Your discipline and country load the matching regulator pack into every AI generation.' },
];

const SCOPE_DONT: string[] = [
  'Replace your practice management software',
  'Bill clients or process payments directly',
  'Make you accredited or claim regulatory sign-off on your behalf',
  'Auto-publish records without your review',
  'Provide clinical decision-making — you stay in the loop',
];

// Drawn product UI: a physio session record with outcome measures.
const SessionPanel = () => (
  <div className="g-ui g-ui--panel">
    <div className="g-ui-head">
      <div>
        <div className="g-ui-head-title">Session 6 of 12 — Ramesh P · 54 / M</div>
        <div className="g-ui-head-sub">Physiotherapy · post-TKR rehab · 6 Jul, 5:20 pm · Anjali R, PT</div>
      </div>
      <span className="g-ui-tag">Outcome measures updated</span>
    </div>
    <div style={{ padding: '10px 16px 14px' }}>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Subjective</span>
        <span className="g-ui-f-value">Pain settling · stairs improving</span>
        <span className="g-ui-conf">AI · 97%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Objective</span>
        <span className="g-ui-f-value">Knee flexion 105° · quads 4/5</span>
        <span className="g-ui-conf">AI · 96%</span>
      </div>
      <div className="g-ui-evidence">"…flexion ab ek sau paanch tak… seedhiyon pe kam dard…"</div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">NPRS</span>
        <span className="g-ui-f-value">3/10 — down from 6/10 at intake</span>
        <span className="g-ui-conf">AI · 98%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Plan</span>
        <span className="g-ui-f-value">Progress closed-chain loading · HEP updated<span className="g-ui-badge-edited">EDITED</span></span>
        <span className="g-ui-conf g-ui-conf--med"><span className="g-ui-glyph">≈</span>AI · 75%</span>
      </div>
      <div className="g-ui-meta-row">
        <span className="g-ui-audio-play"><i />Original audio · 0:38</span>
        <span className="g-ui-tag g-ui-tag--ink">hi-IN + en</span>
        <span className="g-ui-tag g-ui-tag--ink">Signed — Anjali R · NCAHP reg. no.</span>
      </div>
    </div>
  </div>
);

export const AlliedHealthPage = () => {
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
        title="Allied Health Documentation & Records Software"
        description="Salvia keeps allied health records audit-ready for NCAHP, RCI, ABDM and the DPDP Act. Voice note after each session in any Indian language — SOAP record, outcome measures, treatment log, discharge summary, audit trail. Physio, osteo, chiro, OT, podiatry, speech."
        path="/allied-health"
        keywords={[
          'allied health software India', 'allied health records', 'physiotherapy documentation software',
          'NCAHP allied health', 'RCI records', 'ABDM allied', 'physio osteo chiro OT podiatry speech',
          'allied health audit trail', 'allied health practice management India',
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
                  Records that map to <span className="g-hl">your regulator.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  NCAHP. RCI. ABDM. DPDP Act. One voice note per session, in any Indian
                  language — Salvia generates the <b>structured record, outcome measures,
                  consent, treatment log and discharge summary</b> against the framework that
                  governs you.
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
                  src="/illustrations/allied_world.webp"
                  alt="A miniature rehabilitation studio where a session becomes documents sealed in a vault"
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

        {/* Discipline grid */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              Six disciplines. <span className="g-hl">Find yours.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              Each page covers the regulator pack, record format and FAQ specific to your work.
            </Rv>
            <div className="g-grid">
              {ALLIED_DISCIPLINES.map((d, i) => (
                <Rv key={d.slug} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                  <Link to={`/${d.slug}`} className="g-card" style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
                    <h3 className="g-h3">{d.name}</h3>
                    <div className="g-tpl-meta" style={{ margin: '10px 0 14px' }}>
                      {d.regulators.slice(0, 4).map((r) => (
                        <span key={r.body}>{r.body}</span>
                      ))}
                    </div>
                    <p style={{ color: 'var(--g-green)', fontWeight: 600 }}>
                      Salvia for {d.shortName} →
                    </p>
                  </Link>
                </Rv>
              ))}
            </div>
          </div>
        </section>

        {/* Voice → session record */}
        <section className="g-section">
          <div className="g-container">
            <div className="g-split">
              <div>
                <Rv as="h2" className="g-h2">
                  One voice note per session. <span className="g-hl">The whole episode.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  Allied caseloads run short, frequent sessions — typing after each one is how
                  records fall behind. Speak for 30 seconds instead: Salvia structures the{' '}
                  <b>SOAP record and outcome measures</b>, numbers the session within its
                  episode, and keeps the original audio attached.
                </Rv>
                <Rv className="g-facts" delay={2}>
                  <div className="g-fact"><span>Outcome measures</span><b>Tracked across the episode of care</b></div>
                  <div className="g-fact"><span>Sessions</span><b>Numbered within the episode, timestamped</b></div>
                  <div className="g-fact"><span>Framework pack</span><b>Loaded per discipline and country</b></div>
                  <div className="g-fact"><span>Attribution</span><b>Each clinician signs with their own registration</b></div>
                </Rv>
              </div>
              <Rv className="g-split-art" delay={1} style={{ display: 'block' }}>
                <SessionPanel />
              </Rv>
            </div>
          </div>
        </section>

        {/* The episode file */}
        <section className="g-section g-center">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              The episode file, <span className="g-hl">complete.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              The four records that decide complaints, audits and insurer queries — assembled
              from the sessions themselves.
            </Rv>
            <div className="g-tpl-grid" style={{ textAlign: 'left', marginTop: 52 }}>
              {EPISODE_CARDS.map((f, i) => (
                <Rv className="g-card" key={f.label} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                  <img src={f.img} alt="" loading="lazy" />
                  <h3 className="g-h3" style={{ fontSize: 17 }}>{f.label}</h3>
                  <p>{f.value}</p>
                </Rv>
              ))}
            </div>
          </div>
        </section>

        {/* Frameworks */}
        <section className="g-section">
          <div className="g-container">
            <div className="g-split" style={{ alignItems: 'start' }}>
              <div>
                <Rv as="h2" className="g-h2">
                  One product, <span className="g-hl">every framework</span> that governs you.
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  The AI loads your regulator's record-keeping pack into every generation. You
                  see which framework is active, and you can adjust the set in settings —
                  multi-select what applies to your clinic.
                </Rv>
              </div>
              <Rv delay={2}>
                <div className="g-facts" style={{ marginTop: 8 }}>
                  {FRAMEWORK_FACTS.map((f) => (
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
                src="/illustrations/tpl_allied.webp"
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
              outcome measures, consent, incidents, branded PDF export — and <b>unlimited
              staff</b>. You pay per note, never per clinician.
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
              What allied clinics <span className="g-hl">ask us.</span>
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
                  Six disciplines. <span className="g-hl">One record engine.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1} style={{ marginTop: 14 }}>
                  See how Salvia works in a real allied health workflow — no slides, no pitch.
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
                  src="/illustrations/ill_globe_india.webp"
                  alt="A globe with a location pin on India"
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
