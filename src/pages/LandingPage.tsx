import { SEO } from '../components/SEO';
import { GrassHeader } from '../components/grass/GrassHeader';
import { HeroGrass } from '../components/grass/HeroGrass';
import { StoryScene } from '../components/grass/StoryScene';
import { RegistersCarousel } from '../components/grass/HowRegisters';
import { SixYearGrass, ProveIt } from '../components/grass/EvidenceGrass';
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
        {/* Hook + demo film slot + register marquee */}
        <HeroGrass />
        {/* Act 01 — pinned story: one consult becomes evidence */}
        <StoryScene />
        {/* Act 02 — pinned horizontal travel through the registers */}
        <RegistersCarousel />
        {/* Act 03 — the six-year test, dark, timeline drawn by scroll */}
        <SixYearGrass />
        {/* Why the record holds up */}
        <ProveIt />
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
