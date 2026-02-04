import { ServicesHero } from "@/components/services/services-hero";
import { ServiceSplitSection } from "@/components/services/service-split-section";
import { WorkingProcess } from "@/components/services/working-process";
import { FaqsSection } from "@/components/services/faqs-section";
import { ContactSection } from "@/components/home/contact-section";
import { servicesContent } from "@/utils/content";

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      {/* Dynamic Rendering of Services Sections */}
      {servicesContent.sections.map((section) => (
        <ServiceSplitSection key={section.id} {...section} />
      ))}
      <WorkingProcess />
      <FaqsSection />
      <ContactSection />
    </>
  );
}