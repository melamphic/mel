import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import './index.css';

const LandingPage     = lazy(() => import('./pages/LandingPage').then(m => ({ default: m.LandingPage })));
const FormEnginePage  = lazy(() => import('./pages/FormEnginePage').then(m => ({ default: m.FormEnginePage })));
const PolicyEnginePage = lazy(() => import('./pages/PolicyEnginePage').then(m => ({ default: m.PolicyEnginePage })));
const AudioToFormsPage = lazy(() => import('./pages/AudioToFormsPage').then(m => ({ default: m.AudioToFormsPage })));
const InsightsPage    = lazy(() => import('./pages/InsightsPage').then(m => ({ default: m.InsightsPage })));
const ArticlePage     = lazy(() => import('./pages/ArticlePage').then(m => ({ default: m.ArticlePage })));
const PricingPage     = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const SignupPage      = lazy(() => import('./pages/SignupPage').then(m => ({ default: m.SignupPage })));
const ContactSalesPage = lazy(() => import('./pages/ContactSalesPage').then(m => ({ default: m.ContactSalesPage })));
const NotFoundPage    = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const VeterinaryPage  = lazy(() => import('./pages/VeterinaryPage').then(m => ({ default: m.VeterinaryPage })));
const DentalPage      = lazy(() => import('./pages/DentalPage').then(m => ({ default: m.DentalPage })));
const AgedCarePage    = lazy(() => import('./pages/AgedCarePage').then(m => ({ default: m.AgedCarePage })));
const GeneralClinicPage = lazy(() => import('./pages/GeneralClinicPage').then(m => ({ default: m.GeneralClinicPage })));

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

        {/* Sophisticated Curved SVG Background */}
        <svg
          className="bg-swoop hide-mobile"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ zIndex: 0, opacity: 0.4 }}
        >
          <g stroke="var(--salvia-primary)" strokeWidth="1.5" fill="none">
            {/* Flowline 1 */}
            <path d="M -50 150 C 100 150 200 300 400 300 C 600 300 700 100 900 100 C 1100 100 1200 250 1500 250" />
            {/* Flowline 2 with Accents */}
            <path d="M 300 450 C 450 450 550 200 800 200 C 950 200 1050 350 1300 350" strokeWidth="1" strokeDasharray="6 6" />
            <path d="M 0 350 C 150 350 250 200 400 200 L 450 200" stroke="var(--salvia-accent)" strokeWidth="2" />

            {/* Geometric Nodes */}
            <circle cx="400" cy="300" r="4" fill="var(--salvia-bg)" stroke="var(--salvia-primary)" strokeWidth="2" />
            <circle cx="800" cy="200" r="4" fill="var(--salvia-bg)" stroke="var(--salvia-primary)" strokeWidth="2" />
            <circle cx="450" cy="200" r="3" fill="var(--salvia-accent)" stroke="none" />
            <rect x="1200" y="246" width="8" height="8" fill="var(--salvia-primary)" />
          </g>
        </svg>

        <ScrollToTop />
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
            <Route path="/contact-sales" element={<ContactSalesPage />} />
            <Route path="/veterinary" element={<VeterinaryPage />} />
            <Route path="/dental" element={<DentalPage />} />
            <Route path="/aged-care" element={<AgedCarePage />} />
            <Route path="/general-practice" element={<GeneralClinicPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

      </div>
    </BrowserRouter>
  );
}

export default App;
