"use client";

import React from "react";
import { BusinessCard } from "@/components/ui/Cards";
import { dummyBusinesses } from "@/data/BusinessDataDummy";
import CTAButton from "@/components/ui/Buttons/CTAButton";
import Badge from "@/components/ui/badge";
import { Flame, ArrowRight } from "lucide-react";

const FeaturedBusiness: React.FC = () => {
  // Get top 4 businesses by rating
  const featuredBusinesses = [...dummyBusinesses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const handleFavoriteToggle = (id: string) => {
    // TODO: Implement favorite toggle logic
    console.log("Toggle favorite for business:", id);
  };

  const handleError = (error: Error) => {
    console.error("Error loading business image:", error);
  };

  return (
    <section className="w-relative w-full min-h-[calc(100vh-5rem)]  flex flex-col justify-center items-center">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        <div className="text-center mb-8">
          <Badge icon={<Flame className="w-4 h-4 text-primary-500" />}>
            Featured Businesses
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-text">
            Explore <span className="text-primary-500">SMEs</span> Across
            Batangas
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover top-rated SMEs in Batangas
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBusinesses.map((business) => (
            <BusinessCard
              key={business.id}
              {...business}
              onFavoriteToggle={handleFavoriteToggle}
              onError={handleError}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <CTAButton href="/sme" icon={ArrowRight} variant="primary">
          View All SMEs
        </CTAButton>
      </div>
    </section>
  );
};

export default FeaturedBusiness;
