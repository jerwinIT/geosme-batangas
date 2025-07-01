import React from "react";
import {
  BusinessCategories,
  BusinessFeeds,
  Municipalities,
  SMEHero,
} from "@/components/main/page-components/SME";
import SearchBar from "@/components/main/ui/SearchBar";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SME",
  description: "Explore SMEs in Batangas",
};

export default function SMEPage() {
  return (
    <main className="flex-1">
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-[100px]">
        <SMEHero />
        {/* Separator Line */}
        <div className="flex justify-center py-8">
          <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>

        <Municipalities />

        {/* Separator Line */}
        <div className="flex justify-center py-8">
          <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>

        {/* Business Categories Section */}
        <section className="mb-12">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-6">
              Browse by <span className="text-primary-500">Category</span>
            </h2>
            <BusinessCategories />
          </div>
        </section>

        {/* Separator Line */}
        <div className="flex justify-center py-8">
          <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>

        {/* Business Feed Section */}
        <section>
          <BusinessFeeds />
        </section>
      </div>
    </main>
  );
}
