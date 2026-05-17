import { useState } from 'react';
import { PRODUCTS, type Vertical } from '../data/pricing';

const VERTICALS: { key: Vertical; label: string }[] = [
  { key: 'veterinary',    label: 'Vets'      },
  { key: 'dental',        label: 'Dental'    },
  { key: 'general_clinic',label: 'Clinics'   },
  { key: 'aged_care',     label: 'Aged Care' },
];

interface VerticalDefaults {
  notesPerDay: number;
  minutesSaved: number;   // current − 3 min (review + sign)
  hourlyRate: number;
  workingDays: number;
  billingPerStaffPerMonth: number;
  complianceMonthly: number;
  complianceLabel: string;
  noteUnit: string;
  assumptionLines: string[];
}

const DEFAULTS: Record<Vertical, VerticalDefaults> = {
  veterinary: {
    notesPerDay: 15, minutesSaved: 9, hourlyRate: 45, workingDays: 22,
    billingPerStaffPerMonth: 333,
    complianceMonthly: 250,
    complianceLabel: 'VMR & NZVC audit non-compliance (expected value)',
    noteUnit: 'consults/day per vet',
    assumptionLines: ['15 consults/day per vet', '9 min saved per note', '$45/hr blended staff cost', '2% billing leakage on $200K revenue/vet/yr'],
  },
  dental: {
    notesPerDay: 10, minutesSaved: 7, hourlyRate: 55, workingDays: 22,
    billingPerStaffPerMonth: 625,
    complianceMonthly: 208,
    complianceLabel: 'GDC / DCNZ audit non-compliance (expected value)',
    noteUnit: 'patients/day per dentist',
    assumptionLines: ['10 patients/day per dentist', '7 min saved per note', '$55/hr blended staff cost', '3% billing leakage on $250K revenue/dentist/yr'],
  },
  general_clinic: {
    notesPerDay: 22, minutesSaved: 7, hourlyRate: 55, workingDays: 22,
    billingPerStaffPerMonth: 500,
    complianceMonthly: 667,
    complianceLabel: 'Medicare / ACC billing audit & claw-back (expected value)',
    noteUnit: 'patients/day per provider',
    assumptionLines: ['22 patients/day per provider', '7 min saved per note', '$55/hr blended staff cost', '2% billing leakage on $300K revenue/provider/yr'],
  },
  aged_care: {
    notesPerDay: 2, minutesSaved: 30, hourlyRate: 28, workingDays: 26,
    billingPerStaffPerMonth: 0,
    complianceMonthly: 3125,
    complianceLabel: 'SIRS Priority 1 non-reporting — up to $50K per missed incident',
    noteUnit: 'shifts/day per care staff',
    assumptionLines: ['2 shifts/day per staff member', '30 min saved per shift', '$28/hr blended staff cost', 'SIRS: $37,500/yr expected fine exposure'],
  },
};

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString();
}

export const ROICalculator = () => {
  const [vertical, setVertical] = useState<Vertical>('veterinary');
  const [staff, setStaff] = useState(3);

  const cfg = DEFAULTS[vertical];
  const hoursPerMonth = (cfg.minutesSaved * cfg.notesPerDay * cfg.workingDays * staff) / 60;
  const timeValue = hoursPerMonth * cfg.hourlyRate;
  const complianceValue = cfg.complianceMonthly;
  const billingValue = cfg.billingPerStaffPerMonth * staff;
  const totalValue = timeValue + complianceValue + billingValue;

  const planTier = staff <= 3 ? 'practice' : staff <= 7 ? 'pro' : null;
  const product = PRODUCTS.find(p => p.key === vertical)!;
  const tierData = planTier ? product.tiers.find(t => t.key === planTier) : null;
  const monthlyCost = tierData?.prices['US'] ?? null;
  const roi = monthlyCost ? totalValue / monthlyCost : null;
  const paybackDays = monthlyCost ? Math.round((monthlyCost / totalValue) * 30) : null;

  return (
    <section style={{ padding: '6rem 0', backgroundColor: 'var(--salvia-bg)', position: 'relative', zIndex: 10 }}>
      <style>{`
        .roi-breakdown-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; padding: 0.85rem 0; border-bottom: 1px solid rgba(15,23,42,0.05); }
        .roi-breakdown-row:last-child { border-bottom: none; }
        @media (max-width: 768px) { .roi-metrics-row { grid-template-columns: 1fr !important; } }
      `}</style>

      <div className="container" style={{ maxWidth: '860px' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--salvia-accent)' }}>
            ROI Calculator
          </span>
          <h2 style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08, color: 'var(--salvia-primary)', marginTop: '0.6rem' }}>
            What does Salvia return?
          </h2>
        </div>

        {/* Vertical pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {VERTICALS.map(v => (
            <button key={v.key} onClick={() => setVertical(v.key)} style={{
              padding: '0.55rem 1.3rem', borderRadius: '999px',
              border: '1.5px solid',
              borderColor: vertical === v.key ? 'var(--salvia-accent)' : 'rgba(15,23,42,0.12)',
              backgroundColor: vertical === v.key ? 'rgba(255,78,0,0.06)' : '#fff',
              color: vertical === v.key ? 'var(--salvia-accent)' : 'var(--salvia-text-muted)',
              fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}>
              {v.label}
            </button>
          ))}
        </div>

        {/* Stepper */}
        <div style={{
          backgroundColor: '#fff', border: '1px solid rgba(15,23,42,0.07)',
          borderRadius: '20px', padding: '2rem 2.5rem',
          boxShadow: 'var(--salvia-shadow-card)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1.5rem',
          marginBottom: '1.25rem',
        }}>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--salvia-primary)', marginBottom: '0.2rem' }}>
              How many clinical staff use AI notes?
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--salvia-text-muted)' }}>
              {planTier === 'practice' ? `Practice plan · ${fmt(monthlyCost!)}/month` : planTier === 'pro' ? `Pro plan · ${fmt(monthlyCost!)}/month` : 'Contact sales for 8+ staff'}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button
              onClick={() => setStaff(s => Math.max(1, s - 1))}
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: '1.5px solid rgba(15,23,42,0.15)',
                backgroundColor: '#fff', cursor: 'pointer',
                fontSize: '1.3rem', fontWeight: 400, color: 'var(--salvia-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
            >−</button>
            <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--salvia-primary)', letterSpacing: '-0.04em', minWidth: '2rem', textAlign: 'center' }}>
              {staff}
            </span>
            <button
              onClick={() => setStaff(s => Math.min(10, s + 1))}
              style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: '1.5px solid rgba(15,23,42,0.15)',
                backgroundColor: '#fff', cursor: 'pointer',
                fontSize: '1.3rem', fontWeight: 400, color: 'var(--salvia-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}
            >+</button>
          </div>
        </div>

        {/* 3 metric boxes */}
        <div className="roi-metrics-row" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0.75rem', marginBottom: '1.25rem',
        }}>
          {[
            { label: 'Monthly value recovered', value: fmt(totalValue), sub: null, accent: false },
            { label: 'Salvia monthly cost', value: monthlyCost ? fmt(monthlyCost) : '—', sub: tierData ? `${tierData.name} · ${staff} staff` : null, accent: false },
            { label: 'Return on spend', value: roi ? roi.toFixed(1) + '×' : '—', sub: paybackDays ? `Pays for itself in ${paybackDays} days` : null, accent: true },
          ].map((m, i) => (
            <div key={i} style={{
              backgroundColor: '#fff', border: '1px solid rgba(15,23,42,0.07)',
              borderRadius: '16px', padding: '1.5rem',
              boxShadow: 'var(--salvia-shadow-card)',
            }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--salvia-text-muted)', marginBottom: '0.5rem' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.04em', color: m.accent ? 'var(--salvia-accent)' : 'var(--salvia-primary)' }}>
                {m.value}
              </div>
              {m.sub && (
                <div style={{ fontSize: '0.72rem', color: 'var(--salvia-text-muted)', marginTop: '0.3rem' }}>
                  {m.sub}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Breakdown */}
        <div style={{
          backgroundColor: '#fff', border: '1px solid rgba(15,23,42,0.07)',
          borderRadius: '16px', padding: '1.5rem 2rem',
          boxShadow: 'var(--salvia-shadow-card)',
        }}>
          <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--salvia-text-muted)', marginBottom: '0.5rem' }}>
            Breakdown
          </div>
          <div className="roi-breakdown-row">
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--salvia-primary)' }}>Documentation time</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--salvia-text-muted)', fontFamily: 'monospace', marginTop: '0.15rem' }}>
                {Math.round(hoursPerMonth)} hrs/month · {staff} staff · {cfg.minutesSaved} min saved/note
              </div>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--salvia-primary)', flexShrink: 0 }}>{fmt(timeValue)}/mo</div>
          </div>
          <div className="roi-breakdown-row">
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--salvia-primary)' }}>Compliance risk</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--salvia-text-muted)', fontFamily: 'monospace', marginTop: '0.15rem' }}>{cfg.complianceLabel}</div>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--salvia-primary)', flexShrink: 0 }}>{fmt(complianceValue)}/mo</div>
          </div>
          {billingValue > 0 && (
            <div className="roi-breakdown-row">
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--salvia-primary)' }}>Billing accuracy</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--salvia-text-muted)', fontFamily: 'monospace', marginTop: '0.15rem' }}>
                  2% leakage recovered · {staff} clinician{staff > 1 ? 's' : ''}
                </div>
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--salvia-primary)', flexShrink: 0 }}>{fmt(billingValue)}/mo</div>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.85rem', marginTop: '0.25rem', borderTop: '1.5px solid rgba(15,23,42,0.08)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--salvia-primary)' }}>Total monthly value</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--salvia-accent)', letterSpacing: '-0.03em' }}>{fmt(totalValue)}</div>
          </div>
        </div>

        {/* Assumptions + disclaimer */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem 1.5rem', marginTop: '1.25rem' }}>
          {cfg.assumptionLines.map((line, i) => (
            <span key={i} style={{ fontSize: '0.72rem', color: 'var(--salvia-text-muted)', fontFamily: 'monospace' }}>
              · {line}
            </span>
          ))}
        </div>
        <p style={{ fontSize: '0.7rem', color: 'var(--salvia-text-muted)', fontStyle: 'italic', marginTop: '0.75rem', lineHeight: 1.6 }}>
          Time valued at blended staff cost, not billing rate. Compliance is annualised expected value from published audit rates. Not a guarantee.
        </p>
      </div>
    </section>
  );
};
