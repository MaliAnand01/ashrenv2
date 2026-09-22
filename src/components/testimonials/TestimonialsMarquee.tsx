"use client";

import React from "react";
import { Star, ShieldCheck, MapPin } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  product: string;
  rating: number;
  review: string;
  date: string;
}

const ROW_ONE_TESTIMONIALS: Testimonial[] = [
  {
    id: "rev-01",
    name: "Sunita Rathore",
    location: "Jaipur, Rajasthan",
    product: "22K Kundan Polki Emerald Choker",
    rating: 5,
    review:
      "Ordered this choker for my daughter's wedding. The karigar work is authentic Johari Bazaar quality and gold hallmark certificate was included in the box. Very safe insured delivery.",
    date: "2 weeks ago",
  },
  {
    id: "rev-02",
    name: "Vikram Singhal",
    location: "Bengaluru, Karnataka",
    product: "Ashren Wave Audio Smart Glasses",
    rating: 5,
    review:
      "Best purchase for my morning runs. Sunglasses stay tight on the face and open-ear audio is crisp. I take office calls on walk without taking my phone out.",
    date: "1 week ago",
  },
  {
    id: "rev-03",
    name: "Pooja Deshmukh",
    location: "Mumbai, Maharashtra",
    product: "Pure Varanasi Silk Heavy Zardozi Anarkali",
    rating: 5,
    review:
      "The silk is 100% pure handloom with heavy zari work. Their WhatsApp team helped me with custom sleeve tailoring and delivered to Bandra in 3 days. Super happy!",
    date: "3 weeks ago",
  },
  {
    id: "rev-04",
    name: "Aditya Roy",
    location: "Delhi NCR",
    product: "Ashren Studio-One Wireless ANC Headphones",
    rating: 5,
    review:
      "ANC is seriously impressive. Completely silences Delhi metro hum. Battery lasts for days on a single charge and ear cushions are very soft.",
    date: "4 days ago",
  },
];

const ROW_TWO_TESTIMONIALS: Testimonial[] = [
  {
    id: "rev-05",
    name: "Harshil Patel",
    location: "Ahmedabad, Gujarat",
    product: "Ashren Apex Pro Wireless Controller",
    rating: 5,
    review:
      "Zero stick drift. The magnetic Hall-effect sticks are genuine and response time on PC wireless dongle is instant. Better build than my old official controller.",
    date: "5 days ago",
  },
  {
    id: "rev-06",
    name: "Kavita Reddy",
    location: "Hyderabad, Telangana",
    product: "Jaipur Polki Heritage Bridal Set",
    rating: 5,
    review:
      "We took the jewellery to our family jeweller to verify purity. 100% 22K hallmarked gold with genuine uncut polki. Thank you Ashren Atelier for honest service.",
    date: "1 month ago",
  },
  {
    id: "rev-07",
    name: "Nikhil Chawla",
    location: "Chandigarh",
    product: "Ashren Chrono Royal Automatic Watch",
    rating: 5,
    review:
      "Sapphire glass doesn't get a single scratch. The automatic mechanical sweep is smooth and looks like a watch worth 3 times the price.",
    date: "2 weeks ago",
  },
  {
    id: "rev-08",
    name: "Sneha Chatterjee",
    location: "Kolkata, West Bengal",
    product: "Ashren Wave Audio Smart Glasses",
    rating: 5,
    review:
      "Very stylish frame. UV protection is dark enough for bright Kolkata afternoons and sound doesn't leak out to people standing next to you.",
    date: "10 days ago",
  },
];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="w-[340px] sm:w-[380px] shrink-0 rounded-2xl bg-white/[0.02] border border-white/10 p-5 flex flex-col justify-between hover:border-amber-400/40 transition-colors shadow-md mx-3">
      <div>
        {/* Rating Stars & Verified Tag */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" />
            <span>Verified Order</span>
          </span>
        </div>

        {/* Review text */}
        <p className="text-xs text-white/80 leading-relaxed font-normal mb-4">
          &ldquo;{item.review}&rdquo;
        </p>
      </div>

      {/* Customer Info */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-white block">
            {item.name}
          </span>
          <span className="text-[10px] text-white/50 flex items-center gap-1 mt-0.5">
            <MapPin className="w-2.5 h-2.5 text-amber-400" />
            {item.location}
          </span>
        </div>

        <span className="text-[10px] font-mono text-amber-400/80 bg-amber-500/5 px-2 py-1 rounded-md border border-amber-500/15 max-w-[130px] truncate text-right">
          {item.product}
        </span>
      </div>
    </div>
  );
}

export function TestimonialsMarquee() {
  return (
    <section className="py-16 sm:py-24 bg-transparent relative z-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold block mb-2">
            Verified Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Loved Across Indian Homes
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-2 font-normal">
            Real feedback from verified customers across Jaipur, Mumbai, Delhi, Bengaluru, and beyond.
          </p>
        </div>

      </div>

      {/* Marquee Row 1 (Left-to-Right) */}
      <div className="relative w-full overflow-hidden mb-6">
        <div className="animate-marquee-left">
          {[...ROW_ONE_TESTIMONIALS, ...ROW_ONE_TESTIMONIALS].map((item, idx) => (
            <TestimonialCard key={`row1-${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Right-to-Left) */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee-right">
          {[...ROW_TWO_TESTIMONIALS, ...ROW_TWO_TESTIMONIALS].map((item, idx) => (
            <TestimonialCard key={`row2-${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>

    </section>
  );
}
