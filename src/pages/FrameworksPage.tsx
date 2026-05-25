import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import {
  FRAMEWORKS,
  COUNTRY_META,
  VERTICAL_META,
  DISCIPLINE_META,
  FRAMEWORK_CATEGORY_LABEL,
  type FrameworkCountry,
  type FrameworkVertical,
} from '../data/frameworks';

const ACCENT = '#0F172A';

type CountryFilter = FrameworkCountry | 'all';
type VerticalFilter = FrameworkVertical | 'all';

const COUNTRIES_ORDER: CountryFilter[] = ['all', 'IE', 'UK', 'AU', 'NZ', 'US', 'EU', 'Global'];
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
      IE: [], UK: [], AU: [], NZ: [], US: [], EU: [], Global: [],
    };
    filtered.forEach((f) => buckets[f.country].push(f));
    return buckets;
  }, [filtered, country]);

  const totalsByCountry = useMemo(() => {
    const t: Record<FrameworkCountry, number> = { IE: 0, UK: 0, AU: 0, NZ: 0, US: 0, EU: 0, Global: 0 };
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
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <SEO
        title="Regulatory Frameworks We Support"
        description={`Salvia generates audit-ready clinical records against ${FRAMEWORKS.length}+ regulatory frameworks across veterinary, dental, general practice and allied health — CORU, HCPC, AHPRA, RCVS, CQC, GDC, GOsC, GCC, AVA, VCNZ, MCNZ and more. Five countries, every clinical vertical.`}
        path="/frameworks"
        keywords={[
          'compliance software frameworks', 'CORU compliance software', 'HCPC software',
          'AHPRA compliance', 'RCVS compliance', 'CQC dental software', 'GDC standards',
          'AVA records', 'VCNZ records', 'MCNZ records', 'GOsC compliance',
          'GCC chiropractic compliance', 'CMA vet compliance', 'allied health frameworks',
          'regulatory clinical records', 'healthcare compliance software', 'audit-ready records',
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: itemListLd }} />
      <Header />

      {/* Hero */}
      <section style={{ padding: '11rem 0 5rem', backgroundColor: 'var(--salvia-bg)' }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: 'rgba(15,23,42,0.04)', border: '1.5px solid rgba(15,23,42,0.08)',
            borderRadius: '10px', padding: '0.35rem 0.85rem', marginBottom: '2rem',
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {FRAMEWORKS.length} frameworks · 5 countries
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 1.05,
            color: 'var(--salvia-primary)', marginBottom: '1.5rem',
          }}>
            Every framework Salvia<br />generates records against.
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
            color: 'var(--salvia-text-muted)', lineHeight: 1.65,
            maxWidth: '700px', margin: '0 auto 2rem',
          }}>
            Your clinic registers a country and vertical at onboarding. Every AI form gen call ships the matching regulator pack into the prompt automatically — so records come out aligned to your inspector's checklist, not a generic template.
          </p>

          {/* Country totals bar */}
          <div style={{
            display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center',
            marginTop: '1.5rem',
          }}>
            {(['IE','UK','AU','NZ','US','EU','Global'] as FrameworkCountry[]).map((c) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: '10px',
                  border: '1px solid #EEF2F6',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  fontSize: '0.85rem', fontWeight: 700,
                  color: 'var(--salvia-primary)',
                }}
              >
                <span style={{ fontSize: '1rem' }}>{COUNTRY_META[c].flag}</span>
                <span>{COUNTRY_META[c].label}</span>
                <span style={{
                  fontSize: '0.7rem', fontWeight: 800,
                  padding: '0.1rem 0.45rem', borderRadius: '5px',
                  backgroundColor: `${COUNTRY_META[c].accent}15`,
                  color: COUNTRY_META[c].accent,
                }}>{totalsByCountry[c]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters bar */}
      <section style={{
        position: 'sticky', top: 0, zIndex: 50,
        padding: '1.25rem 0',
        backgroundColor: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #EEF2F6',
      }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem',
            flexWrap: 'wrap', justifyContent: 'space-between',
          }}>
            {/* Country chips */}
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--salvia-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '0.25rem' }}>Country</span>
              {COUNTRIES_ORDER.map((c) => (
                <FilterChip
                  key={c}
                  active={country === c}
                  label={c === 'all' ? 'All' : `${COUNTRY_META[c as FrameworkCountry].flag} ${c}`}
                  onClick={() => setCountry(c)}
                  accent={c === 'all' ? ACCENT : COUNTRY_META[c as FrameworkCountry].accent}
                />
              ))}
            </div>

            {/* Vertical chips */}
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--salvia-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '0.25rem' }}>Vertical</span>
              {VERTICALS_ORDER.map((v) => (
                <FilterChip
                  key={v}
                  active={vertical === v}
                  label={v === 'all' ? 'All' : VERTICAL_META[v as FrameworkVertical].label}
                  onClick={() => setVertical(v)}
                  accent={v === 'all' ? ACCENT : VERTICAL_META[v as FrameworkVertical].accent}
                />
              ))}
            </div>
          </div>

          {/* Search */}
          <div style={{
            position: 'relative', marginTop: '0.85rem',
            backgroundColor: '#fff',
            border: '1.5px solid #EEF2F6',
            borderRadius: '12px',
            padding: '0.65rem 1rem 0.65rem 2.5rem',
            display: 'flex', alignItems: 'center',
          }}>
            <svg
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              style={{ position: 'absolute', left: '0.85rem', color: 'var(--salvia-text-muted)' }}
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
                flex: 1, border: 'none', outline: 'none',
                fontSize: '0.92rem', color: 'var(--salvia-text)',
                background: 'transparent',
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--salvia-text-muted)', padding: '0.25rem',
                }}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
            <span style={{
              fontSize: '0.72rem', fontWeight: 700,
              color: 'var(--salvia-text-muted)', marginLeft: '0.5rem',
            }}>
              {filtered.length} of {FRAMEWORKS.length}
            </span>
          </div>
        </div>
      </section>

      {/* Results */}
      <section style={{ padding: '4rem 0 6rem', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          {filtered.length === 0 ? (
            <EmptyState />
          ) : grouped ? (
            <>
              {(['IE','UK','AU','NZ','US','EU','Global'] as FrameworkCountry[]).map((c) => {
                const list = grouped[c];
                if (list.length === 0) return null;
                return (
                  <CountryGroup key={c} country={c} frameworks={list} />
                );
              })}
            </>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1rem',
            }}>
              {filtered.map((f) => (
                <FrameworkCard key={f.code + '-' + f.country} f={f} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom framework CTA */}
      <section style={{
        padding: '6rem 0', backgroundColor: 'var(--salvia-bg)',
        borderTop: '1px solid #F1F5F9',
      }}>
        <div className="container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <div style={{
            fontSize: '0.72rem', fontWeight: 800, color: 'var(--salvia-accent)',
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem',
          }}>
            Don't see yours?
          </div>
          <h2 style={{
            fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)', fontWeight: 800,
            color: 'var(--salvia-primary)', letterSpacing: '-0.03em',
            margin: '0 0 1rem',
          }}>
            Request a custom framework pack.
          </h2>
          <p style={{
            color: 'var(--salvia-text-muted)', fontSize: '1rem',
            lineHeight: 1.65, marginBottom: '2rem', maxWidth: '600px',
            margin: '0 auto 2rem',
          }}>
            Tell us which regulator governs you. We'll author the framework pack — record-keeping clauses, retention rules, consent requirements — and add it to the catalog. Usually live within a week.
          </p>
          <Link to="/start" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backgroundColor: 'var(--salvia-accent)', color: '#fff',
            padding: '0.9rem 1.9rem', borderRadius: '12px',
            fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
          }}>
            Request a framework
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

function FilterChip({
  active, label, onClick, accent,
}: {
  active: boolean; label: string; onClick: () => void; accent: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '0.4rem 0.85rem',
        borderRadius: '999px',
        border: active ? `1.5px solid ${accent}` : '1.5px solid transparent',
        backgroundColor: active ? `${accent}15` : 'rgba(15,23,42,0.04)',
        color: active ? accent : 'var(--salvia-text-muted)',
        fontSize: '0.78rem', fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.15s',
        letterSpacing: '0.01em',
      }}
    >
      {label}
    </button>
  );
}

function CountryGroup({ country, frameworks }: { country: FrameworkCountry; frameworks: typeof FRAMEWORKS }) {
  const meta = COUNTRY_META[country];
  return (
    <div style={{ marginBottom: '3.5rem' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        marginBottom: '1.25rem', paddingBottom: '0.75rem',
        borderBottom: `2px solid ${meta.accent}25`,
      }}>
        <span style={{ fontSize: '1.5rem' }}>{meta.flag}</span>
        <h2 style={{
          fontSize: '1.4rem', fontWeight: 800,
          color: 'var(--salvia-primary)', letterSpacing: '-0.02em',
          margin: 0, flex: 1,
        }}>
          {meta.label}
        </h2>
        <span style={{
          fontSize: '0.75rem', fontWeight: 800,
          color: meta.accent,
          padding: '0.25rem 0.65rem', borderRadius: '6px',
          backgroundColor: `${meta.accent}12`,
        }}>
          {frameworks.length} framework{frameworks.length === 1 ? '' : 's'}
        </span>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1rem',
      }}>
        {frameworks.map((f) => <FrameworkCard key={f.code + '-' + f.country} f={f} />)}
      </div>
    </div>
  );
}

function FrameworkCard({ f }: { f: typeof FRAMEWORKS[number] }) {
  const countryMeta = COUNTRY_META[f.country];
  return (
    <article style={{
      padding: '1.5rem',
      borderRadius: '16px',
      backgroundColor: '#FAFBFC',
      border: '1px solid #EEF2F6',
      display: 'flex', flexDirection: 'column', gap: '0.85rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.65rem' }}>
        <div>
          <div style={{
            fontSize: '1.2rem', fontWeight: 900,
            color: countryMeta.accent, letterSpacing: '-0.02em',
            marginBottom: '0.2rem',
          }}>
            {f.code}
          </div>
          <div style={{
            fontSize: '0.82rem', color: 'var(--salvia-text)',
            fontWeight: 600, lineHeight: 1.4,
          }}>
            {f.fullName}
          </div>
        </div>
        <span style={{
          fontSize: '1.1rem', flexShrink: 0,
        }}>{countryMeta.flag}</span>
      </div>

      <p style={{
        fontSize: '0.82rem', color: 'var(--salvia-text-muted)',
        lineHeight: 1.55, margin: 0,
      }}>
        {f.summary}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
        <Tag label={FRAMEWORK_CATEGORY_LABEL[f.category]} colour="var(--salvia-text-muted)" />
        {f.verticals.map((v) => (
          <Link key={v} to={VERTICAL_META[v].slug} style={{ textDecoration: 'none' }}>
            <Tag label={VERTICAL_META[v].label} colour={VERTICAL_META[v].accent} />
          </Link>
        ))}
        {f.disciplines?.map((d) => (
          <Link key={d} to={DISCIPLINE_META[d].slug} style={{ textDecoration: 'none' }}>
            <Tag label={DISCIPLINE_META[d].label} colour={DISCIPLINE_META[d].accent} />
          </Link>
        ))}
      </div>

      <div style={{
        marginTop: 'auto', paddingTop: '0.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: '0.7rem', color: 'var(--salvia-text-muted)',
        borderTop: '1px solid #EEF2F6',
      }}>
        <span>Reviewed {new Date(f.currencyDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        {f.sourceUrl && (
          <a href={f.sourceUrl} target="_blank" rel="noreferrer noopener" style={{
            color: countryMeta.accent, textDecoration: 'none', fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
          }}>
            Source
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
}

function Tag({ label, colour }: { label: string; colour: string }) {
  return (
    <span style={{
      fontSize: '0.65rem', fontWeight: 700,
      padding: '0.2rem 0.5rem', borderRadius: '5px',
      backgroundColor: `${colour}10`,
      color: colour,
      letterSpacing: '0.02em',
    }}>{label}</span>
  );
}

function EmptyState() {
  return (
    <div style={{
      padding: '4rem 1rem', textAlign: 'center',
      color: 'var(--salvia-text-muted)',
    }}>
      <p style={{ fontSize: '1rem', marginBottom: '1.25rem' }}>
        No frameworks match those filters. Try widening the country or vertical, or request a custom pack below.
      </p>
      <Link to="/start" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        backgroundColor: 'var(--salvia-primary)', color: '#fff',
        padding: '0.75rem 1.4rem', borderRadius: '10px',
        fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none',
      }}>
        Request a custom framework
      </Link>
    </div>
  );
}
