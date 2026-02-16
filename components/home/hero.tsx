"use client";

import Link from "next/link";
import Image from "next/image";
import { homeContent } from "@/utils/content";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const SLIDES = [
  { id: 1, src: "/hero-1.jpg", alt: "Hero Background 1" },
  { id: 2, src: "/hero-2.jpg", alt: "Hero Background 2" },
  { id: 3, src: "/hero-3.jpg", alt: "Hero Background 3" },
];

export function Hero() {
  const { title, subtitle, buttonText, buttonHref } = homeContent.hero;

  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // 2. Faster text fade: Content disappears quickly so it doesn't overlap header
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[115vh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Layer */}
      <motion.div
        style={{ y: backgroundY }}
      
        className="absolute inset-0 z-0 h-[120%] w-full top-[-10%]"
      >
        <div className="relative w-full h-full" ref={emblaRef}>
          <div className="flex h-full">
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className="relative flex-[0_0_100%] h-full min-w-0"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover brightness-[0.45]"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content Layer */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="container relative z-10 text-center max-w-5xl "
      >
        <div className="space-y-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-2xl text-primary font-bold tracking-[5px] uppercase mb-6"
          >
            WELCOME TO CYBERPEERS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white text-5xl md:text-6xl  font-black leading-[0.95] mb-8"
          >
            Build <span className="text-primary">Anything</span> You Want
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className=" mx-auto text-lg md:text-xl text-white font-medium uppercase leading-relaxed mb-10"
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
              <Button
                size="xl"
              >
                {buttonText}
                <span className="ml-8 h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                  <ArrowUpRight size={20} />
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Curved Bottom Edge 
          z-20 ensures this stays ON TOP of the background image as it moves 
      */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-20">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[100px] fill-background"
        >
          <path d="M0,0 C300,130 900,130 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}