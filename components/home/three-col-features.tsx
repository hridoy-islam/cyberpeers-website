"use client";

import Image from "next/image";
import { homeContent } from "@/utils/content";
import { motion, Variants } from "framer-motion";

export function ThreeColFeatures() {
  const { title, cards } = homeContent.topMarketingCompany;

  // Staggered Flip In
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      rotateX: -30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0, 
      transition: { 
        duration: 0.7, 
        ease: "easeOut"
      } 
    },
  };

  return (
    <section className="bg-white overflow-hidden">
      <div className="container px-4">
        
        {/* Main Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center text-center mb-20"
        >
          <h2 className="max-w-4xl font-extrabold text-4xl md:text-5xl lg:text-[60px] tracking-tighter text-slate-900 leading-[1.15]">
            {title}
          </h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {cards.map((card, idx) => (
            <motion.div key={idx} className="perspective-1000">
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }} 
                className="group relative flex flex-col items-center text-center p-8 bg-white rounded-[2.5rem] border border-slate-100/80 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.03)] transition-all h-full"
              >
                {/* Image Area */}
                <div className="relative mb-6 w-32 h-32 flex items-center justify-center">
                    {/* Add fallback div in case image missing during dev */}
                   {card.image ? (
                        <div className="relative w-full h-full">
                           <Image 
                               src={card.image} 
                               alt={card.title} 
                               fill 
                               className="object-contain" 
                           />
                        </div>
                   ) : (
                        <div className="w-full h-full bg-slate-100 rounded-full" />
                   )}
                </div>

                <h3 className="font-bold text-xl md:text-2xl mb-4 text-slate-900 tracking-tight">
                  {card.title}
                </h3>

                <p className="font-medium text-[15px] leading-relaxed text-slate-500 mb-6">
                  {card.description}
                </p>
                
                <div className="mt-auto w-10 h-1 rounded-full bg-slate-100 group-hover:bg-primary transition-colors" />

              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}