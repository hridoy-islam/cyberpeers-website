"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
  backgroundImage?: string; // Added for better reusability
}

export function DarkTextSection({ 
  title, 
  description, 
  buttonText, 
  buttonHref,
  backgroundImage = '/office.jpg' 
}: DarkTextSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Refined Background Parallax (Smoother scrub)
      gsap.fromTo(bgRef.current, 
        { yPercent: -15, scale: 1.05 },
        {
          yPercent: 15,
          scale: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2, // Adds a slight delay to the scrub for a buttery feel
          },
        }
      );

      // 2. Modern Text Reveal (Slide + Fade + Subtle Scale)
      const animElements = contentRef.current?.children; 
      
      if (animElements) {
        gsap.fromTo(animElements, 
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "expo.out", // Snappier, more premium easing
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%", 
            }
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-32 lg:py-48 flex items-center justify-center bg-[#0a0a0a]">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 h-[130%] -top-[15%] w-full pointer-events-none">
        <div 
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')` }} 
        />
        {/* Refined Overlays for better contrast and vignette effect */}
        <div className="absolute inset-0 bg-neutral-950/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/50 to-neutral-950" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="container relative z-10 ">
        <div 
          ref={contentRef} 
          className="flex flex-col items-center text-center  mx-auto space-y-8"
        >
          
          {/* Title */}
          <h2 className="font-extrabold text-5xl tracking-tight text-white leading-[1.05] drop-shadow-sm">
            {title}
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl leading-relaxed text-white font-normal max-w-4xl mx-auto">
            {description}
          </p>
          
          {/* Button Wrapper */}
          <div className="pt-6">
            {/* Added 'group' class to Link so the icon hover actually works */}
            <Link href={buttonHref || "/contact"} className="group inline-block">
              <Button 
                size="lg" 
                variant={'default'}
                className="rounded-full"
              >
                <span>{buttonText}</span>
                <span className="ml-2 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                   <ArrowRight size={18} strokeWidth={2.5} />
                </span>
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}