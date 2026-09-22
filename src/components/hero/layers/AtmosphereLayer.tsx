"use client";

import React from "react";
import { useExperience } from "@/lib/experience/ExperienceContext";

export function AtmosphereLayer() {
  const { experience } = useExperience();
  const atmosphere = experience.layers.atmosphere;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Drifting Clouds (Soft White & Frosted Blue Tint) */}
      {atmosphere.hasClouds && (
        <div className="absolute top-4 left-0 right-0 h-40 opacity-35 pointer-events-none">
          <div className="absolute -top-10 left-8 w-80 h-36 bg-frosted_blue/20 rounded-full blur-3xl animate-float-gentle" />
          <div className="absolute -top-6 right-1/4 w-[450px] h-44 bg-stormy_teal/10 rounded-full blur-3xl" />
        </div>
      )}

      {/* Sunflare (Soft Warm Amber Glow) */}
      {atmosphere.hasSunflare && (
        <div className="absolute top-6 right-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-amber-200/25 via-gold-400/10 to-transparent blur-3xl pointer-events-none" />
      )}

      {/* Starfield points (Subtle Deep Teal points for night mode) */}
      {atmosphere.hasStars && (
        <div className="absolute inset-0 opacity-40">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-dark_teal/40 rounded-full animate-pulse-slow"
              style={{
                left: `${(i * 4.6 + 8) % 94}%`,
                top: `${(i * 6.8 + 12) % 70}%`,
                animationDelay: `${(i * 0.3) % 4}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
