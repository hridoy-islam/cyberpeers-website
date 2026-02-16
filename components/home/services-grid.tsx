"use client";

import { useRef, useLayoutEffect } from "react";
import { homeContent } from "@/utils/content";
import { ArrowUpRight, Zap, Layers, BarChart3, Globe, Palette } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { cn } from "@/utils/utils";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Icon mapping
const icons = [Zap, Layers, BarChart3, Globe, Palette];

export function ServicesGrid() {
  const { title, subtitle, services } = homeContent.typesOfServices;
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered Fade-in for Grid Items
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1, // distinct delay between cards
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%", // starts animating when top of grid hits 80% of viewport
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-white py-24 lg:py-32 overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10  mx-auto">
        
        {/* --- HEADER --- */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-6">
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm">
            <span className="flex h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
            WHAT WE DO
          </div>
          <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter  leading-[1.1]">
            {title}
          </h2>
          <p className="font-medium text-lg  leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, idx) => {
            const IconComponent = icons[idx % icons.length];

            return (
              <div 
                key={idx} 
                className="group relative flex flex-col p-8 bg-neutral-50 rounded-3xl border border-neutral-100 hover:border-neutral-200 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1"
              >
                {/* Icon Box */}
                <div className="w-14 h-14 mb-8 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 shadow-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors duration-300">
                  <IconComponent size={24} strokeWidth={1.5} />
                </div>

                <div className="mb-4">
                   <h3 className="font-bold text-2xl  tracking-tight mb-2">
                    {service.title}
                   </h3>
                   {/* Divider Line that expands on hover */}
                   <div className="h-0.5 w-12 bg-neutral-200 group-hover:w-full group-hover:bg-primary/20 transition-all duration-500 ease-out" />
                </div>

                <p className="leading-relaxed font-medium mb-8 flex-grow">
                  {service.description}
                </p>

                {/* Bottom Action Link */}
                <div className="mt-auto pt-6 border-t border-neutral-200/50 flex items-center justify-between">
                  <span className="text-sm font-semibold text-neutral-900">
                    Learn more
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover:text-primary group-hover:border-primary transition-all">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}