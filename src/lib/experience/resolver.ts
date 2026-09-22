import { UserContext, ExperienceConfig } from "./types";
import { INDIAN_OCCASIONS } from "./occasions";
import { ACTIVE_CAMPAIGNS } from "./campaigns";

export function resolveExperience(context: UserContext): ExperienceConfig {
  const { location, weather, timeOfDay, activeCampaignId, activeOccasionId } = context;
  const cityName = location.city || "Jaipur";
  const temp = weather.temperature;

  // PRIORITY 1: Active Marketing Campaign Override
  if (activeCampaignId && ACTIVE_CAMPAIGNS[activeCampaignId]) {
    const camp = ACTIVE_CAMPAIGNS[activeCampaignId];
    return {
      id: camp.id,
      resolvedSource: "campaign",
      sourceName: camp.name,
      heroContent: {
        editorialTag: camp.heroContent.editorialTag,
        headline: camp.heroContent.headline,
        subheadline: camp.heroContent.subheadline,
        ctaText: camp.heroContent.ctaText,
        secondaryCtaText: camp.heroContent.secondaryCtaText,
        locationContextCopy: `Exclusive Wholesale Campaign Allotment for ${cityName}`,
      },
      theme: {
        accentColor: camp.theme.accentColor,
        badgeBg: "rgba(2, 132, 199, 0.15)",
        badgeText: "#38BDF8",
        badgeBorder: "rgba(2, 132, 199, 0.4)",
        badgeLabel: "Active Campaign",
        badgeSublabel: camp.name,
      },
      layers: {
        background: {
          gradient: camp.layers.backgroundGradient,
        },
        atmosphere: {
          hasClouds: true,
          cloudOpacity: 0.35,
        },
        effects: {
          type: camp.layers.effectType,
        },
        lighting: {
          ambientColor: camp.theme.ambientGlow,
          spotlightPosition: "center",
          spotlightGlow: camp.theme.ambientGlow,
          productShadow: "0 35px 70px -15px rgba(2, 132, 199, 0.3)",
        },
      },
      featuredProductSlug: camp.featuredProductSlug,
    };
  }

  // PRIORITY 2: Active Festival / Occasion
  if (activeOccasionId && INDIAN_OCCASIONS[activeOccasionId]) {
    const occ = INDIAN_OCCASIONS[activeOccasionId];
    return {
      id: occ.id,
      resolvedSource: "occasion",
      sourceName: occ.name,
      heroContent: {
        editorialTag: occ.heroContent.editorialTag,
        headline: occ.heroContent.headline,
        subheadline: occ.heroContent.subheadline,
        ctaText: occ.heroContent.ctaText,
        secondaryCtaText: occ.heroContent.secondaryCtaText,
        locationContextCopy: `Celebrating across ${cityName} • Dispatching from Jaipur Atelier`,
      },
      theme: {
        accentColor: occ.theme.accentColor,
        badgeBg: occ.badge.colors.bg,
        badgeText: occ.badge.colors.text,
        badgeBorder: occ.badge.colors.border,
        badgeLabel: occ.badge.text,
        badgeSublabel: occ.badge.subtext,
      },
      layers: {
        background: {
          gradient: occ.layers.backgroundGradient,
        },
        atmosphere: {
          hasSunflare: true,
          hasClouds: false,
        },
        effects: {
          type: occ.layers.effectType,
        },
        lighting: {
          ambientColor: occ.theme.ambientGlow,
          spotlightPosition: "top-right",
          spotlightGlow: occ.theme.ambientGlow,
          productShadow: "0 30px 60px -12px rgba(249, 115, 22, 0.3)",
        },
      },
      featuredProductSlug: occ.featuredProductSlug,
    };
  }

  // PRIORITY 3: Weather Experience (Rain / Heavy Rain / Storm)
  if (
    weather.condition === "rain" ||
    weather.condition === "heavy-rain" ||
    weather.condition === "storm"
  ) {
    const isStorm = weather.condition === "storm";
    return {
      id: "weather-rain",
      resolvedSource: "weather",
      sourceName: isStorm ? "Monsoon Storm" : "Monsoon Rain",
      heroContent: {
        editorialTag: isStorm
          ? `HIGH VOLTAGE MONSOON • ${cityName.toUpperCase()}`
          : `MONSOON SANCTUARY • ${cityName.toUpperCase()}`,
        headline: "Rain outside. Style stays inside.",
        subheadline: `Beryllium reference drivers encased in bead-blasted aluminum with -45dB hybrid acoustic isolation. Delivering uninterrupted focus across ${cityName}.`,
        ctaText: "EXPLORE WATERPROOF AUDIO",
        secondaryCtaText: "ORDER VIA WHATSAPP",
        locationContextCopy: `${temp}°C • Monsoon showers in ${cityName}`,
      },
      theme: {
        accentColor: "#38BDF8",
        badgeBg: "rgba(56, 189, 248, 0.12)",
        badgeText: "#38BDF8",
        badgeBorder: "rgba(56, 189, 248, 0.35)",
        badgeLabel: `${temp}°C • Monsoon in ${cityName}`,
        badgeSublabel: "Hydrophobic acoustics recommended",
      },
      layers: {
        background: {
          gradient:
            "radial-gradient(ellipse at 75% 25%, rgba(56,189,248,0.18) 0%, rgba(12,18,30,0.96) 50%, #06080d 100%)",
        },
        atmosphere: {
          hasClouds: true,
          cloudOpacity: 0.45,
          fogDensity: 0.2,
        },
        effects: {
          type: isStorm ? "storm" : "rain",
          intensity: isStorm ? 1.0 : 0.7,
        },
        lighting: {
          ambientColor: "rgba(56, 189, 248, 0.22)",
          spotlightPosition: "top-right",
          spotlightGlow: "rgba(56, 189, 248, 0.25)",
          productShadow: "0 35px 70px -15px rgba(56, 189, 248, 0.25)",
        },
      },
      featuredProductSlug: "ashren-apex-studio-anc-headset",
    };
  }

  // PRIORITY 4: Time of Day Experience (Night / Late Evening)
  if (timeOfDay === "night" || weather.condition === "clear-night" || weather.condition === "cloudy-night") {
    return {
      id: "time-night",
      resolvedSource: "time",
      sourceName: "Nocturnal Clarity",
      heroContent: {
        editorialTag: `NOCTURNAL PRECISION • ${cityName.toUpperCase()}`,
        headline: "Quiet Dominance in the Dark.",
        subheadline: `Zero-drift contactless Hall-Effect controllers with 1000Hz tournament polling and custom hair-trigger microswitches. Engineered for late-night creators and esports athletes in ${cityName}.`,
        ctaText: "EXPLORE ESPORTS HARDWARE",
        secondaryCtaText: "ORDER VIA WHATSAPP",
        locationContextCopy: `${temp}°C • Clear night skies over ${cityName}`,
      },
      theme: {
        accentColor: "#A855F7",
        badgeBg: "rgba(168, 85, 247, 0.12)",
        badgeText: "#C084FC",
        badgeBorder: "rgba(168, 85, 247, 0.35)",
        badgeLabel: `${temp}°C • Night in ${cityName}`,
        badgeSublabel: "Low-latency tournament hardware",
      },
      layers: {
        background: {
          gradient:
            "radial-gradient(ellipse at 75% 25%, rgba(168,85,247,0.18) 0%, rgba(99,102,241,0.1) 35%, rgba(10,12,20,0.98) 60%, #050609 100%)",
        },
        atmosphere: {
          hasStars: true,
          hasMoon: true,
          hasClouds: false,
        },
        effects: {
          type: "night-glow",
        },
        lighting: {
          ambientColor: "rgba(168, 85, 247, 0.22)",
          spotlightPosition: "top-right",
          spotlightGlow: "rgba(168, 85, 247, 0.3)",
          productShadow: "0 40px 80px -15px rgba(168, 85, 247, 0.3)",
        },
      },
      featuredProductSlug: "ashren-titan-pro-gaming-controller",
    };
  }

  // PRIORITY 5: Default Experience (Clear Day)
  return {
    id: "weather-clear-day",
    resolvedSource: "weather",
    sourceName: "Daylight Precision",
    heroContent: {
      editorialTag: `DAYLIGHT ARCHITECTURE • ${cityName.toUpperCase()} EDITION`,
      headline: "Made for brighter days.",
      subheadline: `High-altitude 4K HDR optical stabilization with aerospace carbon-fiber airframe. Engineered to slice through 54 km/h winds across Rajasthan and all Indian terrain.`,
      ctaText: "EXPLORE AERO COLLECTION",
      secondaryCtaText: "ORDER VIA WHATSAPP",
      locationContextCopy: `${temp}°C • Crisp sunlight in ${cityName} • Dispatching today`,
    },
    theme: {
      accentColor: "#D4AF37", // Champagne Gold
      badgeBg: "rgba(212, 175, 55, 0.12)",
      badgeText: "#E5C07B",
      badgeBorder: "rgba(212, 175, 55, 0.35)",
      badgeLabel: `${temp}°C • Sunny in ${cityName}`,
      badgeSublabel: "Delivering across India",
    },
    layers: {
      background: {
        gradient:
          "radial-gradient(ellipse at 75% 20%, rgba(212,175,55,0.18) 0%, rgba(18,22,30,0.95) 45%, #07080b 100%)",
      },
      atmosphere: {
        hasSunflare: true,
        hasClouds: true,
        cloudOpacity: 0.15,
      },
      effects: {
        type: "none",
      },
      lighting: {
        ambientColor: "rgba(212, 175, 55, 0.22)",
        spotlightPosition: "top-right",
        spotlightGlow: "rgba(235, 195, 100, 0.25)",
        productShadow: "0 30px 60px -12px rgba(212, 175, 55, 0.25)",
      },
    },
    featuredProductSlug: "ashren-phantom-4k-drone",
  };
}
