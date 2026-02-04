"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/schemas";
import { homeContent } from "@/utils/content";
import { motion } from "framer-motion"; 

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  const { title: formTitle, form, info } = homeContent.contactSection;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // API logic will be wired in Module 6
    console.log("Form Data:", data);
    alert("This is a demo. Check console for data.");
    reset();
  };

  return (
    <section className="bg-white border-t border-slate-100"> 
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-start">
          
          {/* FORM */}
          <div className="bg-white p-8 md:p-10 rounded-[1.5rem] shadow-xl shadow-slate-200 border border-slate-100">
            <h2 className="font-heading font-extrabold text-3xl mb-8 text-slate-900 tracking-tight">
                {formTitle}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Input {...register("name")} placeholder={form.placeholders.name} className="h-12 rounded-full px-5 bg-white" />
                  {errors.name && <p className="text-destructive text-xs px-4">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Input {...register("email")} placeholder={form.placeholders.email} className="h-12 rounded-full px-5 bg-white" />
                  {errors.email && <p className="text-destructive text-xs px-4">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Input {...register("phone")} placeholder={form.placeholders.phone} className="h-12 rounded-full px-5 bg-white" />
                {errors.phone && <p className="text-destructive text-xs px-4">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                 {/* Native select for simplicity, can be upgraded to Select later */}
                <div className="relative">
                    <select
                    {...register("service")}
                    className="flex h-12 w-full items-center justify-between rounded-full border border-input bg-background px-5 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none text-slate-600"
                    >
                        <option value="">{form.placeholders.service}</option>
                        {form.services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
                {errors.service && <p className="text-destructive text-xs px-4">{errors.service.message}</p>}
              </div>

              <div className="space-y-2">
                <Textarea {...register("message")} placeholder={form.placeholders.message} className="rounded-[1.5rem] px-5 py-4 min-h-[120px]" />
                {errors.message && <p className="text-destructive text-xs px-4">{errors.message.message}</p>}
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                variant="brand"
                className="w-full sm:w-auto px-12 h-14"
              >
                {isSubmitting ? "Sending..." : form.buttonText.toUpperCase()}
              </Button>
            </form>
          </div>

          {/* INFO */}
          <div className="space-y-8 lg:mt-10">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="space-y-4">
                <h2 className="font-heading font-extrabold text-4xl md:text-[42px] text-slate-900 tracking-tight leading-none">
                  {info.title}
                </h2>
                <p className="font-sans font-medium text-[17px] text-slate-900 leading-relaxed pt-2">
                  {info.description}
                </p>
              </div>

              <div className="space-y-6 pt-10">
                <div>
                    <h3 className="font-heading font-bold text-xl text-slate-900 tracking-wide mb-2">{info.addressTitle}</h3>
                    <p className="font-sans text-[17px] text-slate-900">{info.address}</p>
                </div>
                
                <h3 className="font-sans text-[17px] text-slate-900 leading-relaxed font-normal">
                    <span className="font-bold">Phone :</span> {info.phone}
                </h3>
                
                <h3 className="font-sans text-[17px] text-slate-900 leading-relaxed font-normal">
                    <span className="font-bold">Email :</span> {info.email}
                </h3>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}