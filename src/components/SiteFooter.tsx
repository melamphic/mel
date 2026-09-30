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
    title: 'Salvia',
    links: [
      { label: 'The desk', to: '/#desk' },
      { label: 'What is live', to: '/#live' },
      { label: 'The rules', to: '/#cost' },
      { label: 'What we will not do', to: '/#trust' },
      { label: 'Questions', to: '/#faq' },
    ],
  },
  {
    title: 'More',
    links: [
      { label: 'Writing', to: '/blog' },
      { label: 'Book a demo', to: '/start' },
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
            The claim integrity layer for Indian hospitals. Every admission and every
            document, live to the insurance desk, while the evidence can still be created.
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
