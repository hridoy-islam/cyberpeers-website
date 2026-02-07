"use client";

import Marquee from "react-fast-marquee";
import { homeContent } from "@/utils/content";
import { ArrowUpRight, Zap, Layers, BarChart3, Globe, Palette } from "lucide-react";
import { cn } from "@/utils/utils";

// Icon mapping for visual variety (Safe fallback if icon missing)
const icons = [Zap, Layers, BarChart3, Globe, Palette];

export function ServicesMarquee() {
  const { title, subtitle, services } = homeContent.typesOfServices;

  return (
    <section className="relative bg-slate-50/50 py-24 lg:py-32 overflow-hidden">
      
      {/* Premium Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10  mb-16">
        <div className=" mx-auto text-center space-y-6">
          <h2 className="font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tighter text-slate-900 leading-[1.1]">
            {title}
          </h2>
          <p className="font-medium text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {/* --- MARQUEE WRAPPER --- */}
      <div className="relative w-full">
        
        {/* Left Fade Mask (Vignette) */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
        
        {/* Right Fade Mask (Vignette) */}
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-20 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

        <Marquee 
          gradient={false} 
          speed={50} 
          pauseOnHover={true} 
          autoFill={true} // Ensures seamless loop on wide screens
          className="py-4"
        >
          {services.map((service, idx) => {
            // Cycle through icons safely
            const IconComponent = icons[idx % icons.length];

            return (
              <div 
                key={idx} 
                className="group relative w-[350px] md:w-[400px] h-[320px] flex flex-col mx-4 p-8 md:p-10 bg-white rounded-[2.5rem] border border-slate-100/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300  hover:-translate-y-2 hover:border-primary/20 cursor-default"
              >
                {/* Icon Box */}
                <div className="w-14 h-14 mb-6 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                  <IconComponent size={26} strokeWidth={1.5} />
                </div>

                <h3 className="font-bold text-2xl text-slate-900 mb-3 tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-[16px] text-slate-500 leading-relaxed font-medium line-clamp-3">
                  {service.description}
                </p>

                {/* Bottom Action Area */}
                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-75">
                   <span>Learn more</span>
                   <ArrowUpRight size={16} />
                </div>

                {/* Inner Glow on Hover */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}