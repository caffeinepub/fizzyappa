import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, Package, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { useActor } from "../hooks/useActor";
import {
  useActorReady,
  useAvailableCities,
  usePlaceOrder,
} from "../hooks/useQueries";
import { formatPrice } from "../utils/format";

// Fallback cities if backend not available
const FALLBACK_CITIES = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
];

const MAX_VISIBLE_ITEMS = 3;

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CheckoutStep = "form" | "success";

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, subtotalPaisa, clearCart } = useCart();
  const { data: backendCities } = useAvailableCities();
  const placeOrder = usePlaceOrder();
  const { isReady: actorReady, isConnecting: actorConnecting } =
    useActorReady();
  // Get actor reference for passing at call-time to avoid stale closure issues
  const { actor } = useActor();

  const cities =
    backendCities && backendCities.length > 0 ? backendCities : FALLBACK_CITIES;

  const [step, setStep] = useState<CheckoutStep>("form");
  const [orderId, setOrderId] = useState<bigint | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim()))
      e.phone = "Enter a valid 10-digit Indian mobile number";
    if (!form.city) e.city = "Please select a delivery city";
    if (!form.address.trim() || form.address.trim().length < 10)
      e.address = "Enter a complete delivery address (min 10 characters)";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0] as keyof typeof errs;
      document.getElementById(`checkout-${firstKey}`)?.focus();
      return;
    }
    setErrors({});

    const orderItems = items.map((i) => ({
      productId: i.product.id,
      quantity: BigInt(i.quantity),
      priceInPaisa: i.product.priceInPaisa,
    }));

    if (!actorReady && !actor) {
      toast.error(
        "Still connecting to the store. Please wait a moment and try again.",
      );
      return;
    }

    try {
      const id = await placeOrder.mutateAsync({
        customerName: form.name.trim(),
        customerPhone: form.phone.trim(),
        deliveryCity: form.city,
        deliveryAddress: form.address.trim(),
        items: orderItems,
        actor: actor,
      });
      setOrderId(id);
      setStep("success");
      clearCart();
      toast.success("Order placed successfully!");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to place order. Please try again.";
      toast.error(message);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("form");
      setForm({ name: "", phone: "", city: "", address: "" });
      setErrors({});
      setOrderId(null);
    }, 300);
  };

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const visibleItems = items.slice(0, MAX_VISIBLE_ITEMS);
  const hiddenCount = items.length - MAX_VISIBLE_ITEMS;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="checkout-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden
          />

          {/* Right-side panel */}
          <motion.aside
            key="checkout-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[460px] flex flex-col border-l border-border/50"
            style={{ background: "oklch(0.14 0.02 280)" }}
            onClick={(e) => e.stopPropagation()}
            aria-modal="true"
            aria-label="Checkout"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 flex-shrink-0">
              <h2 className="font-display font-bold text-lg">
                {step === "form" ? "Checkout" : "Order Confirmed!"}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {step === "form" ? (
              <>
                {/* Scrollable form content */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  <div className="px-5 py-3 space-y-3">
                    {/* Order summary — compact */}
                    <div className="rounded-lg bg-card border border-border/40 px-4 py-3">
                      <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                        Order Summary
                      </h3>
                      <div className="space-y-1">
                        {visibleItems.map((item) => (
                          <div
                            key={item.product.id.toString()}
                            className="flex items-center justify-between text-xs"
                          >
                            <span className="text-muted-foreground truncate max-w-[240px]">
                              {item.product.name}{" "}
                              <span className="opacity-70">
                                ×{item.quantity}
                              </span>
                            </span>
                            <span className="font-medium ml-2 flex-shrink-0">
                              {formatPrice(
                                item.product.priceInPaisa *
                                  BigInt(item.quantity),
                              )}
                            </span>
                          </div>
                        ))}
                        {hiddenCount > 0 && (
                          <p className="text-xs text-muted-foreground/60 italic">
                            +{hiddenCount} more item{hiddenCount > 1 ? "s" : ""}
                          </p>
                        )}
                      </div>
                      <div className="pt-2 mt-1 border-t border-border/40 flex items-center justify-between">
                        <span className="font-semibold text-sm">Total</span>
                        <span className="font-display font-black text-base text-primary">
                          {formatPrice(subtotalPaisa)}
                        </span>
                      </div>
                    </div>

                    {/* Form fields */}
                    <div className="space-y-3">
                      {/* Name */}
                      <div className="space-y-1">
                        <Label
                          htmlFor="checkout-name"
                          className="text-xs font-medium"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="checkout-name"
                          placeholder="Arjun Sharma"
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          className={`bg-card border-border/50 focus:border-primary/60 h-9 text-sm ${errors.name ? "border-destructive" : ""}`}
                          autoComplete="name"
                        />
                        {errors.name && (
                          <p className="text-xs text-destructive leading-tight">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-1">
                        <Label
                          htmlFor="checkout-phone"
                          className="text-xs font-medium"
                        >
                          Mobile Number *
                        </Label>
                        <div className="flex gap-2">
                          <span className="flex items-center px-2.5 rounded-md border border-border/50 bg-muted text-xs text-muted-foreground whitespace-nowrap">
                            +91
                          </span>
                          <Input
                            id="checkout-phone"
                            type="tel"
                            placeholder="9876543210"
                            value={form.phone}
                            onChange={(e) =>
                              updateField(
                                "phone",
                                e.target.value.replace(/\D/g, "").slice(0, 10),
                              )
                            }
                            className={`bg-card border-border/50 focus:border-primary/60 flex-1 h-9 text-sm ${errors.phone ? "border-destructive" : ""}`}
                            autoComplete="tel-national"
                            inputMode="numeric"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-destructive leading-tight">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* City */}
                      <div className="space-y-1">
                        <Label
                          htmlFor="checkout-city"
                          className="text-xs font-medium"
                        >
                          Delivery City *
                        </Label>
                        <Select
                          value={form.city}
                          onValueChange={(v) => updateField("city", v)}
                        >
                          <SelectTrigger
                            id="checkout-city"
                            className={`bg-card border-border/50 focus:border-primary/60 h-9 text-sm ${errors.city ? "border-destructive" : ""}`}
                          >
                            <SelectValue placeholder="Select a city" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.city && (
                          <p className="text-xs text-destructive leading-tight">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      {/* Address */}
                      <div className="space-y-1">
                        <Label
                          htmlFor="checkout-address"
                          className="text-xs font-medium"
                        >
                          Full Delivery Address *
                        </Label>
                        <Textarea
                          id="checkout-address"
                          placeholder="Flat 4B, Sunshine Apartments, MG Road..."
                          value={form.address}
                          onChange={(e) =>
                            updateField("address", e.target.value)
                          }
                          rows={2}
                          className={`bg-card border-border/50 focus:border-primary/60 resize-none text-sm ${errors.address ? "border-destructive" : ""}`}
                          autoComplete="street-address"
                        />
                        {errors.address && (
                          <p className="text-xs text-destructive leading-tight">
                            {errors.address}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sticky footer with submit button */}
                <div className="px-5 py-4 border-t border-border/50 flex-shrink-0 space-y-2">
                  {actorConnecting && !actorReady && (
                    <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Connecting to store...
                    </p>
                  )}
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={placeOrder.isPending}
                    className="w-full fizz-gradient text-primary-foreground border-0 font-bold rounded-full py-5"
                    size="lg"
                  >
                    {placeOrder.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Placing Order...
                      </>
                    ) : actorConnecting && !actorReady ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      `Place Order — ${formatPrice(subtotalPaisa)}`
                    )}
                  </Button>
                </div>
              </>
            ) : (
              /* Success state */
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="p-6 flex flex-col items-center text-center gap-5">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, delay: 0.2 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "oklch(0.82 0.22 130 / 0.2)" }}
                  >
                    <CheckCircle2 className="h-8 w-8 text-accent" />
                  </motion.div>

                  <div>
                    <h3 className="font-display text-2xl font-black mb-1.5">
                      Order Placed! 🎉
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Your Fyzzyapa bombs are on their way to{" "}
                      <strong className="text-foreground">{form.city}</strong>!
                    </p>
                  </div>

                  {orderId !== null && (
                    <div className="flex items-center gap-3 rounded-xl bg-card border border-border/40 p-3 w-full">
                      <Package className="h-5 w-5 text-primary flex-shrink-0" />
                      <div className="text-left">
                        <p className="text-xs text-muted-foreground">
                          Order ID
                        </p>
                        <p className="font-display font-bold">
                          #FZY-{orderId.toString().padStart(6, "0")}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="w-full rounded-xl bg-primary/10 border border-primary/20 p-3">
                    <p className="text-sm text-muted-foreground">
                      We'll confirm on{" "}
                      <strong className="text-foreground">
                        +91 {form.phone}
                      </strong>
                      . Delivery within{" "}
                      <strong className="text-primary">
                        2-4 business days
                      </strong>
                      .
                    </p>
                  </div>

                  <Button
                    onClick={handleClose}
                    className="w-full fizz-gradient text-primary-foreground border-0 font-bold rounded-full py-5"
                    size="lg"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
