"use client";

import Link from "next/link";
import Image from "next/image";
import { aboutContent } from "@/utils/content";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutStrategiesCta() {
  const { pretitle, title, items, buttonText, buttonHref, image } = aboutContent.ctaStrategies;

  return (
    <section className="bg-[#060a11] overflow-hidden py-24 md:py-32">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group rounded-[3rem] overflow-hidden border border-white/10"
          >
            <div className="relative aspect-[4/3] md:aspect-square w-full">
              <Image
                src={image}
                alt="Digital Strategies"
                fill
                className="object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-60"
              />
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          </motion.div>

          {/* Text Side */}
          <div className="flex flex-col space-y-8">
            <span className="w-fit py-1 px-4 rounded-full border border-primary/30 bg-primary/5 text-primary text-[12px] font-bold tracking-[2px] uppercase">
              {pretitle}
            </span>

            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              {title}
            </h2>

            <div className="space-y-10 pt-4">
              {items.map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  className="space-y-2"
                >
                  <h3 className="text-[20px] font-bold text-white tracking-tight italic">
                    {item.heading}
                  </h3>
                  <p className="text-[17px] text-slate-300 font-medium leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="pt-6">
                <Link href={buttonHref}>
                    <Button variant="brand" size="xl" className="pl-10 pr-3">
                        {buttonText}
                        <span className="ml-5 h-8 w-8 bg-white/20 rounded-full flex items-center justify-center transition-colors">
                            <ArrowUpRight size={18} />
                        </span>
                    </Button>
                </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}