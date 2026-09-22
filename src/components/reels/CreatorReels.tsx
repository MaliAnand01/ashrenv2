"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ASHREN_CREATOR_REELS, CreatorReel } from "@/data/creators";
import { ASHREN_PRODUCTS } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import {
  Play,
  Heart,
  Share2,
  ShoppingBag,
  Eye,
  Flame,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export function CreatorReels() {
  const { setActiveReel, setQuickViewProduct, setWhatsAppOrderProduct } = useStore();
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedReels((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="reels" className="py-20 bg-white/[0.009] border-t border-white/6 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2 text-rose-600 text-xs font-sans font-bold uppercase tracking-[0.25em] mb-2">
              <Flame className="w-3.5 h-3.5 fill-rose-600" />
              <span>Social Commerce & Field Tests</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              DISCOVER. WATCH. SHOP.
            </h2>
          </div>
          <p className="text-sm text-white/65 max-w-md mt-3 md:mt-0 font-normal">
            Verified Indian creators putting Ashren engineering to the test across high altitudes, royal weddings, and competitive esports.
          </p>
        </div>

        {/* Reels Horizontal / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {ASHREN_CREATOR_REELS.map((reel) => {
            const isLiked = likedReels[reel.id];
            const taggedProduct =
              ASHREN_PRODUCTS.find((p) => p.id === reel.taggedProductId) ||
              ASHREN_PRODUCTS[0];

            return (
              <div
                key={reel.id}
                onClick={() => setActiveReel(reel)}
                className="group relative h-[470px] rounded-apple-2xl overflow-hidden bg-onyx border border-white/10 hover:border-dark_teal/40 cursor-pointer transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between shadow-apple-card hover:shadow-apple-elevated"
              >
                {/* Background Image / Reel Video Thumbnail */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={reel.videoThumb}
                    alt={reel.title}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/25" />
                </div>

                {/* Top Overlay: Category & Play Indicator */}
                <div className="relative z-10 p-4 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/15 text-white">
                    {reel.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#12141a]/25 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-105 group-hover:bg-dark_teal transition-all shadow-sm">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Right Side Social Actions (Likes, Shares, Views) */}
                <div className="absolute right-3 bottom-24 z-10 flex flex-col items-center gap-3">
                  <button
                    onClick={(e) => toggleLike(reel.id, e)}
                    className="flex flex-col items-center text-white"
                    aria-label="Like reel"
                  >
                    <div
                      className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center border transition-all ${
                        isLiked
                          ? "bg-rose-500 border-rose-500 text-white"
                          : "bg-black/50 border-white/15 text-white hover:bg-black/80"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
                    </div>
                    <span className="text-[10px] font-mono mt-1 drop-shadow">
                      {reel.likes}
                    </span>
                  </button>

                  <div className="flex flex-col items-center text-white">
                    <div className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono mt-1 drop-shadow">
                      {reel.shares}
                    </span>
                  </div>

                  <div className="flex flex-col items-center text-white">
                    <div className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center text-white">
                      <Eye className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono mt-1 drop-shadow">
                      {reel.views}
                    </span>
                  </div>
                </div>

                {/* Bottom Overlay: Creator Profile & Tagged Product Banner */}
                <div className="relative z-10 p-4 space-y-3">
                  {/* Creator Info */}
                  <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/40">
                      <Image
                        src={reel.creatorAvatar}
                        alt={reel.creatorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">
                        {reel.creatorName}
                      </span>
                      <span className="text-[10px] text-white/70 font-mono">
                        {reel.creatorHandle}
                      </span>
                    </div>
                  </div>

                  {/* Reel Caption */}
                  <p className="text-xs text-white/95 font-normal line-clamp-2 leading-snug drop-shadow-sm">
                    {reel.title}
                  </p>

                  {/* Tagged Product Box */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(taggedProduct);
                    }}
                    className="bg-[#12141a]/95 hover:bg-[#12141a] border border-white/10 rounded-apple-xl p-2.5 flex items-center gap-2.5 transition-colors shadow-sm"
                  >
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/[0.06] shrink-0">
                      <Image
                        src={reel.taggedProductImage}
                        alt={reel.taggedProductName}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-semibold text-white truncate block">
                        {reel.taggedProductName}
                      </span>
                      <span className="text-xs font-bold font-mono text-dark_teal block">
                        {formatINR(reel.taggedProductPrice)}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setWhatsAppOrderProduct(taggedProduct);
                      }}
                      className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shrink-0 transition-colors shadow-sm"
                      title="Order Tagged Item via WhatsApp"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
