"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { ASHREN_PRODUCTS, Product } from "@/data/products";
import { ASHREN_CATEGORIES } from "@/data/categories";
import { Search, X, TrendingUp, Clock, ArrowUpRight, Sparkles } from "lucide-react";
import { formatINR } from "@/lib/utils";

const RECENT_SEARCHES = [
  "Phantom 4K Drone",
  "Hall-Effect Controller",
  "22K Kundan Choker",
  "Zardozi Silk Anarkali",
];

const TRENDING_KEYWORDS = [
  "Aerospace Drone",
  "Beryllium Headphones",
  "Esports Controller",
  "Bridal Heritage",
  "Action Camera 4K",
];

export function SearchDrawer() {
  const { searchOpen, setSearchOpen, setQuickViewProduct, setWhatsAppOrderProduct } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSearchOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  const filteredProducts: Product[] = query.trim()
    ? ASHREN_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-[#060709]/95 backdrop-blur-3xl flex flex-col justify-start animate-fade-in text-white">
      {/* Top Search Input Bar */}
      <div className="border-b border-white/10 px-6 sm:px-12 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <Search className="w-6 h-6 text-gold-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search wholesale catalog, SKUs, drones, couture, acoustics..."
              className="w-full bg-transparent text-xl sm:text-2xl font-light tracking-wide focus:outline-none placeholder:text-white/30 text-white"
            />
          </div>
          <button
            onClick={() => setSearchOpen(false)}
            className="p-3 rounded-full hover:bg-[#12141a]/10 text-white/60 hover:text-white transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Search Panel Body */}
      <div className="max-w-5xl mx-auto w-full px-6 sm:px-12 py-10 flex-1 overflow-y-auto">
        {query.trim().length > 0 ? (
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-white/50">
                Found {filteredProducts.length} results for &ldquo;{query}&rdquo;
              </span>
              <span className="text-xs text-gold-400/80 font-mono">Wholesale Direct Catalog</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg text-white/60">No wholesale items match your query.</p>
                <p className="text-sm text-white/40 mt-1">
                  Try searching by category such as &ldquo;Drones&rdquo;, &ldquo;Acoustics&rdquo;, or &ldquo;Jewellery&rdquo;.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#12141a]/[0.03] border border-white/[0.08] hover:border-gold-500/40 rounded-xl p-4 flex flex-col group transition-all"
                  >
                    <div className="relative w-full h-44 rounded-lg overflow-hidden bg-black/40 mb-3 flex items-center justify-center">
                      <Image
                        src={product.heroImage}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider bg-black/70 border border-white/10 text-white/80">
                        {product.sku}
                      </span>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold mb-1">
                      {product.brand}
                    </span>
                    <h4 className="text-sm font-medium text-white line-clamp-1 mb-2">
                      {product.name}
                    </h4>

                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <div>
                        <span className="text-xs text-white/40 block">Wholesale (MOQ {product.wholesaleMOQ})</span>
                        <span className="text-sm font-semibold text-white">
                          {formatINR(product.wholesalePrice)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSearchOpen(false);
                            setQuickViewProduct(product);
                          }}
                          className="px-2.5 py-1 text-xs rounded bg-[#12141a]/10 hover:bg-[#12141a]/20 text-white transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => {
                            setSearchOpen(false);
                            setWhatsAppOrderProduct(product);
                          }}
                          className="px-2.5 py-1 text-xs rounded bg-emerald-600/90 hover:bg-emerald-500 text-white font-medium transition-colors"
                        >
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Recent Searches */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 mb-4">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>Recent Searches</span>
              </div>
              <div className="flex flex-col space-y-2.5">
                {RECENT_SEARCHES.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="text-left text-sm text-white/70 hover:text-gold-300 py-1 flex items-center justify-between group transition-colors"
                  >
                    <span>{item}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-gold-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Keywords */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 mb-4">
                <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                <span>Trending Now</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING_KEYWORDS.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setQuery(kw)}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#12141a]/[0.04] border border-white/10 hover:border-gold-500/40 hover:bg-gold-500/10 hover:text-gold-300 transition-all text-white/80"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            {/* Curated Categories */}
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Featured Atelier Collections</span>
              </div>
              <div className="space-y-2">
                {ASHREN_CATEGORIES.slice(0, 4).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setQuery(cat.name)}
                    className="w-full text-left p-2.5 rounded-lg bg-[#12141a]/[0.02] hover:bg-[#12141a]/[0.06] border border-white/[0.06] flex items-center justify-between transition-colors group"
                  >
                    <div>
                      <span className="text-xs font-medium text-white group-hover:text-gold-300">
                        {cat.name}
                      </span>
                      <span className="text-[10px] text-white/40 block">
                        {cat.itemCount} wholesale lots
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-gold-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
