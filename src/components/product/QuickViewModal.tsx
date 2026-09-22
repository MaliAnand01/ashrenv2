"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { X, MessageCircle, Star, ShieldCheck, Heart, Sparkles, Check } from "lucide-react";
import { formatINR } from "@/lib/utils";

export function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    setWhatsAppOrderProduct,
    isInWishlist,
    toggleWishlist,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);
  const gallery = quickViewProduct.gallery || [quickViewProduct.heroImage];
  const activeImage = gallery[activeImageIndex] || quickViewProduct.heroImage;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0d0f15] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white transition-colors border border-white/10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto">
          
          {/* Left: Gallery & Zoom Preview */}
          <div className="md:col-span-6 p-6 sm:p-8 bg-[#090b0f] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center p-4">
              <Image
                src={activeImage}
                alt={quickViewProduct.name}
                fill
                className="object-contain transition-all duration-500"
              />
              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/70 border border-white/10 text-white/80">
                {quickViewProduct.sku}
              </span>
            </div>

            {/* Thumbnail Strip */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border transition-all ${
                      activeImageIndex === idx
                        ? "border-gold-400 scale-105"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Detailed Product & Wholesale Spec Content */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-semibold">
                  {quickViewProduct.brand} • {quickViewProduct.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-white/80">
                  <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  <span>{quickViewProduct.rating}</span>
                  <span className="text-white/40">({quickViewProduct.reviewCount})</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {quickViewProduct.name}
              </h2>

              <p className="text-xs text-white/50 leading-relaxed font-light">
                {quickViewProduct.description}
              </p>

              {/* Pricing Box */}
              <div className="bg-[#12141a]/[0.03] border border-white/[0.08] p-4 rounded-xl space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold font-mono text-white">
                    {formatINR(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice > quickViewProduct.price && (
                    <span className="text-sm line-through text-white/40 font-mono">
                      {formatINR(quickViewProduct.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs font-mono text-emerald-400">
                    -{quickViewProduct.discountPercent}% Off MSRP
                  </span>
                </div>
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-gold-400 font-semibold">
                    Wholesale MOQ: {quickViewProduct.wholesaleMOQ} units
                  </span>
                  <span className="text-white/80">
                    @ {formatINR(quickViewProduct.wholesalePrice)}/ea
                  </span>
                </div>
              </div>

              {/* Key Features Bullet Points */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block">
                  Core Highlights:
                </span>
                {quickViewProduct.features?.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-white/70">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Technical Specifications Matrix */}
              {quickViewProduct.specs && (
                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block">
                    Technical Specifications:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    {Object.entries(quickViewProduct.specs).slice(0, 4).map(([k, v]) => (
                      <div key={k} className="bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/[0.06]">
                        <span className="text-white/40 block text-[9px] uppercase">{k}</span>
                        <span className="text-white/90 truncate block">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => {
                  setQuickViewProduct(null);
                  setWhatsAppOrderProduct(quickViewProduct);
                }}
                className="flex-1 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3.5 rounded-full border transition-all ${
                  isFavorited
                    ? "bg-rose-500 border-rose-500 text-white"
                    : "bg-[#12141a]/[0.05] border-white/15 text-white hover:bg-[#12141a]/10"
                }`}
                title={isFavorited ? "Saved in Wishlist" : "Save to Wishlist"}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? "fill-white" : ""}`} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
