import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, type Vertical } from '../data/pricing';

const CFG: Record<Vertical, {
  complianceMonthly: number; complianceLabel: string;
  billingPct: number; annualRevPerSeat: number; noteUnit: string;
}> = {
  veterinary:     { complianceMonthly: 250,  complianceLabel: 'VMR & NZVC audit avoidance',        billingPct: 0.02, annualRevPerSeat: 200000, noteUnit: 'consults/day' },
  dental:         { complianceMonthly: 208,  complianceLabel: 'GDC / DCNZ audit avoidance',        billingPct: 0.03, annualRevPerSeat: 250000, noteUnit: 'patients/day' },
  general_clinic: { complianceMonthly: 667,  complianceLabel: 'Medicare / ACC claw-back avoidance',billingPct: 0.02, annualRevPerSeat: 300000, noteUnit: 'patients/day' },
  aged_care:      { complianceMonthly: 3125, complianceLabel: 'SIRS Priority 1 fine avoidance',    billingPct: 0,    annualRevPerSeat: 0,      noteUnit: 'shifts/day'   },
};

const VERTICALS: { key: Vertical; label: string }[] = [
  { key: 'veterinary',     label: 'Vets'      },
  { key: 'dental',         label: 'Dental'    },
  { key: 'general_clinic', label: 'Clinics'   },
  { key: 'aged_care',      label: 'Aged Care' },
];

const SEG_COLORS = ['#FF4E00', '#0F172A', '#CBD5E1'];

function fmt(n: number) { return '$' + Math.round(n).toLocaleString(); }

/* ── Donut ───────────────────────────────────────────────────── */
function Donut({ segments, centerLabel }: {
  segments: { value: number; color: string }[];
  centerLabel: string;
}) {
  const r = 80, cx = 104, cy = 104, sw = 22;
  const circ = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.value, 0);
  const gap = 4;
  let cum = 0;
  const paths = segments.map(seg => {
    const len = Math.max((seg.value / total) * circ - gap, 0);
    const rotate = (cum / circ) * 360 - 90;
    cum += (seg.value / total) * circ;
    return { color: seg.color, dasharray: `${len} ${circ}`, rotate };
  });

  return (
    <div style={{ position: 'relative', width: '208px', height: '208px', flexShrink: 0, filter: 'drop-shadow(0 4px 20px rgba(255,78,0,0.18))' }}>
      <svg viewBox="0 0 208 208" style={{ width: '100%', height: '100%' }}>
        {/* track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(15,23,42,0.06)" strokeWidth={sw} />
        {paths.map((p, i) => (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill="none" stroke={p.color} strokeWidth={sw}
            strokeDasharray={p.dasharray}
            transform={`rotate(${p.rotate} ${cx} ${cy})`}
          />
        ))}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
        <span style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--salvia-accent)', letterSpacing: '-0.04em', lineHeight: 1 }}>
          {centerLabel}
        </span>
        <span style={{ fontSize: '0.62rem', color: 'var(--salvia-text-muted)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '3px' }}>per month</span>
      </div>
    </div>
  );
}

/* ── Chip ────────────────────────────────────────────────────── */
function ChipGroup<T extends string>({ label, options, value, onChange }: {
  label: string; options: { key: T; label: string; sub?: string }[];
  value: T; onChange: (v: T) => void;
}) {
  return (
    <div>
      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--salvia-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
        {options.map(o => (
          <button key={o.key} onClick={() => onChange(o.key)} style={{
            padding: '0.5rem 1rem', borderRadius: '10px', border: '1.5px solid',
            borderColor: value === o.key ? 'var(--salvia-accent)' : 'rgba(15,23,42,0.1)',
            backgroundColor: value === o.key ? 'rgba(255,78,0,0.06)' : 'transparent',
            color: value === o.key ? 'var(--salvia-accent)' : 'var(--salvia-text-muted)',
            fontSize: '0.83rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <span>{o.label}</span>
            {o.sub && <span style={{ fontSize: '0.58rem', fontWeight: 500, opacity: 0.7 }}>{o.sub}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Slider ──────────────────────────────────────────────────── */
function Slider({ label, value, min, max, step = 1, display, onChange }: {
  label: string; value: number; min: number; max: number;
  step?: number; display: string; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--salvia-primary)' }}>{label}</span>
        <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--salvia-accent)' }}>{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="roi-range"
        style={{ '--fill': `${pct}%` } as React.CSSProperties}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
        <span style={{ fontSize: '0.6rem', color: 'rgba(15,23,42,0.3)', fontFamily: 'monospace' }}>{min}</span>
        <span style={{ fontSize: '0.6rem', color: 'rgba(15,23,42,0.3)', fontFamily: 'monospace' }}>{max}</span>
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

  const cfg   = CFG[vertical];
  const seats = staff === '1-3' ? 3 : 7;
  const days  = vertical === 'aged_care' ? 26 : 22;
  const saved = Math.max(0, minNow - 3);

  const timeValue       = (saved * consults * days * seats / 60) * hourly;
  const complianceValue = cfg.complianceMonthly;
  const billingValue    = vertical !== 'aged_care' ? (cfg.annualRevPerSeat * seats * cfg.billingPct) / 12 : 0;
  const totalValue      = timeValue + complianceValue + billingValue;

  const product    = PRODUCTS.find(p => p.key === vertical)!;
  const tierData   = product.tiers[staff === '1-3' ? 0 : 1];
  const monthlyCost = tierData.prices['US'];
  const roi        = totalValue / monthlyCost;

  const rows = [
    { label: 'Time on documentation', value: timeValue, hint: `${Math.round(saved * consults * days * seats / 60)} hrs/month · ${saved} min saved/note` },
    { label: 'Compliance & risk',     value: complianceValue, hint: cfg.complianceLabel },
    ...(billingValue > 0 ? [{ label: 'Billing accuracy', value: billingValue, hint: `${(cfg.billingPct * 100).toFixed(0)}% leakage recovered` }] : []),
  ];

  const segments = rows.map((r, i) => ({ value: r.value, color: SEG_COLORS[i] }));

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--salvia-bg)', position: 'relative', zIndex: 10 }}>
      <style>{`
        .roi-range { -webkit-appearance: none; appearance: none; width: 100%; height: 3px; border-radius: 2px; outline: none; cursor: pointer; background: linear-gradient(to right, #FF4E00 var(--fill), rgba(15,23,42,0.1) var(--fill)); margin: 0; display: block; }
        .roi-range::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #fff; border: 2.5px solid #FF4E00; box-shadow: 0 1px 6px rgba(255,78,0,0.3); cursor: pointer; }
        .roi-range::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 2.5px solid #FF4E00; cursor: pointer; }
        .roi-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; }
        @media (max-width: 768px) { .roi-wrap { grid-template-columns: 1fr !important; } }
      `}</style>

      <div className="container" style={{ maxWidth: '1020px' }}>

        {/* header */}
        <div style={{ marginBottom: '2.75rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--salvia-accent)' }}>ROI Calculator</span>
          <h2 style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08, color: 'var(--salvia-primary)', marginTop: '0.6rem' }}>
            What does Salvia return?
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--salvia-text-muted)', marginTop: '0.6rem', lineHeight: 1.6 }}>
            Move the sliders. Every number updates live.
          </p>
        </div>

        <div className="roi-wrap">

          {/* LEFT — inputs */}
          <div style={{ backgroundColor: '#fff', border: '1px solid rgba(15,23,42,0.07)', borderRadius: '20px', padding: '2rem', boxShadow: 'var(--salvia-shadow-card)', display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            <ChipGroup label="Specialty" options={VERTICALS.map(v => ({ key: v.key, label: v.label }))} value={vertical} onChange={setVertical} />
            <ChipGroup
              label="Practice size"
              options={[
                { key: '1-3' as const, label: '1–3 staff', sub: `Practice · ${fmt(product.tiers[0].prices['US'])}/mo` },
                { key: '4-7' as const, label: '4–7 staff', sub: `Pro · ${fmt(product.tiers[1].prices['US'])}/mo` },
              ]}
              value={staff} onChange={setStaff}
            />
            <div style={{ height: '1px', backgroundColor: 'rgba(15,23,42,0.06)' }} />
            <Slider label={`${vertical === 'aged_care' ? 'Shifts' : 'Consults'} per day, per clinician`} value={consults} min={1} max={40} onChange={setConsults} display={`${consults} ${cfg.noteUnit}`} />
            <Slider label="Minutes on documentation per note today" value={minNow} min={3} max={45} onChange={setMinNow} display={`${minNow} min`} />
            <Slider label="Hourly staff cost" value={hourly} min={20} max={150} step={5} onChange={setHourly} display={`$${hourly}/hr`} />
            <p style={{ fontSize: '0.67rem', color: 'var(--salvia-text-muted)', fontFamily: 'monospace', lineHeight: 1.7, borderTop: '1px solid rgba(15,23,42,0.06)', paddingTop: '1rem', margin: 0 }}>
              Salvia reduces documentation to ~3 min (review + sign). Saving {saved} min/note.
              {vertical !== 'aged_care' ? ` Billing: ${(cfg.billingPct * 100).toFixed(0)}% leakage on $${(cfg.annualRevPerSeat / 1000).toFixed(0)}K rev/clinician/yr.` : ''}
            </p>
          </div>

          {/* RIGHT — unified output */}
          <div style={{ backgroundColor: '#fff', border: '1px solid rgba(15,23,42,0.07)', borderRadius: '20px', padding: '2rem', boxShadow: 'var(--salvia-shadow-card)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* donut + legend side by side */}
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <Donut segments={segments} centerLabel={fmt(totalValue)} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {rows.map((row, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <div style={{ width: 10, height: 10, borderRadius: '3px', backgroundColor: SEG_COLORS[i], flexShrink: 0 }} />
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--salvia-primary)', lineHeight: 1.3 }}>{row.label}</span>
                    </div>
                    <div style={{ paddingLeft: '18px' }}>
                      <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--salvia-primary)', letterSpacing: '-0.02em' }}>{fmt(row.value)}<span style={{ fontSize: '0.65rem', fontWeight: 500, color: 'var(--salvia-text-muted)', marginLeft: '2px' }}>/mo</span></div>
                      <div style={{ fontSize: '0.67rem', color: 'var(--salvia-text-muted)', fontFamily: 'monospace', marginTop: '1px' }}>{row.hint}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* divider */}
            <div style={{ height: '1px', backgroundColor: 'rgba(15,23,42,0.06)' }} />

            {/* ROI summary row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--salvia-text-muted)', marginBottom: '0.3rem' }}>Return on spend</div>
                <div style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--salvia-accent)', letterSpacing: '-0.05em', lineHeight: 1 }}>{roi.toFixed(1)}×</div>
              </div>
              <div>
                <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--salvia-text-muted)', marginBottom: '0.3rem' }}>Salvia costs</div>
                <div style={{ fontSize: '2.75rem', fontWeight: 900, color: 'var(--salvia-primary)', letterSpacing: '-0.05em', lineHeight: 1 }}>{fmt(monthlyCost)}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--salvia-text-muted)', marginTop: '0.25rem' }}>
                  <strong style={{ color: 'var(--salvia-accent)' }}>{fmt(totalValue - monthlyCost)}</strong> monthly surplus
                </div>
              </div>
            </div>

            {/* divider */}
            <div style={{ height: '1px', backgroundColor: 'rgba(15,23,42,0.06)' }} />

            <Link to="/start" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '0.92rem', fontWeight: 700 }}>
                <div className="shimmer" />
                Book a demo
              </button>
            </Link>

            <p style={{ fontSize: '0.65rem', color: 'var(--salvia-text-muted)', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
              Time valued at blended staff cost. Compliance is annualised expected value. Not a guarantee.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
