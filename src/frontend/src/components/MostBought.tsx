import { Flame, ShoppingCart, Star } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import type { LocalProduct } from "../types";
import { flavorToImage, formatPrice } from "../utils/format";

const MOST_BOUGHT: (LocalProduct & { rank: number; soldCount: string })[] = [
  {
    id: BigInt(1),
    name: "Mango Tango Classic Bomb",
    flavor: "Mango Tango",
    productType: "Classic Bomb",
    priceInPaisa: BigInt(8900),
    description:
      "A tropical mango explosion — sweet, tangy and irresistibly fizzy. Perfect for summer vibes.",
    stock: BigInt(50),
    rank: 1,
    soldCount: "2.4k",
  },
  {
    id: BigInt(2),
    name: "Berry Blast Classic Bomb",
    flavor: "Berry Blast",
    productType: "Classic Bomb",
    priceInPaisa: BigInt(8900),
    description:
      "Mixed berry heaven with a punch of fizz. Strawberry, blueberry and raspberry in one bomb.",
    stock: BigInt(45),
    rank: 2,
    soldCount: "1.9k",
  },
  {
    id: BigInt(6),
    name: "Sex on the Beach Classic Bomb",
    flavor: "Sex on the Beach",
    productType: "Classic Bomb",
    priceInPaisa: BigInt(8900),
    description:
      "Tropical peach, orange and cranberry burst — fizzy, fruity and totally irresistible.",
    stock: BigInt(40),
    rank: 3,
    soldCount: "1.5k",
  },
  {
    id: BigInt(8),
    name: "Mango Tango Party Pack",
    flavor: "Mango Tango",
    productType: "Party Pack",
    priceInPaisa: BigInt(34900),
    description:
      "Share the mango magic! 6 Mango Tango bombs in one pack for all your party guests.",
    stock: BigInt(25),
    rank: 4,
    soldCount: "980",
  },
];

const ACCENT_COLORS: Record<string, string> = {
  "mango tango": "oklch(0.78 0.19 65)",
  "berry blast": "oklch(0.62 0.22 310)",
  "sex on the beach": "oklch(0.72 0.22 45)",
};

function getAccent(flavor: string) {
  return ACCENT_COLORS[flavor.toLowerCase()] ?? "oklch(0.72 0.19 55)";
}

const RANK_LABELS: Record<number, string> = {
  1: "#1 Best Seller",
  2: "#2 Top Pick",
  3: "#3 Fan Fave",
  4: "#4 Party Hit",
};

export function MostBought() {
  const { addItem } = useCart();

  return (
    <section className="py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 60%, oklch(0.72 0.22 45 / 0.06), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-sm font-semibold mb-4">
            <Flame className="h-4 w-4" />
            Trending Now
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black mb-3">
            Most <span className="fizz-gradient-text">Bought</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-sm mx-auto">
            These bombs fly off the shelf — grab yours before they're gone.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOST_BOUGHT.map((product, i) => {
            const accent = getAccent(product.flavor);
            const imgSrc = flavorToImage(product.flavor);
            const isTopSeller = product.rank === 1;

            return (
              <motion.div
                key={product.id.toString()}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                whileHover={{
                  y: -8,
                  boxShadow: `0 20px 56px ${accent.replace(")", " / 0.30)")}`,
                }}
                className="group relative rounded-2xl overflow-hidden flex flex-col cursor-default"
                style={{
                  border: isTopSeller
                    ? `2px solid ${accent}`
                    : "1px solid oklch(0.28 0.04 280)",
                  background: "oklch(0.14 0.02 280)",
                  transition:
                    "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
                }}
              >
                {/* Top seller glow ring */}
                {isTopSeller && (
                  <div
                    className="absolute inset-0 pointer-events-none rounded-2xl z-0"
                    style={{
                      boxShadow: `inset 0 0 32px ${accent.replace(")", " / 0.12)")}`,
                    }}
                  />
                )}

                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] z-10"
                  style={{ background: accent }}
                />

                {/* Rank badge + star for #1 */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                  <span
                    className="text-xs font-black px-2.5 py-1 rounded-full text-white"
                    style={{ background: accent }}
                  >
                    {RANK_LABELS[product.rank]}
                  </span>
                  {isTopSeller && (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 drop-shadow" />
                  )}
                </div>

                {/* Sold count */}
                <div className="absolute top-3 right-3 z-20">
                  <span className="text-xs font-semibold bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 rounded-full border border-white/10">
                    {product.soldCount} sold
                  </span>
                </div>

                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "4 / 4.5" }}
                >
                  <img
                    src={imgSrc}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(0.12 0.015 280 / 0.65) 0%, transparent 50%)",
                    }}
                  />

                  {/* Hover CTA */}
                  <div
                    className="absolute inset-x-0 bottom-0 px-3 pb-3 translate-y-full group-hover:translate-y-0"
                    style={{
                      transition:
                        "transform 0.28s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        addItem(product);
                        toast.success(`${product.name} added to cart!`, {
                          description: `${formatPrice(product.priceInPaisa)} — ${product.flavor}`,
                          duration: 2000,
                        });
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white"
                      style={{
                        background: accent,
                        boxShadow: `0 4px 20px ${accent.replace(")", " / 0.5)")}`,
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1 relative z-10">
                  <h3 className="font-display font-bold text-base mb-1 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2 flex-1 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span
                      className="font-display text-2xl font-black"
                      style={{ color: accent }}
                    >
                      {formatPrice(product.priceInPaisa)}
                    </span>
                    {/* Mobile button */}
                    <button
                      type="button"
                      onClick={() => {
                        addItem(product);
                        toast.success(`${product.name} added to cart!`, {
                          description: `${formatPrice(product.priceInPaisa)} — ${product.flavor}`,
                          duration: 2000,
                        });
                      }}
                      className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white"
                      style={{ background: accent }}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
