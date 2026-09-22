"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { ExperienceHero } from "@/components/hero/ExperienceHero";
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

// Dynamically import Prism WebGL shader background (Client Side Only)
const Prism = dynamic(() => import("@/components/bg/Prism"), { ssr: false });

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0a090c] text-white selection:bg-amber-500 selection:text-black transition-all duration-700">
      
      {/* Fixed Prism Shader Canvas in Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-85">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
          transparent={false}
          lightMode={false}
        />
      </div>

      {/* Sticky Glassmorphic Navbar */}
      <Navbar />

      {/* Hero Region */}
      <div className="relative z-10">
        <ExperienceHero />
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
