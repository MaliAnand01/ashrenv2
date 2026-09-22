"use client";

import React from "react";
import { ASHREN_PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Sparkles } from "lucide-react";

export function NewArrivals() {
  const newArrivals = ASHREN_PRODUCTS.filter((p) => p.isNew || p.stock < 80);

  return (
    <section className="py-20 bg-[#12141a] border-t border-white/6 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-dark_teal text-xs font-sans font-bold uppercase tracking-[0.25em] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fresh Production Batches</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              New Atelier Arrivals
            </h2>
          </div>
          <p className="text-sm text-white/65 max-w-md font-normal">
            Freshly inspected wholesale allotments featuring updated Beryllium acoustic drivers, hallmarking clearances, and calibrated 4K optical assemblies.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} badge="New Release" />
          ))}
        </div>

      </div>
    </section>
  );
}
