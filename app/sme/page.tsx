import React from "react";
import {
  BusinessCategories,
  BusinessFeeds,
  Municipalities,
} from "@/components/page-components/SME";
import SearchBar from "@/components/ui/SearchBar";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SME",
  description: "Explore SMEs in Batangas",
};

export default function ExplorePage() {
  return (
    <div className="min-h-screen pt-24 ">
      {/* Hero Section with Search */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-text mb-4">
            Explore <span className="text-primary-500">SMEs</span> in Batangas
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            Discover and connect with local businesses across different
            categories and locations
          </p>
        </div>
        {/* Search Bar */}
        <div className="flex flex-col items-center justify-center ">
          {/* You can add your search bar component here */}
          <SearchBar />
          <Link
            href="/search"
            className="rounded-[50px] px-14 md:px-28 -mt-4 py-2.5 overflow-hidden group bg-primary-500 relative hover:bg-primary-600 transition-all duration-300 text-white"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000"></span>
            <span className="relative font-bold text-[#fff]">Search</span>
          </Link>
        </div>
      </div>

      {/* Separator Line */}
      <div className="flex justify-center py-8">
        <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>

      {/* Municipalities Section */}
      <section className="mb-12">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-6">
            Browse by <span className="text-primary-500">Municipality</span>
          </h2>
          <Municipalities />
        </div>
      </section>

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
  );
}
