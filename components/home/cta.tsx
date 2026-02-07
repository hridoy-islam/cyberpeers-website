"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { homeContent } from "@/utils/content";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Cta() {
  const { title, subtitle, buttonText, buttonHref } = homeContent.finalCta;
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Background Glow Pulse
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 2. Content Reveal (Scale Up + Fade)
      gsap.fromTo(contentRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative overflow-hidden bg-[#020817] py-24 lg:py-32"
    >
      {/* --- BACKGROUND EFFECTS --- */}
      
      {/* 1. Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* 2. Center Glow (The Spotlight) */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" 
      />

      {/* --- CONTENT --- */}
      <div className="container relative z-10 px-4 md:px-6">
        <div 
          ref={contentRef} 
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          
          {/* Badge / Pill (Optional, adds detail) */}
          <div className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-sm font-medium text-slate-300 backdrop-blur-sm mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Ready to get started?
          </div>

          {/* Title with Gradient */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-6 leading-[1.1]">
            {title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl font-medium text-slate-400 mb-10 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
          
          {/* Button Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href={buttonHref}>
              <Button 
                size="xl" 
              >
                {buttonText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>

          
          </div>

        </div>
      </div>
    </section>
  );
}