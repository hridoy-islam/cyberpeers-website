"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { homeContent } from "@/utils/content";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { cn } from "@/utils/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ThreeColFeatures() {
  const { title, cards } = homeContent.topMarketingCompany;
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Reveal (Slide Up)
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      // 2. Cards Staggered Entry
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { y: 100, opacity: 0 }, // Start lower
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2, // 0.2s delay between each card
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-slate-50/50 overflow-hidden py-24 lg:py-32">
      
      {/* Decorative Background Blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        
        {/* --- TITLE --- */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-20 md:mb-24">
          <h2 className=" font-bold text-4xl md:text-6xl  tracking-tighter text-slate-900 leading-[1.1]">
            {title}
          </h2>
          <div className="mt-6 h-1.5 w-24 bg-primary rounded-full" />
        </div>

        {/* --- CARDS GRID --- */}
        <div 
          ref={cardsRef} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col items-center text-center p-8 lg:p-10 bg-white rounded-[2.5rem] border border-black/5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2"
            >
              
              {/* Image Area with Inner Glow */}
              <div className="relative mb-8 w-40 h-40 flex items-center justify-center">
                 <div className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
                 
                 {card.image ? (
                    <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
                       <Image 
                           src={card.image} 
                           alt={card.title} 
                           fill 
                           className="object-contain " 
                       />
                    </div>
                 ) : (
                    <div className="w-full h-full bg-slate-100 rounded-full animate-pulse" />
                 )}
              </div>

              {/* Text Content */}
              <h3 className="font-bold text-2xl md:text-4xl mb-4 text-slate-900 tracking-tight leading-tight">
                {card.title}
              </h3>

              <p className="font-medium text-lg leading-[1.7] text-slate-500 mb-8 max-w-xs mx-auto">
                {card.description}
              </p>
              
              {/* Bottom Decoration / Action Hint */}
              <div className="mt-auto opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
                    Explore
                    <ArrowRight size={16} />
                </div>
              </div>

              {/* Subtle Border Gradient on Hover */}
              <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent group-hover:border-primary/10 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}