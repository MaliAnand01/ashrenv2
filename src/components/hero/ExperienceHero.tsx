"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useStore } from "@/context/StoreContext";
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight } from "lucide-react";

// Dynamically load LightRays component (Client Side Only)
const LightRays = dynamic(() => import("@/components/bg/LightRays"), {
  ssr: false,
});

export interface HeroSlideItem {
  id: string;
  categoryName: string;
  watermarkText: string;
  tagline: string;
  productImage: string;
  productAlt: string;
  description: string;
  badge: string;
}

export const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: "gadgets",
    categoryName: "TECH & GADGETS",
    watermarkText: "SMART GADGETS",
    tagline: "HARNESS THE POWER OF FUTURE TECH",
    productImage: "/products/hero-asset-6.png",
    productAlt: "Smart Audio Glasses & Gadgets",
    description:
      "HIGH-DEFINITION WIRELESS SOUND, POLARIZED UV PROTECTION, AND BLUETOOTH 5.3 CONNECTIVITY ENGINEERED FOR MODERN LIFE.",
    badge: "SMART AUDIO GEAR",
  },
  {
    id: "jewellery",
    categoryName: "ROYALTY JEWELLERY",
    watermarkText: "PURE KUNDAN",
    tagline: "ROYAL HERITAGE HANDCRAFTED IN JAIPUR",
    productImage: "/products/hero-asset-4.png",
    productAlt: "22K Kundan Polki Necklace",
    description:
      "HANDMADE WITH HALLMARKED 22K GOLD, REAL UNCUT POLKI DIAMONDS AND EMERALDS FOR UNMATCHED ROYALTY.",
    badge: "22K HALLMARKED GOLD",
  },
  {
    id: "clothing",
    categoryName: "HAUTE CLOTHING",
    watermarkText: "PURE SILK",
    tagline: "LUXURY EMBROIDERED BRIDAL COUTURE",
    productImage: "/products/hero-asset-2.png",
    productAlt: "Pure Silk Heavy Zardozi Anarkali",
    description:
      "PURE VARANASI SILK STITCHED WITH HAND ZARDOZI SILVER THREADWORK AND DETAILED EMBROIDERY FOR CELEBRATIONS.",
    badge: "BRIDAL ZARDOZI SUIT",
  },
];

export function ExperienceHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setConciergeOpen, setSearchOpen } = useStore();

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  // Smooth continuous auto slide advance every 6.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-[860px] bg-[#07070a] overflow-hidden flex flex-col justify-between select-none">
      
      {/* 1. BACKGROUND LIGHT RAYS CANVAS */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.55}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.12}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      {/* 2. GIANT WATERMARK SLIDING BACKDROP TEXT */}
      <div className="absolute inset-0 flex items-center pointer-events-none z-5 overflow-hidden">
        <div
          className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {HERO_SLIDES.map((slide) => (
            <div
              key={`watermark-${slide.id}`}
              className="w-full shrink-0 flex-none flex items-center justify-center"
            >
              <span className="font-sans font-black uppercase text-[15vw] sm:text-[13vw] tracking-tighter text-white/[0.045] whitespace-nowrap select-none">
                {slide.watermarkText}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MAIN SLIDING HORIZONTAL STAGE (LEFT-TO-RIGHT SLIDER TRACK) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center overflow-hidden pt-6 sm:pt-10">
        
        <div
          className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isCurrent = activeIndex === idx;
            return (
              <div
                key={slide.id}
                className="w-full shrink-0 flex-none px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center"
              >
                
                {/* LEFT COLUMN: Subtitle & Luxury Gold CTAs */}
                <div
                  className={`lg:col-span-3 flex flex-col items-start space-y-4 z-30 transition-all duration-700 ${
                    isCurrent
                      ? "opacity-100 translate-x-0"
                      : "opacity-40 -translate-x-6"
                  }`}
                >
                  <span className="text-[11px] font-mono tracking-widest text-amber-200/80 uppercase font-semibold">
                    {slide.tagline}
                  </span>

                  <div className="text-amber-400 font-mono text-sm tracking-widest font-bold">
                    {" >>>>>>>>>>"}
                  </div>

                  {/* Primary & Secondary Luxury Gold CTAs */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start gap-3 pt-1">
                    <button
                      onClick={() => setConciergeOpen(true)}
                      className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-mono text-xs sm:text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_40px_rgba(245,158,11,0.7)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-black" />
                      <span>ORDER TODAY</span>
                    </button>

                    <button
                      onClick={() => setSearchOpen(true)}
                      className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-amber-500/30 hover:border-amber-400 text-white font-mono text-xs tracking-wider uppercase font-semibold transition-all active:scale-95 flex items-center gap-2"
                    >
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>

                {/* CENTER COLUMN: EXTRA-LARGE HERO PRODUCT IMAGE */}
                <div className="lg:col-span-6 flex items-center justify-center relative min-h-[380px] sm:min-h-[480px] md:min-h-[540px] z-15">
                  
                  {/* Amber Aura Spotlight Glow */}
                  <div className="absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

                  {/* Large Hero Product Asset */}
                  <div
                    className={`relative z-20 w-full max-w-[420px] sm:max-w-[500px] md:max-w-[560px] aspect-square flex items-center justify-center transition-all duration-700 ${
                      isCurrent
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-40 scale-95 translate-y-4"
                    }`}
                  >
                    <Image
                      src={slide.productImage}
                      alt={slide.productAlt}
                      width={600}
                      height={600}
                      priority
                      className="object-contain max-h-[380px] sm:max-h-[460px] md:max-h-[520px] w-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.85)] filter hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN: Feature Description */}
                <div
                  className={`lg:col-span-3 flex flex-col items-start lg:items-end text-left lg:text-right space-y-3 z-30 transition-all duration-700 ${
                    isCurrent
                      ? "opacity-100 translate-x-0"
                      : "opacity-40 translate-x-6"
                  }`}
                >
                  <p className="text-xs font-mono leading-relaxed text-white/80 tracking-wider max-w-xs uppercase">
                    {slide.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* 4. BOTTOM CONTROLS: Category List (Left) & Social Indicators (Right) */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-6 pb-8 sm:pb-12 pt-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        
        {/* Category Switcher List with Amber Highlights */}
        <div className="flex flex-col space-y-2.5">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={slide.id}
                onClick={() => setActiveIndex(idx)}
                className={`text-left font-mono text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-2.5 ${
                  isActive
                    ? "text-amber-300 font-black scale-105"
                    : "text-white/40 hover:text-white/80 font-medium"
                }`}
              >
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b]" />
                )}
                <span>{slide.categoryName}</span>
              </button>
            );
          })}
        </div>

        {/* Social / Atelier Badges */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/70">
          <span className="px-3.5 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-amber-400/50 transition-colors cursor-pointer">
            FB
          </span>
          <span className="px-3.5 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-amber-400/50 transition-colors cursor-pointer">
            IG
          </span>
          <span className="px-3.5 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-amber-400/50 transition-colors cursor-pointer">
            YT
          </span>
        </div>

      </div>

      {/* 5. FOREGROUND ROCK LANDSCAPE (FULL NATURAL HEIGHT WITH BOTTOM & SIDE BLENDING) */}
      <div className="absolute -bottom-2 sm:-bottom-4 inset-x-0 z-20 pointer-events-none flex items-end justify-center overflow-hidden">
        <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px]">
          <Image
            src="/rock.png"
            alt="Rock Pedestal Floor"
            fill
            priority
            className="w-full h-full object-cover object-bottom scale-105 filter drop-shadow-[0_-25px_45px_rgba(0,0,0,0.95)]"
          />
          {/* Bottom Gradient Fade: Prevents any sharp bottom cut or harsh edge */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07070a] via-[#07070a]/80 to-transparent" />
          {/* Subtle side vignettes to ensure seamless blending on ultra-wide screens */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#07070a]/60 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#07070a]/60 to-transparent" />
        </div>
      </div>

      {/* 6. SIDE ARROW NAVIGATION (PREV / NEXT) */}
      <button
        onClick={handlePrev}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-amber-500 hover:text-black border border-white/15 text-white/80 transition-all duration-200 active:scale-90 shadow-xl backdrop-blur-sm"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-amber-500 hover:text-black border border-white/15 text-white/80 transition-all duration-200 active:scale-90 shadow-xl backdrop-blur-sm"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

    </section>
  );
}
