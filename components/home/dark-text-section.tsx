"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { cn } from "@/utils/utils";

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DarkTextSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export function DarkTextSection({ title, description, buttonText, buttonHref }: DarkTextSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Background Parallax (Cinematic Slow Movement)
      gsap.fromTo(bgRef.current, 
        { yPercent: -10, scale: 1.1 },
        {
          yPercent: 10,
          scale: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true, 
          },
        }
      );

      // 2. Text Reveal Animation (Staggered Slide Up)
      const animElements = contentRef.current?.children; // Selects h2, p, button-wrapper
      
      if (animElements) {
        gsap.fromTo(animElements, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%", // Starts when section is 75% down viewport
            }
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-32 lg:py-48 flex items-center justify-center">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 h-[120%] -top-[10%] w-full pointer-events-none">
        <div 
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/office.jpg')` }} 
        />
        {/* Dark Overlays for Text Readability */}
        <div className="absolute inset-0 bg-black/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-[#0e1629]" />
        <div className="absolute inset-0 bg-black/40" /> {/* Extra dimming */}
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="container relative z-10 ">
        <div 
          ref={contentRef} 
          className="flex flex-col items-center text-center max-w-6xl mx-auto space-y-10"
        >
          
          {/* Title */}
          <h2 className="font-bold text-4xl lg:text-6xl tracking-tighter text-white leading-[1.1] drop-shadow-2xl">
            {title}
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl leading-[1.8] text-slate-300 font-medium mx-auto opacity-90">
            {description}
          </p>
          
          {/* Button Wrapper */}
          <div className="pt-4">
            <Link href={buttonHref || "/contact"}>
              <Button 
                size="xl" 
                
              >
                <span>{buttonText}</span>
                <span className="ml-4 h-10 w-10 bg-black/10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110">
                   <ArrowUpRight size={20} />
                </span>
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}