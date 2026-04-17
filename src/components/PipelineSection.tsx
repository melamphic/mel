import { useState } from 'react';

type DomainId = 'clinic' | 'vet' | 'dental';

const DOMAINS = [
  { id: 'clinic' as DomainId, label: 'General Clinic', color: '#FF4E00' },
  { id: 'vet' as DomainId, label: 'Veterinary', color: '#0EA5E9' },
  { id: 'dental' as DomainId, label: 'Dental', color: '#7C3AED' },
];

const STATUS = {
  done: { color: '#059669', bg: '#ECFDF5', label: 'Processed' },
  flag: { color: '#D97706', bg: '#FFFBEB', label: 'Flagged' },
  locked: { color: '#0F172A', bg: '#F8FAFC', label: 'Locked' },
};

interface NodeContent { color: string; tag: string; title: string; body: React.ReactNode; }
type DomainScenario = {
  top: NodeContent; left: NodeContent; right: NodeContent; bottom: NodeContent;
  timeline: { time: string; actor: string; action: string; status: keyof typeof STATUS }[];
};

// ── Micro content components ─────────────────────────────────────────────────
const Transcript = ({ text }: { text: string }) => (
  <div style={{
    backgroundColor: '#F8FAFC',
    borderRadius: '8px',
    padding: '0.6rem 0.8rem',
    fontSize: '0.78rem',
    color: '#475569',
    lineHeight: 1.6,
    fontStyle: 'italic',
    borderLeft: '3px solid #E2E8F0',
  }}>
    {text}
  </div>
);

const FormFields = ({ fields }: { fields: [string, string][] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
    {fields.map(([label, value], i) => (
      <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline', paddingBottom: '0.3rem', borderBottom: i < fields.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
        <span style={{ fontSize: '0.67rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', minWidth: 76, flexShrink: 0 }}>{label}</span>
        <span style={{ fontSize: '0.78rem', color: '#0F172A', fontWeight: 500 }}>{value}</span>
      </div>
    ))}
  </div>
);

const PolicyItems = ({ items }: { items: [string, 'ok' | 'warn'][] }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.28rem' }}>
    {items.map(([label, state], i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: '0.28rem', borderBottom: i < items.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
        <div style={{
          width: 18, height: 18, borderRadius: '5px', flexShrink: 0,
          backgroundColor: state === 'ok' ? '#ECFDF5' : '#FFFBEB',
          color: state === 'ok' ? '#059669' : '#D97706',
          fontSize: '0.65rem', fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {state === 'ok' ? '✓' : '!'}
        </div>
        <span style={{ fontSize: '0.77rem', color: state === 'warn' ? '#92400E' : '#334155', fontWeight: state === 'warn' ? 500 : 400 }}>{label}</span>
      </div>
    ))}
  </div>
);

const SignOff = ({ name, role, note }: { name: string; role: string; note: string }) => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
      <div style={{
        width: 30, height: 30, backgroundColor: '#0F172A', color: '#fff',
        fontSize: '0.7rem', fontWeight: 700, borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {name.replace('Dr. ', '').split(' ').map(w => w[0]).join('').slice(0, 2)}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0F172A', letterSpacing: '-0.01em' }}>{name}</div>
        <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{role}</div>
      </div>
      <div style={{
        fontSize: '0.65rem', fontWeight: 700, color: '#059669',
        backgroundColor: '#ECFDF5', padding: '0.2rem 0.55rem',
        borderRadius: '999px', letterSpacing: '0.02em',
      }}>Signed</div>
    </div>
    <div style={{ fontSize: '0.76rem', color: '#64748B', lineHeight: 1.6, paddingTop: '0.45rem', borderTop: '1px solid #F1F5F9' }}>{note}</div>
  </div>
);

// ── Domain scenarios ─────────────────────────────────────────────────────────
const SCENARIOS: Record<DomainId, DomainScenario> = {
  clinic: {
    top: {
      color: '#FF4E00', tag: 'EVIDENCE', title: 'Point of Care Capture',
      body: <Transcript text='"Patient is a 58-year-old female with a 10-day productive cough, worse at night. Chest tightness. Temp 99.8°F, SpO₂ 97%, mild expiratory wheezing right lower lobe."' />,
    },
    left: {
      color: '#6366F1', tag: 'MAPPING', title: 'Deterministic Extraction',
      body: <FormFields fields={[['Patient', 'Ms. Carter · 58F'], ['Complaint', 'Productive cough ×10d'], ['Vitals', '99.8°F · SpO₂ 97%'], ['Assessment', 'Viral bronchitis'], ['Plan', 'Albuterol 2 puffs QID']]} />,
    },
    right: {
      color: '#D97706', tag: 'GOVERNANCE', title: 'Compliance Validation',
      body: <PolicyItems items={[['Vitals documented', 'ok'], ['Chief complaint recorded', 'ok'], ['Diagnosis stated', 'ok'], ['Rx requires MD sign-off', 'warn']]} />,
    },
    bottom: {
      color: '#059669', tag: 'VERIFY', title: 'Statutory Verification',
      body: <SignOff name="Dr. R. Patel" role="General Practitioner" note="Albuterol 2 puffs QID confirmed. Policy acknowledged. Note published to patient record." />,
    },
    timeline: [
      { time: '08:14', actor: 'Nurse', action: 'Evidence captured — Ms. Carter, 58F', status: 'done' },
      { time: '08:14', actor: 'Salvia', action: 'Deterministic form extraction complete', status: 'done' },
      { time: '08:15', actor: 'Compliance Hub', action: 'Regulatory flag identified — MD signature required', status: 'flag' },
      { time: '08:16', actor: 'Dr. Patel', action: 'Verified, signed & published to infrastructure', status: 'done' },
      { time: '08:16', actor: 'Salvia', action: 'Record hashed & immutable PDF generated', status: 'locked' },
    ],
  },
  vet: {
    top: {
      color: '#0EA5E9', tag: 'EVIDENCE', title: 'Point of Care Capture',
      body: <Transcript text='"Bella, 4-year-old DSH cat. Owner reports vomiting once daily for three days, partially digested food. Temp 101.5°F, weight 10.2 lbs, mild dehydration present."' />,
    },
    left: {
      color: '#6366F1', tag: 'MAPPING', title: 'Deterministic Extraction',
      body: <FormFields fields={[['Patient', 'Bella · Cat · 4yr DSH'], ['Complaint', 'Vomiting ×3 days'], ['Weight', '10.2 lbs (−0.3 lbs)'], ['Assessment', 'Acute GI upset'], ['Treatment', 'Cerenia · Bland diet ×5d']]} />,
    },
    right: {
      color: '#D97706', tag: 'GOVERNANCE', title: 'Compliance Validation',
      body: <PolicyItems items={[['Weight & temp recorded', 'ok'], ['Hydration status noted', 'ok'], ['Diagnosis documented', 'ok'], ['Medication admin needs consent', 'warn']]} />,
    },
    bottom: {
      color: '#059669', tag: 'VERIFY', title: 'Statutory Verification',
      body: <SignOff name="Dr. S. Reid" role="Veterinarian" note="Cerenia 1mg/kg confirmed. Owner consent noted. Record published and discharge summary generated." />,
    },
    timeline: [
      { time: '11:30', actor: 'Tech', action: 'Evidence captured — Bella (cat), vomiting ×3 days', status: 'done' },
      { time: '11:31', actor: 'Salvia', action: 'Physical exam form extraction complete', status: 'done' },
      { time: '11:31', actor: 'Compliance Hub', action: 'Consent flag identified — owner signature needed', status: 'flag' },
      { time: '11:32', actor: 'Dr. Reid', action: 'Verified, consent noted & published', status: 'done' },
      { time: '11:33', actor: 'Salvia', action: 'Record hashed & immutable PDF generated', status: 'locked' },
    ],
  },
  dental: {
    top: {
      color: '#7C3AED', tag: 'EVIDENCE', title: 'Point of Care Capture',
      body: <Transcript text='"Mr. Osei, 34-year-old male. Sharp pain upper-left molar, tooth 14, provoked by cold water for two months. No spontaneous pain. Probing 2–3mm, occlusal decay visible."' />,
    },
    left: {
      color: '#6366F1', tag: 'MAPPING', title: 'Deterministic Extraction',
      body: <FormFields fields={[['Patient', 'Mr. K. Osei · 34M'], ['Tooth', '#14 — Upper left molar'], ['Finding', 'Occlusal caries · Class I'], ['Diagnosis', 'Reversible pulpitis'], ['Treatment', 'Composite restoration (D2391)']]} />,
    },
    right: {
      color: '#D97706', tag: 'GOVERNANCE', title: 'Compliance Validation',
      body: <PolicyItems items={[['Probing depths recorded', 'ok'], ['Radiograph reference noted', 'ok'], ['Diagnosis & CDT code present', 'ok'], ['Restoration needs pre-auth', 'warn']]} />,
    },
    bottom: {
      color: '#7C3AED', tag: 'VERIFY', title: 'Statutory Verification',
      body: <SignOff name="Dr. E. Kwame" role="General Dentist" note="D2391 confirmed. Pre-auth packet approved. Note published to patient record." />,
    },
    timeline: [
      { time: '09:05', actor: 'Hygienist', action: 'Evidence captured — Mr. Osei, tooth #14 pain', status: 'done' },
      { time: '09:06', actor: 'Salvia', action: 'Clinical form extraction complete', status: 'done' },
      { time: '09:06', actor: 'Compliance Hub', action: 'Pre-auth flag identified — insurance check needed', status: 'flag' },
      { time: '09:08', actor: 'Dr. Kwame', action: 'Verified, pre-auth approved & published', status: 'done' },
      { time: '09:09', actor: 'Salvia', action: 'Record hashed & immutable PDF generated', status: 'locked' },
    ],
  },
};

// ── Node card — matches site's feature-card style ────────────────────────────
const Node = ({ n }: { n: NodeContent }) => (
  <div style={{
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 8px 24px rgba(25,56,46,0.04)',
    padding: '1rem 1.1rem',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: 10, height: 10, backgroundColor: n.color, borderRadius: '3px', flexShrink: 0 }} />
        <span style={{ fontSize: '0.86rem', fontWeight: 600, color: '#0F172A', letterSpacing: '-0.01em' }}>{n.title}</span>
      </div>
      <span style={{
        fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em',
        color: n.color, backgroundColor: `${n.color}12`,
        padding: '0.18rem 0.5rem', borderRadius: '999px',
      }}>
        {n.tag}
      </span>
    </div>
    <div>{n.body}</div>
  </div>
);

// ── Connector between nodes ──────────────────────────────────────────────────
const Connector = ({ badge, color }: { badge: string; color: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ width: 1.5, flex: 1, backgroundColor: `${color}50` }} />
    <div style={{
      fontSize: '0.65rem', fontWeight: 600,
      color, backgroundColor: '#fff',
      border: `1px solid ${color}55`,
      padding: '0.18rem 0.65rem', borderRadius: '999px',
      whiteSpace: 'nowrap', margin: '0.15rem 0',
      boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
    }}>
      {badge}
    </div>
    <div style={{ width: 1.5, flex: 1, backgroundColor: `${color}50` }} />
  </div>
);

// ── Main section ─────────────────────────────────────────────────────────────
export const PipelineSection = () => {
  const [active, setActive] = useState<DomainId>('clinic');
  const domain = DOMAINS.find(d => d.id === active)!;
  const s = SCENARIOS[active];

  return (
    <section id="pipeline" style={{ backgroundColor: 'var(--salvia-bg)', padding: '6rem 0' }}>
      <style>{`
        @media (max-width: 768px) {
          .pipeline-grid {
             grid-template-columns: 1fr !important;
          }
          .connector-set {
             display: flex !important;
             flex-direction: column !important;
             height: auto !important;
             padding: 1rem 0 !important;
          }
        }
      `}</style>
      <div className="container" style={{ maxWidth: '1200px' }}>

        {/* Domain toggle — separate spaced pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {DOMAINS.map(d => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              style={{
                padding: '0.55rem 1.4rem',
                border: 'none', cursor: 'pointer',
                fontSize: '0.84rem', fontWeight: 500,
                borderRadius: '999px',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                ...(active === d.id
                  ? { backgroundColor: '#0F172A', color: '#fff', boxShadow: '0 4px 12px rgba(15,23,42,0.18)' }
                  : { backgroundColor: '#fff', color: '#475569', boxShadow: '0 8px 24px rgba(25,56,46,0.04), inset 0 0 0 1px rgba(0,0,0,0.08)' }
                ),
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Two-column */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '2rem', alignItems: 'start' }} className="mobile-stack">

          {/* ── LEFT: Flow canvas ── */}
          <div style={{
            background: 'radial-gradient(#C4C8D4 1px, transparent 1px), linear-gradient(155deg, #FDF4EC 0%, #EEF2FF 100%)',
            backgroundSize: '20px 20px, 100% 100%',
            borderRadius: '16px',
            border: '1px solid rgba(0,0,0,0.08)',
            padding: '1.25rem',
          }}>
            {/* Start indicator — minimal dot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#059669', boxShadow: '0 0 0 3px #DCFCE7' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#059669', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Start</span>
              </div>
              <div style={{ width: 1.5, height: 12, backgroundColor: '#86EFAC' }} />
            </div>

            <Node n={s.top} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: 48 }} className="connector-set">
              <Connector badge="Automatically" color="#6366F1" />
              <Connector badge="Conditions" color={domain.color} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }} className="pipeline-grid">
              <Node n={s.left} />
              <Node n={s.right} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: 48 }} className="connector-set">
              <Connector badge="Conditions" color="#6366F1" />
              <Connector badge="Automatically" color={domain.color} />
            </div>

            <Node n={s.bottom} />
          </div>

          {/* ── RIGHT: Timeline ── */}
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 8px 24px rgba(25,56,46,0.04)',
            overflow: 'hidden',
            position: 'sticky',
            top: '2rem',
          }}>
            <div style={{ padding: '1rem 1.2rem', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A', letterSpacing: '-0.01em' }}>Governance Trail</div>
                <div style={{ fontSize: '0.73rem', color: '#94A3B8', marginTop: '1px' }}>Immutable Record · Statutory Proof</div>
              </div>
              <div style={{ fontSize: '0.68rem', fontWeight: 600, color: domain.color, backgroundColor: `${domain.color}12`, padding: '0.22rem 0.65rem', borderRadius: '999px' }}>
                {s.timeline.length} events
              </div>
            </div>

            <div style={{ padding: '0.5rem 0 0' }}>
              {s.timeline.map((e, i) => {
                const st = STATUS[e.status];
                const isLast = i === s.timeline.length - 1;
                return (
                  <div key={`${active}-${i}`} style={{ display: 'flex', padding: '0 1.2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 16, flexShrink: 0, marginRight: '0.75rem' }}>
                      <div style={{ marginTop: 14 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: st.color, boxShadow: `0 0 0 3px ${st.color}20` }} />
                      </div>
                      {!isLast && <div style={{ width: 1.5, flex: 1, backgroundColor: '#F1F5F9', margin: '3px 0 0' }} />}
                    </div>
                    <div style={{ paddingBottom: isLast ? '0.75rem' : '1rem', flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.4rem' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.18rem', marginTop: '0.9rem' }}>
                            <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#94A3B8', fontFamily: 'monospace' }}>{e.time}</span>
                            <span style={{ color: '#E2E8F0', fontSize: '0.68rem' }}>·</span>
                            <span style={{ fontSize: '0.68rem', fontWeight: 500, color: '#475569' }}>{e.actor}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: '#334155', lineHeight: 1.5 }}>{e.action}</p>
                        </div>
                        <span style={{
                          fontSize: '0.63rem', fontWeight: 600,
                          color: st.color, backgroundColor: st.bg,
                          padding: '0.2rem 0.5rem', borderRadius: '999px',
                          whiteSpace: 'nowrap', marginTop: '0.95rem', flexShrink: 0,
                        }}>
                          {st.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ padding: '0.8rem 1.2rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Tamper-proof · hashed on lock</span>
              <button className="pill-button" style={{ fontSize: '0.72rem', padding: '0.4rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
