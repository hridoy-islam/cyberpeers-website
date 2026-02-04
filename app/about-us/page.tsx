import { AboutHero } from "@/components/about/about-hero";
import { AboutCompanyIntro } from "@/components/about/about-company-intro";
import { AboutStrategiesCta } from "@/components/about/about-strategies-cta";
import { AboutFeaturesGrid } from "@/components/about/about-features-grid";
import { ContactSection } from "@/components/home/contact-section";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutCompanyIntro />
      <AboutStrategiesCta />
      <AboutFeaturesGrid />
      <ContactSection />
    </>
  );
}