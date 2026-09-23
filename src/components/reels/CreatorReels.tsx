"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ASHREN_CREATOR_REELS } from "@/data/creators";
import { ASHREN_PRODUCTS } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import {
  Play,
  Heart,
  Share2,
  ShoppingBag,
  Eye,
  Video,
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
    <section id="reels" className="py-16 sm:py-24 bg-transparent border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest mb-2">
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span>Real Customer Stories & Tests</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Watch Real People Test Ashren
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mt-2 md:mt-0 font-normal">
            Short real-world video tests by customers across Indian cities wearing our jewellery, testing smart glasses, and gaming.
          </p>
        </div>

        {/* Reels Horizontal Sliding on Mobile, Responsive Grid on Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-5 sm:overflow-visible sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {ASHREN_CREATOR_REELS.map((reel) => {
            const isLiked = likedReels[reel.id];
            const taggedProduct =
              ASHREN_PRODUCTS.find((p) => p.id === reel.taggedProductId) ||
              ASHREN_PRODUCTS[0];

            return (
              <div
                key={reel.id}
                onClick={() => setActiveReel(reel)}
                className="group relative w-[270px] sm:w-auto h-[490px] sm:h-[460px] flex-shrink-0 snap-center sm:snap-align-none rounded-2xl overflow-hidden bg-[#121016] border border-white/10 hover:border-amber-400/40 cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between shadow-xl"
              >
                {/* Background Image / Reel Video Thumbnail */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={reel.videoThumb}
                    alt={reel.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/20" />
                </div>

                {/* Top Overlay: Category & Play Indicator */}
                <div className="relative z-10 p-3.5 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/15 text-white">
                    {reel.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-black transition-all">
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
                      className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center border transition-all ${
                        isLiked
                          ? "bg-rose-500 border-rose-500 text-white"
                          : "bg-black/60 border-white/15 text-white hover:bg-black/90"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-white" : ""}`} />
                    </div>
                    <span className="text-[10px] font-mono mt-0.5 drop-shadow">
                      {reel.likes}
                    </span>
                  </button>

                  <div className="flex flex-col items-center text-white">
                    <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white">
                      <Share2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono mt-0.5 drop-shadow">
                      {reel.shares}
                    </span>
                  </div>

                  <div className="flex flex-col items-center text-white">
                    <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] font-mono mt-0.5 drop-shadow">
                      {reel.views}
                    </span>
                  </div>
                </div>

                {/* Bottom Overlay: Creator Profile & Tagged Product Banner */}
                <div className="relative z-10 p-3.5 space-y-2.5">
                  {/* Creator Info */}
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/40">
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
                      <span className="text-[9px] text-white/60 font-mono">
                        {reel.creatorHandle}
                      </span>
                    </div>
                  </div>

                  {/* Reel Caption */}
                  <p className="text-[11px] text-white/90 font-normal line-clamp-2 leading-snug">
                    {reel.title}
                  </p>

                  {/* Tagged Product Box - Directly Redirects to PDP Page */}
                  <Link
                    href={`/product/${taggedProduct.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#121016]/95 hover:bg-[#18151f] border border-white/10 hover:border-amber-400/50 rounded-xl p-2 flex items-center gap-2 transition-colors cursor-pointer group/prod"
                  >
                    <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-white/[0.04] shrink-0">
                      <Image
                        src={reel.taggedProductImage}
                        alt={reel.taggedProductName}
                        fill
                        className="object-contain p-0.5 group-hover/prod:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-medium text-white truncate block group-hover/prod:text-amber-400 transition-colors">
                        {reel.taggedProductName}
                      </span>
                      <span className="text-[11px] font-bold font-mono text-amber-400 block">
                        {formatINR(reel.taggedProductPrice)}
                      </span>
                    </div>
                    <div
                      className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black shrink-0 transition-colors"
                      title="View Product"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
