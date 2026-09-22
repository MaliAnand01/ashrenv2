"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { CinematicFooter } from "@/components/navigation/CinematicFooter";
import { ShieldCheck, Gem, Users, ArrowRight, Truck, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#07070a] text-white flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1 space-y-16">
        
        {/* Hero Banner */}
        <div className="text-center space-y-4 max-w-2xl mx-auto pt-4">
          <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold block">
            Our Story & Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Crafted with Honesty in India
          </h1>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
            Ashren Atelier was founded in Jaipur with one clear objective: bring together genuine Indian artisan craft and high-performance electronics with honest pricing.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Gem className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Jaipur Karigar Craft</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Every Kundan Polki piece is handmade in Johari Bazaar using pure 22K hallmarked gold foil, uncut natural polki diamonds, and real Zambian emeralds.
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Varanasi Handloom Silk</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Our couture anarkalis are hand-woven in Varanasi from pure Katan silk and hand-embroidered with real metallic silver zari by master tailors.
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-white">Curated Modern Tech</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              From open-ear smart sunglasses to magnetic Hall-effect controllers and automatic watches, every gadget is bench-tested before shipping.
            </p>
          </div>
        </div>

        {/* Detailed Narrative Section */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
            The Philosophy
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Why We Started Ashren
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed">
            <p>
              In traditional Indian luxury retail, jewellery and bridal wear pass through multiple middlemen, wholesale brokers, and high-street showroom rents. By the time a Kundan choker or bridal suit reaches the buyer, the markup is often 200% to 300% above actual artisan cost.
            </p>
            <p>
              We established direct partnerships with master karigar families in Jaipur and handloom weaver cooperatives in Varanasi. By removing unnecessary middlemen, we pay fair wages directly to artisans while offering you certified BIS hallmarked gold jewellery and genuine silk at transparent prices.
            </p>
            <p>
              At the same time, we saw a gap in everyday technology: smart glasses, studio headphones, and gaming controllers were either cheap plastic knock-offs or overpriced foreign imports. We curated smart devices with real Hall-effect magnetic sticks, hybrid noise cancellation, and UV400 polarized optical protection.
            </p>
          </div>

          {/* Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs text-white/90">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% BIS Hallmarked 22K pure gold purity certification</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% transit insurance on all courier shipments</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct WhatsApp access to sizing & tailoring experts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Lifetime buyback and exchange guarantee on gold items</span>
            </div>
          </div>
        </div>

        {/* Studio Location & CTA */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="font-serif text-2xl font-bold text-white">Visit or Chat With Us</h3>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto">
            Our atelier studio is located in Johari Bazaar, Jaipur. Have questions or custom requirements?
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link
              href="/shop"
              className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold transition-all shadow-md"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs font-semibold transition-all"
            >
              Contact Studio
            </Link>
          </div>
        </div>

      </div>

      <CinematicFooter />
    </main>
  );
}
