import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { DeliveryCities } from "./components/DeliveryCities";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { ProductCatalog } from "./components/ProductCatalog";
import { CartProvider } from "./context/CartContext";

function AppContent() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <ProductCatalog />
        <DeliveryCities />
      </main>

      <Footer />

      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.16 0.025 280)",
            border: "1px solid oklch(0.28 0.04 280)",
            color: "oklch(0.97 0.01 90)",
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
