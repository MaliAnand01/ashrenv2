"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ExperienceHero } from "@/components/hero/ExperienceHero";
import { BodyWeatherAtmosphere } from "@/components/weather/BodyWeatherAtmosphere";
import { FeaturedCategories } from "@/components/categories/FeaturedCategories";
import { TrendingProducts } from "@/components/products/TrendingProducts";
import { CinematicProductStory } from "@/components/story/CinematicProductStory";
import { ShopByCategory } from "@/components/categories/ShopByCategory";
import { CreatorReels } from "@/components/reels/CreatorReels";
import { NewArrivals } from "@/components/products/NewArrivals";
import { PersonalizedRecommendations } from "@/components/products/PersonalizedRecommendations";
import { BestSellers } from "@/components/products/BestSellers";
import { LimitedDeals } from "@/components/products/LimitedDeals";
import { BrandValues } from "@/components/story/BrandValues";
import { RecentlyViewed } from "@/components/products/RecentlyViewed";
import { TrustSection } from "@/components/story/TrustSection";
import { FinalCTA } from "@/components/story/FinalCTA";

// Dynamically import Galaxy WebGL shader background (Client Side Only)
const Galaxy = dynamic(() => import("@/components/bg/Galaxy"), { ssr: false });

export default function HomePage() {
  const [, setActiveSlideIndex] = useState(0);

  return (
    <main className="relative min-h-screen bg-[#0a090c] text-white selection:bg-amber-500 selection:text-black transition-all duration-700">
      
      {/* Fixed Galaxy Shader Canvas in Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-85">
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1}
          glowIntensity={0.35}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.35}
          rotationSpeed={0.08}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
          transparent={false}
          lightMode={false}
        />
      </div>

      {/* Dynamic Ambient Weather Canvas Overlay */}
      <BodyWeatherAtmosphere />

      {/* Sticky Glassmorphic Navbar */}
      <Navbar />

      {/* Hero Region */}
      <div className="relative z-10">
        <ExperienceHero onSlideChange={setActiveSlideIndex} />
      </div>

      {/* Homepage Commerce Sections */}
      <div className="relative z-10 space-y-4">
        <FeaturedCategories />
        <TrendingProducts />
        <CinematicProductStory />
        <ShopByCategory />
        <CreatorReels />
        <NewArrivals />
        <PersonalizedRecommendations />
        <BestSellers />
        <LimitedDeals />
        <BrandValues />
        <RecentlyViewed />
        <TrustSection />
        <FinalCTA />
      </div>

      <Footer />
    </main>
  );
}
