"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight, Sparkles } from "lucide-react";

export interface HeroSlideItem {
  id: string;
  categoryName: string;
  watermarkText: string;
  tagline: string;
  productImage: string;
  productAlt: string;
  productId: string;
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
    productId: "prod-06",
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
    productId: "prod-04",
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
    productId: "prod-02",
    description:
      "PURE VARANASI SILK STITCHED WITH HAND ZARDOZI SILVER THREADWORK AND DETAILED EMBROIDERY FOR CELEBRATIONS.",
    badge: "BRIDAL ZARDOZI SUIT",
  },
];

export function ExperienceHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const { setConciergeOpen, setSearchOpen } = useStore();
  const heroRef = useRef<HTMLElement>(null);

  // Mouse Parallax coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  // Continuous auto slide advance every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const currentSlide = HERO_SLIDES[activeIndex];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[92vh] sm:min-h-[860px] bg-transparent overflow-hidden flex flex-col justify-between select-none"
    >
      {/* 1. GIANT WATERMARK SLIDING BACKDROP TEXT WITH MOTION */}
      <div className="absolute inset-0 flex items-center pointer-events-none z-5 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`watermark-${currentSlide.id}`}
            initial={{ opacity: 0, y: direction > 0 ? 30 : -30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: direction > 0 ? -30 : 30, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex items-center justify-center"
          >
            <span className="font-sans font-black uppercase text-[15vw] sm:text-[13vw] tracking-tighter text-white/[0.045] whitespace-nowrap select-none">
              {currentSlide.watermarkText}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. MAIN SLIDING HORIZONTAL STAGE */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center overflow-hidden pt-6 sm:pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center"
          >
            {/* LEFT COLUMN: Subtitle, Tagline & CTAs */}
            <motion.div
              initial={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lg:col-span-3 flex flex-col items-start space-y-4 z-30"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-[10px] font-mono tracking-widest uppercase font-semibold">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{currentSlide.badge}</span>
              </div>

              <span className="text-[12px] sm:text-[13px] font-mono tracking-widest text-amber-100/90 uppercase font-bold leading-relaxed">
                {currentSlide.tagline}
              </span>

              <div className="text-amber-400 font-mono text-sm tracking-widest font-bold flex items-center gap-1">
                <span>&gt;&gt;&gt;&gt;&gt;&gt;&gt;&gt;</span>
              </div>

              {/* Primary & Secondary Luxury Gold CTAs */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start gap-3 pt-2 w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setConciergeOpen(true)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-mono text-xs sm:text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_40px_rgba(245,158,11,0.7)] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>ORDER TODAY</span>
                </motion.button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Link
                    href={`/product/${currentSlide.productId}`}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-amber-500/30 hover:border-amber-400 text-white font-mono text-xs tracking-wider uppercase font-semibold transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>VIEW PIECE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </Link>

                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 transition-colors"
                    title="Search Catalog"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* CENTER COLUMN: FLOATING LEVITATING HERO PRODUCT ASSET */}
            <div className="lg:col-span-6 flex items-center justify-center relative min-h-[380px] sm:min-h-[480px] md:min-h-[540px] z-15">
              {/* Atmospheric Amber Glow Pulse */}
              <motion.div
                animate={{
                  scale: [1, 1.18, 1],
                  opacity: [0.18, 0.32, 0.18],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-80 sm:w-96 md:w-[440px] h-80 sm:h-96 md:h-[440px] rounded-full bg-gradient-to-tr from-amber-500/25 via-gold-400/20 to-amber-600/10 blur-3xl pointer-events-none"
              />

              {/* Interactive 3D Floating Levitation Card */}
              <motion.div
                initial={{
                  scale: 0.88,
                  opacity: 0,
                  y: direction > 0 ? 30 : -30,
                  rotate: direction > 0 ? 2 : -2,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                }}
                exit={{
                  scale: 0.88,
                  opacity: 0,
                  y: direction > 0 ? -30 : 30,
                  rotate: direction > 0 ? -2 : 2,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${
                    -mousePos.y * 12
                  }deg)`,
                }}
                className="relative z-20 w-full max-w-[420px] sm:max-w-[500px] md:max-w-[560px] aspect-square flex items-center justify-center transition-transform duration-200 ease-out"
              >
                {/* Continuous Idle Levitation Float */}
                <motion.div
                  animate={{
                    y: [-8, 8, -8],
                    rotate: [-0.6, 0.6, -0.6],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Link
                    href={`/product/${currentSlide.productId}`}
                    className="relative cursor-pointer group"
                    title={`Explore ${currentSlide.productAlt}`}
                  >
                    <Image
                      src={currentSlide.productImage}
                      alt={currentSlide.productAlt}
                      width={620}
                      height={620}
                      priority
                      className="object-contain max-h-[380px] sm:max-h-[460px] md:max-h-[520px] w-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] filter group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Feature Description */}
            <motion.div
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="lg:col-span-3 flex flex-col items-start lg:items-end text-left lg:text-right space-y-3 z-30"
            >
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest">
                Atelier Provenance
              </span>
              <p className="text-xs font-mono leading-relaxed text-white/85 tracking-wider max-w-xs uppercase">
                {currentSlide.description}
              </p>
              <div className="pt-2 text-[10px] font-mono text-white/50">
                <span>Hand-finished in Jaipur & Bengaluru</span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. BOTTOM CONTROLS: Category List (Left) & Social Indicators (Right) */}
      <div className="relative z-30 max-w-7xl mx-auto w-full px-6 pb-8 sm:pb-12 pt-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        {/* Category Switcher List with Smooth Active Pills */}
        <div className="flex flex-col space-y-2">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={slide.id}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className={`text-left font-mono text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-2.5 py-1 ${
                  isActive
                    ? "text-amber-300 font-black scale-105"
                    : "text-white/40 hover:text-white/80 font-medium"
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="activeHeroCategoryDot"
                    className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b]"
                  />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                )}
                <span>{slide.categoryName}</span>
              </button>
            );
          })}
        </div>

        {/* Social / Atelier Badges */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/70">
          <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-amber-400/50 hover:text-white transition-colors cursor-pointer">
            JAIPUR
          </span>
          <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-amber-400/50 hover:text-white transition-colors cursor-pointer">
            DELHI
          </span>
          <span className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-amber-400/50 hover:text-white transition-colors cursor-pointer">
            MUMBAI
          </span>
        </div>
      </div>

      {/* 4. FOREGROUND NATURAL ROCK PEDESTAL WITH SEAMLESS BLENDING */}
      <div className="absolute -bottom-2 sm:-bottom-4 inset-x-0 z-20 pointer-events-none flex items-end justify-center overflow-hidden">
        <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px]">
          <Image
            src="/rock.png"
            alt="Rock Pedestal Floor"
            fill
            priority
            className="w-full h-full object-cover object-bottom scale-105 filter drop-shadow-[0_-25px_45px_rgba(0,0,0,0.95)]"
          />
          {/* Bottom Gradient Fade: Prevents any sharp cut */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07070a] via-[#07070a]/80 to-transparent" />
          {/* Subtle side vignettes */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#07070a]/60 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#07070a]/60 to-transparent" />
        </div>
      </div>

      {/* 5. SIDE ARROW NAVIGATION (PREV / NEXT) WITH MICRO-ANIMATIONS */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-amber-500 hover:text-black border border-white/15 text-white/80 transition-colors shadow-2xl backdrop-blur-md"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-black/60 hover:bg-amber-500 hover:text-black border border-white/15 text-white/80 transition-colors shadow-2xl backdrop-blur-md"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>
    </section>
  );
}
