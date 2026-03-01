import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const { totalItems, setIsOpen } = useCart();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-border/50"
      style={{
        background: "oklch(0.12 0.015 280 / 0.9)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
          aria-label="Fyzzyapa home"
        >
          <img
            src="/assets/uploads/WhatsApp-Image-2026-02-28-at-8.37.43-PM-1.jpeg"
            alt="Fyzzyapa"
            className="h-10 w-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </button>

        {/* Nav links — hidden on small screens */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { label: "Products", id: "products" },
            { label: "How It Works", id: "how-it-works" },
            { label: "Delivery", id: "delivery" },
          ].map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-full transition-colors hover:bg-muted/50"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Cart */}
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          size="sm"
          className="relative gap-2 border-border/50 hover:border-primary/60 hover:bg-primary/10 transition-all"
          aria-label={`Cart with ${totalItems} items`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline text-sm">Cart</span>
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs font-bold flex items-center justify-center fizz-gradient text-primary-foreground"
            >
              {totalItems > 99 ? "99+" : totalItems}
            </motion.span>
          )}
        </Button>
      </nav>
    </motion.header>
  );
}
