"use client";

import { servicesContent } from "@/utils/content";

export function WorkingProcess() {
  const { pretitle, title, steps } = servicesContent.workingProcess;

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
            <span className="inline-block w-fit text-sm font-bold uppercase text-primary bg-white px-4 py-2 rounded-full mb-6">
            {pretitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-12">
                {title}
            </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative p-8 bg-white/10 backdrop-blur-sm rounded-[2rem] border border-white/20 text-center hover:bg-white/20 transition-all group">
              <div className="text-sm font-black opacity-50 mb-4 tracking-widest uppercase text-white/60 group-hover:text-white">
                  0{index + 1}
              </div>
              <h3 className="text-lg font-bold mb-4 leading-tight min-h-[50px]">{step.title.split(' ').slice(2).join(' ')}</h3>
              <p className="text-[15px] font-medium opacity-90 leading-relaxed">{step.description}</p> 
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}