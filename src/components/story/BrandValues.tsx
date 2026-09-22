"use client";

import React from "react";
import { Shield, Gem, Compass, Cpu } from "lucide-react";

export function BrandValues() {
  const values = [
    {
      icon: Cpu,
      title: "Indigenous Tech Engineering",
      description: "From CNC machined 3K carbon fiber drone airframes to zero-latency Hall-Effect gaming rigs, our hardware conforms to rigorous industrial criteria.",
    },
    {
      icon: Gem,
      title: "Jaipur Artisan Guild",
      description: "Our bridal couture and 22K Kundan jewellery are individually hallmarked with BIS certification, fashioned by 4th-generation master karigars in Rajasthan.",
    },
    {
      icon: Shield,
      title: "Pan-India Direct Wholesale",
      description: "Eliminating middleman markups. We supply enterprise lots, boutique bridal ateliers, and media production houses directly from verified manufacturing runs.",
    },
    {
      icon: Compass,
      title: "Zero-Friction WhatsApp Desk",
      description: "Every B2B wholesale client receives a dedicated procurement specialist on WhatsApp with real-time consignment tracking, GST invoices, and insured transit.",
    },
  ];

  return (
    <section className="py-20 bg-[#12141a] border-t border-white/6 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-dark_teal text-xs font-sans font-bold uppercase tracking-[0.3em] block">
            THE ASHREN MANIFESTO
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            The Pillars of Indian Excellence
          </h2>
          <p className="text-white/65 text-sm sm:text-base font-normal">
            Bridging indigenous technological supremacy with centuries of hand-worked generational artistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="bg-white/[0.024] border border-white/8 hover:border-dark_teal/30 p-8 rounded-apple-2xl transition-all duration-300 flex flex-col group shadow-sm hover:shadow-apple-card hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-apple-xl bg-[#12141a] border border-white/8 flex items-center justify-center text-dark_teal mb-6 group-hover:bg-dark_teal group-hover:text-white transition-colors shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-dark_teal transition-colors mb-3">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-normal">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
