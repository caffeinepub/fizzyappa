import { Truck } from "lucide-react";
import { motion } from "motion/react";

const CITIES = [
  { name: "Mumbai", emoji: "🏙️", state: "Maharashtra" },
  { name: "Delhi", emoji: "🕌", state: "Delhi NCR" },
  { name: "Bengaluru", emoji: "🌿", state: "Karnataka" },
  { name: "Chennai", emoji: "🌊", state: "Tamil Nadu" },
  { name: "Kolkata", emoji: "🎭", state: "West Bengal" },
  { name: "Hyderabad", emoji: "💎", state: "Telangana" },
  { name: "Pune", emoji: "🏔️", state: "Maharashtra" },
  { name: "Ahmedabad", emoji: "🪁", state: "Gujarat" },
];

const PERKS = [
  {
    icon: "⚡",
    title: "Fast Dispatch",
    desc: "Orders placed before 2 PM ship same day",
  },
  {
    icon: "📦",
    title: "Safe Packaging",
    desc: "Bombs packed securely to prevent breakage",
  },
  {
    icon: "🔄",
    title: "Easy Returns",
    desc: "Damaged on arrival? We'll replace it free",
  },
];

export function DeliveryCities() {
  return (
    <section
      id="delivery"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "oklch(0.145 0.025 50)" }}
    >
      {/* Top edge fade */}
      <div
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.12 0.015 280), transparent)",
        }}
      />
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 60%, oklch(0.58 0.20 300 / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
            style={{
              background: "oklch(0.58 0.20 300 / 0.12)",
              borderColor: "oklch(0.58 0.20 300 / 0.35)",
              color: "oklch(0.72 0.16 300)",
            }}
          >
            <Truck className="h-4 w-4" />
            Free delivery on orders above ₹499
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black mb-4">
            We Deliver <span className="fizz-gradient-text">Across India</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Fresh fizz delivered to your door in 2–4 business days across all
            major metro cities.
          </p>
        </motion.div>

        {/* City cards grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CITIES.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group relative rounded-2xl p-4 text-center cursor-default overflow-hidden"
                style={{
                  background: "oklch(0.18 0.03 280 / 0.6)",
                  border: "1px solid oklch(0.28 0.04 280 / 0.8)",
                  transition:
                    "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 8px 32px oklch(0.72 0.19 55 / 0.2)",
                }}
              >
                {/* Hover glow fill */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 80% at 50% 100%, oklch(0.72 0.19 55 / 0.08), transparent)",
                  }}
                />
                <div className="text-2xl mb-1.5 relative">{city.emoji}</div>
                <div className="font-display font-bold text-sm relative">
                  {city.name}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 relative">
                  {city.state}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Perk cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {PERKS.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-xl p-4"
              style={{
                background: "oklch(0.18 0.03 280 / 0.5)",
                border: "1px solid oklch(0.28 0.04 280 / 0.6)",
              }}
            >
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <div className="font-semibold text-sm">{item.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
