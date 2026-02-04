"use client";

import { useRef } from "react";
import { homeContent } from "@/utils/content";
import { motion, useScroll, useTransform } from "framer-motion";

export function ServicesGrid() {
  const { title, subtitle, services } = homeContent.typesOfServices;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollContainerRef });

  // Mask effect to fade edges
  const maskImage = useTransform(
    scrollXProgress,
    [0, 0.05, 0.95, 1],
    [
      "linear-gradient(to right, #000 90%, transparent)",
      "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
      "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
      "linear-gradient(to right, transparent, #000 10%)",
    ]
  );
  
  return (
    <section className="bg-slate-50 overflow-hidden">
      <div className="container px-0 md:px-4">
        
        {/* Main Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-20 px-4"
        >
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[60px] tracking-tight text-slate-900 leading-tight mb-6">
            {title}
          </h2>
          <p className="font-sans font-medium text-[17px] text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
        
        {/* Horizontal Scroll Carousel */}
        <div 
          ref={scrollContainerRef} 
          className="horizontal-scrollbar w-full overflow-x-auto pb-12"
        >
          <motion.div
            style={{ maskImage }}
            className="flex w-fit gap-8 px-4 md:px-8 py-4"
          >
            {services.map((service, idx) => (
              <div 
                key={idx} 
                className="group relative flex-shrink-0 w-[340px] md:w-[400px] h-full p-8 md:p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/50 transition-all hover:shadow-2xl hover:border-primary/20"
              >
                {/* Icon Placeholder or dynamic icon mapping could go here */}
                <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-primary/10 mb-8 border border-primary/20 transition-transform group-hover:scale-110">
                  <div className="w-6 h-6 rounded-full bg-primary/80" />
                </div>
                
                <h3 className="font-heading font-bold text-2xl text-slate-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="font-sans text-base text-slate-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}