"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { ASHREN_PRODUCTS } from "@/data/products";
import {
  ArrowRight,
  Sparkles,
  MapPin,
  RefreshCw,
  Compass,
  Sliders,
  Check,
  ShieldAlert,
} from "lucide-react";
import { WEATHER_ATMOSPHERES } from "@/lib/weather/weatherService";
import { WeatherStateId } from "@/lib/weather/types";
import { formatINR } from "@/lib/utils";

export function WeatherHero() {
  const {
    weatherState,
    setWeatherState,
    atmosphere,
    userLocation,
    requestLiveLocation,
    setWhatsAppOrderProduct,
  } = useStore();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLocating, setIsLocating] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Find featured product matching the weather condition
  const featuredProduct =
    ASHREN_PRODUCTS.find((p) => p.slug === atmosphere.heroProductSlug) ||
    ASHREN_PRODUCTS[0];

  // Mouse parallax movement for 3D stage
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleLiveLocationClick = async () => {
    setIsLocating(true);
    await requestLiveLocation();
    setTimeout(() => setIsLocating(false), 1000);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden transition-all duration-1000 weather-atmosphere-transition"
      style={{
        background: atmosphere.gradientBg,
      }}
    >
      {/* Ambient Lighting & Glow Orb */}
      <div
        className="absolute top-1/3 right-1/4 w-[550px] h-[550px] rounded-full pointer-events-none blur-[140px] opacity-40 transition-all duration-1000"
        style={{
          background: atmosphere.ambientGlow,
          transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)`,
        }}
      />

      {/* Atmospheric Particles Layer */}
      {atmosphere.particleType === "rain" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="rain-particle"
              style={{
                left: `${(i * 3.3) % 100}%`,
                top: `${(i * 7) % 80}%`,
                animationDelay: `${(i * 0.08) % 1.2}s`,
                animationDuration: `${0.8 + ((i * 0.1) % 0.6)}s`,
              }}
            />
          ))}
        </div>
      )}

      {atmosphere.particleType === "snow" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="snow-particle"
              style={{
                left: `${(i * 4) % 100}%`,
                top: `${(i * 5) % 60}%`,
                animationDelay: `${(i * 0.2) % 4}s`,
                animationDuration: `${3.5 + ((i * 0.2) % 2)}s`,
              }}
            />
          ))}
        </div>
      )}

      {atmosphere.particleType === "lightning" && (
        <div className="lightning-effect" />
      )}

      {atmosphere.particleType === "stars" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#12141a] rounded-full animate-pulse"
              style={{
                left: `${(i * 5.1 + 8) % 95}%`,
                top: `${(i * 7.3 + 12) % 80}%`,
                animationDelay: `${(i * 0.3) % 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle Grid Lines for High-End Editorial Structure */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Main Viewport Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[75vh]">
          
          {/* LEFT COLUMN: Editorial Typography & Dynamic Contextual Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            
            {/* Contextual Weather Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12141a]/[0.05] border border-white/10 text-xs font-mono tracking-wider text-white/90 backdrop-blur-md">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: atmosphere.accentColor }}
                />
                <span className="font-semibold text-white">{atmosphere.conditionName}</span>
                <span className="text-white/30">•</span>
                <span className="flex items-center gap-1 text-white/70">
                  <MapPin className="w-3 h-3 text-gold-400" />
                  {userLocation.city}
                </span>
              </div>

              <button
                onClick={handleLiveLocationClick}
                disabled={isLocating}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-white/50 hover:text-gold-300 transition-colors"
                title="Sync live weather via Geolocation"
              >
                <RefreshCw className={`w-3 h-3 ${isLocating ? "animate-spin text-gold-400" : ""}`} />
                <span>{isLocating ? "Syncing..." : "Sync GPS"}</span>
              </button>
            </div>

            {/* Monolithic Brand Name & Huge Headline */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.4em] text-gold-400/90 font-medium block">
                ASHREN ARCHITECTURE • {atmosphere.label.toUpperCase()} EDITION
              </span>
              
              <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                {atmosphere.headline}
              </h1>
            </div>

            {/* Dynamic Contextual Atmosphere Narrative */}
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl">
              {atmosphere.subheadline}
            </p>

            {/* Wholesale & Product Quick Highlight Badge */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-white/60">
              <div>
                <span className="text-white/40 uppercase tracking-wider block text-[10px]">
                  Featured Staging
                </span>
                <span className="font-medium text-white text-sm">
                  {featuredProduct.name}
                </span>
              </div>
              <div className="border-l border-white/10 pl-6">
                <span className="text-white/40 uppercase tracking-wider block text-[10px]">
                  Wholesale Lot MOQ
                </span>
                <span className="font-mono text-gold-300 text-sm font-semibold">
                  {formatINR(featuredProduct.wholesalePrice)} / unit
                </span>
              </div>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#categories"
                className="px-8 py-4 rounded-full bg-[#12141a] hover:bg-gold-400 text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center gap-3 group"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => setWhatsAppOrderProduct(featuredProduct)}
                className="px-8 py-4 rounded-full bg-[#12141a]/[0.06] hover:bg-emerald-600 border border-white/15 hover:border-emerald-500 text-white font-medium text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2"
              >
                <span>ORDER VIA WHATSAPP</span>
              </button>
            </div>

            {/* Client Presentation Atmosphere Quick Switcher Bar */}
            <div className="pt-6">
              <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-2 font-mono">
                Interactive Weather Environments:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    "CLEAR_DAY",
                    "RAIN",
                    "STORM",
                    "CLEAR_NIGHT",
                    "SUNSET",
                    "SUNRISE",
                    "SNOW",
                    "WIND",
                  ] as WeatherStateId[]
                ).map((stateKey) => {
                  const stateItem = WEATHER_ATMOSPHERES[stateKey];
                  const isActive = weatherState === stateKey;
                  return (
                    <button
                      key={stateKey}
                      onClick={() => setWeatherState(stateKey)}
                      className={`text-[11px] px-2.5 py-1 rounded-full font-mono transition-all ${
                        isActive
                          ? "bg-gold-500 text-black font-semibold shadow-md"
                          : "bg-[#12141a]/[0.04] text-white/60 hover:text-white hover:bg-[#12141a]/10 border border-white/[0.06]"
                      }`}
                    >
                      {stateItem.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Staged Real Ashren Product with Physical Presence */}
          <div className="lg:col-span-6 flex items-center justify-center relative perspective-stage min-h-[460px] lg:min-h-[580px]">
            
            {/* Atmospheric Circular Stage Ring */}
            <div
              className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/10 pointer-events-none transition-transform duration-700"
              style={{
                transform: `rotateX(60deg) translateZ(-50px) translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
                borderColor: `${atmosphere.accentColor}33`,
              }}
            />

            {/* Concentric Floating Platform Pedestal */}
            <div
              className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full floating-platform pointer-events-none transition-all duration-1000"
              style={{
                background: `radial-gradient(circle, ${atmosphere.accentColor}22 0%, rgba(10,12,18,0.85) 70%, transparent 100%)`,
                boxShadow: `0 40px 80px -20px ${atmosphere.accentColor}40`,
                transform: `translateY(120px) rotateX(65deg) translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
              }}
            />

            {/* Physical Product Staged Image with Mouse Tilt & Parallax */}
            <div
              className="relative w-full max-w-[480px] h-[360px] sm:h-[460px] preserve-3d transition-transform duration-500 ease-out flex items-center justify-center group"
              style={{
                transform: `rotateY(${mousePos.x * 24}deg) rotateX(${-mousePos.y * 24}deg) translateZ(40px)`,
              }}
            >
              {/* Product Reflection Underneath */}
              <div
                className="absolute -bottom-16 w-3/4 h-24 blur-md opacity-25 rounded-full pointer-events-none transition-all duration-700"
                style={{
                  background: `radial-gradient(ellipse, ${atmosphere.accentColor} 0%, transparent 70%)`,
                  transform: `scale(${1 + mousePos.y * 0.2})`,
                }}
              />

              {/* Real Transparent Ashren Product Photo */}
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <Image
                  src={featuredProduct.transparentImage || featuredProduct.heroImage}
                  alt={featuredProduct.name}
                  width={520}
                  height={520}
                  priority
                  className="object-contain max-h-full drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  style={{
                    filter: `drop-shadow(${mousePos.x * -15}px ${25 + mousePos.y * 10}px 35px rgba(0,0,0,0.8)) drop-shadow(0 0 20px ${atmosphere.accentColor}33)`,
                  }}
                />
              </div>

              {/* Floating Specification Floating Chips */}
              <div
                className="absolute -top-2 -right-2 sm:right-4 bg-[#0a0d14]/85 border border-white/15 backdrop-blur-xl p-3 rounded-xl shadow-2xl transition-transform duration-500 pointer-events-none hidden sm:block"
                style={{
                  transform: `translateZ(60px) translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
                }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white font-medium">
                    {featuredProduct.category}
                  </span>
                </div>
                <span className="text-[10px] text-white/50 block mt-0.5 font-mono">
                  SKU: {featuredProduct.sku}
                </span>
              </div>

              <div
                className="absolute -bottom-2 -left-2 sm:left-4 bg-[#0a0d14]/85 border border-white/15 backdrop-blur-xl px-4 py-2.5 rounded-xl shadow-2xl transition-transform duration-500 pointer-events-none hidden sm:block"
                style={{
                  transform: `translateZ(50px) translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`,
                }}
              >
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block font-semibold">
                  ● In Stock Wholesale ({featuredProduct.stock} Units)
                </span>
                <span className="text-xs font-semibold text-white">
                  Rating: ★ {featuredProduct.rating} ({featuredProduct.reviewCount})
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
