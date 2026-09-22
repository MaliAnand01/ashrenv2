"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navigation/Navbar";
import { ExperienceHero } from "@/components/hero/ExperienceHero";
import { CreatorReels } from "@/components/reels/CreatorReels";
import { AnimatedCategories } from "@/components/categories/AnimatedCategories";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { TestimonialsMarquee } from "@/components/testimonials/TestimonialsMarquee";
import { CinematicFooter } from "@/components/navigation/CinematicFooter";

// Dynamically import LightRays WebGL shader as full-page background (Client Side Only)
const LightRays = dynamic(() => import("@/components/bg/LightRays"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#07070a] text-white selection:bg-amber-500 selection:text-black overflow-x-hidden">
      
      {/* Fixed LightRays WebGL Shader in Background (Lag-Free & Smooth) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-75 overflow-hidden">
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

      {/* Sticky Glassmorphic Navbar */}
      <Navbar />

      {/* 1. Hero Section (Rock Pedestal + Left-Right Slider) */}
      <div className="relative z-10 bg-transparent">
        <ExperienceHero />
      </div>

      {/* 2. Reels Section (Transparent Background) */}
      <div className="relative z-10 bg-transparent">
        <CreatorReels />
      </div>

      {/* 3. Animated Categories Section (Transparent Background) */}
      <div className="relative z-10 bg-transparent">
        <AnimatedCategories />
      </div>

      {/* 4. Featured Products Section (Transparent Background) */}
      <div className="relative z-10 bg-transparent">
        <FeaturedProducts />
      </div>

      {/* 5. Testimonial Cards 2-Way Animated Marquee (Transparent Background) */}
      <div className="relative z-10 bg-transparent">
        <TestimonialsMarquee />
      </div>

      {/* 6. Cinematic Footer (Transparent Background) */}
      <div className="relative z-10 bg-transparent">
        <CinematicFooter />
      </div>

    </main>
  );
}
