"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { homeContent } from "@/utils/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { cn } from "@/utils/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ImageChecklist() {
  const { title, image, features } = homeContent.goodWebsiteFeatures;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Image Reveal (Scale + Fade)
      gsap.fromTo(imageRef.current,
        { scale: 0.9, opacity: 0, x: -50 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );

      // 2. Title Slide Up
      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );

      // 3. List Items Stagger (Cascade)
      if (listRef.current) {
        gsap.fromTo(listRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1, // Delay between each item
            ease: "back.out(1.7)", // Slight bounce for premium feel
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%",
            }
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="overflow-hidden py-24 lg:py-32">
      <div className="container ">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- IMAGE SIDE --- */}
          <div className="relative lg:order-1">
            {/* Decorative Back Glow */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl opacity-0 lg:opacity-100 transition-opacity duration-1000" />
            
            <div 
              ref={imageRef}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-2xl shadow-slate-200/50"
            >
              <Image 
                src={image} 
                alt={title} 
                fill 
                className="object-cover transition-transform duration-1000 hover:scale-105" 
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* --- CHECKLIST SIDE --- */}
          <div className="flex flex-col justify-center lg:order-2">
            
            {/* Heading Group */}
            <div ref={textRef} className="mb-12">
              <h2 className="font-bold text-4xl  tracking-tighter text-foreground leading-[1.1] mb-6">
                {title}
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full" />
            </div>

            {/* Structured List */}
            <ul ref={listRef} className="flex flex-col ">
              {features.map((item, index) => (
                <li 
                  key={index} 
                  className="group flex items-start gap-5 p-4 rounded-2xl transition-colors hover:bg-slate-50/80 cursor-pointer border border-transparent hover:border-slate-100"
                >
                  <div className="mt-1 flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <CheckCircle2 className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
                  </div>
                  
                  <span className="text-lg font-medium text-slate-700 leading-relaxed pt-0.5 group-hover:text-slate-900 transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            
          </div>

        </div>
      </div>
    </section>
  );
}