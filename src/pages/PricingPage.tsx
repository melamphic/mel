import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { track } from '../lib/posthog';
import { getStoredMarket, setStoredMarket, MARKET_EVENT } from '../lib/market';
import { INDIA_ONLY } from '../config';
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

const DOMAIN_ICON: Record<Vertical, string> = {
  veterinary: 'Veterinary',
  dental: 'Dental',
  general_clinic: 'General Practice',
  allied_health: 'Allied Health',
};

// Per-vertical seat label override. Used for the tab subtitle since
// the [Product.seatLabel] field is also used in tier copy.
const DOMAIN_SEAT_LABEL: Record<Vertical, string> = {
  veterinary: 'For vets',
  dental: 'For dentists',
  general_clinic: 'For providers',
  allied_health: 'For allied clinicians',
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
        description="Salvia pricing for veterinary, dental, general practice, and allied health (physio, osteo, chiro, OT, podiatry, speech). Practice plan from $229/mo — compliance-grade clinical documentation, controlled drug logs, audit trails."
        path="/pricing"
        keywords={['veterinary practice software pricing', 'clinical documentation software cost', 'compliance software vet practice']}
      />
      <Header />
      <main style={{ flex: 1, zIndex: 10 }}>

      {/* Hero */}
      <section style={{ padding: '9rem 0 2rem', backgroundColor: 'var(--salvia-bg)' }}>
        <div className="container" style={{ maxWidth: '960px', textAlign: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: '1.25rem' }}>
            Pricing
          </div>
          <h1
            style={{
              fontSize: 'var(--text-display)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: 'var(--salvia-primary)',
              marginBottom: '1.25rem',
            }}
          >
            Pick your practice. Start in minutes.
          </h1>
          <p
            style={{
              fontSize: 'var(--text-md)',
              color: 'var(--salvia-text-muted)',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            No credit card required. Unlimited nurses, hygienists, and admin staff on every plan.
            Prices shown in {marketMeta.currency}, {marketMeta.taxNote.toLowerCase()}.
          </p>
          {!INDIA_ONLY && <MarketSelector market={market} onChange={onMarketChange} />}
        </div>
      </section>

      {market === 'IN' ? (
        <IndiaPricingSection annual={annual} onAnnualChange={setAnnual} />
      ) : (
        <>
          {/* Domain selector — big tabs, one click to swap product */}
          <section style={{ padding: '2rem 0 0' }}>
            <div className="container" style={{ maxWidth: '960px' }}>
              <div
                className="domain-tabs"
                role="tablist"
                aria-label="Product"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${PRODUCTS.length}, minmax(0, 1fr))`,
                  gap: '0.5rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.04)',
                  padding: '0.5rem',
                  borderRadius: 'var(--salvia-radius-base)',
                }}
              >
                {PRODUCTS.map((p) => (
                  <DomainTab
                    key={p.key}
                    product={p}
                    active={p.key === active}
                    onSelect={() => setActive(p.key)}
                  />
                ))}
              </div>

              {/* Annual toggle — inline, subtle */}
              <AnnualToggle annual={annual} onChange={setAnnual} />
            </div>
          </section>

          {/* Tier cards for the active product */}
          <section style={{ padding: '2.5rem 0 0' }}>
            <div className="container" style={{ maxWidth: product.tiers.length >= 3 ? '1200px' : '960px' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: 'var(--salvia-primary)',
                    marginBottom: '0.4rem',
                  }}
                >
                  {product.brand}
                </h2>
                <p style={{ color: 'var(--salvia-text-muted)', fontSize: 'var(--text-base)' }}>{product.tagline}</p>
              </div>

              <div
                className="tier-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${product.tiers.length}, 1fr)`,
                  gap: '1.25rem',
                }}
              >
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
          <section style={{ padding: 'var(--section-pad) 0' }}>
            <div className="container" style={{ maxWidth: '960px' }}>
              <GlobalFeatureGrid />
            </div>
          </section>
        </>
      )}

      </main>
      <Footer />

      <style>{`
        @media (max-width: 760px) {
          .tier-grid { grid-template-columns: 1fr !important; }
          .domain-tabs { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

interface DomainTabProps {
  product: Product;
  active: boolean;
  onSelect: () => void;
}

function DomainTab({ product, active, onSelect }: DomainTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      style={{
        textAlign: 'left',
        padding: '0.85rem 1rem',
        border: 'none',
        borderRadius: 'calc(var(--salvia-radius-base) - 2px)',
        cursor: 'pointer',
        backgroundColor: active ? 'var(--salvia-surface)' : 'transparent',
        boxShadow: active ? 'var(--salvia-shadow-card)' : 'none',
        transition: 'all 0.15s',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.15rem',
        minWidth: 0,
      }}
    >
      <span
        style={{
          fontSize: 'var(--text-2xs)',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: active ? 'var(--salvia-accent)' : 'var(--salvia-text-muted)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {DOMAIN_ICON[product.key]}
      </span>
      <span
        style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--salvia-text-muted)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {DOMAIN_SEAT_LABEL[product.key]}
      </span>
    </button>
  );
}

interface AnnualSwitchProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}

function AnnualSwitch({ checked, onChange }: AnnualSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label="Toggle annual billing"
      onClick={() => onChange(!checked)}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: 'var(--salvia-radius-full)',
        backgroundColor: checked ? 'var(--salvia-primary)' : 'rgba(15, 23, 42, 0.18)',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.2s',
        padding: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '2px',
          left: checked ? '22px' : '2px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          boxShadow: 'var(--shadow-1)',
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.75rem',
        marginTop: '2rem',
        fontSize: 'var(--text-sm)',
        color: 'var(--salvia-text-muted)',
      }}
    >
      <span style={{ fontWeight: annual ? 500 : 700, color: annual ? 'var(--salvia-text-muted)' : 'var(--salvia-text)' }}>
        Monthly
      </span>
      <AnnualSwitch checked={annual} onChange={onChange} />
      <span style={{ fontWeight: annual ? 700 : 500, color: annual ? 'var(--salvia-text)' : 'var(--salvia-text-muted)' }}>
        Annual
      </span>
      <span
        style={{
          backgroundColor: annual ? 'var(--salvia-accent)' : 'rgba(15, 23, 42, 0.06)',
          color: annual ? '#fff' : 'var(--salvia-text-muted)',
          fontSize: 'var(--text-2xs)',
          fontWeight: 700,
          padding: '0.2rem 0.55rem',
          borderRadius: 'var(--salvia-radius-full)',
          letterSpacing: '0.02em',
          transition: 'all 0.2s',
        }}
      >
        Save 17%
      </span>
    </div>
  );
}

interface TierCardProps {
  product: Product;
  tier: Tier;
  cycle: Cycle;
  market: GlobalMarket;
}

function TierCard({ product, tier, cycle, market }: TierCardProps) {
  const amount = displayedMonthly(tier, market, cycle);
  const meta = marketMetaFor(market);
  const highlighted = Boolean(tier.highlight);

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: highlighted ? 'var(--salvia-primary)' : 'var(--salvia-surface)',
        color: highlighted ? '#fff' : 'var(--salvia-text)',
        borderRadius: 'var(--salvia-radius-large)',
        padding: '2rem',
        boxShadow: highlighted ? 'var(--shadow-3)' : 'var(--salvia-shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {tier.highlight && (
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            right: '1.5rem',
            backgroundColor: 'var(--salvia-accent)',
            color: '#fff',
            fontSize: 'var(--text-2xs)',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--salvia-radius-full)',
          }}
        >
          {tier.highlight}
        </div>
      )}

      <div>
        <div
          className="eyebrow"
          style={{
            color: highlighted ? 'rgba(255,255,255,0.6)' : 'var(--salvia-text-muted)',
            marginBottom: '0.4rem',
          }}
        >
          {tier.name} · {tier.seats}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
          <span
            style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: highlighted ? '#fff' : 'var(--salvia-primary)',
            }}
          >
            {meta.symbol}{amount.toLocaleString()}
          </span>
          <span style={{ fontSize: 'var(--text-base)', color: highlighted ? 'rgba(255,255,255,0.7)' : 'var(--salvia-text-muted)' }}>
            /mo {meta.currency}
          </span>
        </div>
        <div
          style={{
            fontSize: 'var(--text-xs)',
            color: highlighted ? 'rgba(255,255,255,0.6)' : 'var(--salvia-text-muted)',
            marginTop: '0.2rem',
          }}
        >
          {cycle === 'annual'
            ? `Billed annually · ${meta.symbol}${(amount * 12).toLocaleString()}/yr`
            : 'Billed monthly · cancel anytime'}
        </div>
      </div>

      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          fontSize: 'var(--text-sm)',
          borderTop: `1px solid ${highlighted ? 'rgba(255,255,255,0.12)' : 'var(--border-subtle)'}`,
          paddingTop: '1.25rem',
        }}
      >
        <Feature highlighted={highlighted}>
          <strong>{tier.aiSeats} AI recording seat{tier.aiSeats === 1 ? '' : 's'}</strong> &middot;
          {' '}point-of-care voice → audit-grade note
        </Feature>
        <Feature highlighted={highlighted}>
          Unlimited transcribed notes (fair-use {tier.notesPerMonth.toLocaleString()}/mo)
        </Feature>
        <Feature highlighted={highlighted}>Unlimited nurses, admin, and reception (free seats)</Feature>
        <Feature highlighted={highlighted}>Audit-grade clinical notes + policy engine</Feature>
        <Feature highlighted={highlighted}>PDF branding + e-sign</Feature>
      </ul>

      <Link
        to={`/start?plan=${planCode(product.key, tier.key, cycle)}&vertical=${product.key}`}
        onClick={() => track('pricing_tier_selected', {
          vertical: product.key,
          tier: tier.key,
          cycle,
        })}
        style={{
          display: 'block',
          textAlign: 'center',
          textDecoration: 'none',
          padding: '0.85rem 1.5rem',
          borderRadius: 'var(--salvia-radius-full)',
          fontWeight: 600,
          fontSize: 'var(--text-base)',
          backgroundColor: highlighted ? 'var(--salvia-accent)' : 'var(--salvia-primary)',
          color: '#fff',
          transition: 'opacity 0.2s',
        }}
      >
        Get started
      </Link>
    </div>
  );
}

function Feature({ children, highlighted }: { children: React.ReactNode; highlighted: boolean }) {
  return (
    <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
      <span
        style={{
          flexShrink: 0,
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          backgroundColor: highlighted ? 'rgba(255,255,255,0.15)' : 'rgba(15, 23, 42, 0.06)',
          color: highlighted ? '#fff' : 'var(--salvia-primary)',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2px',
          fontWeight: 700,
        }}
      >
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

function EnterpriseBanner() {
  return (
    <div
      style={{
        marginTop: '3rem',
        padding: '1.75rem 2rem',
        borderRadius: 'var(--salvia-radius-large)',
        border: '1px dashed var(--border-strong)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <div
          className="eyebrow"
          style={{ marginBottom: '0.35rem' }}
        >
          Enterprise · 8+ clinicians
        </div>
        <div style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--salvia-primary)', letterSpacing: '-0.01em' }}>
          Custom pricing, SSO, volume commits, dedicated onboarding.
        </div>
      </div>
      <Link
        to="/start"
        onClick={() => track('cta_clicked', { cta_id: 'pricing_enterprise_contact_sales' })}
        style={{
          textDecoration: 'none',
          padding: '0.75rem 1.4rem',
          borderRadius: 'var(--salvia-radius-full)',
          backgroundColor: 'var(--salvia-primary)',
          color: '#fff',
          fontWeight: 600,
          fontSize: 'var(--text-sm)',
        }}
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
      <section style={{ padding: '2rem 0 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <span
              className="eyebrow"
              style={{ display: 'inline-block', marginBottom: '0.6rem' }}
            >
              India pricing · ₹ INR · Excl. GST 18%
            </span>
            <p style={{ color: 'var(--salvia-text-muted)', fontSize: 'var(--text-base)', maxWidth: '540px', margin: '0 auto' }}>
              All plans include unlimited staff accounts, the full clinical software stack, and GST-compliant invoicing.
              AI is included on every plan.
            </p>
          </div>
          <AnnualToggle annual={annual} onChange={onAnnualChange} />
        </div>
      </section>

      <section style={{ padding: '2.5rem 0 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div
            className="tier-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}
          >
            {INDIA_TIERS.map((tier) => (
              <IndiaTierCard key={tier.key} tier={tier} cycle={cycle} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--section-pad) 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
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
    <div
      style={{
        position: 'relative',
        backgroundColor: highlighted ? 'var(--salvia-primary)' : 'var(--salvia-surface)',
        color: highlighted ? '#fff' : 'var(--salvia-text)',
        borderRadius: 'var(--salvia-radius-large)',
        padding: '2rem',
        boxShadow: highlighted ? 'var(--shadow-3)' : 'var(--salvia-shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {tier.highlight && (
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            right: '1.5rem',
            backgroundColor: 'var(--salvia-accent)',
            color: '#fff',
            fontSize: 'var(--text-2xs)',
            fontWeight: 800,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--salvia-radius-full)',
          }}
        >
          {tier.highlight}
        </div>
      )}

      <div>
        <div
          className="eyebrow"
          style={{
            color: highlighted ? 'rgba(255,255,255,0.6)' : 'var(--salvia-text-muted)',
            marginBottom: '0.4rem',
          }}
        >
          {tier.name}
          {tier.aiIncluded && (
            <span style={{ marginLeft: '0.5rem', color: highlighted ? 'rgba(255,255,255,0.5)' : 'var(--salvia-accent)', fontWeight: 700 }}>
              · AI
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
          <span
            style={{
              fontSize: 'var(--text-3xl)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: highlighted ? '#fff' : 'var(--salvia-primary)',
            }}
          >
            ₹{amount.toLocaleString('en-IN')}
          </span>
          <span style={{ fontSize: 'var(--text-base)', color: highlighted ? 'rgba(255,255,255,0.7)' : 'var(--salvia-text-muted)' }}>
            /mo
          </span>
        </div>
        <div style={{ fontSize: 'var(--text-xs)', color: highlighted ? 'rgba(255,255,255,0.6)' : 'var(--salvia-text-muted)', marginTop: '0.2rem' }}>
          {cycle === 'annual'
            ? `Billed ₹${(tier.annualINR).toLocaleString('en-IN')}/yr · 2 months free`
            : 'Billed monthly · cancel anytime'}
        </div>
      </div>

      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          fontSize: 'var(--text-sm)',
          borderTop: `1px solid ${highlighted ? 'rgba(255,255,255,0.12)' : 'var(--border-subtle)'}`,
          paddingTop: '1.25rem',
        }}
      >
        {tier.features.map((f) => (
          <Feature key={f} highlighted={highlighted}>{f}</Feature>
        ))}
      </ul>

      <a
        href={`/start?plan=${indiaPlanCode(tier.key as IndiaTierKey, cycle)}&vertical=india&market=IN`}
        onClick={() => track('pricing_tier_selected', { vertical: 'india', tier: tier.key, cycle })}
        style={{
          display: 'block',
          textAlign: 'center',
          textDecoration: 'none',
          padding: '0.85rem 1.5rem',
          borderRadius: 'var(--salvia-radius-full)',
          fontWeight: 600,
          fontSize: 'var(--text-base)',
          backgroundColor: highlighted ? 'var(--salvia-accent)' : 'var(--salvia-primary)',
          color: '#fff',
          transition: 'opacity 0.2s',
          marginTop: 'auto',
        }}
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
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 22,
          height: 22,
          borderRadius: '50%',
          backgroundColor: highlighted ? 'var(--salvia-accent)' : 'var(--salvia-success)',
          color: '#fff',
          fontSize: 12,
          fontWeight: 800,
          flexShrink: 0,
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
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 22,
          height: 22,
          borderRadius: '50%',
          backgroundColor: 'rgba(15,23,42,0.06)',
          color: 'rgba(15,23,42,0.3)',
          fontSize: 13,
          fontWeight: 600,
          flexShrink: 0,
        }}
      >
        —
      </span>
    );
  }
  return <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--salvia-text)' }}>{val}</span>;
}

function FeatureGrid({ columns, sections, highlightCol }: {
  columns: string[];
  sections: GridSection[];
  highlightCol: number;
}) {
  const colCount = columns.length + 1;
  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(15,23,42,0.03)' }}>
              <th style={{ width: '40%', padding: '1rem 1.25rem', textAlign: 'left', fontWeight: 700, color: 'var(--salvia-text-muted)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '2px solid var(--border-strong)' }} />
              {columns.map((col, i) => (
                <th
                  key={col}
                  style={{
                    width: `${60 / columns.length}%`,
                    padding: '1rem 1.25rem',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: 'var(--text-sm)',
                    color: i === highlightCol ? 'var(--salvia-accent)' : 'var(--salvia-primary)',
                    borderBottom: '2px solid var(--border-strong)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <>
                <tr key={`heading-${section.heading}`}>
                  <td
                    colSpan={colCount}
                    style={{
                      padding: '0.85rem 1.25rem 0.5rem',
                      fontSize: 'var(--text-2xs)',
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--salvia-primary)',
                      backgroundColor: 'rgba(15,23,42,0.04)',
                      borderTop: '1px solid var(--border-subtle)',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}
                  >
                    {section.heading}
                  </td>
                </tr>
                {section.rows.map((row) => (
                  <tr
                    key={`${section.heading}-${row.label}`}
                    style={{ borderBottom: '1px solid var(--border-subtle)' }}
                  >
                    <td style={{ padding: '0.85rem 1.25rem', color: 'var(--salvia-text)', fontWeight: 500, fontSize: 'var(--text-sm)' }}>
                      {row.label}
                    </td>
                    {row.cells.map((cell, ci) => (
                      <td
                        key={ci}
                        style={{
                          padding: '0.85rem 1.25rem',
                          textAlign: 'center',
                        }}
                      >
                        {renderCell(cell, ci === highlightCol)}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
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
    <div>
      <h2
        style={{
          fontSize: 'var(--text-lg)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: 'var(--salvia-primary)',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        Compare plans
      </h2>
      <div
        style={{
          borderRadius: 'var(--salvia-radius-large)',
          border: '1px solid var(--border-strong)',
          overflow: 'hidden',
        }}
      >
        <FeatureGrid
          columns={['Starter · ₹1,000', 'Clinic · ₹3,000', 'Group · ₹6,000']}
          sections={sections}
          highlightCol={1}
        />
      </div>
    </div>
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
    <div>
      <h2
        style={{
          fontSize: 'var(--text-lg)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: 'var(--salvia-primary)',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        Compare plans
      </h2>
      <div
        style={{
          borderRadius: 'var(--salvia-radius-large)',
          border: '1px solid var(--border-strong)',
          overflow: 'hidden',
        }}
      >
        <FeatureGrid
          columns={['Practice', 'Pro']}
          sections={sections}
          highlightCol={0}
        />
      </div>
    </div>
  );
}

interface MarketSelectorProps {
  market: Market;
  onChange: (next: Market) => void;
}

/// Compact currency dropdown. The market is auto-detected from locale /
/// time-zone on first render and persisted in localStorage, so most
/// visitors never touch this — it's just an escape hatch to change currency.
function MarketSelector({ market, onChange }: MarketSelectorProps) {
  return (
    <div style={{ marginTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: 'var(--text-xs)', color: 'var(--salvia-text-muted)' }}>
      <span>Prices in</span>
      <select
        aria-label="Pricing currency"
        value={market}
        onChange={(e) => onChange(e.target.value as Market)}
        style={{
          padding: '0.35rem 0.6rem',
          borderRadius: 'var(--salvia-radius-base)',
          border: '1px solid var(--border-strong)',
          backgroundColor: 'var(--salvia-surface)',
          color: 'var(--salvia-primary)',
          fontSize: 'var(--text-xs)',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        {MARKETS.map((m) => (
          <option key={m.key} value={m.key}>{m.label} · {m.currency}</option>
        ))}
      </select>
    </div>
  );
}
