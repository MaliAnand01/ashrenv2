"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { ASHREN_PRODUCTS } from "@/data/products";
import { MessageCircle, ShieldCheck, Sparkles, Phone } from "lucide-react";

export function FinalCTA() {
  const { setWhatsAppOrderProduct, setConciergeOpen } = useStore();

  return (
    <section className="py-28 bg-gradient-to-b from-[#07080b] to-[#0d1017] border-t border-white/[0.08] relative overflow-hidden text-center">
      {/* Glow Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141a]/[0.05] border border-white/10 text-xs font-mono text-gold-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INDIAN WHOLESALE & ATELIER COMMISSIONS</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
          Commission Your Atelier Consignment Today
        </h2>

        <p className="text-base sm:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
          Whether you are outfitting an aerial cinematography fleet in Mumbai, sourcing bridal boutique inventory in Delhi, or establishing an esports tournament lounge in Bengaluru, our procurement team is live on WhatsApp.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setWhatsAppOrderProduct(ASHREN_PRODUCTS[0])}
            className="px-9 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3 shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            <span>START ORDER ON WHATSAPP</span>
          </button>

          <button
            onClick={() => setConciergeOpen(true)}
            className="px-8 py-4 rounded-full bg-[#12141a]/[0.06] hover:bg-[#12141a]/15 border border-white/15 text-white font-medium text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 text-gold-400" />
            <span>REQUEST VIP CALL BACK</span>
          </button>
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-white/40 font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            GST Tax Invoices & B2B Input Credit
          </span>
          <span>•</span>
          <span>Jaipur Head Atelier Dispatch</span>
          <span>•</span>
          <span>BlueDart Cargo Transit</span>
        </div>
      </div>
    </section>
  );
}
