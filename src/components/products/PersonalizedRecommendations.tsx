"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { useExperience } from "@/lib/experience/ExperienceContext";
import { ASHREN_PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { WeatherLottie } from "@/components/weather/WeatherLottie";

export function PersonalizedRecommendations() {
  const { userContext, experience } = useExperience();

  // Filter products matching active weather condition or fallback
  const weatherMatched = ASHREN_PRODUCTS.filter((p) =>
    p.weatherMatch.includes(userContext.weather.condition as any)
  );

  const recommended = weatherMatched.length >= 3 ? weatherMatched : ASHREN_PRODUCTS.slice(0, 4);
  const cityName = userContext.location.city || "Jaipur";

  return (
    <section className="py-20 bg-white/[0.009] border-t border-white/6 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Location & Weather Context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.25em] mb-2 text-dark_teal">
              <WeatherLottie condition={userContext.weather.condition} className="w-5 h-5" />
              <span>Location & Ambient Algorithmic Curation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Calibrated for {cityName}
            </h2>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs font-sans font-semibold px-3 py-1.5 rounded-full bg-[#12141a] border border-white/10 text-white inline-block shadow-sm">
              {userContext.weather.temperature}°C • {experience.sourceName}
            </span>
            <p className="text-xs text-white/65 mt-1">
              Curated hardware matched to current Indian meteorological variables
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommended.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              badge={`Optimal in ${experience.sourceName}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
