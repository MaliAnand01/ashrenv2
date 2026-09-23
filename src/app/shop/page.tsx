"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { CinematicFooter } from "@/components/navigation/CinematicFooter";
import { ASHREN_PRODUCTS, Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { formatINR } from "@/lib/utils";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ShoppingBag,
  MessageCircle,
  Heart,
  Check,
  Star,
} from "lucide-react";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const { addToCart, toggleWishlist, isInWishlist, setWhatsAppOrderProduct } = useStore();

  const categories = ["All", "Tech & Gadgets", "Royalty Jewellery", "Haute Clothing"];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return ASHREN_PRODUCTS.filter((product) => {
      // Search
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      // In stock
      const matchesStock = !inStockOnly || product.stock > 0;

      return matchesSearch && matchesCategory && matchesStock;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [searchQuery, selectedCategory, sortBy, inStockOnly]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("featured");
    setInStockOnly(false);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <main className="min-h-screen bg-[#07070a] text-white flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        
        {/* Page Title & Breadcrumbs */}
        <div className="mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-white/50 mb-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-amber-400">Shop</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Atelier Shop
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl">
            Explore authentic Jaipur Kundan jewellery, Varanasi pure silk couture, and high-performance smart audio gear.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 sm:p-5 mb-8 space-y-4 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search jewellery, headphones, anarkali..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Sort Select */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#121016] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
              >
                <option value="featured">Sort: Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Stock Toggle & Reset */}
            <div className="md:col-span-4 flex items-center justify-between md:justify-end gap-3">
              <label className="flex items-center gap-2 text-xs text-white/80 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-white/20 accent-amber-500 w-3.5 h-3.5"
                />
                <span>In Stock Only</span>
              </label>

              {(searchQuery || selectedCategory !== "All" || inStockOnly || sortBy !== "featured") && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-mono"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/5">
            <span className="text-[11px] font-mono text-white/40 uppercase mr-1 hidden sm:inline">
              Category:
            </span>
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all shrink-0 ${
                    isActive
                      ? "bg-amber-500 text-black font-bold shadow-sm"
                      : "bg-white/5 hover:bg-white/10 text-white/70 border border-white/10"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 text-xs font-mono text-white/60">
          <span>Showing {filteredProducts.length} of {ASHREN_PRODUCTS.length} products</span>
          <span className="text-emerald-400">All products include free pan-India insured shipping</span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.01] rounded-2xl border border-white/10">
            <p className="text-sm text-white/70">No products found matching your filters.</p>
            <button
              onClick={handleResetFilters}
              className="mt-3 px-5 py-2 rounded-lg bg-amber-500 text-black text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inWishlist = isInWishlist(product.id);
              const isJustAdded = addedId === product.id;

              return (
                <div
                  key={product.id}
                  className="group relative rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/40 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                      {product.category}
                    </span>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-2 rounded-full border transition-colors ${
                        inWishlist
                          ? "bg-rose-500/20 border-rose-500 text-rose-400"
                          : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                      }`}
                      title="Save to Wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 ${inWishlist ? "fill-rose-500" : ""}`} />
                    </button>
                  </div>

                  {/* Product Image Stage */}
                  <Link
                    href={`/product/${product.id}`}
                    className="relative w-full h-52 flex items-center justify-center my-3 cursor-pointer"
                  >
                    <Image
                      src={product.heroImage}
                      alt={product.name}
                      width={280}
                      height={280}
                      className="object-contain max-h-48 w-auto group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                    />
                  </Link>

                  {/* Info Block */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold font-mono">{product.rating}</span>
                      <span className="text-white/40 text-[11px]">({product.reviewCount} reviews)</span>
                    </div>

                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-base font-bold font-mono text-white">
                        {formatINR(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs font-mono text-white/40 line-through">
                          {formatINR(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-3">
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg font-mono text-xs font-bold transition-all active:scale-95 ${
                          isJustAdded
                            ? "bg-emerald-600 text-white"
                            : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setWhatsAppOrderProduct(product)}
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold shadow-sm transition-all active:scale-95"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-black" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      <CinematicFooter />
    </main>
  );
}
