import { useState } from 'react';
import { PRODUCTS, type Vertical } from '../data/pricing';

const VERTICALS: { key: Vertical; label: string }[] = [
  { key: 'veterinary', label: 'Vets' },
  { key: 'dental', label: 'Dental' },
  { key: 'general_clinic', label: 'Clinics' },
  { key: 'aged_care', label: 'Aged Care' },
];

const COMPLIANCE: Record<Vertical, { monthly: number; label: string }> = {
  veterinary:    { monthly: 250,  label: 'VMR & NZVC controlled drug audit (expected value)' },
  dental:        { monthly: 208,  label: 'GDC / DCNZ audit non-compliance (expected value)' },
  general_clinic:{ monthly: 667,  label: 'Medicare / ACC audit & claw-back (expected value)' },
  aged_care:     { monthly: 3125, label: 'SIRS Priority 1 non-reporting — up to $50K/incident' },
};

const WORKING_DAYS: Record<Vertical, number> = {
  veterinary: 22, dental: 22, general_clinic: 22, aged_care: 26,
};

function salviaPrice(vertical: Vertical, staff: number): { label: string; monthly: number } | null {
  const product = PRODUCTS.find(p => p.key === vertical);
  if (!product) return null;
  if (staff <= 3) return { label: 'Practice', monthly: product.tiers[0].prices['US'] };
  if (staff <= 7) return { label: 'Pro', monthly: product.tiers[1].prices['US'] };
  return null; // 8+ = contact sales
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  hint?: string;
  onChange: (v: number) => void;
}

const Slider = ({ label, value, min, max, step = 1, unit = '', hint, onChange }: SliderProps) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--salvia-primary)' }}>
          {label}
        </span>
        <span style={{
          fontSize: '1.1rem', fontWeight: 800, color: 'var(--salvia-accent)',
          letterSpacing: '-0.03em',
        }}>
          {unit}{value}
        </span>
      </div>
      <div style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '4px',
          backgroundColor: 'rgba(15,23,42,0.08)', borderRadius: '2px',
        }} />
        <div style={{
          position: 'absolute', left: 0, width: `${pct}%`, height: '4px',
          backgroundColor: 'var(--salvia-accent)', borderRadius: '2px',
          transition: 'width 0.1s',
        }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{
            position: 'absolute', left: 0, right: 0,
            width: '100%', opacity: 0, cursor: 'pointer', height: '20px', margin: 0,
          }}
        />
      </div>
      {hint && (
        <span style={{ fontSize: '0.7rem', color: 'var(--salvia-text-muted)', fontFamily: 'monospace' }}>
          {hint}
        </span>
      )}
    </div>
  );
};

interface NumberInputProps {
  label: string;
  prefix?: string;
  value: number;
  onChange: (v: number) => void;
  hint?: string;
}

const NumberInput = ({ label, prefix, value, onChange, hint }: NumberInputProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--salvia-primary)' }}>
      {label}
    </span>
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.4rem',
      border: '1px solid rgba(15,23,42,0.12)', borderRadius: '10px',
      backgroundColor: '#fff', padding: '0.6rem 0.85rem',
      transition: 'border-color 0.15s',
    }}>
      {prefix && (
        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--salvia-text-muted)' }}>
          {prefix}
        </span>
      )}
      <input
        type="number"
        value={value}
        onChange={e => onChange(Math.max(0, Number(e.target.value)))}
        style={{
          border: 'none', outline: 'none', fontSize: '0.95rem',
          fontWeight: 700, color: 'var(--salvia-primary)', width: '100%',
          backgroundColor: 'transparent', fontFamily: 'inherit',
        }}
      />
    </div>
    {hint && (
      <span style={{ fontSize: '0.7rem', color: 'var(--salvia-text-muted)', fontFamily: 'monospace' }}>
        {hint}
      </span>
    )}
  </div>
);

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString();
}

export const ROICalculator = () => {
  const [vertical, setVertical]       = useState<Vertical>('veterinary');
  const [staff, setStaff]             = useState(3);
  const [consultsPerDay, setConsults] = useState(15);
  const [minPerNote, setMinPerNote]   = useState(12);
  const [hourlyRate, setHourlyRate]   = useState(45);
  const [annualRevenue, setRevenue]   = useState(200000);

  const days = WORKING_DAYS[vertical];
  const savedMinPerNote = Math.max(0, minPerNote - 3); // Salvia → ~3 min review
  const hoursPerMonth = (savedMinPerNote * consultsPerDay * days * staff) / 60;
  const timeValue = hoursPerMonth * hourlyRate;
  const complianceValue = COMPLIANCE[vertical].monthly;
  const billingValue = vertical !== 'aged_care' ? (annualRevenue * 0.02) / 12 * staff : 0;
  const totalValue = timeValue + complianceValue + billingValue;

  const plan = salviaPrice(vertical, staff);
  const monthlyCost = plan?.monthly ?? null;
  const roiMultiple = monthlyCost ? totalValue / monthlyCost : null;
  const paybackDays = monthlyCost ? Math.round((monthlyCost / totalValue) * 30) : null;

  return (
    <section style={{
      padding: '6rem 0',
      backgroundColor: 'var(--salvia-bg)',
      position: 'relative', zIndex: 10,
    }}>
      <style>{`
        .roi-main-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 3rem; align-items: start; }
        .roi-metric-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; padding: 1.25rem 1.5rem; background: #fff; border: 1px solid rgba(15,23,42,0.06); border-radius: 14px; box-shadow: var(--salvia-shadow-card); }
        @media (max-width: 768px) { .roi-main-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div className="container" style={{ maxWidth: '1100px' }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <span style={{
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--salvia-accent)',
          }}>
            ROI Calculator
          </span>
          <h2 style={{
            fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08,
            color: 'var(--salvia-primary)', marginTop: '0.6rem',
          }}>
            What does Salvia return<br />for your practice?
          </h2>
          <p style={{
            fontSize: '1rem', color: 'var(--salvia-text-muted)',
            marginTop: '0.75rem', maxWidth: '520px', lineHeight: 1.6,
          }}>
            Enter your actual numbers. Every line is explained.
          </p>
        </div>

        {/* Vertical pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {VERTICALS.map(v => (
            <button
              key={v.key}
              onClick={() => setVertical(v.key)}
              style={{
                padding: '0.6rem 1.4rem', borderRadius: '999px',
                border: '1px solid',
                borderColor: vertical === v.key ? 'var(--salvia-accent)' : 'rgba(15,23,42,0.12)',
                backgroundColor: vertical === v.key ? 'rgba(255,78,0,0.06)' : '#fff',
                color: vertical === v.key ? 'var(--salvia-accent)' : 'var(--salvia-text-muted)',
                fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.18s ease', letterSpacing: '-0.01em',
              }}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="roi-main-grid">

          {/* LEFT — inputs */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid rgba(15,23,42,0.06)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: 'var(--salvia-shadow-card)',
            display: 'flex', flexDirection: 'column', gap: '1.75rem',
          }}>
            <Slider
              label="Clinical staff using AI notes"
              value={staff} min={1} max={10} onChange={setStaff}
              hint={staff <= 3 ? 'Practice tier (1–3)' : staff <= 7 ? 'Pro tier (4–7)' : 'Contact sales (8+)'}
            />
            <Slider
              label={vertical === 'aged_care' ? 'Shifts documented per day, per staff' : 'Consultations per day, per clinician'}
              value={consultsPerDay} min={1} max={40} onChange={setConsults}
            />
            <Slider
              label="Minutes spent on notes per consultation today"
              value={minPerNote} min={3} max={45} step={1} unit="" onChange={setMinPerNote}
              hint={`Salvia brings this to ~3 min (review + sign). Saving: ${savedMinPerNote} min/note`}
            />
            <NumberInput
              label="Hourly staff cost (blended, $USD)"
              prefix="$" value={hourlyRate} onChange={setHourlyRate}
              hint="Salary ÷ 2,080 working hours/year"
            />
            {vertical !== 'aged_care' && (
              <NumberInput
                label="Annual practice revenue ($USD, optional)"
                prefix="$" value={annualRevenue} onChange={setRevenue}
                hint="Used to estimate 2% billing leakage recovery"
              />
            )}
          </div>

          {/* RIGHT — outputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

            {/* Time */}
            <div className="roi-metric-row">
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'var(--salvia-text-muted)', marginBottom: '0.35rem',
                }}>
                  Documentation time recovered
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--salvia-text-muted)', lineHeight: 1.5 }}>
                  {Math.round(hoursPerMonth)} hrs/month · {staff} staff · {savedMinPerNote} min saved/note
                </div>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
                  {fmt(timeValue)}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--salvia-text-muted)' }}>/month</div>
              </div>
            </div>

            {/* Compliance */}
            <div className="roi-metric-row">
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'var(--salvia-text-muted)', marginBottom: '0.35rem',
                }}>
                  Compliance risk reduction
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--salvia-text-muted)', lineHeight: 1.5 }}>
                  {COMPLIANCE[vertical].label}
                </div>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
                  {fmt(complianceValue)}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--salvia-text-muted)' }}>/month</div>
              </div>
            </div>

            {/* Billing — not for aged care */}
            {vertical !== 'aged_care' && (
              <div className="roi-metric-row">
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--salvia-text-muted)', marginBottom: '0.35rem',
                  }}>
                    Billing accuracy recovery
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--salvia-text-muted)', lineHeight: 1.5 }}>
                    2% of ${(annualRevenue * staff).toLocaleString()} combined annual revenue
                  </div>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--salvia-primary)', letterSpacing: '-0.03em' }}>
                    {fmt(billingValue)}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--salvia-text-muted)' }}>/month</div>
                </div>
              </div>
            )}

            {/* Summary card */}
            <div style={{
              backgroundColor: '#fff',
              border: '1px solid rgba(15,23,42,0.06)',
              borderRadius: '20px',
              padding: '1.75rem',
              boxShadow: 'var(--salvia-shadow-soft)',
              marginTop: '0.25rem',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem 2rem' }}>
                <div>
                  <div style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--salvia-text-muted)', marginBottom: '0.3rem',
                  }}>
                    Monthly value
                  </div>
                  <div style={{
                    fontSize: '2.2rem', fontWeight: 900, color: 'var(--salvia-accent)',
                    letterSpacing: '-0.04em',
                  }}>
                    {fmt(totalValue)}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--salvia-text-muted)', marginBottom: '0.3rem',
                  }}>
                    Salvia {plan?.label ?? ''} cost
                  </div>
                  <div style={{
                    fontSize: '2.2rem', fontWeight: 900, color: 'var(--salvia-primary)',
                    letterSpacing: '-0.04em',
                  }}>
                    {monthlyCost ? fmt(monthlyCost) : '—'}
                  </div>
                </div>

                <div style={{ gridColumn: '1 / -1', height: '1px', backgroundColor: 'rgba(15,23,42,0.06)' }} />

                <div>
                  <div style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--salvia-text-muted)', marginBottom: '0.3rem',
                  }}>
                    Return on spend
                  </div>
                  <div style={{
                    fontSize: '2.5rem', fontWeight: 900, color: 'var(--salvia-accent)',
                    letterSpacing: '-0.04em',
                  }}>
                    {roiMultiple ? roiMultiple.toFixed(1) + '×' : '—'}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--salvia-text-muted)', marginBottom: '0.3rem',
                  }}>
                    Pays for itself in
                  </div>
                  <div style={{
                    fontSize: '2.5rem', fontWeight: 900, color: 'var(--salvia-primary)',
                    letterSpacing: '-0.04em',
                  }}>
                    {paybackDays !== null ? (
                      <>
                        {paybackDays}
                        <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--salvia-text-muted)', marginLeft: '0.25rem' }}>
                          days/month
                        </span>
                      </>
                    ) : (
                      <span style={{ fontSize: '1rem', color: 'var(--salvia-text-muted)' }}>Contact sales</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <p style={{
              fontSize: '0.7rem', color: 'var(--salvia-text-muted)',
              lineHeight: 1.6, fontStyle: 'italic',
            }}>
              Time valued at staff cost rate, not billing rate. Compliance is annualised expected value based on published audit rates. Billing recovery assumes 2% leakage. Not a guarantee.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
