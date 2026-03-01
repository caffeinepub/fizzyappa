import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useCart } from "../context/CartContext";
import {
  flavorColor,
  flavorToImage,
  formatPrice,
  typeColor,
} from "../utils/format";

interface ProductCardProps {
  product: Product;
  index: number;
}

function getFlavorAccentColor(flavor: string): string {
  const map: Record<string, string> = {
    "mango tango": "oklch(0.78 0.19 65)",
    mango: "oklch(0.78 0.19 65)",
    "berry blast": "oklch(0.62 0.22 310)",
    berry: "oklch(0.62 0.22 310)",
    "citrus zing": "oklch(0.88 0.18 95)",
    citrus: "oklch(0.88 0.18 95)",
    "rose lychee": "oklch(0.72 0.20 355)",
    rose: "oklch(0.72 0.20 355)",
    "mint mojito": "oklch(0.76 0.22 155)",
    mint: "oklch(0.76 0.22 155)",
    "watermelon wave": "oklch(0.68 0.22 20)",
    watermelon: "oklch(0.68 0.22 20)",
    "sex on the beach": "oklch(0.72 0.22 45)",
  };
  return map[flavor.toLowerCase()] ?? "oklch(0.72 0.19 55)";
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();
  const imgSrc = flavorToImage(product.flavor);
  const accentColor = getFlavorAccentColor(product.flavor);

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} added to cart!`, {
      description: `${formatPrice(product.priceInPaisa)} — ${product.flavor}`,
      duration: 2000,
    });
  };

  const isOutOfStock = product.stock === BigInt(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group relative rounded-2xl overflow-hidden bg-card flex flex-col"
      style={{
        border: "1px solid oklch(0.28 0.04 280)",
        transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 16px 48px ${accentColor.replace(")", " / 0.25)")}`,
      }}
    >
      {/* Flavor accent line — top */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] z-10"
        style={{ background: accentColor }}
      />

      {/* Product image — taller 4:5 ratio for more desire */}
      <div
        className="relative overflow-hidden bg-muted"
        style={{ aspectRatio: "4 / 5" }}
      >
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
          style={{ transition: "transform 0.5s ease" }}
          loading="lazy"
        />

        {/* Dark vignette at bottom always */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.12 0.015 280 / 0.6) 0%, transparent 50%)",
          }}
        />

        {/* Add to Cart — slide up from bottom on hover */}
        {!isOutOfStock && (
          <div
            className="absolute inset-x-0 bottom-0 px-3 pb-3 translate-y-full group-hover:translate-y-0"
            style={{
              transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            <button
              type="button"
              onClick={handleAdd}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-primary-foreground"
              style={{
                background: accentColor,
                boxShadow: `0 4px 20px ${accentColor.replace(")", " / 0.5)")}`,
              }}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        )}

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <span className="text-sm font-semibold text-muted-foreground px-3 py-1 rounded-full border border-border">
              Out of Stock
            </span>
          </div>
        )}

        {/* Low stock badge */}
        {!isOutOfStock && product.stock <= BigInt(5) && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-semibold bg-destructive/90 text-destructive-foreground px-2 py-0.5 rounded-full">
              Only {product.stock.toString()} left!
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          <Badge
            variant="outline"
            className={`text-xs border ${flavorColor(product.flavor)}`}
          >
            {product.flavor}
          </Badge>
          <Badge
            variant="outline"
            className={`text-xs border ${typeColor(product.productType)}`}
          >
            {product.productType}
          </Badge>
        </div>

        <h3 className="font-display font-bold text-base mb-1 leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2 flex-1 leading-relaxed">
          {product.description}
        </p>

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto gap-2">
          <span
            className="font-display text-2xl font-black"
            style={{ color: accentColor }}
          >
            {formatPrice(product.priceInPaisa)}
          </span>
          {/* Fallback add button visible on non-hover (mobile) */}
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={isOutOfStock}
            className="md:hidden text-primary-foreground border-0 font-semibold text-xs gap-1.5"
            style={{ background: accentColor }}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
