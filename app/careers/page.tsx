"use client";

import React from "react";
// FIXED: Importing from utils/content (centralized data)
import { careerContent } from "@/utils/content";
import { CareerHero } from "@/components/careers/career-hero";
import { JobFilters } from "@/components/careers/job-filters";
import { JobListings } from "@/components/careers/job-listings";
import { Cta } from "@/components/home/cta";

export default function CareerPage() {
  const [filteredJobs, setFilteredJobs] = React.useState(careerContent.jobs);

  const handleFilterChange = React.useCallback(
    (filters: { category: string; type: string; location: string }) => {
      let tempJobs = careerContent.jobs;

      if (filters.category && filters.category !== "All Job Category") {
        tempJobs = tempJobs.filter(job => job.category === filters.category);
      }
      if (filters.type && filters.type !== "All Job Type") {
        tempJobs = tempJobs.filter(job => job.jobType === filters.type);
      }
      if (filters.location && filters.location !== "All Job Location") {
        tempJobs = tempJobs.filter(job => job.jobLocation === filters.location);
      }
      setFilteredJobs(tempJobs);
    },
    []
  );

  return (
    <>
      <CareerHero />
      <section className="py-20 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
            <JobFilters onFilterChange={handleFilterChange} />
            {/* Will now show 8 jobs because careerContent.jobs has 8 items */}
            <JobListings jobs={filteredJobs} />
        </div>
      </section>
      <div className="py-20">
         <Cta />
      </div>
    </>
  );
}