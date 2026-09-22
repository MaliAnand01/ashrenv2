"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useExperience } from "@/lib/experience/ExperienceContext";
import { useStore } from "@/context/StoreContext";
import { ASHREN_PRODUCTS } from "@/data/products";
import { formatINR } from "@/lib/utils";
import {
  Search,
  Heart,
  User,
  MessageCircle,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Truck,
  ArrowRight,
  Gem,
  Scissors,
  Smartphone,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { POPULAR_INDIAN_HUBS } from "@/lib/experience/locationService";

export function Navbar() {
  const { userContext, setUserCity } = useExperience();
  const { wishlist, toggleWishlist, addToCart, cartCount, setSearchOpen, setConciergeOpen } = useStore();

  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false);
  const [wishlistDropdownOpen, setWishlistDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cityName = userContext.location.city || "Jaipur";
  const pincode = userContext.location.pincode || "302001";

  const handleMouseEnterCategories = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setCategoriesMenuOpen(true);
  };

  const handleMouseLeaveCategories = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setCategoriesMenuOpen(false);
    }, 250);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setLocationDropdownOpen(false);
      setWishlistDropdownOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Filter wishlist products
  const wishlistProducts = ASHREN_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a090c]/80 backdrop-blur-xl border-b border-white/10 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-18 flex items-center justify-between gap-4">
          
          {/* ================= LEFT: BRAND & DELIVERY CITY ================= */}
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
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/60 font-mono -mt-0.5">
                  Atelier India
                </span>
              </div>
            </Link>

            {/* City & Pincode Selector */}
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
                  <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-amber-400 block leading-none">
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
                  <div className="pb-2 mb-2 border-b border-white/10 flex items-center justify-between text-[11px] font-mono">
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

          {/* ================= CENTER: NAVIGATION LINKS WITH NESTED CATEGORIES ================= */}
          <nav className="hidden lg:flex items-center gap-1 font-mono text-xs uppercase tracking-wider font-semibold">
            
            {/* Categories Link with Nested Mega Menu */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterCategories}
              onMouseLeave={handleMouseLeaveCategories}
            >
              <button
                onClick={() => setCategoriesMenuOpen(!categoriesMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/90 hover:text-amber-400 transition-colors"
              >
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 text-white/50 group-hover:text-amber-400 transition-transform ${categoriesMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Nested Categories Mega Menu */}
              {categoriesMenuOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-[680px] bg-[#121016]/98 border border-white/15 rounded-2xl shadow-2xl p-6 z-50 animate-fade-in backdrop-blur-2xl">
                  <div className="grid grid-cols-3 gap-6 pb-4 border-b border-white/10 text-left">
                    
                    {/* Col 1: Tech & Gadgets */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                        <Smartphone className="w-4 h-4 text-amber-400" />
                        <span>Tech & Gadgets</span>
                      </div>
                      <ul className="space-y-2 text-[11px] font-sans text-white/80 normal-case font-normal">
                        <li>
                          <Link href="/shop?category=Tech+%26+Gadgets" onClick={() => setCategoriesMenuOpen(false)} className="hover:text-amber-400 transition-colors block">
                            Smart Audio Glasses
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Tech+%26+Gadgets" onClick={() => setCategoriesMenuOpen(false)} className="hover:text-amber-400 transition-colors block">
                            Studio ANC Headphones
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Tech+%26+Gadgets" onClick={() => setCategoriesMenuOpen(false)} className="hover:text-amber-400 transition-colors block">
                            Automatic Chrono Watches
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Tech+%26+Gadgets" onClick={() => setCategoriesMenuOpen(false)} className="hover:text-amber-400 transition-colors block">
                            Hall-Effect Controllers
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Col 2: Royalty Jewellery */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                        <Gem className="w-4 h-4 text-amber-400" />
                        <span>Royalty Jewellery</span>
                      </div>
                      <ul className="space-y-2 text-[11px] font-sans text-white/80 normal-case font-normal">
                        <li>
                          <Link href="/shop?category=Royalty+Jewellery" onClick={() => setCategoriesMenuOpen(false)} className="hover:text-amber-400 transition-colors block">
                            22K Kundan Polki Chokers
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Royalty+Jewellery" onClick={() => setCategoriesMenuOpen(false)} className="hover:text-amber-400 transition-colors block">
                            Jaipur Heritage Bridal Sets
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Royalty+Jewellery" onClick={() => setCategoriesMenuOpen(false)} className="hover:text-amber-400 transition-colors block">
                            Natural Emerald Drops
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Royalty+Jewellery" onClick={() => setCategoriesMenuOpen(false)} className="hover:text-amber-400 transition-colors block">
                            22K Hallmarked Gold Purity
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Col 3: Haute Clothing */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                        <Scissors className="w-4 h-4 text-amber-400" />
                        <span>Haute Clothing</span>
                      </div>
                      <ul className="space-y-2 text-[11px] font-sans text-white/80 normal-case font-normal">
                        <li>
                          <Link href="/shop?category=Haute+Clothing" onClick={() => setCategoriesMenuOpen(false)} className="hover:text-amber-400 transition-colors block">
                            Pure Varanasi Silk Anarkalis
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Haute+Clothing" onClick={() => setCategoriesMenuOpen(false)} className="hover:text-amber-400 transition-colors block">
                            Real Silver Zari Threadwork
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Haute+Clothing" onClick={() => setCategoriesMenuOpen(false)} className="hover:text-amber-400 transition-colors block">
                            Heavy Bridal Dupattas
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Haute+Clothing" onClick={() => setCategoriesMenuOpen(false)} className="hover:text-amber-400 transition-colors block">
                            Custom Measurement Tailoring
                          </Link>
                        </li>
                      </ul>
                    </div>

                  </div>

                  <div className="pt-3 flex items-center justify-between text-[11px] font-sans text-white/60">
                    <span>Direct Karigar Craft • Insured Delivery Across India</span>
                    <Link
                      href="/shop"
                      onClick={() => setCategoriesMenuOpen(false)}
                      className="text-amber-400 font-bold hover:underline flex items-center gap-1 font-mono text-xs uppercase"
                    >
                      See All Products <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/shop" className="px-3 py-2 rounded-lg text-white/90 hover:text-amber-400 transition-colors">
              Shop
            </Link>

            <Link href="/about" className="px-3 py-2 rounded-lg text-white/90 hover:text-amber-400 transition-colors">
              About
            </Link>

            <Link href="/contact" className="px-3 py-2 rounded-lg text-white/90 hover:text-amber-400 transition-colors">
              Contact
            </Link>
          </nav>

          {/* ================= RIGHT: SEARCH ICON, WISHLIST, CART, PROFILE, WHATSAPP ================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Search Icon Button (Compact, Not Big Input) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-full text-white/90 hover:bg-white/10 hover:text-amber-400 transition-colors"
              title="Search Products (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-white hover:text-amber-400" />
            </button>

            {/* Wishlist Button with Flyout Dropdown (Fixed: DOES NOT OPEN SEARCH) */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setWishlistDropdownOpen(!wishlistDropdownOpen)}
                className="relative p-2.5 rounded-full text-white/90 hover:bg-white/10 transition-colors"
                title="Wishlist"
              >
                <Heart className="w-4 h-4 text-white" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center font-mono">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Wishlist Quick Dropdown */}
              {wishlistDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#121016]/98 border border-white/15 rounded-2xl shadow-2xl p-4 z-50 animate-fade-in backdrop-blur-2xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="font-mono text-xs uppercase font-bold text-amber-400">
                      Saved Wishlist ({wishlistProducts.length})
                    </span>
                    <Link
                      href="/shop"
                      onClick={() => setWishlistDropdownOpen(false)}
                      className="text-[11px] text-white/50 hover:text-white"
                    >
                      Browse More
                    </Link>
                  </div>

                  {wishlistProducts.length === 0 ? (
                    <p className="text-xs text-white/60 py-4 text-center">
                      Your wishlist is empty. Click the heart icon on any product to save it here.
                    </p>
                  ) : (
                    <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                      {wishlistProducts.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/5"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0">
                            <Image
                              src={p.heroImage}
                              alt={p.name}
                              fill
                              className="object-contain p-0.5"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-white truncate">{p.name}</h5>
                            <span className="text-[11px] font-mono text-amber-400 block">
                              {formatINR(p.price)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                addToCart(p, 1);
                                setWishlistDropdownOpen(false);
                              }}
                              className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black"
                              title="Add to Bag"
                            >
                              <ShoppingBag className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => toggleWishlist(p.id)}
                              className="p-1.5 rounded-lg text-white/40 hover:text-rose-400"
                              title="Remove"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {wishlistProducts.length > 0 && (
                    <Link
                      href="/cart"
                      onClick={() => setWishlistDropdownOpen(false)}
                      className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold block text-center transition-colors"
                    >
                      Go to Shopping Bag
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Cart Bag */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-full text-white/90 hover:bg-white/10 transition-colors"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile */}
            <Link
              href="/profile"
              className="p-2.5 rounded-full text-white/90 hover:bg-white/10 transition-colors"
              title="Profile & Orders"
            >
              <User className="w-4 h-4 text-white" />
            </Link>

            {/* WhatsApp Order Button */}
            <button
              onClick={() => setConciergeOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-bold px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black transition-all shadow-md active:scale-95 shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-black" />
              <span>WhatsApp</span>
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
        <div className="w-full bg-[#121016]/98 border-b border-white/10 p-5 space-y-3 lg:hidden animate-fade-in backdrop-blur-xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono text-white/70">
            <span>Delivering to {cityName} ({pincode})</span>
            <span className="font-bold text-amber-400 font-sans">Pan-India Insured</span>
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
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-amber-400">All Products</Link>
            <Link href="/shop?category=Tech+%26+Gadgets" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-amber-400">Tech & Gadgets</Link>
            <Link href="/shop?category=Royalty+Jewellery" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-amber-400">Royalty Jewellery</Link>
            <Link href="/shop?category=Haute+Clothing" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-amber-400">Haute Clothing</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-amber-400">Our Heritage</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-amber-400">Contact Studio</Link>
            <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-amber-400 flex items-center justify-between">
              <span>Shopping Bag</span>
              {cartCount > 0 && <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-bold">{cartCount}</span>}
            </Link>
            <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-amber-400">My Profile</Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setConciergeOpen(true);
              }}
              className="text-left text-amber-400 font-bold py-1.5 flex items-center gap-1.5 pt-2 border-t border-white/10"
            >
              <MessageCircle className="w-4 h-4 fill-amber-400" />
              <span>Order on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
