/**
 * 404. Short, human, and none of the visitor's business why — an explanation of
 * our own content decisions belongs in a commit message, not on a dead end.
 */
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import '../styles/site.css';

const ELSEWHERE = [
  { to: '/frameworks', title: 'Frameworks', note: 'Every standard Salvia maps, by the body that inspects you' },
  { to: '/blog', title: 'Writing', note: 'Record-keeping questions, answered against the source' },
  { to: '/start', title: 'Talk to us', note: 'Tell us where the paperwork breaks in your practice' },
];

export const NotFoundPage = () => (
  <div className="s-page">
    <SEO title="Page not found" description="That page isn’t here." path="/404" noindex />
    <SiteHeader />

    <section className="s-section">
      <div className="s-wrap s-wrap--narrow">
        <p className="nf-code num">404</p>
        <h1 style={{ fontSize: 'clamp(2rem, 4.4vw, 3.1rem)', marginTop: 'var(--space-4)', maxWidth: '16ch' }}>
          Uh oh. Wrong place.
        </h1>
        <p className="s-lede" style={{ marginTop: 'var(--space-5)' }}>
          There’s no record of this page — which, on a site about record keeping, is a
          bit much. Try one of these instead.
        </p>

        <ol className="lg-index" style={{ marginTop: 'var(--space-8)' }}>
          {ELSEWHERE.map((e, i) => (
            <li key={e.to}>
              <Link to={e.to}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="lg-index-t">{e.title}</span>
                <span className="lg-index-d">{e.note}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <SiteFooter />
  </div>
);
