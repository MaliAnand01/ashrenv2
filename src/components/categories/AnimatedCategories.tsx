"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Smartphone, Gem, Scissors } from "lucide-react";

export const CATEGORIES_SHOWCASE = [
  {
    id: "gadgets",
    title: "Tech & Gadgets",
    slug: "gadgets",
    tagline: "Smart Audio, Watches & Controllers",
    count: "4 Products",
    image: "/products/hero-asset-6.png",
    alt: "Smart Audio Glasses and Tech",
    icon: Smartphone,
    description:
      "Bluetooth 5.3 smart sunglasses, ANC studio headphones, mechanical self-winding watches, and magnetic Hall-effect controllers.",
    href: "/shop?category=Tech+%26+Gadgets",
  },
  {
    id: "jewellery",
    title: "Royalty Jewellery",
    slug: "jewellery",
    tagline: "Jaipur 22K Gold & Real Uncut Polki",
    count: "2 Masterpieces",
    image: "/products/hero-asset-4.png",
    alt: "22K Kundan Polki Choker Necklace",
    icon: Gem,
    description:
      "Handmade by hereditary master goldsmiths in Jaipur using BIS hallmarked 22K pure gold, natural emeralds, and real polki diamonds.",
    href: "/shop?category=Royalty+Jewellery",
  },
  {
    id: "clothing",
    title: "Haute Clothing",
    slug: "clothing",
    tagline: "Pure Varanasi Silk Bridal Couture",
    count: "1 Exclusive Piece",
    image: "/products/hero-asset-2.png",
    alt: "Pure Silk Heavy Zardozi Anarkali",
    icon: Scissors,
    description:
      "Pure Katan handloom silk with hand-done silver zari thread embroidery and custom sizing for weddings and festivals.",
    href: "/shop?category=Haute+Clothing",
  },
];

export function AnimatedCategories() {
  return (
    <section className="py-16 sm:py-24 bg-[#0a090c] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold block mb-2">
              Browse Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Three Pillars of Ashren
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mt-2 md:mt-0 font-normal">
            Carefully curated categories combining centuries-old Indian artisan heritage with modern technology.
          </p>
        </div>

        {/* 3 Animated Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES_SHOWCASE.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-amber-400/40 p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 shadow-lg"
              >
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />

                {/* Card Top: Category Icon & Item Count */}
                <div className="flex items-center justify-between relative z-10 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-white/60 uppercase">
                    {cat.count}
                  </span>
                </div>

                {/* Card Center: Product Silhouette Image */}
                <div className="relative w-full h-52 sm:h-56 flex items-center justify-center my-2 z-10">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    width={260}
                    height={260}
                    className="object-contain max-h-48 w-auto drop-shadow-xl group-hover:scale-108 transition-transform duration-500"
                  />
                </div>

                {/* Card Bottom: Title, Description, and Link */}
                <div className="relative z-10 pt-4 space-y-2 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {cat.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-white/65 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
