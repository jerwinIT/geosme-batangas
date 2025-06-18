import React from "react";

import { Link } from "lucide-react";

import SearchBar from "@/components/ui/SearchBar";

export default function SMEHero() {
  return (
    <section className="relative w-full min-h-[calc(80vh-5rem)] flex items-center justify-center bg-surface pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20">
      {/* Content */}
      {/* Hero Section with Search */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto  text-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-text">
            Explore <span className="text-primary-500">SMEs</span> in Batangas
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            Discover and connect with local businesses across different
            categories and locations
          </p>
        </div>
        {/* Search Bar */}
        <div className="flex flex-col items-center justify-center gap-4">
          {/* You can add your search bar component here */}
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
