import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { SEO } from '../components/SEO';
import { GrassFooter } from '../components/grass/GrassFooter';
import { GrassHeader } from '../components/grass/GrassHeader';
import { Rv } from '../components/grass/Rv';
import { INDIA_ONLY } from '../config';
import {
  FRAMEWORKS,
  COUNTRY_META,
  VERTICAL_META,
  DISCIPLINE_META,
  FRAMEWORK_CATEGORY_LABEL,
  type FrameworkCountry,
  type FrameworkVertical,
} from '../data/frameworks';

type CountryFilter = FrameworkCountry | 'all';
type VerticalFilter = FrameworkVertical | 'all';

// Category → icon, so every card carries an illustration.
const CATEGORY_ICON: Record<string, string> = {
  'professional-conduct': '/illustrations/tpl_work_cert.webp',
  'records': '/illustrations/tpl_soap.webp',
  'inspection': '/illustrations/shield_cross.webp',
  'billing': '/illustrations/vet_billing.webp',
  'safety': '/illustrations/tpl_sharps.webp',
  'consent': '/illustrations/vet_estimate.webp',
  'data-protection': '/illustrations/shield.webp',
};

// India-first while INDIA_ONLY — India chip leads and the grouped list
// opens on Indian regulators; the global catalog stays one click away.
const COUNTRIES_ORDER: CountryFilter[] = INDIA_ONLY
  ? ['all', 'IN', 'GB', 'AU', 'NZ', 'US', 'IE']
  : ['all', 'IE', 'GB', 'AU', 'NZ', 'US', 'IN'];
const GROUP_ORDER: FrameworkCountry[] = INDIA_ONLY
  ? ['IN', 'GB', 'AU', 'NZ', 'US', 'IE', 'EU', 'Global']
  : ['IE', 'GB', 'AU', 'NZ', 'US', 'IN', 'EU', 'Global'];
const VERTICALS_ORDER: VerticalFilter[] = ['all', 'vet', 'dental', 'gp', 'allied'];

export const FrameworksPage = () => {
  const [country, setCountry] = useState<CountryFilter>('all');
  const [vertical, setVertical] = useState<VerticalFilter>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FRAMEWORKS.filter((f) => {
      if (country !== 'all' && f.country !== country) return false;
      if (vertical !== 'all' && !f.verticals.includes(vertical)) return false;
      if (q) {
        const hay = `${f.code} ${f.fullName} ${f.summary}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [country, vertical, query]);

  // Group by country for the list view (when country filter is 'all').
  const grouped = useMemo(() => {
    if (country !== 'all') return null;
    const buckets: Record<FrameworkCountry, typeof FRAMEWORKS> = {
      IN: [], IE: [], GB: [], AU: [], NZ: [], US: [], EU: [], Global: [],
    };
    filtered.forEach((f) => buckets[f.country].push(f));
    return buckets;
  }, [filtered, country]);

  const totalsByCountry = useMemo(() => {
    const t: Record<FrameworkCountry, number> = { IN: 0, IE: 0, GB: 0, AU: 0, NZ: 0, US: 0, EU: 0, Global: 0 };
    FRAMEWORKS.forEach((f) => { t[f.country]++; });
    return t;
  }, []);

  // Structured data — list of regulatory frameworks (helps Google
  // index each as a discoverable entity).
  const itemListLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: FRAMEWORKS.map((f, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Thing',
        name: `${f.code} — ${f.fullName}`,
        description: f.summary,
        ...(f.sourceUrl ? { url: f.sourceUrl } : {}),
      },
    })),
  });

  return (
    <>
      <SEO
        title="Regulatory Frameworks We Support"
        description={INDIA_ONLY
          ? `Salvia generates audit-ready clinical records against ${FRAMEWORKS.length}+ regulatory frameworks — NABH, ABDM, NMC/IMC record rules, DPDP Act, Schedule H1, PC-PNDT and Consumer Protection Act 2019 for India, plus international regulators for every clinical vertical.`
          : `Salvia generates audit-ready clinical records against ${FRAMEWORKS.length}+ regulatory frameworks across veterinary, dental, general practice and allied health — CORU, HCPC, AHPRA, RCVS, CQC, GDC, GOsC, GCC, AVA, VCNZ, MCNZ and more. Six countries, every clinical vertical.`}
        path="/frameworks"
        keywords={INDIA_ONLY ? [
          'NABH compliance software', 'ABDM compliant EMR', 'NMC medical records rules',
          'DPDP Act clinics', 'Schedule H1 register software', 'PC-PNDT documentation',
          'Consumer Protection Act medical records', 'NABH entry level certification software',
          'clinical documentation India', 'healthcare compliance software India', 'audit-ready records',
        ] : [
          'compliance software frameworks', 'CORU compliance software', 'HCPC software',
          'AHPRA compliance', 'RCVS compliance', 'CQC dental software', 'GDC standards',
          'AVA records', 'VCNZ records', 'MCNZ records', 'GOsC compliance',
          'GCC chiropractic compliance', 'CMA vet compliance', 'allied health frameworks',
          'regulatory clinical records', 'healthcare compliance software', 'audit-ready records',
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: itemListLd }} />
      <GrassHeader />
      <main style={{ flex: 1, zIndex: 10, background: '#fff' }}>

        {/* Hero */}
        <section className="g-section" style={{ padding: '148px 0 56px' }}>
          <div className="g-container">
            <div className="g-split">
              <div>
                <Rv as="h1" className="g-h1" style={{ fontSize: 'clamp(36px, 4.6vw, 64px)', marginBottom: 20 }}>
                  Every framework Salvia <span className="g-hl">generates records against.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1}>
                  {FRAMEWORKS.length} frameworks across {new Set(FRAMEWORKS.map((f) => f.country)).size} regions.
                  Your clinic registers a country and vertical at onboarding; every AI
                  generation ships the matching regulator pack into the prompt — so records
                  come out aligned to <b>your inspector's checklist</b>, not a generic
                  template.
                </Rv>
              </div>
              <Rv className="g-split-art" delay={1}>
                <img
                  src="/illustrations/ill_globe_india.webp"
                  alt="A globe with a location pin on India"
                  loading="lazy"
                />
              </Rv>
            </div>

            {/* Country totals bar */}
            <Rv delay={2} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 44 }}>
              {(INDIA_ONLY
                ? (['IN', 'GB', 'AU', 'NZ', 'US', 'IE'] as FrameworkCountry[])
                : (['IE', 'GB', 'AU', 'NZ', 'US', 'IN'] as FrameworkCountry[])
              ).map((c) => (
                <button
                  key={c}
                  onClick={() => setCountry(c)}
                  style={{
                    padding: '9px 15px', borderRadius: 999, border: '1px solid var(--g-line)',
                    backgroundColor: '#fff', cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontFamily: 'var(--g-font)', fontSize: 13.5, fontWeight: 700, color: 'var(--g-ink)',
                  }}
                >
                  <span>{COUNTRY_META[c].flag}</span>
                  <span>{COUNTRY_META[c].label}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 999,
                    backgroundColor: 'var(--g-line-soft)', color: 'var(--g-ink-soft)',
                  }}>{totalsByCountry[c]}</span>
                </button>
              ))}
            </Rv>
          </div>
        </section>

        {/* Filters bar — sticky */}
        <section style={{
          position: 'sticky', top: 0, zIndex: 50,
          padding: '12px 0',
          backgroundColor: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--g-line-soft)',
        }}>
          <div className="g-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'space-between', fontFamily: 'var(--g-font)' }}>
              {/* Country chips */}
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center' }}>
                <span className="g-small" style={{ fontWeight: 700, marginRight: 4 }}>Country</span>
                {COUNTRIES_ORDER.map((c) => (
                  <FilterChip
                    key={c}
                    active={country === c}
                    label={c === 'all' ? 'All' : `${COUNTRY_META[c as FrameworkCountry].flag} ${c}`}
                    onClick={() => setCountry(c)}
                  />
                ))}
              </div>

              {/* Vertical chips */}
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', alignItems: 'center' }}>
                <span className="g-small" style={{ fontWeight: 700, marginRight: 4 }}>Vertical</span>
                {VERTICALS_ORDER.map((v) => (
                  <FilterChip
                    key={v}
                    active={vertical === v}
                    label={v === 'all' ? 'All' : VERTICAL_META[v as FrameworkVertical].label}
                    onClick={() => setVertical(v)}
                  />
                ))}
              </div>
            </div>

            {/* Search */}
            <div style={{
              position: 'relative', marginTop: 10,
              border: '1px solid var(--g-line)', borderRadius: 12,
              padding: '9px 14px 9px 38px', display: 'flex', alignItems: 'center',
              backgroundColor: '#fff',
            }}>
              <svg
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="var(--g-ink-faint)" strokeWidth="2"
                style={{ position: 'absolute', left: 14 }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by code, body, country, or summary…"
                style={{
                  flex: 1, border: 'none', outline: 'none', background: 'transparent',
                  fontFamily: 'var(--g-font)', fontSize: 14, fontWeight: 500, color: 'var(--g-ink)',
                }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--g-ink-faint)', padding: 4, fontSize: 15 }}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
              <span className="g-small" style={{ fontWeight: 700, marginLeft: 8 }}>
                {filtered.length} of {FRAMEWORKS.length}
              </span>
            </div>
          </div>
        </section>

        {/* Results */}
        <section style={{ padding: '40px 0 88px', backgroundColor: '#fff' }}>
          <div className="g-container">
            {filtered.length === 0 ? (
              <EmptyState />
            ) : grouped ? (
              <>
                {GROUP_ORDER.map((c) => {
                  const list = grouped[c];
                  if (list.length === 0) return null;
                  return (
                    <CountryGroup key={c} country={c} frameworks={list} />
                  );
                })}
              </>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
                {filtered.map((f) => (
                  <FrameworkCard key={f.code + '-' + f.country} f={f} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Custom framework CTA */}
        <section className="g-final">
          <div className="g-container">
            <div className="g-final-grid">
              <div>
                <Rv as="h2" className="g-h2">
                  Don't see yours? <span className="g-hl">We'll write it.</span>
                </Rv>
                <Rv as="p" className="g-sub" delay={1} style={{ marginTop: 14 }}>
                  Tell us which regulator governs you. We'll author the framework pack —
                  record-keeping clauses, retention rules, consent requirements — and add it
                  to the catalog.
                </Rv>
                <Rv className="g-hero-ctas" delay={2} style={{ marginTop: 30 }}>
                  <Link className="g-btn g-btn--green" to="/start">
                    Request a framework
                  </Link>
                </Rv>
              </div>
              <Rv className="g-final-art" delay={1}>
                <img
                  src="/illustrations/story_policy.webp"
                  alt="A wall of policy binders wired into a clinical form"
                  loading="lazy"
                />
              </Rv>
            </div>
          </div>
        </section>

      </main>
      <GrassFooter />
    </>
  );
};

function FilterChip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '6px 13px', borderRadius: 999,
        border: `1px solid ${active ? 'var(--g-green)' : 'var(--g-line)'}`,
        backgroundColor: active ? 'var(--g-green)' : '#fff',
        color: active ? '#083D1B' : 'var(--g-ink-soft)',
        fontFamily: 'var(--g-font)', fontSize: 12.5, fontWeight: 700,
        cursor: 'pointer', transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  );
}

function CountryGroup({ country, frameworks }: { country: FrameworkCountry; frameworks: typeof FRAMEWORKS }) {
  const meta = COUNTRY_META[country];
  return (
    <div style={{ marginBottom: 52 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        marginBottom: 18, paddingBottom: 12,
        borderBottom: '1px solid var(--g-line-soft)',
      }}>
        <span style={{ fontSize: 22 }}>{meta.flag}</span>
        <h2 className="g-h3" style={{ margin: 0, flex: 1 }}>
          {meta.label}
        </h2>
        <span className="g-small" style={{ fontWeight: 700, padding: '3px 10px', borderRadius: 999, backgroundColor: 'var(--g-line-soft)' }}>
          {frameworks.length} framework{frameworks.length === 1 ? '' : 's'}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
        {frameworks.map((f) => <FrameworkCard key={f.code + '-' + f.country} f={f} />)}
      </div>
    </div>
  );
}

function FrameworkCard({ f }: { f: typeof FRAMEWORKS[number] }) {
  const countryMeta = COUNTRY_META[f.country];
  return (
    <article className="g-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 22 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <img
          src={CATEGORY_ICON[f.category] ?? '/illustrations/tpl_soap.webp'}
          alt=""
          loading="lazy"
          style={{ width: 52, height: 52, objectFit: 'contain', margin: 0, flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 className="g-h3" style={{ marginBottom: 3 }}>{f.code}</h3>
          <div className="g-small" style={{ fontWeight: 600, lineHeight: 1.4, color: 'var(--g-ink-soft)' }}>
            {f.fullName}
          </div>
        </div>
        <span className="g-ui-tag g-ui-tag--ink" style={{ flexShrink: 0, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <span>{countryMeta.flag}</span>
          {f.country}
        </span>
      </div>

      <p style={{ fontFamily: 'var(--g-font)', fontSize: 13, color: 'var(--g-ink-soft)', lineHeight: 1.55, margin: 0 }}>
        {f.summary}
      </p>

      <div className="g-tpl-meta" style={{ marginTop: 0 }}>
        <span>{FRAMEWORK_CATEGORY_LABEL[f.category]}</span>
        {f.verticals.map((v) => (
          <Link key={v} to={VERTICAL_META[v].slug} style={{ textDecoration: 'none' }}>
            <span className="g-tpl-vert">{VERTICAL_META[v].label}</span>
          </Link>
        ))}
        {f.disciplines?.map((d) => (
          <Link key={d} to={DISCIPLINE_META[d].slug} style={{ textDecoration: 'none' }}>
            <span>{DISCIPLINE_META[d].label}</span>
          </Link>
        ))}
      </div>

      <div className="g-small" style={{
        marginTop: 'auto', paddingTop: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: '1px solid var(--g-line-soft)',
      }}>
        <span>Reviewed {new Date(f.currencyDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        {f.sourceUrl && (
          <a href={f.sourceUrl} target="_blank" rel="noreferrer noopener" style={{ color: 'var(--g-green)', textDecoration: 'none', fontWeight: 700 }}>
            Source ↗
          </a>
        )}
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="g-center" style={{ padding: '64px 16px' }}>
      <p className="g-sub" style={{ margin: '0 auto 22px' }}>
        No frameworks match those filters. Try widening the country or vertical, or request a
        custom pack below.
      </p>
      <Link className="g-btn g-btn--green" to="/start">
        Request a custom framework
      </Link>
    </div>
  );
}
