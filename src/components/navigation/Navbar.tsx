"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useExperience } from "@/lib/experience/ExperienceContext";
import { useStore } from "@/context/StoreContext";
import { WeatherLottie } from "@/components/weather/WeatherLottie";
import {
  Search,
  Heart,
  User,
  MessageCircle,
  MapPin,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  Truck,
  ArrowRight,
  Gem,
  Scissors,
  Headphones,
  Compass,
} from "lucide-react";
import { POPULAR_INDIAN_HUBS } from "@/lib/experience/locationService";

export function Navbar() {
  const { userContext, setUserCity } = useExperience();
  const { wishlist, setSearchOpen, setConciergeOpen } = useStore();

  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cityName = userContext.location.city || "Jaipur";
  const pincode = userContext.location.pincode || "302001";
  const temp = userContext.weather.temperature;

  const handleMouseEnterCategories = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setCategoriesMenuOpen(true);
  };

  const handleMouseLeaveCategories = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setCategoriesMenuOpen(false);
    }, 200);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setLocationDropdownOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a090c]/70 backdrop-blur-xl border-b border-white/10 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-18 flex items-center justify-between gap-3 lg:gap-6">
          
          {/* ================= LEFT: BRAND & DELIVERY CITY (BLINKIT STYLE) ================= */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Brand Logo / Monogram */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-black flex items-center justify-center font-serif text-lg sm:text-xl font-bold shadow-md group-hover:scale-105 transition-transform shrink-0">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-[0.18em] text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-tight">
                  ASHREN
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/60 font-sans font-medium -mt-0.5">
                  Atelier India
                </span>
              </div>
            </Link>

            {/* City & Pincode Selector (Blinkit Style) */}
            <div
              className="relative hidden md:block shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left group"
                aria-expanded={locationDropdownOpen}
              >
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-sans font-bold tracking-wider text-amber-400 block leading-none">
                    Deliver in 15 Mins to
                  </span>
                  <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors flex items-center gap-1 leading-tight mt-0.5">
                    {cityName} <span className="text-[10px] text-white/60 font-normal">({pincode})</span>
                    <ChevronDown className={`w-3 h-3 text-white/50 transition-transform ${locationDropdownOpen ? "rotate-180" : ""}`} />
                  </span>
                </div>
              </button>

              {/* Indian Cities Dropdown */}
              {locationDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-[#121016]/95 border border-white/15 rounded-2xl shadow-2xl p-3 z-50 animate-fade-in backdrop-blur-2xl">
                  <div className="pb-2 mb-2 border-b border-white/10 flex items-center justify-between text-[11px] font-sans">
                    <span className="text-amber-400 font-bold">Select Delivery City</span>
                    <span className="text-white/60 text-[10px]">Express Pan-India</span>
                  </div>
                  <div className="space-y-1">
                    {POPULAR_INDIAN_HUBS.map((hub) => (
                      <button
                        key={hub.city}
                        onClick={() => {
                          setUserCity(hub.city);
                          setLocationDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          cityName.toLowerCase() === hub.city.toLowerCase()
                            ? "bg-amber-500 text-black font-bold"
                            : "text-white/90 hover:bg-white/10"
                        }`}
                      >
                        <div>
                          <span className="block font-semibold">{hub.city}</span>
                          <span className={`text-[10px] ${cityName.toLowerCase() === hub.city.toLowerCase() ? "text-black/80" : "text-white/60"}`}>
                            Pincode: {hub.pincode}
                          </span>
                        </div>
                        <Truck className={`w-3.5 h-3.5 ${cityName.toLowerCase() === hub.city.toLowerCase() ? "text-black" : "text-white/50"}`} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================= CENTER: FAST SEARCH BAR (BLINKIT STYLE) ================= */}
          <div className="hidden lg:flex flex-1 max-w-md mx-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/70 transition-all text-left group shadow-inner"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-white/50 group-hover:text-amber-400 transition-colors" />
                <span className="text-white/70 font-medium">
                  Search gold jewellery, sarees, headphones, drones...
                </span>
              </div>
              <kbd className="hidden xl:inline-block px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono border border-white/10 text-white/80 shadow-sm">
                Ctrl+K
              </kbd>
            </button>
          </div>

          {/* ================= RIGHT: CATEGORY LINK, PROFILE & WHATSAPP ================= */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Category Dropdown Link */}
            <div
              className="relative hidden lg:block"
              onMouseEnter={handleMouseEnterCategories}
              onMouseLeave={handleMouseLeaveCategories}
            >
              <button
                onClick={() => setCategoriesMenuOpen(!categoriesMenuOpen)}
                className="flex items-center gap-1 text-xs uppercase tracking-wider font-sans font-semibold text-white/90 hover:text-amber-400 transition-colors py-2 group"
              >
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 text-white/50 group-hover:text-amber-400 transition-transform ${categoriesMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Mega Dropdown */}
              {categoriesMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-[720px] bg-[#121016]/95 border border-white/15 rounded-2xl shadow-2xl p-5 z-50 animate-fade-in backdrop-blur-2xl">
                  <div className="grid grid-cols-4 gap-5 pb-4 border-b border-white/10">
                    
                    {/* Col 1: Gold Jewellery */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-amber-400 font-serif font-bold text-xs">
                        <Gem className="w-3.5 h-3.5 text-amber-400" />
                        <span>Gold Jewellery</span>
                      </div>
                      <ul className="space-y-1.5 text-[11px] font-sans text-white/80">
                        <li><Link href="#shop" className="hover:text-amber-400">22K Kundan Chokers</Link></li>
                        <li><Link href="#shop" className="hover:text-amber-400">Real Polki Necklaces</Link></li>
                        <li><Link href="#shop" className="hover:text-amber-400">Gold Bangles & Kadas</Link></li>
                        <li><Link href="#shop" className="hover:text-amber-400">Diamond Rings</Link></li>
                      </ul>
                    </div>

                    {/* Col 2: Bridal & Sarees */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-amber-400 font-serif font-bold text-xs">
                        <Scissors className="w-3.5 h-3.5 text-amber-400" />
                        <span>Bridal & Sarees</span>
                      </div>
                      <ul className="space-y-1.5 text-[11px] font-sans text-white/80">
                        <li><Link href="#shop" className="hover:text-amber-400">Heavy Bridal Anarkalis</Link></li>
                        <li><Link href="#shop" className="hover:text-amber-400">Pure Silk Sarees</Link></li>
                        <li><Link href="#shop" className="hover:text-amber-400">Wedding Sherwanis</Link></li>
                        <li><Link href="#shop" className="hover:text-amber-400">Custom Stitching</Link></li>
                      </ul>
                    </div>

                    {/* Col 3: Studio Headphones */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-amber-400 font-serif font-bold text-xs">
                        <Headphones className="w-3.5 h-3.5 text-amber-400" />
                        <span>Studio Headphones</span>
                      </div>
                      <ul className="space-y-1.5 text-[11px] font-sans text-white/80">
                        <li><Link href="#shop" className="hover:text-amber-400">Pro Studio Headphones</Link></li>
                        <li><Link href="#shop" className="hover:text-amber-400">In-Ear Monitors</Link></li>
                        <li><Link href="#shop" className="hover:text-amber-400">Audio Amplifiers</Link></li>
                        <li><Link href="#shop" className="hover:text-amber-400">Sound Gear</Link></li>
                      </ul>
                    </div>

                    {/* Col 4: Camera Drones */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-amber-400 font-serif font-bold text-xs">
                        <Compass className="w-3.5 h-3.5 text-amber-400" />
                        <span>Camera Drones</span>
                      </div>
                      <ul className="space-y-1.5 text-[11px] font-sans text-white/80">
                        <li><Link href="#shop" className="hover:text-amber-400">4K Video Drones</Link></li>
                        <li><Link href="#shop" className="hover:text-amber-400">Gimbal Stabilizers</Link></li>
                        <li><Link href="#shop" className="hover:text-amber-400">Gaming Rigs</Link></li>
                        <li><Link href="#shop" className="hover:text-amber-400">Drone Accessories</Link></li>
                      </ul>
                    </div>

                  </div>

                  <div className="pt-2.5 flex items-center justify-between text-[10px] font-sans text-white/60">
                    <span>Direct Karigar Sourcing • Safe Delivery across India</span>
                    <Link href="#shop" onClick={() => setCategoriesMenuOpen(false)} className="text-amber-400 font-bold hover:underline flex items-center gap-1">
                      See All Products <ArrowRight className="w-2.5 h-2.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <Link
              href="/admin"
              className="p-2 rounded-full text-white/90 hover:bg-white/10 transition-colors"
              title="Profile & Account"
            >
              <User className="w-4 h-4 text-white" />
            </Link>

            {/* Wishlist */}
            <button
              onClick={() => setSearchOpen(true)}
              className="relative p-2 rounded-full text-white/90 hover:bg-white/10 transition-colors"
            >
              <Heart className="w-4 h-4 text-white" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* WhatsApp Order Button */}
            <button
              onClick={() => setConciergeOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black transition-all shadow-md active:scale-95 shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-black" />
              <span>WhatsApp Order</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="w-full bg-[#121016]/95 border-b border-white/10 p-5 space-y-3 lg:hidden animate-fade-in backdrop-blur-xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-sans text-white/70">
            <span>Delivering to {cityName} ({pincode})</span>
            <span className="font-bold text-amber-400">{temp}°C</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-1">
            {POPULAR_INDIAN_HUBS.slice(0, 4).map((hub) => (
              <button
                key={hub.city}
                onClick={() => {
                  setUserCity(hub.city);
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-xl text-left text-xs font-medium transition-colors ${
                  cityName.toLowerCase() === hub.city.toLowerCase()
                    ? "bg-amber-500 text-black font-bold"
                    : "bg-white/10 text-white"
                }`}
              >
                {hub.city} ({hub.pincode})
              </button>
            ))}
          </div>

          <div className="flex flex-col space-y-2 text-xs font-semibold uppercase tracking-wider text-white pt-2">
            <Link href="#shop" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-amber-400">Gold Jewellery</Link>
            <Link href="#shop" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-amber-400">Bridal & Sarees</Link>
            <Link href="#shop" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-amber-400">Studio Headphones</Link>
            <Link href="#shop" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-amber-400">Camera Drones</Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setConciergeOpen(true);
              }}
              className="text-left text-amber-400 font-bold py-1 flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
