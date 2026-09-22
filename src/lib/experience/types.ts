export type WeatherCondition =
  | "clear-day"
  | "partly-cloudy"
  | "cloudy"
  | "rain"
  | "heavy-rain"
  | "storm"
  | "wind"
  | "fog"
  | "snow"
  | "clear-night"
  | "cloudy-night"
  | "sunrise"
  | "sunset";

export type TimeOfDay = "morning" | "day" | "evening" | "night";

export interface GeoLocation {
  city: string;
  state?: string;
  country: string;
  pincode?: string;
  latitude: number;
  longitude: number;
  isPermissionGranted: boolean;
}

export interface WeatherData {
  condition: WeatherCondition;
  temperature: number;
  humidity?: number;
  windSpeed?: number;
  precipitation?: number;
  sunrise?: string;
  sunset?: string;
  feelsLike?: number;
}

export interface UserContext {
  location: GeoLocation;
  weather: WeatherData;
  timeOfDay: TimeOfDay;
  date: Date;
  activeOccasionId?: string | null;
  activeCampaignId?: string | null;
}

export interface OccasionConfig {
  id: string;
  name: string;
  startDate: string; // MM-DD or YYYY-MM-DD
  endDate: string;
  priority: number;
  badge: {
    text: string;
    subtext?: string;
    colors: {
      bg: string;
      text: string;
      border: string;
    };
  };
  theme: {
    accentColor: string;
    secondaryColor: string;
    ambientGlow: string;
  };
  heroContent: {
    headline: string;
    subheadline: string;
    editorialTag: string;
    ctaText: string;
    secondaryCtaText: string;
  };
  layers: {
    backgroundGradient: string;
    atmosphereOverlay?: string;
    effectType: "none" | "tricolor-particles" | "diwali-glow" | "rain" | "stars";
    lightingTint: string;
  };
  featuredProductSlug: string;
}

export interface CampaignConfig {
  id: string;
  name: string;
  active: boolean;
  priority: number;
  startDate: string;
  endDate: string;
  theme: {
    accentColor: string;
    ambientGlow: string;
  };
  heroContent: {
    headline: string;
    subheadline: string;
    editorialTag: string;
    ctaText: string;
    secondaryCtaText: string;
  };
  layers: {
    backgroundGradient: string;
    effectType: "none" | "rain" | "heavy-rain" | "storm" | "night-glow";
  };
  collectionId: string;
  featuredProductSlug: string;
}

export interface ExperienceConfig {
  id: string;
  resolvedSource: "campaign" | "occasion" | "weather" | "time" | "default";
  sourceName: string;
  
  // Contextual copy (Indian ecommerce tone)
  heroContent: {
    editorialTag: string;
    headline: string;
    subheadline: string;
    ctaText: string;
    secondaryCtaText: string;
    locationContextCopy?: string;
  };

  // Theming & Accents
  theme: {
    accentColor: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    badgeLabel: string;
    badgeSublabel?: string;
  };

  // Independent Visual Layers
  layers: {
    background: {
      gradient: string;
      radialOverlay?: string;
    };
    atmosphere: {
      hasClouds?: boolean;
      cloudOpacity?: number;
      hasSunflare?: boolean;
      hasStars?: boolean;
      hasMoon?: boolean;
      fogDensity?: number;
    };
    effects: {
      type: "none" | "rain" | "heavy-rain" | "storm" | "night-glow" | "tricolor-particles" | "diwali-glow" | "stars";
      intensity?: number;
    };
    lighting: {
      ambientColor: string;
      spotlightPosition: string; // e.g. "center", "top-right"
      spotlightGlow: string;
      productShadow: string;
    };
  };

  // Staged Product
  featuredProductSlug: string;
}
