import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useProducts } from "../hooks/useQueries";
import { ProductCard } from "./ProductCard";
import { ProductSkeleton } from "./ProductSkeleton";

const ALL_TYPES = ["All", "Classic Bomb", "Party Pack", "Taster Kit"];

// Fallback products for when backend is loading/empty
const FALLBACK_PRODUCTS = [
  // --- Classic Bombs (one per flavor) ---
  {
    id: BigInt(1),
    name: "Mango Tango Classic Bomb",
    flavor: "Mango Tango",
    productType: "Classic Bomb",
    priceInPaisa: BigInt(8900),
    description:
      "A tropical mango explosion — sweet, tangy and irresistibly fizzy. Perfect for summer vibes.",
    stock: BigInt(50),
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
  },
  {
    id: BigInt(3),
    name: "Rose Lychee Classic Bomb",
    flavor: "Rose Lychee",
    productType: "Classic Bomb",
    priceInPaisa: BigInt(8900),
    description:
      "A delicate blend of rose water and lychee — floral, fruity and utterly refreshing.",
    stock: BigInt(35),
  },
  {
    id: BigInt(4),
    name: "Mint Mojito Classic Bomb",
    flavor: "Mint Mojito",
    productType: "Classic Bomb",
    priceInPaisa: BigInt(8900),
    description:
      "Crisp mint and zesty lime in every fizzy burst — the most refreshing bomb in the lineup.",
    stock: BigInt(40),
  },
  {
    id: BigInt(5),
    name: "Watermelon Wave Classic Bomb",
    flavor: "Watermelon Wave",
    productType: "Classic Bomb",
    priceInPaisa: BigInt(8900),
    description:
      "Sweet watermelon fizz that hits like a summer wave — light, juicy and totally addictive.",
    stock: BigInt(38),
  },
  {
    id: BigInt(6),
    name: "Sex on the Beach Classic Bomb",
    flavor: "Sex on the Beach",
    productType: "Classic Bomb",
    priceInPaisa: BigInt(8900),
    description:
      "Tropical peach, orange and cranberry burst — fizzy, fruity and totally irresistible. The ultimate party starter.",
    stock: BigInt(40),
  },
  {
    id: BigInt(7),
    name: "Citrus Zing Classic Bomb",
    flavor: "Citrus Zing",
    productType: "Classic Bomb",
    priceInPaisa: BigInt(45000),
    description:
      "A bold citrus punch with zesty lemon, lime and orange — the most electrifying single bomb in our lineup.",
    stock: BigInt(30),
  },
  // --- Party Packs (3 flavors only) ---
  {
    id: BigInt(8),
    name: "Mango Tango Party Pack",
    flavor: "Mango Tango",
    productType: "Party Pack",
    priceInPaisa: BigInt(47900),
    description:
      "Share the mango magic! 6 Mango Tango bombs in one pack for all your party guests.",
    stock: BigInt(25),
  },
  {
    id: BigInt(9),
    name: "Berry Blast Party Pack",
    flavor: "Berry Blast",
    productType: "Party Pack",
    priceInPaisa: BigInt(47900),
    description:
      "A party-sized berry bonanza — 6 Berry Blast bombs bursting with mixed berry fizz.",
    stock: BigInt(20),
  },
  {
    id: BigInt(10),
    name: "Citrus Zing Party Pack",
    flavor: "Citrus Zing",
    productType: "Party Pack",
    priceInPaisa: BigInt(49900),
    description:
      "Party-sized pack of our zingy citrus bombs. 6 bombs per pack — perfect for celebrations!",
    stock: BigInt(30),
  },
  // --- Taster Kits (2 flavors only) ---
  {
    id: BigInt(11),
    name: "Rose Lychee Taster Kit",
    flavor: "Rose Lychee",
    productType: "Taster Kit",
    priceInPaisa: BigInt(34900),
    description:
      "Try our floral rose lychee flavour — 3 bombs per kit. Perfect as a gift or introduction.",
    stock: BigInt(20),
  },
  {
    id: BigInt(12),
    name: "Mint Mojito Taster Kit",
    flavor: "Mint Mojito",
    productType: "Taster Kit",
    priceInPaisa: BigInt(34900),
    description:
      "Try all our mint variants — 3 bombs per kit. The freshest way to experience Fyzzyapa.",
    stock: BigInt(20),
  },
];

export function ProductCatalog() {
  const { data: backendProducts, isLoading } = useProducts();
  const [activeType, setActiveType] = useState("All");
  const [search, setSearch] = useState("");

  const products =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : FALLBACK_PRODUCTS;

  const filtered = products.filter((p) => {
    const matchType = activeType === "All" || p.productType === activeType;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.flavor.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <section id="products" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-sm font-medium mb-4">
            🎉 7 Bold Flavors · 12 Products
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black mb-4">
            Pick Your <span className="fizz-gradient-text">Bombs</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            From classic singles to party packs — find the perfect Fyzzyapa
            combo for any occasion.
          </p>
        </motion.div>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          {/* Type filter tabs */}
          <div className="flex flex-wrap gap-2">
            {ALL_TYPES.map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setActiveType(type)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all border",
                  activeType === type
                    ? "fizz-gradient text-primary-foreground border-transparent shadow-fizz"
                    : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground bg-card",
                )}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search flavors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border/50 focus:border-primary/60 text-sm"
            />
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }, (_, i) => `skeleton-${i}`).map((key) => (
              <ProductSkeleton key={key} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display text-xl font-bold mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your filter or search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, index) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
