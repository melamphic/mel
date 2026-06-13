import { SEO } from '../components/SEO';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { WhatSalviaIs } from '../components/WhatSalviaIs';
import { PainSection } from '../components/PainSection';
import { DayWithSalvia } from '../components/DayWithSalvia';
import { ProductSection } from '../components/ProductSection';
import { ScribeVsSalvia } from '../components/ScribeVsSalvia';
import { AuditPack } from '../components/AuditPack';
import { BridgeSection } from '../components/BridgeSection';
import { FrameworksRail } from '../components/FrameworksRail';
import { DomainSection } from '../components/DomainSection';
import { FindYourPractice } from '../components/FindYourPractice';
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
        <Hero />
        <WhatSalviaIs />
        <PainSection />
        <DayWithSalvia />
        <ProductSection />
        <ScribeVsSalvia />
        <AuditPack />
        <BridgeSection />
        <FrameworksRail />
        <DomainSection />
        <FindYourPractice />
        <ROICalculator />
        <LabTeaser />
      </main>
      <Footer />
    </>
  );
};
