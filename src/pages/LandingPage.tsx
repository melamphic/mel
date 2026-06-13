import { SEO } from '../components/SEO';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { PainSection } from '../components/PainSection';
import { WhatSalviaIs } from '../components/WhatSalviaIs';
import { DayWithSalvia } from '../components/DayWithSalvia';
import { ProductSection } from '../components/ProductSection';
import { BentoReinvented } from '../components/BentoReinvented';
import { ScribeVsSalvia } from '../components/ScribeVsSalvia';
import { DomainSection } from '../components/DomainSection';
import { FrameworksRail } from '../components/FrameworksRail';
import { ROICalculator } from '../components/ROICalculator';
import { LabTeaser } from '../components/LabTeaser';
import { Footer } from '../components/Footer';

export const LandingPage = () => {
  return (
    <>
      <SEO
        title="AI Clinical Documentation & Compliance Software for India"
        description="Salvia is an AI documentation and compliance suite for Indian clinics, nursing homes and hospitals. Doctors speak in any Indian language; out comes a structured clinical note, drug register, consent and incident records — audit-ready by default."
        path="/"
        keywords={['NABH compliance software', 'AI medical scribe India', 'clinical documentation software India', 'ABDM compliant software', 'drug register software', 'CGHS empanelment software', 'audit-ready clinical notes']}
      />
      <Header />
      <main style={{ flex: 1, zIndex: 10 }}>
        {/* Hook */}
        <Hero />
        {/* Problem */}
        <PainSection />
        {/* What it is — a compliance suite, not a scribe */}
        <WhatSalviaIs />
        {/* How it works — voice note in, locked record out */}
        <DayWithSalvia />
        {/* The product — three engines */}
        <ProductSection />
        {/* The output — records an assessor can read */}
        <BentoReinvented />
        {/* Why it beats a generic scribe */}
        <ScribeVsSalvia />
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
