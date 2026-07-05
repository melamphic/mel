import { SEO } from '../components/SEO';
import { GrassHeader } from '../components/grass/GrassHeader';
import { HeroGrass } from '../components/grass/HeroGrass';
import { RegisterShowcase } from '../components/grass/RegisterShowcase';
import { FormBuilderSection, PolicyEngineSection, TemplateLibrary, PdfSection } from '../components/grass/ProductSections';
import { SixYearGrass } from '../components/grass/EvidenceGrass';
import { HospitalsBand, PricingTeaserGrass, FinalCTAGrass } from '../components/grass/CommercialGrass';
import { Footer } from '../components/Footer';

export const LandingPage = () => {
  return (
    <>
      <SEO
        title="The Evidence Layer for Indian Healthcare — AI Clinical Records"
        description="Salvia turns what your clinicians say — ambient in the OPD or a quick voice note — into verified, sealed clinical records checked against your policies. Complete files you can produce when a complaint arrives."
        path="/"
        keywords={['medical records software India', 'NABH compliance software', 'AI medical scribe India', 'clinical documentation software India', 'medical negligence records', 'ABDM compliant software', 'audit-ready clinical notes', 'hospital evidence platform']}
      />
      <GrassHeader />
      <main style={{ flex: 1, zIndex: 10, background: '#fff' }}>
        {/* Hook + hero illustration + demo film slot */}
        <HeroGrass />
        {/* The real form builder */}
        <FormBuilderSection />
        {/* The real policy engine */}
        <PolicyEngineSection />
        {/* 107 real templates */}
        <TemplateLibrary />
        {/* Every register, shown as the real product */}
        <RegisterShowcase />
        {/* The themed PDF with the SHA-256 footer */}
        <PdfSection />
        {/* The worst-day closer — sourced */}
        <SixYearGrass />
        {/* Hospitals — HMIS layer */}
        <HospitalsBand />
        {/* Pricing teaser — India note tiers */}
        <PricingTeaserGrass />
        {/* Final CTA */}
        <FinalCTAGrass />
      </main>
      <Footer />
    </>
  );
};
