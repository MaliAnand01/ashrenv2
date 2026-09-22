"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { CinematicFooter } from "@/components/navigation/CinematicFooter";
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

const FAQS = [
  {
    q: "How do you safely ship expensive gold jewellery across India?",
    a: "All jewellery orders above ₹50,000 are dispatched in tamper-evident armored boxes via specialized insured logistics partners (such as Sequel and BVC). The shipment is 100% insured against transit loss until signed by you.",
  },
  {
    q: "Are the gold and polki stones certified?",
    a: "Yes. All our gold jewellery carries the official BIS Hallmark 22K (916) laser stamp. Each piece comes with a government-recognized gemological certificate authenticating the uncut polki diamonds and natural emeralds.",
  },
  {
    q: "Can I request custom tailoring for the Anarkali dress?",
    a: "Yes! Once you place an order, our tailoring team reaches out on WhatsApp to note your bust, waist, length, and sleeve measurements. Custom stitching takes 3-5 days before dispatch.",
  },
  {
    q: "What is the warranty policy on smart glasses and controllers?",
    a: "All Ashren electronics (smart glasses, ANC headphones, watches, and gaming controllers) include a 1-year replacement warranty against manufacturing faults. If an issue occurs, we arrange a pickup and replacement.",
  },
  {
    q: "How can I order directly via WhatsApp?",
    a: "You can click any 'Order on WhatsApp' button on any product card or message our concierge directly at +91 98290 12345. Our team will verify stock, provide measurement advice, and send payment links.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    category: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        city: "",
        category: "General Inquiry",
        message: "",
      });
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-[#07070a] text-white flex flex-col justify-between selection:bg-amber-500 selection:text-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1 space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto pt-4">
          <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold block">
            Direct Atelier Support
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            We Are Here to Help
          </h1>
          <p className="text-xs sm:text-sm text-white/70 font-normal">
            Whether you need custom bridal sizing, jewellery certification verification, or gadget support, reach out to our Jaipur team.
          </p>
        </div>

        {/* 2-Column: Contact Form & Studio Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: 7 Cols */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-md">
            <h2 className="font-serif text-2xl font-bold text-white mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs text-white/60 mb-6 font-normal">
              Fill out this short form and our atelier concierge will reply within 3 working hours.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Message Received!</h4>
                <p className="text-xs text-white/70">
                  Thank you, {formData.name || "Customer"}. Our Jaipur team will call or WhatsApp you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-white/80 font-mono">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-white/80 font-mono">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-white/80 font-mono">Your City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jaipur, Mumbai, Delhi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-white/80 font-mono">Product Interest</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#121016] border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="General Inquiry">General Question</option>
                      <option value="Jewellery Verification">Royalty Jewellery (Polki & Gold)</option>
                      <option value="Dress Sizing">Custom Anarkali Sizing</option>
                      <option value="Tech Support">Smart Audio & Gadgets</option>
                      <option value="Bulk Order">Wedding or Bulk Corporate Order</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/80 font-mono">Message / Requirements *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the item you are interested in or questions you have..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Cards: 5 Cols */}
          <div className="lg:col-span-5 space-y-5">
            {/* Quick WhatsApp Card */}
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono uppercase tracking-wider">
                <MessageCircle className="w-4 h-4 fill-amber-400" />
                <span>Fastest Response</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white">Chat on WhatsApp</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Connect directly with our senior jewellery consultant or tech specialist. Average response time: under 5 minutes.
              </p>
              <a
                href="https://wa.me/919829012345?text=Hello%20Ashren%20Atelier,%20I%20have%20an%20inquiry%20regarding%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-black" />
                <span>+91 98290 12345</span>
              </a>
            </div>

            {/* Studio Info Card */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-white">Jaipur Atelier Studio</h3>
              <div className="space-y-3 text-xs text-white/75">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Johari Bazaar, Near City Palace, Pink City, Jaipur, Rajasthan 302003</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Monday to Saturday: 10:30 AM to 8:00 PM IST</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>+91 98290 12345 (Sales & Concierge)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>care@ashrenatelier.com</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold block">
              Common Questions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto pt-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-white/[0.01] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-serif text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 pt-1 text-xs text-white/70 leading-relaxed font-normal border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <CinematicFooter />
    </main>
  );
}
