"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { CinematicFooter } from "@/components/navigation/CinematicFooter";
import { useStore } from "@/context/StoreContext";
import { formatINR } from "@/lib/utils";
import {
  User,
  MapPin,
  Package,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
} from "lucide-react";

export default function ProfilePage() {
  const { wishlist } = useStore();
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "settings">("orders");

  // Mock demo orders using our real products
  const DEMO_ORDERS = [
    {
      id: "ASH-ORD-98214",
      date: "18 September 2026",
      status: "Delivered",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      trackingNumber: "BVC-IN-8891240",
      totalAmount: 145000,
      items: [
        {
          name: "22K Kundan Polki Emerald Choker",
          image: "/products/hero-asset-4.png",
          qty: 1,
          price: 145000,
        },
      ],
    },
    {
      id: "ASH-ORD-97430",
      date: "04 August 2026",
      status: "Delivered",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      trackingNumber: "BLUEDART-5541092",
      totalAmount: 8999,
      items: [
        {
          name: "Ashren Wave Audio Smart Glasses",
          image: "/products/hero-asset-6.png",
          qty: 1,
          price: 8999,
        },
      ],
    },
  ];

  // Saved Indian delivery hubs
  const SAVED_ADDRESSES = [
    {
      id: "addr-01",
      tag: "Home (Primary)",
      name: "Rahul Sharma",
      line1: "Flat 402, Royal Palms Residency, C-Scheme",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
      phone: "+91 98290 12345",
      isDefault: true,
    },
    {
      id: "addr-02",
      tag: "Office",
      name: "Rahul Sharma",
      line1: "Unit 12B, Tech Park, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      phone: "+91 98290 12345",
      isDefault: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#07070a] text-white flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-8">
        
        {/* Profile Card Banner */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif text-2xl font-bold">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-white">Rahul Sharma</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                  Gold Patron Member
                </span>
              </div>
              <p className="text-xs text-white/60 font-mono mt-1">
                rahul.sharma@example.com • +91 98290 12345
              </p>
              <p className="text-[11px] text-white/40 mt-0.5">
                Member of Ashren Atelier since 2025 • Verified Indian Account
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-medium transition-colors"
            >
              View Cart
            </Link>
            <Link
              href="/shop"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold transition-all shadow-sm"
            >
              Browse Shop
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === "orders"
                ? "bg-amber-500 text-black shadow-sm"
                : "bg-white/5 hover:bg-white/10 text-white/70"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({DEMO_ORDERS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === "addresses"
                ? "bg-amber-500 text-black shadow-sm"
                : "bg-white/5 hover:bg-white/10 text-white/70"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Delivery Addresses ({SAVED_ADDRESSES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeTab === "settings"
                ? "bg-amber-500 text-black shadow-sm"
                : "bg-white/5 hover:bg-white/10 text-white/70"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account Preferences</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {DEMO_ORDERS.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 space-y-4 shadow-md"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/5 gap-2 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white">{order.id}</span>
                    <span className="text-white/40">•</span>
                    <span className="text-white/60">{order.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${order.statusColor}`}>
                      {order.status}
                    </span>
                    <span className="text-amber-400 font-bold">{formatINR(order.totalAmount)}</span>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg bg-white/5 border border-white/10 p-1 shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-0.5"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{item.name}</h4>
                          <span className="text-[11px] text-white/60 font-mono">
                            Qty: {item.qty} • {formatINR(item.price)}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 hidden sm:flex">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Insured Delivery Confirmed</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tracking info */}
                <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-white/50 font-mono">
                  <span>Tracking AWB: {order.trackingNumber}</span>
                  <a
                    href="https://wa.me/919829012345"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline"
                  >
                    Need Help With This Order?
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === "addresses" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAVED_ADDRESSES.map((addr) => (
                <div
                  key={addr.id}
                  className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {addr.tag}
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        Default Delivery
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white pt-1">{addr.name}</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {addr.line1}, {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-xs text-white/50 font-mono pt-1">
                    Phone: {addr.phone}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => alert("Add new delivery address dialog: enter your Indian pincode and street address.")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-white transition-colors"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Add New Address</span>
            </button>
          </div>
        )}

        {/* Tab 3: Account Settings */}
        {activeTab === "settings" && (
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 space-y-6 max-w-xl">
            <h3 className="font-serif text-lg font-bold text-white">Notifications & Preferences</h3>
            <div className="space-y-4 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-white/5 cursor-pointer">
                <div>
                  <span className="font-bold text-white block">WhatsApp Order Updates</span>
                  <span className="text-white/60">Receive dispatch and delivery tracking on WhatsApp</span>
                </div>
                <input type="checkbox" defaultChecked className="accent-amber-500 w-4 h-4" />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-white/5 cursor-pointer">
                <div>
                  <span className="font-bold text-white block">Atelier Private Previews</span>
                  <span className="text-white/60">Early access to newly handcrafted jewellery pieces</span>
                </div>
                <input type="checkbox" defaultChecked className="accent-amber-500 w-4 h-4" />
              </label>
            </div>
          </div>
        )}

      </div>

      <CinematicFooter />
    </main>
  );
}
