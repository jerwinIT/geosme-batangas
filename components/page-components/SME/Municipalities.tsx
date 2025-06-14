"use client";
import React, { useRef, useState, useEffect } from "react";
import MunicipalityCard from "@/components/ui/Cards/MunicipalityCard";
import MunicipalityCardSkeleton from "@/components/ui/Skeleton/MunicipalityCardSkeleton";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const municipalities = Array.from({ length: 10 }, (_, i) => ({
  id: `municipality-${i}`,
  title: i === 0 ? "All" : `Municipality ${i}`,
  subtitle:
    i === 0 ? "10,000 SMEs" : `${Math.floor(Math.random() * 1000)} businesses`,
  imageUrl: "/Images/batangas-capitol-new.jpg",
}));

export default function Municipalities() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
  }, []);

  const getCardWidth = () => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.querySelector(
        "div[data-card]"
      ) as HTMLElement;
      if (firstCard) {
        const cardRect = firstCard.getBoundingClientRect();

        // Get the computed style to find the actual margin/spacing
        const computedStyle = window.getComputedStyle(firstCard);
        const marginRight = parseFloat(computedStyle.marginRight);

        // Return card width plus its right margin (spacing)
        return cardRect.width + marginRight;
      }
    }

    // Fallback to estimated width based on viewport
    const width = window.innerWidth;
    if (width >= 1536) return 360 + 40; // 2xl: space-x-10
    if (width >= 1280) return 360 + 40; // xl: space-x-10
    if (width >= 1024) return 320 + 32; // lg: space-x-8
    if (width >= 768) return 280 + 28; // md: space-x-7
    if (width >= 640) return 250 + 24; // sm: space-x-6
    return 200 + 20; // default: space-x-5
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = getCardWidth();
      const currentScrollLeft = scrollRef.current.scrollLeft;

      // Calculate the target scroll position
      let targetScroll;
      if (direction === "left") {
        // Scroll to the previous card boundary
        targetScroll =
          Math.floor(currentScrollLeft / cardWidth) * cardWidth - cardWidth;
        targetScroll = Math.max(0, targetScroll);
      } else {
        // Scroll to the next card boundary
        targetScroll =
          Math.ceil(currentScrollLeft / cardWidth) * cardWidth + cardWidth;
      }

      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });

      // Check scroll position after animation
      setTimeout(checkScrollPosition, 300);
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8e">
      <div className="flex items-center gap-2 md:gap-4">
        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex justify-start items-center overflow-x-auto space-x-5 sm:space-x-6 md:space-x-7 lg:space-x-8 xl:space-x-10 2xl:space-x-10 scrollbar-hide flex-1"
          style={{
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
          onScroll={checkScrollPosition}
        >
          {isLoading
            ? Array.from({ length: 5 }, (_, i) => (
                <div
                  key={`skeleton-${i}`}
                  data-card
                  className="flex-shrink-0 min-w-[200px] sm:min-w-[250px] md:min-w-[280px] lg:min-w-[320px] xl:min-w-[360px]"
                >
                  <MunicipalityCardSkeleton />
                </div>
              ))
            : municipalities.map((m) => (
                <div
                  key={m.id}
                  data-card
                  className="flex-shrink-0 min-w-[200px] sm:min-w-[250px] md:min-w-[280px] lg:min-w-[320px] xl:min-w-[360px]"
                >
                  <MunicipalityCard
                    id={m.id}
                    title={m.title}
                    subtitle={m.subtitle}
                    imageUrl={m.imageUrl}
                  />
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
            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 ${
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
