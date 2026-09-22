"use client";

import React from "react";
import { useExperience } from "@/lib/experience/ExperienceContext";

interface LightingLayerProps {
  mouseOffset: { x: number; y: number };
}

export function LightingLayer({ mouseOffset }: LightingLayerProps) {
  const { experience } = useExperience();
  const lighting = experience.layers.lighting;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[3]">
      {/* Primary Atmospheric Ambient Spotlight */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-40 transition-all duration-1000 ease-out"
        style={{
          background: lighting.ambientColor,
          transform: `translate(${mouseOffset.x * 35}px, ${mouseOffset.y * 35}px)`,
        }}
      />

      {/* Secondary Soft Rim Fill */}
      <div
        className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full blur-[100px] opacity-25 transition-all duration-1000"
        style={{
          background: lighting.spotlightGlow,
          transform: `translate(${mouseOffset.x * -20}px, ${mouseOffset.y * -20}px)`,
        }}
      />
    </div>
  );
}
