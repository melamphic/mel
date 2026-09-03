/**
 * Site footer.
 *
 * Every link here goes somewhere. The old footer carried two columns of
 * disciplines that were never built — a dead link in a footer is the cheapest
 * possible way to look like a site nobody maintains.
 */
import { Link } from 'react-router-dom';

const YEAR = new Date().getFullYear();

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: 'Frameworks',
    links: [
      { label: 'CQC — England', to: '/frameworks/cqc' },
      { label: 'HIQA — Ireland', to: '/frameworks/hiqa' },
      { label: 'CMS — United States', to: '/frameworks/cms' },
      { label: 'NABH — India', to: '/frameworks/nabh' },
      { label: 'All frameworks', to: '/frameworks' },
    ],
  },
  {
    title: 'Salvia',
    links: [
      { label: 'The product', to: '/#product' },
      { label: 'Writing', to: '/blog' },
      { label: 'Talk to us', to: '/start' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
      { label: 'Cookies', to: '/cookies' },
      { label: 'Data processing', to: '/dpa' },
      { label: 'Security', to: '/security' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="sf">
      <div className="s-wrap sf-grid">
        <div>
          <Link to="/" className="sf-logo">Salvia<i>.</i></Link>
          <p className="sf-line">
            Compliance evidence for clinical practice. Your policies as enforceable
            rules, checked before a record is filed.
          </p>
        </div>

        {COLUMNS.map((c) => (
          <nav key={c.title}>
            <h2 className="sf-title">{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.to + l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="s-wrap sf-base">
        <span>© {YEAR} Salvia</span>
        <span>Made for the people who have to prove it.</span>
      </div>
    </footer>
  );
}
