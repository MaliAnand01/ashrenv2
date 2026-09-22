"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { Heart, Eye, MessageCircle, Star } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  badge?: string;
}

export function ProductCard({ product, badge }: ProductCardProps) {
  const {
    isInWishlist,
    toggleWishlist,
    setQuickViewProduct,
    setWhatsAppOrderProduct,
  } = useStore();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group relative bg-[#12141a] border border-white/8 rounded-apple-2xl p-4 flex flex-col transition-all duration-300 shadow-apple-card hover:shadow-apple-elevated hover:-translate-y-1">
      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/3] rounded-apple-xl overflow-hidden bg-white/[0.036] flex items-center justify-center mb-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {badge && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-dark_teal text-white shadow-sm">
              {badge}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-bold tracking-wider bg-[#12141a]/90 text-dark_teal border border-white/10 shadow-sm">
              -{product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorited
              ? "bg-rose-500 text-white shadow-md"
              : "bg-[#12141a]/90 text-white/65 hover:text-white hover:bg-[#12141a] border border-white/10 shadow-sm"
          }`}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-white" : ""}`} />
        </button>

        {/* Real Ashren Product Image with Smooth Scale */}
        <div className="relative w-full h-full p-3 flex items-center justify-center">
          <Image
            src={product.heroImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Quick Action Overlay (Reveals on Hover) */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 py-2 rounded-xl bg-[#12141a] hover:bg-white/[0.06] text-white text-xs font-semibold border border-white/10 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-dark_teal" />
            <span>Quick View</span>
          </button>
          <button
            onClick={() => setWhatsAppOrderProduct(product)}
            className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[10px] uppercase font-sans tracking-wider text-stormy_teal font-bold">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-sans text-white font-medium">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-white/65">({product.reviewCount})</span>
          </div>
        </div>

        <h3
          onClick={() => setQuickViewProduct(product)}
          className="text-sm font-semibold text-white group-hover:text-dark_teal transition-colors line-clamp-1 cursor-pointer mb-1"
        >
          {product.name}
        </h3>

        <p className="text-xs text-white/65 line-clamp-1 mb-3">
          {product.tagline}
        </p>

        {/* Price & Wholesale SKU Info */}
        <div className="mt-auto pt-3 border-t border-white/8 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-dark_teal font-mono">
                {formatINR(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-white/65 line-through font-mono">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-white/65 font-sans font-medium block">
              Wholesale MOQ: {product.wholesaleMOQ} Units @ {formatINR(product.wholesalePrice)}
            </span>
          </div>

          <span className="text-[10px] uppercase font-sans font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-white/65 border border-white/8">
            {product.stock > 0 ? `${product.stock} in stock` : "Pre-order"}
          </span>
        </div>
      </div>
    </div>
  );
}
