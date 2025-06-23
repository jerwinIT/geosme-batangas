import React from "react";
import Link from "next/link";
import {
  HiArrowRight,
  HiChartBarSquare,
  HiMapPin,
  HiLightBulb,
} from "react-icons/hi2";

export default function GetStarted() {
  return (
    <section className="w-full min-h-[500px] flex flex-col justify-center items-center py-16 sm:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl shadow-2xl relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/30 rounded-full"></div>
        <div className="absolute top-1/4 right-1/3 w-12 h-12 bg-white/40 rounded-full"></div>
      </div>

      <div className="w-full max-w-5xl mx-auto text-center relative z-10">
        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 sm:mb-8 leading-tight">
          Ready to leverage{" "}
          <span className="text-primary-100">data-driven insights</span>?
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-12 leading-relaxed font-medium">
          Join hundreds of businesses already using GeoSME to make smarter
          location-based decisions and grow their market presence.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 mb-10 sm:mb-12 lg:mb-16">
          <div className="flex items-center gap-3 text-white/90">
            <HiChartBarSquare className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-200" />
            <span className="text-sm sm:text-base lg:text-lg font-medium">
              Analytics Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <HiMapPin className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-200" />
            <span className="text-sm sm:text-base lg:text-lg font-medium">
              Interactive Mapping
            </span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <HiLightBulb className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-200" />
            <span className="text-sm sm:text-base lg:text-lg font-medium">
              Market Insights
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/register-business"
            className="group inline-flex items-center justify-center gap-3 bg-background text-primary-600 px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-full font-bold text-lg sm:text-xl lg:text-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-out hover:bg-surface active:scale-95"
          >
            Get Started Today
            <HiArrowRight className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 text-white/90 hover:text-white px-6 py-3 rounded-full font-medium text-base sm:text-lg border border-primary-300/40 hover:border-primary-200/60 transition-all duration-300 hover:bg-primary-800/20"
          >
            Learn More
          </Link>
        </div>

        {/* Trust indicator */}
        <p className="text-white/70 text-sm sm:text-base mt-8 sm:mt-10 font-medium">
          🚀 No setup fees • ⚡ Quick registration • 📊 Instant insights
        </p>
      </div>
    </section>
  );
}
