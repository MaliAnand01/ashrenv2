"use client";

import React, { useState } from "react";
import { ASHREN_PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Flame } from "lucide-react";

export function TrendingProducts() {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");

  const categories = ["ALL", "Drones & Robotics", "Studio Acoustics", "Next-Gen Gaming", "Fine Jewellery"];

  const trendingList = ASHREN_PRODUCTS.filter(
    (p) => p.isTrending || p.isBestSeller
  );

  const filtered = selectedFilter === "ALL"
    ? trendingList
    : trendingList.filter((p) => p.category === selectedFilter);

  return (
    <section id="trending" className="py-20 bg-[#12141a] border-t border-white/6 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-rose-600 text-xs font-sans font-bold uppercase tracking-[0.25em] mb-2">
              <Flame className="w-3.5 h-3.5 fill-rose-600" />
              <span>Real-Time Wholesale Velocity across India</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Trending Atelier Masterworks
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-all ${
                  selectedFilter === cat
                    ? "bg-dark_teal text-white shadow-sm"
                    : "bg-white/[0.042] text-white/65 hover:text-white hover:bg-white/[0.1] border border-white/6"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              badge={product.isDeal ? "High Velocity" : "Trending in India"}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
