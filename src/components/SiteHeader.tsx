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
        {/* display:contents above the breakpoint, a scrolling strip below it,
            so the links survive on a phone without a menu to open. */}
        <span className="sh-links">
          <Link to="/#desk" className="sh-link">The desk</Link>
          <Link to="/blog" className="sh-link">Writing</Link>
        </span>
        <Link className="s-btn s-btn--primary sh-cta" to="/start">Book a demo</Link>
      </nav>
    </header>
  );
}
