import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { Rv } from '../components/grass/Rv';

// /products/institutional-compliance-hub — the policy engine module.
// Story: static policy PDFs become active, attested, auditable governance.
// Grass design language.

const FEATURES: { title: string; body: string }[] = [
  { title: 'Policy mapped to regulation', body: 'Tag each clause as legally enforceable and link it to a NABH standard, CEA 2010 requirement or D&C Rules section. Staff see the mandate behind every protocol.' },
  { title: 'Active staff attestation', body: 'Policies aren\'t read once at onboarding. Staff attest on a schedule; every attestation is timestamped and auditable — "didn\'t know" is no longer a defence.' },
  { title: 'Point-of-care policy search', body: '"What\'s our protocol for dispensing tramadol without a physical exam?" — answered from your own documents, in the consult room, not from Google.' },
  { title: 'Retirement and version events', body: 'Retire a policy and every linked form and protocol is flagged. A major version event requires a principal\'s signature before practice continues.' },
  { title: 'Regulatory coverage mirror', body: 'Salvia maps your policy set against NABH, CEA and D&C requirements and shows the gaps. Not a checklist — a live coverage map.' },
  { title: 'Incident-to-policy linking', body: 'When an incident is logged, the relevant policy surfaces — was there a protocol? Was it followed? The governance link is visible and auditable.' },
];

const USE_CASES: { img: string; label: string; value: string }[] = [
  { img: '/illustrations/tpl_work_cert.webp', label: 'New staff onboarding', value: 'Required policies queued for attestation on first login — done before they see their first patient.' },
  { img: '/illustrations/shield_cross.webp', label: 'NABH assessment prep', value: 'A coverage report: which standards your policies address, and which have no policy mapped.' },
  { img: '/illustrations/policy.webp', label: 'Policy update rollout', value: 'Update a policy, trigger re-attestation for all relevant staff. Completion tracked and logged.' },
  { img: '/illustrations/tpl_referral.webp', label: 'Complaint response', value: 'The full governance picture for an incident — policies in effect at the time, attestations, any gaps.' },
];

// Drawn product UI: the live coverage map.
const CoveragePanel = () => (
  <div className="g-ui g-ui--panel">
    <div className="g-ui-head">
      <div>
        <div className="g-ui-head-title">Policy coverage — NABH documentation standards</div>
        <div className="g-ui-head-sub">Live map · attestation status per policy</div>
      </div>
      <span className="g-ui-tag g-ui-tag--warn">1 gap flagged</span>
    </div>
    <div style={{ padding: '12px 14px 14px' }}>
      <div className="g-check-row g-check-row--pass">
        <span className="g-ck-ic" />
        <span><b>Clinical Records Policy v2.1</b><span className="g-ck-note">Mapped · attested 12/12 staff</span></span>
      </div>
      <div className="g-check-row g-check-row--pass">
        <span className="g-ck-ic" />
        <span><b>Controlled Drug Protocol v1.4</b><span className="g-ck-note">Mapped · attested 11/12 staff — 1 reminder queued</span></span>
      </div>
      <div className="g-check-row g-check-row--fail">
        <span className="g-ck-ic" />
        <span><b>Consent &amp; Capacity Policy v1.0</b><span className="g-ck-note">Gap flagged · attested 6/12 staff</span></span>
      </div>
      <div className="g-check-row g-check-row--fail">
        <span className="g-ck-ic" />
        <span><b>Incident Reporting Procedure</b><span className="g-ck-note">No policy mapped to this standard yet</span></span>
      </div>
      <div className="g-ui-meta-row" style={{ marginTop: 10 }}>
        <span className="g-ui-tag g-ui-tag--ink">Every attestation timestamped</span>
        <span className="g-ui-tag g-ui-tag--ink">Coverage report exportable</span>
      </div>
    </div>
  </div>
);

export const PolicyEnginePage = () => {
  return (
    <>
      <SEO
        title="Institutional Compliance Hub"
        description="Turn static policy PDFs into active clinical governance. Salvia maps your internal rules to NABH, CEA 2010 and D&C frameworks — every staff action backed by an auditable mandate."
        path="/products/institutional-compliance-hub"
        keywords={['clinical governance software', 'NABH compliance', 'policy management healthcare', 'institutional compliance India', 'staff attestation software', 'policy engine clinic']}
      />
      <GrassHeader />
      <main style={{ flex: 1, zIndex: 10, background: '#fff' }}>

        {/* Hero */}
        <section className="g-section" style={{ padding: '148px 0 72px' }}>
          <div className="g-container">
            <div className="g-split">
              <div>
                <Rv as="h1" className="g-h1" style={{ fontSize: 'clamp(38px, 4.6vw, 66px)', marginBottom: 20 }}>
                  A policy no one reads <span className="g-hl">is a liability.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  Most practices have policies. Almost none can prove their staff have read
                  them, understand them, or follow them. Salvia turns static PDF manuals into{' '}
                  <b>active governance</b> — mapped to regulatory codes, attested by staff, and
                  auditable on demand.
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
                  src="/illustrations/story_policy.webp"
                  alt="A wall of policy binders wired by green cables into a clinical form"
                />
              </Rv>
            </div>
          </div>
        </section>

        {/* Coverage map */}
        <section className="g-section">
          <div className="g-container">
            <div className="g-split">
              <Rv className="g-split-art" delay={1} style={{ display: 'block', order: 0 }}>
                <CoveragePanel />
              </Rv>
              <div style={{ order: 1 }}>
                <Rv as="h2" className="g-h2">
                  Governance you can <span className="g-hl">see.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  Every policy shows where it maps, who has attested and when — and every
                  standard shows which policies cover it. The gap an assessor would find,{' '}
                  <b>you find first</b>.
                </Rv>
                <Rv className="g-facts" delay={2}>
                  <div className="g-fact"><span>Mapping</span><b>Clause → NABH / CEA / D&amp;C reference</b></div>
                  <div className="g-fact"><span>Attestation</span><b>Scheduled, timestamped, per staff member</b></div>
                  <div className="g-fact"><span>Gaps</span><b>Flagged live, not at the assessment</b></div>
                  <div className="g-fact"><span>Ships with</span><b>58 ready policies, each clause citing its regulation</b></div>
                </Rv>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="g-section">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              Active governance, <span className="g-hl">not a filing cabinet.</span>
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

        {/* Use cases */}
        <section className="g-section g-center">
          <div className="g-container">
            <Rv as="h2" className="g-h2">
              The four moments <span className="g-hl">it matters most.</span>
            </Rv>
            <div className="g-tpl-grid" style={{ textAlign: 'left', marginTop: 52 }}>
              {USE_CASES.map((u, i) => (
                <Rv className="g-card" key={u.label} delay={(Math.min(i + 1, 4)) as 1 | 2 | 3 | 4}>
                  <img src={u.img} alt="" loading="lazy" />
                  <h3 className="g-h3" style={{ fontSize: 17 }}>{u.label}</h3>
                  <p>{u.value}</p>
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
                  Governance you can <span className="g-hl">prove.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1} style={{ marginTop: 14 }}>
                  Book a 20-minute demo to see how the compliance hub works in a real practice
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
                  src="/illustrations/shield.webp"
                  alt="A shield with a checkmark"
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
