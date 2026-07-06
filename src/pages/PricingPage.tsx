import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { Rv } from '../components/grass/Rv';
import { INDIA_ONLY } from '../config';
import { track } from '../lib/posthog';
import { getStoredMarket, setStoredMarket, MARKET_EVENT } from '../lib/market';
import {
  INDIA_TIERS,
  MARKETS,
  PRODUCTS,
  displayedMonthly,
  indiaPlanCode,
  indiaDisplayedMonthly,
  marketMetaFor,
  planCode,
  type Cycle,
  type GlobalMarket,
  type IndiaTier,
  type IndiaTierKey,
  type Market,
  type Product,
  type Tier,
  type Vertical,
} from '../data/pricing';

const DOMAIN_LABEL: Record<Vertical, string> = {
  veterinary: 'Veterinary',
  dental: 'Dental',
  general_clinic: 'General Practice',
  allied_health: 'Allied Health',
};

export const PricingPage = () => {
  const [active, setActive] = useState<Vertical>('veterinary');
  const [annual, setAnnual] = useState(false);
  // Market drives the displayed currency. Pre-select from a persisted
  // choice when present, otherwise from the browser's locale and
  // time-zone signals.
  const [market, setMarket] = useState<Market>(INDIA_ONLY ? 'IN' : 'US');

  useEffect(() => {
    // Shared market preference (also set by the header CountrySwitcher).
    const v = new URLSearchParams(window.location.search).get('vertical');
    const nextVertical = PRODUCTS.some((p) => p.key === v) ? (v as Vertical) : null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMarket(getStoredMarket());
    if (nextVertical) setActive(nextVertical);
    // React live when the country is changed from the header (or elsewhere).
    const onMarket = (e: Event) => setMarket(((e as CustomEvent).detail as Market) ?? getStoredMarket());
    window.addEventListener(MARKET_EVENT, onMarket);
    return () => window.removeEventListener(MARKET_EVENT, onMarket);
  }, []);

  const onMarketChange = (next: Market) => {
    setMarket(next);
    setStoredMarket(next); // persists + broadcasts to the header switcher
  };

  const cycle: Cycle = annual ? 'annual' : 'monthly';
  const product = PRODUCTS.find((p) => p.key === active) ?? PRODUCTS[0];
  const marketMeta = marketMetaFor(market);

  return (
    <>
      <SEO
        title="Pricing"
        description="Salvia pricing for veterinary, dental, general practice, and allied health (physio, osteo, chiro, OT, podiatry, speech). Compliance-grade clinical documentation, controlled drug logs, audit trails — priced per note, never per seat."
        path="/pricing"
        keywords={['clinical documentation software pricing', 'compliance software pricing India', 'veterinary practice software pricing']}
      />
      <GrassHeader />
      <main style={{ flex: 1, zIndex: 10, background: '#fff' }}>

        {/* Hero */}
        <section className="g-section g-center" style={{ padding: '148px 0 24px' }}>
          <div className="g-container">
            <Rv delay={1}>
              <img
                src="/illustrations/price_coins.webp"
                alt=""
                loading="lazy"
                style={{ width: 110, height: 'auto', margin: '0 auto 18px', display: 'block' }}
              />
            </Rv>
            <Rv as="h1" className="g-h1" style={{ fontSize: 'clamp(38px, 5vw, 72px)', maxWidth: '18ch', margin: '0 auto 18px' }}>
              Priced per note. <span className="g-hl">Not per doctor.</span>
            </Rv>
            <Rv as="p" className="g-sub" delay={1}>
              No credit card required. Unlimited nurses, hygienists and admin staff on every
              plan. Prices shown in {marketMeta.currency}, {marketMeta.taxNote.toLowerCase()}.
            </Rv>
            {!INDIA_ONLY && <MarketSelector market={market} onChange={onMarketChange} />}
          </div>
        </section>

        {market === 'IN' ? (
          <IndiaPricingSection annual={annual} onAnnualChange={setAnnual} />
        ) : (
          <>
            {/* Domain selector — one click to swap product */}
            <section style={{ padding: '8px 0 0' }}>
              <div className="g-container">
                <div className="g-tabs" role="tablist" aria-label="Product" style={{ justifyContent: 'center', marginTop: 0 }}>
                  {PRODUCTS.map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      role="tab"
                      aria-selected={p.key === active}
                      onClick={() => setActive(p.key)}
                      className={`g-tab${p.key === active ? ' g-tab--on' : ''}`}
                    >
                      {DOMAIN_LABEL[p.key]}
                    </button>
                  ))}
                </div>
                <AnnualToggle annual={annual} onChange={setAnnual} />
              </div>
            </section>

            {/* Tier cards for the active product */}
            <section style={{ padding: '36px 0 0' }}>
              <div className="g-container">
                <p className="g-sub" style={{ textAlign: 'center', margin: '0 auto 34px' }}>
                  {product.tagline}
                </p>
                <div className="g-price-grid" style={{ gridTemplateColumns: `repeat(${product.tiers.length}, minmax(0, 1fr))`, maxWidth: 760, margin: '0 auto' }}>
                  {product.tiers.map((tier) => (
                    <TierCard
                      key={tier.key}
                      product={product}
                      tier={tier}
                      cycle={cycle}
                      market={market as GlobalMarket}
                    />
                  ))}
                </div>
                <EnterpriseBanner />
              </div>
            </section>

            {/* Feature comparison grid — global tiers */}
            <section className="g-section">
              <div className="g-container" style={{ maxWidth: 960 }}>
                <GlobalFeatureGrid />
              </div>
            </section>
          </>
        )}

      </main>
      <GrassFooter />
    </>
  );
};

function AnnualSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label="Toggle annual billing"
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 24, borderRadius: 999,
        backgroundColor: checked ? 'var(--g-green)' : 'rgba(15, 23, 42, 0.18)',
        border: 'none', cursor: 'pointer', position: 'relative',
        transition: 'background-color 0.2s', padding: 0,
      }}
    >
      <span
        style={{
          position: 'absolute', top: 2, left: checked ? 22 : 2,
          width: 20, height: 20, borderRadius: '50%',
          backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(15,23,42,.25)',
          transition: 'left 0.2s',
        }}
      />
    </button>
  );
}

function AnnualToggle({ annual, onChange }: { annual: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12,
        marginTop: 26, fontFamily: 'var(--g-font)', fontSize: 14.5, color: 'var(--g-ink-soft)',
      }}
    >
      <span style={{ fontWeight: annual ? 500 : 700, color: annual ? 'var(--g-ink-soft)' : 'var(--g-ink)' }}>
        Monthly
      </span>
      <AnnualSwitch checked={annual} onChange={onChange} />
      <span style={{ fontWeight: annual ? 700 : 500, color: annual ? 'var(--g-ink)' : 'var(--g-ink-soft)' }}>
        Annual
      </span>
      <span
        style={{
          backgroundColor: annual ? 'var(--g-green)' : 'var(--g-line-soft)',
          color: annual ? '#083D1B' : 'var(--g-ink-soft)',
          fontSize: 11.5, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
          transition: 'all 0.2s',
        }}
      >
        2 months free
      </span>
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontFamily: 'var(--g-font)', fontSize: 13.5, color: 'var(--g-ink-soft)', lineHeight: 1.5 }}>
      <span style={{ color: 'var(--g-green)', fontWeight: 800, flexShrink: 0 }}>✓</span>
      <span>{children}</span>
    </li>
  );
}

function TierCard({ product, tier, cycle, market }: {
  product: Product;
  tier: Tier;
  cycle: Cycle;
  market: GlobalMarket;
}) {
  const amount = displayedMonthly(tier, market, cycle);
  const meta = marketMetaFor(market);
  const highlighted = Boolean(tier.highlight);

  return (
    <div className={`g-price${highlighted ? ' g-price--pop' : ''}`}>
      {tier.highlight && <span className="g-pop-tag">{tier.highlight}</span>}
      <h3>{tier.name} · {tier.seats}</h3>
      <div className="g-amt">
        {meta.symbol}{amount.toLocaleString()}
        <span>/mo {meta.currency}</span>
      </div>
      <div className="g-cap">
        {cycle === 'annual'
          ? `Billed annually · ${meta.symbol}${(amount * 12).toLocaleString()}/yr`
          : 'Billed monthly · cancel anytime'}
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid var(--g-line-soft)', paddingTop: 14, margin: 0, flex: 1 }}>
        <CheckItem>
          <b style={{ color: 'var(--g-ink)' }}>{tier.aiSeats} AI recording seat{tier.aiSeats === 1 ? '' : 's'}</b> · point-of-care voice → audit-grade note
        </CheckItem>
        <CheckItem>Unlimited transcribed notes (fair-use {tier.notesPerMonth.toLocaleString()}/mo)</CheckItem>
        <CheckItem>Unlimited nurses, admin and reception (free seats)</CheckItem>
        <CheckItem>Audit-grade clinical notes + policy engine</CheckItem>
        <CheckItem>PDF branding + e-sign</CheckItem>
      </ul>
      <Link
        className={`g-btn ${highlighted ? 'g-btn--green' : 'g-btn--ghost'}`}
        to={`/start?plan=${planCode(product.key, tier.key, cycle)}&vertical=${product.key}`}
        onClick={() => track('pricing_tier_selected', {
          vertical: product.key,
          tier: tier.key,
          cycle,
        })}
      >
        Get started
      </Link>
    </div>
  );
}

function EnterpriseBanner() {
  return (
    <div
      style={{
        marginTop: 34, padding: '24px 28px', borderRadius: 18,
        border: '1px dashed var(--g-line)', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap',
        fontFamily: 'var(--g-font)',
      }}
    >
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--g-ink-faint)', marginBottom: 4 }}>
          Enterprise · 8+ clinicians
        </div>
        <div style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--g-ink)', letterSpacing: '-0.01em' }}>
          Custom pricing, SSO, volume commits, dedicated onboarding.
        </div>
      </div>
      <Link
        className="g-btn g-btn--green"
        to="/start"
        onClick={() => track('cta_clicked', { cta_id: 'pricing_enterprise_contact_sales' })}
        style={{ padding: '11px 20px', fontSize: 14.5 }}
      >
        Contact sales
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// India pricing section
// ---------------------------------------------------------------------------

function IndiaPricingSection({ annual, onAnnualChange }: { annual: boolean; onAnnualChange: (v: boolean) => void }) {
  const cycle: Cycle = annual ? 'annual' : 'monthly';
  return (
    <>
      <section style={{ padding: '8px 0 0' }}>
        <div className="g-container g-center">
          <p className="g-small" style={{ fontWeight: 600 }}>
            India pricing · ₹ INR · Excl. GST 18%
          </p>
          <p className="g-sub" style={{ margin: '10px auto 0', maxWidth: 560 }}>
            All plans include unlimited staff accounts, the full clinical software stack, and
            GST-compliant invoicing. <b>AI is included on every plan.</b>
          </p>
          <AnnualToggle annual={annual} onChange={onAnnualChange} />
        </div>
      </section>

      <section style={{ padding: '36px 0 0' }}>
        <div className="g-container">
          <div className="g-price-grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', maxWidth: 960, margin: '0 auto' }}>
            {INDIA_TIERS.map((tier) => (
              <IndiaTierCard key={tier.key} tier={tier} cycle={cycle} />
            ))}
          </div>
        </div>
      </section>

      <section className="g-section">
        <div className="g-container" style={{ maxWidth: 960 }}>
          <IndiaFeatureGrid />
        </div>
      </section>
    </>
  );
}

function IndiaTierCard({ tier, cycle }: { tier: IndiaTier; cycle: Cycle }) {
  const amount = indiaDisplayedMonthly(tier, cycle);
  const highlighted = Boolean(tier.highlight);

  return (
    <div className={`g-price${highlighted ? ' g-price--pop' : ''}`}>
      {tier.highlight && <span className="g-pop-tag">{tier.highlight}</span>}
      <h3>{tier.name}</h3>
      <div className="g-amt">
        ₹{amount.toLocaleString('en-IN')}
        <span>/mo</span>
      </div>
      <div className="g-cap">
        {cycle === 'annual'
          ? `Billed ₹${tier.annualINR.toLocaleString('en-IN')}/yr · 2 months free`
          : 'Billed monthly · cancel anytime'}
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid var(--g-line-soft)', paddingTop: 14, margin: 0, flex: 1 }}>
        {tier.features.map((f) => (
          <CheckItem key={f}>{f}</CheckItem>
        ))}
      </ul>
      <a
        className={`g-btn ${highlighted ? 'g-btn--green' : 'g-btn--ghost'}`}
        href={`/start?plan=${indiaPlanCode(tier.key as IndiaTierKey, cycle)}&vertical=india&market=IN`}
        onClick={() => track('pricing_tier_selected', { vertical: 'india', tier: tier.key, cycle })}
      >
        Get started
      </a>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Feature comparison grids
// ---------------------------------------------------------------------------

type GridCell = string | boolean;

interface GridSection {
  heading: string;
  rows: { label: string; cells: GridCell[] }[];
}

function renderCell(val: GridCell, highlighted: boolean) {
  if (val === true) {
    return (
      <span
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 20, height: 20, borderRadius: '50%',
          backgroundColor: highlighted ? 'var(--g-green)' : '#047857',
          color: '#fff', fontSize: 11, fontWeight: 800, flexShrink: 0,
        }}
      >
        ✓
      </span>
    );
  }
  if (val === false) {
    return (
      <span
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 20, height: 20, borderRadius: '50%',
          backgroundColor: 'var(--g-line-soft)', color: 'var(--g-ink-faint)',
          fontSize: 12, fontWeight: 600, flexShrink: 0,
        }}
      >
        —
      </span>
    );
  }
  return <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--g-ink)' }}>{val}</span>;
}

function FeatureGrid({ columns, sections, highlightCol }: {
  columns: string[];
  sections: GridSection[];
  highlightCol: number;
}) {
  const colCount = columns.length + 1;
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--g-font)', fontSize: 13.5 }}>
        <thead>
          <tr style={{ backgroundColor: '#FBFBFC' }}>
            <th style={{ width: '40%', padding: '14px 18px', borderBottom: '2px solid var(--g-line)' }} />
            {columns.map((col, i) => (
              <th
                key={col}
                style={{
                  width: `${60 / columns.length}%`, padding: '14px 18px', textAlign: 'center',
                  fontWeight: 800, fontSize: 14,
                  color: i === highlightCol ? 'var(--g-green)' : 'var(--g-ink)',
                  borderBottom: '2px solid var(--g-line)', letterSpacing: '-0.01em',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sections.map((section) => (
            <Fragment key={section.heading}>
              <tr>
                <td
                  colSpan={colCount}
                  style={{
                    padding: '12px 18px 8px', fontSize: 10.5, fontWeight: 800,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--g-ink-faint)', backgroundColor: '#FBFBFC',
                    borderTop: '1px solid var(--g-line-soft)', borderBottom: '1px solid var(--g-line-soft)',
                  }}
                >
                  {section.heading}
                </td>
              </tr>
              {section.rows.map((row) => (
                <tr key={`${section.heading}-${row.label}`} style={{ borderBottom: '1px solid var(--g-line-soft)' }}>
                  <td style={{ padding: '12px 18px', color: 'var(--g-ink-soft)', fontWeight: 500 }}>
                    {row.label}
                  </td>
                  {row.cells.map((cell, ci) => (
                    <td key={ci} style={{ padding: '12px 18px', textAlign: 'center' }}>
                      {renderCell(cell, ci === highlightCol)}
                    </td>
                  ))}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompareWrap({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2 className="g-h2" style={{ fontSize: 'clamp(24px, 3vw, 34px)', textAlign: 'center', margin: '0 auto 26px' }}>
        Compare plans
      </h2>
      <div style={{ borderRadius: 18, border: '1px solid var(--g-line)', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

function IndiaFeatureGrid() {
  const sections: GridSection[] = [
    {
      heading: 'Clinical tools',
      rows: [
        { label: 'Staff accounts',        cells: ['Unlimited', 'Unlimited', 'Unlimited'] },
        { label: 'Clinical notes',        cells: ['AI + Manual', 'AI + Manual', 'AI + Manual'] },
        { label: 'Forms',                 cells: ['Build & publish', 'Build & AI-generate', 'Build & AI-generate'] },
        { label: 'Policy library',        cells: ['Manual', 'AI-generate', 'AI-generate'] },
        { label: 'Drug register',         cells: [true, true, true] },
        { label: 'Incident reporting',    cells: [true, true, true] },
        { label: 'Consent management',    cells: [true, true, true] },
        { label: 'Pain assessments',      cells: [true, true, true] },
        { label: 'Patient records',       cells: [true, true, true] },
        { label: 'PDF export',            cells: [true, true, true] },
        { label: 'Multi-location',        cells: [false, false, true] },
      ],
    },
    {
      heading: 'AI',
      rows: [
        { label: 'AI voice → clinical note', cells: [true, true, true] },
        { label: 'AI form generation',       cells: [false, true, true] },
        { label: 'AI policy generation',     cells: [false, true, true] },
        { label: 'Monthly AI-note cap',      cells: ['400', '1,500', '3,000'] },
        { label: 'AI queue priority',        cells: ['—', 'Standard', 'Priority'] },
      ],
    },
    {
      heading: 'Billing',
      rows: [
        { label: 'GST-compliant invoicing', cells: [true, true, true] },
        { label: 'Annual billing (2 mo free)', cells: [true, true, true] },
      ],
    },
    {
      heading: 'Support',
      rows: [
        { label: 'Response time',     cells: ['48hr email', '24hr email', 'Same-day'] },
        { label: 'Onboarding call',   cells: [false, false, true] },
      ],
    },
  ];

  return (
    <CompareWrap>
      <FeatureGrid
        columns={['Starter · ₹999', 'Clinic · ₹2,999', 'Group · ₹5,999']}
        sections={sections}
        highlightCol={1}
      />
    </CompareWrap>
  );
}

function GlobalFeatureGrid() {
  const sections: GridSection[] = [
    {
      heading: 'Seats & usage',
      rows: [
        { label: 'Clinician seats',           cells: ['1–3', '4–7'] },
        { label: 'AI recording seats',         cells: ['3', '7'] },
        { label: 'Notes / month (fair-use)',   cells: ['1,200–2,000', '3,000–5,000'] },
        { label: 'Nurses, admin, reception',   cells: ['Unlimited (free)', 'Unlimited (free)'] },
      ],
    },
    {
      heading: 'Clinical tools',
      rows: [
        { label: 'AI voice → clinical note', cells: [true, true] },
        { label: 'AI form generation',       cells: [true, true] },
        { label: 'AI policy generation',     cells: [true, true] },
        { label: 'Drug register',            cells: [true, true] },
        { label: 'Incident reporting',       cells: [true, true] },
        { label: 'Consent management',       cells: [true, true] },
        { label: 'Pain assessments',         cells: [true, true] },
        { label: 'Patient records',          cells: [true, true] },
        { label: 'PDF export + e-sign',      cells: [true, true] },
      ],
    },
    {
      heading: 'Billing',
      rows: [
        { label: 'Annual billing (2 mo free)', cells: [true, true] },
        { label: 'Enterprise (8+ seats)',      cells: ['Contact sales', 'Contact sales'] },
      ],
    },
  ];

  return (
    <CompareWrap>
      <FeatureGrid
        columns={['Practice', 'Pro']}
        sections={sections}
        highlightCol={0}
      />
    </CompareWrap>
  );
}

/// Compact currency dropdown. The market is auto-detected from locale /
/// time-zone on first render and persisted in localStorage, so most
/// visitors never touch this — it's just an escape hatch to change currency.
function MarketSelector({ market, onChange }: { market: Market; onChange: (next: Market) => void }) {
  return (
    <div style={{ marginTop: 22, display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--g-font)', fontSize: 13, color: 'var(--g-ink-faint)' }}>
      <span>Prices in</span>
      <select
        aria-label="Pricing currency"
        value={market}
        onChange={(e) => onChange(e.target.value as Market)}
        style={{
          padding: '6px 10px', borderRadius: 9, border: '1px solid var(--g-line)',
          backgroundColor: '#fff', color: 'var(--g-ink)', fontFamily: 'var(--g-font)',
          fontSize: 13, fontWeight: 700, cursor: 'pointer',
        }}
      >
        {MARKETS.map((m) => (
          <option key={m.key} value={m.key}>{m.label} · {m.currency}</option>
        ))}
      </select>
    </div>
  );
}
