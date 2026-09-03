/**
 * Site header.
 *
 * Always there, pushed out to the edges of the viewport rather than boxed into
 * the content column — and with nothing separating it from the page. No border,
 * no bar, no capsule: it sits on a short gradient of the paper colour that
 * fades to nothing, so content passes underneath without ever meeting a line.
 *
 * There is no dropdown. A menu listing sixty regulators is a directory, it
 * covered the whole hero, and it pointed at pages that carry `noindex` on
 * purpose. /frameworks is built for that job.
 */
import { Link } from 'react-router-dom';

export function SiteHeader() {
  return (
    <header className="sh">
      <Link to="/" className="sh-logo">Salvia<i>.</i></Link>
      <nav className="sh-nav">
        <Link to="/frameworks" className="sh-link">Frameworks</Link>
        <Link to="/#product" className="sh-link">Product</Link>
        <Link to="/blog" className="sh-link">Writing</Link>
        <Link className="s-btn s-btn--primary sh-cta" to="/start">Talk to us</Link>
      </nav>
    </header>
  );
}
