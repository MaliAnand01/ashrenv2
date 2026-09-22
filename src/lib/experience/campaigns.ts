import { CampaignConfig } from "./types";

export const ACTIVE_CAMPAIGNS: Record<string, CampaignConfig> = {
  "monsoon-tech-sale": {
    id: "monsoon-tech-sale",
    name: "Great Indian Monsoon Sale",
    active: false, // can be toggled by admin
    priority: 200,
    startDate: "2026-06-15",
    endDate: "2026-08-31",
    theme: {
      accentColor: "#0284C7",
      ambientGlow: "rgba(2, 132, 199, 0.25)",
    },
    heroContent: {
      editorialTag: "MONSOON SURPLUS SALE • PAN-INDIA DISPATCH",
      headline: "Hydrophobic Masterpieces. Zero Distraction.",
      subheadline: "IP68 waterproof audio monitors and ruggedized outdoor action cameras engineered to brave the heaviest Indian monsoon downpours.",
      ctaText: "SHOP MONSOON LOTS",
      secondaryCtaText: "WHATSAPP PROCUREMENT",
    },
    layers: {
      backgroundGradient: "radial-gradient(ellipse at 75% 25%, rgba(2,132,199,0.2) 0%, rgba(10,18,28,0.98) 50%, #06090e 100%)",
      effectType: "rain",
    },
    collectionId: "monsoon-products",
    featuredProductSlug: "ashren-apex-studio-anc-headset",
  },
};
