"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { WeatherCondition } from "@/lib/experience/types";
import { CloudSun } from "lucide-react";

// Dynamically import DotLottieReact with ssr: false for Next.js hydration safety
const DotLottieReact = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <CloudSun className="w-5 h-5 text-stormy_teal animate-pulse" />
      </div>
    ),
  }
);

interface WeatherLottieProps {
  condition: WeatherCondition | string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export function WeatherLottie({
  condition,
  className = "w-8 h-8",
  loop = true,
  autoplay = true,
}: WeatherLottieProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Map condition to real user-added lottie asset
  let assetPath = "/wheather-assets/Weather-partly cloudy.lottie";

  const cond = condition.toLowerCase();
  if (cond.includes("night")) {
    assetPath = "/wheather-assets/Weather-night.lottie";
  } else if (cond.includes("shower")) {
    assetPath = "/wheather-assets/Weather-partly shower.lottie";
  } else if (cond.includes("rain") || cond.includes("monsoon")) {
    assetPath = "/wheather-assets/Weather-Rainy.lottie";
  } else if (cond.includes("storm")) {
    assetPath = "/wheather-assets/rainy icon.lottie";
  } else if (cond.includes("fog") || cond.includes("snow") || cond.includes("wind")) {
    assetPath = "/wheather-assets/Foggy.lottie";
  } else {
    // clear-day, partly-cloudy, daytime
    assetPath = "/wheather-assets/Weather-partly cloudy.lottie";
  }

  if (!mounted) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <CloudSun className="w-5 h-5 text-stormy_teal animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
      <DotLottieReact
        src={assetPath}
        loop={loop}
        autoplay={autoplay}
        className="w-full h-full"
      />
    </div>
  );
}
