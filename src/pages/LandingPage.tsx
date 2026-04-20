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
import { LabTeaser } from '../components/LabTeaser';
import { Footer } from '../components/Footer';

export const LandingPage = () => {
  return (
    <>
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
        <LabTeaser />
      </main>
      <Footer />
    </>
  );
};
