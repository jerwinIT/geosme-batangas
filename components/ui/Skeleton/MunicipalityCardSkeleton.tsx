import React from "react";

const MunicipalityCardSkeleton: React.FC = () => {
  return (
    <div className="relative bg-background rounded-xl sm:rounded-2xl overflow-hidden w-full h-[260px] sm:h-[280]] md:h-[300px] lg:h-[320px] xl:h-[400px] shadow-lg animate-pulse">
      <div className="absolute inset-0 bg-gray-200" />
      <div className="flex flex-col justify-end items-start h-full w-full text-left absolute z-10 p-3 sm:p-4 md:p-5">
        <div className="h-4 sm:h-5 md:h-6 lg:h-7 xl:h-8 w-3/4 bg-gray-300 rounded mb-1 sm:mb-2" />
        <div className="h-3 sm:h-4 md:h-5 lg:h-6 xl:h-7 w-1/2 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default MunicipalityCardSkeleton;
