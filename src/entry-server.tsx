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
import { BackgroundField } from './components/BackgroundField';
import { LandingPage } from './pages/LandingPage';
import { FormEnginePage } from './pages/FormEnginePage';
import { PolicyEnginePage } from './pages/PolicyEnginePage';
import { AudioToFormsPage } from './pages/AudioToFormsPage';
import { InsightsPage } from './pages/InsightsPage';
import { ArticlePage } from './pages/ArticlePage';
import { PricingPage } from './pages/PricingPage';
import { SignupPage } from './pages/SignupPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { VeterinaryPage } from './pages/VeterinaryPage';
import { DentalPage } from './pages/DentalPage';
import { GeneralClinicPage } from './pages/GeneralClinicPage';
import { AlliedHealthPage } from './pages/AlliedHealthPage';
import { AlliedDisciplineTemplate } from './pages/AlliedDisciplineTemplate';
import { FrameworksPage } from './pages/FrameworksPage';
import { LegalPage } from './pages/LegalPage';
import { MelamphicPage } from './pages/MelamphicPage';

function ServerApp({ url }: { url: string }) {
  return (
    <HelmetProvider context={{}}>
      <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <BackgroundField />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products/statutory-form-infrastructure" element={<FormEnginePage />} />
            <Route path="/products/institutional-compliance-hub" element={<PolicyEnginePage />} />
            <Route path="/products/point-of-care-evidence" element={<AudioToFormsPage />} />
            <Route path="/blog" element={<InsightsPage />} />
            <Route path="/blog/:id" element={<ArticlePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/start" element={<SignupPage />} />
            <Route path="/contact-sales" element={<Navigate to="/start" replace />} />
            <Route path="/veterinary" element={<VeterinaryPage />} />
            <Route path="/dental" element={<DentalPage />} />
            <Route path="/general-practice" element={<GeneralClinicPage />} />
            <Route path="/allied-health" element={<AlliedHealthPage />} />
            <Route path="/physiotherapy" element={<AlliedDisciplineTemplate slug="physiotherapy" />} />
            <Route path="/osteopathy" element={<AlliedDisciplineTemplate slug="osteopathy" />} />
            <Route path="/chiropractic" element={<AlliedDisciplineTemplate slug="chiropractic" />} />
            <Route path="/occupational-therapy" element={<AlliedDisciplineTemplate slug="occupational-therapy" />} />
            <Route path="/podiatry" element={<AlliedDisciplineTemplate slug="podiatry" />} />
            <Route path="/speech-therapy" element={<AlliedDisciplineTemplate slug="speech-therapy" />} />
            <Route path="/frameworks" element={<FrameworksPage />} />
            <Route path="/melamphic" element={<MelamphicPage />} />
            <Route path="/privacy" element={<LegalPage slug="privacy" />} />
            <Route path="/terms" element={<LegalPage slug="terms" />} />
            <Route path="/cookies" element={<LegalPage slug="cookies" />} />
            <Route path="/dpa" element={<LegalPage slug="dpa" />} />
            <Route path="/subprocessors" element={<LegalPage slug="subprocessors" />} />
            <Route path="/refund-policy" element={<LegalPage slug="refund-policy" />} />
            <Route path="/acceptable-use" element={<LegalPage slug="acceptable-use" />} />
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
