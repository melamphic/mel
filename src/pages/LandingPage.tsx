import { SEO } from '../components/SEO';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { PainSection } from '../components/PainSection';
import { WhatSalviaIs } from '../components/WhatSalviaIs';
import { DayWithSalvia } from '../components/DayWithSalvia';
import { ProductSection } from '../components/ProductSection';
import { BentoReinvented } from '../components/BentoReinvented';
import { SixYearTest } from '../components/SixYearTest';
import { CaptureModes } from '../components/CaptureModes';
import { DomainSection } from '../components/DomainSection';
import { FrameworksRail } from '../components/FrameworksRail';
import { ROICalculator } from '../components/ROICalculator';
import { LabTeaser } from '../components/LabTeaser';
import { Footer } from '../components/Footer';

export const LandingPage = () => {
  return (
    <>
      <SEO
        title="The Evidence Layer for Indian Healthcare — AI Clinical Records"
        description="Salvia turns what your clinicians say — ambient or dictated, in any Indian language — into verified, sealed clinical records. Complete files you can produce when a complaint arrives, and full last-visit context at every consult."
        path="/"
        keywords={['medical records software India', 'NABH compliance software', 'AI medical scribe India', 'clinical documentation software India', 'medical negligence records', 'ABDM compliant software', 'audit-ready clinical notes', 'hospital evidence platform']}
      />
      <Header />
      <main style={{ flex: 1, zIndex: 10 }}>
        {/* Hook */}
        <Hero />
        {/* Problem */}
        <PainSection />
        {/* What it is — a compliance suite, not a scribe */}
        <WhatSalviaIs />
        {/* Capture is flexible, evidence is constant */}
        <CaptureModes />
        {/* How it works — voice note in, locked record out */}
        <DayWithSalvia />
        {/* The product — three engines */}
        <ProductSection />
        {/* The output — records an assessor can read */}
        <BentoReinvented />
        {/* The worst-day closer — sourced */}
        <SixYearTest />
        {/* Who it's for — verticals */}
        <DomainSection />
        {/* Your rulebook — frameworks */}
        <FrameworksRail />
        {/* The payoff — ROI */}
        <ROICalculator />
        {/* Learn more */}
        <LabTeaser />
      </main>
      <Footer />
    </>
  );
};
