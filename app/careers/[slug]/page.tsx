import { careerContent } from "@/utils/content";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// 1. Static Params Generation (SEO & Performance)
export async function generateStaticParams() {
  return careerContent.jobs.map((job) => ({
    slug: job.slug,
  }));
}

// 2. SEO Metadata Generation
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const job = careerContent.jobs.find((j) => j.slug === params.slug);
  if (!job) return { title: "Job Not Found" };
  
  return {
    title: `${job.title} | Careers`,
    description: job.jobdescription.substring(0, 150) + "...",
  };
}

// 3. Page Component (Exact Structure You Provided)
export default async function JobDetailPage({ params }: { params: { slug: string } }) {
    
  const { slug } = await params;
  
  const job = careerContent.jobs.find((j) => j.slug === slug);

  if (!job) notFound();

  return (
    <article className="pt-28 md:pt-36 pb-20 bg-white min-h-screen">
      <div className="container max-w-4xl px-6">
        
        <Link href="/careers" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary mb-8 text-[13px] font-medium transition-colors">
          <ArrowLeft size={14} /> Back to careers
        </Link>

        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {job.title}
          </h1>
          
          <div className="space-y-2.5">
            <div className="text-[12px] font-black tracking-[0.5px] uppercase flex gap-2">
              <span className="text-slate-900 w-32">Job Category:</span> 
              <span className="text-slate-900">{job.category}</span>
            </div>
            <div className="text-[12px] font-black tracking-[0.5px] uppercase flex gap-2">
              <span className="text-slate-900 w-32">Job Type:</span> 
              <span className="text-slate-900">{job.jobType}</span>
            </div>
            <div className="text-[12px] font-black tracking-[0.5px] uppercase flex gap-2">
              <span className="text-slate-900 w-32">Job Location:</span> 
              <span className="text-slate-900">{job.jobLocation}</span>
            </div>
          </div>
          
          <div className="mt-10 w-full h-px bg-slate-100" />
        </header>

        <div className="space-y-12">
          
          {/* About Section */}
          <div className="mt-8">
            <h2 className="text-[20px] font-bold text-slate-900 mb-5">About Cyberpeers</h2>
            <p className="text-[17px] leading-[1.7] text-slate-900 font-normal">
              {job.jobdescription}
            </p>
          </div>

          {/* Essential Skills */}
          <div>
            <h2 className="text-[20px] font-bold text-slate-900 mb-6 uppercase tracking-tighter">Essential Skills & Competencies</h2>
            <div className="space-y-10">
              {job.skillSections?.map((section, idx) => (
                <div key={idx} className="space-y-5">
                  <h3 className="text-lg font-bold text-slate-800">{section.heading}</h3>
                  <ul className="space-y-3.5">
                    {section.points.map((point, pIdx) => (
                      <li key={pIdx} className="text-[16px] text-slate-900 flex gap-4"> 
                        <span className="text-slate-400 font-light">—</span>
                        <span className="flex-1 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <h2 className="text-[20px] font-bold text-slate-900 mb-5 uppercase tracking-tighter">Qualifications</h2>
            <ul className="space-y-3.5">
              {job.qualification.map((q, i) => (
                <li key={i} className="text-[16px] text-slate-900 flex gap-4">
                  <span className="text-slate-400 font-light">—</span>
                  <span className="flex-1">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preferred Experience (Render only if exists and length > 0) */}
          {job.experience && job.experience.length > 0 && (
            <div>
              <h2 className="text-[20px] font-bold text-slate-900 mb-5 uppercase tracking-tighter">Preferred / Desirable Experience</h2>
              <ul className="space-y-3.5">
                {job.experience.map((e, i) => (
                  <li key={i} className="text-[16px] text-slate-900 flex gap-4"> 
                    <span className="text-slate-300 font-light">—</span>
                    <span className="flex-1">{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          <div>
            <h2 className="text-[20px] font-bold text-slate-900 mb-5 uppercase tracking-tighter">What We Offer</h2>
            <ul className="space-y-3.5">
              {job.weOffer.map((item, i) => (
                <li key={i} className="text-[16px] text-slate-900 flex gap-4">
                  <span className="text-slate-300 font-light">—</span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Button */}
          <div className="pt-8">
            <a 
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 px-9 items-center justify-center bg-[#101a2e] text-white font-bold text-[13px] rounded-md transition-all hover:bg-black active:scale-95"
            >
              Apply Now
            </a>
          </div>

        </div>
      </div>
    </article>
  );
}