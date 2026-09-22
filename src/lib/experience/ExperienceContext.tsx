"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  UserContext,
  ExperienceConfig,
  GeoLocation,
  WeatherData,
  TimeOfDay,
} from "./types";
import { resolveUserLocation, DEFAULT_INDIAN_LOCATION, POPULAR_INDIAN_HUBS } from "./locationService";
import { fetchNormalizedWeather, resolveTimeOfDay } from "./weatherService";
import { resolveExperience } from "./resolver";

interface ExperienceContextValue {
  userContext: UserContext;
  experience: ExperienceConfig;
  isAutoDetected: boolean;
  
  // Interactive Simulation Controls (For client presentation and instant switching between the 4 core experiences)
  setPresetExperience: (preset: "clear-day" | "rain" | "shower" | "foggy" | "night" | "independence-day" | string) => void;
  setUserCity: (cityName: string) => void;
  syncLiveEnvironment: () => Promise<void>;
}

const ExperienceContext = createContext<ExperienceContextValue | undefined>(undefined);

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<GeoLocation>(DEFAULT_INDIAN_LOCATION);
  const [weather, setWeather] = useState<WeatherData>({
    condition: "clear-day",
    temperature: 28,
    feelsLike: 29,
    humidity: 50,
    windSpeed: 12,
  });
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
  const [activeOccasionId, setActiveOccasionId] = useState<string | null>(null);
  const [activeCampaignId, setActiveCampaignId] = useState<string | null>(null);
  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(true);

  // Derive user context
  const userContext: UserContext = {
    location,
    weather,
    timeOfDay,
    date: new Date(),
    activeOccasionId,
    activeCampaignId,
  };

  // Resolved experience configuration through the pure resolver
  const experience = resolveExperience(userContext);

  // Live Sync handler
  const syncLiveEnvironment = useCallback(async () => {
    try {
      const loc = await resolveUserLocation();
      setLocation(loc);
      const wth = await fetchNormalizedWeather(loc.latitude, loc.longitude);
      setWeather(wth);
      setTimeOfDay(resolveTimeOfDay());
      setIsAutoDetected(true);
      setActiveOccasionId(null);
      setActiveCampaignId(null);
    } catch {
      // Graceful fallback
      setLocation(DEFAULT_INDIAN_LOCATION);
    }
  }, []);

  // Initial silent resolution on mount
  useEffect(() => {
    syncLiveEnvironment();
  }, [syncLiveEnvironment]);

  // Preset Switcher for the 4 core experiences: Clear Day, Rain, Night, Independence Day
  const setPresetExperience = useCallback(
    (preset: "clear-day" | "rain" | "shower" | "foggy" | "night" | "independence-day" | string) => {
      setIsAutoDetected(false);
      if (preset === "independence-day") {
        setActiveOccasionId("independence-day");
        setActiveCampaignId(null);
      } else if (preset === "rain") {
        setActiveOccasionId(null);
        setActiveCampaignId(null);
        setWeather((prev) => ({ ...prev, condition: "rain", temperature: 22 }));
        setTimeOfDay("day");
      } else if (preset === "shower") {
        setActiveOccasionId(null);
        setActiveCampaignId(null);
        setWeather((prev) => ({ ...prev, condition: "rain", temperature: 24 }));
        setTimeOfDay("day");
      } else if (preset === "foggy") {
        setActiveOccasionId(null);
        setActiveCampaignId(null);
        setWeather((prev) => ({ ...prev, condition: "fog", temperature: 18 }));
        setTimeOfDay("day");
      } else if (preset === "night") {
        setActiveOccasionId(null);
        setActiveCampaignId(null);
        setWeather((prev) => ({ ...prev, condition: "clear-night", temperature: 19 }));
        setTimeOfDay("night");
      } else {
        // clear-day
        setActiveOccasionId(null);
        setActiveCampaignId(null);
        setWeather((prev) => ({ ...prev, condition: "clear-day", temperature: 28 }));
        setTimeOfDay("day");
      }
    },
    []
  );

  // City Switcher
  const setUserCity = useCallback((cityName: string) => {
    const hub = POPULAR_INDIAN_HUBS.find(
      (h) => h.city.toLowerCase() === cityName.toLowerCase()
    );
    if (hub) {
      setLocation(hub);
    } else {
      setLocation((prev) => ({ ...prev, city: cityName }));
    }
  }, []);

  return (
    <ExperienceContext.Provider
      value={{
        userContext,
        experience,
        isAutoDetected,
        setPresetExperience,
        setUserCity,
        syncLiveEnvironment,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useExperience must be used within an ExperienceProvider");
  }
  return context;
}
