"use client";

import React from "react";
import Link from "next/link";
import {
  MessageCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

export function CinematicFooter() {
  return (
    <footer className="bg-black/60 backdrop-blur-md text-white border-t border-white/10 relative z-20">
      
      {/* Trust & Guarantee Ribbon */}
      <div className="border-b border-white/8 py-8 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">BIS Hallmarked Gold</span>
              <span className="text-[11px] text-white/50">Government certified 22K purity</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Insured Pan-India</span>
              <span className="text-[11px] text-white/50">Safe armored express shipping</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Lifetime Buyback</span>
              <span className="text-[11px] text-white/50">Guaranteed gold exchange value</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">WhatsApp Concierge</span>
              <span className="text-[11px] text-white/50">Direct help & custom sizing</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Atelier Studio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-black flex items-center justify-center font-serif text-lg font-bold shadow-md">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-[0.2em] text-lg font-bold text-white leading-tight">
                  ASHREN
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/60 font-mono">
                  Atelier India
                </span>
              </div>
            </Link>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              Ashren brings together Jaipur’s heritage karigars, Varanasi pure handloom weavers, and next-generation smart electronics with complete pricing honesty.
            </p>

            <div className="pt-2 space-y-2 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Johari Bazaar, Pink City, Jaipur, Rajasthan 302003</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 98290 12345 (10 AM to 8 PM IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>care@ashrenatelier.com</span>
              </div>
            </div>
          </div>

          {/* Col 1: Shop Collections */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-white/70 font-normal">
              <li>
                <Link href="/shop?category=Tech+%26+Gadgets" className="hover:text-amber-400 transition-colors">
                  Smart Audio Glasses
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Tech+%26+Gadgets" className="hover:text-amber-400 transition-colors">
                  ANC Studio Headphones
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Royalty+Jewellery" className="hover:text-amber-400 transition-colors">
                  22K Kundan Polki Chokers
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Royalty+Jewellery" className="hover:text-amber-400 transition-colors">
                  Heritage Bridal Sets
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Haute+Clothing" className="hover:text-amber-400 transition-colors">
                  Varanasi Silk Anarkalis
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-amber-400 transition-colors">
                  All 7 Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Atelier Pages */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-white/70 font-normal">
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  Our Jaipur Heritage
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  Karigar & Weaving Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Contact & Atelier Studio
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-amber-400 transition-colors">
                  My Orders & Profile
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-amber-400 transition-colors">
                  View Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct WhatsApp Concierge Help */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
              Instant Order
            </h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Have questions about jewellery weight, dress sizing, or gadget features? Talk directly with our team on WhatsApp.
            </p>
            <a
              href="https://wa.me/919829012345?text=Hello%20Ashren%20Atelier,%20I%20would%20like%20to%20know%20more%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40 font-mono">
          <p>© {new Date().getFullYear()} Ashren Atelier India Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-white/70 transition-colors">
              Purity Guarantee
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white/70 transition-colors">
              Shipping & Returns
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
