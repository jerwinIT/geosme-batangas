import React from "react";

const BusinessCardSkeleton: React.FC = () => {
  return (
    <div className="group relative rounded-lg bg-card text-card-foreground transition-all">
      {/* Image Container Skeleton */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg bg-gray-200 animate-pulse" />

      {/* Card Body Skeleton */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        <div className="mt-2 space-y-2">
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default BusinessCardSkeleton;
