import { LoadingSpinner } from "@/components/loading-spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center z-50">
      <div className="w-full max-w-4xl mx-auto p-8">
        {/* Header Skeleton */}
        <div className="space-y-8 mb-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-64 h-8 bg-muted/60 rounded-lg animate-pulse" />
            <div className="w-96 h-4 bg-muted/40 rounded-md animate-pulse" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Area Skeleton */}
          <div className="h-64 rounded-xl border-2 border-dashed border-muted/30 bg-muted/5 backdrop-blur-sm animate-pulse" />

          {/* Preview Area Skeleton */}
          <div className="relative aspect-video rounded-xl bg-muted/10 animate-pulse overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-muted/5 to-muted/20" />
          </div>
        </div>

        {/* Sample Images Skeleton */}
        <div className="mt-12">
          <div className="w-48 h-6 bg-muted/40 rounded-md mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="aspect-video rounded-xl bg-muted/10 animate-pulse relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-muted/5 to-muted/20" />
              </div>
            ))}
          </div>
        </div>

        {/* Loading Spinner */}
        <LoadingSpinner />
      </div>
    </div>
  );
}