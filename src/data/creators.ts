export interface CreatorReel {
  id: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  videoThumb: string;
  title: string;
  views: string;
  likes: string;
  shares: string;
  taggedProductId: string;
  taggedProductName: string;
  taggedProductPrice: number;
  taggedProductImage: string;
  category: string;
}

export const ASHREN_CREATOR_REELS: CreatorReel[] = [
  {
    id: "reel-01",
    creatorName: "Aarav Mehra",
    creatorHandle: "@aarav_cinematics",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    videoThumb: "/products/drone-gimbal.webp",
    title: "Testing the Phantom 4K in 45km/h desert winds in Jaisalmer! 🌪️ Absolute rock-steady footage.",
    views: "1.4M",
    likes: "142K",
    shares: "18.4K",
    taggedProductId: "prod-01",
    taggedProductName: "ASHREN Phantom 4K Ultra-Gimbal Drone",
    taggedProductPrice: 48999,
    taggedProductImage: "/products/drone-hero.png",
    category: "Drones & Robotics",
  },
  {
    id: "reel-02",
    creatorName: "Rhea Singhania",
    creatorHandle: "@rhea_royalcouture",
    creatorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    videoThumb: "/products/anarkali-lehenga.jpg",
    title: "180 hours of hand-done Zardozi embroidery. Wearing the Imperial Crimson Anarkali for royal wedding night ✨",
    views: "2.1M",
    likes: "289K",
    shares: "34.1K",
    taggedProductId: "prod-06",
    taggedProductName: "ASHREN Imperial Crimson Silk Anarkali Ensemble",
    taggedProductPrice: 64999,
    taggedProductImage: "/products/anarkali-hero.png",
    category: "Heritage Couture",
  },
  {
    id: "reel-03",
    creatorName: "Vikram 'Viper' Joshi",
    creatorHandle: "@viper_esports",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    videoThumb: "/products/gaming-controller.jpg",
    title: "Hall-Effect magnetic joysticks teardown. Zero drift after 600 hours of scrims! 🔥",
    views: "890K",
    likes: "98K",
    shares: "12.8K",
    taggedProductId: "prod-02",
    taggedProductName: "ASHREN Titan-Pro Wireless Hall-Effect Controller",
    taggedProductPrice: 7499,
    taggedProductImage: "/products/controller-transparent.png",
    category: "Next-Gen Gaming",
  },
  {
    id: "reel-04",
    creatorName: "Meera & Siddharth",
    creatorHandle: "@the_heritage_heirloom",
    creatorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    videoThumb: "/products/jewellery-set.webp",
    title: "Unboxing the 22K Kundan Choker crafted by 4th gen Jaipur artisans. The emerald clarity is unreal 💎",
    views: "3.2M",
    likes: "410K",
    shares: "52.3K",
    taggedProductId: "prod-05",
    taggedProductName: "ASHREN Royal Heritage 22K Kundan Choker",
    taggedProductPrice: 185000,
    taggedProductImage: "/products/jewellery-hero.png",
    category: "Fine Jewellery",
  },
  {
    id: "reel-05",
    creatorName: "Devansh Soundworks",
    creatorHandle: "@devansh_audio",
    creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    videoThumb: "/products/gaming-headset.jpg",
    title: "Beryllium drivers vs planar drivers blind sound test in the studio 🎧 The bass separation blew my mind.",
    views: "940K",
    likes: "105K",
    shares: "14.2K",
    taggedProductId: "prod-03",
    taggedProductName: "ASHREN Apex Studio Hybrid ANC Headphones",
    taggedProductPrice: 18499,
    taggedProductImage: "/products/headset-hero.png",
    category: "Studio Acoustics",
  },
];
