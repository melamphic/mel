/**
 * /frameworks/:key — one regulator.
 *
 * Everything on this page comes out of the product's framework catalogue. The
 * clauses are the real ones, with the real citation, and the line under each is
 * what Salvia is obliged to do about it — which is the honest version of a
 * feature list, because it is written against an external standard rather than
 * against our own marketing.
 */
import { Link, useParams, Navigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import frameworks from '../data/frameworks.json';
import '../styles/site.css';

type Fw = (typeof frameworks)[number];

/* The catalogue's long summaries carry paragraph breaks and **bold** runs.
   Two rules is the whole renderer — anything more and this wants a markdown
   dependency it does not need. */
function Prose({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n{2,}/).map((para, i) => (
        <p key={i} style={{ marginTop: i ? 'var(--space-4)' : 0 }}>
          {para.split(/\*\*(.+?)\*\*/g).map((chunk, j) =>
            j % 2 ? <strong key={j} style={{ color: 'var(--ink)' }}>{chunk}</strong> : chunk
          )}
        </p>
      ))}
    </>
  );
}

/* Every key that appears in the catalogue's forms_implicated, so no page ever
   prints a raw snake_case identifier at a reader. */
const FORM_NAME: Record<string, string> = {
  anaesthesia_record: 'Anaesthesia record',
  clinical_audit: 'Clinical audit',
  complaint_log: 'Complaint log',
  consent_form: 'Consent',
  discharge_summary: 'Discharge summary',
  drug_register: 'Drug register',
  incident_report: 'Incident report',
  intake_assessment: 'Intake assessment',
  invoice_record: 'Invoice',
  medical_history: 'Medical history',
  outcome_measure: 'Outcome measure',
  pain_score: 'Pain score',
  perio_chart: 'Perio chart',
  prescription_record: 'Prescription',
  radiograph_record: 'Radiograph',
  referral: 'Referral',
  referral_letter: 'Referral letter',
  soap_note: 'Clinical note',
  treatment_record: 'Treatment record',
};

export function FrameworkPage() {
  const { key } = useParams();
  const f = (frameworks as Fw[]).find((x) => x.key === key);
  if (!f) return <Navigate to="/frameworks" replace />;

  const siblings = (frameworks as Fw[])
    .filter((x) => x.country === f.country && x.key !== f.key)
    .slice(0, 6);

  return (
    <div className="s-page">
      <SEO
        title={`${f.body} — record-keeping requirements, and what satisfies them`}
        description={f.summary}
        path={`/frameworks/${f.key}`}
        keywords={f.keyTerms}
        /* Reachable, linked, and useful on a sales call — but not indexed.
           Sixty pages off one template is the shape Google's scaled-content
           policy targets, and most of these regulators have no search demand.
           The five in DEEP carry the SEO weight instead. */
        noindex
      />
      <SiteHeader />

      <section className="s-section" style={{ paddingBottom: 'var(--space-6)' }}>
        <div className="s-wrap">
          <div className="fwx-crumbs">
            <Link to="/frameworks">Frameworks</Link>
            <span>/</span>
            <span>{f.countryName}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3.25rem)', maxWidth: '16ch', marginTop: 'var(--space-4)' }}>
            {f.body}
          </h1>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--muted)', marginTop: 'var(--space-3)', maxWidth: '52ch' }}>
            {f.fullName}
          </p>
          <p className="s-lede" style={{ marginTop: 'var(--space-5)' }}>{f.summary}</p>
        </div>
      </section>

      {/* The hero's right-hand column was empty. It is now the two facts a
          practice actually asks first — how long the record must survive, and
          which of their records this reaches. Not an illustration: the page
          already holds better material than a picture. */}
      <section style={{ paddingBottom: 'var(--space-8)' }}>
        <div className="s-wrap fwx-hero">
          <dl className="fwx-facts">
            <div><dt>Applies to</dt><dd>{f.verticalNames.join(', ')}</dd></div>
            <div><dt>Type</dt><dd>{f.categoryName}</dd></div>
            <div><dt>Clauses mapped</dt><dd className="num">{f.clauses.length}</dd></div>
            <div><dt>Country</dt><dd>{f.countryName}</dd></div>
          </dl>

          <aside className="fwx-panel">
            {f.retentionYears && (
              <div className="fwx-retain">
                <b className="num">{f.retentionYears}</b>
                <span>years the record must survive after the last entry</span>
              </div>
            )}
            {f.formsImplicated.length > 0 && (
              <div>
                <h2 className="fwx-asideH">Records this reaches</h2>
                <ul className="fwx-tags" style={{ marginTop: 'var(--space-3)' }}>
                  {f.formsImplicated.map((t) => (
                    <li key={t}>{FORM_NAME[t] ?? t.replace(/_/g, ' ')}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ---- the clauses ---- */}
      <section className="s-band s-section">
        <div className="s-wrap">
          <h2 style={{ fontSize: 'var(--text-3xl)', maxWidth: '22ch' }}>
            What the standard says, and what it obliges the software to do.
          </h2>
          <p className="s-lede" style={{ marginTop: 'var(--space-4)' }}>
            Quoted from the source, with the citation. The second line is not a
            feature — it is the requirement translated into something a product can
            be held to.
          </p>

          <ol className="fwx-clauses">
            {f.clauses.map((c) => (
              <li key={c.ref} className="s-card">
                <div className="fwx-ref">{c.ref}</div>
                <h3 style={{ fontSize: 'var(--text-xl)', marginTop: 'var(--space-2)' }}>{c.title}</h3>
                <blockquote className="fwx-quote">{c.text}</blockquote>
                <p className="fwx-imp">{c.implication}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- the detail ---- */}
      <section className="s-section">
        <div className="s-wrap fwx-detail">
          <div>
            <h2 style={{ fontSize: 'var(--text-2xl)', maxWidth: '22ch' }}>
              How this reaches a working day
            </h2>
            <div style={{ marginTop: 'var(--space-5)', maxWidth: 'var(--measure)' }}>
              <Prose text={f.longSummary} />
            </div>
          </div>

          <aside className="fwx-aside">
            {f.keyTerms.length > 0 && (
              <div>
                <h3 className="fwx-asideH">The words the standard uses</h3>
                <ul className="fwx-tags fwx-tags--quiet">
                  {f.keyTerms.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            )}

            <div>
              <h3 className="fwx-asideH">Sources</h3>
              <ul className="fwx-sources">
                {f.sourceUrls.map((u) => (
                  <li key={u}>
                    <a href={u} target="_blank" rel="noopener noreferrer nofollow">
                      {new URL(u).hostname.replace(/^www\./, '')}
                    </a>
                  </li>
                ))}
              </ul>
              {f.currencyDate && (
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--faint)', marginTop: 'var(--space-3)' }}>
                  Checked against the source on <time>{f.currencyDate}</time>.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* ---- siblings ---- */}
      {siblings.length > 0 && (
        <section className="s-band s-section">
          <div className="s-wrap">
            <h2 style={{ fontSize: 'var(--text-2xl)' }}>
              Also carried in {f.countryName}
            </h2>
            <div className="fwx-list" style={{ marginTop: 'var(--space-5)' }}>
              {siblings.map((s) => (
                <Link to={`/frameworks/${s.key}`} className="fwx-row" key={s.key}>
                  <span className="fwx-body">{s.body}</span>
                  <span className="fwx-name">{s.fullName}</span>
                  <span className="fwx-meta">
                    {s.verticalNames.join(' · ')}
                    <em>{s.categoryName}</em>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="s-section" style={{ background: 'var(--deep)', borderBlock: '1.5px solid var(--ink)' }}>
        <div className="s-wrap">
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.75rem, 3.6vw, 2.5rem)', maxWidth: '20ch' }}>
            Tell us where {f.body} bites hardest in your practice.
          </h2>
          <p style={{ color: 'hsl(355 25% 82%)', marginTop: 'var(--space-4)', maxWidth: '56ch' }}>
            We are building this with a small number of practices. If you know exactly
            where the paperwork breaks, that is worth more to us than a sale.
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
