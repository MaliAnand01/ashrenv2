import { OccasionConfig } from "./types";

export const INDIAN_OCCASIONS: Record<string, OccasionConfig> = {
  "independence-day": {
    id: "independence-day",
    name: "Independence Day",
    startDate: "08-10",
    endDate: "08-16",
    priority: 150,
    badge: {
      text: "78th Independence Day Edition",
      subtext: "Celebrating Indian Engineering & Heritage",
      colors: {
        bg: "rgba(249, 115, 22, 0.15)",
        text: "#FB923C",
        border: "rgba(249, 115, 22, 0.4)",
      },
    },
    theme: {
      accentColor: "#F97316", // Saffron
      secondaryColor: "#10B981", // Emerald India Green
      ambientGlow: "rgba(249, 115, 22, 0.22)",
    },
    heroContent: {
      editorialTag: "AZADI SPECIAL • BHARAT ATELIER MASTERWORKS",
      headline: "Crafted in India. Revered Worldwide.",
      subheadline: "From supersonic aerodynamic 4K drones to four-century-old Jaipur Jadau goldwork, discover indigenous luxury forged for a rising nation.",
      ctaText: "EXPLORE NATIONAL ATELIER",
      secondaryCtaText: "ORDER VIA WHATSAPP",
    },
    layers: {
      backgroundGradient: "radial-gradient(ellipse at 75% 25%, rgba(249,115,22,0.18) 0%, rgba(16,185,129,0.1) 40%, rgba(12,14,20,0.98) 75%, #07080b 100%)",
      atmosphereOverlay: "tricolor-ambient",
      effectType: "tricolor-particles",
      lightingTint: "#F97316",
    },
    featuredProductSlug: "ashren-royal-heritage-jewellery-set",
  },
  "diwali": {
    id: "diwali",
    name: "Diwali Mahotsav",
    startDate: "10-25",
    endDate: "11-05",
    priority: 160,
    badge: {
      text: "Shubh Deepavali Collection",
      subtext: "Festive Wholesale Allotments Live",
      colors: {
        bg: "rgba(212, 175, 55, 0.15)",
        text: "#D4AF37",
        border: "rgba(212, 175, 55, 0.4)",
      },
    },
    theme: {
      accentColor: "#D4AF37",
      secondaryColor: "#E11D48",
      ambientGlow: "rgba(212, 175, 55, 0.25)",
    },
    heroContent: {
      editorialTag: "DEEPAVALI SHUBH MUHURAT • JAIPUR GUILD",
      headline: "Illuminate Your World With Royal Artistry.",
      subheadline: "Handcrafted 22K Kundan gold filigree, pure mulberry zardozi couture, and studio acoustic soundstages tailored for the grandest festive gatherings.",
      ctaText: "EXPLORE DIWALI ATELIER",
      secondaryCtaText: "ORDER VIA WHATSAPP",
    },
    layers: {
      backgroundGradient: "radial-gradient(ellipse at 75% 20%, rgba(212,175,55,0.22) 0%, rgba(225,29,72,0.12) 40%, rgba(14,10,18,0.98) 70%, #07080b 100%)",
      effectType: "diwali-glow",
      lightingTint: "#D4AF37",
    },
    featuredProductSlug: "ashren-imperial-anarkali-ensemble",
  },
};
