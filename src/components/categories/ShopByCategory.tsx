"use client";

import React, { useState } from "react";
import { ASHREN_PRODUCTS } from "@/data/products";
import { ProductCard } from "../products/ProductCard";
import { LayoutGrid, Check } from "lucide-react";

export function ShopByCategory() {
  const [activeCategory, setActiveCategory] = useState<string>("All Categories");

  const categories = [
    "All Categories",
    "Drones & Robotics",
    "Studio Acoustics",
    "Next-Gen Gaming",
    "Fine Jewellery",
    "Heritage Couture",
    "Cinematic Optics",
  ];

  const displayedProducts =
    activeCategory === "All Categories"
      ? ASHREN_PRODUCTS
      : ASHREN_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="shop" className="py-20 bg-[#12141a] border-t border-white/6 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2 text-stormy_teal text-xs font-sans font-bold uppercase tracking-[0.25em] mb-2">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Full Atelier Index</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Shop by Category
            </h2>
          </div>
          <span className="text-xs font-sans font-medium text-white/65">
            Showing {displayedProducts.length} Wholesale Master Models
          </span>
        </div>

        {/* Category Pill Selectors */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all flex items-center gap-1.5 ${
                activeCategory === cat
                  ? "bg-dark_teal text-white font-bold shadow-sm"
                  : "bg-white/[0.042] text-white/65 hover:text-white hover:bg-white/[0.1] border border-white/6"
              }`}
            >
              {activeCategory === cat && <Check className="w-3 h-3 text-white" />}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
