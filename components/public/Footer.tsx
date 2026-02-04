"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/utils/site-data";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1120] text-white pt-20 pb-10 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" className="block relative h-12 w-48">
              {/* Ensure image exists in /public */}
              <Image
                src="/cyberpeers.png"
                alt="Cyberpeers Logo"
                fill
                className="object-contain object-left brightness-0 invert" 
                priority
              />
            </Link>
            <p className="text-white text-[15px] leading-relaxed font-medium pr-4 opacity-90">
              {siteConfig.description}
            </p>
            
            <div className="space-y-5">
              <h4 className="text-white text-lg font-black tracking-tight uppercase italic">
                Follow Us On
              </h4>
              <div className="flex gap-4">
                {siteConfig.socials.map((social, i) => (
                  <Link 
                    key={i} 
                    href={social.href}
                    target="_blank"
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all hover:bg-primary hover:border-primary hover:scale-110"
                  >
                    <social.icon size={18} className="text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {siteConfig.footerNav.map((section) => (
            <div key={section.title} className="space-y-8 lg:pl-8">
              <h4 className="text-primary text-xl font-black uppercase tracking-tight">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-3 text-white transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center transition-colors group-hover:bg-primary">
                        <ArrowRight size={10} className="text-primary group-hover:text-white" />
                      </div>
                      <span className="font-bold text-[15px] uppercase tracking-wide transition-transform group-hover:translate-x-1">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info Column */}
          <div className="space-y-8">
            <h4 className="text-primary text-xl font-black uppercase tracking-tight">
              Get In Touch
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-4 group">
                <div className="mt-1 w-10 h-10 shrink-0 border border-white/10 flex items-center justify-center rounded-xl group-hover:bg-primary group-hover:border-primary transition-all">
                   <MapPin size={20} className="text-primary group-hover:text-white" />
                </div>
                <div>
                   <p className="text-white font-black mb-1 uppercase tracking-widest text-[10px] opacity-70">Location</p>
                   <span className="text-[14px] font-bold text-white">{siteConfig.address}</span>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="mt-1 w-10 h-10 shrink-0 border border-white/10 flex items-center justify-center rounded-xl group-hover:bg-primary group-hover:border-primary transition-all">
                   <Phone size={20} className="text-primary group-hover:text-white" />
                </div>
                <div>
                   <p className="text-white font-black mb-1 uppercase tracking-widest text-[10px] opacity-70">Phone</p>
                   <span className="text-[14px] font-bold text-white">{siteConfig.phone}</span>
                </div>
              </li>
              <li className="flex gap-4 group">
                <div className="mt-1 w-10 h-10 shrink-0 border border-white/10 flex items-center justify-center rounded-xl group-hover:bg-primary group-hover:border-primary transition-all">
                   <Mail size={20} className="text-primary group-hover:text-white" />
                </div>
                <div>
                   <p className="text-white font-black mb-1 uppercase tracking-widest text-[10px] opacity-70">Email</p>
                   <span className="text-[14px] font-bold text-white">{siteConfig.email}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 pt-10 border-t border-white/10 text-center">
          <p className="text-[14px] font-bold text-white tracking-wide uppercase italic opacity-60">
            &copy; {currentYear} All Rights Reserved By Zuhayr Consultancy Limited T/A Cyberpeers
          </p>
        </div>
      </div>
    </footer>
  );
}