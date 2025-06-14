"use client";
import React from "react";

import {
  HeroSection,
  FeaturedBusiness,
  WhatWeOffer,
  WhyChoose,
  CTAUsers,
  AnalyticsSection,
  BusinessPortalSection,
} from "./index";

export default function HomePage() {
  return (
    <div className="overflow-hidden justify-center items-center">
      <HeroSection />

      {/* Separator Line */}
      <div className="flex justify-center py-8">
        <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>
      <WhatWeOffer />
      {/* Separator Line */}
      <div className="flex justify-center py-8">
        <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>

      <WhyChoose />
      {/* Separator Line */}
      <div className="flex justify-center py-8">
        <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>

      {/* Featured Businesses */}
      <FeaturedBusiness />
      {/* Separator Line */}
      <div className="flex justify-center py-8">
        <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>

      <AnalyticsSection />
      {/* Separator Line */}
      <div className="flex justify-center py-8">
        <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>

      <BusinessPortalSection />
      {/* Separator Line */}
      <div className="flex justify-center py-8">
        <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>

      <CTAUsers />
    </div>
  );
}
