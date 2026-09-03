import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import './index.css';
import { capturePageview } from './lib/posthog';
import { CookieConsent } from './components/CookieConsent';

const HomePage = lazy(() => import('./pages/HomePage'));
const InsightsPage = lazy(() => import('./pages/InsightsPage').then(m => ({ default: m.InsightsPage })));
const ArticlePage = lazy(() => import('./pages/ArticlePage').then(m => ({ default: m.ArticlePage })));
const SignupPage = lazy(() => import('./pages/SignupPage').then(m => ({ default: m.SignupPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const FrameworksPage = lazy(() => import('./pages/FrameworksPage').then(m => ({ default: m.FrameworksPage })));
const FrameworkPage = lazy(() => import('./pages/FrameworkPage').then(m => ({ default: m.FrameworkPage })));
const DeepFrameworkPage = lazy(() => import('./pages/DeepFrameworkPage').then(m => ({ default: m.DeepFrameworkPage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then(m => ({ default: m.LegalPage })));

function PageviewTracker() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    capturePageview(pathname + search, document.title);
  }, [pathname, search]);
  return null;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Section may not be mounted yet on a cross-route nav; retry a few
      // frames before falling back to top.
      const id = hash.slice(1);
      let tries = 0;
      const tick = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        if (tries++ < 10) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>

        {/* Ambient living background: tonal glow mesh + Conway's Game of Life */}

        <ScrollToTop />
        <PageviewTracker />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/frameworks" element={<FrameworksPage />} />
            {/* The five deep pages, listed explicitly: two dynamic segments of the
                same shape would make the first one swallow all 60. Keep in step
                with DEEP in src/data/deepFrameworks.ts. */}
            {['cqc', 'hiqa', 'cms', 'nabh', 'jci'].map(s => (
              <Route key={s} path={`/frameworks/${s}`} element={<DeepFrameworkPage slug={s} />} />
            ))}
            <Route path="/frameworks/:key" element={<FrameworkPage />} />
            <Route path="/blog" element={<InsightsPage />} />
            <Route path="/blog/:id" element={<ArticlePage />} />
            <Route path="/start" element={<SignupPage />} />
            <Route path="/pricing" element={<Navigate to="/start" replace />} />
            <Route path="/contact-sales" element={<Navigate to="/start" replace />} />
            <Route path="/privacy" element={<LegalPage slug="privacy" />} />
            <Route path="/terms" element={<LegalPage slug="terms" />} />
            <Route path="/cookies" element={<LegalPage slug="cookies" />} />
            <Route path="/dpa" element={<LegalPage slug="dpa" />} />
            <Route path="/security" element={<LegalPage slug="security" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        <CookieConsent />

      </div>
    </BrowserRouter>
  );
}

export default App;
