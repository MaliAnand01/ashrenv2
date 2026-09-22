"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Boxes,
  MessageCircle,
  Users,
  Film,
  Megaphone,
  BarChart3,
  Settings,
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  TrendingDown,
  Clock,
  Sparkles,
  DollarSign,
  Shield,
  Layers,
  ChevronRight,
  MoreVertical,
  Send,
  Check,
  X,
  Eye,
  EyeOff,
  RefreshCw,
  Edit3,
  Trash2,
  LogOut,
  Lock,
  Mail,
  KeyRound,
  Package,
  ExternalLink,
} from "lucide-react";
import { ASHREN_PRODUCTS, Product } from "@/data/products";
import { INITIAL_WHATSAPP_ORDERS, WhatsAppOrder, WhatsAppOrderStatus } from "@/data/orders";
import { ASHREN_CREATOR_REELS, CreatorReel } from "@/data/creators";
import { INITIAL_META_CAMPAIGNS, MetaCampaign } from "@/data/marketing";
import { formatINR } from "@/lib/utils";

type AdminTab =
  | "dashboard"
  | "inventory"
  | "whatsapp-orders"
  | "creators"
  | "meta-ads"
  | "analytics"
  | "settings";

const HERO_IMAGE_OPTIONS = [
  { label: "Asset 1 (Kundan Diamond Ring)", src: "/products/hero-asset-1.png" },
  { label: "Asset 2 (Pro Studio Acoustic)", src: "/products/hero-asset-2.png" },
  { label: "Asset 3 (CineMaster 8K Drone)", src: "/products/hero-asset-3.png" },
  { label: "Asset 4 (Bridal Heritage Choker)", src: "/products/hero-asset-4.png" },
  { label: "Asset 5 (Haute Silk Sherwani)", src: "/products/hero-asset-5.png" },
  { label: "Asset 6 (Emerald Blossom Necklace)", src: "/products/hero-asset-6.png" },
  { label: "Asset 7 (Gilded Kundan Earring)", src: "/products/hero-asset-7.png" },
];

const DEFAULT_WEATHER_MATCH: Product["weatherMatch"] = ["CLEAR_DAY", "CLOUDY_DAY", "SUNSET"];

const INITIAL_PRODUCT_FORM = {
  name: "",
  tagline: "",
  category: "Tech & Gadgets" as "Tech & Gadgets" | "Royalty Jewellery" | "Haute Clothing",
  brand: "Ashren Atelier",
  sku: "",
  price: 24999,
  originalPrice: 34999,
  wholesalePrice: 16500,
  wholesaleMOQ: 10,
  stock: 45,
  heroImage: "/products/hero-asset-1.png",
  description: "",
  weatherMatch: DEFAULT_WEATHER_MATCH,
};

export default function AdminPortalPage() {
  // =========================================================================
  // 1. AUTHENTICATION STATE & SESSION
  // =========================================================================
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);
  const [authEmail, setAuthEmail] = useState<string>("admin@ashren.com");
  const [authPassword, setAuthPassword] = useState<string>("ashren2026");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<{
    email: string;
    role: string;
    node: string;
    lastLogin: string;
  } | null>(null);

  // =========================================================================
  // 2. DASHBOARD TABS & DATA STATE
  // =========================================================================
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [orders, setOrders] = useState<WhatsAppOrder[]>(INITIAL_WHATSAPP_ORDERS);
  const [campaigns, setCampaigns] = useState<MetaCampaign[]>(INITIAL_META_CAMPAIGNS);
  const [productsList, setProductsList] = useState<Product[]>(ASHREN_PRODUCTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // =========================================================================
  // 3. PRODUCT CRUD MODALS & STATE
  // =========================================================================
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productFormData, setProductFormData] = useState(INITIAL_PRODUCT_FORM);

  // Inventory Filtering & Search
  const [inventorySearch, setInventorySearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  // Other Modals (CSV & Meta Ads)
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [csvFileUploaded, setCsvFileUploaded] = useState(false);
  const [csvImported, setCsvImported] = useState(false);

  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [campaignStep, setCampaignStep] = useState(1);
  const [newCampaignName, setNewCampaignName] = useState("Festive Bridal Kundan Wholesale Push");
  const [campaignObjective, setCampaignObjective] = useState("CATALOG_SALES");
  const [campaignDailyBudget, setCampaignDailyBudget] = useState("7500");
  const [campaignLaunched, setCampaignLaunched] = useState(false);

  // Orders Filter
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("ALL");

  // =========================================================================
  // 4. PERSISTENCE & INITIAL LOAD
  // =========================================================================
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem("ashren_admin_session");
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        setAdminUser(parsed);
        setIsAuthenticated(true);
      }
    } catch {
      // Ignore parse error
    }

    try {
      const savedProducts = localStorage.getItem("ashren_admin_products");
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProductsList(parsed);
        }
      }
    } catch {
      // Ignore parse error
    }

    setIsAuthChecking(false);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const saveProductsList = (updated: Product[]) => {
    setProductsList(updated);
    try {
      localStorage.setItem("ashren_admin_products", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // =========================================================================
  // 5. AUTH HANDLERS
  // =========================================================================
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const validEmail = "admin@ashren.com";
    const validPass = "ashren2026";
    const masterKey = "ASHREN999";

    const normalizedEmail = authEmail.trim().toLowerCase();
    const isMaster = authPassword.trim() === masterKey;
    const isStandard = normalizedEmail === validEmail && authPassword === validPass;

    if (isStandard || isMaster) {
      const userSession = {
        email: normalizedEmail || "executive@ashren.com",
        role: isMaster ? "Super Administrator (Master Key)" : "Executive Catalog Manager",
        node: "Jaipur Atelier Wholesale Node",
        lastLogin: new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          day: "numeric",
          month: "short",
        }),
      };
      setAdminUser(userSession);
      setIsAuthenticated(true);
      try {
        localStorage.setItem("ashren_admin_session", JSON.stringify(userSession));
      } catch {
        // ignore
      }
      triggerToast("Welcome back, Administrator. Session active.");
    } else {
      setAuthError("Invalid credentials. Use demo: admin@ashren.com / ashren2026 or PIN: ASHREN999");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    try {
      localStorage.removeItem("ashren_admin_session");
    } catch {
      // ignore
    }
    triggerToast("Logged out from Wholesale Console.");
  };

  const handleAutofillDemo = () => {
    setAuthEmail("admin@ashren.com");
    setAuthPassword("ashren2026");
    setAuthError(null);
  };

  // =========================================================================
  // 6. PRODUCT CRUD HANDLERS
  // =========================================================================
  const handleOpenAddModal = () => {
    setProductFormData({
      name: "",
      tagline: "",
      category: "Tech & Gadgets",
      brand: "Ashren Atelier",
      sku: `ASH-SKU-${Math.floor(100 + Math.random() * 900)}`,
      price: 24999,
      originalPrice: 34999,
      wholesalePrice: 16500,
      wholesaleMOQ: 10,
      stock: 50,
      heroImage: "/products/hero-asset-1.png",
      description: "Handcrafted masterwork designed for enterprise wholesale buyers and luxury patrons.",
      weatherMatch: DEFAULT_WEATHER_MATCH,
    });
    setIsAddModalOpen(true);
  };

  const handleSaveNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.name.trim() || !productFormData.sku.trim()) {
      alert("Please provide both product title and SKU code.");
      return;
    }

    const discount =
      productFormData.originalPrice > productFormData.price
        ? Math.round(
            ((productFormData.originalPrice - productFormData.price) /
              productFormData.originalPrice) *
              100
          )
        : 0;

    const slug = productFormData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
      name: productFormData.name.trim(),
      tagline: productFormData.tagline.trim() || "Exclusive Ashren Reserve",
      category: productFormData.category,
      brand: productFormData.brand.trim() || "Ashren Atelier",
      price: Number(productFormData.price) || 0,
      originalPrice: Number(productFormData.originalPrice) || Number(productFormData.price) || 0,
      discountPercent: discount,
      rating: 4.9,
      reviewCount: Math.floor(15 + Math.random() * 85),
      stock: Number(productFormData.stock) || 0,
      sku: productFormData.sku.trim().toUpperCase(),
      wholesaleMOQ: Number(productFormData.wholesaleMOQ) || 5,
      wholesalePrice: Number(productFormData.wholesalePrice) || Number(productFormData.price) * 0.7,
      heroImage: productFormData.heroImage || "/products/hero-asset-1.png",
      transparentImage: productFormData.heroImage || "/products/hero-asset-1.png",
      gallery: [productFormData.heroImage || "/products/hero-asset-1.png"],
      description: productFormData.description.trim() || "Ashren precision-engineered luxury asset.",
      features: [
        "Certified Authenticity Hallmark",
        "Express Wholesale Dispatch across India",
        "1-Year Atelier Warranty & Concierge",
      ],
      specs: {
        Dispatch: "Immediate Ready-Stock",
        Warranty: "Ashren Certified Guarantee",
        Origin: "Jaipur / Bengaluru Atelier",
      },
      weatherMatch: productFormData.weatherMatch || DEFAULT_WEATHER_MATCH,
    };

    const updated = [newProduct, ...productsList];
    saveProductsList(updated);
    setIsAddModalOpen(false);
    triggerToast(`Added "${newProduct.name}" to Master Catalog.`);
  };

  const handleOpenEditModal = (p: Product) => {
    setSelectedProduct(p);
    setProductFormData({
      name: p.name,
      tagline: p.tagline,
      category: p.category,
      brand: p.brand,
      sku: p.sku,
      price: p.price,
      originalPrice: p.originalPrice,
      wholesalePrice: p.wholesalePrice,
      wholesaleMOQ: p.wholesaleMOQ,
      stock: p.stock,
      heroImage: p.heroImage,
      description: p.description,
      weatherMatch: p.weatherMatch || DEFAULT_WEATHER_MATCH,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const discount =
      productFormData.originalPrice > productFormData.price
        ? Math.round(
            ((productFormData.originalPrice - productFormData.price) /
              productFormData.originalPrice) *
              100
          )
        : 0;

    const updatedList: Product[] = productsList.map((p) => {
      if (p.id === selectedProduct.id) {
        return {
          ...p,
          name: productFormData.name.trim(),
          tagline: productFormData.tagline.trim(),
          category: productFormData.category,
          brand: productFormData.brand.trim(),
          sku: productFormData.sku.trim().toUpperCase(),
          price: Number(productFormData.price) || 0,
          originalPrice: Number(productFormData.originalPrice) || 0,
          discountPercent: discount,
          wholesalePrice: Number(productFormData.wholesalePrice) || 0,
          wholesaleMOQ: Number(productFormData.wholesaleMOQ) || 1,
          stock: Number(productFormData.stock) || 0,
          heroImage: productFormData.heroImage,
          transparentImage: productFormData.heroImage,
          description: productFormData.description.trim(),
          weatherMatch: productFormData.weatherMatch || DEFAULT_WEATHER_MATCH,
        };
      }
      return p;
    });

    saveProductsList(updatedList);
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    triggerToast(`Product SKU ${productFormData.sku} updated successfully.`);
  };

  const handleOpenDeleteModal = (p: Product) => {
    setSelectedProduct(p);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedProduct) return;
    const updated = productsList.filter((p) => p.id !== selectedProduct.id);
    saveProductsList(updated);
    setIsDeleteModalOpen(false);
    triggerToast(`Product "${selectedProduct.name}" removed from catalog.`);
    setSelectedProduct(null);
  };

  const handleQuickStockAdjust = (productId: string, delta: number) => {
    const updated = productsList.map((p) => {
      if (p.id === productId) {
        const newStock = Math.max(0, p.stock + delta);
        return { ...p, stock: newStock };
      }
      return p;
    });
    saveProductsList(updated);
  };

  const handleResetCatalog = () => {
    if (confirm("Reset catalog back to initial default Ashren products?")) {
      saveProductsList(ASHREN_PRODUCTS);
      triggerToast("Catalog restored to factory defaults.");
    }
  };

  const updateOrderStatus = (orderId: string, nextStatus: WhatsAppOrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: nextStatus } : ord))
    );
    triggerToast(`Order status updated to ${nextStatus}.`);
  };

  const filteredProducts = productsList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.category.toLowerCase().includes(inventorySearch.toLowerCase());

    if (!matchesSearch) return false;

    if (categoryFilter === "ALL") return true;
    if (categoryFilter === "LOW_STOCK") return p.stock < 25;
    return p.category === categoryFilter;
  });

  const totalStockUnits = productsList.reduce((acc, p) => acc + p.stock, 0);
  const totalValuation = productsList.reduce((acc, p) => acc + p.stock * p.wholesalePrice, 0);
  const lowStockCount = productsList.filter((p) => p.stock > 0 && p.stock < 25).length;
  const outOfStockCount = productsList.filter((p) => p.stock === 0).length;

  const filteredOrders =
    orderStatusFilter === "ALL"
      ? orders
      : orders.filter((o) => o.status === orderStatusFilter);

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#06080c] flex items-center justify-center text-white font-mono text-xs">
        <div className="flex items-center gap-3">
          <RefreshCw className="w-4 h-4 animate-spin text-gold-400" />
          <span>Verifying Secure Atelier Credentials...</span>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: AUTHENTICATION GATE (LOGIN SCREEN)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#06080c] text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-gold-500 selection:text-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-gold-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <header className="p-6 flex items-center justify-between relative z-10 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-black font-bold font-serif text-sm shadow-md">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-sm font-bold text-white">ASHREN</span>
              <span className="text-[9px] uppercase font-mono tracking-wider text-gold-400">
                Wholesale Portal
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/25 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center p-4 relative z-10 my-8">
          <div className="w-full max-w-md bg-[#0b0e16]/90 border border-white/15 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-gold-500 to-amber-600 rounded-full text-black font-mono font-bold text-[9px] uppercase tracking-widest shadow-md">
              Encrypted Admin Access
            </div>

            <div className="text-center space-y-2 mb-8 mt-2">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 mx-auto flex items-center justify-center text-gold-400 mb-4 shadow-inner">
                <Shield className="w-6 h-6" />
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Executive Console
              </h1>
              <p className="text-xs text-white/50 font-light">
                Sign in to manage catalog inventory, WhatsApp bulk orders, creators, and telemetry.
              </p>
            </div>

            {authError && (
              <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5 text-rose-300 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-white/70 text-[11px] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gold-400" />
                  <span>Admin Email or Username</span>
                </label>
                <input
                  type="text"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="admin@ashren.com"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs placeholder:text-white/30 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-white/70 text-[11px] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-gold-400" />
                    <span>Master Password or Key</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[10px] text-white/40 hover:text-white flex items-center gap-1"
                  >
                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showPassword ? "Hide" : "Show"}</span>
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs placeholder:text-white/30 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 hover:from-gold-300 hover:to-amber-400 text-black font-bold font-sans text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-gold-500/20 active:scale-[0.99]"
              >
                Authenticate & Access Dashboard
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                  Demo Fast Credentials
                </span>
                <button
                  type="button"
                  onClick={handleAutofillDemo}
                  className="text-[10px] font-mono text-gold-400 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Autofill Demo</span>
                </button>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[11px] text-white/60 space-y-1">
                <div className="flex justify-between">
                  <span>Email:</span>
                  <code className="text-white">admin@ashren.com</code>
                </div>
                <div className="flex justify-between">
                  <span>Password:</span>
                  <code className="text-gold-300">ashren2026</code>
                </div>
                <div className="flex justify-between text-[10px] text-white/40 pt-1 border-t border-white/5">
                  <span>Super PIN Key:</span>
                  <code className="text-emerald-400">ASHREN999</code>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="p-6 text-center text-[11px] font-mono text-white/40 border-t border-white/5">
          Ashren Commercial Atelier Console • Confidential System • Node Jaipur #8849
        </footer>
      </div>
    );
  }

  // =========================================================================
  // VIEW: AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#06080c] text-white flex flex-col lg:flex-row antialiased font-sans selection:bg-gold-500 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#121622] border border-gold-500/50 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in font-mono text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-white/40 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SIDEBAR NAVIGATION */}
      {/* ========================================================================= */}
      <aside className="w-full lg:w-64 bg-[#090b10] border-b lg:border-b-0 lg:border-r border-white/10 shrink-0 p-5 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-black font-bold font-serif text-sm shadow-sm">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-sm font-bold text-white">
                  ASHREN
                </span>
                <span className="text-[9px] uppercase font-mono tracking-wider text-gold-400">
                  Master Console
                </span>
              </div>
            </Link>
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white transition-colors"
              title="Return to Customer Storefront"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <nav className="space-y-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === "dashboard"
                  ? "bg-gold-500 text-black font-bold shadow-md"
                  : "text-white/70 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab("inventory")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activeTab === "inventory"
                  ? "bg-gold-500 text-black font-bold shadow-md"
                  : "text-white/70 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Boxes className="w-4 h-4" />
                <span>Product Catalog</span>
              </div>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  activeTab === "inventory"
                    ? "bg-black/20 text-black font-bold"
                    : "bg-white/10 text-white/60"
                }`}
              >
                {productsList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("whatsapp-orders")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activeTab === "whatsapp-orders"
                  ? "bg-gold-500 text-black font-bold shadow-md"
                  : "text-white/70 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Orders</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            <button
              onClick={() => setActiveTab("creators")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === "creators"
                  ? "bg-gold-500 text-black font-bold shadow-md"
                  : "text-white/70 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Creators Network</span>
            </button>

            <button
              onClick={() => setActiveTab("meta-ads")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activeTab === "meta-ads"
                  ? "bg-gold-500 text-black font-bold shadow-md"
                  : "text-white/70 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Megaphone className="w-4 h-4" />
                <span>Meta Ads</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                ● Connected
              </span>
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === "analytics"
                  ? "bg-gold-500 text-black font-bold shadow-md"
                  : "text-white/70 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Commercial Telemetry</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === "settings"
                  ? "bg-gold-500 text-black font-bold shadow-md"
                  : "text-white/70 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-white/90">Jaipur Master Node</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live
            </span>
          </div>
          <div className="text-[11px] font-mono text-white/50 truncate">
            {adminUser?.email || "admin@ashren.com"}
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-white/60 hover:text-rose-400 text-xs font-mono transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN ADMIN WORKSPACE */}
      {/* ========================================================================= */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {/* ========================================================================= */}
        {/* TAB 1: EXECUTIVE DASHBOARD */}
        {/* ========================================================================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                  ENTERPRISE ATELIER TELEMETRY
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Executive Commercial Dashboard
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCsvModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-gold-400" />
                  <span>Import Manifest</span>
                </button>
                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-[#0b0d13] border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-white/50">
                  <span>Gross Wholesale Revenue</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <TrendingUp className="w-3 h-3" /> +24.8%
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  ₹84,20,500
                </div>
                <span className="text-[11px] text-white/40 block">
                  Across 348 WhatsApp bulk purchase orders
                </span>
              </div>

              <div className="bg-[#0b0d13] border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-white/50">
                  <span>Catalog Inventory Valuation</span>
                  <span className="text-gold-400 font-semibold font-mono">
                    {totalStockUnits} Units
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-gold-300">
                  {formatINR(totalValuation)}
                </div>
                <span className="text-[11px] text-white/40 block">
                  Active SKUs: {productsList.length} • Low stock: {lowStockCount}
                </span>
              </div>

              <div className="bg-[#0b0d13] border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-white/50">
                  <span>Meta Ads ROAS</span>
                  <span className="text-indigo-400 font-semibold">Live Campaigns</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  4.52x
                </div>
                <span className="text-[11px] text-white/40 block">
                  ₹48.2K spend generated ₹2.18L revenue
                </span>
              </div>

              <div className="bg-[#0b0d13] border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-white/50">
                  <span>Average Lot Size (AOV)</span>
                  <span className="text-emerald-400 font-semibold">AOV</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  ₹2,41,950
                </div>
                <span className="text-[11px] text-white/40 block">
                  WhatsApp lead conversion rate: 38.4%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 bg-[#0b0d13] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Monthly Order Volume & Wholesale Trajectory
                    </h3>
                    <span className="text-xs text-white/40 font-mono">
                      Q3 FY26 Performance trajectory (in Lakhs INR)
                    </span>
                  </div>
                  <span className="text-xs font-mono text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded border border-gold-500/20">
                    Live Telemetry
                  </span>
                </div>

                <div className="h-64 w-full pt-4">
                  <svg viewBox="0 0 700 220" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="40" x2="700" y2="40" stroke="#ffffff10" strokeDasharray="3 3" />
                    <line x1="0" y1="100" x2="700" y2="100" stroke="#ffffff10" strokeDasharray="3 3" />
                    <line x1="0" y1="160" x2="700" y2="160" stroke="#ffffff10" strokeDasharray="3 3" />

                    <path
                      d="M 0,180 Q 100,160 175,130 T 350,90 T 525,45 T 700,20 L 700,210 L 0,210 Z"
                      fill="url(#revenueGrad)"
                    />
                    <path
                      d="M 0,180 Q 100,160 175,130 T 350,90 T 525,45 T 700,20"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="3"
                    />

                    <circle cx="175" cy="130" r="5" fill="#D4AF37" />
                    <circle cx="350" cy="90" r="5" fill="#D4AF37" />
                    <circle cx="525" cy="45" r="5" fill="#D4AF37" />
                    <circle cx="700" cy="20" r="6" fill="#FFF" stroke="#D4AF37" strokeWidth="2" />
                  </svg>
                  <div className="flex justify-between text-[11px] font-mono text-white/40 pt-2 border-t border-white/10">
                    <span>April: ₹28.4L</span>
                    <span>May: ₹44.2L</span>
                    <span>June: ₹59.8L</span>
                    <span>July (Peak): ₹84.2L</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#0b0d13] border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Recent WhatsApp Inquiries</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab("whatsapp-orders")}
                      className="text-xs text-gold-400 hover:underline font-mono"
                    >
                      View All ({orders.length})
                    </button>
                  </div>

                  <div className="space-y-3">
                    {orders.slice(0, 3).map((ord) => (
                      <div
                        key={ord.id}
                        className="bg-white/[0.03] border border-white/[0.06] p-3 rounded-xl flex items-center justify-between"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white truncate">
                              {ord.customerName}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/60">
                              {ord.status}
                            </span>
                          </div>
                          <span className="text-[11px] text-white/50 truncate block mt-0.5">
                            {ord.productName} ({ord.quantity} units)
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-400 shrink-0 ml-3">
                          {formatINR(ord.totalAmount)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab("whatsapp-orders")}
                  className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 text-xs font-medium text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Open WhatsApp Dispatch Board</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PRODUCT MANAGEMENT & CRUD INVENTORY */}
        {/* ========================================================================= */}
        {activeTab === "inventory" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                  MASTER PRODUCT MANAGEMENT & CRUD
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Catalog Inventory Operations
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold flex items-center gap-2 transition-colors shadow-lg active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
                <button
                  onClick={() => setIsCsvModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 text-xs font-medium text-white flex items-center gap-2 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-gold-400" />
                  <span>Bulk Import</span>
                </button>
                <button
                  onClick={handleResetCatalog}
                  title="Reset to default products"
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] border border-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#0b0d13] border border-white/10 p-4 rounded-xl">
                <span className="text-xs font-mono text-white/40 block">Total Active Products</span>
                <span className="text-xl font-bold font-mono text-white mt-1 block">
                  {productsList.length} SKUs
                </span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-4 rounded-xl">
                <span className="text-xs font-mono text-white/40 block">Valuation on Hand</span>
                <span className="text-xl font-bold font-mono text-gold-300 mt-1 block">
                  {formatINR(totalValuation)}
                </span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-4 rounded-xl">
                <span className="text-xs font-mono text-white/40 block">Low Stock Alert (&lt;25)</span>
                <span className="text-xl font-bold font-mono text-amber-400 mt-1 block">
                  {lowStockCount} Items
                </span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-4 rounded-xl">
                <span className="text-xs font-mono text-white/40 block">Out of Stock</span>
                <span className="text-xl font-bold font-mono text-rose-400 mt-1 block">
                  {outOfStockCount} Items
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  placeholder="Search product title, SKU, or category..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-gold-400 focus:outline-none text-xs text-white placeholder:text-white/30"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                {["ALL", "Tech & Gadgets", "Royalty Jewellery", "Haute Clothing", "LOW_STOCK"].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl transition-colors ${
                        categoryFilter === cat
                          ? "bg-gold-500 text-black font-bold"
                          : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08]"
                      }`}
                    >
                      {cat === "LOW_STOCK" ? "Low Stock (<25)" : cat}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="bg-[#0b0d13] border border-white/10 rounded-2xl overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/[0.03] border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Product & SKU</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Warehouse Stock</th>
                    <th className="py-3.5 px-4">Retail Price</th>
                    <th className="py-3.5 px-4">Wholesale (MOQ)</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-white/40">
                        No products found matching &ldquo;{inventorySearch}&rdquo;.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                              <Image
                                src={p.heroImage}
                                alt={p.name}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                            <div className="max-w-xs">
                              <span className="font-sans font-semibold text-white block truncate">
                                {p.name}
                              </span>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] font-mono text-gold-400 bg-gold-400/10 px-1.5 py-0.5 rounded">
                                  {p.sku}
                                </span>
                                <span className="text-[10px] text-white/40 truncate">
                                  {p.brand}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-white/70">
                          <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5">
                            {p.category}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuickStockAdjust(p.id, -5)}
                              className="w-6 h-6 rounded bg-white/[0.05] hover:bg-white/[0.15] text-white/70 hover:text-white flex items-center justify-center text-xs transition-colors"
                              title="Decrease by 5"
                            >
                              -
                            </button>
                            <span
                              className={`font-bold font-mono px-2 py-0.5 rounded ${
                                p.stock === 0
                                  ? "text-rose-400 bg-rose-500/10"
                                  : p.stock < 25
                                  ? "text-amber-400 bg-amber-500/10"
                                  : "text-white"
                              }`}
                            >
                              {p.stock}
                            </span>
                            <button
                              onClick={() => handleQuickStockAdjust(p.id, 5)}
                              className="w-6 h-6 rounded bg-white/[0.05] hover:bg-white/[0.15] text-white/70 hover:text-white flex items-center justify-center text-xs transition-colors"
                              title="Increase by 5"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">{formatINR(p.price)}</div>
                          {p.originalPrice > p.price && (
                            <div className="text-[10px] text-white/40 line-through">
                              {formatINR(p.originalPrice)}
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-bold text-emerald-400">
                            {formatINR(p.wholesalePrice)}
                          </div>
                          <span className="text-[10px] text-white/50">
                            Min {p.wholesaleMOQ} units
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          {p.stock === 0 ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                              Out of Stock
                            </span>
                          ) : p.stock < 25 ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              Low Stock
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              In Stock
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.15] text-gold-400 hover:text-gold-300 transition-colors"
                              title="Edit Product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleOpenDeleteModal(p)}
                              className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-rose-500/20 text-white/50 hover:text-rose-400 transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: WHATSAPP ORDERS DISPATCH BOARD */}
        {/* ========================================================================= */}
        {activeTab === "whatsapp-orders" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold block mb-1">
                  COMMUNICATION PIPELINE
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Incoming WhatsApp Wholesale Orders
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-white/50">Filter:</span>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="bg-[#141822] border border-white/15 text-xs text-white px-3 py-1.5 rounded-xl font-mono focus:outline-none"
                >
                  <option value="ALL">All Statuses ({orders.length})</option>
                  <option value="NEW">New Leads</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            </div>

            <div className="bg-[#0b0d13] border border-white/10 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/[0.04] border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Order ID & Date</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Product & Lot Qty</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-bold text-gold-400 block">{ord.orderNumber}</span>
                        <span className="text-[10px] text-white/40">{ord.createdAt}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-sans font-semibold text-white block">
                          {ord.customerName}
                        </span>
                        <span className="text-[10px] text-white/60">{ord.phone}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-white block font-medium truncate max-w-xs">
                          {ord.productName}
                        </span>
                        <span className="text-[10px] text-white/40">
                          {ord.quantity} Wholesale Units • SKU: {ord.productSku}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-400 text-sm">
                        {formatINR(ord.totalAmount)}
                      </td>
                      <td className="py-3 px-4 text-white/70">{ord.city}</td>
                      <td className="py-3 px-4">
                        <select
                          value={ord.status}
                          onChange={(e) =>
                            updateOrderStatus(ord.id, e.target.value as WhatsAppOrderStatus)
                          }
                          className="bg-[#141924] border border-white/15 text-[11px] text-white font-bold rounded-lg px-2 py-1 focus:outline-none"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={`https://wa.me/${ord.phone.replace(
                            /[^0-9]/g,
                            ""
                          )}?text=Hello%20${encodeURIComponent(
                            ord.customerName
                          )},%20this%20is%20Ashren%20Atelier%20regarding%20order%20${
                            ord.orderNumber
                          }.`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Contact</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CREATOR MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === "creators" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold block mb-1">
                  SOCIAL COMMERCE & REEL PARTNERS
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Creator Network & Content Sales Attribution
                </h1>
              </div>

              <button
                onClick={() => triggerToast("Creator invitation link copied to clipboard.")}
                className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Onboard New Creator</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-[#0b0d13] border border-white/10 p-5 rounded-2xl space-y-2">
                <span className="text-xs font-mono text-white/40">Network Reel Views</span>
                <span className="text-2xl font-bold font-mono text-white block">8.54 Million</span>
                <span className="text-xs text-emerald-400">+38% organic reach</span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-5 rounded-2xl space-y-2">
                <span className="text-xs font-mono text-white/40">Attributed Wholesale Sales</span>
                <span className="text-2xl font-bold font-mono text-emerald-400 block">
                  ₹32,40,000
                </span>
                <span className="text-xs text-white/40">From tagged product clicks</span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-5 rounded-2xl space-y-2">
                <span className="text-xs font-mono text-white/40">Commission Disbursed</span>
                <span className="text-2xl font-bold font-mono text-gold-400 block">₹3,24,000</span>
                <span className="text-xs text-white/40">10% Tier 1 partner cut</span>
              </div>
            </div>

            <div className="bg-[#0b0d13] border border-white/10 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/[0.04] border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Creator Profile</th>
                    <th className="py-3 px-4">Tagged Product</th>
                    <th className="py-3 px-4">Views</th>
                    <th className="py-3 px-4">Likes</th>
                    <th className="py-3 px-4">Shares</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {ASHREN_CREATOR_REELS.map((cr) => (
                    <tr key={cr.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gold-400/40 shrink-0">
                            <Image
                              src={cr.creatorAvatar}
                              alt={cr.creatorName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-sans font-semibold text-white block">
                              {cr.creatorName}
                            </span>
                            <span className="text-[10px] text-white/50">{cr.creatorHandle}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-white/80">{cr.taggedProductName}</td>
                      <td className="py-3 px-4 font-bold text-white">{cr.views}</td>
                      <td className="py-3 px-4 text-white/70">{cr.likes}</td>
                      <td className="py-3 px-4 text-white/70">{cr.shares}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Active Partner
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: META ADS DASHBOARD */}
        {/* ========================================================================= */}
        {activeTab === "meta-ads" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                    META BUSINESS SUITE INTEGRATION
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    META CONNECTED ●
                  </span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Meta Ads Manager & Wholesale Retargeting
                </h1>
              </div>

              <button
                onClick={() => {
                  setCampaignStep(1);
                  setCampaignLaunched(false);
                  setIsCampaignModalOpen(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold flex items-center gap-2 transition-colors shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Launch New Campaign</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0b0d13] border border-white/10 p-5 rounded-2xl">
                <span className="text-xs font-mono text-white/40">Total Ad Spend</span>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">
                  ₹1,59,000
                </span>
                <span className="text-[10px] text-white/40 font-mono">Last 30 Days</span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-5 rounded-2xl">
                <span className="text-xs font-mono text-white/40">Attributed Ad Revenue</span>
                <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                  ₹7,89,930
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">+18% vs Last Month</span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-5 rounded-2xl">
                <span className="text-xs font-mono text-white/40">Blended ROAS</span>
                <span className="text-2xl font-bold font-mono text-gold-300 mt-1 block">4.96x</span>
                <span className="text-[10px] text-gold-400 font-mono">Target: 3.50x</span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-5 rounded-2xl">
                <span className="text-xs font-mono text-white/40">Total Audience Reach</span>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">
                  1.23 Million
                </span>
                <span className="text-[10px] text-white/40 font-mono">High Net-Worth / B2B</span>
              </div>
            </div>

            <div className="bg-[#0b0d13] border border-white/10 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/[0.04] border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Campaign Name</th>
                    <th className="py-3 px-4">Objective</th>
                    <th className="py-3 px-4">Spend</th>
                    <th className="py-3 px-4">Revenue</th>
                    <th className="py-3 px-4">ROAS</th>
                    <th className="py-3 px-4">Reach</th>
                    <th className="py-3 px-4">CTR</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {campaigns.map((camp) => (
                    <tr key={camp.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-semibold text-white">{camp.name}</td>
                      <td className="py-3 px-4 text-white/60">{camp.objective}</td>
                      <td className="py-3 px-4 font-bold text-white">{formatINR(camp.spend)}</td>
                      <td className="py-3 px-4 font-bold text-emerald-400">
                        {formatINR(camp.revenue)}
                      </td>
                      <td className="py-3 px-4 font-bold text-gold-400">{camp.roas}x</td>
                      <td className="py-3 px-4 text-white/80">{camp.reach}</td>
                      <td className="py-3 px-4 text-white/80">{camp.ctr}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                            camp.status === "ACTIVE"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                          }`}
                        >
                          {camp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: ANALYTICS & COMMERCIAL VELOCITY */}
        {/* ========================================================================= */}
        {activeTab === "analytics" && (
          <div className="space-y-8 animate-fade-in">
            <div className="pb-6 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                COMPREHENSIVE TELEMETRY
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Commercial Analytics & Inventory Velocity
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#0b0d13] border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-white">
                  Wholesale Revenue Distribution by Category
                </h3>
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-white/70 mb-1">
                      <span>Drones & Robotics</span>
                      <span className="text-gold-400">₹32.4L (38.5%)</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gold-400 w-[38.5%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-white/70 mb-1">
                      <span>Royalty Jewellery</span>
                      <span className="text-emerald-400">₹24.8L (29.4%)</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[29.4%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-white/70 mb-1">
                      <span>Haute Clothing & Silk</span>
                      <span className="text-indigo-400">₹14.2L (16.8%)</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400 w-[16.8%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-white/70 mb-1">
                      <span>Heritage Acoustics</span>
                      <span className="text-rose-400">₹8.9L (10.6%)</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-400 w-[10.6%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0b0d13] border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-white">
                  Top Wholesale Inbound Dispatch Hubs
                </h3>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div>
                      <span className="text-white font-semibold block">Jaipur & Rajasthan Belt</span>
                      <span className="text-[10px] text-white/40">Bridal & Heritage Retailers</span>
                    </div>
                    <span className="text-gold-400 font-bold">142 Inquiries</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div>
                      <span className="text-white font-semibold block">Mumbai & Maharashtra</span>
                      <span className="text-[10px] text-white/40">Cinematography & Audio Studios</span>
                    </div>
                    <span className="text-gold-400 font-bold">98 Inquiries</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div>
                      <span className="text-white font-semibold block">Bengaluru & Hyderabad</span>
                      <span className="text-[10px] text-white/40">Tech Distributors & Boutiques</span>
                    </div>
                    <span className="text-gold-400 font-bold">76 Inquiries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: SYSTEM SETTINGS */}
        {/* ========================================================================= */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-2xl animate-fade-in">
            <div className="pb-6 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                SYSTEM CONFIGURATION
              </span>
              <h1 className="font-serif text-2xl font-bold text-white">
                Wholesale Atelier Settings
              </h1>
            </div>

            <div className="bg-[#0b0d13] border border-white/10 rounded-2xl p-6 space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                <div>
                  <span className="text-white font-semibold block">Administrator Account</span>
                  <span className="text-white/40 text-[10px]">{adminUser?.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30 transition-colors"
                >
                  Log Out
                </button>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                <div>
                  <span className="text-white font-semibold block">Master Catalog Storage</span>
                  <span className="text-white/40 text-[10px]">
                    {productsList.length} products saved in browser local storage
                  </span>
                </div>
                <button
                  onClick={handleResetCatalog}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.10] text-white font-semibold border border-white/10 transition-colors"
                >
                  Reset Catalog
                </button>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                <div>
                  <span className="text-white font-semibold block">WhatsApp Concierge Webhook</span>
                  <span className="text-white/40 text-[10px]">Direct routing to concierge phone</span>
                </div>
                <span className="text-emerald-400 font-bold">ACTIVE (+91 98290 88201)</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="text-white font-semibold block">Master Atelier Server Node</span>
                  <span className="text-white/40 text-[10px]">Active geolocation coordinates</span>
                </div>
                <span className="text-gold-400 font-bold">Jaipur, RJ (26.9124, 75.7873)</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL: ADD PRODUCT */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-fade-in text-white">
          <div className="relative w-full max-w-2xl bg-[#0d1017] border border-gold-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400 font-semibold block mb-1">
                INVENTORY MANAGEMENT
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">Add New Product</h3>
              <p className="text-xs text-white/50 font-light mt-1">
                Enter product details, pricing tiers, and warehouse stock units.
              </p>
            </div>

            <form onSubmit={handleSaveNewProduct} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Product Title / Name *</label>
                  <input
                    type="text"
                    required
                    value={productFormData.name}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, name: e.target.value })
                    }
                    placeholder="e.g. Celestial Diamond Solitaire"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Tagline / Subtitle</label>
                  <input
                    type="text"
                    value={productFormData.tagline}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, tagline: e.target.value })
                    }
                    placeholder="e.g. Rare Jaipur Heritage Collection"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Category</label>
                  <select
                    value={productFormData.category}
                    onChange={(e) =>
                      setProductFormData({
                        ...productFormData,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#141924] border border-white/15 text-white text-xs"
                  >
                    <option value="Tech & Gadgets">Tech & Gadgets</option>
                    <option value="Royalty Jewellery">Royalty Jewellery</option>
                    <option value="Haute Clothing">Haute Clothing</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Brand</label>
                  <input
                    type="text"
                    value={productFormData.brand}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, brand: e.target.value })
                    }
                    placeholder="Ashren Atelier"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">SKU Code *</label>
                  <input
                    type="text"
                    required
                    value={productFormData.sku}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, sku: e.target.value })
                    }
                    placeholder="ASH-SKU-901"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Retail Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productFormData.price}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs font-bold text-gold-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Original Price (₹)</label>
                  <input
                    type="number"
                    value={productFormData.originalPrice}
                    onChange={(e) =>
                      setProductFormData({
                        ...productFormData,
                        originalPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Wholesale Unit (₹)</label>
                  <input
                    type="number"
                    value={productFormData.wholesalePrice}
                    onChange={(e) =>
                      setProductFormData({
                        ...productFormData,
                        wholesalePrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs font-bold text-emerald-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Stock (Units) *</label>
                  <input
                    type="number"
                    required
                    value={productFormData.stock}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, stock: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="text-white/70 text-[11px] block">
                  Select Product Asset (or enter custom image URL)
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {HERO_IMAGE_OPTIONS.map((img) => (
                    <button
                      type="button"
                      key={img.src}
                      onClick={() =>
                        setProductFormData({ ...productFormData, heroImage: img.src })
                      }
                      className={`relative aspect-square rounded-xl overflow-hidden border p-1 transition-all ${
                        productFormData.heroImage === img.src
                          ? "border-gold-400 ring-2 ring-gold-400/40 bg-gold-500/10"
                          : "border-white/10 hover:border-white/30 bg-black/30"
                      }`}
                      title={img.label}
                    >
                      <Image src={img.src} alt={img.label} fill className="object-contain" />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={productFormData.heroImage}
                  onChange={(e) =>
                    setProductFormData({ ...productFormData, heroImage: e.target.value })
                  }
                  placeholder="/products/hero-asset-1.png or https://..."
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/70 text-[11px]">Description</label>
                <textarea
                  rows={3}
                  value={productFormData.description}
                  onChange={(e) =>
                    setProductFormData({ ...productFormData, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
                >
                  Save to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT PRODUCT */}
      {/* ========================================================================= */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto animate-fade-in text-white">
          <div className="relative w-full max-w-2xl bg-[#0d1017] border border-gold-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedProduct(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400 font-semibold block mb-1">
                EDIT CATALOG ITEM
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">Edit Product</h3>
              <p className="text-xs text-white/50 font-light mt-1">
                Update stock units, pricing, or details for SKU {selectedProduct.sku}.
              </p>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Product Title / Name *</label>
                  <input
                    type="text"
                    required
                    value={productFormData.name}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Tagline / Subtitle</label>
                  <input
                    type="text"
                    value={productFormData.tagline}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, tagline: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Category</label>
                  <select
                    value={productFormData.category}
                    onChange={(e) =>
                      setProductFormData({
                        ...productFormData,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#141924] border border-white/15 text-white text-xs"
                  >
                    <option value="Tech & Gadgets">Tech & Gadgets</option>
                    <option value="Royalty Jewellery">Royalty Jewellery</option>
                    <option value="Haute Clothing">Haute Clothing</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Brand</label>
                  <input
                    type="text"
                    value={productFormData.brand}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, brand: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">SKU Code</label>
                  <input
                    type="text"
                    required
                    value={productFormData.sku}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, sku: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Retail Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productFormData.price}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs font-bold text-gold-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Original Price (₹)</label>
                  <input
                    type="number"
                    value={productFormData.originalPrice}
                    onChange={(e) =>
                      setProductFormData({
                        ...productFormData,
                        originalPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Wholesale Unit (₹)</label>
                  <input
                    type="number"
                    value={productFormData.wholesalePrice}
                    onChange={(e) =>
                      setProductFormData({
                        ...productFormData,
                        wholesalePrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs font-bold text-emerald-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-white/70 text-[11px]">Stock (Units) *</label>
                  <input
                    type="number"
                    required
                    value={productFormData.stock}
                    onChange={(e) =>
                      setProductFormData({ ...productFormData, stock: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="text-white/70 text-[11px] block">Select Image Asset</label>
                <div className="grid grid-cols-7 gap-2">
                  {HERO_IMAGE_OPTIONS.map((img) => (
                    <button
                      type="button"
                      key={img.src}
                      onClick={() =>
                        setProductFormData({ ...productFormData, heroImage: img.src })
                      }
                      className={`relative aspect-square rounded-xl overflow-hidden border p-1 transition-all ${
                        productFormData.heroImage === img.src
                          ? "border-gold-400 ring-2 ring-gold-400/40 bg-gold-500/10"
                          : "border-white/10 hover:border-white/30 bg-black/30"
                      }`}
                      title={img.label}
                    >
                      <Image src={img.src} alt={img.label} fill className="object-contain" />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={productFormData.heroImage}
                  onChange={(e) =>
                    setProductFormData({ ...productFormData, heroImage: e.target.value })
                  }
                  placeholder="/products/hero-asset-1.png"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/70 text-[11px]">Description</label>
                <textarea
                  rows={3}
                  value={productFormData.description}
                  onChange={(e) =>
                    setProductFormData({ ...productFormData, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setSelectedProduct(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: DELETE PRODUCT CONFIRMATION */}
      {/* ========================================================================= */}
      {isDeleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in text-white">
          <div className="relative w-full max-w-md bg-[#0d1017] border border-rose-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedProduct(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
              <Trash2 className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-white">Delete Product?</h3>
              <p className="text-xs text-white/60">
                Are you sure you want to permanently remove{" "}
                <span className="text-white font-bold">&ldquo;{selectedProduct.name}&rdquo;</span> (SKU:{" "}
                {selectedProduct.sku}) from the master catalog?
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3 text-left">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                <Image
                  src={selectedProduct.heroImage}
                  alt={selectedProduct.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate">
                  {selectedProduct.name}
                </div>
                <div className="text-[11px] font-mono text-emerald-400">
                  {formatINR(selectedProduct.price)} • {selectedProduct.stock} in stock
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedProduct(null);
                }}
                className="py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white text-xs font-mono"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-rose-600/20"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: BULK CSV IMPORT */}
      {/* ========================================================================= */}
      {isCsvModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in text-white">
          <div className="relative w-full max-w-md bg-[#0d1017] border border-gold-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <button
              onClick={() => {
                setIsCsvModalOpen(false);
                setCsvFileUploaded(false);
                setCsvImported(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400 font-semibold block mb-1">
                INVENTORY INGESTION
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">Upload Catalog</h3>
              <p className="text-xs text-white/50 font-light mt-1">
                Upload your wholesale manifest in CSV or Excel format.
              </p>
            </div>

            {!csvFileUploaded ? (
              <div
                onClick={() => setCsvFileUploaded(true)}
                className="border-2 border-dashed border-white/20 hover:border-gold-400/80 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-white/[0.02] hover:bg-white/[0.04] space-y-3"
              >
                <Upload className="w-10 h-10 text-gold-400 mx-auto" />
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-white block">
                    Click to browse or drag CSV / Excel file here
                  </span>
                  <span className="text-[10px] text-white/40 font-mono block">
                    Supports .csv, .xlsx up to 50MB (50,000+ SKUs)
                  </span>
                </div>
              </div>
            ) : csvImported ? (
              <div className="py-4 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Catalog Manifest Ingested!</h4>
                  <p className="text-xs text-white/60">
                    Master stock database updated. Wholesaler pricing now live on storefront.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCsvModalOpen(false);
                    setCsvFileUploaded(false);
                    setCsvImported(false);
                  }}
                  className="w-full py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in text-xs font-mono">
                <div className="bg-black/50 border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Check className="w-4 h-4" />
                    <span>File validated: ASHREN_BATCH_2026.csv</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Check className="w-4 h-4" />
                    <span>2,481 products detected</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>18 duplicates auto-merged</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Check className="w-4 h-4" />
                    <span>0 critical errors</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCsvImported(true);
                    triggerToast("Bulk manifest ingested into Master Catalog.");
                  }}
                  className="w-full py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-widest transition-colors shadow-lg"
                >
                  Import Products
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: META CAMPAIGN CREATOR */}
      {/* ========================================================================= */}
      {isCampaignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in text-white">
          <div className="relative w-full max-w-lg bg-[#0d1017] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <button
              onClick={() => setIsCampaignModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 font-semibold block mb-1">
                CAMPAIGN CREATOR
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">Launch Meta Campaign</h3>
            </div>

            {campaignLaunched ? (
              <div className="py-6 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">
                  Campaign &ldquo;{newCampaignName}&rdquo; Launched!
                </h4>
                <p className="text-xs text-white/60">
                  Ad creative submitted to Meta Ad Review. Estimated activation in 15 minutes.
                </p>
                <button
                  onClick={() => setIsCampaignModalOpen(false)}
                  className="w-full py-3 rounded-full bg-gold-500 text-black font-bold text-xs uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-white/60 text-[11px] block">Campaign Name</label>
                  <input
                    type="text"
                    value={newCampaignName}
                    onChange={(e) => setNewCampaignName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-white/60 text-[11px] block">Objective</label>
                    <select
                      value={campaignObjective}
                      onChange={(e) => setCampaignObjective(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#141924] border border-white/15 text-white text-xs"
                    >
                      <option value="CATALOG_SALES">Catalog Sales</option>
                      <option value="CONVERSIONS">Conversions (Leads)</option>
                      <option value="TRAFFIC">High-Intent Traffic</option>
                      <option value="AWARENESS">Brand Awareness</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-white/60 text-[11px] block">Daily Budget (INR)</label>
                    <input
                      type="number"
                      value={campaignDailyBudget}
                      onChange={(e) => setCampaignDailyBudget(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                    />
                  </div>
                </div>

                <div className="bg-black/40 border border-white/10 rounded-xl p-3.5 space-y-2 text-[11px]">
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider">
                    Meta Algorithmic Forecast:
                  </span>
                  <div className="flex justify-between text-white/80">
                    <span>Est. Reach (Weekly):</span>
                    <span className="text-white font-bold">180,000 - 320,000</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Est. Clicks:</span>
                    <span className="text-white font-bold">6,400 - 9,200</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Est. Conversions:</span>
                    <span className="text-emerald-400 font-bold">28 - 45 WhatsApp Leads</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const newEntry: MetaCampaign = {
                      id: `camp-${Date.now()}`,
                      name: newCampaignName,
                      objective: campaignObjective as any,
                      status: "ACTIVE",
                      spend: 0,
                      revenue: 0,
                      roas: 4.8,
                      reach: "Just Launched",
                      impressions: "Pending",
                      ctr: "3.2%",
                      conversions: 0,
                      cpc: 8.5,
                      dailyBudget: parseInt(campaignDailyBudget) || 5000,
                    };
                    setCampaigns([newEntry, ...campaigns]);
                    setCampaignLaunched(true);
                  }}
                  className="w-full py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-widest transition-colors shadow-lg"
                >
                  Launch Campaign
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
