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

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  weatherState: WeatherStateId;
  setWeatherState: (state: WeatherStateId) => void;
  atmosphere: WeatherAtmosphere;
  userLocation: UserLocation;
  isWeatherAuto: boolean;
  setIsWeatherAuto: (auto: boolean) => void;
  requestLiveLocation: () => Promise<void>;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Wishlist
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
  
  // Cart initialized with a default item for instant demo
  const [cart, setCart] = useState<CartItem[]>([
    { product: ASHREN_PRODUCTS[0], quantity: 1 },
    { product: ASHREN_PRODUCTS[1], quantity: 1 },
  ]);

  const [wishlist, setWishlist] = useState<string[]>(["prod-01", "prod-05"]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(["prod-03", "prod-02", "prod-06"]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [whatsAppOrderProduct, setWhatsAppOrderProduct] = useState<Product | null>(null);
  const [activeReel, setActiveReel] = useState<CreatorReel | null>(null);
  const [conciergeOpen, setConciergeOpen] = useState(false);

  // Cart operations
  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Derive atmosphere
  const atmosphere = WEATHER_ATMOSPHERES[weatherState] || WEATHER_ATMOSPHERES.CLEAR_DAY;

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
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const geoData = await geoRes.json();
          const city =
            geoData.address?.city ||
            geoData.address?.town ||
            geoData.address?.suburb ||
            geoData.address?.state_district ||
            "Jaipur";
          const state = geoData.address?.state || "Rajasthan";

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
        console.warn("Geolocation fallback:", error.message);
      },
      { timeout: 8000 }
    );
  }, []);

  useEffect(() => {
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
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
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
