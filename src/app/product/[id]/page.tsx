"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ASHREN_PRODUCTS, Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { useExperience } from "@/lib/experience/ExperienceContext";
import { Navbar } from "@/components/navigation/Navbar";
import { CinematicFooter } from "@/components/navigation/CinematicFooter";
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
  ShoppingBag,
  Clock,
  Gem,
  Award,
  Lock,
  ChevronDown,
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;

  // Find product by either ID or Slug
  const product: Product =
    ASHREN_PRODUCTS.find((p) => p.id === productId || p.slug === productId) ||
    ASHREN_PRODUCTS[0];

  const { isInWishlist, toggleWishlist, addToCart, setWhatsAppOrderProduct, setConciergeOpen } =
    useStore();
  const { userContext } = useExperience();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "craft" | "care">("features");
  const [isJustAdded, setIsJustAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const cityName = userContext.location.city || "Jaipur";
  const pincode = userContext.location.pincode || "302001";

  // Gallery array fallback
  const gallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.heroImage, product.transparentImage || product.heroImage];

  const activeImage = gallery[selectedImageIndex] || product.heroImage;
  const isFavorited = isInWishlist(product.id);

  // Pricing calculations
  const unitPrice =
    quantity >= product.wholesaleMOQ && product.wholesalePrice
      ? product.wholesalePrice
      : product.price;
  const totalAmount = unitPrice * quantity;

  // Related products (excluding current)
  const relatedProducts = ASHREN_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsJustAdded(true);
    setTimeout(() => setIsJustAdded(false), 2200);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-[#07070a] text-white selection:bg-amber-500 selection:text-black">
      <Navbar />

      {/* Top Breadcrumb Bar */}
      <div className="pt-24 pb-4 border-b border-white/10 bg-[#090b10]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs font-mono text-white/50">
            <div className="flex items-center gap-2 truncate">
              <Link
                href="/shop"
                className="hover:text-amber-400 flex items-center gap-1 transition-colors shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Shop Catalog</span>
              </Link>
              <span>/</span>
              <span className="text-white/40 truncate hidden sm:inline">{product.category}</span>
              <span className="hidden sm:inline">/</span>
              <span className="text-amber-400 font-semibold truncate">{product.name}</span>
            </div>

            {/* City Express SLA Badge */}
            <div className="hidden md:flex items-center gap-2 text-[11px] text-amber-300 font-mono bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 shrink-0">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Deliver to {cityName} in 15 Mins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main PDP Layout */}
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ================================================================= */}
          {/* LEFT COLUMN: PRODUCT GALLERY & MASTER SHOWCASE */}
          {/* ================================================================= */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Large Image Stage */}
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-gradient-to-b from-[#12151e] to-[#0a0c12] border border-white/15 flex items-center justify-center p-8 group shadow-2xl">
              {/* Amber Atmosphere Glow */}
              <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center z-10"
              >
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
                />
              </motion.div>

              {/* SKU & Category Badges */}
              <div className="absolute top-5 left-5 z-20 flex flex-col gap-1.5">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-black/75 backdrop-blur-md border border-white/15 text-amber-300 font-bold">
                  {product.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono text-white/60 bg-black/60 backdrop-blur-md border border-white/10 w-fit">
                  SKU: {product.sku}
                </span>
              </div>

              {/* Top Right Floating Actions: Wishlist & Share */}
              <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white/80 hover:text-white transition-all shadow-lg active:scale-95"
                  title="Share Piece"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-full border transition-all shadow-lg active:scale-95 ${
                    isFavorited
                      ? "bg-rose-500 border-rose-500 text-white"
                      : "bg-black/60 border-white/15 text-white/80 hover:text-white"
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? "fill-white" : ""}`} />
                </button>
              </div>

              {copiedLink && (
                <div className="absolute bottom-5 inset-x-5 py-2 px-4 rounded-xl bg-amber-500 text-black font-mono text-xs font-bold text-center z-30 shadow-xl animate-fade-in">
                  Link copied to clipboard!
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {gallery.map((img, idx) => {
                  const isSelected = selectedImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative aspect-square rounded-2xl overflow-hidden bg-[#0d1017] border p-2 transition-all ${
                        isSelected
                          ? "border-amber-400 ring-2 ring-amber-400/30 shadow-lg shadow-amber-500/10 scale-102"
                          : "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} angle ${idx + 1}`}
                        fill
                        className="object-contain p-1"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Hallmark Assurance & Armed Transit Badges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-1 hover:border-amber-400/30 transition-colors">
                <Award className="w-5 h-5 text-amber-400 mx-auto" />
                <span className="text-xs font-bold text-white block">Atelier Certified</span>
                <span className="text-[10px] text-white/50 block font-mono">100% BIS Hallmarked</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-1 hover:border-emerald-400/30 transition-colors">
                <Truck className="w-5 h-5 text-emerald-400 mx-auto" />
                <span className="text-xs font-bold text-white block">Armed Transit</span>
                <span className="text-[10px] text-white/50 block font-mono">Sequel Insured Freight</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-1 hover:border-indigo-400/30 transition-colors">
                <ShieldCheck className="w-5 h-5 text-indigo-400 mx-auto" />
                <span className="text-xs font-bold text-white block">1-Year Warranty</span>
                <span className="text-[10px] text-white/50 block font-mono">Lifetime Care Support</span>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: DETAILS, PRICING & PURCHASING */}
          {/* ================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header: Brand, Rating & Title */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-white/80 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">{product.rating}</span>
                  <span className="text-white/40">({product.reviewCount} verified patrons)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight mb-2 tracking-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm font-mono text-amber-200/80 mb-4 tracking-wide">
                {product.tagline}
              </p>

              <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing Box */}
            <div className="bg-[#0e1119] border border-white/10 rounded-2xl p-5 space-y-3 shadow-xl">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-bold font-mono text-white">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base line-through text-white/40 font-mono">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Wholesale Tier Notice */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-amber-400 font-bold block">
                    WHOLESALE LOT MOQ: {product.wholesaleMOQ} UNITS
                  </span>
                  <span className="text-white/60">
                    Tiered at {formatINR(product.wholesalePrice)} / unit
                  </span>
                </div>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  In Stock ({product.stock} units)
                </span>
              </div>
            </div>

            {/* Delivery Estimation Pill */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-white block font-semibold">
                    Delivery to {cityName} ({pincode})
                  </span>
                  <span className="text-white/50 text-[11px]">
                    Dispatched within 2 hours • Insured Armed Transit
                  </span>
                </div>
              </div>
              <span className="text-emerald-400 font-bold shrink-0">FREE</span>
            </div>

            {/* Quantity Selector & Live Total */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-white/60 block">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-black/40 border border-white/15 rounded-xl overflow-hidden font-mono">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2.5 hover:bg-white/10 text-white font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-5 py-2.5 text-xs font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2.5 hover:bg-white/10 text-white font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="text-xs font-mono text-white/60">
                  Total:{" "}
                  <span className="text-white font-bold text-sm">{formatINR(totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Purchase CTA Buttons */}
            <div className="space-y-3 pt-2">
              {/* Add to Bag Button */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-xl font-bold font-mono text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 shadow-xl active:scale-[0.99] ${
                  isJustAdded
                    ? "bg-emerald-500 text-black shadow-emerald-500/20"
                    : "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black shadow-amber-500/20"
                }`}
              >
                {isJustAdded ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>ADDED TO SHOPPING BAG!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-black" />
                    <span>ADD TO SHOPPING BAG</span>
                  </>
                )}
              </button>

              {/* Order via WhatsApp Concierge Button */}
              <button
                onClick={() => setWhatsAppOrderProduct(product)}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/20 active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>ORDER DIRECTLY ON WHATSAPP</span>
              </button>

              {/* Call Atelier Concierge Button */}
              <button
                onClick={() => setConciergeOpen(true)}
                className="w-full py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>SPEAK TO ATELIER CONCIERGE</span>
              </button>
            </div>

            {/* Tabs for Details: Features, Specs, Craftsmanship, Care */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 text-xs font-mono overflow-x-auto">
                <button
                  onClick={() => setActiveTab("features")}
                  className={`pb-1 px-1 transition-colors ${
                    activeTab === "features"
                      ? "text-amber-400 border-b-2 border-amber-400 font-bold"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Highlights
                </button>
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`pb-1 px-1 transition-colors ${
                    activeTab === "specs"
                      ? "text-amber-400 border-b-2 border-amber-400 font-bold"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Technical Specs
                </button>
                <button
                  onClick={() => setActiveTab("craft")}
                  className={`pb-1 px-1 transition-colors ${
                    activeTab === "craft"
                      ? "text-amber-400 border-b-2 border-amber-400 font-bold"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Artisan Craft
                </button>
                <button
                  onClick={() => setActiveTab("care")}
                  className={`pb-1 px-1 transition-colors ${
                    activeTab === "care"
                      ? "text-amber-400 border-b-2 border-amber-400 font-bold"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Care Guide
                </button>
              </div>

              {/* Tab Content */}
              <div className="text-xs font-mono text-white/80 leading-relaxed min-h-[140px]">
                {activeTab === "features" && (
                  <ul className="space-y-2">
                    {product.features && product.features.length > 0 ? (
                      product.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>Hand-crafted under certified master artisan supervision</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>Direct dispatch from Jaipur Central Atelier</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>Complimentary luxury packaging with velvet keepsake box</span>
                        </li>
                      </>
                    )}
                  </ul>
                )}

                {activeTab === "specs" && (
                  <div className="divide-y divide-white/[0.06]">
                    {product.specs &&
                      Object.entries(product.specs).map(([key, val]) => (
                        <div key={key} className="py-2 flex items-center justify-between">
                          <span className="text-white/40">{key}</span>
                          <span className="text-white font-medium text-right">{val}</span>
                        </div>
                      ))}
                    <div className="py-2 flex items-center justify-between">
                      <span className="text-white/40">Hallmark / Authenticity</span>
                      <span className="text-amber-400 font-medium text-right">Certified Authentic</span>
                    </div>
                  </div>
                )}

                {activeTab === "craft" && (
                  <div className="space-y-2 text-white/70">
                    <p>
                      Each piece in the {product.category} collection is individually hand-finished
                      by generational master karigars in Jaipur and handloom weavers in Varanasi.
                    </p>
                    <p className="text-[11px] text-white/50">
                      Every gemstone is hand-selected and mounted with gold-foil Kundan technique,
                      ensuring lasting royal brilliance for celebrations.
                    </p>
                  </div>
                )}

                {activeTab === "care" && (
                  <div className="space-y-2 text-white/70">
                    <p>
                      Store in the provided velvet keepsake box away from moisture and direct
                      sunlight. Wipe gently with a soft micro-fiber cloth after each celebration.
                    </p>
                    <p className="text-[11px] text-white/50">
                      Avoid chemical perfumes or heavy abrasive cleaners to preserve the natural
                      luster and gold polish.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* RELATED CREATIONS SECTION */}
        {/* ================================================================= */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold block mb-1">
                COMPLEMENTARY PIECES
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Frequently Paired Masterpieces
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 mt-2 sm:mt-0 font-bold"
            >
              <span>Explore Complete Catalog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="group relative rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/40 p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 font-bold mb-2">
                    <span>{rel.category}</span>
                    <span>{rel.rating} ★</span>
                  </div>

                  <Link
                    href={`/product/${rel.id}`}
                    className="relative w-full h-44 flex items-center justify-center my-2 cursor-pointer"
                  >
                    <Image
                      src={rel.heroImage}
                      alt={rel.name}
                      width={220}
                      height={220}
                      className="object-contain max-h-40 w-auto group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <Link href={`/product/${rel.id}`}>
                    <h4 className="font-serif text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 mt-2">
                      {rel.name}
                    </h4>
                  </Link>

                  <div className="text-xs font-mono font-bold text-white mt-1">
                    {formatINR(rel.price)}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-white/5 flex items-center gap-2">
                  <Link
                    href={`/product/${rel.id}`}
                    className="flex-1 py-2 text-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs font-semibold transition-colors"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => addToCart(rel, 1)}
                    className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold transition-colors"
                    title="Add to Shopping Bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CinematicFooter />
    </main>
  );
}
