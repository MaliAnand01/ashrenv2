# SPEC.md — Project Specification

> **Status**: `FINALIZED`
> **Project**: ASHREN Premium Ecommerce Prototype
> **Audience**: Client Presentation & Executive Demo

## Vision
Build a high-fidelity, luxury editorial ecommerce prototype for ASHREN that merges futuristic commerce with cinematic product storytelling. The platform responds dynamically to real-time user environment and weather conditions, showcases real wholesale product catalog items with tangible depth and motion, incorporates creator-led social reels ("DISCOVER. WATCH. SHOP."), friction-free WhatsApp ordering, and features a full-fledged enterprise admin console for inventory, WhatsApp orders, creator marketing, Meta ads, and analytics.

## Goals
1. **Atmospheric Weather-Responsive Hero**: Deep ambient environment (lighting, shadows, copy, depth) adapting to browser Geolocation weather (Clear Day, Rain, Storm, Night, Sunset, etc.) with real Ashren product imagery.
2. **Editorial Ecommerce UX**: 14 distinct homepage sections, animated full-screen search, rich category showcases, product quick-view, recently viewed, and dedicated product details.
3. **Creator Commerce (Reels)**: Social commerce interface with vertical reel cards, video/image expansion, tagged products, and instant preview.
4. **WhatsApp Direct Ordering & Floating Concierge**: Order via WhatsApp modal with automatic product SKU/details and confirmation state, plus floating concierge ("Need help?").
5. **Enterprise Wholesaler Admin Suite**: `/admin` portal with revenue metrics, 12K+ inventory management, bulk CSV validation simulation, WhatsApp order dispatching, creator performance, Meta Ads dashboard with campaign builder, and animated analytics charts.

## Non-Goals (Out of Scope)
- Real backend databases (PostgreSQL/MongoDB) or authentication servers.
- Actual payment gateway checkouts (Stripe/Razorpay) — primary business funnel is WhatsApp wholesale ordering.
- Live WhatsApp Cloud API or Meta Graph API webhook connections (use high-fidelity mock interfaces).
- Generic AI placeholder images — strictly use real Ashren assets in `Ashren-project/imgs/products`.

## Users
- **B2C & B2B Wholesale Buyers**: Browsing curated collections, viewing high-res assets, requesting orders directly over WhatsApp, requesting calls.
- **Brand Executives & Store Admins**: Managing wholesale inventories, tracking incoming order leads, monitoring creator commissions, configuring ad campaigns.

## Constraints
- Timebox: 6–7 hours prototype delivery.
- Frontend: Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui patterns, Lucide icons, Framer Motion, GSAP + ScrollTrigger.
- Asset Integrity: Utilize real Ashren catalog photography provided in the workspace.

## Success Criteria
- [ ] Seamless weather detection and atmospheric transformation of hero section with demo fallback.
- [ ] Complete 14-section homepage flow with flawless mobile and desktop responsiveness.
- [ ] Functional WhatsApp order modal with realistic submission flow.
- [ ] Interactive Creator Reels with modal product preview.
- [ ] Comprehensive `/admin` platform with all 6 functional views (Dashboard, Inventory with CSV import, WhatsApp Orders, Creators, Meta Ads + Campaign Creator, Analytics).
- [ ] High-performance load times, clean code architecture, and no console errors.
