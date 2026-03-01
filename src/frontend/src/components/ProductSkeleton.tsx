export function ProductSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-border/50 bg-card flex flex-col">
      {/* Image skeleton */}
      <div className="aspect-square shimmer" />
      {/* Content skeleton */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="h-5 w-20 rounded-full shimmer" />
          <div className="h-5 w-16 rounded-full shimmer" />
        </div>
        <div className="h-5 w-3/4 rounded shimmer" />
        <div className="h-4 w-full rounded shimmer" />
        <div className="h-4 w-2/3 rounded shimmer" />
        <div className="flex items-center justify-between mt-2">
          <div className="h-7 w-16 rounded shimmer" />
          <div className="h-8 w-20 rounded-lg shimmer" />
        </div>
      </div>
    </div>
  );
}
