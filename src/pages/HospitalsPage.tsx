import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { Rv } from '../components/grass/Rv';

// /hospitals — medical directors, quality heads and owners.
// Story: your HMIS runs the business; Salvia is the evidence layer on top.
// Redesigned in the .g-* (grass) language: white page, Archivo, green accent.

const HMIS_FACTS: { label: string; value: string }[] = [
  { label: 'Billing', value: 'Invoices, packages, TPA claims' },
  { label: 'ADT', value: 'Admissions, discharges, transfers' },
  { label: 'Pharmacy', value: 'Stock, indents, expiry' },
  { label: 'Lab', value: 'Orders and results' },
  { label: 'EMR fields', value: 'Diagnosis codes, prescriptions, summaries' },
];

const SALVIA_FACTS: { label: string; value: string }[] = [
  { label: 'The consult', value: 'What was said, decided and consented' },
  { label: 'The reasoning', value: 'The clinical logic that defends a decision years later' },
  { label: 'The registers', value: 'Consents, drug entries, incidents — traceable to signed notes' },
  { label: 'The audio', value: 'Original recording attached to every record' },
  { label: 'Years later', value: 'The complete sealed file, produced in minutes' },
];

const CAPTURE_MODES: { img: string; title: string; body: string }[] = [
  {
    img: '/illustrations/mic.webp',
    title: 'Ambient OPD',
    body: 'Mic on, consult as usual — Malayalam, Hindi, English or all three in one sentence. The record builds itself while the doctor works.',
  },
  {
    img: '/illustrations/ill_speak.webp',
    title: 'Post-consult voice note',
    body: 'Prefer not to record the room? A short voice note once the patient leaves. Same structured record, same timestamp discipline.',
  },
  {
    img: '/illustrations/stetho.webp',
    title: 'Guided IP rounds',
    body: 'On the ward, open the form the moment needs — a pain assessment, a drug entry — and speak. The fields fill; nothing waits for a desktop.',
  },
];

const NABH_STATS: { value: string; label: string }[] = [
  { value: '62%', label: 'of NABH non-compliances are fixable only by creating or revising documentation — the dominant audit gap' },
  { value: '+10%', label: 'higher PM-JAY package rates at the Silver quality tier — NABH Entry-Level qualifies you (Gold at +15% with full NABH)' },
  { value: '3–6 mo', label: 'typical prep-to-certificate timeline — mostly spent producing the documentation evidence assessors ask for' },
];

// Same verified figures and source links as the landing's six-year test.
const SIX_YEAR_STATS: { value: string; label: string }[] = [
  { value: '6 yrs', label: 'average life of a medical-negligence consumer case — the longest run 18+' },
  { value: '22%', label: 'of proven NCDRC negligence cases involved a failure to keep accurate records' },
  { value: '₹2 crore', label: 'a single NCDRC award, 2022 — benchmark awards now run ₹75 lakh to ₹11 crore' },
  { value: '19%', label: 'of civil medical-negligence cases ever reach a judgment — the rest linger for years' },
];

const SIX_YEAR_SOURCES: { label: string; url: string }[] = [
  { label: 'IJME — NCDRC 5-yr review (253 cases)', url: 'https://ijme.in/articles/medical-negligence-in-cases-decided-by-the-national-consumer-disputes-redressal-commission-a-five-year-retrospective-review/' },
  { label: 'Indian J Urology — records & case law', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2779965/' },
  { label: 'NCDRC ₹2 cr award (2022)', url: 'https://indialegallive.com/constitutional-law-news/courts-news/ncdrc-awards-rs-2-crore-compensation-for-medical-negligence-after-surgeon-removes-healthy-kidney/' },
  { label: 'TNM/Newslaundry — case timelines', url: 'https://www.newslaundry.com/2024/09/28/in-kerala-medical-negligence-victims-face-a-broken-system-of-delays-and-bias' },
];

export const HospitalsPage = () => {
  return (
    <>
      <SEO
        title="Evidence & Compliance Platform for Indian Hospitals"
        description="Your HMIS bills and schedules — it was never built to defend you. Salvia sits on top: every consult becomes a clinician-verified, sealed record you can produce when a complaint arrives. NABH-ready by default."
        path="/hospitals"
        keywords={['hospital compliance software India', 'medical records software hospital', 'NABH documentation software', 'HMIS evidence layer', 'medical negligence defence records', 'hospital audit trail software']}
      />
      <GrassHeader />
      <main style={{ flex: 1, zIndex: 10, background: '#fff' }}>

        {/* Hero — HMIS-on-top, no migration */}
        <section className="g-section" style={{ padding: '148px 0 84px' }}>
          <div className="g-container">
            <div className="g-split">
              <div>
                <Rv as="h1" className="g-h1" style={{ fontSize: 'clamp(38px, 4.4vw, 62px)', marginBottom: 20 }}>
                  Your HMIS runs the hospital. <span className="g-hl">Salvia defends it.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  Not another system to migrate to. Salvia sits on top of whatever you run —
                  billing, ADT and pharmacy stay exactly where they are — and captures the one
                  thing your HMIS can't: <b>what was actually said and done at the point of
                  care</b>, clinician-verified, policy-checked and sealed. When a complaint
                  arrives about a patient treated years ago, you can prove what happened.
                </Rv>
                <Rv className="g-hero-ctas" delay={2} style={{ justifyContent: 'flex-start', marginTop: 30 }}>
                  <Link className="g-btn g-btn--green" to="/start">
                    Talk to us
                  </Link>
                  <Link className="g-btn g-btn--ghost" to="/pricing">
                    See pricing
                  </Link>
                </Rv>
              </div>
              <Rv className="g-split-art" delay={1}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster="/illustrations/ill_hospital.webp"
                  onLoadedData={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
                  aria-label="A living miniature hospital campus protected under a glass dome"
                  style={{
                    width: '88%',
                    maxWidth: 460,
                    height: 'auto',
                    display: 'block',
                  }}
                >
                  <source src="/illustrations/hospital_dome.mp4" type="video/mp4" />
                  <img src="/illustrations/ill_hospital.webp" alt="A hospital campus protected under a glass dome" />
                </video>
              </Rv>
            </div>
          </div>
        </section>

        {/* What the HMIS holds vs what it can't */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              What your HMIS holds. <span className="g-hl">What it can't.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              Keep your HMIS — it runs the business well. But the room where medicine actually
              happens leaves no trace in it, and that trace is exactly what a consumer court,
              an insurer or an NABH assessor asks for. <b>That gap is the product.</b>
            </Rv>
            <div className="g-split" style={{ alignItems: 'start', marginTop: 48 }}>
              <Rv delay={2}>
                <h3 className="g-h3">Your HMIS / HIMS holds</h3>
                <div className="g-facts" style={{ marginTop: 16 }}>
                  {HMIS_FACTS.map((f) => (
                    <div className="g-fact" key={f.label}>
                      <span>{f.label}</span>
                      <b>{f.value}</b>
                    </div>
                  ))}
                </div>
              </Rv>
              <Rv delay={3}>
                <h3 className="g-h3">
                  Salvia holds, <span className="g-hl">on top</span>
                </h3>
                <div className="g-facts" style={{ marginTop: 16 }}>
                  {SALVIA_FACTS.map((f) => (
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

        {/* Capture modes — OPD + IP */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              Works the way your floor works.
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              No hard rules about how clinicians capture. Three ways in — one ending:
              a verified, sealed record.
            </Rv>
            <div className="g-grid">
              {CAPTURE_MODES.map((m, i) => (
                <Rv className="g-card" key={m.title} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                  <img src={m.img} alt="" loading="lazy" />
                  <h3 className="g-h3">{m.title}</h3>
                  <p>{m.body}</p>
                </Rv>
              ))}
            </div>
          </div>
        </section>

        {/* NABH math */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              Documentation <span className="g-hl">is</span> the audit.
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              Whether you're after NABH Entry-Level for the PM-JAY rate uplift or full
              accreditation, most of the distance is documentation evidence. Salvia keeps the
              records side ready as a <b>by-product of daily work</b> — not a pre-assessment
              scramble.
            </Rv>
            <div className="g-grid" style={{ gap: 0, borderTop: '1px solid var(--g-line)' }}>
              {NABH_STATS.map((s, i) => (
                <Rv className="g-stat" key={s.value} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                  <div className="g-num">{s.value}</div>
                  <div className="g-lbl">{s.label}</div>
                </Rv>
              ))}
            </div>
            <Rv as="p" className="g-small" delay={2} style={{ marginTop: 28 }}>
              BMC Health Services Research 2026 · AB-PMJAY Quality Certification ·{' '}
              <Link to="/blog/nabh-small-clinic-worth-it" style={{ color: 'var(--g-green)', fontWeight: 600 }}>
                the honest NABH breakdown →
              </Link>
            </Rv>
          </div>
        </section>

        {/* The six-year test — sourced worst-day closer */}
        <section className="g-section" id="six-year-test" style={{ borderTop: 'none' }}>
          <div className="g-container">
            <div style={{ maxWidth: 780 }}>
              <Rv as="h2" className="g-h2">
                A complaint from 2020 just arrived. The treating doctor left last year.
              </Rv>
              <Rv as="p" className="g-sub" delay={1} style={{ maxWidth: 720 }}>
                The consumer commission wants the complete file — notes, consents, drug charts,
                vitals. Reconstructing it after the notice reads as concealment, and courts draw
                an <em>adverse inference</em> from records you cannot produce.{' '}
                <b>What does your hospital hand over?</b>
              </Rv>
            </div>

            <div className="g-stats">
              {SIX_YEAR_STATS.map((s, i) => (
                <Rv className="g-stat" key={s.value} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                  <div className="g-num">{s.value}</div>
                  <div className="g-lbl">{s.label}</div>
                </Rv>
              ))}
            </div>

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
              {SIX_YEAR_SOURCES.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </Rv>
          </div>
        </section>

        {/* Custom pricing CTA */}
        <section className="g-section">
          <div className="g-container">
            <div className="g-split">
              <div>
                <Rv as="h2" className="g-h2">
                  Hospitals run on <span className="g-hl">custom plans.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  Per-note pricing with committed minimums — never per-seat, so every clinician
                  and nurse can be on the record. Tell us your bed count and monthly OPD volume;
                  we come back with numbers.
                </Rv>
                <Rv className="g-facts" delay={2}>
                  <div className="g-fact"><span>Pricing model</span><b>Per note, committed minimum</b></div>
                  <div className="g-fact"><span>Per-seat licences</span><b>None, ever</b></div>
                  <div className="g-fact"><span>Invoicing</span><b>Net-30, GST invoice</b></div>
                  <div className="g-fact"><span>Clinical AI model</span><b>Premium tier, every note</b></div>
                </Rv>
                <Rv delay={3} style={{ marginTop: 30 }}>
                  <Link className="g-btn g-btn--green" to="/start">
                    Start the conversation
                  </Link>
                </Rv>
              </div>
              <Rv className="g-split-art" delay={1}>
                <img
                  src="/illustrations/vault.webp"
                  alt="A records vault with a glowing green dial"
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
