"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  Headphones,
  X,
  MessageCircle,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export function FloatingConcierge() {
  const { conciergeOpen, setConciergeOpen, setWhatsAppOrderProduct } = useStore();
  const [activeTab, setActiveTab] = useState<"menu" | "call" | "callback">("menu");
  const [requestedCall, setRequestedCall] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [timeSlot, setTimeSlot] = useState("Within 15 Minutes");

  const handleRequestCallback = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestedCall(true);
    setTimeout(() => {
      setRequestedCall(false);
      setActiveTab("menu");
      setConciergeOpen(false);
    }, 2500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setConciergeOpen(!conciergeOpen);
            setActiveTab("menu");
          }}
          className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#0e1118] hover:bg-gold-500 hover:text-black border border-gold-500/40 text-white shadow-[0_10px_35px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <Headphones className="w-5 h-5 text-gold-400 group-hover:text-black" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider">
            Need help?
          </span>
        </button>
      </div>

      {/* Concierge Popover Dialog */}
      {conciergeOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#0e121a] border border-white/15 rounded-3xl overflow-hidden shadow-2xl p-6 text-white animate-fade-in">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 flex items-center justify-center">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">
                  Ashren Wholesale Concierge
                </h4>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  ● Senior Specialists Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setConciergeOpen(false)}
              className="p-1 rounded-full text-white/50 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {activeTab === "menu" && (
            <div className="space-y-3">
              {/* Option 1: WhatsApp */}
              <a
                href="https://wa.me/919829088201?text=Hello%20Ashren%20Atelier,%20I%20would%20like%20to%20inquire%20about%20wholesale%20catalogs."
                target="_blank"
                rel="noreferrer"
                className="w-full p-3.5 rounded-2xl bg-[#12141a]/[0.03] hover:bg-emerald-600/20 border border-white/[0.08] hover:border-emerald-500/50 flex items-center gap-3.5 transition-all group text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white group-hover:text-emerald-300 block">
                    WhatsApp Desk
                  </span>
                  <span className="text-[11px] text-white/50 font-light block">
                    Instant catalog PDFs, MOQs & quotes
                  </span>
                </div>
              </a>

              {/* Option 2: Direct Call */}
              <a
                href="tel:+919829088201"
                className="w-full p-3.5 rounded-2xl bg-[#12141a]/[0.03] hover:bg-gold-500/20 border border-white/[0.08] hover:border-gold-500/50 flex items-center gap-3.5 transition-all group text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white group-hover:text-gold-300 block">
                    Call Directly
                  </span>
                  <span className="text-[11px] text-white/50 font-mono block">
                    +91 98290 88201 (Toll-Free Wholesaler Line)
                  </span>
                </div>
              </a>

              {/* Option 3: Request a Call */}
              <button
                onClick={() => setActiveTab("callback")}
                className="w-full p-3.5 rounded-2xl bg-[#12141a]/[0.03] hover:bg-[#12141a]/[0.08] border border-white/[0.08] flex items-center gap-3.5 transition-all group text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white group-hover:text-indigo-300 block">
                    Schedule VIP Callback
                  </span>
                  <span className="text-[11px] text-white/50 font-light block">
                    Procurement specialist calls at your convenience
                  </span>
                </div>
              </button>
            </div>
          )}

          {activeTab === "callback" && (
            <div>
              {requestedCall ? (
                <div className="py-6 text-center space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h5 className="text-sm font-bold text-white">Callback Scheduled</h5>
                  <p className="text-xs text-white/60">
                    Our lead procurement director will reach out within the selected timeframe.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRequestCallback} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-white/60 text-[11px] font-mono">
                      Your Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full px-3 py-2 rounded-xl bg-[#12141a]/[0.05] border border-white/15 focus:border-gold-400 focus:outline-none text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-white/60 text-[11px] font-mono">
                      Preferred Time
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#141822] border border-white/15 focus:border-gold-400 focus:outline-none text-white"
                    >
                      <option>Within 15 Minutes</option>
                      <option>Today Afternoon (2:00 PM - 5:00 PM)</option>
                      <option>Today Evening (5:00 PM - 8:00 PM)</option>
                      <option>Tomorrow Morning (10:00 AM - 1:00 PM)</option>
                    </select>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab("menu")}
                      className="flex-1 py-2.5 rounded-xl bg-[#12141a]/10 hover:bg-[#12141a]/20 text-white font-medium text-xs transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs transition-colors"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>
      )}
    </>
  );
}
