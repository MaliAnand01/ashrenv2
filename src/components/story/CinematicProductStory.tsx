"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight, Layers } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { ASHREN_PRODUCTS } from "@/data/products";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STORY_CHAPTERS = [
  {
    step: "01",
    subtitle: "AEROSPACE MONOLITH",
    title: "Carbon Fiber 4K Aerial Systems Engineered for Indian Skies",
    description: "Every millimeter of the Phantom 4K airframe is CNC machined from multi-layered carbon fiber composites. Tri-directional stabilization computes 4,000 spatial corrections per second, achieving unwavering stability even in 54 km/h desert gales across Rajasthan and Ladakh.",
    badge: "Aerospace Robotics • Made in India",
    spec1: "1-inch 20MP Sensor",
    spec2: "42-Min Endurance",
    spec3: "Level 7 Gale Resistance",
    productImage: "/products/drone-hero.png",
    productId: "prod-01",
    accentColor: "#07393c",
    ambientGlow: "rgba(144, 221, 240, 0.25)",
  },
  {
    step: "02",
    subtitle: "JAIPUR ROYAL GUILD",
    title: "Four Centuries of Kundan & Jadau Heritage",
    description: "Certified 22K Hallmarked gold set with uncut natural Polki diamonds and untreated Russian emerald beads. Handcrafted by 4th-generation artisan lineages in historic Jaipur, accompanied by BIS authentication for India's premier bridal boutiques.",
    badge: "Jaipur Atelier • 22K Hallmarked",
    spec1: "22K BIS Hallmarked",
    spec2: "Uncut Polki Diamonds",
    spec3: "Natural Russian Emeralds",
    productImage: "/products/jewellery-hero.png",
    productId: "prod-05",
    accentColor: "#b18534",
    ambientGlow: "rgba(235, 195, 100, 0.25)",
  },
  {
    step: "03",
    subtitle: "HALL-EFFECT MASTERY",
    title: "Zero-Drift Magnetic Precision for Indian Esports",
    description: "Contactless Hall-Effect sensors eliminate mechanical friction across 10 million cycles. Coupled with 1000Hz ultra-low latency wireless polling, engineered for elite competitive gaming lounges and tournament athletes across Bengaluru and Mumbai.",
    badge: "Tournament Grade • Zero-Drift",
    spec1: "Hall-Effect Sticks",
    spec2: "< 1.2ms Latency",
    spec3: "Tri-Mode Wireless 2.4G",
    productImage: "/products/controller-transparent.png",
    productId: "prod-02",
    accentColor: "#2c666e",
    ambientGlow: "rgba(44, 102, 110, 0.22)",
  },
];

export function CinematicProductStory() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const productImageRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const { setWhatsAppOrderProduct } = useStore();

  const chapter = STORY_CHAPTERS[activeStep];
  const activeProduct = ASHREN_PRODUCTS.find((p) => p.id === chapter.productId) || ASHREN_PRODUCTS[0];

  useEffect(() => {
    if (!containerRef.current || !productImageRef.current || !textBlockRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        productImageRef.current,
        { scale: 0.93, opacity: 0.4, y: 25 },
        { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      gsap.fromTo(
        textBlockRef.current,
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.65, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeStep]);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative py-24 bg-white/[0.012] border-t border-white/6 overflow-hidden"
    >
      {/* Dynamic Background Atmospheric Glow */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000"
        style={{ background: chapter.ambientGlow }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2 text-stormy_teal text-xs font-sans font-bold uppercase tracking-[0.25em] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineering & Heritage Dissection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              The Architecture of Ashren
            </h2>
          </div>

          {/* Chapter Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 sm:mt-0">
            {STORY_CHAPTERS.map((ch, idx) => (
              <button
                key={ch.step}
                onClick={() => setActiveStep(idx)}
                className={`px-4 py-2 rounded-full text-xs font-sans transition-all ${
                  activeStep === idx
                    ? "bg-dark_teal text-white font-bold shadow-sm"
                    : "bg-[#12141a] text-white/65 hover:text-white border border-white/8 shadow-sm"
                }`}
              >
                0{idx + 1} {ch.subtitle}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Stage (Apple-Style Soft Container) */}
        <div className="rounded-apple-3xl bg-[#12141a] border border-white/8 shadow-apple-card p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Narrative Block */}
          <div ref={textBlockRef} className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.042] border border-white/8 text-xs font-sans text-dark_teal font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>{chapter.badge}</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              {chapter.title}
            </h3>

            <p className="text-sm sm:text-base text-white/65 font-normal leading-relaxed">
              {chapter.description}
            </p>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-white/[0.03] border border-white/8 p-3 rounded-apple-xl">
                <span className="text-[10px] uppercase font-sans font-semibold text-white/55 block">
                  Core Metric
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-1 block">
                  {chapter.spec1}
                </span>
              </div>
              <div className="bg-white/[0.03] border border-white/8 p-3 rounded-apple-xl">
                <span className="text-[10px] uppercase font-sans font-semibold text-white/55 block">
                  Tolerance
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-1 block">
                  {chapter.spec2}
                </span>
              </div>
              <div className="bg-white/[0.03] border border-white/8 p-3 rounded-apple-xl">
                <span className="text-[10px] uppercase font-sans font-semibold text-white/55 block">
                  Standard
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-1 block">
                  {chapter.spec3}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Ordering */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => setWhatsAppOrderProduct(activeProduct)}
                className="px-6 py-3.5 rounded-full bg-dark_teal hover:bg-stormy_teal text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-apple-soft"
              >
                <span>Inquire Wholesale Allotment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-white/65 font-mono">
                SKU: {activeProduct.sku}
              </span>
            </div>
          </div>

          {/* Right Floating Product Hero with Clean Dimension */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[360px] sm:min-h-[440px]">
            {/* Soft Concentric Ring */}
            <div className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-white/8 pointer-events-none" />

            {/* Real Ashren Staged Asset */}
            <div
              ref={productImageRef}
              className="relative w-full max-w-[460px] h-[340px] sm:h-[400px] flex items-center justify-center"
            >
              <Image
                src={chapter.productImage}
                alt={chapter.title}
                width={520}
                height={520}
                className="object-contain max-h-full drop-shadow-[0_20px_40px_rgba(7,57,60,0.2)]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
