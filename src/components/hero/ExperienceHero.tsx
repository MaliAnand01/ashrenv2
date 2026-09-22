"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useStore } from "@/context/StoreContext";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ArrowRight,
  Headphones,
  Gem,
  Scissors,
  Smartphone,
  Watch,
  Gamepad2,
  Glasses,
} from "lucide-react";

export interface CategoryHeroSlide {
  id: string;
  categoryName: string;
  categorySlug: string;
  tagline: string;
  icon: React.ElementType;
  productImage: string;
  productAlt: string;
  title: string;
  description: string;
  floatingBadges: { text: string; position: string }[];
  primaryCta: { label: string; action: "whatsapp" | "explore" };
  secondaryCta: { label: string; action: "whatsapp" | "explore" };
  gallery: string[];
}

export const CATEGORY_SLIDES: CategoryHeroSlide[] = [
  {
    id: "gadgets",
    categoryName: "Tech & Gadgets",
    categorySlug: "gadgets",
    tagline: "Next-Gen Audio & Smart Devices",
    icon: Smartphone,
    productImage: "/products/hero-asset-6.png",
    productAlt: "Smart Audio Glasses & Gadgets",
    title: "Smart Audio Glasses & Tech Gear",
    description:
      "Experience high-definition wireless sound, Bluetooth 5.3 connectivity, and UV protection crafted into lightweight smart eyewear.",
    floatingBadges: [
      { text: "Wireless Bluetooth 5.3", position: "-top-3 -left-2 sm:-left-6" },
      { text: "UV400 Polarized Lenses", position: "top-1/3 -right-2 sm:-right-8" },
      { text: "Hands-Free Voice Calls", position: "-bottom-2 left-4" },
    ],
    primaryCta: { label: "Order on WhatsApp", action: "whatsapp" },
    secondaryCta: { label: "Explore Gadgets", action: "explore" },
    gallery: [
      "/products/hero-asset-6.png",
      "/products/hero-asset-3.png",
      "/products/hero-asset-5.png",
      "/products/hero-asset-7.png",
    ],
  },
  {
    id: "jewellery",
    categoryName: "Royalty Jewellery",
    categorySlug: "jewellery",
    tagline: "Handcrafted Kundan & Polki Collections",
    icon: Gem,
    productImage: "/products/hero-asset-4.png",
    productAlt: "22K Kundan Polki Necklace",
    title: "22K Kundan & Polki Gold Heritage",
    description:
      "Handmade by master karigars of Jaipur using hallmarked 22K gold, uncut polki diamonds, and genuine precious emeralds.",
    floatingBadges: [
      { text: "22K Hallmarked Gold", position: "-top-3 -right-2 sm:-right-6" },
      { text: "100% Karigar Handcrafted", position: "bottom-1/3 -left-2 sm:-left-8" },
      { text: "Insured Pan-India Express", position: "-bottom-2 right-4" },
    ],
    primaryCta: { label: "Order on WhatsApp", action: "whatsapp" },
    secondaryCta: { label: "Explore Jewellery", action: "explore" },
    gallery: ["/products/hero-asset-4.png", "/products/hero-asset-1.png"],
  },
  {
    id: "clothing",
    categoryName: "Haute Clothing",
    categorySlug: "clothing",
    tagline: "Pure Silk & Custom Embroidered Couture",
    icon: Scissors,
    productImage: "/products/hero-asset-2.png",
    productAlt: "Pure Silk Heavy Zardozi Anarkali",
    title: "Bridal Silk Zardozi Anarkalis",
    description:
      "Stitched from pure Varanasi silk with real silver zari thread work and detailed stone embroidery for weddings and celebrations.",
    floatingBadges: [
      { text: "100% Pure Varanasi Silk", position: "-top-3 -left-2 sm:-left-6" },
      { text: "Custom Tailoring Available", position: "top-1/3 -right-2 sm:-right-8" },
      { text: "Real Silver Zari Embroidery", position: "-bottom-2 left-4" },
    ],
    primaryCta: { label: "Order on WhatsApp", action: "whatsapp" },
    secondaryCta: { label: "Explore Clothing", action: "explore" },
    gallery: ["/products/hero-asset-2.png"],
  },
];

interface ExperienceHeroProps {
  onSlideChange?: (index: number) => void;
}

export function ExperienceHero({ onSlideChange }: ExperienceHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const { setConciergeOpen, setSearchOpen } = useStore();

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    if (onSlideChange) {
      onSlideChange(swiper.realIndex);
    }
  };

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <section className="w-full relative overflow-hidden py-4 sm:py-6 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Swiper Container */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={600}
            autoplay={{
              delay: 7000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            className="w-full"
          >
            {CATEGORY_SLIDES.map((slide) => {
              const CategoryIcon = slide.icon;
              return (
                <SwiperSlide key={slide.id}>
                  {/* Transparent Glass Card Container */}
                  <div className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden my-2">
                    
                    {/* Background Radial Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                      
                      {/* Left Side: Title & Description */}
                      <div className="lg:col-span-6 flex flex-col justify-center space-y-4 text-left">
                        {/* Category Label */}
                        <div className="flex items-center gap-2">
                          <div className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5">
                            <CategoryIcon className="w-3.5 h-3.5" />
                            <span>{slide.categoryName}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                          {slide.title}
                        </h1>

                        {/* Description */}
                        <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-lg">
                          {slide.description}
                        </p>

                        {/* 2 CTA Buttons Only */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <button
                            onClick={() => setConciergeOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95"
                          >
                            <MessageCircle className="w-4 h-4 fill-black" />
                            <span>{slide.primaryCta.label}</span>
                          </button>

                          <button
                            onClick={() => setSearchOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs sm:text-sm font-semibold transition-all active:scale-95"
                          >
                            <span>{slide.secondaryCta.label}</span>
                            <ArrowRight className="w-4 h-4 text-amber-400" />
                          </button>
                        </div>
                      </div>

                      {/* Center / Right Side: Centered Product Image with Floating Animated Feature Badges */}
                      <div className="lg:col-span-6 flex items-center justify-center relative min-h-[300px] sm:min-h-[360px]">
                        
                        {/* Ground Contact Glow/Shadow */}
                        <div className="absolute bottom-2 w-64 h-8 bg-amber-500/20 rounded-full blur-xl pointer-events-none" />

                        {/* Centered Product PNG */}
                        <div className="relative z-10 w-full max-w-[320px] sm:max-w-[380px] aspect-square flex items-center justify-center transition-transform duration-500 hover:scale-105">
                          <Image
                            src={slide.productImage}
                            alt={slide.productAlt}
                            width={400}
                            height={400}
                            priority
                            className="object-contain max-h-[260px] sm:max-h-[320px] w-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
                          />
                        </div>

                        {/* Floating Animated Badges Around Product */}
                        {slide.floatingBadges.map((badge, bIdx) => (
                          <div
                            key={bIdx}
                            className={`absolute ${badge.position} z-20 animate-pulse px-3 py-1.5 rounded-xl bg-[#121016]/90 border border-white/20 text-amber-300 text-[11px] font-semibold tracking-wide shadow-xl backdrop-blur-md pointer-events-none`}
                            style={{
                              animationDuration: `${3 + bIdx}s`,
                            }}
                          >
                            {badge.text}
                          </div>
                        ))}

                      </div>

                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Arrows */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all active:scale-95"
            aria-label="Previous Category"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all active:scale-95"
            aria-label="Next Category"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs Indicator at Bottom */}
        <div className="mt-6 grid grid-cols-3 gap-3 max-w-2xl mx-auto">
          {CATEGORY_SLIDES.map((slide, index) => {
            const isActive = activeIndex === index;
            const CategoryIcon = slide.icon;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border transition-all text-xs font-semibold ${
                  isActive
                    ? "bg-amber-500 text-black border-amber-400 shadow-lg scale-105"
                    : "bg-white/5 hover:bg-white/10 border-white/10 text-white/80"
                }`}
              >
                <CategoryIcon className={`w-4 h-4 ${isActive ? "text-black" : "text-amber-400"}`} />
                <span className="truncate">{slide.categoryName}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
