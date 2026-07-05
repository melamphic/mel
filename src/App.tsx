import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import './index.css';
import { capturePageview } from './lib/posthog';
import { CookieConsent } from './components/CookieConsent';

const LandingPage = lazy(() => import('./pages/LandingPage').then(m => ({ default: m.LandingPage })));
const FormEnginePage = lazy(() => import('./pages/FormEnginePage').then(m => ({ default: m.FormEnginePage })));
const PolicyEnginePage = lazy(() => import('./pages/PolicyEnginePage').then(m => ({ default: m.PolicyEnginePage })));
const AudioToFormsPage = lazy(() => import('./pages/AudioToFormsPage').then(m => ({ default: m.AudioToFormsPage })));
const InsightsPage = lazy(() => import('./pages/InsightsPage').then(m => ({ default: m.InsightsPage })));
const ArticlePage = lazy(() => import('./pages/ArticlePage').then(m => ({ default: m.ArticlePage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const SignupPage = lazy(() => import('./pages/SignupPage').then(m => ({ default: m.SignupPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const PreviewA = lazy(() => import('./pages/previews/PreviewA'));
const PreviewB = lazy(() => import('./pages/previews/PreviewB'));
const PreviewC = lazy(() => import('./pages/previews/PreviewC'));
const PreviewD = lazy(() => import('./pages/previews/PreviewD'));
const HospitalsPage = lazy(() => import('./pages/HospitalsPage').then(m => ({ default: m.HospitalsPage })));
const VeterinaryPage = lazy(() => import('./pages/VeterinaryPage').then(m => ({ default: m.VeterinaryPage })));
const DentalPage = lazy(() => import('./pages/DentalPage').then(m => ({ default: m.DentalPage })));
const GeneralClinicPage = lazy(() => import('./pages/GeneralClinicPage').then(m => ({ default: m.GeneralClinicPage })));
const AlliedHealthPage = lazy(() => import('./pages/AlliedHealthPage').then(m => ({ default: m.AlliedHealthPage })));
const AlliedDisciplineTemplate = lazy(() => import('./pages/AlliedDisciplineTemplate').then(m => ({ default: m.AlliedDisciplineTemplate })));
const FrameworksPage = lazy(() => import('./pages/FrameworksPage').then(m => ({ default: m.FrameworksPage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then(m => ({ default: m.LegalPage })));
const MelamphicPage = lazy(() => import('./pages/MelamphicPage').then(m => ({ default: m.MelamphicPage })));

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
            <Route path="/" element={<LandingPage />} />
            <Route path="/products/statutory-form-infrastructure" element={<FormEnginePage />} />
            <Route path="/products/institutional-compliance-hub" element={<PolicyEnginePage />} />
            <Route path="/products/point-of-care-evidence" element={<AudioToFormsPage />} />
            <Route path="/blog" element={<InsightsPage />} />
            <Route path="/blog/:id" element={<ArticlePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/start" element={<SignupPage />} />
            <Route path="/contact-sales" element={<Navigate to="/start" replace />} />
            <Route path="/hospitals" element={<HospitalsPage />} />
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
            {/* design-direction previews — internal, not linked or indexed */}
            <Route path="/preview/a" element={<PreviewA />} />
            <Route path="/preview/b" element={<PreviewB />} />
            <Route path="/preview/c" element={<PreviewC />} />
            <Route path="/preview/d" element={<PreviewD />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        <CookieConsent />

      </div>
    </BrowserRouter>
  );
}

export default App;
