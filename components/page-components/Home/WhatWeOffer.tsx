"use client";
import React, { useEffect, useRef } from "react";
import { BarChart3, Building2, ChevronRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/index";

const features = [
  {
    icon: <MapPin className="w-4 h-4 text-primary-500" />,
    badge: "Business Directory",
    title: "Find and Connect with Any SME in Batangas",
    features: [
      "Interactive map-based search",
      "Turn-by-turn navigation",
      "Bookmark favorite SMEs",
      "Advanced filtering options",
    ],
    imagePlaceholder: "Business Directory",
    imagePosition: "left" as const,
  },
  {
    icon: <BarChart3 className="w-4 h-4 text-primary-500" />,
    badge: "Market Intelligence",
    title: "Uncover Hidden Market Opportunities",
    features: [
      "Business density heatmaps",
      "Market saturation analysis",
      "Strategic location insights",
      "Competitive landscape data",
    ],
    imagePlaceholder: "Business Directory & Reviews",
    imagePosition: "right" as const,
  },
  {
    icon: <Building2 className="w-4 h-4 text-primary-500" />,
    badge: "SME Owner Dashboard",
    title: "Manage Your Business with Ease",

    features: [
      "Customer engagement tracking",
      "Review management",
      "Competitor analysis",
      "Performance insights",
    ],
    imagePlaceholder: "Interactive Map with Fintech Layers",
    imagePosition: "left" as const,
  },
];

interface FeatureSectionProps {
  icon: React.ReactNode;
  badge: string;
  title: string;
  features: string[];
  imagePlaceholder: string;
  imagePosition: "left" | "right";
  index: number;
}

function FeatureSection({
  icon,
  badge,
  title,
  features,
  imagePlaceholder,
  imagePosition,
  index,
}: FeatureSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isImageLeft = imagePosition === "left";

  return (
    <div
      ref={sectionRef}
      className="w-full opacity-0 transition-opacity duration-700 ease-out"
    >
      <div
        className={`flex flex-col ${
          isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16`}
      >
        {/* Content Section - First on Mobile */}
        <div className="w-full md:flex-1 order-1">
          <div
            className={`${
              isImageLeft
                ? "md:pl-4 lg:pl-6 xl:pl-8"
                : "md:pr-4 lg:pr-6 xl:pr-8"
            } max-w-xl mx-auto md:mx-0`}
          >
            <div className="text-center md:text-left">
              <Badge icon={icon} className="mb-4">
                {badge}
              </Badge>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-text mb-4 sm:mb-5 md:mb-6 leading-tight">
                {title}
              </h3>
            </div>

            {/* Features List */}
            <div className="space-y-3 sm:space-y-4">
              {features.map((feature, featureIndex) => (
                <div
                  key={featureIndex}
                  className="flex items-center justify-center md:justify-start gap-3 group"
                >
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-primary-500 rounded-full flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-200">
                    <ChevronRight
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#fff]"
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className="text-sm sm:text-base text-text-secondary group-hover:text-text transition-colors duration-200">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Section - Second on Mobile */}
        <div className="w-full md:flex-1 order-2 mt-8 md:mt-0">
          <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 shadow-sm max-w-md mx-auto md:max-w-none">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-primary-300 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                  <span className="text-white font-semibold text-xs sm:text-sm">
                    IMG
                  </span>
                </div>
                <p className="text-primary-700 font-medium text-sm sm:text-base px-2">
                  {imagePlaceholder}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhatWeOffer() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center py-12 sm:py-16 md:py-20">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-text">
            What We <span className="text-primary-500">Offer</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary leading-relaxed">
            Everything you need to navigate and understand Batangas' SME
            landscape
          </p>
        </div>

        <div className="space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-28 ">
          {features.map((feature, index) => (
            <FeatureSection
              key={index}
              icon={feature.icon}
              badge={feature.badge}
              title={feature.title}
              features={feature.features}
              imagePlaceholder={feature.imagePlaceholder}
              imagePosition={feature.imagePosition}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    .animate-fade-in {
      opacity: 1 !important;
    }
  `;
  if (!document.head.querySelector("style[data-what-we-offer]")) {
    style.setAttribute("data-what-we-offer", "true");
    document.head.appendChild(style);
  }
}
