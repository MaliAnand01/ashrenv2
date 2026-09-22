"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { WeatherStateId, WeatherAtmosphere, UserLocation } from "@/lib/weather/types";
import {
  DEFAULT_LOCATION,
  WEATHER_ATMOSPHERES,
  fetchLiveWeather,
  determineAtmosphereFromWeather,
} from "@/lib/weather/weatherService";
import { Product, ASHREN_PRODUCTS } from "@/data/products";
import { CreatorReel } from "@/data/creators";

interface StoreContextType {
  weatherState: WeatherStateId;
  setWeatherState: (state: WeatherStateId) => void;
  atmosphere: WeatherAtmosphere;
  userLocation: UserLocation;
  isWeatherAuto: boolean;
  setIsWeatherAuto: (auto: boolean) => void;
  requestLiveLocation: () => Promise<void>;
  
  // E-commerce interactions
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
  
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  
  whatsAppOrderProduct: Product | null;
  setWhatsAppOrderProduct: (product: Product | null) => void;
  
  activeReel: CreatorReel | null;
  setActiveReel: (reel: CreatorReel | null) => void;
  
  conciergeOpen: boolean;
  setConciergeOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [weatherState, setWeatherStateInternal] = useState<WeatherStateId>("CLEAR_DAY");
  const [userLocation, setUserLocation] = useState<UserLocation>(DEFAULT_LOCATION);
  const [isWeatherAuto, setIsWeatherAuto] = useState<boolean>(true);
  
  const [wishlist, setWishlist] = useState<string[]>(["prod-01", "prod-05"]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(["prod-03", "prod-02", "prod-06"]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [whatsAppOrderProduct, setWhatsAppOrderProduct] = useState<Product | null>(null);
  const [activeReel, setActiveReel] = useState<CreatorReel | null>(null);
  const [conciergeOpen, setConciergeOpen] = useState(false);

  // Derive atmosphere
  const atmosphere = WEATHER_ATMOSPHERES[weatherState] || WEATHER_ATMOSPHERES.CLEAR_DAY;

  // Custom setter that can override auto
  const setWeatherState = useCallback((state: WeatherStateId) => {
    setIsWeatherAuto(false);
    setWeatherStateInternal(state);
  }, []);

  const requestLiveLocation = useCallback(async () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Attempt reverse geocoding via free public API or approximate
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const geoData = await geoRes.json();
          const city =
            geoData.address?.city ||
            geoData.address?.town ||
            geoData.address?.suburb ||
            geoData.address?.state_district ||
            "Local City";
          const state = geoData.address?.state || "";

          setUserLocation({
            city,
            region: state,
            country: geoData.address?.country || "India",
            latitude,
            longitude,
            isCustom: true,
          });

          const weatherData = await fetchLiveWeather(latitude, longitude);
          const derivedState = determineAtmosphereFromWeather(
            weatherData.weatherCode,
            weatherData.isDay,
            weatherData.temp
          );
          setWeatherStateInternal(derivedState);
        } catch {
          // Fallback location
          setUserLocation({
            city: "Jaipur",
            region: "Rajasthan",
            country: "India",
            latitude,
            longitude,
            isCustom: true,
          });
        }
      },
      (error) => {
        console.warn("Geolocation denied or unavailable:", error.message);
        // Retain default Jaipur
      },
      { timeout: 8000 }
    );
  }, []);

  useEffect(() => {
    // Initial silent check on mount
    requestLiveLocation();
  }, [requestLiveLocation]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const addRecentlyViewed = useCallback((product: Product) => {
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== product.id);
      return [product.id, ...filtered].slice(0, 8);
    });
  }, []);

  const recentlyViewed = recentlyViewedIds
    .map((id) => ASHREN_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <StoreContext.Provider
      value={{
        weatherState,
        setWeatherState,
        atmosphere,
        userLocation,
        isWeatherAuto,
        setIsWeatherAuto,
        requestLiveLocation,
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewed,
        addRecentlyViewed,
        searchOpen,
        setSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        whatsAppOrderProduct,
        setWhatsAppOrderProduct,
        activeReel,
        setActiveReel,
        conciergeOpen,
        setConciergeOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
