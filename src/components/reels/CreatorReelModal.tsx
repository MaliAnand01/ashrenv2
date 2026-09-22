"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { ASHREN_PRODUCTS } from "@/data/products";
import {
  X,
  Heart,
  Share2,
  ShoppingBag,
  MessageCircle,
  Play,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export function CreatorReelModal() {
  const { activeReel, setActiveReel, setWhatsAppOrderProduct, setQuickViewProduct } = useStore();
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  if (!activeReel) return null;

  const taggedProduct =
    ASHREN_PRODUCTS.find((p) => p.id === activeReel.taggedProductId) ||
    ASHREN_PRODUCTS[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-sm h-[88vh] max-h-[750px] bg-[#0c0e14] rounded-3xl overflow-hidden border border-white/15 flex flex-col justify-between shadow-2xl">
        
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src={activeReel.videoThumb}
            alt={activeReel.title}
            fill
            className="object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
        </div>

        {/* Top Controls */}
        <div className="relative z-10 p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/60 border border-white/15 text-white">
              ASHREN LIVE REEL
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setActiveReel(null)}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Action Rail */}
        <div className="absolute right-4 bottom-32 z-20 flex flex-col items-center gap-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-col items-center"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                isLiked
                  ? "bg-rose-500 text-white"
                  : "bg-black/60 text-white hover:bg-black border border-white/20"
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`} />
            </div>
            <span className="text-xs font-mono text-white mt-1 drop-shadow">
              {activeReel.likes}
            </span>
          </button>

          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-white mt-1 drop-shadow">
              {activeReel.shares}
            </span>
          </div>
        </div>

        {/* Bottom Details & Tagged Product Order CTA */}
        <div className="relative z-10 p-5 space-y-4">
          {/* Creator Profile */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gold-400">
              <Image
                src={activeReel.creatorAvatar}
                alt={activeReel.creatorName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">
                  {activeReel.creatorName}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs text-white/60 font-mono">
                {activeReel.creatorHandle}
              </span>
            </div>
          </div>

          <p className="text-sm text-white/90 font-light leading-snug drop-shadow">
            {activeReel.title}
          </p>

          {/* Tagged Product Box */}
          <div className="bg-black/85 backdrop-blur-xl border border-white/20 rounded-2xl p-3.5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#12141a]/5 shrink-0">
                <Image
                  src={activeReel.taggedProductImage}
                  alt={activeReel.taggedProductName}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gold-400 font-semibold block">
                  Tagged Hardware
                </span>
                <span className="text-sm font-semibold text-white truncate block">
                  {activeReel.taggedProductName}
                </span>
                <span className="text-sm font-mono font-bold text-white block mt-0.5">
                  {formatINR(activeReel.taggedProductPrice)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setActiveReel(null);
                  setQuickViewProduct(taggedProduct);
                }}
                className="py-2.5 rounded-xl bg-[#12141a]/10 hover:bg-[#12141a]/20 text-white text-xs font-semibold transition-colors"
              >
                Inspect Specs
              </button>
              <button
                onClick={() => {
                  setActiveReel(null);
                  setWhatsAppOrderProduct(taggedProduct);
                }}
                className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
