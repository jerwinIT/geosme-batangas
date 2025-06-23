import React from "react";
import Image from "next/image";
import { Municipality } from "@/types";

interface MunicipalityCardProps extends Municipality {
  onError?: (error: Error) => void;
}

const MunicipalityCard: React.FC<MunicipalityCardProps> = ({
  title,
  subtitle,
  imageUrl,
  onError,
}) => {
  const handleImageError = () => {
    if (onError) {
      onError(new Error(`Failed to load image for ${title}`));
    }
  };

  return (
    <div className="relative bg-background rounded-xl sm:rounded-2xl overflow-hidden w-full h-[260px] sm:h-[280]] md:h-[300px] lg:h-[320px] xl:h-[400px] shadow-lg transition-transform duration-300 hover:text-primary-500 cursor-pointer group hover:scale-[1.02]">
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        onError={handleImageError}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#111]/40 transition-colors duration-300 group-hover:bg-primary-500/40" />
      {/* Content */}
      <div className="flex flex-col justify-end items-start h-full w-full text-left absolute z-10 p-3 sm:p-4 md:p-5">
        <div className="font-extrabold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-0.5 sm:mb-1 leading-tight text-[#fff] drop-shadow-lg line-clamp-1">
          {title}
        </div>
        <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-light text-[#fff] drop-shadow-lg line-clamp-1">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export default MunicipalityCard;
