"use client";
import { useEffect, useRef } from "react";
import { HiCheck } from "react-icons/hi2";

// Add global styles for animations
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    .animate-slide-in {
      opacity: 1 !important;
      transform: translateX(0) !important;
    }
  `;
  if (!document.head.querySelector("style[data-what-we-do]")) {
    style.setAttribute("data-what-we-do", "true");
    document.head.appendChild(style);
  }
}

interface FeatureSectionProps {
  title: string;
  description: string;
  list: string[];
  imagePlaceholder: string;
  imagePosition: "left" | "right";
  index: number;
}

function FeatureSection({
  title,
  description,
  list,
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
            entry.target.classList.add("animate-slide-in");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
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
      className={`opacity-0 transform transition-all duration-1000 ease-out ${
        isImageLeft
          ? "translate-x-[-20px] lg:translate-x-[-50px]"
          : "translate-x-[20px] lg:translate-x-[50px]"
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div
        className={`flex flex-col ${
          isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16`}
      >
        {/* Image Section */}
        <div className="w-full md:flex-1 max-w-lg md:max-w-none">
          <div className="relative aspect-[16/10] sm:aspect-[4/3] bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-primary-300 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <span className="text-white font-semibold text-xs sm:text-sm lg:text-base">
                    IMG
                  </span>
                </div>
                <p className="text-primary-700 font-medium text-sm sm:text-base lg:text-lg px-2">
                  {imagePlaceholder}
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-primary-300/30 rounded-full"></div>
            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-primary-400/40 rounded-full"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:flex-1">
          <div
            className={`${
              isImageLeft
                ? "md:pl-6 lg:pl-8 xl:pl-10"
                : "md:pr-6 lg:pr-8 xl:pr-10"
            } text-center md:text-left`}
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-text mb-4 sm:mb-6 leading-tight">
              {title.split(" ").map((word, i) =>
                i === 1 ? (
                  <span key={i} className="text-primary-500">
                    {word}{" "}
                  </span>
                ) : (
                  word + " "
                )
              )}
            </h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary leading-relaxed max-w-2xl mx-auto md:mx-0 mb-6">
              {description}
            </p>

            {/* List Section */}
            {list && list.length > 0 && (
              <ul className="space-y-3 sm:space-y-4">
                {list.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-left">
                    <HiCheck className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StrategicBusinessIntelligence() {
  const features = [
    {
      title: "GIS Analytics",
      description: "Visualize market opportunities with location intelligence",
      list: [
        "Business density heatmaps identify underserved areas",
        "Competitor distribution mapping reveals market gaps",
        "Consumer traffic patterns highlight optimal locations",
      ],
      imagePlaceholder: "Interactive Map Interface",
      imagePosition: "left" as const,
    },
    {
      title: "Location Intelligence",
      description: "Make strategic decisions based on geographic data",
      list: [
        "Appear on our interactive map",
        "Analyze competitor distribution by area",
        "Visualize customer traffic patterns",
      ],
      imagePlaceholder: "Business Directory Dashboard",
      imagePosition: "right" as const,
    },
    {
      title: "Market Demand Analysis",
      description: "Identify emerging opportunities",
      list: [
        "Search trend analytics reveal consumer interests",
        "Seasonal demand patterns for strategic planning",
        "Emerging business category identification",
      ],
      imagePlaceholder: "Analytics & Insights",
      imagePosition: "left" as const,
    },
  ];

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-center text-text mb-4 sm:mb-6 leading-tight">
            Strategic{" "}
            <span className="text-primary-500">Business Intelligence</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Our platform provides comprehensive GIS analytics and FinTech
            adoption insights to help your business make data-driven decisions.
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          {features.map((feature, index) => (
            <FeatureSection
              key={index}
              title={feature.title}
              description={feature.description}
              list={feature.list}
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
