"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { homeContent } from "@/utils/content";
import { motion } from "framer-motion";

export function ImageChecklist() {
  const { title, image, features } = homeContent.goodWebsiteFeatures;

  return (
    <section className="bg-white overflow-hidden">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* IMAGE SIDE */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group perspective-1000 order-last lg:order-first"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-slate-200 to-transparent blur-2xl opacity-50" />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] bg-slate-100 border border-slate-100">
              <Image 
                  src={image} 
                  alt={title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
            </div>
          </motion.div>

          {/* CHECKLIST SIDE */}
          <div className="flex flex-col space-y-10">
            <h2 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[52px] tracking-tighter text-slate-900 leading-[1.1]">
              {title}
            </h2>
            <ul className="grid gap-5">
              {features.map((item, index) => (
                <motion.li 
                  key={item} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 group"
                >
                  <CheckCircle2 className="mt-1 h-6 w-6 text-primary flex-shrink-0" strokeWidth={2.5} />
                  <span className="font-sans font-medium text-[17px] text-slate-600 leading-tight">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}