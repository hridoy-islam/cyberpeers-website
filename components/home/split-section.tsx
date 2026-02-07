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
  

  

  return (
    <section ref={containerRef} className="overflow-hidden py-24 lg:py-32 bg-background relative">
      <div className="container ">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          
          {/* --- IMAGE SIDE --- */}
          <motion.div
          
            className={cn(
              "relative group",
              imagePosition === "left" ? "lg:order-1" : "lg:order-2"
            )}
          >
            {/* Decorative Gradient Blob behind image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-violet-400/20 rounded-[3rem] blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }} // smooth ease
              viewport={{ once: true, margin: "-100px" }}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl shadow-black/5 bg-slate-100"
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Inner shine effect */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2.5rem]" />
            </motion.div>
          </motion.div>

          {/* --- TEXT SIDE --- */}
          <div
            className={cn(
              "flex flex-col justify-center",
              imagePosition === "left" ? "lg:order-2" : "lg:order-1"
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {pretitle && (
                <div className="flex items-center gap-2 mb-6">
                  <span className="h-[1px] w-8 bg-primary"></span>
                  <span className="text-primary font-bold tracking-[3px] uppercase text-sm">
                    {pretitle}
                  </span>
                </div>
              )}

              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.05] mb-8">
                {title}
              </h2>

              <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                <p>{description}</p>
                {description2 && <p>{description2}</p>}
                {description3 && <p>{description3}</p>}
              </div>

              <div className="pt-10">
                <Link href={buttonHref || "/contact"}>
                  <Button 
                    size="xl" 
                    className="relative overflow-hidden rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg group pl-8 pr-6 h-14 text-lg font-semibold
                    after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:transition-transform after:duration-500 hover:after:translate-x-[150%]"
                  >
                    <span>{buttonText}</span>
                    <span className="ml-3 bg-white/20 rounded-full p-1 transition-transform group-hover:rotate-45">
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