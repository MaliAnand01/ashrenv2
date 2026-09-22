"use client";

import React from "react";
import { useExperience } from "@/lib/experience/ExperienceContext";

export function EnvironmentEffect() {
  const { experience } = useExperience();
  const effectType = experience.layers.effects.type;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {/* 1. DELICATE MONSOON RAIN PARTICLES (Behind & around product, not covering it) */}
      {(effectType === "rain" || effectType === "heavy-rain") && (
        <div className="absolute inset-0">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="rain-particle"
              style={{
                left: `${(i * 4.2 + 3) % 96}%`,
                top: `${(i * 7.8) % 80}%`,
                animationDelay: `${(i * 0.08) % 1.1}s`,
                animationDuration: `${0.8 + ((i * 0.04) % 0.4)}s`,
                opacity: 0.45,
              }}
            />
          ))}
        </div>
      )}

      {/* 2. SUBTLE STORM (Delicate rain with rare soft lightning glow) */}
      {effectType === "storm" && (
        <>
          <div className="absolute inset-0">
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                className="rain-particle"
                style={{
                  left: `${(i * 3.7 + 2) % 96}%`,
                  top: `${(i * 7.2) % 82}%`,
                  animationDelay: `${(i * 0.06) % 1.0}s`,
                  animationDuration: `${0.75 + ((i * 0.04) % 0.35)}s`,
                }}
              />
            ))}
          </div>
          <div className="lightning-effect opacity-25" />
        </>
      )}

      {/* 3. INDEPENDENCE DAY TRICOLOR PARTICLES (Elegantly floating) */}
      {effectType === "tricolor-particles" && (
        <div className="absolute inset-0">
          {Array.from({ length: 16 }).map((_, i) => {
            const isSaffron = i % 3 === 0;
            const isWhite = i % 3 === 1;
            const color = isSaffron
              ? "rgba(249, 115, 22, 0.65)"
              : isWhite
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(16, 185, 129, 0.65)";

            return (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full pointer-events-none animate-float-gentle"
                style={{
                  backgroundColor: color,
                  left: `${(i * 6.2 + 5) % 92}%`,
                  top: `${(i * 7.4 + 10) % 75}%`,
                  boxShadow: `0 0 8px ${color}`,
                  animationDelay: `${(i * 0.3) % 4}s`,
                  animationDuration: `${5 + (i % 3)}s`,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
