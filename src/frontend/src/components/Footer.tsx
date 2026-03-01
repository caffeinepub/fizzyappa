import { Heart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = window.location.hostname;

  return (
    <footer className="border-t border-border/50 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/logo-transparent.dim_400x120.png"
              alt="Fyzzyapa"
              className="h-8 w-auto mb-3"
            />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Turn any drink into a fizzy sweet mocktail experience. Drop. Fizz.
              Enjoy.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wide mb-4 text-muted-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Products", id: "products" },
                { label: "How It Works", id: "how-it-works" },
                { label: "Delivery Cities", id: "delivery" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById(link.id)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wide mb-4 text-muted-foreground">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                📧 hello@fyzzyapa.in
              </li>
              <li className="text-sm text-muted-foreground">
                📱 +91 98765 43210
              </li>
              <li className="text-sm text-muted-foreground">
                🕐 Mon–Sat, 10am–6pm IST
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} Fyzzyapa. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with{" "}
            <Heart className="h-3 w-3 text-secondary fill-secondary" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground underline transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
