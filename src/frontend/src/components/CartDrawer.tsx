import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { flavorToImage, formatPrice } from "../utils/format";

interface CartDrawerProps {
  onCheckout: () => void;
}

export function CartDrawer({ onCheckout }: CartDrawerProps) {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    subtotalPaisa,
    totalItems,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[400px] flex flex-col border-l border-border/50"
            style={{ background: "oklch(0.14 0.02 280)" }}
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
              <div className="flex flex-col gap-0.5">
                <span
                  className="font-display font-black text-xs tracking-widest uppercase"
                  style={{ color: "oklch(0.72 0.19 55)" }}
                >
                  Fyzzyapa
                </span>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  <h2 className="font-display font-bold text-lg">Your Cart</h2>
                  {totalItems > 0 && (
                    <span className="text-xs text-muted-foreground">
                      ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
                <div className="text-5xl">🛒</div>
                <h3 className="font-display font-bold text-xl">
                  Your cart is empty
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Drop some Fyzzyapa bombs in your cart and let's get this party
                  started!
                </p>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="fizz-gradient text-primary-foreground border-0 rounded-full mt-2"
                >
                  Browse Products
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 px-6">
                  <div className="py-4 space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id.toString()}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-3 rounded-xl p-3 bg-card border border-border/40"
                      >
                        {/* Image */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                          <img
                            src={flavorToImage(item.product.flavor)}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm leading-snug truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {item.product.flavor}
                          </p>
                          <p className="text-sm font-bold text-primary mt-1">
                            {formatPrice(
                              item.product.priceInPaisa * BigInt(item.quantity),
                            )}
                          </p>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col items-end justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-destructive/20 hover:text-destructive transition-colors"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                          <div className="flex items-center gap-1.5 bg-muted/50 rounded-full px-1 py-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                              className="h-5 w-5 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                              className="h-5 w-5 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="px-6 py-5 border-t border-border/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Subtotal
                    </span>
                    <span className="font-display text-xl font-black text-primary">
                      {formatPrice(subtotalPaisa)}
                    </span>
                  </div>
                  {Number(subtotalPaisa) < 49900 && (
                    <p className="text-xs text-muted-foreground text-center">
                      Add{" "}
                      <span className="text-primary font-semibold">
                        {formatPrice(BigInt(49900) - subtotalPaisa)}
                      </span>{" "}
                      more for free delivery!
                    </p>
                  )}
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      onCheckout();
                    }}
                    className="w-full fizz-gradient text-primary-foreground border-0 font-bold rounded-full py-6"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
