"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/utils";
import { Megaphone, Code, Paintbrush, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ICON_MAP = {
  marketing: Megaphone,
  development: Code,
  design: Paintbrush,
};

// Interface reflecting the data structure in utils/content.ts
interface ServiceSectionProps {
  id: string;
  iconId: string;
  title: string;
  description1: string;
  description2: string;
  lists: string[][];
  buttonText: string;
  image: string;
  imagePosition?: string;
  bgColor?: string;
}

export function ServiceSplitSection(props: ServiceSectionProps) {
  // Safe cast for icon key
  const Icon = ICON_MAP[props.iconId as keyof typeof ICON_MAP] || Code;
  const isDark = props.bgColor === "dark";
  
  return (
    <div 
      id={props.id}
      className={cn("py-24 md:py-36 overflow-hidden", isDark ? "bg-[#060a11]" : "bg-white")}
    >
      <div className="container px-4">
        <div className={cn(
          "grid lg:grid-cols-2 gap-16 lg:gap-24 items-center",
        )}>
          {/* CONTENT SIDE */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "flex flex-col space-y-8", 
                props.imagePosition === "left" ? "lg:order-2" : "lg:order-1"
            )}
          >
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Icon className="text-primary w-7 h-7" />
              </div>
              <h2 className={cn("text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none", isDark ? "text-white" : "text-slate-900")}>
                {props.title}
              </h2>
            </div>
            
            <article className={cn("space-y-6 md:text-[18px] leading-[1.8] font-medium text-justify", isDark ? "text-slate-300" : "text-slate-900")}>
              <p>{props.description1}</p>
              <p>{props.description2}</p>
            </article>

            {/* List of Services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {props.lists.map((sublist, i) => (
                <ul key={i} className="space-y-4">
                  {sublist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-[-2px] italic">/</span>
                      <span className={cn("text-[14px] font-black uppercase tracking-tight", isDark ? "text-slate-400" : "text-slate-800")}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>

            <div className="pt-6">
              <Link href="/contact">
                <Button variant="brand" size="xl" className="pl-10 pr-3 h-14">
                  {props.buttonText}
                  <span className="ml-5 h-8 w-8 bg-white/20 rounded-full flex items-center justify-center transition-colors">
                     <ArrowUpRight size={18} />
                  </span>
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* IMAGE SIDE */}
          <div className={cn(
            "relative group aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-100 max-w-xl mx-auto w-full border border-white/5",
            props.imagePosition === "left" ? "lg:order-1" : "lg:order-2"
          )}>
              <Image 
                src={props.image} 
                alt={props.title} 
                fill 
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/5" />
          </div>
        </div>
      </div>
    </div>
  );
}