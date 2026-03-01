export function formatPrice(paisa: bigint): string {
  const rupees = Number(paisa) / 100;
  if (rupees % 1 === 0) {
    return `₹${rupees.toLocaleString("en-IN")}`;
  }
  return `₹${rupees.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function flavorToImage(flavor: string): string {
  const map: Record<string, string> = {
    "mango tango": "/assets/generated/bomb-mango.dim_400x400.jpg",
    mango: "/assets/generated/bomb-mango.dim_400x400.jpg",
    "berry blast": "/assets/generated/bomb-berry.dim_400x400.jpg",
    berry: "/assets/generated/bomb-berry.dim_400x400.jpg",
    "citrus zing": "/assets/generated/bomb-citrus.dim_400x400.jpg",
    citrus: "/assets/generated/bomb-citrus.dim_400x400.jpg",
    "rose lychee": "/assets/generated/bomb-rose.dim_400x400.jpg",
    rose: "/assets/generated/bomb-rose.dim_400x400.jpg",
    "mint mojito": "/assets/generated/bomb-mint.dim_400x400.jpg",
    mint: "/assets/generated/bomb-mint.dim_400x400.jpg",
    "watermelon wave": "/assets/generated/bomb-watermelon.dim_400x400.jpg",
    watermelon: "/assets/generated/bomb-watermelon.dim_400x400.jpg",
    "sex on the beach":
      "/assets/generated/bomb-sex-on-the-beach-transparent.dim_400x400.png",
  };
  const key = flavor.toLowerCase();
  return map[key] ?? "/assets/generated/bomb-mango.dim_400x400.jpg";
}

export function flavorColor(flavor: string): string {
  const map: Record<string, string> = {
    "mango tango": "bg-amber-500/20 text-amber-300 border-amber-500/30",
    mango: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    "berry blast": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    berry: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "citrus zing": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    citrus: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    "rose lychee": "bg-pink-500/20 text-pink-300 border-pink-500/30",
    rose: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    "mint mojito": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    mint: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "watermelon wave": "bg-red-500/20 text-red-300 border-red-500/30",
    watermelon: "bg-red-500/20 text-red-300 border-red-500/30",
    "sex on the beach": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  };
  const key = flavor.toLowerCase();
  return map[key] ?? "bg-primary/20 text-primary border-primary/30";
}

export function typeColor(type: string): string {
  const map: Record<string, string> = {
    "classic bomb": "bg-fizz-orange/15 text-fizz-orange border-fizz-orange/30",
    "party pack": "bg-fizz-purple/15 text-fizz-purple border-fizz-purple/30",
    "mega box": "bg-fizz-cyan/15 text-fizz-cyan border-fizz-cyan/30",
    "taster kit": "bg-fizz-lime/15 text-fizz-lime border-fizz-lime/30",
  };
  const key = type.toLowerCase();
  return map[key] ?? "bg-muted text-muted-foreground border-border";
}
