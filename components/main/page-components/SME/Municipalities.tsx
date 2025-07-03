"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import MunicipalityCard from "@/components/main/ui/Cards/MunicipalityCard";
import MunicipalityCardSkeleton from "@/components/main/ui/Skeleton/MunicipalityCardSkeleton";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Municipalities as MunicipalitiesData } from "@/data/Municipalities";

export default function Municipalities() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const checkScrollPosition = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);

      // Calculate current index
      const cardWidth = getCardWidth();
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.max(0, newIndex));
    }
  }, []);

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, [checkScrollPosition]);

  const getCardWidth = useCallback(() => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.querySelector(
        "div[data-card]"
      ) as HTMLElement;
      if (firstCard) {
        const cardRect = firstCard.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(firstCard);
        const marginRight = parseFloat(computedStyle.marginRight);
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
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (scrollRef.current && !isScrolling) {
        setIsScrolling(true);
        const cardWidth = getCardWidth();
        const targetScroll = index * cardWidth;

        scrollRef.current.scrollTo({
          left: targetScroll,
          behavior: "smooth",
        });

        setTimeout(() => {
          setIsScrolling(false);
          checkScrollPosition();
        }, 300);
      }
    },
    [getCardWidth, isScrolling, checkScrollPosition]
  );

  const scroll = useCallback(
    (direction: "left" | "right") => {
      if (isScrolling) return;

      const newIndex =
        direction === "left"
          ? Math.max(0, currentIndex - 1)
          : Math.min(MunicipalitiesData.length - 1, currentIndex + 1);

      scrollToIndex(newIndex);
    },
    [currentIndex, scrollToIndex, isScrolling]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scroll("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scroll("right");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scroll]);

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      scroll("right");
    } else if (isRightSwipe) {
      scroll("left");
    }
  };

  return (
    <section className="w-full min-h-[calc(80vh-5rem)] flex flex-col justify-center items-center">
      <div className="w-full max-w-[1440px] mx-auto ">
        <h2 className="text-2xl sm:text-3xl font-bold text-text mb-6">
          Browse by <span className="text-primary-500">Municipality</span>
        </h2>

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
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            role="region"
            aria-label="Municipalities carousel"
            tabIndex={0}
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
              : MunicipalitiesData.map((municipality, index) => (
                  <div
                    key={municipality.id}
                    data-card
                    className="flex-shrink-0 min-w-[200px] sm:min-w-[250px] md:min-w-[280px] lg:min-w-[320px] xl:min-w-[360px]"
                  >
                    <MunicipalityCard
                      {...municipality}
                      onError={(error) => {
                        console.error(
                          `Failed to load image for ${municipality.name}:`,
                          error
                        );
                      }}
                    />
                  </div>
                ))}
          </div>

          {/* Navigation Buttons Container - Hidden on mobile and tablet, visible on lg+ */}
          <div className="hidden lg:flex gap-1 sm:gap-2 flex-shrink-0 items-center justify-center relative z-10">
            {/* Left Scroll Button */}
            <button
              onClick={() => scroll("left")}
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                showLeftButton && !isScrolling
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-50 pointer-events-none"
              }`}
              aria-label="Scroll to previous municipality"
              disabled={!showLeftButton || isLoading || isScrolling}
            >
              <IoIosArrowBack className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            {/* Right Scroll Button */}
            <button
              onClick={() => scroll("right")}
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                showRightButton && !isScrolling
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-50 pointer-events-none"
              }`}
              aria-label="Scroll to next municipality"
              disabled={!showRightButton || isLoading || isScrolling}
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
          <p className="text-xs text-gray-400 mt-1">
            Use arrow keys or swipe to navigate
          </p>
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
    </section>
  );
}
