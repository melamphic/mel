import { useState } from 'react';
import { PRODUCTS, type Vertical, type TierKey } from '../data/pricing';

interface ROIConfig {
  minutesSavedPerNote: number;
  notesPerSeatPerDay: number;
  staffCostPerHour: number;
  workingDaysPerMonth: number;
  annualComplianceRisk: number;
  complianceRiskLabel: string;
  monthlyBillingLeakagePerSeat: number;
  billingLabel: string | null;
  noteLabel: string;
}

const ROI_CONFIG: Record<Vertical, ROIConfig> = {
  veterinary: {
    minutesSavedPerNote: 4,
    notesPerSeatPerDay: 15,
    staffCostPerHour: 45,
    workingDaysPerMonth: 22,
    annualComplianceRisk: 3000,
    complianceRiskLabel: 'Expected value: VMR & NZVC audit failure avoidance',
    monthlyBillingLeakagePerSeat: 333,
    billingLabel: '2% billing leakage recovered · est. $200K revenue/vet/yr',
    noteLabel: 'consults/day per vet',
  },
  dental: {
    minutesSavedPerNote: 5,
    notesPerSeatPerDay: 10,
    staffCostPerHour: 55,
    workingDaysPerMonth: 22,
    annualComplianceRisk: 2500,
    complianceRiskLabel: 'Expected value: GDC / DCNZ audit & CDT pre-auth compliance',
    monthlyBillingLeakagePerSeat: 625,
    billingLabel: 'CDT coding accuracy · est. 3% rejected claim recovery',
    noteLabel: 'patients/day per dentist',
  },
  general_clinic: {
    minutesSavedPerNote: 6,
    notesPerSeatPerDay: 22,
    staffCostPerHour: 55,
    workingDaysPerMonth: 22,
    annualComplianceRisk: 8000,
    complianceRiskLabel: 'Expected value: Medicare / ACC billing audit & claw-back avoidance',
    monthlyBillingLeakagePerSeat: 500,
    billingLabel: '2% billing item accuracy recovery · est. $300K revenue/provider/yr',
    noteLabel: 'patients/day per provider',
  },
  aged_care: {
    minutesSavedPerNote: 30,
    notesPerSeatPerDay: 2,
    staffCostPerHour: 28,
    workingDaysPerMonth: 26,
    annualComplianceRisk: 37500,
    complianceRiskLabel: 'Expected value: SIRS Priority 1 non-reporting · up to $50K per missed incident',
    monthlyBillingLeakagePerSeat: 0,
    billingLabel: null,
    noteLabel: 'shifts/day per care staff',
  },
};

const TIER_SEATS: Record<TierKey, number> = { practice: 3, pro: 7 };

function calcROI(vertical: Vertical, tier: TierKey) {
  const cfg = ROI_CONFIG[vertical];
  const seats = TIER_SEATS[tier];
  const hoursPerSeatPerMonth =
    (cfg.minutesSavedPerNote * cfg.notesPerSeatPerDay * cfg.workingDaysPerMonth) / 60;
  const timeValue = hoursPerSeatPerMonth * cfg.staffCostPerHour * seats;
  const complianceValue = cfg.annualComplianceRisk / 12;
  const billingValue = cfg.monthlyBillingLeakagePerSeat * seats;
  const totalValue = timeValue + complianceValue + billingValue;
  return { timeValue, hoursPerSeatPerMonth, seats, complianceValue, billingValue, totalValue, cfg };
}

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString();
}

const VERTICALS: { key: Vertical; label: string }[] = [
  { key: 'veterinary', label: 'Vets' },
  { key: 'dental', label: 'Dental' },
  { key: 'general_clinic', label: 'Clinics' },
  { key: 'aged_care', label: 'Aged Care' },
];

export const ROICalculator = () => {
  const [vertical, setVertical] = useState<Vertical>('veterinary');
  const [tier, setTier] = useState<TierKey>('practice');

  const roi = calcROI(vertical, tier);
  const product = PRODUCTS.find(p => p.key === vertical)!;
  const tierData = product.tiers.find(t => t.key === tier)!;
  const monthlyCost = tierData.prices['US'];
  const roiMultiple = roi.totalValue / monthlyCost;
  const paybackDays = Math.round((monthlyCost / roi.totalValue) * 30);

  const cfg = ROI_CONFIG[vertical];

  return (
    <section style={{
      padding: '6rem 0',
      backgroundColor: 'var(--salvia-primary)',
      position: 'relative',
      zIndex: 10,
    }}>
      <div className="container" style={{ maxWidth: '1100px' }}>

        {/* Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span style={{
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--salvia-accent)',
          }}>
            ROI Calculator
          </span>
          <h2 style={{
            fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08,
            color: '#fff', marginTop: '0.7rem',
          }}>
            What it costs. What it returns.
          </h2>
          <p style={{
            fontSize: '1rem', color: 'rgba(255,255,255,0.5)',
            marginTop: '0.75rem', maxWidth: '560px', lineHeight: 1.6,
          }}>
            Conservative estimates. Every assumption is shown. No rounding up.
          </p>
        </div>

        <div className="roi-grid mobile-stack" style={{
          display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '3rem', alignItems: 'start',
        }}>

          {/* Left: selectors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Vertical selector */}
            <div>
              <div style={{
                fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
                marginBottom: '0.75rem',
              }}>
                Your vertical
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {VERTICALS.map(v => (
                  <button
                    key={v.key}
                    onClick={() => setVertical(v.key)}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: vertical === v.key ? 'var(--salvia-accent)' : 'rgba(255,255,255,0.1)',
                      backgroundColor: vertical === v.key ? 'rgba(255,78,0,0.12)' : 'rgba(255,255,255,0.04)',
                      color: vertical === v.key ? 'var(--salvia-accent)' : 'rgba(255,255,255,0.5)',
                      fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tier selector */}
            <div>
              <div style={{
                fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
                marginBottom: '0.75rem',
              }}>
                Plan size
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {(['practice', 'pro'] as TierKey[]).map(t => {
                  const td = product.tiers.find(x => x.key === t)!;
                  return (
                    <button
                      key={t}
                      onClick={() => setTier(t)}
                      style={{
                        flex: 1, padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid',
                        borderColor: tier === t ? 'var(--salvia-accent)' : 'rgba(255,255,255,0.1)',
                        backgroundColor: tier === t ? 'rgba(255,78,0,0.12)' : 'rgba(255,255,255,0.04)',
                        color: tier === t ? 'var(--salvia-accent)' : 'rgba(255,255,255,0.5)',
                        cursor: 'pointer', transition: 'all 0.2s ease',
                        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem',
                      }}
                    >
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '-0.01em' }}>
                        {td.name}
                      </span>
                      <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>{td.seats}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Assumptions */}
            <div style={{
              padding: '1.25rem',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.07)',
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}>
              <div style={{
                fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                marginBottom: '0.75rem',
              }}>
                Assumptions
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {[
                  `${cfg.minutesSavedPerNote} min saved per note`,
                  `${cfg.notesPerSeatPerDay} ${cfg.noteLabel}`,
                  `${cfg.workingDaysPerMonth} working days/month`,
                  `$${cfg.staffCostPerHour}/hr blended staff cost`,
                ].map((line, i) => (
                  <div key={i} style={{
                    fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)',
                    fontFamily: 'monospace', lineHeight: 1.5,
                  }}>
                    · {line}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: output */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

            {/* Time row */}
            <div style={{
              padding: '1.5rem 1.75rem',
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px',
            }}>
              <div style={{
                fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
                marginBottom: '0.5rem',
              }}>
                Documentation time recovered
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, maxWidth: '280px' }}>
                  {Math.round(roi.hoursPerSeatPerMonth)} hrs/month × {roi.seats} clinicians @ ${cfg.staffCostPerHour}/hr
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', flexShrink: 0, marginLeft: '1rem' }}>
                  {fmt(roi.timeValue)}
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'rgba(255,255,255,0.35)', marginLeft: '0.3rem' }}>/mo</span>
                </div>
              </div>
            </div>

            {/* Compliance row */}
            <div style={{
              padding: '1.5rem 1.75rem',
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px',
            }}>
              <div style={{
                fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
                marginBottom: '0.5rem',
              }}>
                Compliance risk reduction
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, maxWidth: '280px' }}>
                  {cfg.complianceRiskLabel}
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', flexShrink: 0, marginLeft: '1rem' }}>
                  {fmt(roi.complianceValue)}
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'rgba(255,255,255,0.35)', marginLeft: '0.3rem' }}>/mo</span>
                </div>
              </div>
            </div>

            {/* Billing row — only if applicable */}
            {cfg.billingLabel && (
              <div style={{
                padding: '1.5rem 1.75rem',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px',
              }}>
                <div style={{
                  fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
                  marginBottom: '0.5rem',
                }}>
                  Billing accuracy recovery
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, maxWidth: '280px' }}>
                    {cfg.billingLabel}
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', flexShrink: 0, marginLeft: '1rem' }}>
                    {fmt(roi.billingValue)}
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'rgba(255,255,255,0.35)', marginLeft: '0.3rem' }}>/mo</span>
                  </div>
                </div>
              </div>
            )}

            {/* Summary bar */}
            <div style={{
              padding: '1.75rem',
              backgroundColor: 'rgba(255,78,0,0.08)',
              border: '1px solid rgba(255,78,0,0.2)',
              borderRadius: '16px',
              marginTop: '0.25rem',
            }}>
              {/* Value vs Cost */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.3rem',
                  }}>
                    Monthly value
                  </div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--salvia-accent)', letterSpacing: '-0.04em' }}>
                    {fmt(roi.totalValue)}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.3rem',
                  }}>
                    Salvia cost
                  </div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>
                    {fmt(monthlyCost)}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.08)', marginBottom: '1.25rem' }} />

              {/* ROI + Payback */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.3rem',
                  }}>
                    Return on spend
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--salvia-accent)', letterSpacing: '-0.04em' }}>
                    {roiMultiple.toFixed(1)}×
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.3rem',
                  }}>
                    Pays for itself in
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>
                    {paybackDays}d
                    <span style={{ fontSize: '1rem', fontWeight: 500, color: 'rgba(255,255,255,0.35)', marginLeft: '0.3rem' }}>/ month</span>
                  </div>
                </div>
              </div>
            </div>

            <p style={{
              fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)',
              lineHeight: 1.6, marginTop: '0.25rem', fontStyle: 'italic',
            }}>
              Time savings valued at blended staff cost rate, not billing rate. Compliance figures are annualised expected values based on industry audit rates. Not a guarantee.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .roi-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
