"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ASHREN_PRODUCTS, Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { formatINR } from "@/lib/utils";
import { ShoppingBag, MessageCircle, Heart, Check } from "lucide-react";

const CATEGORY_TABS = [
  "All",
  "Tech & Gadgets",
  "Royalty Jewellery",
  "Haute Clothing",
] as const;

export function FeaturedProducts() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart, toggleWishlist, isInWishlist, setWhatsAppOrderProduct } = useStore();

  const filteredProducts =
    selectedCategory === "All"
      ? ASHREN_PRODUCTS
      : ASHREN_PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="shop" className="py-16 sm:py-24 bg-transparent relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold block mb-2">
              Signature Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Creations
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mt-2 md:mt-0 font-normal">
            Handcrafted luxury jewellery from Jaipur, pure Varanasi silk couture, and high-performance smart devices.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedCategory(tab)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all shrink-0 ${
                  isActive
                    ? "bg-amber-500 text-black shadow-md scale-105"
                    : "bg-white/5 hover:bg-white/10 text-white/70 border border-white/10"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const inWishlist = isInWishlist(product.id);
            const isJustAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                className="group relative rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl"
              >
                {/* Top Bar: Category & Wishlist Button */}
                <div className="flex items-center justify-between mb-3 z-10">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-400">
                    {product.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product.id);
                    }}
                    className={`p-2 rounded-full border transition-colors ${
                      inWishlist
                        ? "bg-rose-500/20 border-rose-500 text-rose-400"
                        : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 ${inWishlist ? "fill-rose-500" : ""}`} />
                  </button>
                </div>

                {/* Product Image Stage */}
                <div className="relative w-full h-52 flex items-center justify-center my-3">
                  <Image
                    src={product.heroImage}
                    alt={product.name}
                    width={280}
                    height={280}
                    className="object-contain max-h-48 w-auto group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                  />
                </div>

                {/* Info Block */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-base font-bold font-mono text-white">
                      {formatINR(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs font-mono text-white/40 line-through">
                        {formatINR(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-3">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg font-mono text-xs font-bold transition-all active:scale-95 ${
                        isJustAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setWhatsAppOrderProduct(product)}
                      className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold shadow-sm transition-all active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-black" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* View All in Shop Button */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-widest font-semibold transition-all hover:border-amber-400"
          >
            <span>Explore All 7 Products in Shop</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
