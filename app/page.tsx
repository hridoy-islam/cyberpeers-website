import { homeContent } from "@/utils/content";
import { Hero } from "@/components/home/hero";
import { SplitSection } from "@/components/home/split-section";
import { DarkTextSection } from "@/components/home/dark-text-section";
import { ThreeColFeatures } from "@/components/home/three-col-features";
import { ImageChecklist } from "@/components/home/image-checklist";
import { DualChecklist } from "@/components/home/dual-checklist";
import { Cta } from "@/components/home/cta";
import { ContactSection } from "@/components/home/contact-section"; 
import SmoothScroll from "@/components/shared/smooth-scroll";
import { ServicesMarquee } from "@/components/home/services-marquee";
import { MouseFollower } from "@/components/shared/mouse-follower";

export default function Home() {
  return (
    <SmoothScroll>
      <MouseFollower />
      <main className="flex flex-col min-h-screen">
        <Hero />
        <SplitSection {...homeContent.analytics} imagePosition="right" />
        <SplitSection {...homeContent.whyCyberpeers} imagePosition="left" />
        <DarkTextSection {...homeContent.websiteDesignGrowth} />
        <ImageChecklist />
        <DarkTextSection {...homeContent.seoAgency} />
        <DualChecklist />
        <ThreeColFeatures />
        <ServicesMarquee />
        <Cta />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}