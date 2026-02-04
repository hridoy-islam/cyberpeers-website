"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";

interface SplitSectionProps {
  pretitle?: string;
  title: string;
  description: string;
  description2?: string;
  description3?: string;
  buttonText: string;
  buttonHref: string;
  image: string;
  imagePosition?: "left" | "right";
}

export function SplitSection({
  pretitle,
  title,
  description,
  description2,
  description3,
  buttonText,
  buttonHref,
  image,
  imagePosition = "right",
}: SplitSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={containerRef} className="bg-white overflow-hidden">
      <div className="container px-4">
        <div 
          className={cn(
            "grid gap-12 lg:grid-cols-2 lg:gap-24 items-center",
          )}
        >
          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: imagePosition === "left" ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className={cn(
              "relative group perspective-1000",
              imagePosition === "left" ? "lg:order-1" : "lg:order-2"
            )}
          >
            <div className="absolute -inset-6 bg-gradient-to-tr from-primary/10 to-sky-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <motion.div 
              style={{ y: imageY }}
              className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full overflow-hidden rounded-[2.5rem] bg-slate-100 border border-slate-100"
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5" />
            </motion.div>
          </motion.div>

          {/* TEXT SIDE */}
          <div className={cn(
            "flex flex-col space-y-6",
            imagePosition === "left" ? "lg:order-2" : "lg:order-1"
          )}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {pretitle && (
                <span className="inline-block py-1.5 px-5 rounded-full bg-primary/10 text-primary text-[11px] font-bold tracking-[2px] uppercase mb-5">
                  {pretitle}
                </span>
              )}

              <h2 className="text-4xl md:text-5xl lg:text-[60px] font-black tracking-tighter text-slate-900 leading-[1.1] mb-8">
                {title}
              </h2>

              <div className="space-y-6 text-[17px] font-medium text-slate-900 leading-[1.8] text-justify">
                <p>{description}</p>
                {description2 && <p>{description2}</p>}
                {description3 && <p>{description3}</p>}
              </div>

              <div className="pt-10">
                <Link href={buttonHref || "/contact"}>
                    <Button variant="brand" size="xl" className="pl-10 pr-3 h-14">
                        {buttonText}
                        <span className="ml-5 h-8 w-8 bg-white/20 rounded-full flex items-center justify-center transition-colors">
                            <ArrowUpRight size={18} />
                        </span>
                    </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}