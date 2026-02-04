"use client";

import Link from "next/link";
import { homeContent } from "@/utils/content";
import { Button } from "@/components/ui/button";

export function Cta() {
  const { title, subtitle, buttonText, buttonHref } = homeContent.finalCta;

  return (
    <section className="bg-white">
      <div className="container text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">{title}</h2>
        <p className="text-lg md:text-xl font-medium text-slate-500 mb-10">{subtitle}</p>
        <div>
          <Link href={buttonHref}>
            <Button variant="brand" size="xl">
                {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}