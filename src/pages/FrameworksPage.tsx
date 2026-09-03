/**
 * /frameworks — the index.
 *
 * Organised by country and regulator rather than by vertical, because that is
 * how the obligation actually reaches a practice. CQC inspects GP surgeries and
 * dental practices under the same regulation; AHPRA governs six professions
 * with one set of records standards. India has no equivalent single inspector,
 * so its column is accreditation and reimbursement bodies instead — which is
 * exactly the point of building the catalogue this way.
 */
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import frameworks from '../data/frameworks-index.json';
import coverage from '../data/coverage.json';
import '../styles/site.css';

type Fw = (typeof frameworks)[number];

const ORDER = ['GB', 'IE', 'US', 'AU', 'NZ', 'IN'];

/* India is the reason this page is grouped by country rather than assuming a
   regulator. Worth saying out loud on the page, not just in a comment. */
const NOTE: Record<string, string> = {
  GB: 'One inspectorate across general practice and dentistry, with the professional councils layered on top.',
  IE: 'Statutory registration boards per profession; HIQA inspects the services themselves.',
  US: 'Federal privacy law plus profession-level boards — the obligation is split, not centralised.',
  AU: 'AHPRA runs a single national scheme covering many professions at once.',
  NZ: 'A responsible authority per profession under the HPCA Act.',
  IN: 'No single inspectorate. Accreditation, reimbursement empanelment and the new data law carry the obligation instead.',
};

const byCountry = ORDER.map((code) => {
  const list = (frameworks as Fw[]).filter((f) => f.country === code);
  return { code, name: list[0]?.countryName ?? code, list };
}).filter((c) => c.list.length);

const verticalCount = new Set(frameworks.flatMap((f) => f.verticalNames)).size;
const clauseCount = frameworks.reduce((n, f) => n + f.clauseCount, 0);

export function FrameworksPage() {
  return (
    <div className="s-page">
      <SEO
        title="Frameworks — every standard Salvia maps, by country and regulator"
        description={`${frameworks.length} frameworks across ${byCountry.length} countries and ${verticalCount} kinds of practice, with ${clauseCount} record-keeping clauses mapped to what Salvia captures.`}
        path="/frameworks"
      />
      <SiteHeader />

      <section className="s-section" style={{ paddingBottom: 'var(--space-6)' }}>
        <div className="s-wrap">
          <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3.25rem)', maxWidth: '18ch' }}>
            Whoever inspects you, the records question is the same one.
          </h1>
          <p className="s-lede" style={{ marginTop: 'var(--space-5)' }}>
            Salvia carries {frameworks.length} frameworks across {byCountry.length} countries
            and {verticalCount} kinds of practice — {clauseCount} record-keeping clauses,
            each mapped to the field that satisfies it. They are listed by the body that
            holds you to them, because one regulator usually covers several professions
            and a list of verticals would say nothing about who is actually asking.
          </p>
        </div>
      </section>

      {/* ---- scored coverage ---- */}
      <section className="s-band s-section">
        <div className="s-wrap">
          <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '20ch' }}>
            Five of them are scored requirement by requirement.
          </h2>
          <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>
            For these, Salvia doesn't just describe the standard — it walks every
            requirement in it and marks one of four honest states. Out of scope means
            the requirement is about something Salvia has no business measuring, and it
            never counts against a clinic's score.
          </p>

          <div className="fwx-scored">
            {coverage.map((c) => (
              <div className="s-card" key={c.id}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                  <h3 style={{ fontSize: 'var(--text-xl)' }}>{c.id.replace('_', ' ')}</h3>
                  <b className="num" style={{ font: '700 var(--text-2xl)/1 var(--font-display)', color: 'var(--accent)' }}>
                    {c.pct}%
                  </b>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', marginTop: 'var(--space-2)' }}>
                  {c.name}
                </p>

                <div className="fwx-bar">
                  <i style={{ width: `${(c.measuredNow / c.total) * 100}%` }} />
                  <i className="w" style={{ width: `${(c.needsData / c.total) * 100}%` }} />
                  <i className="s" style={{ width: `${(c.comingSoon / c.total) * 100}%` }} />
                  <i className="o" style={{ width: `${(c.outOfScope / c.total) * 100}%` }} />
                </div>

                <dl className="fwx-legend">
                  <div><dt>Measured now</dt><dd className="num">{c.measuredNow}</dd></div>
                  <div><dt>Needs data</dt><dd className="num">{c.needsData}</dd></div>
                  <div><dt>Coming soon</dt><dd className="num">{c.comingSoon}</dd></div>
                  <div><dt>Out of scope</dt><dd className="num">{c.outOfScope}</dd></div>
                </dl>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginTop: 'var(--space-3)' }}>
                  {c.total} requirements{c.edition ? ` · ${c.edition.split(',')[0]}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- the catalogue ---- */}
      {byCountry.map((c) => (
        <section className="s-section" key={c.code} style={{ paddingBlock: 'var(--space-8)' }}>
          <div className="s-wrap fwx-country">
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)' }}>{c.name}</h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', marginTop: 'var(--space-3)', maxWidth: '34ch' }}>
                {NOTE[c.code]}
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--faint)', marginTop: 'var(--space-3)' }}>
                {c.list.length} frameworks
              </p>
            </div>

            <div className="fwx-list">
              {c.list.map((f) => (
                <Link to={`/frameworks/${f.key}`} className="fwx-row" key={f.key}>
                  <span className="fwx-body">{f.body}</span>
                  <span className="fwx-name">{f.fullName}</span>
                  <span className="fwx-meta">
                    {f.verticalNames.join(' · ')}
                    <em>{f.categoryName}</em>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
      <SiteFooter />
    </div>
  );
}
