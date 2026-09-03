import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/site.css';
import { getConsent, setAnalyticsConsent, capturePageview } from '../lib/posthog';

// Cookie consent banner. Analytics (PostHog) stays off until the visitor accepts.
// SSR-safe: renders nothing until mounted (choice lives in localStorage). The
// footer "Cookie settings" link reopens it via the 'salvia:cookie-settings' event.
export const COOKIE_SETTINGS_EVENT = 'salvia:cookie-settings';

export const CookieConsent = () => {
  // Lazy initializer would read localStorage during SSR snapshot — keep the
  // first-visit check in an effect, but schedule it a frame later so the
  // banner opening never cascades into the initial render commit.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf: number | undefined;
    if (!getConsent()) {
      raf = requestAnimationFrame(() => setOpen(true)); // show on first visit
    }
    const reopen = () => setOpen(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen);
    return () => {
      if (raf !== undefined) cancelAnimationFrame(raf);
      window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen);
    };
  }, []);

  if (!open) return null;

  const choose = (granted: boolean) => {
    setAnalyticsConsent(granted);
    // Pre-consent events are dropped (never buffered), so capture the page
    // the visitor is on right now — the first legally-collectable pageview.
    if (granted) capturePageview(window.location.pathname + window.location.search, document.title);
    setOpen(false);
  };

  return (
    <div role="dialog" aria-label="Cookie consent" className="cc">
      <p>
        We use essential cookies to run the site, and optional analytics (PostHog) to
        improve it. See our <Link to="/cookies">Cookie Policy</Link>.
      </p>
      <div className="cc-actions">
        <button className="s-btn s-btn--primary" onClick={() => choose(true)}>Accept analytics</button>
        <button className="s-btn s-btn--ghost" onClick={() => choose(false)}>Decline</button>
      </div>
    </div>
  );
};
