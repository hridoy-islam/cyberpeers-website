"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { aboutContent } from "@/utils/content";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Safely register scrolltrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutCompanyIntro() {
  const { title, description, buttonText, buttonHref, image } = aboutContent.companyIntro;
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // SEO-Friendly formatted HTML for title
  const formattedTitle = title.replace("Cyberpeers", "<span class='text-primary'>Cyberpeers</span>");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.to(imageRef.current, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: imageRef.current,
                scrub: true,
            },
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-background overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-8"
          >
            <h2 
              className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-slate-900"
              dangerouslySetInnerHTML={{ __html: formattedTitle }} 
            />
            
            <article className="prose prose-lg max-w-none text-slate-800 md:text-lg leading-relaxed text-justify font-medium">
              <p>{description}</p>
            </article>
            
            <div className="pt-4">
              <Link href={buttonHref}>
                <Button variant="brand" size="xl" className="pl-10 pr-3 bg-secondary hover:bg-primary transition-all duration-500">
                    {buttonText}
                    <span className="ml-5 h-8 w-8 bg-white/20 rounded-full flex items-center justify-center transition-transform hover:rotate-45">
                        <ArrowUpRight size={18} />
                    </span>
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="relative group overflow-hidden rounded-[2.5rem]">
            <div ref={imageRef} className="relative aspect-square w-full">
               <div className="relative w-[120%] h-[120%] -left-[10%]">
                    <Image
                        src={image}
                        alt="Cyberpeers Company Overview"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}