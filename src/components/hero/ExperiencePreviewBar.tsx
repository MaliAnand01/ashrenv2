"use client";

import React, { useState } from "react";
import { useExperience } from "@/lib/experience/ExperienceContext";
import { Sun, CloudRain, Moon, Flag, RefreshCw, MapPin } from "lucide-react";

export function ExperiencePreviewBar() {
  const { experience, setPresetExperience, userContext, setUserCity, syncLiveEnvironment } =
    useExperience();

  const [isSyncing, setIsSyncing] = useState(false);

  const presets = [
    {
      id: "clear-day",
      label: "1. Clear Day",
      icon: Sun,
      activeBg: "bg-dark_teal text-white",
    },
    {
      id: "rain",
      label: "2. Rain / Monsoon",
      icon: CloudRain,
      activeBg: "bg-stormy_teal text-white",
    },
    {
      id: "night",
      label: "3. Night Command",
      icon: Moon,
      activeBg: "bg-onyx text-white",
    },
    {
      id: "independence-day",
      label: "4. Independence Day",
      icon: Flag,
      activeBg: "bg-amber-600 text-white",
    },
  ] as const;

  const cities = ["Jaipur", "Mumbai", "Delhi NCR", "Bengaluru"];

  const handleSync = async () => {
    setIsSyncing(true);
    await syncLiveEnvironment();
    setTimeout(() => setIsSyncing(false), 900);
  };

  return (
    <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-[15]">
      {/* 4 Core Experience Selectors */}
      <div className="space-y-1.5">
        <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-white/65 block">
          Client Presentation Simulator (4 Core Production States):
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {presets.map((p) => {
            const Icon = p.icon;
            const isActive =
              (p.id === "clear-day" && experience.id === "weather-clear-day") ||
              (p.id === "rain" && experience.id === "weather-rain") ||
              (p.id === "night" && experience.id === "time-night") ||
              (p.id === "independence-day" && experience.id === "independence-day");

            return (
              <button
                key={p.id}
                onClick={() => setPresetExperience(p.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium flex items-center gap-1.5 transition-all ${
                  isActive
                    ? `${p.activeBg} font-bold shadow-apple-soft scale-102`
                    : "bg-[#12141a]/80 hover:bg-[#12141a] text-white/65 hover:text-white border border-white/10 shadow-sm"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Indian Cities Quick Filter & Live GPS Sync */}
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-[#12141a]/90 border border-white/10 rounded-full px-3 py-1.5 text-xs font-sans shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-dark_teal mr-1.5" />
          <select
            value={userContext.location.city}
            onChange={(e) => setUserCity(e.target.value)}
            className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-1 text-xs"
          >
            {cities.map((c) => (
              <option key={c} value={c} className="bg-[#12141a] text-white">
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-medium bg-[#12141a]/90 hover:bg-[#12141a] border border-white/10 text-white/65 hover:text-white shadow-sm transition-colors"
          title="Re-run live Geolocation and Open-Meteo weather"
        >
          <RefreshCw className={`w-3 h-3 text-dark_teal ${isSyncing ? "animate-spin" : ""}`} />
          <span>{isSyncing ? "Syncing..." : "Live GPS"}</span>
        </button>
      </div>
    </div>
  );
}
