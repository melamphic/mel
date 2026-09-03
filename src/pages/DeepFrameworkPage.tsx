/**
 * /frameworks/cqc · /hiqa · /cms · /nabh · /jci
 *
 * The five pages that campaigns actually point at. Unlike the generated
 * catalogue pages, each of these carries evidence nobody else holds: verbatim
 * findings from published inspection reports, and the product's own honest
 * four-state coverage where it walks the framework requirement by requirement.
 */
import { Link, Navigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { DEEP } from '../data/deepFrameworks';
import findings from '../data/findings.json';
import coverage from '../data/coverage.json';
import '../styles/site.css';

type Findings = typeof findings;

/** Anchor id from a citation like "Regulation 17(2)(c)" or "F656 — §483.21(b)(1)". */
const slugify = (ref: string) =>
  ref.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** The sharpest number we hold for a framework, computed rather than typed so
 *  it cannot drift from findings.json or coverage.json. */
function headline(d: (typeof DEEP)[number]): string {
  if (d.coverageId) {
    const c = coverage.find((x) => x.id === d.coverageId);
    if (c) return `${c.pct}% of ${c.inScope} in-scope measured`;
  }
  const data = d.findingsKey ? (findings as Findings)[d.findingsKey] : null;
  /* Order matters: HIQA carries both a record share and a failed-regulation
     ranking, and the ranking is the more specific fact — so it is checked
     first, or TypeScript narrows it away and it can never be reached. */
  if (data && 'failedRegulations' in data) {
    return `Most failed: ${data.failedRegulations[0]?.name ?? '—'}`;
  }
  if (data && 'aboutRecord' in data) {
    return `${Math.round((data.aboutRecord / data.total) * 100)}% of reports name the record`;
  }
  if (data && 'facilities' in data) {
    return `${data.facilities.toLocaleString('en-US')} facilities cited`;
  }
  return `${d.clauses.length} citations mapped`;
}

const REGION_LABEL: Record<string, string> = {
  cqcAdultSocialCare: 'published CQC report',
  hiqa: 'published HIQA inspection report',
};

/* The slug arrives as a prop, not from useParams: these are STATIC routes
   (`/frameworks/cqc`), and a static path exposes no params — reading one gave
   `undefined` and bounced every page to the index. */
export function DeepFrameworkPage({ slug }: { slug: string }) {
  const f = DEEP.find((d) => d.slug === slug);
  if (!f) return <Navigate to="/frameworks" replace />;

  const data = f.findingsKey ? (findings as Findings)[f.findingsKey] : null;
  const cov = f.coverageId ? coverage.find((c) => c.id === f.coverageId) : null;
  const quotes = data && 'quotes' in data ? data.quotes : [];

  return (
    <div className="s-page">
      <SEO
        title={`${f.body} record keeping — what the ${f.lexicon.inspection} actually checks`}
        description={f.lede}
        path={`/frameworks/${f.slug}`}
        keywords={[
          `${f.body} record keeping`,
          `${f.body} documentation requirements`,
          `${f.body} ${f.lexicon.inspection} evidence`,
        ]}
      />
      <SiteHeader />

      {/* ---- hero ----
          Two columns: the argument on the left, and on the right the citations
          this page actually covers — which doubles as its table of contents. The
          right column used to be empty, and an illustration would have said less
          than the citation list does. */}
      <section className="s-section" style={{ paddingBottom: 'var(--space-7)' }}>
        <div className="s-wrap dfx-hero">
          <div>
            <div className="fwx-crumbs">
              <Link to="/frameworks">Frameworks</Link><span>/</span><span>{f.country}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3.25rem)', maxWidth: '19ch', marginTop: 'var(--space-4)' }}>
              {f.headline}
            </h1>
            <p className="s-lede" style={{ marginTop: 'var(--space-5)' }}>{f.lede}</p>

            <div className="dfx-covers">
              <h2 className="dfx-kicker">One body, several kinds of practice</h2>
              <ul>{f.covers.map((c) => <li key={c}>{c}</li>)}</ul>
            </div>
          </div>

          <nav className="dfx-toc" aria-label="Citations on this page">
            <h2 className="dfx-kicker">Citations covered</h2>
            <ol>
              {f.clauses.map((c, i) => (
                <li key={c.ref}>
                  <a href={`#${slugify(c.ref)}`}>
                    <span className="num">{String(i + 1).padStart(2, '0')}</span>
                    <span><b>{c.ref}</b><em>{c.title}</em></span>
                  </a>
                </li>
              ))}
            </ol>
            {f.retention && <p className="dfx-toc-note">Retention · {f.retention}</p>}
          </nav>
        </div>
      </section>

      {/* Getting `survey` vs `inspection` wrong is how you read as an outsider. */}
      <section className="s-band" style={{ paddingBlock: 'var(--space-7)' }}>
        <div className="s-wrap dfx-lex">
          <h2 className="dfx-kicker">The words {f.body} uses</h2>
          <dl>
            <div><dt>{f.lexicon.inspection}</dt><dd>not “inspection”</dd></div>
            <div><dt>{f.lexicon.inspector}</dt><dd>not “inspector”</dd></div>
            <div><dt>{f.lexicon.service}</dt><dd>not “clinic”</dd></div>
          </dl>
          <p>Their vocabulary is the buyer’s vocabulary. We take it from the reports.</p>
        </div>
      </section>

      {/* ---- the evidence ---- */}
      {data && (
        <section className="s-band s-section">
          <div className="s-wrap">
            <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '22ch' }}>
              {'aboutRecord' in data
                ? 'This is the finding, over and over.'
                : 'The scale of it, from the regulator’s own data.'}
            </h2>
            <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>{f.proof}</p>

            <div className="dfx-stats">
              {'aboutRecord' in data && (
                <>
                  <div>
                    <b className="num">{Math.round((data.aboutRecord / data.total) * 100)}%</b>
                    <span>of the {data.total.toLocaleString('en-GB')} most recent reports we read
                      name the record, the care plan, the audit or the risk assessment</span>
                  </div>
                  {'goodButCited' in data && (
                    <div>
                      <b className="num">{data.goodButCited}</b>
                      <span>of those services were rated <b>Good</b> overall and still carried a
                        record-keeping finding</span>
                    </div>
                  )}
                </>
              )}
              {'facilities' in data && (
                <>
                  <div>
                    <b className="num">{data.facilities.toLocaleString('en-US')}</b>
                    <span>facilities carrying a documentation deficiency at their most recent survey</span>
                  </div>
                  <div>
                    <b className="num">{data.multiTag.toLocaleString('en-US')}</b>
                    <span>of them were cited on more than one documentation tag, across
                      {' '}{data.states} states and territories</span>
                  </div>
                </>
              )}
            </div>

            {quotes.length > 0 && (
              <>
                <div className="dfx-quotes">
                  {quotes.map((q) => (
                    <figure className="s-card" key={q.quote}>
                      <blockquote>{q.quote}</blockquote>
                      <figcaption>
                        {REGION_LABEL[f.findingsKey as string] ?? 'published report'}
                        {q.region ? ` · ${q.region}` : ''}
                        {q.month ? ` · ${q.month}` : ''}
                        {q.rating ? <em> · service rated {q.rating}</em> : null}
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <p className="dfx-note">
                  Quoted verbatim from public reports. We do not name the {f.lexicon.service}s —
                  the point is the pattern, not the provider.
                </p>
              </>
            )}

            {'failedRegulations' in data && (
              <div className="dfx-regs">
                <h3 className="dfx-kicker">Which regulations actually fail</h3>
                <ol>
                  {data.failedRegulations.map((r) => (
                    <li key={r.name}><span>{r.name}</span><b className="num">{r.n}</b></li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---- the clauses ---- */}
      <section className="s-section">
        <div className="s-wrap">
          <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '24ch' }}>
            What the standard says, and what we do about it.
          </h2>
          <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>
            Quoted from the primary source, with the citation. The answer underneath is ours, and
            it is meant to be falsifiable — if it does not do that, it is a bug.
          </p>

          <ol className="dfx-clauses">
            {f.clauses.map((c, i) => (
              <li key={c.ref} id={slugify(c.ref)}>
                <div className="dfx-clauseHead">
                  <span className="dfx-clauseNo num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="fwx-ref">{c.ref}</span>
                  <h3 style={{ fontSize: 'var(--text-xl)', marginTop: 'var(--space-2)' }}>{c.title}</h3>
                </div>
                <blockquote className="fwx-quote">{c.text}</blockquote>
                <p className="dfx-answer">{c.answer}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- scored coverage ---- */}
      {cov && (
        <section className="s-band s-section">
          <div className="s-wrap">
            <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '22ch' }}>
              All {cov.total} requirements, each one marked honestly.
            </h2>
            <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>
              {cov.measuredNow} of the {cov.inScope} in-scope requirements are measured from data
              you already hold. {cov.needsData} need a field you have not filled yet, and the
              product names which. {cov.outOfScope} are out of scope and never counted against you.
            </p>

            <div className="dfx-coverage s-card">
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: 'var(--text-xl)' }}>{cov.id.replace('_', ' ')}</h3>
                <b className="num" style={{ font: '700 var(--text-3xl)/1 var(--font-display)', color: 'var(--accent)' }}>
                  {cov.pct}%
                </b>
              </div>
              <div className="fwx-bar" style={{ marginTop: 'var(--space-5)' }}>
                <i style={{ width: `${(cov.measuredNow / cov.total) * 100}%` }} />
                <i className="w" style={{ width: `${(cov.needsData / cov.total) * 100}%` }} />
                <i className="s" style={{ width: `${(cov.comingSoon / cov.total) * 100}%` }} />
                <i className="o" style={{ width: `${(cov.outOfScope / cov.total) * 100}%` }} />
              </div>
              <dl className="fwx-legend" style={{ marginTop: 'var(--space-4)' }}>
                <div><dt>Measured now</dt><dd className="num">{cov.measuredNow}</dd></div>
                <div><dt>Needs data</dt><dd className="num">{cov.needsData}</dd></div>
                <div><dt>Coming soon</dt><dd className="num">{cov.comingSoon}</dd></div>
                <div><dt>Out of scope</dt><dd className="num">{cov.outOfScope}</dd></div>
              </dl>
              {cov.groups.length > 0 && (
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', marginTop: 'var(--space-5)' }}>
                  Chapters walked: {cov.groups.map((g) => g.code).join(' · ')}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---- sources ---- */}
      <section className="s-section">
        <div className="s-wrap s-wrap--narrow">
          <h2 className="dfx-kicker">Sources</h2>
          <ul className="fwx-sources" style={{ marginTop: 'var(--space-4)' }}>
            {f.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer nofollow">{s.label}</a>
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', marginTop: 'var(--space-4)' }}>
            Every regulation on this page was read from the primary source and checked on{' '}
            <time dateTime={f.verified}>{f.verified}</time>.
            {f.retention ? ` Record retention: ${f.retention}.` : ''}
          </p>
        </div>
      </section>

      {/* The set, so a reader who arrived on one framework can see the shape of
          the others without going back to the index. */}
      <section className="s-section">
        <div className="s-wrap">
          <h2 style={{ fontSize: 'var(--text-2xl)', maxWidth: '24ch' }}>
            The same question, in five jurisdictions
          </h2>
          <ol className="dfx-set">
            {DEEP.map((d, i) => (
              <li key={d.slug}>
                <Link to={`/frameworks/${d.slug}`} aria-current={d.slug === f.slug}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="dfx-set-body">
                    <b>{d.body}</b>
                    <em>{d.country}</em>
                  </span>
                  <span className="dfx-set-stat">{headline(d)}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="s-section" style={{ background: 'var(--deep)', borderBlock: '1.5px solid var(--ink)' }}>
        <div className="s-wrap">
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.75rem, 3.6vw, 2.5rem)', maxWidth: '20ch' }}>
            Tell us where the paperwork breaks in your {f.lexicon.service}.
          </h2>
          <p style={{ color: 'hsl(355 25% 82%)', marginTop: 'var(--space-4)', maxWidth: '56ch' }}>
            We are building this with a small number of {f.lexicon.service}s. If you know exactly
            which part of the record never gets written, that is worth more to us than a sale.
          </p>
          <Link className="s-btn s-btn--onDeep" to="/start" style={{ marginTop: 'var(--space-6)' }}>
            Talk to us
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
