export type WeatherStateId =
  | "CLEAR_DAY"
  | "CLOUDY_DAY"
  | "RAIN"
  | "STORM"
  | "WIND"
  | "SNOW"
  | "CLEAR_NIGHT"
  | "CLOUDY_NIGHT"
  | "SUNRISE"
  | "SUNSET";

export interface WeatherAtmosphere {
  id: WeatherStateId;
  label: string;
  conditionName: string;
  temperature: number;
  headline: string;
  subheadline: string;
  theme: "light" | "dark";
  gradientBg: string;
  ambientGlow: string;
  accentColor: string;
  particleType: "rain" | "snow" | "wind" | "lightning" | "stars" | "sunflare" | "clouds";
  productShadow: string;
  heroProductSlug: string;
}

export interface UserLocation {
  city: string;
  region?: string;
  country: string;
  latitude: number;
  longitude: number;
  isCustom?: boolean;
}
