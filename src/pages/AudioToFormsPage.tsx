import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { Rv } from '../components/grass/Rv';

// /products/point-of-care-evidence — the capture module.
// Story: delayed documentation loses audits; capture at the point of care.
// Grass design language.

const REGULATORS = ['NMC', 'DCI', 'VCI', 'NABH', 'CEA 2010', 'DPDP Act'];

const HOW_IT_WORKS: { label: string; value: string }[] = [
  { label: 'Consult ends', value: 'You step away from the patient — 30 to 90 seconds' },
  { label: 'Voice note', value: 'Speak naturally: what you found, what you gave, what you told them' },
  { label: 'Fields mapped', value: 'Audio becomes the structured record; drug entries flow to the register; gaps are flagged' },
  { label: 'Review and sign', value: 'Glance, correct, sign — the record locks, audit-ready' },
];

const FEATURES: { title: string; body: string }[] = [
  { title: 'Voice note → structured record', body: 'Every required field — history, exam findings, assessment, plan, drugs administered — with a contemporaneous timestamp.' },
  { title: 'Weight-traced drug doses', body: 'Every dose traces back to the patient weight recorded at that visit. If weight and dose don\'t align, Salvia flags it before you sign.' },
  { title: 'Drug register auto-populated', body: 'A controlled drug in the note creates the Schedule H1 register entry automatically — date, patient, drug, dose, route, clinician, running balance.' },
  { title: 'Consent in the workflow', body: 'Written consent templates for surgical, anaesthetic and euthanasia procedures; the cost estimate signed before treatment. All locked to the record.' },
  { title: 'Zero-hallucination extraction', body: 'Salvia doesn\'t invent fields it didn\'t hear. Missing vitals are flagged, not filled with "WNL". You sign what was captured, not what the AI guessed.' },
  { title: 'Audit-ready on submission', body: 'Once signed, the record is immutable. Every later edit is a versioned addendum with reason and timestamp — the way regulators expect corrections to work.' },
];

// Drawn product UI: the record as it lands after a voice note.
const EvidencePanel = () => (
  <div className="g-ui g-ui--panel">
    <div className="g-ui-head">
      <div>
        <div className="g-ui-head-title">Consult — Max · Labrador · 6 y M/N</div>
        <div className="g-ui-head-sub">28.4 kg · 6 Jul, 4:05 pm · Dr. Menon</div>
      </div>
      <span className="g-ui-tag">Signed · locked · audit-ready</span>
    </div>
    <div style={{ padding: '10px 16px 14px' }}>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Complaint</span>
        <span className="g-ui-f-value">Vomiting × 3 days · reduced appetite</span>
        <span className="g-ui-conf">AI · 98%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Vitals</span>
        <span className="g-ui-f-value">Temp 38.6 °C · pulse 88 bpm</span>
        <span className="g-ui-conf">AI · 97%</span>
      </div>
      <div className="g-ui-evidence">"…temp is thirty-eight point six… pulse steady at eighty-eight…"</div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Assessment</span>
        <span className="g-ui-f-value">Dietary gastroenteritis — no haematemesis</span>
        <span className="g-ui-conf">AI · 95%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Treatment</span>
        <span className="g-ui-f-value">Metronidazole 15 mg/kg PO BID × 5 d</span>
        <span className="g-ui-conf">AI · 99%</span>
      </div>
      <div className="g-ui-field">
        <span className="g-ui-f-label">Dose check</span>
        <span className="g-ui-f-value">426 mg vs 28.4 kg — within range</span>
        <span className="g-ui-conf">Traced</span>
      </div>
      <div className="g-ui-meta-row">
        <span className="g-ui-audio-play"><i />Original audio · 0:58</span>
        <span className="g-ui-tag g-ui-tag--ink">Contemporaneous timestamp</span>
      </div>
    </div>
  </div>
);

export const AudioToFormsPage = () => {
  return (
    <>
      <SEO
        title="Point-of-Care Evidence Capture"
        description="Voice note after each consult — Salvia maps audio directly to compliance-grade clinical records, controlled drug logs, and audit trails. No manual charting, no memory gaps."
        path="/products/point-of-care-evidence"
        keywords={['voice to clinical notes', 'clinical records India', 'controlled drug records', 'NABH records', 'contemporaneous clinical notes', 'AI medical scribe India']}
      />
      <GrassHeader />
      <main style={{ flex: 1, zIndex: 10, background: '#fff' }}>

        {/* Hero */}
        <section className="g-section" style={{ padding: '148px 0 72px' }}>
          <div className="g-container">
            <div className="g-split">
              <div>
                <Rv as="h1" className="g-h1" style={{ fontSize: 'clamp(38px, 4.6vw, 66px)', marginBottom: 20 }}>
                  Voice note in. <span className="g-hl">Audit-ready record out.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  The #1 cause of audit failure is delayed documentation. Notes written hours
                  after the consult lose accuracy and lose cases. Salvia captures at the point
                  of care — <b>structured, contemporaneous, defensible</b>.
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
                  src="/illustrations/audio_world.webp"
                  alt="A doctor's voice flowing as a golden ribbon into a clinical form whose fields light up"
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

        {/* Workflow + drawn record */}
        <section className="g-section">
          <div className="g-container">
            <div className="g-split">
              <div>
                <Rv as="h2" className="g-h2">
                  Consult to signed record <span className="g-hl">in under two minutes.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  No template-bashing, no end-of-day catch-up. The workflow fits the gap
                  between patients — and the original audio stays attached as evidence.
                </Rv>
                <Rv className="g-facts" delay={2}>
                  {HOW_IT_WORKS.map((s) => (
                    <div className="g-fact" key={s.label}>
                      <span>{s.label}</span>
                      <b>{s.value}</b>
                    </div>
                  ))}
                </Rv>
              </div>
              <Rv className="g-split-art" delay={1} style={{ display: 'block' }}>
                <EvidencePanel />
              </Rv>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="g-section g-center">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              Captured, <span className="g-hl">not reconstructed.</span>
            </Rv>
            <div className="g-grid" style={{ gap: 0, borderTop: '1px solid var(--g-line)' }}>
              <Rv className="g-stat" delay={1} style={{ textAlign: 'left' }}>
                <div className="g-num">&lt; 2 min</div>
                <div className="g-lbl">average time from voice note to signed record</div>
              </Rv>
              <Rv className="g-stat" delay={2} style={{ textAlign: 'left' }}>
                <div className="g-num">100%</div>
                <div className="g-lbl">required fields captured before a record can be signed</div>
              </Rv>
              <Rv className="g-stat" delay={3} style={{ textAlign: 'left' }}>
                <div className="g-num">0</div>
                <div className="g-lbl">fields invented by AI — gaps are flagged, never fabricated</div>
              </Rv>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              Every field an inspector <span className="g-hl">looks for.</span>
            </Rv>
            <div className="g-split" style={{ alignItems: 'start', marginTop: 16 }}>
              <div>
                {FEATURES.slice(0, 3).map((f, i) => (
                  <Rv className="g-check" key={f.title} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                    <span className="g-ck">✓</span>
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.body}</p>
                    </div>
                  </Rv>
                ))}
              </div>
              <div>
                {FEATURES.slice(3).map((f, i) => (
                  <Rv className="g-check" key={f.title} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                    <span className="g-ck">✓</span>
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.body}</p>
                    </div>
                  </Rv>
                ))}
              </div>
            </div>
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
                  Book a 20-minute demo — we'll show you the voice-to-record workflow in a
                  real clinical setting.
                </Rv>
                <Rv className="g-hero-ctas" delay={2} style={{ marginTop: 30 }}>
                  <Link className="g-btn g-btn--green" to="/start">
                    Book a demo
                  </Link>
                  <Link className="g-btn g-btn--ghost" to="/pricing">
                    See pricing
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
