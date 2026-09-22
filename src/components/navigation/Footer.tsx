"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, MapPin, Mail, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#050608] border-t border-white/10 text-white/70 py-16 text-sm font-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand & Indian Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-gold-400 to-amber-700 flex items-center justify-center">
                <span className="font-serif text-base font-bold text-black">A</span>
              </div>
              <span className="font-serif text-xl font-bold tracking-[0.25em] text-white">
                ASHREN
              </span>
            </div>
            <p className="text-xs text-white/50 max-w-sm leading-relaxed">
              India&apos;s context-driven luxury commerce atelier. Supplying verified wholesale consignments of aerospace carbon-fiber robotics, reference acoustic soundstages, esports hardware, and authentic Jaipur royal 22K Kundan heirlooms.
            </p>
            <div className="pt-2 flex flex-col space-y-1 text-xs font-mono text-gold-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Head Atelier: Johari Bazaar & MI Road, Jaipur, Rajasthan 302001</span>
              </div>
              <span className="text-[11px] text-white/40">Logistics Hubs: Mumbai • Bengaluru • Delhi NCR</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-white font-semibold">
              Master Categories
            </h4>
            <ul className="space-y-2 text-xs text-white/60 font-mono">
              <li><a href="#categories" className="hover:text-gold-300 transition-colors">Drones & Robotics</a></li>
              <li><a href="#categories" className="hover:text-gold-300 transition-colors">Studio Acoustics</a></li>
              <li><a href="#categories" className="hover:text-gold-300 transition-colors">Next-Gen Gaming</a></li>
              <li><a href="#categories" className="hover:text-gold-300 transition-colors">Royal Fine Jewellery (22K)</a></li>
              <li><a href="#categories" className="hover:text-gold-300 transition-colors">Heritage Zardozi Couture</a></li>
              <li><a href="#categories" className="hover:text-gold-300 transition-colors">Cinematic Optics</a></li>
            </ul>
          </div>

          {/* Col 3: Wholesale Services */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-white font-semibold">
              Wholesale Services
            </h4>
            <ul className="space-y-2 text-xs text-white/60 font-mono">
              <li><a href="#reels" className="hover:text-gold-300 transition-colors">Creator Commerce Network</a></li>
              <li><a href="#story" className="hover:text-gold-300 transition-colors">Engineering & Craft Story</a></li>
              <li>
                <Link href="/admin" className="text-gold-400 hover:text-gold-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Wholesale Admin Console</span>
                </Link>
              </li>
              <li><span className="text-white/40">BIS 916 Hallmarked Batches</span></li>
              <li><span className="text-white/40">Armored BlueDart Cargo Transit</span></li>
              <li><span className="text-white/40">GST Tax Invoicing & Input Credit</span></li>
            </ul>
          </div>

          {/* Col 4: Contact & Procurement */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-widest text-white font-semibold">
              Wholesale Procurement Desk
            </h4>
            <div className="space-y-2 text-xs text-white/60">
              <div className="flex items-center gap-2 text-white/90">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 98290 88201 (WhatsApp)</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Mail className="w-3.5 h-3.5 text-gold-400" />
                <span>concierge@ashren-atelier.in</span>
              </div>
              <p className="text-[11px] text-white/40 pt-2 font-mono">
                Atelier Hours: Mon - Sat • 09:30 - 20:30 IST
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-mono">
          <p>© {new Date().getFullYear()} ASHREN ATELIER BHARAT. Prototype Demonstration.</p>
          <div className="flex items-center gap-6">
            <span>GSTIN: 08AAACA1234B1Z5</span>
            <span>•</span>
            <span>Ashren Experience Engine</span>
            <span>•</span>
            <span>Proudly Built in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
