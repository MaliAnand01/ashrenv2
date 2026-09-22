"use client";

import React from "react";
import Image from "next/image";
import { ASHREN_CATEGORIES } from "@/data/categories";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function FeaturedCategories() {
  return (
    <section id="categories" className="py-20 bg-white/[0.009] border-t border-white/6 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2 text-stormy_teal text-xs font-sans font-bold uppercase tracking-[0.25em] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curation & Disciplines</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Featured Atelier Disciplines
            </h2>
          </div>
          <p className="text-sm text-white/65 max-w-md mt-3 md:mt-0 font-normal">
            Precision engineering across aerospace robotics, studio acoustic chambers, esports hardware, and royal Jaipur heritage heirlooms.
          </p>
        </div>

        {/* Editorial Asymmetrical Grid (Apple-Style Soft Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {ASHREN_CATEGORIES.map((cat, idx) => {
            const isLarge = cat.gridSpan === "large";
            const colSpan = isLarge ? "md:col-span-8" : "md:col-span-4";

            return (
              <div
                key={cat.id}
                className={`${colSpan} group relative min-h-[360px] sm:min-h-[420px] rounded-apple-3xl overflow-hidden bg-[#12141a] border border-white/8 hover:border-dark_teal/30 shadow-apple-card hover:shadow-apple-elevated transition-all duration-500 p-8 flex flex-col justify-between cursor-pointer`}
              >
                {/* Background Ambient Glow on Hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 75% 35%, rgba(144, 221, 240, 0.25) 0%, transparent 70%)`,
                  }}
                />

                {/* Real Ashren Category Transparent Hero Asset */}
                <div className="absolute right-[-6%] bottom-[-8%] w-[65%] sm:w-[58%] h-[75%] pointer-events-none transition-transform duration-700 ease-out group-hover:scale-108 group-hover:-translate-y-3">
                  <Image
                    src={cat.featuredImage}
                    alt={cat.name}
                    fill
                    className="object-contain drop-shadow-[0_15px_30px_rgba(7,57,60,0.18)]"
                  />
                </div>

                {/* Top Info */}
                <div className="relative z-10 flex items-start justify-between">
                  <span className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-white/65">
                    Series 0{idx + 1} • {cat.itemCount} SKUs
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/8 flex items-center justify-center text-white group-hover:bg-dark_teal group-hover:text-white group-hover:border-dark_teal transition-all duration-300 shadow-sm">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Bottom Title & Tagline */}
                <div className="relative z-10 max-w-sm">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-dark_teal transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/65 font-normal line-clamp-2">
                    {cat.tagline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
