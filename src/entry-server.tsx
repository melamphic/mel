// Server entry for build-time static generation (NO browser needed — pure Node
// renderToString). Used by snapshot.mjs to fill <div id="root"> with real HTML
// so crawlers + AI bots see full content. Routes are imported EAGERLY here
// (not React.lazy) so renderToString won't hit a Suspense boundary.
//
// Keep this route table in sync with src/App.tsx.
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import HomePage from './pages/HomePage';
import { InsightsPage } from './pages/InsightsPage';
import { ArticlePage } from './pages/ArticlePage';
import { SignupPage } from './pages/SignupPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FrameworksPage } from './pages/FrameworksPage';
import { FrameworkPage } from './pages/FrameworkPage';
import { DeepFrameworkPage } from './pages/DeepFrameworkPage';
import { LegalPage } from './pages/LegalPage';

const DEEP_SLUGS = ['cqc', 'hiqa', 'cms', 'nabh', 'jci'];

function ServerApp({ url }: { url: string }) {
  return (
    <HelmetProvider context={{}}>
      <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/frameworks" element={<FrameworksPage />} />
            {DEEP_SLUGS.map((s) => (
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
        </div>
      </StaticRouter>
    </HelmetProvider>
  );
}

export function render(url: string): string {
  return renderToString(<ServerApp url={url} />);
}
