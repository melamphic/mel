/**
 * Site header.
 *
 * Always there, pushed out to the edges of the viewport rather than boxed into
 * the content column — and with nothing separating it from the page. No border,
 * no bar, no capsule: it sits on a short gradient of the paper colour that
 * fades to nothing, so content passes underneath without ever meeting a line.
 *
 * There is no dropdown, and no framework directory. A nav item reading
 * "Frameworks" pointed at sixty regulators across six countries, which told
 * every visitor we were a compliance directory. We sell one thing in one
 * country: evidence for cashless claims in India. The nav says that or it says
 * nothing.
 */
import { Link } from 'react-router-dom';

export function SiteHeader() {
  return (
    <header className="sh">
      <Link to="/" className="sh-logo">Salvia<i>.</i></Link>
      <nav className="sh-nav">
        <Link to="/#cost" className="sh-link">The deductions</Link>
        <Link to="/#product" className="sh-link">Product</Link>
        <Link to="/blog" className="sh-link">Writing</Link>
        <Link className="s-btn s-btn--primary sh-cta" to="/start">Talk to us</Link>
      </nav>
    </header>
  );
}
