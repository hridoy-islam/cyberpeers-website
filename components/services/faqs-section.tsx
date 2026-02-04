"use client";

import React from "react";
import Image from "next/image";
import { servicesContent } from "@/utils/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqsSection() {
  const { pretitle, title, image, items } = servicesContent.faqs;

  return (
    <section className="bg-slate-50">
      <div className="container px-4">
        <div className="max-w-3xl mb-16">
          <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-[12px] font-black uppercase tracking-[2px] mb-4">
            {pretitle}
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-none">
            {title}<span className="text-primary">.</span>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="relative aspect-square w-full rounded-[3rem] overflow-hidden border border-slate-200 shadow-xl shadow-slate-200">
            <Image src={image} alt="FAQ Visual" fill className="object-cover" />
          </div>

          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-slate-200">
                <AccordionTrigger className="text-lg md:text-xl font-bold text-slate-900 hover:text-primary hover:no-underline text-left py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-[17px] leading-relaxed text-slate-600 pb-6 text-justify">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}