"use client";

import React from "react";
import { useExperience } from "@/lib/experience/ExperienceContext";

export function BackgroundLayer() {
  const { experience } = useExperience();

  // Subtle Ambient Light Gradients tailored to the 4 core experiences
  let lightGradient = "radial-gradient(ellipse at 75% 25%, rgba(144, 221, 240, 0.22) 0%, rgba(240, 237, 238, 0.8) 50%, #ffffff 100%)";

  if (experience.id === "weather-rain") {
    lightGradient = "radial-gradient(ellipse at 75% 25%, rgba(44, 102, 110, 0.18) 0%, rgba(144, 221, 240, 0.12) 35%, rgba(240, 237, 238, 0.85) 65%, #ffffff 100%)";
  } else if (experience.id === "time-night") {
    lightGradient = "radial-gradient(ellipse at 75% 25%, rgba(7, 57, 60, 0.2) 0%, rgba(44, 102, 110, 0.12) 40%, rgba(240, 237, 238, 0.9) 70%, #ffffff 100%)";
  } else if (experience.id === "independence-day") {
    lightGradient = "radial-gradient(ellipse at 80% 20%, rgba(249, 115, 22, 0.16) 0%, rgba(16, 185, 129, 0.1) 45%, rgba(240, 237, 238, 0.85) 75%, #ffffff 100%)";
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out z-0"
      style={{
        background: lightGradient,
      }}
    >
      {/* Subtle Hairline Editorial Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,9,12,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,9,12,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-60" />
      
      {/* Soft Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/20 pointer-events-none" />
    </div>
  );
}
