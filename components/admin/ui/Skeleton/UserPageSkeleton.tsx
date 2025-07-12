import { Skeleton } from "@/components/ui/skeleton";

export function UserPageSkeleton() {
  return (
    <div className="py-4 px-4 space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Dashboard widgets skeleton - first row */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-12" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-3 w-20 mt-2" />
          </div>
        ))}
      </div>

      {/* Dashboard widgets skeleton - second row */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-12" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Skeleton className="h-3 w-20 mt-2" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        {/* Table header */}
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Skeleton className="h-6 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>

        {/* Filters skeleton */}
        <div className="p-6 border-b">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Table content skeleton */}
        <div className="p-6">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination skeleton */}
        <div className="p-6 border-t">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-8" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
