import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { initPostHog } from './lib/posthog'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)

// Load + init analytics after the page is interactive, off the critical path.
const bootAnalytics = () => { void initPostHog(); };
if ('requestIdleCallback' in window) {
  (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void })
    .requestIdleCallback(bootAnalytics, { timeout: 4000 });
} else {
  setTimeout(bootAnalytics, 2500);
}
