"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { CinematicFooter } from "@/components/navigation/CinematicFooter";
import { useStore } from "@/context/StoreContext";
import { formatINR } from "@/lib/utils";
import {
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Check,
} from "lucide-react";

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useStore();
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    const cleaned = couponCode.trim().toUpperCase();

    if (cleaned === "ATELIER10") {
      setDiscountPercent(10);
      setCouponSuccess("10% discount applied to your order!");
    } else if (cleaned === "ASHREN5") {
      setDiscountPercent(5);
      setCouponSuccess("5% discount applied!");
    } else {
      setCouponError("Invalid promo code. Try 'ATELIER10'");
    }
  };

  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const finalTotal = cartTotal - discountAmount;

  // Generate WhatsApp order message
  const generateWhatsAppUrl = () => {
    const itemsList = cart
      .map((item, idx) => `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}) - ₹${item.product.price * item.quantity}`)
      .join("%0A");

    const message = `Hello Ashren Atelier,%0A%0AI would like to order the following items:%0A${itemsList}%0A%0ASubtotal: ₹${cartTotal}%0ADiscount: ₹${discountAmount}%0ATotal Payable: ₹${finalTotal}%0A%0APlease confirm stock availability and send payment instructions.`;

    return `https://wa.me/919829012345?text=${message}`;
  };

  return (
    <main className="min-h-screen bg-[#07070a] text-white flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-2">
              <Link href="/" className="hover:text-amber-400 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-amber-400">Shopping Bag</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Your Shopping Bag ({cartCount} {cartCount === 1 ? "item" : "items"})
            </h1>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-white/50 hover:text-rose-400 font-mono flex items-center gap-1 transition-colors self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Bag</span>
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-20 bg-white/[0.01] rounded-3xl border border-white/10 space-y-4 max-w-md mx-auto my-12 p-8">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mx-auto">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Your Shopping Bag is Empty</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Explore our curated selection of 22K Kundan gold jewellery, pure silk bridal wear, and smart audio glasses.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold transition-all shadow-md mt-2"
            >
              <span>Browse All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Active Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Items Column: 8 Cols */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="rounded-2xl bg-white/[0.02] border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors hover:border-white/20"
                >
                  {/* Product Thumbnail & Details */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-xl bg-white/[0.04] border border-white/10 p-2 shrink-0 flex items-center justify-center">
                      <Image
                        src={item.product.heroImage}
                        alt={item.product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                        {item.product.category}
                      </span>
                      <h4 className="font-serif text-sm sm:text-base font-bold text-white leading-tight">
                        {item.product.name}
                      </h4>
                      <span className="text-xs font-mono text-white/60 block">
                        {formatINR(item.product.price)} each
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Controls */}
                  <div className="flex items-center justify-between w-full sm:w-auto gap-4 self-end sm:self-center border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5">
                    
                    {/* Stepper */}
                    <div className="flex items-center border border-white/15 rounded-lg bg-black/40 overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold text-white min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total for this line */}
                    <span className="text-sm font-bold font-mono text-white min-w-[90px] text-right">
                      {formatINR(item.product.price * item.quantity)}
                    </span>

                    {/* Delete item button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-white/40 hover:text-rose-400 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Free Insurance Banner */}
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/10 flex items-center gap-3 text-xs text-white/80">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  All items are shipped with 100% transit insurance. If damaged in courier, free replacement is guaranteed.
                </span>
              </div>
            </div>

            {/* Right Summary Sidebar: 4 Cols */}
            <div className="lg:col-span-4 bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl">
              <h3 className="font-serif text-xl font-bold text-white border-b border-white/10 pb-3">
                Order Summary
              </h3>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between text-white/70">
                  <span>Bag Subtotal ({cartCount} items)</span>
                  <span className="text-white font-semibold">{formatINR(cartTotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>Promo Discount ({discountPercent}%)</span>
                    <span>- {formatINR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-white/70">
                  <span>Insured Pan-India Delivery</span>
                  <span className="text-emerald-400 font-semibold">FREE</span>
                </div>

                <div className="flex items-center justify-between text-white/70">
                  <span>Taxes (GST Included)</span>
                  <span className="text-white/60">₹0 extra</span>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-base font-bold text-white">
                  <span>Total Amount</span>
                  <span className="text-amber-400 text-lg">{formatINR(finalTotal)}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2 border-t border-white/10">
                <label className="text-[11px] font-mono text-white/60 block">
                  Have a Promo Code? (Use: ATELIER10)
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. ATELIER10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs font-mono uppercase text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-rose-400">{couponError}</p>}
                {couponSuccess && <p className="text-[11px] text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> {couponSuccess}</p>}
              </form>

              {/* CTAs: WhatsApp Direct & Secure Checkout */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Order on WhatsApp (Instant)</span>
                </a>

                <button
                  onClick={() => alert("Checkout initiated! Total: " + formatINR(finalTotal) + ". You can also use the WhatsApp Order button for direct Karigar assistance.")}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs font-semibold tracking-wider transition-all active:scale-95"
                >
                  Proceed to Secure Payment
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

      <CinematicFooter />
    </main>
  );
}
