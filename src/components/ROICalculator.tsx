import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MARKET_PRICING, marketMetaFor, type Vertical, type Market } from '../data/pricing';
import { useMarket } from '../lib/market';

// Per-market economic defaults for the ROI model (in each market's currency).
const MARKET_ECON: Record<Market, { hourly: number; annualRev: number }> = {
  IN: { hourly: 400, annualRev: 5_000_000 },
  US: { hourly: 90,  annualRev: 350_000 },
  UK: { hourly: 55,  annualRev: 220_000 },
  AU: { hourly: 80,  annualRev: 380_000 },
  NZ: { hourly: 72,  annualRev: 340_000 },
  EU: { hourly: 60,  annualRev: 240_000 },
};

const CFG: Record<Vertical, {
  complianceMonthly: number; complianceLabel: string;
  billingPct: number; annualRevPerSeat: number; noteUnit: string;
}> = {
  veterinary:     { complianceMonthly: 6000,  complianceLabel: 'VCI & state board audit avoidance',        billingPct: 0.02, annualRevPerSeat: 1500000, noteUnit: 'consults/day' },
  dental:         { complianceMonthly: 8000,  complianceLabel: 'DCI audit-failure avoidance',             billingPct: 0.03, annualRevPerSeat: 2500000, noteUnit: 'patients/day' },
  general_clinic: { complianceMonthly: 12000, complianceLabel: 'CGHS claw-back avoidance',        billingPct: 0.02, annualRevPerSeat: 2000000, noteUnit: 'patients/day' },
  allied_health:  { complianceMonthly: 6000,  complianceLabel: 'NCAHP / state council audit avoidance',  billingPct: 0.02, annualRevPerSeat: 1200000, noteUnit: 'sessions/day' },
};

const VERTICALS: { key: Vertical; label: string }[] = [
  { key: 'veterinary',     label: 'Vets'      },
  { key: 'dental',         label: 'Dental'    },
  { key: 'general_clinic', label: 'Clinics'   },
  { key: 'allied_health',  label: 'Allied'    },
];

const SEG_COLORS = ['var(--salvia-accent)', 'var(--salvia-primary)', '#CBD5E1'];


/* ── Donut ───────────────────────────────────────────────────── */
function Donut({ segments, centerLabel }: {
  segments: { value: number; color: string }[];
  centerLabel: string;
}) {
  const r = 80, cx = 104, cy = 104, sw = 22;
  const circ = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.value, 0);
  const gap = 4;
  const fractions = segments.map((seg) => seg.value / total);
  const paths = segments.map((seg, i) => {
    // Cumulative fraction of the segments before this one — a prefix sum
    // computed without mutating an accumulator during render (segments are
    // few, so the repeated slice is cheap).
    const start = fractions.slice(0, i).reduce((a, b) => a + b, 0);
    const len = Math.max(fractions[i] * circ - gap, 0);
    const rotate = start * 360 - 90;
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
        <span style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--salvia-accent)', letterSpacing: '-0.04em', lineHeight: 1 }}>
          {centerLabel}
        </span>
        <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--salvia-text-muted)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '3px' }}>per month</span>
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
      <div className="eyebrow" style={{ color: 'var(--salvia-text-muted)', marginBottom: '0.6rem' }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
        {options.map(o => (
          <button key={o.key} onClick={() => onChange(o.key)} style={{
            padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1.5px solid',
            borderColor: value === o.key ? 'var(--salvia-accent)' : 'var(--border-strong)',
            backgroundColor: value === o.key ? 'rgba(255,78,0,0.06)' : 'transparent',
            color: value === o.key ? 'var(--salvia-accent)' : 'var(--salvia-text-muted)',
            fontSize: 'var(--text-xs)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <span>{o.label}</span>
            {o.sub && <span style={{ fontSize: 'var(--text-2xs)', fontWeight: 500, opacity: 0.7 }}>{o.sub}</span>}
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
        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--salvia-primary)' }}>{label}</span>
        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 800, color: 'var(--salvia-accent)' }}>{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="roi-range"
        aria-label={label}
        style={{ '--fill': `${pct}%` } as React.CSSProperties}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
        <span style={{ fontSize: 'var(--text-2xs)', color: 'rgba(15,23,42,0.3)', fontFamily: 'monospace' }}>{min}</span>
        <span style={{ fontSize: 'var(--text-2xs)', color: 'rgba(15,23,42,0.3)', fontFamily: 'monospace' }}>{max}</span>
      </div>
    </div>
  );
}

/* ── main ────────────────────────────────────────────────────── */
export const ROICalculator = () => {
  const market = useMarket();
  const meta = marketMetaFor(market);
  const econ = MARKET_ECON[market];
  const fmt = (n: number) => meta.symbol + Math.round(n).toLocaleString(market === 'IN' ? 'en-IN' : 'en-US');
  const [vertical, setVertical]     = useState<Vertical>('veterinary');
  const [clinicians, setClinicians] = useState(3);
  const [consults, setConsults]     = useState(15);
  const [minNow, setMinNow]         = useState(12);
  const [hourly, setHourly]         = useState(() => MARKET_ECON[market].hourly);
  // Reset the hourly default to the market's typical wage when country changes.
  useEffect(() => { setHourly(MARKET_ECON[market].hourly); }, [market]);

  const cfg   = CFG[vertical];
  const seats = clinicians;
  const days  = 22;
  const saved = Math.max(0, minNow - 3);

  const timeValue       = (saved * consults * days * seats / 60) * hourly;
  const complianceValue = cfg.complianceMonthly;
  const billingValue    = (econ.annualRev * seats * cfg.billingPct) / 12;
  const totalValue      = timeValue + complianceValue + billingValue;

  // India is note-based, not seat-based: the plan follows from monthly AI-note volume.
  const notesPerMonth = consults * seats * days;
  const tiers       = MARKET_PRICING[market];
  const topTier     = tiers[tiers.length - 1];
  const tier        = tiers.find(t => notesPerMonth <= t.notesPerMonth) ?? topTier;
  const isCustom    = notesPerMonth > topTier.notesPerMonth;
  const monthlyCost = tier.monthly;
  const roi         = totalValue / monthlyCost;

  const rows = [
    { label: 'Time on documentation', value: timeValue, hint: `${Math.round(saved * consults * days * seats / 60)} hrs/month · ${saved} min saved/note` },
    { label: 'Compliance & risk',     value: complianceValue, hint: cfg.complianceLabel },
    ...(billingValue > 0 ? [{ label: 'Billing accuracy', value: billingValue, hint: `${(cfg.billingPct * 100).toFixed(0)}% leakage recovered` }] : []),
  ];

  const segments = rows.map((r, i) => ({ value: r.value, color: SEG_COLORS[i] }));

  return (
    <section style={{ padding: 'var(--section-pad) 0', backgroundColor: 'transparent', position: 'relative', zIndex: 10 }}>
      <style>{`
        .roi-range { -webkit-appearance: none; appearance: none; width: 100%; height: 3px; border-radius: 2px; outline: none; cursor: pointer; background: linear-gradient(to right, var(--salvia-accent) var(--fill), rgba(15,23,42,0.1) var(--fill)); margin: 0; display: block; }
        .roi-range::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #fff; border: 2.5px solid var(--salvia-accent); box-shadow: 0 1px 6px rgba(255,78,0,0.3); cursor: pointer; }
        .roi-range::-moz-range-thumb { width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 2.5px solid var(--salvia-accent); cursor: pointer; }
        .roi-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start; }
        .roi-card { padding: 2rem; }
        .roi-donut-row { display: flex; gap: 1.5rem; align-items: center; }
        .roi-summary { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .roi-summary-num { font-size: var(--text-3xl); }
        @media (max-width: 768px) {
          .roi-wrap { grid-template-columns: 1fr !important; gap: 1.25rem !important; }
          .roi-card { padding: 1.25rem !important; }
          .roi-donut-row { flex-direction: column; align-items: stretch; gap: 1.25rem; }
          .roi-summary-num { font-size: 2rem !important; }
        }
        @media (max-width: 380px) {
          .roi-summary { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="container" style={{ maxWidth: '960px' }}>

        {/* header */}
        <div style={{ marginBottom: '2.75rem' }}>
          <span className="eyebrow">ROI Calculator</span>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08, color: 'var(--salvia-primary)', marginTop: '0.6rem' }}>
            What does Salvia return?
          </h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--salvia-text-muted)', marginTop: '0.6rem', lineHeight: 1.6 }}>
            Doctors lose a third to half their day to records and paperwork. Move the sliders. Every number updates live.
          </p>
        </div>

        <div className="roi-wrap">

          {/* LEFT — inputs */}
          <div className="roi-card" style={{ backgroundColor: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--salvia-shadow-card)', display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            <ChipGroup label="Specialty" options={VERTICALS.map(v => ({ key: v.key, label: v.label }))} value={vertical} onChange={setVertical} />
            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />
            <Slider label="Clinicians" value={clinicians} min={1} max={15} onChange={setClinicians} display={`${clinicians} clinician${clinicians > 1 ? 's' : ''}`} />
            <Slider label="Consults per day, per clinician" value={consults} min={1} max={40} onChange={setConsults} display={`${consults} ${cfg.noteUnit}`} />
            <Slider label="Minutes on documentation per note today" value={minNow} min={3} max={45} onChange={setMinNow} display={`${minNow} min`} />
            <Slider label="Hourly staff cost" value={hourly} min={20} max={2000} step={5} onChange={setHourly} display={`${meta.symbol}${hourly}/hr`} />
            <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--salvia-text-muted)', fontFamily: 'monospace', lineHeight: 1.7, borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', margin: 0 }}>
              Salvia reduces documentation to ~3 min (review + sign). Saving {saved} min/note.
              {` ~${notesPerMonth.toLocaleString(market === 'IN' ? 'en-IN' : 'en-US')} AI notes/mo → ${isCustom ? `Custom plan (${topTier.notesPerMonth.toLocaleString()}+ notes)` : tier.name + ' plan'}.`}
              {` Billing: ${(cfg.billingPct * 100).toFixed(0)}% leakage on ${fmt(econ.annualRev)} rev/clinician/yr.`}
            </p>
          </div>

          {/* RIGHT — unified output */}
          <div className="roi-card" style={{ backgroundColor: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--salvia-shadow-card)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* donut + legend side by side on desktop, stacked on mobile */}
            <div className="roi-donut-row">
              <Donut segments={segments} centerLabel={fmt(totalValue)} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {rows.map((row, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <div style={{ width: 10, height: 10, borderRadius: '3px', backgroundColor: SEG_COLORS[i], flexShrink: 0 }} />
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--salvia-primary)', lineHeight: 1.3 }}>{row.label}</span>
                    </div>
                    <div style={{ paddingLeft: '18px' }}>
                      <div style={{ fontSize: 'var(--text-md)', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.02em' }}>{fmt(row.value)}<span style={{ fontSize: 'var(--text-2xs)', fontWeight: 500, color: 'var(--salvia-text-muted)', marginLeft: '2px' }}>/mo</span></div>
                      <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--salvia-text-muted)', fontFamily: 'monospace', marginTop: '1px' }}>{row.hint}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* divider */}
            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

            {/* ROI summary row */}
            <div className="roi-summary">
              <div>
                <div style={{ fontSize: 'var(--text-2xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--salvia-text-muted)', marginBottom: '0.3rem' }}>Return on spend</div>
                <div className="roi-summary-num" style={{ fontWeight: 800, color: 'var(--salvia-accent)', letterSpacing: '-0.05em', lineHeight: 1 }}>{roi.toFixed(1)}×</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-2xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--salvia-text-muted)', marginBottom: '0.3rem' }}>Salvia costs</div>
                <div className="roi-summary-num" style={{ fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.05em', lineHeight: 1 }}>{fmt(monthlyCost)}</div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--salvia-text-muted)', marginTop: '0.2rem', fontFamily: 'monospace' }}>{isCustom ? `Custom · ${topTier.notesPerMonth.toLocaleString()}+ notes/mo` : `${tier.name} · ${tier.notesPerMonth} AI notes/mo`}</div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--salvia-text-muted)', marginTop: '0.25rem' }}>
                  <strong style={{ color: 'var(--salvia-accent)' }}>{fmt(totalValue - monthlyCost)}</strong> monthly surplus
                </div>
              </div>
            </div>

            {/* divider */}
            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

            <Link to="/start" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: 'var(--text-sm)', fontWeight: 700 }}>
                <div className="shimmer" />
                Book a demo
              </button>
            </Link>

            <p style={{ fontSize: 'var(--text-2xs)', color: 'var(--salvia-text-muted)', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
              Time valued at blended staff cost. Compliance is annualised expected value from cleaner records and fewer audit claw-backs. Not a guarantee.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
