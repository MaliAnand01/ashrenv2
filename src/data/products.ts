export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: "Tech & Gadgets" | "Royalty Jewellery" | "Haute Clothing";
  brand: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  wholesaleMOQ: number;
  wholesalePrice: number;
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isDeal?: boolean;
  dealEndsIn?: string;
  heroImage: string;
  transparentImage: string;
  gallery: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  weatherMatch: ("CLEAR_DAY" | "CLOUDY_DAY" | "RAIN" | "STORM" | "WIND" | "SNOW" | "CLEAR_NIGHT" | "CLOUDY_NIGHT" | "SUNRISE" | "SUNSET")[];
}

export const ASHREN_PRODUCTS: Product[] = [
  {
    id: "prod-01",
    slug: "ashren-wave-audio-smart-glasses",
    name: "Ashren Wave Audio Smart Glasses",
    tagline: "Polarized UV400 Protection with Wireless Bluetooth 5.3 Audio",
    category: "Tech & Gadgets",
    brand: "ASHREN TECH",
    price: 8999,
    originalPrice: 12999,
    discountPercent: 30,
    wholesaleMOQ: 5,
    wholesalePrice: 7200,
    rating: 4.8,
    reviewCount: 342,
    stock: 65,
    sku: "ASH-GLS-W01",
    isTrending: true,
    isBestSeller: true,
    heroImage: "/products/hero-asset-6.png",
    transparentImage: "/products/hero-asset-6.png",
    gallery: ["/products/hero-asset-6.png"],
    description:
      "Lightweight polarized sunglasses with built-in open-ear speakers and hands-free microphone. Listen to music and take clear phone calls while staying aware of your surroundings.",
    features: [
      "Open-ear directional speakers with zero sound leak",
      "UV400 polarized lenses for outdoor glare protection",
      "Bluetooth 5.3 with quick dual-device pairing",
      "8 hours battery life with fast magnetic USB charging",
    ],
    specs: {
      "Battery Life": "8 Hours Continuous Playback",
      "Connectivity": "Bluetooth 5.3 (10m Range)",
      "Lens": "TAC Polarized UV400",
      "Weight": "38 Grams",
      "Water Resistance": "IPX4 Sweat & Splash Resistant",
      "Warranty": "1 Year Replacement Warranty across India",
    },
    weatherMatch: ["CLEAR_DAY", "CLEAR_NIGHT", "SUNRISE"],
  },
  {
    id: "prod-02",
    slug: "ashren-studio-one-wireless-headphones",
    name: "Ashren Studio-One Wireless ANC Headphones",
    tagline: "High-Definition Sound with Active Noise Cancellation & Deep Bass",
    category: "Tech & Gadgets",
    brand: "ASHREN ACOUSTICS",
    price: 14999,
    originalPrice: 19999,
    discountPercent: 25,
    wholesaleMOQ: 5,
    wholesalePrice: 11500,
    rating: 4.9,
    reviewCount: 418,
    stock: 48,
    sku: "ASH-AUD-S01",
    isTrending: true,
    isBestSeller: true,
    heroImage: "/products/hero-asset-3.png",
    transparentImage: "/products/hero-asset-3.png",
    gallery: ["/products/hero-asset-3.png"],
    description:
      "Over-ear studio headphones featuring hybrid noise cancellation that blocks out flight and street noise. Fitted with memory foam cushions for all-day listening comfort.",
    features: [
      "40mm custom audio drivers tuned for balanced bass and vocal clarity",
      "Hybrid active noise cancellation reduces background noise up to 38dB",
      "50 hours battery backup with ANC off, 35 hours with ANC on",
      "Foldable metal headband with soft protein leather earcups",
    ],
    specs: {
      "Driver Unit": "40mm Dynamic Neodymium",
      "Noise Cancellation": "Dual Mic Hybrid ANC (-38dB)",
      "Battery Life": "50 Hours Playtime",
      "Charging": "Type-C Fast Charge (10 min charge = 5 hours play)",
      "Weight": "250 Grams",
      "Warranty": "1 Year Pan-India Warranty",
    },
    weatherMatch: ["RAIN", "STORM", "CLOUDY_DAY"],
  },
  {
    id: "prod-03",
    slug: "ashren-chrono-automatic-luxury-watch",
    name: "Ashren Chrono Royal Automatic Watch",
    tagline: "Mechanical Self-Winding Movement with Sapphire Crystal Glass",
    category: "Tech & Gadgets",
    brand: "ASHREN TIMEPIECES",
    price: 19499,
    originalPrice: 26999,
    discountPercent: 27,
    wholesaleMOQ: 3,
    wholesalePrice: 15500,
    rating: 4.9,
    reviewCount: 189,
    stock: 32,
    sku: "ASH-WTC-R01",
    isTrending: true,
    heroImage: "/products/hero-asset-5.png",
    transparentImage: "/products/hero-asset-5.png",
    gallery: ["/products/hero-asset-5.png"],
    description:
      "A classic mechanical watch that winds itself with your wrist movements. Protected by scratch-resistant sapphire crystal glass and a surgical grade 316L stainless steel case.",
    features: [
      "Automatic mechanical movement with 42 hours power reserve",
      "Scratch-proof pure sapphire crystal front glass",
      "316L solid stainless steel case and link bracelet",
      "100 meters water resistance with screw-down crown",
    ],
    specs: {
      "Movement": "Japanese Automatic 24-Jewel Self-Winding",
      "Case Diameter": "41mm",
      "Case Thickness": "11.5mm",
      "Glass": "Anti-Reflective Sapphire Crystal",
      "Water Resistance": "10 ATM / 100 Meters",
      "Warranty": "2 Years Atelier Movement Guarantee",
    },
    weatherMatch: ["CLEAR_DAY", "SUNSET", "CLEAR_NIGHT"],
  },
  {
    id: "prod-04",
    slug: "ashren-apex-pro-wireless-controller",
    name: "Ashren Apex Pro Wireless Controller",
    tagline: "Hall-Effect Magnetic Drift-Free Sticks for PC, Mobile & Console",
    category: "Tech & Gadgets",
    brand: "ASHREN GAMING",
    price: 5499,
    originalPrice: 7999,
    discountPercent: 31,
    wholesaleMOQ: 8,
    wholesalePrice: 4200,
    rating: 4.8,
    reviewCount: 520,
    stock: 90,
    sku: "ASH-CTL-P01",
    isBestSeller: true,
    heroImage: "/products/hero-asset-7.png",
    transparentImage: "/products/hero-asset-7.png",
    gallery: ["/products/hero-asset-7.png"],
    description:
      "Precision gaming controller with contactless magnetic Hall-effect thumbsticks that will never drift. Includes programmable back buttons and trigger stops for faster response.",
    features: [
      "Hall-effect magnetic joysticks with zero stick drift guaranteed",
      "Mechanical microswitch face buttons with tactile clicks",
      "Tri-mode connection: 2.4GHz wireless dongle, Bluetooth, and USB-C",
      "Rechargeable battery providing 28 hours continuous gameplay",
    ],
    specs: {
      "Compatibility": "PC, Windows, Steam Deck, Android, iOS, Switch",
      "Battery": "1000mAh Lithium-Ion (28 Hours)",
      "Latency": "Less than 2ms on 2.4GHz dongle",
      "Vibration": "Dual rumble motors with adjustable intensity",
      "Weight": "235 Grams",
      "Warranty": "1 Year Free Replacement Warranty",
    },
    weatherMatch: ["STORM", "CLEAR_NIGHT", "RAIN"],
  },
  {
    id: "prod-05",
    slug: "ashren-kundan-polki-emerald-choker",
    name: "22K Kundan Polki Emerald Choker",
    tagline: "Handmade in Jaipur with 22K Gold Foil, Real Polki & Natural Emeralds",
    category: "Royalty Jewellery",
    brand: "ASHREN JEWELLERY",
    price: 145000,
    originalPrice: 165000,
    discountPercent: 12,
    wholesaleMOQ: 2,
    wholesalePrice: 128000,
    rating: 5.0,
    reviewCount: 96,
    stock: 14,
    sku: "ASH-JWL-K01",
    isBestSeller: true,
    heroImage: "/products/hero-asset-4.png",
    transparentImage: "/products/hero-asset-4.png",
    gallery: ["/products/hero-asset-4.png", "/products/hero-asset-1.png"],
    description:
      "Handcrafted by master karigars of Johari Bazaar in Jaipur. Set with real uncut polki diamonds, genuine Zambian emerald drops, and detailed Meenakari enamel artwork on the reverse.",
    features: [
      "100% handcrafted in Jaipur by hereditary master goldsmiths",
      "Real uncut polki stones set in pure 24K gold foil bezels",
      "Natural emerald drops with matching adjustable dori cord",
      "Insured, tamper-proof courier delivery to all Indian pincodes",
    ],
    specs: {
      "Gold Purity": "22 Karat Hallmarked (BIS Certified)",
      "Gross Weight": "68.4 Grams",
      "Gemstones": "Natural Uncut Polki & Zambian Emeralds",
      "Certification": "BIS Hallmarked & Gemological Certificate Included",
      "Packaging": "Velvet-lined wooden safety chest with insurance documents",
      "Return Policy": "7-day inspection return & lifetime buyback guarantee",
    },
    weatherMatch: ["CLEAR_DAY", "SUNSET", "CLEAR_NIGHT"],
  },
  {
    id: "prod-06",
    slug: "ashren-jaipur-polki-heritage-bridal-set",
    name: "Jaipur Polki Heritage Bridal Set",
    tagline: "Grand Bridal Choker with Matching Chandbalis & Maang Tikka",
    category: "Royalty Jewellery",
    brand: "ASHREN JEWELLERY",
    price: 285000,
    originalPrice: 320000,
    discountPercent: 10,
    wholesaleMOQ: 2,
    wholesalePrice: 250000,
    rating: 5.0,
    reviewCount: 74,
    stock: 8,
    sku: "ASH-JWL-B01",
    isTrending: true,
    heroImage: "/products/hero-asset-1.png",
    transparentImage: "/products/hero-asset-1.png",
    gallery: ["/products/hero-asset-1.png", "/products/hero-asset-4.png"],
    description:
      "Complete wedding bridal set containing an ornate collar necklace, matching statement earrings, and an intricate maang tikka. Designed for Indian wedding ceremonies.",
    features: [
      "Complete 3-piece bridal suite: Necklace, Earrings, and Maang Tikka",
      "Hand-set uncut Polki diamonds with South Sea pearl drops",
      "Traditional Rajasthani Gulabi Meenakari reverse painting",
      "Includes BIS Hallmark seal and government approved appraiser certificate",
    ],
    specs: {
      "Gold Purity": "22 Karat BIS Hallmarked",
      "Gross Weight": "134.2 Grams",
      "Items Included": "1 Choker Necklace, 1 Pair Earrings, 1 Maang Tikka",
      "Pearls": "South Sea Cultured Pearls",
      "Delivery": "Special armored courier with 100% transit insurance",
      "Buyback": "Lifetime gold value buyback at prevailing market rates",
    },
    weatherMatch: ["CLEAR_DAY", "SUNSET", "CLEAR_NIGHT"],
  },
  {
    id: "prod-07",
    slug: "ashren-varanasi-silk-zardozi-anarkali",
    name: "Pure Varanasi Silk Heavy Zardozi Anarkali",
    tagline: "Hand-Woven Pure Katan Silk with Real Silver Zari Handwork",
    category: "Haute Clothing",
    brand: "ASHREN COUTURE",
    price: 48500,
    originalPrice: 59000,
    discountPercent: 17,
    wholesaleMOQ: 3,
    wholesalePrice: 39000,
    rating: 4.9,
    reviewCount: 162,
    stock: 22,
    sku: "ASH-CLT-A01",
    isBestSeller: true,
    heroImage: "/products/hero-asset-2.png",
    transparentImage: "/products/hero-asset-2.png",
    gallery: ["/products/hero-asset-2.png"],
    description:
      "Stitched from pure Varanasi Katan silk in royal tones. Featuring hand-sewn silver zari thread embroidery, dabka work, and stone embellishments across the flared skirt and dupatta.",
    features: [
      "100% pure Varanasi handloom silk with natural sheen",
      "Hand-done silver zari and dabka embroidery took 120 artisan hours",
      "Generous 5.5-meter skirt flare with soft silk lining inside",
      "Custom stitching and sleeve adjustments available on WhatsApp request",
    ],
    specs: {
      "Fabric": "100% Pure Katan Silk (Silk Mark Certified)",
      "Set Includes": "Flared Anarkali Gown, Churidar Bottoms, Heavy Dupatta",
      "Embroidery": "Handmade Zardozi with Real Metallic Thread",
      "Care": "Strictly Dry Clean Only",
      "Origin": "Woven in Varanasi, Hand-Stitched in Jaipur Atelier",
      "Stitching": "Standard sizes (S to XXL) or custom measurement tailoring",
    },
    weatherMatch: ["CLEAR_DAY", "SUNSET", "CLEAR_NIGHT"],
  },
];

export const CATEGORIES_DATA = [
  {
    id: "gadgets",
    name: "Tech & Gadgets",
    slug: "gadgets",
    count: 4,
    image: "/products/hero-asset-6.png",
    description: "Smart audio glasses, studio ANC headphones, mechanical watches, and drift-free controllers.",
  },
  {
    id: "jewellery",
    name: "Royalty Jewellery",
    slug: "jewellery",
    count: 2,
    image: "/products/hero-asset-4.png",
    description: "BIS hallmarked 22K pure gold, Jaipur uncut polki diamonds, and real Zambian emeralds.",
  },
  {
    id: "clothing",
    name: "Haute Clothing",
    slug: "clothing",
    count: 1,
    image: "/products/hero-asset-2.png",
    description: "Pure Varanasi silk anarkalis and wedding couture with genuine silver zari handwork.",
  },
];
