import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './styles/tokens.css'
import './index.css'
import App from './App.tsx'
import { initPostHog, hasAnalyticsConsent } from './lib/posthog'

// Scroll-reveal styles (.g-rv) only hide content under html.js, so the
// prerendered snapshot stays fully visible for crawlers and no-JS visitors.
document.documentElement.classList.add('js')

// Prerendered pages (snapshot.mjs) ship real HTML in #root so crawlers and AI
// bots see full content with no JS. The client renders over that snapshot —
// identical output, so the swap is invisible, and we avoid hydration-mismatch
// errors that a complex animated/stateful tree would otherwise throw.
const container = document.getElementById('root')!
container.innerHTML = ''
createRoot(container).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)

// Load + init analytics after the page is interactive, off the critical path —
// but ONLY if the user has already granted cookie consent. First-time visitors
// get no analytics until they accept in the consent banner (CookieConsent.tsx).
if (hasAnalyticsConsent()) {
  const bootAnalytics = () => { void initPostHog(); };
  if ('requestIdleCallback' in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
      .requestIdleCallback(bootAnalytics, { timeout: 4000 });
  } else {
    setTimeout(bootAnalytics, 2500);
  }
}
