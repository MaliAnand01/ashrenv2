"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ASHREN_PRODUCTS } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { ArrowRight, Zap } from "lucide-react";
import { formatINR } from "@/lib/utils";

export function LimitedDeals() {
  const { setWhatsAppOrderProduct } = useStore();
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 42, seconds: 19 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dealProduct = ASHREN_PRODUCTS.find((p) => p.isDeal) || ASHREN_PRODUCTS[1];

  return (
    <section className="py-20 bg-white/[0.009] border-t border-white/6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deal Banner Container (Apple-Style Soft Container) */}
        <div className="relative rounded-apple-3xl bg-[#12141a] border border-white/10 p-8 sm:p-12 overflow-hidden shadow-apple-card">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Narrative & Countdown */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans font-bold">
                <Zap className="w-3.5 h-3.5 fill-rose-600" />
                <span>EXCLUSIVE WHOLESALE FLASH ALLOTMENT</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                {dealProduct.name}
              </h3>

              <p className="text-sm sm:text-base text-white/65 font-normal max-w-xl">
                Secured factory surplus allocation. Contact our wholesale concierge to lock in this price before stock transfers to standard distributor pricing.
              </p>

              {/* Countdown Clocks */}
              <div className="flex items-center gap-3 pt-2">
                <div className="bg-white/[0.042] border border-white/8 px-4 py-3 rounded-apple-xl text-center min-w-[70px]">
                  <span className="text-2xl font-mono font-bold text-white block">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase font-sans text-white/55 font-semibold">Hours</span>
                </div>
                <span className="text-xl font-mono text-dark_teal font-bold">:</span>
                <div className="bg-white/[0.042] border border-white/8 px-4 py-3 rounded-apple-xl text-center min-w-[70px]">
                  <span className="text-2xl font-mono font-bold text-white block">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase font-sans text-white/55 font-semibold">Minutes</span>
                </div>
                <span className="text-xl font-mono text-dark_teal font-bold">:</span>
                <div className="bg-white/[0.042] border border-white/8 px-4 py-3 rounded-apple-xl text-center min-w-[70px]">
                  <span className="text-2xl font-mono font-bold text-dark_teal block">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase font-sans text-white/55 font-semibold">Seconds</span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div>
                  <span className="text-xs text-white/65 font-medium block">Flash Wholesale Lot Price</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-bold font-mono text-dark_teal">
                      {formatINR(dealProduct.wholesalePrice)}
                    </span>
                    <span className="text-sm line-through text-white/55 font-mono">
                      {formatINR(dealProduct.originalPrice)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setWhatsAppOrderProduct(dealProduct)}
                  className="px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-apple-soft"
                >
                  <span>Claim via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Product Spotlight */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative w-full max-w-[360px] h-[300px]">
                <Image
                  src={dealProduct.transparentImage || dealProduct.heroImage}
                  alt={dealProduct.name}
                  fill
                  className="object-contain drop-shadow-[0_20px_35px_rgba(7,57,60,0.18)]"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
