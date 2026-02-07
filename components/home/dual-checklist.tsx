"use client";

import { useRef, useLayoutEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { homeContent } from "@/utils/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { cn } from "@/utils/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function DualChecklist() {
  const { column1, column2 } = homeContent.onSiteSeo;
  
  const sectionRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Vertical Divider Growth (Center Line)
      gsap.fromTo(dividerRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );

      // 2. Animate Columns (Staggered List Items)
      [col1Ref, col2Ref].forEach((ref, i) => {
        const title = ref.current?.querySelector("h3");
        const items = ref.current?.querySelectorAll("li");

        if (title && items) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: "top 75%",
            }
          });

          // Title Fade In
          tl.fromTo(title, 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
          );

          // List Items Cascade
          tl.fromTo(items,
            { x: i === 0 ? -20 : 20, opacity: 0 }, // Slide from center outwards
            { 
              x: 0, 
              opacity: 1, 
              duration: 0.5, 
              stagger: 0.08, 
              ease: "power1.out" 
            },
            "-=0.4"
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-black overflow-hidden py-24 lg:py-32"
    >
      {/* --- AMBIENT GLOW BACKGROUND --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 ">
        <div className="relative grid md:grid-cols-2 gap-16 lg:gap-24">
          
          {/* --- VERTICAL DIVIDER (Desktop Only) --- */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent origin-top" ref={dividerRef} />

          {/* --- COLUMN 1 --- */}
          <div ref={col1Ref} className="space-y-10 md:pr-10 lg:pr-14">
            <div className="relative">
              <h3 className="font-bold text-3xl md:text-4xl text-white tracking-tight leading-tight mb-2">
                {column1.title}
              </h3>
              <div className="h-1 w-12 bg-primary rounded-full" />
            </div>

            <ul className="grid gap-6">
              {column1.features.map((item, i) => (
                <ListItem key={i} text={item} />
              ))}
            </ul>
          </div>

          {/* --- COLUMN 2 --- */}
          <div ref={col2Ref} className="space-y-10 md:pl-10 lg:pl-14">
            <div className="relative">
              <h3 className="font-bold text-3xl md:text-4xl text-white tracking-tight leading-tight mb-2">
                {column2.title}
              </h3>
              <div className="h-1 w-12 bg-primary rounded-full" />
            </div>

            <ul className="grid gap-6">
              {column2.features.map((item, i) => (
                <ListItem key={i} text={item} />
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

// --- SUB-COMPONENT FOR LIST ITEMS ---
function ListItem({ text }: { text: string }) {
  return (
    <li className="group flex items-start gap-4 p-3 -mx-3 rounded-xl transition-colors hover:bg-white/5 border border-transparent hover:border-white/5">
      <div className="mt-1 relative flex-shrink-0">
        <div className="absolute inset-0 bg-primary/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CheckCircle2 className="relative h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
      </div>
      
      <span className="font-medium text-lg text-white group-hover:text-slate-100 transition-colors duration-300 leading-snug">
        {text}
      </span>
    </li>
  );
}