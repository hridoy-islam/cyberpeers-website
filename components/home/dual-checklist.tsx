"use client";

import { CheckCircle2 } from "lucide-react";
import { homeContent } from "@/utils/content";
import { motion } from "framer-motion";

export function DualChecklist() {
  const { column1, column2 } = homeContent.onSiteSeo;

  return (
    <section className="bg-[#0c1222] overflow-hidden">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-16 lg:gap-x-24">
          {[column1, column2].map((col, idx) => (
            <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
            >
                <h3 className="font-heading font-extrabold text-3xl md:text-4xl text-white tracking-tight leading-tight">
                    {col.title}
                </h3>
                <ul className="grid gap-5">
                {col.features.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                        <CheckCircle2 className="mt-1 h-6 w-6 text-primary flex-shrink-0" strokeWidth={2.5} />
                        <span className="font-sans font-medium text-[17px] text-[#FAFAFA]">
                            {item}
                        </span>
                    </li>
                ))}
                </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}