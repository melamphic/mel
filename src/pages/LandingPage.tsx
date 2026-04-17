import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ProductSection } from '../components/ProductSection';
import { GovernanceLoop } from '../components/GovernanceLoop';
import { PipelineSection } from '../components/PipelineSection';
import { BridgeSection } from '../components/BridgeSection';
import { PainSection } from '../components/PainSection';
import { DomainSection } from '../components/DomainSection';
import { Footer } from '../components/Footer';

export const LandingPage = () => {
  return (
    <>
      <Header />
      <main style={{ flex: 1, zIndex: 10 }}>
        <Hero />
        <PainSection />
        <ProductSection />
        <GovernanceLoop />
        <BridgeSection />
        <PipelineSection />
        <DomainSection />
      </main>
      <Footer />
    </>
  );
};
