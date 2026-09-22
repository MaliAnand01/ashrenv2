# DECISIONS.md — Architectural Decision Log

## ADR-001: Next.js App Router & Client-Side Presentation Architecture
- **Context**: Client demo requires high visual polish, zero backend complexity, and lightning fast navigation.
- **Decision**: Next.js App Router with TypeScript, Tailwind CSS, Framer Motion, and GSAP. Mock state stored cleanly in client stores/hooks.
- **Consequences**: No backend dependencies or external service downtime risk during client demo.

## ADR-002: Ashren Asset Pipeline
- **Context**: Real Ashren images available in `Ashren-project/imgs/products` (anarkali, controller, drone, earbuds, headset, jewellery, camera).
- **Decision**: Copy assets into Next.js `public/products/` with structured metadata in `src/data/products.ts`.

## ADR-003: Weather Service with Realistic Mock Fallbacks & Demo Override
- **Context**: Client presentations often happen indoors or where geolocation may be denied.
- **Decision**: Browser Geolocation API with automatic fallback to Jaipur / Clear Day, plus an interactive subtle demo weather switcher so the client can preview all 10 atmospheric states on demand.
