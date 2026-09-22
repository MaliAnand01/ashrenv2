"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { X, MessageCircle, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { formatINR } from "@/lib/utils";

export function WhatsAppOrderModal() {
  const { whatsAppOrderProduct, setWhatsAppOrderProduct } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Jaipur");
  const [quantity, setQuantity] = useState(whatsAppOrderProduct?.wholesaleMOQ || 5);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!whatsAppOrderProduct) return null;

  const unitPrice =
    quantity >= whatsAppOrderProduct.wholesaleMOQ
      ? whatsAppOrderProduct.wholesalePrice
      : whatsAppOrderProduct.price;

  const totalEstimate = unitPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleClose = () => {
    setWhatsAppOrderProduct(null);
    setSubmitted(false);
    setName("");
    setPhone("");
    setNotes("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in text-white">
      <div className="relative w-full max-w-lg bg-[#0e1118] border border-gold-500/30 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#12141a]/5 hover:bg-[#12141a]/10 text-white/70 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* SUCCESS STATE */
          <div className="py-8 text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-400 font-semibold block">
                ORDER REQUEST RECEIVED
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Our team will contact you shortly.
              </h3>
              <p className="text-sm text-white/60 font-light max-w-sm mx-auto">
                A dedicated wholesale procurement specialist has been assigned to your request for{" "}
                <span className="text-white font-medium">{whatsAppOrderProduct.name}</span>.
              </p>
            </div>

            <div className="bg-black/40 border border-white/10 rounded-2xl p-4 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between text-white/60">
                <span>Reference Ticket:</span>
                <span className="text-gold-400 font-semibold">
                  WA-{Math.floor(10000 + Math.random() * 90000)}
                </span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Customer:</span>
                <span className="text-white">{name || "Valued Wholesaler"}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Quantity:</span>
                <span className="text-white">{quantity} Units</span>
              </div>
              <div className="flex justify-between text-white/60 pt-2 border-t border-white/[0.06]">
                <span>Estimated Value:</span>
                <span className="text-emerald-400 font-bold">{formatINR(totalEstimate)}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 rounded-full bg-[#12141a] hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-widest transition-colors shadow-lg"
            >
              Return to Catalog
            </button>
          </div>
        ) : (
          /* FORM SUBMISSION STATE */
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold block">
                  DIRECT CONCIERGE PROCUREMENT
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Order via WhatsApp
                </h3>
              </div>
            </div>

            {/* Product Summary Box */}
            <div className="bg-black/50 border border-white/10 rounded-2xl p-3.5 flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#12141a]/5 shrink-0">
                <Image
                  src={whatsAppOrderProduct.heroImage}
                  alt={whatsAppOrderProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-mono text-gold-400 block font-semibold">
                  SKU: {whatsAppOrderProduct.sku}
                </span>
                <h4 className="text-sm font-semibold text-white truncate">
                  {whatsAppOrderProduct.name}
                </h4>
                <div className="flex items-center gap-2 text-xs font-mono text-white/70 mt-0.5">
                  <span>Unit: {formatINR(unitPrice)}</span>
                  <span>•</span>
                  <span className="text-white/40">MOQ: {whatsAppOrderProduct.wholesaleMOQ}</span>
                </div>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-white/60 font-mono text-[11px] block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikramaditya Rathore"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12141a]/[0.04] border border-white/15 focus:border-gold-400 focus:outline-none text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/60 font-mono text-[11px] block">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98290 XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12141a]/[0.04] border border-white/15 focus:border-gold-400 focus:outline-none text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-white/60 font-mono text-[11px] block">
                    City / Delivery Hub *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Jaipur, Mumbai, Delhi"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12141a]/[0.04] border border-white/15 focus:border-gold-400 focus:outline-none text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/60 font-mono text-[11px] block">
                    Quantity (Wholesale Units) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12141a]/[0.04] border border-white/15 focus:border-gold-400 focus:outline-none text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-white/60 font-mono text-[11px] block">
                  Wholesale Requirements or Custom Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Inquire about laser engraved serial numbers, export billing, or scheduled release dates."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#12141a]/[0.04] border border-white/15 focus:border-gold-400 focus:outline-none text-white resize-none"
                />
              </div>

              {/* Estimate Breakdown */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white/60">Estimated Total (Excl. Tax):</span>
                <span className="text-base font-bold text-emerald-400">
                  {formatINR(totalEstimate)}
                </span>
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-emerald-500/25 mt-2"
              >
                {isSubmitting ? (
                  <span>DISPATCHING REQUEST...</span>
                ) : (
                  <>
                    <span>SEND ORDER REQUEST</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
