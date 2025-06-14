import React from "react";
import Image from "next/image";
import { ChartLine, ArrowRight } from "lucide-react";
import { IoFootsteps } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { IoMdTrendingUp } from "react-icons/io";
import CTAButton from "@/components/ui/Buttons/CTAButton";
import { Badge } from "@/components/ui";

const analyticsFeatures = [
  {
    title: "Market Trends Analysis",
    icon: <ChartLine />,
  },
  {
    title: "Customer Foot Traffic",
    icon: <IoFootsteps />,
  },
  {
    title: "Business Density Heatmaps",
    icon: <VscGraph />,
  },
  {
    title: "Market Opportunities",
    icon: <IoMdTrendingUp />,
  },
];

export default function AnalyticsSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center py-12 sm:py-16 md:py-20">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 mx-auto animate-fade-in">
          <div className="flex flex-col items-center justify-center lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Text on the left */}
            <div className="lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
              <Badge>SME Analytics</Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-text">
                Location-based{" "}
                <span className="text-primary-500">Analytics</span> & Market
                <span className="text-primary-500"> Intelligence</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary leading-relaxed mb-10">
                Make data-driven decisions with our comprehensive analytics
                platform. Understand market trends, identify opportunities, and
                analyze business density across Batangas.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {analyticsFeatures.map((feature) => (
                  <div key={feature.title}>
                    <div className="flex items-center justify-center lg:justify-start gap-2">
                      <div className="text-2xl text-primary-500">
                        {feature.icon}
                      </div>
                      <p className="text-sm lg:text-lg font-semibold text-text">
                        {feature.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex justify-center lg:justify-start">
                <CTAButton
                  href="/analytics"
                  className="mt-10"
                  icon={ArrowRight}
                  variant="primary"
                >
                  Explore Analytics
                </CTAButton>
              </div>
            </div>

            {/* Image on the right */}
            <div className="w-full lg:w-1/2 flex justify-center px-4 order-1 lg:order-2">
              <div className="relative w-full max-w-[600px] aspect-[3/2] bg-gray-200 animate-pulse rounded">
                <Image
                  src="https://imageplaceholder.net/600x400"
                  alt="Image"
                  fill
                  className="object-cover rounded"
                  placeholder="empty"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
