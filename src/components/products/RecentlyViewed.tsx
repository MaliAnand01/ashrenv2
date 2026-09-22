"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "./ProductCard";
import { History } from "lucide-react";

export function RecentlyViewed() {
  const { recentlyViewed } = useStore();

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <section className="py-20 bg-white/[0.009] border-t border-white/6 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-2 text-dark_teal text-xs font-sans font-bold uppercase tracking-[0.25em] mb-2">
          <History className="w-3.5 h-3.5" />
          <span>Session Memory</span>
        </div>

        <div className="flex items-baseline justify-between mb-10 pb-4 border-b border-white/8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Recently Viewed by You
          </h2>
          <span className="text-xs font-sans font-medium text-white/65">
            {recentlyViewed.length} Inspected Masterpieces
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyViewed.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
