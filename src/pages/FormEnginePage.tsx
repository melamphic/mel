import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { Rv } from '../components/grass/Rv';

// /products/statutory-form-infrastructure — the form engine module.
// Story: immutable, versioned records with required fields enforced.
// Grass design language.

const FEATURES: { title: string; body: string }[] = [
  { title: 'Immutable record versioning', body: 'Every signed record is locked. Corrections create a versioned addendum with reason, timestamp and clinician signature — never an overwrite.' },
  { title: 'Required fields before signing', body: 'Missing vitals, drug doses or consent entries block submission. The form cannot be signed incomplete — no more "vitals not recorded" citations.' },
  { title: 'Statutory PDF export', body: 'Every record exports to a high-fidelity PDF preserving all metadata, version history and signatures. Satisfies paper audit requirements without paper.' },
  { title: 'Condition-based logic', body: 'Fields appear or become required based on what\'s entered — controlled drug fields for a Schedule H1 drug, consent fields for surgical procedures.' },
  { title: 'Addendum trail', body: 'Every post-sign edit is an addendum — date, clinician, reason for change. The original is always preserved. A billing correction becomes a defensible paper trail.' },
  { title: 'Framework-aware form sets', body: 'Templates built to the field requirements of your vertical and regulators — NMC, DCI, VCI, NABH, CEA 2010. Pick your discipline; the required fields follow.' },
];

const RECORD_TYPES: { label: string; value: string }[] = [
  { label: 'Clinical consultation', value: 'NMC · NABH · CEA 2010' },
  { label: 'Surgical & anaesthetic', value: 'NABH · CEA 2010' },
  { label: 'Controlled drug administration', value: 'Schedule H1 · D&C Rules' },
  { label: 'Procedure consent', value: 'DCI · NABH · CPA 2019' },
  { label: 'Euthanasia record', value: 'VCI · CCSEA' },
  { label: 'Incident & complaint log', value: 'NABH · CEA 2010' },
  { label: 'Discharge & follow-up plan', value: 'NMC · NABH' },
  { label: 'Periodontal & BPE chart', value: 'DCI · NABH' },
];

// Drawn product UI: the version history of a signed record.
const VersionPanel = () => (
  <div className="g-ui g-ui--panel">
    <div className="g-ui-head">
      <div>
        <div className="g-ui-head-title">Record — Consultation, 14 May 2026</div>
        <div className="g-ui-head-sub">Immutable versions · addendum trail</div>
      </div>
      <span className="g-ui-tag">Locked</span>
    </div>
    <div style={{ padding: '12px 16px 14px' }}>
      {[
        { ver: 'v1.0', label: 'Original record signed', time: '14 May · 14:32' },
        { ver: 'v1.1', label: 'Addendum: corrected drug dose', time: '14 May · 16:05' },
        { ver: 'v1.2', label: 'Addendum: follow-up plan added', time: '15 May · 09:18' },
      ].map((v, i) => (
        <div className="g-ui-field" key={v.ver} style={i === 2 ? { background: 'var(--g-green-soft)', borderRadius: 8, padding: '7px 8px' } : undefined}>
          <span className="g-ui-f-label" style={{ width: 44, color: 'var(--g-green)', fontWeight: 800 }}>{v.ver}</span>
          <span className="g-ui-f-value">{v.label}</span>
          <span className="g-ui-conf g-ui-conf--med" style={{ background: '#F1F5F9', color: '#64748B' }}>{v.time}</span>
        </div>
      ))}
      <div className="g-ui-meta-row">
        <span className="g-ui-tag">Original always preserved</span>
        <span className="g-ui-tag g-ui-tag--ink">Edits never overwrite</span>
        <span className="g-ui-tag g-ui-tag--ink">Reason + signature per addendum</span>
      </div>
    </div>
  </div>
);

export const FormEnginePage = () => {
  return (
    <>
      <SEO
        title="Statutory Form Infrastructure"
        description="Salvia's form infrastructure turns clinical notes into immutable, versioned records — audit-ready for NMC, DCI, VCI and NABH compliance. Required fields enforced. Addendum trail built in."
        path="/products/statutory-form-infrastructure"
        keywords={['clinical form compliance', 'immutable clinical records', 'audit-ready notes', 'NABH records', 'clinical record versioning', 'form builder healthcare India']}
      />
      <GrassHeader />
      <main style={{ flex: 1, zIndex: 10, background: '#fff' }}>

        {/* Hero */}
        <section className="g-section" style={{ padding: '148px 0 72px' }}>
          <div className="g-container">
            <div className="g-split">
              <div>
                <Rv as="h1" className="g-h1" style={{ fontSize: 'clamp(38px, 4.6vw, 66px)', marginBottom: 20 }}>
                  Records that can't be <span className="g-hl">argued with.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  Immutable from the moment you sign. Every field enforced before submission.
                  Every correction an addendum. Built to the exact structure regulators look
                  for — <b>not a general form tool adapted for clinics</b>.
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
                  src="/illustrations/story_form.webp"
                  alt="A clinician assembling a clinical form from field blocks"
                />
              </Rv>
            </div>
          </div>
        </section>

        {/* Version history */}
        <section className="g-section">
          <div className="g-container">
            <div className="g-split">
              <div>
                <Rv as="h2" className="g-h2">
                  Signed once. <span className="g-hl">Provable forever.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  A signed record never changes — it grows. Corrections and additions become{' '}
                  <b>versioned addenda</b> with the clinician, reason and timestamp attached,
                  exactly the correction trail regulators expect to see.
                </Rv>
                <Rv className="g-facts" delay={2}>
                  <div className="g-fact"><span>On signing</span><b>Record locks — content hash sealed</b></div>
                  <div className="g-fact"><span>On correction</span><b>Addendum with reason, never an overwrite</b></div>
                  <div className="g-fact"><span>On export</span><b>PDF with full version history and signatures</b></div>
                  <div className="g-fact"><span>On audit</span><b>The original, every version, in one file</b></div>
                </Rv>
              </div>
              <Rv className="g-split-art" delay={1} style={{ display: 'block' }}>
                <VersionPanel />
              </Rv>
            </div>
          </div>
        </section>

        {/* Record types */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              Built for every <span className="g-hl">encounter type.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              Each record type carries the field set its framework demands — enforced at
              submission, not discovered at audit.
            </Rv>
            <div className="g-split" style={{ alignItems: 'start', marginTop: 40 }}>
              <Rv delay={1}>
                <div className="g-facts">
                  {RECORD_TYPES.slice(0, 4).map((r) => (
                    <div className="g-fact" key={r.label}>
                      <span>{r.label}</span>
                      <b>{r.value}</b>
                    </div>
                  ))}
                </div>
              </Rv>
              <Rv delay={2}>
                <div className="g-facts">
                  {RECORD_TYPES.slice(4).map((r) => (
                    <div className="g-fact" key={r.label}>
                      <span>{r.label}</span>
                      <b>{r.value}</b>
                    </div>
                  ))}
                </div>
              </Rv>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              The structure regulators <span className="g-hl">actually look for.</span>
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
                  Records that hold up <span className="g-hl">in any inspection.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1} style={{ marginTop: 14 }}>
                  Book a 20-minute demo to see how the form engine works in your clinical
                  setting.
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
