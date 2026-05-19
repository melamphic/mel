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
import { ROICalculator } from '../components/ROICalculator';
import { LabTeaser } from '../components/LabTeaser';
import { Footer } from '../components/Footer';

export const LandingPage = () => {
  return (
    <>
      <SEO
        title="Clinical Governance Automation"
        description="Salvia is a compliance and governance suite for vet, dental, and clinical practices. Voice note after each consult — audit-ready records, controlled drug logs, and incident trails out the other side."
        path="/"
        keywords={['veterinary compliance software', 'clinical documentation AI', 'dental charting compliance', 'CMA veterinary compliance', 'controlled drug records', 'audit-ready clinical notes']}
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
        <ROICalculator />
        <LabTeaser />
      </main>
      <Footer />
    </>
  );
};
