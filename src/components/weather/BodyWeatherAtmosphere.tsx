"use client";

import React from "react";
import { useExperience } from "@/lib/experience/ExperienceContext";
import { WeatherLottie } from "@/components/weather/WeatherLottie";

export function BodyWeatherAtmosphere() {
  const { userContext } = useExperience();
  const condition = (userContext.weather.condition || "clear-day").toLowerCase();

  const isRain = condition.includes("rain") || condition.includes("shower") || condition.includes("storm");
  const isFog = condition.includes("fog");
  const isNight = condition.includes("night");

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* 1. Large Ambient Weather Lottie floating gently in the top-right sky horizon */}
      <div className="absolute -top-10 right-4 sm:right-16 w-64 h-64 sm:w-80 sm:h-80 opacity-25 filter blur-[0.5px] transition-opacity duration-1000">
        <WeatherLottie
          condition={condition}
          className="w-full h-full"
          loop={true}
          autoplay={true}
        />
      </div>

      {/* 2. Soft Ambient Sky Tint according to weather */}
      {isNight && (
        <div className="absolute inset-0 bg-gradient-to-b from-dark_teal/10 via-stormy_teal/5 to-transparent transition-opacity duration-1000" />
      )}

      {isFog && (
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent transition-opacity duration-1000" />
      )}

      {/* 3. Subtle Falling Rain Streaks (rendered only when raining) */}
      {isRain && (
        <div className="absolute inset-0 opacity-20">
          {[...Array(18)].map((_, i) => (
            <span
              key={i}
              className="absolute block w-[1.5px] bg-dark_teal/40 rounded-full animate-rain-drop"
              style={{
                left: `${(i * 5.5 + 4)}%`,
                top: `-20px`,
                height: `${28 + (i % 5) * 12}px`,
                animationDelay: `${(i * 0.22) % 2.5}s`,
                animationDuration: `${0.9 + (i % 4) * 0.2}s`,
                animationIterationCount: "infinite",
              }}
            />
          ))}
        </div>
      )}

      {/* 4. Subtle Celestial Twinkle Dots (rendered only at night) */}
      {isNight && (
        <div className="absolute inset-0 opacity-30">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 rounded-full bg-dark_teal animate-ping"
              style={{
                left: `${(i * 8 + 7)}%`,
                top: `${(i * 5 + 8)}%`,
                animationDuration: `${3 + (i % 3)}s`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>
      )}

    </div>
  );
}
