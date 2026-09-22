import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { ExperienceProvider } from "@/lib/experience/ExperienceContext";
import { SearchDrawer } from "@/components/navigation/SearchDrawer";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { WhatsAppOrderModal } from "@/components/product/WhatsAppOrderModal";
import { FloatingConcierge } from "@/components/navigation/FloatingConcierge";
import { CreatorReelModal } from "@/components/reels/CreatorReelModal";

export const metadata: Metadata = {
  title: "ASHREN | Luxury Indian Ecommerce & Wholesale Atelier",
  description: "India's premier context-responsive commerce atelier. Aerospace 4K drones, Beryllium studio acoustics, Hall-Effect gaming rigs, and 22K Jaipur Kundan fine jewellery with direct wholesale WhatsApp procurement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0b0d] text-white antialiased selection:bg-dark_teal selection:text-white font-sans transition-colors duration-500">
        <ExperienceProvider>
          <StoreProvider>
            {children}
            <SearchDrawer />
            <QuickViewModal />
            <WhatsAppOrderModal />
            <CreatorReelModal />
            <FloatingConcierge />
          </StoreProvider>
        </ExperienceProvider>
      </body>
    </html>
  );
}
