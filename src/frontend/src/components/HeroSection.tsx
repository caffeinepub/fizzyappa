import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const BUBBLES = [
  {
    size: 40,
    top: "15%",
    left: "8%",
    right: undefined,
    delay: 0,
    color: "--fizz-orange",
  },
  {
    size: 24,
    top: "25%",
    left: "18%",
    right: undefined,
    delay: 1,
    color: "--fizz-coral",
  },
  {
    size: 56,
    top: "60%",
    left: "5%",
    right: undefined,
    delay: 2,
    color: "--fizz-purple",
  },
  {
    size: 32,
    top: "75%",
    left: "15%",
    right: undefined,
    delay: 0.5,
    color: "--fizz-lime",
  },
  {
    size: 48,
    top: "20%",
    left: undefined,
    right: "8%",
    delay: 1.5,
    color: "--fizz-cyan",
  },
  {
    size: 20,
    top: "40%",
    left: undefined,
    right: "18%",
    delay: 2.5,
    color: "--fizz-rose",
  },
  {
    size: 64,
    top: "70%",
    left: undefined,
    right: "7%",
    delay: 1,
    color: "--fizz-orange",
  },
];

const STATS = [
  { value: "7+", label: "Bold Flavors", emoji: "🎨" },
  { value: "8", label: "Metro Cities", emoji: "🏙️" },
  { value: "100%", label: "Natural", emoji: "🌿" },
];

export function HeroSection() {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-bombs.dim_1200x600.jpg"
          alt="Fyzzyapa mocktail bombs"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.12 0.015 280 / 0.30) 0%, oklch(0.12 0.015 280 / 0.25) 45%, oklch(0.12 0.015 280 / 0.85) 100%)",
          }}
        />
      </div>

      {/* Animated bubbles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {BUBBLES.map((bubble) => (
          <motion.div
            key={`${bubble.color}-${bubble.top}`}
            className="absolute rounded-full"
            style={{
              width: bubble.size,
              height: bubble.size,
              top: bubble.top,
              left: bubble.left,
              right: bubble.right,
              background: `oklch(var(${bubble.color}))`,
              opacity: 0.18,
            }}
            animate={{
              y: [0, -22, 0],
              scale: [1, 1.12, 1],
              opacity: [0.12, 0.28, 0.12],
            }}
            transition={{
              duration: 4 + bubble.delay * 0.6,
              delay: bubble.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge pill */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8"
            style={{
              background: "oklch(0.72 0.19 55 / 0.15)",
              borderColor: "oklch(0.72 0.19 55 / 0.4)",
              color: "oklch(0.82 0.18 60)",
            }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Now delivering to 8 metro cities across India
          </div>
        </motion.div>

        {/* Brand logo — visual centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <img
            src="/assets/uploads/WhatsApp-Image-2026-02-28-at-8.37.43-PM-1.jpeg"
            alt="Fyzzyapa"
            className="w-auto max-w-[480px] sm:max-w-[560px] rounded-2xl"
            style={{
              maxHeight: "280px",
              objectFit: "contain",
              filter:
                "drop-shadow(0 0 32px oklch(0.72 0.19 55 / 0.55)) drop-shadow(0 8px 24px oklch(0.12 0.015 280 / 0.7))",
            }}
            loading="eager"
          />
        </motion.div>

        {/* Headline — two-speed typography contrast */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.45 }}
          className="font-display font-black leading-[0.95] mb-6"
          style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)" }}
        >
          <span
            className="block italic"
            style={{
              color: "oklch(0.93 0.04 90)",
              fontSize: "0.62em",
              letterSpacing: "-0.01em",
              fontWeight: 400,
            }}
          >
            Turn Any Drink
          </span>
          <span className="fizz-gradient-text block">Into a Party</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.62 }}
          className="text-lg sm:text-xl mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ color: "oklch(0.78 0.04 90)" }}
        >
          Drop a{" "}
          <strong style={{ color: "oklch(0.82 0.18 60)", fontWeight: 700 }}>
            Fyzzyapa
          </strong>{" "}
          mocktail bomb — watch it fizz, sweeten, and transform any drink into
          an irresistible mocktail in seconds.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.76 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button
            onClick={scrollToProducts}
            size="lg"
            className="fizz-gradient fizz-glow-pulse text-primary-foreground font-bold text-base px-10 py-6 rounded-full border-0 hover:scale-105 transition-transform"
          >
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            onClick={() =>
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            variant="outline"
            size="lg"
            className="border-white/20 text-foreground hover:bg-white/10 px-8 py-6 rounded-full text-base"
          >
            How It Works
          </Button>
        </motion.div>

        {/* Stats — framed pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.95 }}
          className="inline-grid grid-cols-3 gap-px rounded-2xl overflow-hidden stat-pill-frame"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 px-6 py-4"
              style={{
                borderRight:
                  i < STATS.length - 1
                    ? "1px solid oklch(0.72 0.19 55 / 0.2)"
                    : undefined,
              }}
            >
              <span className="text-base">{stat.emoji}</span>
              <span className="font-display font-black text-2xl sm:text-3xl fizz-gradient-text leading-none">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, oklch(0.12 0.015 280), transparent)",
        }}
      />
    </section>
  );
}
