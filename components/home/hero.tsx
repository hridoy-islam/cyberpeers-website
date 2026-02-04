"use client";

import Link from "next/link";
import Image from "next/image";
import { homeContent } from "@/utils/content";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { title, subtitle, buttonText, buttonHref, image } = homeContent.hero;
  
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -50]);

  return (
    <section ref={ref} className="relative min-h-[95vh] w-full flex items-center justify-center overflow-hidden">
      
      {/* Parallax Image Layer */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
            {/* Note: Ensure hero-placeholder-img.jpg is in /public */}
            <Image 
            src={image} 
            alt="Hero Background" 
            fill 
            className="object-cover brightness-[0.45]" 
            priority
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </motion.div>

      {/* Content Layer */}
      <motion.div 
        style={{ opacity: contentOpacity, y: contentY }} 
        className="container relative z-10 px-4 text-center mt-20"
      >
        <div className="max-w-[1100px] mx-auto space-y-8">
          
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-primary font-bold tracking-[5px] uppercase text-[16px] md:text-[20px] mb-6"
          >
            WELCOME TO CYBERPEERS
          </motion.span>

          {/* Render Title - Handles splitting words manually if needed or dynamic */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-8"
          >
             Build <span className="text-primary">Anything</span> You Want
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="max-w-[800px] mx-auto text-lg md:text-[20px] text-white font-medium uppercase leading-relaxed mb-10"
          >
            {subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
          >
            <Link href={buttonHref}>
                <Button size="xl" className="bg-primary hover:bg-white hover:text-primary transition-all font-bold text-lg rounded-full h-16 pl-10 pr-4">
                    {buttonText}
                    <span className="ml-4 h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                        <ArrowUpRight size={20} />
                    </span>
                </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Curved Bottom Edge */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px] fill-background">
          <path d="M0,0 C300,130 900,130 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}