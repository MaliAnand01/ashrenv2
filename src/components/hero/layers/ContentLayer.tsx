"use client";

import React from "react";
import Link from "next/link";
import { useExperience } from "@/lib/experience/ExperienceContext";
import { useStore } from "@/context/StoreContext";
import { ASHREN_PRODUCTS } from "@/data/products";
import { WeatherLottie } from "@/components/weather/WeatherLottie";
import { ArrowRight, MessageCircle, Truck, Sparkles, CheckCircle } from "lucide-react";
import { formatINR } from "@/lib/utils";

export function ContentLayer() {
  const { experience, userContext } = useExperience();
  const { setWhatsAppOrderProduct } = useStore();

  const product =
    ASHREN_PRODUCTS.find((p) => p.slug === experience.featuredProductSlug) ||
    ASHREN_PRODUCTS[0];

  const cityName = userContext.location.city || "Jaipur";
  const pincode = userContext.location.pincode || "302001";
  const condition = userContext.weather.condition;

  return (
    <div className="flex flex-col justify-center space-y-6 z-[10]">
      
      {/* Contextual Weather / Occasion Experience Pill with Live Lottie Animation */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#12141a]/90 border border-white/10 shadow-sm text-xs font-sans text-white">
          <WeatherLottie condition={condition} className="w-5 h-5" />
          <span className="font-semibold text-dark_teal">{experience.theme.badgeLabel}</span>
          {experience.theme.badgeSublabel && (
            <>
              <span className="text-onyx-300">•</span>
              <span className="text-white/65 text-[11px] font-normal">{experience.theme.badgeSublabel}</span>
            </>
          )}
        </div>

        {/* Indian Dispatch & Delivery City Context (Blinkit/Amazon Principle) */}
        <div className="inline-flex items-center gap-1.5 text-[11px] font-sans text-white/65 bg-white/[0.042] border border-white/8 px-3.5 py-1.5 rounded-full">
          <Truck className="w-3.5 h-3.5 text-dark_teal" />
          <span>Dispatch to {cityName} ({pincode})</span>
        </div>
      </div>

      {/* Editorial Category Tag & Huge Headline */}
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-stormy_teal block font-sans">
          {experience.heroContent.editorialTag}
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]">
          {experience.heroContent.headline}
        </h1>
      </div>

      {/* Dynamic Contextual Copy */}
      <p className="text-base sm:text-lg text-white/65 font-normal leading-relaxed max-w-xl">
        {experience.heroContent.subheadline}
      </p>

      {/* Staged Product & Wholesale Lot Info */}
      <div className="pt-3 border-t border-white/8 flex flex-wrap items-center gap-6 text-xs text-white/65">
        <div>
          <span className="text-white/55 uppercase tracking-wider block text-[10px] font-sans font-semibold">
            Featured Masterwork
          </span>
          <span className="font-semibold text-white text-sm">
            {product.name}
          </span>
        </div>
        <div className="border-l border-white/8 pl-6">
          <span className="text-white/55 uppercase tracking-wider block text-[10px] font-sans font-semibold">
            Wholesale Allotment (MOQ {product.wholesaleMOQ})
          </span>
          <span className="font-mono text-dark_teal text-sm font-bold">
            {formatINR(product.wholesalePrice)} / unit
          </span>
        </div>
      </div>

      {/* Primary & Secondary Call to Actions */}
      <div className="pt-3 flex flex-wrap items-center gap-4">
        <a
          href="#categories"
          className="px-8 py-4 rounded-full bg-dark_teal hover:bg-stormy_teal text-white font-semibold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-apple-soft hover:shadow-apple-elevated flex items-center gap-3 group"
        >
          <span>{experience.heroContent.ctaText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>

        <button
          onClick={() => setWhatsAppOrderProduct(product)}
          className="px-8 py-4 rounded-full bg-white/[0.054] hover:bg-white/[0.1] text-white border border-white/10 font-semibold text-xs uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>{experience.heroContent.secondaryCtaText}</span>
        </button>
      </div>

    </div>
  );
}
