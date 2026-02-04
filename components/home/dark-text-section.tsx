"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Only register plugin once in a client component
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.fromTo(bgRef.current, 
            { yPercent: -15, scale: 1.1 },
            {
              yPercent: 10,
              scale: 1, 
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                scrub: true, 
              },
            }
          );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#0c1222]">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80')` }} 
        />
        <div className="absolute inset-0 bg-[#0e1629]/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1629] via-transparent to-[#0e1629]" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full max-w-7xl mb-10"
          >
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[60px] tracking-tighter text-white leading-[1.15]">
              {title}
            </h2>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             viewport={{ once: true }}
             className="w-full max-w-5xl" 
          > 
            <p className="font-sans font-medium text-[17px] md:text-[18px] leading-[1.8] text-white text-justify antialiased opacity-90">
              {description}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-14"
          >
            <Link href={buttonHref || "/contact"}>
              <Button size="xl" className="bg-primary hover:bg-white hover:text-primary rounded-full font-black uppercase tracking-widest text-[13px] h-16 pl-10 pr-3">
                 {buttonText}
                 <span className="ml-5 h-10 w-10 bg-white/20 rounded-full flex items-center justify-center transition-transform group-hover:rotate-45">
                    <ArrowUpRight size={20} />
                </span>
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}