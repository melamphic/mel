import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, type Vertical } from '../data/pricing';

/* ── types ──────────────────────────────────────────────────── */
interface VerticalCfg {
  complianceMonthly: number;
  complianceLabel: string;
  billingPct: number;       // fraction of (annualRevPerSeat * staff / 12)
  annualRevPerSeat: number;
  noteUnit: string;
}

const CFG: Record<Vertical, VerticalCfg> = {
  veterinary:     { complianceMonthly: 250,  complianceLabel: 'VMR & NZVC controlled drug audit (expected value)', billingPct: 0.02, annualRevPerSeat: 200000, noteUnit: 'consults/day' },
  dental:         { complianceMonthly: 208,  complianceLabel: 'GDC / DCNZ audit non-compliance (expected value)',  billingPct: 0.03, annualRevPerSeat: 250000, noteUnit: 'patients/day' },
  general_clinic: { complianceMonthly: 667,  complianceLabel: 'Medicare / ACC audit & claw-back (expected value)', billingPct: 0.02, annualRevPerSeat: 300000, noteUnit: 'patients/day' },
  aged_care:      { complianceMonthly: 3125, complianceLabel: 'SIRS Priority 1 non-reporting — up to $50K/incident', billingPct: 0, annualRevPerSeat: 0, noteUnit: 'shifts/day' },
};

const VERTICALS: { key: Vertical; label: string }[] = [
  { key: 'veterinary',     label: 'Vets'      },
  { key: 'dental',         label: 'Dental'    },
  { key: 'general_clinic', label: 'Clinics'   },
  { key: 'aged_care',      label: 'Aged Care' },
];

type Tab = 'total' | 'time' | 'compliance';

/* ── helpers ─────────────────────────────────────────────────── */
function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }
function fmtK(n: number) { return n >= 1000 ? '$' + (n / 1000).toFixed(1) + 'k' : fmt(n); }

/* ── ArcGauge ────────────────────────────────────────────────── */
function ArcGauge({ pct, label, value }: { pct: number; label: string; value: string }) {
  const cx = 120, cy = 100, r = 80, sw = 13;
  // clamp to avoid degenerate paths at 0 or 1
  const p = Math.min(Math.max(pct, 0.005), 0.995);
  // angle: pct=0 → π (left), pct=1 → 0 (right), going clockwise through top
  const angle = Math.PI * (1 - p);
  const ex = cx + r * Math.cos(angle);
  const ey = cy - r * Math.sin(angle);          // y flipped in SVG
  // arc always < 180° so large-arc-flag is always 0
  // sweep-flag=1 → clockwise in SVG = goes UP from left = top semicircle
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '280px', margin: '0 auto' }}>
      <svg viewBox="0 0 240 110" style={{ width: '100%', display: 'block' }}>
        {/* background full semicircle */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke="rgba(15,23,42,0.07)" strokeWidth={sw} strokeLinecap="round"
        />
        {/* orange fill arc */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`}
          fill="none" stroke="#FF4E00" strokeWidth={sw} strokeLinecap="round"
        />
        {/* thumb dot at tip */}
        <circle cx={ex} cy={ey} r={sw / 2 + 1} fill="#FF4E00" stroke="#fff" strokeWidth="2.5" />
      </svg>
      {/* centre label — sits inside the arc bowl */}
      <div style={{
        position: 'absolute', bottom: '6px', left: 0, right: 0,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 900, color: 'var(--salvia-accent)', letterSpacing: '-0.04em', lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: '0.68rem', color: 'var(--salvia-text-muted)', marginTop: '0.2rem', fontWeight: 500 }}>
          {label}
        </div>
      </div>
    </div>
  );
}

/* ── Slider ──────────────────────────────────────────────────── */
function Slider({ label, value, min, max, step = 1, display, onChange }: {
  label: string; value: number; min: number; max: number; step?: number;
  display: string; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--salvia-primary)' }}>{label}</span>
        <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--salvia-accent)', letterSpacing: '-0.02em' }}>{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="roi-range"
        style={{ '--fill': `${pct}%` } as React.CSSProperties}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.65rem', color: 'var(--salvia-text-muted)', fontFamily: 'monospace' }}>{min}</span>
        <span style={{ fontSize: '0.65rem', color: 'var(--salvia-text-muted)', fontFamily: 'monospace' }}>{max}</span>
      </div>
    </div>
  );
}

/* ── ChipGroup ───────────────────────────────────────────────── */
function ChipGroup<T extends string>({ label, options, value, onChange }: {
  label: string;
  options: { key: T; label: string; sub?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--salvia-primary)' }}>{label}</span>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {options.map(o => (
          <button key={o.key} onClick={() => onChange(o.key)} style={{
            padding: o.sub ? '0.55rem 1rem' : '0.55rem 1.2rem',
            borderRadius: '10px',
            border: '1.5px solid',
            borderColor: value === o.key ? 'var(--salvia-accent)' : 'rgba(15,23,42,0.12)',
            backgroundColor: value === o.key ? 'rgba(255,78,0,0.06)' : '#fff',
            color: value === o.key ? 'var(--salvia-accent)' : 'var(--salvia-text-muted)',
            fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
            transition: 'all 0.15s ease',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1rem',
          }}>
            <span>{o.label}</span>
            {o.sub && <span style={{ fontSize: '0.62rem', fontWeight: 500, opacity: 0.7 }}>{o.sub}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── main ────────────────────────────────────────────────────── */
export const ROICalculator = () => {
  const [vertical, setVertical] = useState<Vertical>('veterinary');
  const [staff, setStaff]       = useState<'1-3' | '4-7'>('1-3');
  const [consults, setConsults] = useState(15);
  const [minNow, setMinNow]     = useState(12);
  const [hourly, setHourly]     = useState(45);
  const [tab, setTab]           = useState<Tab>('total');

  const cfg  = CFG[vertical];
  const seats = staff === '1-3' ? 3 : 7;
  const days  = vertical === 'aged_care' ? 26 : 22;
  const saved = Math.max(0, minNow - 3);

  const timeValue       = (saved * consults * days * seats / 60) * hourly;
  const complianceValue = cfg.complianceMonthly;
  const billingValue    = vertical !== 'aged_care' ? (cfg.annualRevPerSeat * seats * cfg.billingPct) / 12 : 0;
  const totalValue      = timeValue + complianceValue + billingValue;

  const product    = PRODUCTS.find(p => p.key === vertical)!;
  const tierIdx    = staff === '1-3' ? 0 : 1;
  const tierData   = product.tiers[tierIdx];
  const monthlyCost = tierData.prices['US'];
  const roi          = totalValue / monthlyCost;
  const paybackRaw   = (monthlyCost / totalValue) * 30;
  const paybackLabel = paybackRaw < 1 ? '< 1 day' : `${Math.round(paybackRaw)} days`;
  const gaugePct     = Math.min(roi / 20, 1);

  const hoursPerMonth = Math.round(saved * consults * days * seats / 60);

  const TABS: { key: Tab; label: string }[] = [
    { key: 'total',      label: 'Total savings'  },
    { key: 'time',       label: 'Time recovered' },
    { key: 'compliance', label: 'Compliance'     },
  ];

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--salvia-bg)', position: 'relative', zIndex: 10 }}>
      <style>{`
        .roi-range { -webkit-appearance: none; appearance: none; width: 100%; height: 4px; border-radius: 2px; outline: none; cursor: pointer; background: linear-gradient(to right, #FF4E00 var(--fill), rgba(15,23,42,0.1) var(--fill)); }
        .roi-range::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: #FF4E00; border: 3px solid #fff; box-shadow: 0 0 0 1.5px #FF4E00, 0 2px 8px rgba(255,78,0,0.3); cursor: pointer; }
        .roi-range::-moz-range-thumb { width: 16px; height: 16px; border-radius: 50%; background: #FF4E00; border: 3px solid #fff; box-shadow: 0 0 0 1.5px #FF4E00; cursor: pointer; }
        .roi-card { background: #fff; border: 1px solid rgba(15,23,42,0.07); border-radius: 24px; box-shadow: var(--salvia-shadow-card); }
        .roi-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 1.5rem; align-items: start; }
        @media (max-width: 768px) { .roi-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div className="container" style={{ maxWidth: '1060px' }}>

        {/* header */}
        <div style={{ marginBottom: '2.75rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--salvia-accent)' }}>
            ROI Calculator
          </span>
          <h2 style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08, color: 'var(--salvia-primary)', marginTop: '0.6rem' }}>
            What does Salvia return?
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--salvia-text-muted)', marginTop: '0.6rem', lineHeight: 1.6 }}>
            Adjust the inputs. Every number updates live.
          </p>
        </div>

        <div className="roi-grid">

          {/* ── LEFT: inputs ── */}
          <div className="roi-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

              <ChipGroup
                label="Your specialty"
                options={VERTICALS.map(v => ({ key: v.key, label: v.label }))}
                value={vertical}
                onChange={(v) => { setVertical(v); setTab('total'); }}
              />

              <ChipGroup
                label="Practice size"
                options={[
                  { key: '1-3' as const, label: '1–3 staff', sub: `Practice · ${fmt(product.tiers[0].prices['US'])}/mo` },
                  { key: '4-7' as const, label: '4–7 staff', sub: `Pro · ${fmt(product.tiers[1].prices['US'])}/mo` },
                ]}
                value={staff}
                onChange={setStaff}
              />

              <div style={{ height: '1px', backgroundColor: 'rgba(15,23,42,0.06)' }} />

              <Slider
                label={`${vertical === 'aged_care' ? 'Shifts' : 'Consults'} per day, per clinician`}
                value={consults} min={1} max={40} onChange={setConsults}
                display={`${consults} ${cfg.noteUnit}`}
              />

              <Slider
                label="Minutes on documentation per note — today"
                value={minNow} min={3} max={45} onChange={setMinNow}
                display={`${minNow} min`}
              />

              <Slider
                label="Hourly staff cost"
                value={hourly} min={20} max={150} step={5} onChange={setHourly}
                display={`$${hourly}/hr`}
              />

              <p style={{ fontSize: '0.7rem', color: 'var(--salvia-text-muted)', fontFamily: 'monospace', lineHeight: 1.6, borderTop: '1px solid rgba(15,23,42,0.06)', paddingTop: '1rem', margin: 0 }}>
                Salvia reduces documentation to ~3 min (review + sign). Saving {saved} min/note.
                {vertical !== 'aged_care' && ` Billing leakage: ${(cfg.billingPct * 100).toFixed(0)}% of $${(cfg.annualRevPerSeat / 1000).toFixed(0)}K rev/clinician/yr.`}
              </p>
            </div>
          </div>

          {/* ── RIGHT: output ── */}
          <div className="roi-card" style={{ padding: '0' }}>

            {/* tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(15,23,42,0.07)', padding: '0 1.5rem' }}>
              {TABS.map(t => (
                <button key={t.key} onClick={() => setTab(t.key)} style={{
                  padding: '1.1rem 0', marginRight: '1.75rem',
                  border: 'none', backgroundColor: 'transparent', cursor: 'pointer',
                  fontSize: '0.8rem', fontWeight: 700,
                  color: tab === t.key ? 'var(--salvia-accent)' : 'var(--salvia-text-muted)',
                  borderBottom: '2px solid',
                  borderBottomColor: tab === t.key ? 'var(--salvia-accent)' : 'transparent',
                  transition: 'all 0.15s',
                  letterSpacing: '-0.01em',
                }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* tab content */}
            <div style={{ padding: '2rem' }}>

              {/* TOTAL */}
              {tab === 'total' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <ArcGauge pct={gaugePct} label="monthly value recovered" value={fmtK(totalValue)} />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {[
                      { label: 'Return on spend', value: roi.toFixed(1) + '×', accent: true },
                      { label: 'Pays for itself in', value: paybackLabel, accent: false },
                      { label: 'You pay monthly', value: fmt(monthlyCost), accent: false },
                      { label: 'You keep monthly', value: fmtK(totalValue - monthlyCost), accent: true },
                    ].map((m, i) => (
                      <div key={i} style={{ padding: '1rem', borderRadius: '12px', backgroundColor: 'rgba(15,23,42,0.02)', border: '1px solid rgba(15,23,42,0.06)' }}>
                        <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--salvia-text-muted)', marginBottom: '0.3rem' }}>{m.label}</div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '-0.03em', color: m.accent ? 'var(--salvia-accent)' : 'var(--salvia-primary)' }}>{m.value}</div>
                      </div>
                    ))}
                  </div>

                  <Link to="/contact-sales" style={{ textDecoration: 'none' }}>
                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '0.95rem', fontWeight: 700 }}>
                      <div className="shimmer" />
                      Book a demo
                    </button>
                  </Link>
                </div>
              )}

              {/* TIME */}
              {tab === 'time' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <ArcGauge pct={timeValue / totalValue} label="of value from time savings" value={fmtK(timeValue)} />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[
                      { label: 'Hours returned / month', value: hoursPerMonth + ' hrs' },
                      { label: 'Minutes saved per note', value: saved + ' min' },
                      { label: 'Staff hours per working day', value: (saved * consults / 60).toFixed(1) + ' hrs/clinician' },
                      { label: 'Monthly time value', value: fmt(timeValue) },
                    ].map((r, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 0', borderBottom: '1px solid rgba(15,23,42,0.05)' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--salvia-text-muted)' }}>{r.label}</span>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--salvia-primary)' }}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--salvia-text-muted)', fontFamily: 'monospace', margin: 0 }}>
                    Valued at ${hourly}/hr blended staff cost · {days} working days/month
                  </p>
                </div>
              )}

              {/* COMPLIANCE */}
              {tab === 'compliance' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <ArcGauge pct={complianceValue / totalValue} label="of value from compliance" value={fmtK(complianceValue)} />

                  <div style={{ padding: '1.25rem', borderRadius: '14px', backgroundColor: 'rgba(255,78,0,0.04)', border: '1px solid rgba(255,78,0,0.1)' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--salvia-accent)', marginBottom: '0.4rem' }}>Risk reduced</div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--salvia-primary)', lineHeight: 1.55, fontWeight: 500 }}>{cfg.complianceLabel}</div>
                  </div>

                  {billingValue > 0 && (
                    <div style={{ padding: '1.25rem', borderRadius: '14px', backgroundColor: 'rgba(15,23,42,0.02)', border: '1px solid rgba(15,23,42,0.06)' }}>
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--salvia-text-muted)', marginBottom: '0.4rem' }}>Billing accuracy</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--salvia-text-muted)' }}>{(cfg.billingPct * 100).toFixed(0)}% leakage recovered · {seats} clinicians</span>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--salvia-primary)' }}>{fmt(billingValue)}/mo</span>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                      { label: 'Compliance value / month', value: fmt(complianceValue) },
                      { label: 'Billing recovery / month', value: billingValue > 0 ? fmt(billingValue) : 'N/A' },
                      { label: 'Combined / month', value: fmt(complianceValue + billingValue) },
                    ].map((r, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid rgba(15,23,42,0.05)' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--salvia-text-muted)' }}>{r.label}</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--salvia-primary)' }}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
