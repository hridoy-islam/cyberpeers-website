"use client";

import React from "react";
import { careerContent } from "@/utils/content";
import { ChevronDown, Filter } from "lucide-react";

interface JobFiltersProps {
  onFilterChange: (filters: { category: string; type: string; location: string }) => void;
}

export function JobFilters({ onFilterChange }: JobFiltersProps) {
  const { categories, types, locations } = careerContent.filters;
  
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedType, setSelectedType] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");

  // Notify parent component when any filter changes
  React.useEffect(() => {
    onFilterChange({
      category: selectedCategory,
      type: selectedType,
      location: selectedLocation,
    });
  }, [selectedCategory, selectedType, selectedLocation, onFilterChange]);

  const selectClasses = "w-full appearance-none rounded-2xl border border-input bg-background py-3 pl-4 pr-10 text-[13px] font-bold text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer";

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 py-8 mb-10 border-y border-slate-100">
      <div className="flex items-center gap-2 text-slate-400 mr-2 shrink-0">
        <Filter size={18} />
        <span className="text-xs font-bold uppercase tracking-widest">Filters</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        {/* Category Filter */}
        <div className="relative">
          <select
            className={selectClasses}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">{categories[0]}</option>
            {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Type Filter */}
        <div className="relative">
          <select
            className={selectClasses}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">{types[0]}</option>
            {types.slice(1).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Location Filter */}
        <div className="relative">
          <select
            className={selectClasses}
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">{locations[0]}</option>
            {locations.slice(1).map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}