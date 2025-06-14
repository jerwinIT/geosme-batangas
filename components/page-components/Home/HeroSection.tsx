import React from "react";

import { BarChart3, Building2, MapPin, Star, Sparkles } from "lucide-react";
import CTAButton from "@/components/ui/Buttons/CTAButton";
import Badge from "@/components/ui/badge";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex items-center justify-center bg-surface pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20">
      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto  text-center">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 lg:space-y-10">
          <Badge icon={<Sparkles className="w-4 h-4 text-primary-500" />}>
            Complete SME Coverage • Batangas 2024
          </Badge>

          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-text">
              Every Listed SME in Batangas{" "}
              <span className="text-primary-500 block sm:inline">
                Now Mapped & Analyzed
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              The most comprehensive SME database in Batangas Province. Explore
              all registered businesses with exclusive fintech adoption insights
              and market intelligence data.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 md:mt-12">
            <CTAButton
              href="/explore"
              icon={MapPin}
              variant="primary"
              className="w-full sm:w-auto"
            >
              Explore SMEs
            </CTAButton>
            <CTAButton
              href="/business-portal"
              icon={Building2}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Access Market Intelligence
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
