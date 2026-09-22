"use client";

import React from "react";
import Image from "next/image";
import { useExperience } from "@/lib/experience/ExperienceContext";
import { ASHREN_PRODUCTS } from "@/data/products";
import { Sparkles, ShieldCheck } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface ProductLayerProps {
  mouseOffset: { x: number; y: number };
}

export function ProductLayer({ mouseOffset }: ProductLayerProps) {
  const { experience } = useExperience();

  const product =
    ASHREN_PRODUCTS.find((p) => p.slug === experience.featuredProductSlug) ||
    ASHREN_PRODUCTS[0];

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] flex items-center justify-center perspective-stage z-[10] select-none">
      
      {/* 3D Circular Floating Platform Stage (Apple-style soft modern pedestal) */}
      <div
        className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full floating-platform pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(144, 221, 240, 0.25) 0%, rgba(240, 237, 238, 0.9) 60%, rgba(255, 255, 255, 0) 100%)",
          boxShadow: "0 30px 60px -15px rgba(7, 57, 60, 0.12)",
          transform: `translateY(100px) rotateX(62deg) translate(${mouseOffset.x * 12}px, ${mouseOffset.y * 12}px)`,
        }}
      />

      {/* Atmospheric Stage Ring */}
      <div
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/8 pointer-events-none transition-all duration-700"
        style={{
          transform: `rotateX(60deg) translateZ(-30px) translate(${mouseOffset.x * -12}px, ${mouseOffset.y * -12}px)`,
        }}
      />

      {/* Physical Product Staged Image with Parallax & Depth */}
      <div
        className="relative w-full max-w-[480px] h-[340px] sm:h-[440px] preserve-3d transition-transform duration-500 ease-out flex items-center justify-center group cursor-pointer"
        style={{
          transform: `rotateY(${mouseOffset.x * 18}deg) rotateX(${-mouseOffset.y * 18}deg) translateZ(30px)`,
        }}
      >
        {/* Real Transparent Ashren Product Photo */}
        <div className="relative w-full h-full p-4 flex items-center justify-center">
          <Image
            src={product.transparentImage || product.heroImage}
            alt={product.name}
            width={520}
            height={520}
            priority
            className="object-contain max-h-full transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              filter: `drop-shadow(${mouseOffset.x * -10}px ${18 + mouseOffset.y * 6}px 28px rgba(7,57,60,0.22))`,
            }}
          />
        </div>

        {/* Floating Specification Chip: Category */}
        <div
          className="absolute -top-1 -right-2 sm:right-4 bg-[#12141a]/95 border border-white/10 backdrop-blur-xl px-4 py-2.5 rounded-apple-xl shadow-apple-card transition-transform duration-500 pointer-events-none hidden sm:block"
          style={{
            transform: `translateZ(50px) translate(${mouseOffset.x * 20}px, ${mouseOffset.y * 20}px)`,
          }}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-dark_teal" />
            <span className="text-[11px] font-sans uppercase tracking-wider text-white font-bold">
              {product.category}
            </span>
          </div>
          <span className="text-[10px] text-white/65 block mt-0.5 font-mono">
            SKU: {product.sku}
          </span>
        </div>

        {/* Floating Wholesale Dispatch Chip */}
        <div
          className="absolute -bottom-2 -left-2 sm:left-4 bg-[#12141a]/95 border border-white/10 backdrop-blur-xl px-4 py-2.5 rounded-apple-xl shadow-apple-card transition-transform duration-500 pointer-events-none hidden sm:block"
          style={{
            transform: `translateZ(40px) translate(${mouseOffset.x * -15}px, ${mouseOffset.y * -15}px)`,
          }}
        >
          <span className="text-[10px] uppercase font-sans tracking-wider text-emerald-700 block font-bold">
            ● Ready for Dispatch ({product.stock} units)
          </span>
          <span className="text-xs font-sans font-semibold text-white block mt-0.5">
            Wholesale MOQ {product.wholesaleMOQ} @ {formatINR(product.wholesalePrice)}/ea
          </span>
        </div>
      </div>

    </div>
  );
}
