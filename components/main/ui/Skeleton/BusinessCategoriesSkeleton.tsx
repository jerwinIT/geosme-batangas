import React from "react";

const BusinessCategoriesSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-w-[120px] sm:min-w-[140px] md:min-w-[160px] flex-shrink-0 pt-1">
      <div className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] rounded-full bg-gray-200 animate-pulse mb-2" />
      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
    </div>
  );
};

export default BusinessCategoriesSkeleton;
