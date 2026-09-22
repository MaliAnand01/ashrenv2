"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ASHREN_PRODUCTS } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
  Phone,
  Heart,
  Share2,
  Check,
  ChevronRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;
  const product =
    ASHREN_PRODUCTS.find((p) => p.id === productId || p.slug === productId) ||
    ASHREN_PRODUCTS[0];

  const { isInWishlist, toggleWishlist, setWhatsAppOrderProduct, setConciergeOpen } = useStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(product.wholesaleMOQ || 5);

  const gallery = product.gallery || [product.heroImage];
  const activeImage = gallery[selectedImageIndex] || product.heroImage;
  const isFavorited = isInWishlist(product.id);

  const unitPrice =
    quantity >= product.wholesaleMOQ ? product.wholesalePrice : product.price;
  const totalAmount = unitPrice * quantity;

  return (
    <main className="min-h-screen bg-[#07080b] text-white">
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="pt-28 pb-6 border-b border-white/[0.06] bg-[#090b10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono text-white/50">
            <Link href="/" className="hover:text-gold-400 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Atelier</span>
            </Link>
            <span>/</span>
            <span className="text-white/40">{product.category}</span>
            <span>/</span>
            <span className="text-gold-400 truncate max-w-xs">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main PDP Container */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT: Master Gallery & Image Zoom Stage */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-[#0d1017] border border-white/15 flex items-center justify-center p-8 group">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-2xl"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-black/70 backdrop-blur-md border border-white/10 text-white/80">
                SKU: {product.sku}
              </span>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full border transition-all ${
                  isFavorited
                    ? "bg-rose-500 border-rose-500 text-white"
                    : "bg-black/60 border-white/15 text-white/80 hover:text-white"
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? "fill-white" : ""}`} />
              </button>
            </div>

            {/* Thumbnails Strip */}
            <div className="grid grid-cols-4 gap-4">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-square rounded-2xl overflow-hidden bg-[#0e1119] border transition-all ${
                    selectedImageIndex === idx
                      ? "border-gold-400 scale-105 shadow-lg shadow-gold-500/10"
                      : "border-white/10 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Quality & Logistics Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-[#12141a]/[0.02] border border-white/[0.06] text-center space-y-1">
                <ShieldCheck className="w-5 h-5 text-gold-400 mx-auto" />
                <span className="text-xs font-semibold text-white block">Atelier Certified</span>
                <span className="text-[10px] text-white/40 block">100% Inspected</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#12141a]/[0.02] border border-white/[0.06] text-center space-y-1">
                <Truck className="w-5 h-5 text-emerald-400 mx-auto" />
                <span className="text-xs font-semibold text-white block">Direct Freight</span>
                <span className="text-[10px] text-white/40 block">Pan-India Transit</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#12141a]/[0.02] border border-white/[0.06] text-center space-y-1">
                <RotateCcw className="w-5 h-5 text-indigo-400 mx-auto" />
                <span className="text-xs font-semibold text-white block">Wholesale Guarantee</span>
                <span className="text-[10px] text-white/40 block">Sample Approvals</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Information, Specs & WhatsApp Action */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-white/80">
                  <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-white/40">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
                {product.name}
              </h1>

              <p className="text-sm text-white/60 font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing Matrix */}
            <div className="bg-[#0e1119] border border-white/10 rounded-2xl p-5 space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold font-mono text-white">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base line-through text-white/40 font-mono">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Save {product.discountPercent}%
                </span>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-gold-400 font-bold block">
                    WHOLESALE LOT MOQ: {product.wholesaleMOQ} UNITS
                  </span>
                  <span className="text-white/60">
                    Tiered at {formatINR(product.wholesalePrice)} / unit
                  </span>
                </div>
                <span className="text-emerald-400 font-semibold">
                  ● In Stock ({product.stock} units)
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-white/60 block">
                Wholesale Quantity (Units):
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-[#12141a]/[0.05] border border-white/15 rounded-xl overflow-hidden font-mono">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-[#12141a]/10 text-white font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 text-sm font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-[#12141a]/10 text-white font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="text-xs font-mono text-white/50">
                  Est. Lot Total:{" "}
                  <span className="text-white font-bold text-sm">
                    {formatINR(totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* PRIMARY CTA: ORDER VIA WHATSAPP & SECONDARY: CALL US */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setWhatsAppOrderProduct(product)}
                className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-102"
              >
                <MessageCircle className="w-5 h-5" />
                <span>ORDER VIA WHATSAPP</span>
              </button>

              <button
                onClick={() => setConciergeOpen(true)}
                className="w-full py-3.5 rounded-full bg-[#12141a]/[0.05] hover:bg-[#12141a]/10 border border-white/15 text-white font-semibold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>CALL PROCUREMENT DESK</span>
              </button>
            </div>

            {/* Technical Specifications Breakdown */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <h3 className="text-xs uppercase font-mono tracking-widest text-white/70 font-semibold">
                Complete Engineering Specifications
              </h3>
              <div className="divide-y divide-white/[0.06] text-xs font-mono">
                {product.specs &&
                  Object.entries(product.specs).map(([specKey, specVal]) => (
                    <div key={specKey} className="py-2.5 flex items-center justify-between">
                      <span className="text-white/40">{specKey}</span>
                      <span className="text-white font-medium text-right">{specVal}</span>
                    </div>
                  ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
