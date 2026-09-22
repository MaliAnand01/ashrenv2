"use client";

import React from "react";
import { ShieldCheck, Truck, RotateCcw, PhoneCall } from "lucide-react";

export function TrustSection() {
  const guarantees = [
    {
      icon: ShieldCheck,
      title: "BIS 916 Hallmarked & Certified",
      desc: "All jewellery accompanied by BIS hallmarking and GIA diamond certificates. Electronics tested across 48-hour burn-in cycles.",
    },
    {
      icon: Truck,
      title: "Pan-India Armored Transit",
      desc: "High-value consignments shipped via dedicated secure logistics with GPS-monitored sealed containers across India's 19,000+ pin codes.",
    },
    {
      icon: RotateCcw,
      title: "Pre-Production Sample Approval",
      desc: "Order a single verified sample lot before executing large enterprise wholesale commitments. Complete credit upon lot confirmation.",
    },
    {
      icon: PhoneCall,
      title: "Direct WhatsApp Procurement",
      desc: "Direct communication with Jaipur atelier inventory controllers and GST billing officers. Zero automated call-center friction.",
    },
  ];

  return (
    <section className="py-16 bg-[#12141a] border-t border-white/6 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-4 p-6 rounded-apple-2xl bg-white/[0.024] border border-white/8 shadow-sm"
              >
                <div className="w-11 h-11 rounded-apple-xl bg-[#12141a] border border-white/8 flex items-center justify-center text-dark_teal shrink-0 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/65 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
