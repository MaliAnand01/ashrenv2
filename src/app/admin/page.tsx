"use client";

import React, { useState } from "react";
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
  RefreshCw,
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

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [orders, setOrders] = useState<WhatsAppOrder[]>(INITIAL_WHATSAPP_ORDERS);
  const [campaigns, setCampaigns] = useState<MetaCampaign[]>(INITIAL_META_CAMPAIGNS);
  const [productsList, setProductsList] = useState<Product[]>(ASHREN_PRODUCTS);
  
  // Modals
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [csvFileUploaded, setCsvFileUploaded] = useState(false);
  const [csvImported, setCsvImported] = useState(false);

  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [campaignStep, setCampaignStep] = useState(1);
  const [newCampaignName, setNewCampaignName] = useState("Festive Bridal Kundan Wholesale Push");
  const [campaignObjective, setCampaignObjective] = useState("CATALOG_SALES");
  const [campaignDailyBudget, setCampaignDailyBudget] = useState("7500");
  const [campaignLaunched, setCampaignLaunched] = useState(false);

  // Search & Filters
  const [inventorySearch, setInventorySearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("ALL");

  // Status progression for orders
  const updateOrderStatus = (orderId: string, nextStatus: WhatsAppOrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: nextStatus } : ord))
    );
  };

  const filteredProducts = productsList.filter(
    (p) =>
      p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.category.toLowerCase().includes(inventorySearch.toLowerCase())
  );

  const filteredOrders =
    orderStatusFilter === "ALL"
      ? orders
      : orders.filter((o) => o.status === orderStatusFilter);

  return (
    <div className="min-h-screen bg-[#06080c] text-white flex flex-col lg:flex-row antialiased font-sans">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-64 bg-[#090b10] border-b lg:border-b-0 lg:border-r border-white/10 shrink-0 p-5 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Logo & Back Link */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-black font-bold font-serif text-sm">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-widest text-sm font-bold text-white">
                  ASHREN
                </span>
                <span className="text-[9px] uppercase font-mono tracking-wider text-gold-400">
                  Wholesale Console
                </span>
              </div>
            </Link>
            <Link
              href="/"
              className="p-1.5 rounded-lg bg-[#12141a]/5 hover:bg-[#12141a]/10 text-white/60 hover:text-white transition-colors"
              title="Return to Storefront"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === "dashboard"
                  ? "bg-gold-500 text-black font-bold shadow-md"
                  : "text-white/70 hover:bg-[#12141a]/5 hover:text-white"
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
                  : "text-white/70 hover:bg-[#12141a]/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Boxes className="w-4 h-4" />
                <span>Inventory</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                activeTab === "inventory" ? "bg-black/20 text-black font-bold" : "bg-[#12141a]/10 text-white/60"
              }`}>
                12.4K
              </span>
            </button>

            <button
              onClick={() => setActiveTab("whatsapp-orders")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                activeTab === "whatsapp-orders"
                  ? "bg-gold-500 text-black font-bold shadow-md"
                  : "text-white/70 hover:bg-[#12141a]/5 hover:text-white"
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
                  : "text-white/70 hover:bg-[#12141a]/5 hover:text-white"
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
                  : "text-white/70 hover:bg-[#12141a]/5 hover:text-white"
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
                  : "text-white/70 hover:bg-[#12141a]/5 hover:text-white"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics & Velocity</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === "settings"
                  ? "bg-gold-500 text-black font-bold shadow-md"
                  : "text-white/70 hover:bg-[#12141a]/5 hover:text-white"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Wholesale Node Info */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-mono text-white/80">Jaipur Atelier Node</span>
          </div>
          <span className="text-[10px] font-mono text-white/40 block">
            Session: Executive Wholesaler ID #8849
          </span>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        
        {/* ========================================================================= */}
        {/* TAB 1: EXECUTIVE DASHBOARD */}
        {/* ========================================================================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                  ENTERPRISE WHOLESALE METRICS
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Executive Commercial Dashboard
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCsvModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#12141a]/5 hover:bg-[#12141a]/10 border border-white/10 text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-gold-400" />
                  <span>Import Inventory</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab("meta-ads");
                    setIsCampaignModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Campaign</span>
                </button>
              </div>
            </div>

            {/* Metric KPI Cards */}
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
                  <span>Inventory Value on Hand</span>
                  <span className="text-gold-400 font-semibold font-mono">12,482 SKUs</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-gold-300">
                  ₹38,20,000
                </div>
                <span className="text-[11px] text-white/40 block">
                  Low Stock: 14 lots • Out of Stock: 3
                </span>
              </div>

              <div className="bg-[#0b0d13] border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-white/50">
                  <span>Meta Ads ROAS</span>
                  <span className="text-indigo-400 font-semibold">Active Spend</span>
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
                  <span>Average Wholesale Lot Value</span>
                  <span className="text-emerald-400 font-semibold">AOV</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  ₹2,41,950
                </div>
                <span className="text-[11px] text-white/40 block">
                  Conversion rate on WhatsApp leads: 38.4%
                </span>
              </div>
            </div>

            {/* Visual Revenue Performance Graph & Recent Leads */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Animated SVG Chart */}
              <div className="lg:col-span-8 bg-[#0b0d13] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Monthly Wholesale Order Volume & Revenue Trend
                    </h3>
                    <span className="text-xs text-white/40 font-mono">
                      Q3 FY26 Performance trajectory (in Lakhs INR)
                    </span>
                  </div>
                  <span className="text-xs font-mono text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded border border-gold-500/20">
                    Live Telemetry
                  </span>
                </div>

                {/* SVG Area Chart */}
                <div className="h-64 w-full pt-4">
                  <svg viewBox="0 0 700 220" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Horizontal Grid lines */}
                    <line x1="0" y1="40" x2="700" y2="40" stroke="#ffffff10" strokeDasharray="3 3" />
                    <line x1="0" y1="100" x2="700" y2="100" stroke="#ffffff10" strokeDasharray="3 3" />
                    <line x1="0" y1="160" x2="700" y2="160" stroke="#ffffff10" strokeDasharray="3 3" />

                    {/* Gradient Fill */}
                    <path
                      d="M 0,180 Q 100,160 175,130 T 350,90 T 525,45 T 700,20 L 700,210 L 0,210 Z"
                      fill="url(#revenueGrad)"
                    />

                    {/* Main Line Curve */}
                    <path
                      d="M 0,180 Q 100,160 175,130 T 350,90 T 525,45 T 700,20"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="3"
                    />

                    {/* Data Points */}
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

              {/* Incoming WhatsApp Order Requests */}
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
                        className="bg-[#12141a]/[0.03] border border-white/[0.06] p-3 rounded-xl flex items-center justify-between"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white truncate">
                              {ord.customerName}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#12141a]/10 text-white/60">
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
                  className="w-full py-2.5 rounded-xl bg-[#12141a]/5 hover:bg-[#12141a]/10 border border-white/10 text-xs font-medium text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Open WhatsApp Dispatch Board</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: WHOLESALE INVENTORY MANAGEMENT (12,482 SKUS & BULK CSV IMPORT) */}
        {/* ========================================================================= */}
        {activeTab === "inventory" && (
          <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                  MASTER ENTERPRISE CATALOG
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Wholesale Inventory Management
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCsvModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Bulk CSV / Excel Import</span>
                </button>
                <button
                  onClick={() => alert("Catalog exported to ASHREN_MASTER_INVENTORY.csv")}
                  className="px-4 py-2 rounded-xl bg-[#12141a]/5 hover:bg-[#12141a]/10 border border-white/10 text-xs font-medium text-white flex items-center gap-2 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Inventory Quick Overview Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#0b0d13] border border-white/10 p-4 rounded-xl">
                <span className="text-xs font-mono text-white/40 block">Total Active SKUs</span>
                <span className="text-xl font-bold font-mono text-white mt-1 block">12,482</span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-4 rounded-xl">
                <span className="text-xs font-mono text-white/40 block">Total Valuation</span>
                <span className="text-xl font-bold font-mono text-gold-300 mt-1 block">₹38,20,000</span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-4 rounded-xl">
                <span className="text-xs font-mono text-white/40 block">Low Stock Alert</span>
                <span className="text-xl font-bold font-mono text-amber-400 mt-1 block">14 Lots</span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-4 rounded-xl">
                <span className="text-xs font-mono text-white/40 block">Out of Stock</span>
                <span className="text-xl font-bold font-mono text-rose-400 mt-1 block">3 Lots</span>
              </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  placeholder="Filter by product name, SKU, or category..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#12141a]/[0.04] border border-white/10 focus:border-gold-400 focus:outline-none text-xs text-white"
                />
              </div>

              <div className="text-xs font-mono text-white/50">
                Displaying {filteredProducts.length} wholesale catalog rows
              </div>
            </div>

            {/* Table */}
            <div className="bg-[#0b0d13] border border-white/10 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#12141a]/[0.04] border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Product & SKU</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Stock Units</th>
                    <th className="py-3 px-4">Wholesale MOQ</th>
                    <th className="py-3 px-4">Unit Wholesale</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#12141a]/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#12141a]/5 shrink-0">
                            <Image src={p.heroImage} alt={p.name} fill className="object-cover" />
                          </div>
                          <div>
                            <span className="font-sans font-semibold text-white block">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-gold-400">{p.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-white/70">{p.category}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-white">{p.stock}</span>
                        <span className="text-white/40 block text-[10px]">in warehouse</span>
                      </td>
                      <td className="py-3 px-4 text-white/80">{p.wholesaleMOQ} Units</td>
                      <td className="py-3 px-4 font-bold text-emerald-400">
                        {formatINR(p.wholesalePrice)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => alert(`Editing SKU: ${p.sku}`)}
                          className="px-2.5 py-1 rounded bg-[#12141a]/10 hover:bg-[#12141a]/20 text-white transition-colors"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: WHATSAPP ORDERS ADMIN DISPATCH BOARD */}
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

              {/* Status Filter */}
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

            {/* Orders Table */}
            <div className="bg-[#0b0d13] border border-white/10 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#12141a]/[0.04] border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
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
                    <tr key={ord.id} className="hover:bg-[#12141a]/[0.02] transition-colors">
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
                          href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(ord.customerName)},%20this%20is%20Ashren%20Atelier%20regarding%20order%20${ord.orderNumber}.`}
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
                onClick={() => alert("Creator application link generated.")}
                className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Onboard New Creator</span>
              </button>
            </div>

            {/* Creator Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-[#0b0d13] border border-white/10 p-5 rounded-2xl space-y-2">
                <span className="text-xs font-mono text-white/40">Network Reel Views</span>
                <span className="text-2xl font-bold font-mono text-white block">8.54 Million</span>
                <span className="text-xs text-emerald-400">+38% organic reach</span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-5 rounded-2xl space-y-2">
                <span className="text-xs font-mono text-white/40">Attributed Wholesale Sales</span>
                <span className="text-2xl font-bold font-mono text-emerald-400 block">₹32,40,000</span>
                <span className="text-xs text-white/40">From tagged product clicks</span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-5 rounded-2xl space-y-2">
                <span className="text-xs font-mono text-white/40">Commission Disbursed</span>
                <span className="text-2xl font-bold font-mono text-gold-400 block">₹3,24,000</span>
                <span className="text-xs text-white/40">10% Tier 1 partner cut</span>
              </div>
            </div>

            {/* Creators Table */}
            <div className="bg-[#0b0d13] border border-white/10 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#12141a]/[0.04] border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
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
                    <tr key={cr.id} className="hover:bg-[#12141a]/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gold-400/40 shrink-0">
                            <Image src={cr.creatorAvatar} alt={cr.creatorName} fill className="object-cover" />
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
        {/* TAB 5: META ADS DASHBOARD & CAMPAIGN CREATOR */}
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

            {/* Overall Meta Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0b0d13] border border-white/10 p-5 rounded-2xl">
                <span className="text-xs font-mono text-white/40">Total Ad Spend</span>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">₹1,59,000</span>
                <span className="text-[10px] text-white/40 font-mono">Last 30 Days</span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-5 rounded-2xl">
                <span className="text-xs font-mono text-white/40">Attributed Ad Revenue</span>
                <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">₹7,89,930</span>
                <span className="text-[10px] text-emerald-400 font-mono">+18% vs Last Month</span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-5 rounded-2xl">
                <span className="text-xs font-mono text-white/40">Blended ROAS</span>
                <span className="text-2xl font-bold font-mono text-gold-300 mt-1 block">4.96x</span>
                <span className="text-[10px] text-gold-400 font-mono">Target: 3.50x</span>
              </div>
              <div className="bg-[#0b0d13] border border-white/10 p-5 rounded-2xl">
                <span className="text-xs font-mono text-white/40">Total Audience Reach</span>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">1.23 Million</span>
                <span className="text-[10px] text-white/40 font-mono">High Net-Worth / B2B</span>
              </div>
            </div>

            {/* Active Campaigns Table */}
            <div className="bg-[#0b0d13] border border-white/10 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#12141a]/[0.04] border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
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
                    <tr key={camp.id} className="hover:bg-[#12141a]/[0.02] transition-colors">
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
        {/* TAB 6: ANALYTICS & REVENUE VELOCITY */}
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
              {/* Category Contribution */}
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
                    <div className="w-full h-2 bg-[#12141a]/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gold-400 w-[38.5%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-white/70 mb-1">
                      <span>Fine Jewellery</span>
                      <span className="text-emerald-400">₹24.8L (29.4%)</span>
                    </div>
                    <div className="w-full h-2 bg-[#12141a]/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[29.4%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-white/70 mb-1">
                      <span>Studio Acoustics</span>
                      <span className="text-indigo-400">₹14.2L (16.8%)</span>
                    </div>
                    <div className="w-full h-2 bg-[#12141a]/10 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-400 w-[16.8%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-white/70 mb-1">
                      <span>Heritage Couture</span>
                      <span className="text-rose-400">₹8.9L (10.6%)</span>
                    </div>
                    <div className="w-full h-2 bg-[#12141a]/10 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-400 w-[10.6%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-white/70 mb-1">
                      <span>Next-Gen Gaming</span>
                      <span className="text-amber-400">₹3.9L (4.7%)</span>
                    </div>
                    <div className="w-full h-2 bg-[#12141a]/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 w-[4.7%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Geographic Hubs */}
              <div className="bg-[#0b0d13] border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-semibold text-white">
                  Top Wholesale Inbound Dispatch Regions
                </h3>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#12141a]/[0.03] border border-white/[0.06]">
                    <div>
                      <span className="text-white font-semibold block">Jaipur & Rajasthan Belt</span>
                      <span className="text-[10px] text-white/40">Bridal & Heritage Retailers</span>
                    </div>
                    <span className="text-gold-400 font-bold">142 Inquiries</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#12141a]/[0.03] border border-white/[0.06]">
                    <div>
                      <span className="text-white font-semibold block">Mumbai & Maharashtra</span>
                      <span className="text-[10px] text-white/40">Cinematography & Audio Studios</span>
                    </div>
                    <span className="text-gold-400 font-bold">98 Inquiries</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#12141a]/[0.03] border border-white/[0.06]">
                    <div>
                      <span className="text-white font-semibold block">Bengaluru & Hyderabad</span>
                      <span className="text-[10px] text-white/40">Esports Lounges & Tech Distributors</span>
                    </div>
                    <span className="text-gold-400 font-bold">76 Inquiries</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#12141a]/[0.03] border border-white/[0.06]">
                    <div>
                      <span className="text-white font-semibold block">NCR & Delhi</span>
                      <span className="text-[10px] text-white/40">Luxury Boutiques</span>
                    </div>
                    <span className="text-gold-400 font-bold">54 Inquiries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: SETTINGS */}
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
                  <span className="text-white font-semibold block">WhatsApp Business API Webhook</span>
                  <span className="text-white/40 text-[10px]">Direct routing to concierge mobile</span>
                </div>
                <span className="text-emerald-400 font-bold">ACTIVE (+91 98290 88201)</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/[0.06]">
                <div>
                  <span className="text-white font-semibold block">Meta Graph API Ads Token</span>
                  <span className="text-white/40 text-[10px]">Synchronized campaign tracking</span>
                </div>
                <span className="text-emerald-400 font-bold">SYNCED (EAAG82...)</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="text-white font-semibold block">Weather Service Fallback Hub</span>
                  <span className="text-white/40 text-[10px]">Default geolocation coordinates</span>
                </div>
                <span className="text-gold-400 font-bold">Jaipur, RJ (26.9124, 75.7873)</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: BULK PRODUCT IMPORT MODAL (AS SPECIFIED BY USER) */}
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
              <h3 className="font-serif text-2xl font-bold text-white">
                UPLOAD PRODUCTS
              </h3>
              <p className="text-xs text-white/50 font-light mt-1">
                Upload your wholesale manifest in CSV or Excel format.
              </p>
            </div>

            {!csvFileUploaded ? (
              /* Drag Drop Zone */
              <div
                onClick={() => setCsvFileUploaded(true)}
                className="border-2 border-dashed border-white/20 hover:border-gold-400/80 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-[#12141a]/[0.02] hover:bg-[#12141a]/[0.04] space-y-3"
              >
                <Upload className="w-10 h-10 text-gold-400 mx-auto" />
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-white block">
                    Click to browse or drag CSV / Excel file here
                  </span>
                  <span className="text-[10px] text-white/40 font-mono block">
                    Supports .csv, .xlsx up to 50MB (Supports 50,000+ SKUs)
                  </span>
                </div>
              </div>
            ) : csvImported ? (
              /* Success State */
              <div className="py-4 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">
                    2,481 Products Added to Catalog!
                  </h4>
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
                  className="w-full py-3 rounded-full bg-[#12141a] hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Validation State */
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
                  onClick={() => setCsvImported(true)}
                  className="w-full py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-widest transition-colors shadow-lg"
                >
                  [ IMPORT PRODUCTS ]
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: META CAMPAIGN CREATOR (STEP BY STEP) */}
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
              <h3 className="font-serif text-2xl font-bold text-white">
                Launch Meta Ad Campaign
              </h3>
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
                    className="w-full px-3.5 py-2 rounded-xl bg-[#12141a]/[0.04] border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
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
                      className="w-full px-3.5 py-2 rounded-xl bg-[#12141a]/[0.04] border border-white/15 focus:border-gold-400 focus:outline-none text-white text-xs"
                    />
                  </div>
                </div>

                {/* Performance Estimation Simulation */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-3.5 space-y-2 text-[11px]">
                  <span className="text-white/40 block text-[9px] uppercase tracking-wider">
                    Algorithmic Meta Forecast:
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
                    <span>Est. Wholesale Conversions:</span>
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
                  LAUNCH CAMPAIGN
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
