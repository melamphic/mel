import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { FormEnginePage } from './pages/FormEnginePage';
import { PolicyEnginePage } from './pages/PolicyEnginePage';
import { AudioToFormsPage } from './pages/AudioToFormsPage';
import { InsightsPage } from './pages/InsightsPage';
import { ArticlePage } from './pages/ArticlePage';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
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
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products/statutory-form-infrastructure" element={<FormEnginePage />} />
          <Route path="/products/institutional-compliance-hub" element={<PolicyEnginePage />} />
          <Route path="/products/point-of-care-evidence" element={<AudioToFormsPage />} />
          <Route path="/blog" element={<InsightsPage />} />
          <Route path="/blog/:id" element={<ArticlePage />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
