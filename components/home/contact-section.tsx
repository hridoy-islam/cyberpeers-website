"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/schemas";
import { homeContent } from "@/utils/content";
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/utils/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Shadcn Select

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const { title: formTitle, form, info } = homeContent.contactSection;
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // Send to admin
      const adminRes = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Send confirmation to user
      const userRes = await fetch("/api/send-email-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (userRes.ok && adminRes.ok) {
        setIsSubmitted(true);
        reset(); // Reset form fields

        // Hide success message after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // GSAP Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Info Side (Left)
      gsap.fromTo(infoRef.current?.children || [],
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // Animate Form Card (Right)
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* --- LEFT SIDE: INFO --- */}
          <div ref={infoRef} className="space-y-10 lg:pt-4">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Contact Us
              </div>
              <h2 className="font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight text-slate-900 leading-[1.1]">
                {info.title}
              </h2>
              <p className="font-medium text-lg leading-relaxed max-w-md">
                {info.description}
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-8 pt-4">
              <ContactItem 
                icon={MapPin} 
                title={info.addressTitle} 
                content={info.address} 
              />
              <ContactItem 
                icon={Phone} 
                title="Phone" 
                content={info.phone} 
                href={`tel:${info.phone}`}
              />
              <ContactItem 
                icon={Mail} 
                title="Email" 
                content={info.email} 
                href={`mailto:${info.email}`}
              />
            </div>
          </div>

          {/* --- RIGHT SIDE: FORM --- */}
          <div 
            ref={formRef}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-100 relative group"
          >
            {/* Success Overlay */}
            {isSubmitted && (
               <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
                  <p className="text-slate-500 mt-2">We will get back to you shortly.</p>
               </div>
            )}

            <div className="mb-8">
               <h3 className="font-bold text-2xl text-slate-900 mb-2">{formTitle}</h3>
               <p className="text-slate-500 text-sm">Fill out the form below and we'll get back to you.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Input 
                    {...register("name")} 
                    placeholder={form.placeholders.name} 
                    className="h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-primary/50 transition-all rounded-xl"
                  />
                  {errors.name && <p className="text-red-500 text-xs pl-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Input 
                    {...register("email")} 
                    placeholder={form.placeholders.email} 
                    className="h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-primary/50 transition-all rounded-xl"
                  />
                  {errors.email && <p className="text-red-500 text-xs pl-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Input 
                  {...register("phone")} 
                  placeholder={form.placeholders.phone} 
                  className="h-12 bg-slate-50 border-slate-100 focus:bg-white focus:border-primary/50 transition-all rounded-xl"
                />
                {errors.phone && <p className="text-red-500 text-xs pl-1">{errors.phone.message}</p>}
              </div>

              {/* SHADCN SELECT INTEGRATION */}
              <div className="space-y-2">
                <Controller
                  control={control}
                  name="service"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <SelectTrigger 
                        className={cn(
                          "h-12 bg-slate-50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all rounded-xl text-slate-600",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <SelectValue placeholder="Select a service..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {form.services.map((s) => (
                          <SelectItem key={s} value={s} className="cursor-pointer">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.service && <p className="text-red-500 text-xs pl-1">{errors.service.message}</p>}
              </div>

              <div className="space-y-2">
                <Textarea 
                  {...register("message")} 
                  placeholder={form.placeholders.message} 
                  className="bg-slate-50 border-slate-100 focus:bg-white focus:border-primary/50 transition-all rounded-xl min-h-[140px] resize-none p-4"
                />
                {errors.message && <p className="text-red-500 text-xs pl-1">{errors.message.message}</p>}
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                size="lg"
                className="w-full h-14 font-semibold text-[15px] group"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {form.buttonText || "Send Message"} 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

// Sub-component for clean code
function ContactItem({ icon: Icon, title, content, href }: { icon: any, title: string, content: string, href?: string }) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper href={href} className={cn("flex items-start gap-5 group", href && "hover:opacity-80 transition-opacity")}>
      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
        <Icon size={22} strokeWidth={2} />
      </div>
      <div className="pt-1">
        <h4 className="font-bold text-lg mb-0.5">{title}</h4>
        <p className="font-medium leading-relaxed text-[16px]">{content}</p>
      </div>
    </Wrapper>
  )
}