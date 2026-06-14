import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { initPostHog } from './lib/posthog'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
)

// Prerendered pages (snapshot.mjs) ship real HTML in #root — hydrate it.
// In dev / un-snapshotted pages #root is empty — client-render instead.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}

// Load + init analytics after the page is interactive, off the critical path.
const bootAnalytics = () => { void initPostHog(); };
if ('requestIdleCallback' in window) {
  (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
    .requestIdleCallback(bootAnalytics, { timeout: 4000 });
} else {
  setTimeout(bootAnalytics, 2500);
}
