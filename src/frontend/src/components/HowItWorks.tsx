import { Bomb, PartyPopper, Waves } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: Bomb,
    number: "01",
    title: "Drop the Bomb",
    description:
      "Take a Fyzzyapa mocktail bomb and drop it into a glass of water, soda, or any drink you like.",
    colorToken: "--fizz-orange",
    accentRgb: "oklch(0.72 0.19 55)",
    bg: "oklch(0.72 0.19 55 / 0.10)",
  },
  {
    icon: Waves,
    number: "02",
    title: "Watch It Fizz",
    description:
      "The bomb dissolves in seconds, releasing a burst of fizz, natural flavors, and sweet aroma.",
    colorToken: "--fizz-coral",
    accentRgb: "oklch(0.65 0.22 25)",
    bg: "oklch(0.65 0.22 25 / 0.10)",
  },
  {
    icon: PartyPopper,
    number: "03",
    title: "Enjoy Your Mocktail",
    description:
      "Sip your perfectly balanced, fizzy sweet mocktail — no bar skills required, just pure enjoyment!",
    colorToken: "--fizz-lime",
    accentRgb: "oklch(0.82 0.22 130)",
    bg: "oklch(0.82 0.22 130 / 0.10)",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "oklch(0.145 0.025 50)" }}
    >
      {/* Radial burst background — centered warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 40%, oklch(0.72 0.19 55 / 0.08) 0%, oklch(0.65 0.22 25 / 0.04) 50%, transparent 100%)",
        }}
      />
      {/* Top edge fade from previous section */}
      <div
        className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.12 0.015 280), transparent)",
        }}
      />
      {/* Bottom edge fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, oklch(0.12 0.015 280), transparent)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-4"
            style={{
              background: "oklch(0.82 0.22 130 / 0.12)",
              borderColor: "oklch(0.82 0.22 130 / 0.35)",
              color: "oklch(0.82 0.22 130)",
            }}
          >
            ✨ Stupidly Simple
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black mb-4">
            How It <span className="fizz-gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Three steps to mocktail perfection. No blender. No bartender. Just
            drop and enjoy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Connector arrow between steps */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:flex absolute top-12 items-center"
                  style={{
                    left: "calc(100% - 0px)",
                    width: "2rem",
                    zIndex: 10,
                  }}
                >
                  <div
                    className="w-full h-px"
                    style={{
                      background: `linear-gradient(to right, ${step.accentRgb.replace(")", " / 0.5)")}, transparent)`,
                    }}
                  />
                </div>
              )}

              <div
                className="relative rounded-2xl p-8 border transition-all duration-300 group-hover:scale-[1.02]"
                style={{
                  background: step.bg,
                  borderColor: `oklch(var(${step.colorToken}) / 0.2)`,
                  boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `oklch(var(${step.colorToken}) / 0.5)`;
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 8px 32px ${step.accentRgb.replace(")", " / 0.2)")}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    `oklch(var(${step.colorToken}) / 0.2)`;
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 2px 16px rgba(0,0,0,0.2)";
                }}
              >
                {/* Big ghost number */}
                <div
                  className="absolute -top-3 -right-1 text-6xl font-black opacity-[0.07] font-display select-none leading-none"
                  style={{ color: step.accentRgb }}
                >
                  {step.number}
                </div>

                {/* Step number pill */}
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full mb-5"
                  style={{
                    background: `${step.accentRgb.replace(")", " / 0.18)")}`,
                    color: step.accentRgb,
                  }}
                >
                  <span>Step {step.number}</span>
                </div>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `${step.accentRgb.replace(")", " / 0.18)")}`,
                  }}
                >
                  <step.icon
                    className="h-7 w-7"
                    style={{ color: step.accentRgb }}
                  />
                </div>

                <h3 className="font-display text-xl font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
