import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  PRODUCTS,
  planCode,
  displayedMonthly,
  type Cycle,
  type Product,
  type Tier,
  type Vertical,
} from '../data/pricing';

const DOMAIN_ICON: Record<Vertical, string> = {
  veterinary: 'Paws',
  dental: 'Smile',
  general_clinic: 'Clinic',
};

export const PricingPage = () => {
  const [active, setActive] = useState<Vertical>('veterinary');
  const [annual, setAnnual] = useState(false);
  const cycle: Cycle = annual ? 'annual' : 'monthly';
  const product = PRODUCTS.find((p) => p.key === active) ?? PRODUCTS[0];

  return (
    <>
      <Header />

      {/* Hero */}
      <section style={{ padding: '9rem 0 2rem', backgroundColor: 'var(--salvia-bg)' }}>
        <div className="container" style={{ maxWidth: '960px', textAlign: 'center' }}>
          <div
            style={{
              color: 'var(--salvia-accent)',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            Pricing
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
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
              fontSize: '1.1rem',
              color: 'var(--salvia-text-muted)',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            14-day free trial. No credit card. Unlimited nurses, hygienists, and admin staff on every plan.
            Prices shown in USD, excl. local tax.
          </p>
        </div>
      </section>

      {/* Domain selector — big tabs, one click to swap product */}
      <section style={{ padding: '2rem 0 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div
            className="domain-tabs"
            role="tablist"
            aria-label="Product"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.75rem',
              marginTop: '2rem',
              fontSize: '0.9rem',
              color: 'var(--salvia-text-muted)',
            }}
          >
            <span style={{ fontWeight: annual ? 500 : 700, color: annual ? 'var(--salvia-text-muted)' : 'var(--salvia-text)' }}>
              Monthly
            </span>
            <AnnualSwitch checked={annual} onChange={setAnnual} />
            <span style={{ fontWeight: annual ? 700 : 500, color: annual ? 'var(--salvia-text)' : 'var(--salvia-text-muted)' }}>
              Annual
            </span>
            <span
              style={{
                backgroundColor: annual ? 'var(--salvia-accent)' : 'rgba(15, 23, 42, 0.06)',
                color: annual ? '#fff' : 'var(--salvia-text-muted)',
                fontSize: '0.7rem',
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
        </div>
      </section>

      {/* Tier cards for the active product */}
      <section style={{ padding: '2.5rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div
            style={{
              textAlign: 'center',
              marginBottom: '2rem',
            }}
          >
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--salvia-primary)',
                marginBottom: '0.4rem',
              }}
            >
              {product.brand}
            </h2>
            <p style={{ color: 'var(--salvia-text-muted)', fontSize: '1rem' }}>{product.tagline}</p>
          </div>

          <div
            className="tier-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.25rem',
            }}
          >
            {product.tiers.map((tier) => (
              <TierCard
                key={tier.key}
                product={product}
                tier={tier}
                cycle={cycle}
              />
            ))}
          </div>

          <EnterpriseBanner />
        </div>
      </section>

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
        padding: '1rem 1.25rem',
        border: 'none',
        borderRadius: 'calc(var(--salvia-radius-base) - 2px)',
        cursor: 'pointer',
        backgroundColor: active ? 'var(--salvia-surface)' : 'transparent',
        boxShadow: active ? 'var(--salvia-shadow-card)' : 'none',
        transition: 'all 0.15s',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.15rem',
      }}
    >
      <span
        style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: active ? 'var(--salvia-accent)' : 'var(--salvia-text-muted)',
        }}
      >
        {DOMAIN_ICON[product.key]}
      </span>
      <span
        style={{
          fontSize: '1rem',
          fontWeight: 700,
          color: active ? 'var(--salvia-primary)' : 'var(--salvia-text)',
          letterSpacing: '-0.01em',
        }}
      >
        {product.brand}
      </span>
      <span style={{ fontSize: '0.8rem', color: 'var(--salvia-text-muted)' }}>
        For {product.seatLabel}
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
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          transition: 'left 0.2s',
        }}
      />
    </button>
  );
}

interface TierCardProps {
  product: Product;
  tier: Tier;
  cycle: Cycle;
}

function TierCard({ product, tier, cycle }: TierCardProps) {
  const amount = displayedMonthly(tier, cycle);
  const highlighted = Boolean(tier.highlight);

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: highlighted ? 'var(--salvia-primary)' : 'var(--salvia-surface)',
        color: highlighted ? '#fff' : 'var(--salvia-text)',
        borderRadius: 'var(--salvia-radius-large)',
        padding: '2rem',
        boxShadow: highlighted ? '0 20px 50px rgba(15, 23, 42, 0.25)' : 'var(--salvia-shadow-card)',
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
            fontSize: '0.7rem',
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
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: highlighted ? 'rgba(255,255,255,0.6)' : 'var(--salvia-text-muted)',
            marginBottom: '0.4rem',
          }}
        >
          {tier.name} · {tier.seats}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
          <span
            style={{
              fontSize: '2.75rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: highlighted ? '#fff' : 'var(--salvia-primary)',
            }}
          >
            ${amount}
          </span>
          <span style={{ fontSize: '0.95rem', color: highlighted ? 'rgba(255,255,255,0.7)' : 'var(--salvia-text-muted)' }}>
            /mo USD
          </span>
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            color: highlighted ? 'rgba(255,255,255,0.6)' : 'var(--salvia-text-muted)',
            marginTop: '0.2rem',
          }}
        >
          {cycle === 'annual'
            ? `Billed annually · $${(amount * 12).toLocaleString()}/yr`
            : 'Billed monthly · cancel anytime'}
        </div>
      </div>

      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          fontSize: '0.9rem',
          borderTop: `1px solid ${highlighted ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.08)'}`,
          paddingTop: '1.25rem',
        }}
      >
        <Feature highlighted={highlighted}>
          Unlimited notes (fair-use {tier.notesPerMonth.toLocaleString()}/mo)
        </Feature>
        <Feature highlighted={highlighted}>Unlimited nurses, admin, and reception</Feature>
        <Feature highlighted={highlighted}>Audit-grade clinical notes + policy engine</Feature>
        <Feature highlighted={highlighted}>PDF branding + e-sign</Feature>
      </ul>

      <Link
        to={`/start?plan=${planCode(product.key, tier.key, cycle)}&vertical=${product.key}`}
        style={{
          display: 'block',
          textAlign: 'center',
          textDecoration: 'none',
          padding: '0.85rem 1.5rem',
          borderRadius: 'var(--salvia-radius-full)',
          fontWeight: 600,
          fontSize: '0.95rem',
          backgroundColor: highlighted ? 'var(--salvia-accent)' : 'var(--salvia-primary)',
          color: '#fff',
          transition: 'opacity 0.2s',
        }}
      >
        Start free trial
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
        border: '1px dashed rgba(15, 23, 42, 0.18)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--salvia-accent)',
            marginBottom: '0.35rem',
          }}
        >
          Enterprise · 8+ clinicians
        </div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--salvia-primary)', letterSpacing: '-0.01em' }}>
          Custom pricing, SSO, volume commits, dedicated onboarding.
        </div>
      </div>
      <Link
        to="/contact-sales"
        style={{
          textDecoration: 'none',
          padding: '0.75rem 1.4rem',
          borderRadius: 'var(--salvia-radius-full)',
          backgroundColor: 'var(--salvia-primary)',
          color: '#fff',
          fontWeight: 600,
          fontSize: '0.9rem',
        }}
      >
        Contact sales
      </Link>
    </div>
  );
}
