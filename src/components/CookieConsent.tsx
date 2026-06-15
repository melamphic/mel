import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConsent, setAnalyticsConsent } from '../lib/posthog';

// Cookie consent banner. Analytics (PostHog) stays off until the visitor accepts.
// SSR-safe: renders nothing until mounted (choice lives in localStorage). The
// footer "Cookie settings" link reopens it via the 'salvia:cookie-settings' event.
export const COOKIE_SETTINGS_EVENT = 'salvia:cookie-settings';

export const CookieConsent = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // show on first visit (no stored choice)
    if (!getConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (granted: boolean) => {
    setAnalyticsConsent(granted);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: 'fixed', bottom: '1rem', left: '1rem', right: '1rem', zIndex: 1000,
        maxWidth: 540, margin: '0 auto',
        background: '#fff', border: '1px solid rgba(15,23,42,0.1)', borderRadius: 16,
        boxShadow: '0 20px 48px -12px rgba(15,23,42,0.25)', padding: '1.2rem 1.3rem',
      }}
    >
      <p style={{ fontSize: '0.9rem', lineHeight: 1.55, color: 'var(--salvia-text-muted)', margin: '0 0 0.9rem' }}>
        We use essential cookies to run the site, and optional analytics (PostHog) to improve it.
        You can accept or decline analytics. See our <Link to="/cookies/" style={{ color: 'var(--salvia-accent)', fontWeight: 600 }}>Cookie Policy</Link>.
      </p>
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => choose(true)}
          style={{ flex: '1 1 auto', background: 'var(--salvia-primary)', color: '#fff', border: 'none', borderRadius: 999, padding: '0.6rem 1.2rem', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
        >
          Accept analytics
        </button>
        <button
          onClick={() => choose(false)}
          style={{ flex: '1 1 auto', background: 'transparent', color: 'var(--salvia-primary)', border: '1px solid rgba(15,23,42,0.2)', borderRadius: 999, padding: '0.6rem 1.2rem', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
        >
          Decline
        </button>
      </div>
    </div>
  );
};
