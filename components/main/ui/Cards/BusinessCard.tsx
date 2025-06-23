"use client";

import { Bookmark, CreditCard } from "lucide-react";
import Image from "next/image";
import { Business } from "@/types";
import { cn } from "@/lib/utils";

interface BusinessCardProps extends Business {
  onFavoriteToggle: (id: string) => void;
  onError: (error: Error) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  id,
  name,
  imageUrl,
  rating,
  municipality,
  category,
  priceRange,
  isFavorite,
  paymentMethods,
  onFavoriteToggle,
  onError,
}) => {
  // Function to get payment method icon or abbreviation
  const getPaymentDisplay = (method: string) => {
    switch (method.toLowerCase()) {
      case "gcash":
        return { text: "GCash", color: "bg-blue-100 text-blue-700" };
      case "paymaya":
        return { text: "Maya", color: "bg-green-100 text-green-700" };
      case "bank transfer":
        return { text: "Bank", color: "bg-purple-100 text-purple-700" };
      case "credit card":
        return { text: "Card", color: "bg-orange-100 text-orange-700" };
      case "cash":
        return { text: "Cash", color: "bg-gray-100 text-gray-700" };
      default:
        return { text: method, color: "bg-gray-100 text-gray-700" };
    }
  };

  // Show only first 3 payment methods
  const displayedPaymentMethods = paymentMethods.slice(0, 3);

  return (
    <div className="group relative rounded-lg bg-card text-card-foreground  transition-all hover:shadow-md">
      {/* Image Container with Favorite Button */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          onError={() => onError(new Error(`Failed to load image for ${name}`))}
        />
        <button
          onClick={() => onFavoriteToggle(id)}
          className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 shadow-sm transition-colors hover:bg-white"
        >
          <Bookmark
            className={cn(
              "h-6 w-6 ",
              isFavorite
                ? "fill-gray-400 text-gray-400"
                : "text-primary-500 fill-primary-500"
            )}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold line-clamp-1 text-text">{name}</h3>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-text">{rating}</span>
          </div>
        </div>

        <div className="mt-2 text-sm text-muted-foreground text-text">
          <p>
            {municipality} • {category}
          </p>
          <p className="mt-1 font-medium text-primary">{priceRange}</p>
        </div>

        {/* Payment Methods */}
        <div className="mt-3">
          <div className="flex items-center gap-1 mb-2">
            <CreditCard className="h-3 w-3 text-gray-500" />
            <span className="text-xs text-gray-500 font-medium">
              Payment Options:
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {displayedPaymentMethods.map((method, index) => {
              const paymentDisplay = getPaymentDisplay(method);
              return (
                <span
                  key={index}
                  className={cn(
                    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                    paymentDisplay.color
                  )}
                >
                  {paymentDisplay.text}
                </span>
              );
            })}
            {paymentMethods.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{paymentMethods.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
