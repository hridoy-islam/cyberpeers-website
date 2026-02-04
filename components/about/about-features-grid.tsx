"use client";
import { aboutContent } from "@/utils/content";
import { motion } from "framer-motion";

export function AboutFeaturesGrid() {
  const { pretitle, title, items } = aboutContent.teamFeatures;

  return (
    <section className="bg-background">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-24">
          <span className="inline-block py-1.5 px-5 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-[2px] uppercase mb-4">{pretitle}</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">{title}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {items.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-10 bg-slate-50 border border-slate-100 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:border-primary/20 transition-all group"
            >
              <div className="w-16 h-16 mb-8 rounded-2xl bg-white border border-slate-100 flex items-center justify-center transition-colors group-hover:bg-primary">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">{feature.title}</h3>
              <p className="text-slate-700 font-medium leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}