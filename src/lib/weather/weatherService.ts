import { WeatherAtmosphere, WeatherStateId, UserLocation } from "./types";

export const DEFAULT_LOCATION: UserLocation = {
  city: "Jaipur",
  region: "Rajasthan",
  country: "India",
  latitude: 26.9124,
  longitude: 75.7873,
};

export const WEATHER_ATMOSPHERES: Record<WeatherStateId, WeatherAtmosphere> = {
  CLEAR_DAY: {
    id: "CLEAR_DAY",
    label: "Clear Day",
    conditionName: "Crisp Sunlight • 28°",
    temperature: 28,
    headline: "Made for brighter days.",
    subheadline: "Architectural precision under pure light. Explore the ultra-clarity collection designed for limitless horizons.",
    theme: "dark",
    gradientBg: "radial-gradient(ellipse at 75% 20%, rgba(212,175,55,0.18) 0%, rgba(18,21,28,0.95) 45%, #08090C 100%)",
    ambientGlow: "rgba(235, 195, 100, 0.25)",
    accentColor: "#D4AF37",
    particleType: "sunflare",
    productShadow: "0 30px 60px -12px rgba(212,175,55,0.25)",
    heroProductSlug: "ashren-phantom-4k-drone",
  },
  CLOUDY_DAY: {
    id: "CLOUDY_DAY",
    label: "Cloudy Day",
    conditionName: "Overcast Atmosphere • 24°",
    temperature: 24,
    headline: "Quiet power in muted skies.",
    subheadline: "Diffused light reveals raw textural fidelity. Subtle, monolithic, and impeccably balanced.",
    theme: "dark",
    gradientBg: "radial-gradient(ellipse at 70% 30%, rgba(148,163,184,0.15) 0%, rgba(15,18,24,0.98) 50%, #08090C 100%)",
    ambientGlow: "rgba(148, 163, 184, 0.2)",
    accentColor: "#94A3B8",
    particleType: "clouds",
    productShadow: "0 25px 50px -10px rgba(0,0,0,0.7)",
    heroProductSlug: "ashren-aero-pro-wireless-earbuds",
  },
  RAIN: {
    id: "RAIN",
    label: "Rain",
    conditionName: "Monsoon Mist • 22°",
    temperature: 22,
    headline: "Rain outside. Style stays inside.",
    subheadline: "Hydrophobic acoustic chambers with studio-grade noise isolation. Immerse yourself in total sanctuary.",
    theme: "dark",
    gradientBg: "radial-gradient(ellipse at 80% 25%, rgba(56,189,248,0.15) 0%, rgba(10,16,26,0.95) 50%, #05070B 100%)",
    ambientGlow: "rgba(56, 189, 248, 0.22)",
    accentColor: "#38BDF8",
    particleType: "rain",
    productShadow: "0 35px 70px -15px rgba(56,189,248,0.2)",
    heroProductSlug: "ashren-apex-studio-anc-headset",
  },
  STORM: {
    id: "STORM",
    label: "Storm",
    conditionName: "Electric Gale • 20°",
    temperature: 20,
    headline: "Engineered to withstand the surge.",
    subheadline: "Industrial-strength titanium frames and zero-latency haptic response built for high-voltage sessions.",
    theme: "dark",
    gradientBg: "radial-gradient(ellipse at 75% 20%, rgba(129,140,248,0.2) 0%, rgba(15,12,30,0.95) 50%, #06050B 100%)",
    ambientGlow: "rgba(129, 140, 248, 0.28)",
    accentColor: "#818CF8",
    particleType: "lightning",
    productShadow: "0 35px 70px -10px rgba(129,140,248,0.25)",
    heroProductSlug: "ashren-titan-pro-gaming-controller",
  },
  WIND: {
    id: "WIND",
    label: "Wind",
    conditionName: "High Velocity Air • 23°",
    temperature: 23,
    headline: "Aerodynamic poise in motion.",
    subheadline: "Streamlined silhouettes engineered to slice through crosswinds with effortless acoustic clarity.",
    theme: "dark",
    gradientBg: "radial-gradient(ellipse at 65% 25%, rgba(45,212,191,0.15) 0%, rgba(11,20,24,0.96) 50%, #060A0D 100%)",
    ambientGlow: "rgba(45, 212, 191, 0.22)",
    accentColor: "#2DD4BF",
    particleType: "wind",
    productShadow: "0 30px 60px -12px rgba(45,212,191,0.2)",
    heroProductSlug: "ashren-phantom-4k-drone",
  },
  SNOW: {
    id: "SNOW",
    label: "Snow",
    conditionName: "Alpine Frost • -2°",
    temperature: -2,
    headline: "Purity sculpted in cold silence.",
    subheadline: "Ultra-dense frosted chassis resilient down to sub-zero expeditions. Unyielding luxury performance.",
    theme: "dark",
    gradientBg: "radial-gradient(ellipse at 70% 25%, rgba(224,242,254,0.2) 0%, rgba(12,18,26,0.97) 50%, #070A0F 100%)",
    ambientGlow: "rgba(224, 242, 254, 0.25)",
    accentColor: "#BAE6FD",
    particleType: "snow",
    productShadow: "0 30px 60px -10px rgba(186,230,253,0.25)",
    heroProductSlug: "ashren-aero-pro-wireless-earbuds",
  },
  CLEAR_NIGHT: {
    id: "CLEAR_NIGHT",
    label: "Clear Night",
    conditionName: "Midnight Horizon • 19°",
    temperature: 19,
    headline: "Quiet dominance in the dark.",
    subheadline: "Deep obsidian tones and responsive RGB backlighting. The focal point of your nocturnal command center.",
    theme: "dark",
    gradientBg: "radial-gradient(ellipse at 75% 25%, rgba(99,102,241,0.18) 0%, rgba(9,10,18,0.98) 50%, #050608 100%)",
    ambientGlow: "rgba(99, 102, 241, 0.22)",
    accentColor: "#818CF8",
    particleType: "stars",
    productShadow: "0 40px 80px -15px rgba(99,102,241,0.3)",
    heroProductSlug: "ashren-titan-pro-gaming-controller",
  },
  CLOUDY_NIGHT: {
    id: "CLOUDY_NIGHT",
    label: "Cloudy Night",
    conditionName: "Nocturnal Mist • 18°",
    temperature: 18,
    headline: "Veiled elegance after dusk.",
    subheadline: "Sensory mastery calibrated for late-night fidelity. Discover nuanced audio textures in total intimacy.",
    theme: "dark",
    gradientBg: "radial-gradient(ellipse at 80% 20%, rgba(100,116,139,0.18) 0%, rgba(10,11,15,0.98) 50%, #060709 100%)",
    ambientGlow: "rgba(100, 116, 139, 0.2)",
    accentColor: "#94A3B8",
    particleType: "clouds",
    productShadow: "0 35px 70px -15px rgba(0,0,0,0.85)",
    heroProductSlug: "ashren-apex-studio-anc-headset",
  },
  SUNRISE: {
    id: "SUNRISE",
    label: "Sunrise",
    conditionName: "Dawn Radiance • 21°",
    temperature: 21,
    headline: "Awaken to handcrafted splendor.",
    subheadline: "22K gold filigree catching the first rays of daybreak. Heritage artistry tailored for modern royalty.",
    theme: "dark",
    gradientBg: "radial-gradient(ellipse at 75% 30%, rgba(251,146,60,0.22) 0%, rgba(22,14,18,0.96) 50%, #0A070B 100%)",
    ambientGlow: "rgba(251, 146, 60, 0.25)",
    accentColor: "#FB923C",
    particleType: "sunflare",
    productShadow: "0 30px 65px -12px rgba(251,146,60,0.28)",
    heroProductSlug: "ashren-royal-heritage-jewellery-set",
  },
  SUNSET: {
    id: "SUNSET",
    label: "Sunset",
    conditionName: "Golden Hour Glow • 26°",
    temperature: 26,
    headline: "Dusk draped in couture majesty.",
    subheadline: "Hand-embroidered zardozi and raw silk silhouettes catching the amber glow of evening twilight.",
    theme: "dark",
    gradientBg: "radial-gradient(ellipse at 75% 25%, rgba(244,63,94,0.2) 0%, rgba(212,175,55,0.15) 30%, rgba(20,10,15,0.97) 60%, #090508 100%)",
    ambientGlow: "rgba(244, 63, 94, 0.25)",
    accentColor: "#F43F5E",
    particleType: "sunflare",
    productShadow: "0 35px 70px -15px rgba(244,63,94,0.25)",
    heroProductSlug: "ashren-imperial-anarkali-ensemble",
  },
};

export function determineAtmosphereFromWeather(
  code: number,
  isDay: boolean,
  temp: number
): WeatherStateId {
  // WMO weather interpretation code mapping
  if (code >= 95) return "STORM";
  if (code >= 71 && code <= 86) return "SNOW";
  if (code >= 51 && code <= 67) return "RAIN";
  if (code >= 80 && code <= 82) return "RAIN";
  if (code >= 1 && code <= 3) return isDay ? "CLOUDY_DAY" : "CLOUDY_NIGHT";
  
  // Clear sky
  if (!isDay) return "CLEAR_NIGHT";
  if (temp > 30) return "CLEAR_DAY";
  return "CLEAR_DAY";
}

export async function fetchLiveWeather(lat: number, lon: number): Promise<{
  temp: number;
  weatherCode: number;
  isDay: boolean;
}> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,weather_code&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather API error");
    const data = await res.json();
    return {
      temp: Math.round(data.current.temperature_2m),
      weatherCode: data.current.weather_code,
      isDay: Boolean(data.current.is_day),
    };
  } catch {
    // Graceful fallback
    const hour = new Date().getHours();
    const isDay = hour >= 6 && hour < 19;
    return {
      temp: 26,
      weatherCode: 0,
      isDay,
    };
  }
}
