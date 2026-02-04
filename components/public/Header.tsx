"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image"; // Note: Ensure you put cyberpeers.png in /public
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/utils";
import { siteConfig } from "@/utils/site-data";
import { Button } from "@/components/ui/button"; // Using our Shadcn UI Button

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={cn(
        "fixed top-0 z-50 w-full flex justify-center transition-all duration-500 ease-in-out px-4",
        scrolled ? "pt-3" : "pt-5" 
      )}
    >
      <header 
        className={cn(
          "w-full transition-all duration-500 ease-in-out flex flex-col items-center",
          "rounded-full border border-white/40 bg-white/95 backdrop-blur-xl",
          scrolled 
            ? "max-w-[1100px] py-2 shadow-lg border-slate-200/80" 
            : "max-w-[1300px] py-3.5 shadow-xl shadow-slate-200/30" 
        )}
      >
        <div className="container flex items-center justify-between px-8 md:px-12">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="relative block">
              <div className={cn(
                "relative transition-all duration-500",
                scrolled ? "h-8 w-32 md:h-8.5 md:w-36" : "h-9 w-36 md:h-10 md:w-44"
              )}>
                {/* Note: Place 'cyberpeers.png' in the /public folder */}
                <Image
                  src="/cyberpeers.png" 
                  alt="Cyberpeers"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative font-bold uppercase tracking-[1.8px] text-slate-800 transition-colors hover:text-primary",
                  "text-[12px] md:text-[13px]"
                )}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Actions & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden md:block">
               <Button 
                 variant="brand" 
                 className={cn(scrolled ? "h-10 px-6 text-[11px]" : "h-12 px-8 text-[12px]")}
               >
                 Contact Us
               </Button>
            </Link>

            <button 
              className="lg:hidden p-1.5 text-slate-900"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
            <div className="lg:hidden w-full absolute top-full left-0 mt-4 px-4 pb-4">
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex flex-col space-y-4">
                    {siteConfig.navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-slate-900 font-bold uppercase tracking-wider text-sm py-2 border-b border-slate-50 last:border-0"
                    >
                        {item.label}
                    </Link>
                    ))}
                    <div className="pt-2">
                        <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full">
                            <Button variant="brand" className="w-full">Contact Us</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )}
      </header>
    </div>
  );
}