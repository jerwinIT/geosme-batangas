"use client";
import React from "react";

import {
  HeroSection,
  FeaturedBusiness,
  WhatWeOffer,
  WhyChoose,
  BusinessPortalSection,
  CTAUsers,
  AnalyticsSection,
  FindYourBusiness,
} from "./index";

export default function HomePage() {
  return (
    <main className="flex-1">
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-[100px]">
        <HeroSection />
        {/* Separator Line */}
        <div className="flex justify-center py-8">
          <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>
        <FeaturedBusiness />
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
        <FindYourBusiness />
      </div>
      <CTAUsers />
    </main>
  );
}
