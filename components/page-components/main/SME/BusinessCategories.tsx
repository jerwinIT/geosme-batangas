"use client";
import React, { useRef, useState, useEffect } from "react";
import BusinessCategoriesSkeleton from "@/components/ui/Skeleton/BusinessCategoriesSkeleton";
import {
  FaStore,
  FaUtensils,
  FaHotel,
  FaShoppingBag,
  FaIndustry,
  FaCar,
  FaHome,
  FaGraduationCap,
  FaHospital,
  FaPlane,
} from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const businessCategories = [
  { title: "All", icon: FaStore, count: "10,000 SMEs" },
  { title: "Restaurants", icon: FaUtensils, count: "1,200 businesses" },
  { title: "Hotels", icon: FaHotel, count: "800 businesses" },
  { title: "Retail", icon: FaShoppingBag, count: "2,500 businesses" },
  { title: "Manufacturing", icon: FaIndustry, count: "1,500 businesses" },
  { title: "Transportation", icon: FaCar, count: "900 businesses" },
  { title: "Real Estate", icon: FaHome, count: "700 businesses" },
  { title: "Education", icon: FaGraduationCap, count: "600 businesses" },
  { title: "Healthcare", icon: FaHospital, count: "400 businesses" },
  { title: "Travel", icon: FaPlane, count: "300 businesses" },
];

export default function BusinessCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200; // Adjusted for business category width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      // Check scroll position after animation
      setTimeout(checkScrollPosition, 300);
    }
  };

  return (
    <div id="business-categories" className="w-full max-w-[1440px]">
      <div className="flex items-center gap-2 md:gap-4">
        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex justify-start items-center overflow-x-auto space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-20 2xl:space-x-[50px] scrollbar-hide flex-1 pt-2"
          style={{
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
          onScroll={checkScrollPosition}
        >
          {isLoading
            ? // Show skeleton loading
              Array.from({ length: businessCategories.length }).map(
                (_, idx) => <BusinessCategoriesSkeleton key={idx} />
              )
            : // Show actual categories
              businessCategories.map((category, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center min-w-[120px] sm:min-w-[140px] md:min-w-[160px] cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0 group pt-1"
                >
                  <div className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] rounded-full bg-white shadow-lg flex items-center justify-center mb-2 transition-all duration-300 group-hover:bg-primary-500 ">
                    <category.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary-500 transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base font-medium text-center text-black leading-tight">
                    {category.title}
                  </h3>
                </div>
              ))}
        </div>

        {/* Navigation Buttons Container - Hidden on mobile and tablet, visible on lg+ */}
        <div className="hidden lg:flex gap-1 sm:gap-2 flex-shrink-0 items-center justify-center relative z-10">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300  ${
              showLeftButton
                ? "opacity-100 pointer-events-auto"
                : "opacity-50 pointer-events-none"
            }`}
            aria-label="Scroll left"
            disabled={!showLeftButton || isLoading}
          >
            <IoIosArrowBack className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300  ${
              showRightButton
                ? "opacity-100 pointer-events-auto"
                : "opacity-50 pointer-events-none"
            }`}
            aria-label="Scroll right"
            disabled={!showRightButton || isLoading}
          >
            <IoIosArrowForward className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Swipe Indicator - Only visible on mobile and tablet */}
      <div className="lg:hidden flex flex-col items-center mt-4">
        <div className="flex items-center text-gray-500 gap-2">
          <HiChevronLeft className="w-4 h-4" />
          <span className="text-xs font-medium">Swipe to explore</span>
          <HiChevronRight className="w-4 h-4" />
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
