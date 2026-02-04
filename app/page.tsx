import { homeContent } from "@/utils/content";
import { Hero } from "@/components/home/hero";
import { SplitSection } from "@/components/home/split-section";
import { DarkTextSection } from "@/components/home/dark-text-section";
import { ThreeColFeatures } from "@/components/home/three-col-features";
import { ServicesGrid } from "@/components/home/services-grid";
import { ImageChecklist } from "@/components/home/image-checklist";
import { DualChecklist } from "@/components/home/dual-checklist";
import { Cta } from "@/components/home/cta";
import { ContactSection } from "@/components/home/contact-section"; 

export default function Home() {
  return (
    <>
      <Hero />
      <SplitSection {...homeContent.analytics} imagePosition="right" />
      <SplitSection {...homeContent.whyCyberpeers} imagePosition="left" />
      <DarkTextSection {...homeContent.websiteDesignGrowth} />
      <ImageChecklist />
      <DarkTextSection {...homeContent.seoAgency} />
      <DualChecklist />
      <ThreeColFeatures />
      <ServicesGrid />
      <SplitSection {...homeContent.affordableDesign} imagePosition="right" />
      <Cta />
      <ContactSection />
    </>
  );
}