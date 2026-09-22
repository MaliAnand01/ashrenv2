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
    creatorName: "Aarav Sharma",
    creatorHandle: "@aarav_tech",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    videoThumb: "/products/hero-asset-6.png",
    title: "Walking around Connaught Place wearing Ashren Wave Smart Glasses. Clear calls and great music without blocking ears!",
    views: "1.2M",
    likes: "112K",
    shares: "14.2K",
    taggedProductId: "prod-01",
    taggedProductName: "Ashren Wave Audio Smart Glasses",
    taggedProductPrice: 8999,
    taggedProductImage: "/products/hero-asset-6.png",
    category: "Tech & Gadgets",
  },
  {
    id: "reel-02",
    creatorName: "Meera Singhania",
    creatorHandle: "@meera_weddings",
    creatorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    videoThumb: "/products/hero-asset-4.png",
    title: "Unboxing my 22K Kundan Polki Choker from Jaipur Atelier. Real uncut stones and stunning green emeralds!",
    views: "2.4M",
    likes: "284K",
    shares: "32.1K",
    taggedProductId: "prod-05",
    taggedProductName: "22K Kundan Polki Emerald Choker",
    taggedProductPrice: 145000,
    taggedProductImage: "/products/hero-asset-4.png",
    category: "Royalty Jewellery",
  },
  {
    id: "reel-03",
    creatorName: "Kabir Verma",
    creatorHandle: "@kabir_audio",
    creatorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    videoThumb: "/products/hero-asset-3.png",
    title: "Active Noise Cancellation test in Mumbai Metro with Ashren Studio-One. Total silence!",
    views: "940K",
    likes: "95K",
    shares: "11.8K",
    taggedProductId: "prod-02",
    taggedProductName: "Ashren Studio-One Wireless ANC Headphones",
    taggedProductPrice: 14999,
    taggedProductImage: "/products/hero-asset-3.png",
    category: "Tech & Gadgets",
  },
  {
    id: "reel-04",
    creatorName: "Ananya Roy",
    creatorHandle: "@ananya_couture",
    creatorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    videoThumb: "/products/hero-asset-2.png",
    title: "Pure Varanasi silk flared anarkali suit with real silver zari thread work. 10/10 fit and craftsmanship.",
    views: "1.8M",
    likes: "205K",
    shares: "26.4K",
    taggedProductId: "prod-07",
    taggedProductName: "Pure Varanasi Silk Heavy Zardozi Anarkali",
    taggedProductPrice: 48500,
    taggedProductImage: "/products/hero-asset-2.png",
    category: "Haute Clothing",
  },
  {
    id: "reel-05",
    creatorName: "Rohan Nair",
    creatorHandle: "@rohan_gaming",
    creatorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    videoThumb: "/products/hero-asset-7.png",
    title: "No stick drift after 4 months of ranked matches. Ashren Apex Pro magnetic Hall-effect sticks are legitimate.",
    views: "720K",
    likes: "78K",
    shares: "9.2K",
    taggedProductId: "prod-04",
    taggedProductName: "Ashren Apex Pro Wireless Controller",
    taggedProductPrice: 5499,
    taggedProductImage: "/products/hero-asset-7.png",
    category: "Tech & Gadgets",
  },
];
