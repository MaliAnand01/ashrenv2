export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  itemCount: number;
  featuredImage: string;
  accentColor: string;
  gridSpan: "large" | "medium" | "small";
}

export const ASHREN_CATEGORIES: Category[] = [
  {
    id: "cat-fashion",
    name: "Heritage Couture",
    slug: "heritage-couture",
    tagline: "Hand-embroidered pure mulberry silk & zardozi heirlooms",
    itemCount: 420,
    featuredImage: "/products/anarkali-hero.png",
    accentColor: "#E11D48",
    gridSpan: "large",
  },
  {
    id: "cat-drones",
    name: "Drones & Robotics",
    slug: "drones-robotics",
    tagline: "Aerospace carbon fiber 4K aerial mapping & cinema systems",
    itemCount: 184,
    featuredImage: "/products/drone-hero.png",
    accentColor: "#0EA5E9",
    gridSpan: "medium",
  },
  {
    id: "cat-acoustics",
    name: "Studio Acoustics",
    slug: "studio-acoustics",
    tagline: "Beryllium reference headphones & spatial planar audio",
    itemCount: 312,
    featuredImage: "/products/headset-hero.png",
    accentColor: "#6366F1",
    gridSpan: "medium",
  },
  {
    id: "cat-jewellery",
    name: "Fine Jewellery",
    slug: "fine-jewellery",
    tagline: "22K Hallmarked gold Jadau & uncut polki diamonds",
    itemCount: 260,
    featuredImage: "/products/jewellery-hero.png",
    accentColor: "#D4AF37",
    gridSpan: "large",
  },
  {
    id: "cat-gaming",
    name: "Next-Gen Gaming",
    slug: "next-gen-gaming",
    tagline: "Hall-effect zero drift wireless tournament controllers",
    itemCount: 195,
    featuredImage: "/products/controller-transparent.png",
    accentColor: "#A855F7",
    gridSpan: "small",
  },
  {
    id: "cat-optics",
    name: "Cinematic Optics",
    slug: "cinematic-optics",
    tagline: "4K dual-screen rugged action cams & 3-axis motorized gimbals",
    itemCount: 140,
    featuredImage: "/products/action-camera-hero.webp",
    accentColor: "#14B8A6",
    gridSpan: "small",
  },
];
