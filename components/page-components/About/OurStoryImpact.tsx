"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, MapPin, Building2 } from "lucide-react";

// Add global styles for animations
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    .animate-slide-in {
      opacity: 1 !important;
      transform: translateX(0) !important;
    }
    .animate-fade-in {
      opacity: 1 !important;
      transform: translateY(0) scale(1) !important;
    }
    .animate-counter {
      transition: all 0.3s ease-out;
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(215, 35, 35, 0.4); }
      50% { box-shadow: 0 0 0 10px rgba(215, 35, 35, 0); }
    }
    .pulse-glow {
      animation: pulse-glow 2s infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-10px) rotate(1deg); }
      66% { transform: translateY(-5px) rotate(-1deg); }
    }
    .float-animation {
      animation: float 6s ease-in-out infinite;
    }
    @keyframes gradient-shift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    .gradient-animate {
      background-size: 200% 200%;
      animation: gradient-shift 4s ease infinite;
    }
  `;
  if (!document.head.querySelector("style[data-our-story-impact]")) {
    style.setAttribute("data-our-story-impact", "true");
    document.head.appendChild(style);
  }
}

interface StoryContentProps {
  index: number;
}

function StoryContent({ index }: StoryContentProps) {
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

  return (
    <div
      ref={sectionRef}
      className="opacity-0 transform translate-x-[-20px] lg:translate-x-[-50px] transition-all duration-1000 ease-out"
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
        {/* Enhanced Image Section */}
        <div className="w-full md:flex-1 max-w-lg md:max-w-none">
          <div className="relative aspect-[16/10] sm:aspect-[4/3] bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 gradient-animate">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg float-animation">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                </div>
                <p className="text-primary-800 font-bold text-sm sm:text-base lg:text-lg px-2">
                  Our Journey Timeline
                </p>
                <div className="mt-2 flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary-300 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
            {/* Enhanced Decorative elements */}
            <div
              className="absolute top-3 right-3 sm:top-6 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary-300/40 to-primary-500/20 rounded-full float-animation"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-400/50 to-primary-600/30 rounded-full float-animation"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-1/2 left-4 w-4 h-4 sm:w-6 sm:h-6 bg-primary-400/30 rounded-full float-animation"
              style={{ animationDelay: "3s" }}
            ></div>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div className="w-full md:flex-1">
          <div className="md:pl-6 lg:pl-8 xl:pl-10 text-center md:text-left">
            <div className="mb-4 sm:mb-6">
              <div className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 text-xs sm:text-sm font-semibold rounded-full mb-3">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Established 2024
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-text leading-tight">
                Our{" "}
                <span className="text-primary-500 relative">
                  Story
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"></div>
                </span>
              </h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary-500 to-primary-300 rounded-full hidden md:block"></div>
                <div className="md:pl-6 space-y-4 sm:space-y-6">
                  <p
                    className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary leading-relaxed max-w-2xl mx-auto md:mx-0 opacity-0 animate-slide-in"
                    style={{ animationDelay: "0.3s" }}
                  >
                    GeoSME Batangas is our capstone project as 3rd year college
                    students, developed in partnership with fintech researchers
                    who serve as our client. We recognized the critical need to
                    promote SME fintech adoption and enhance business visibility
                    in Batangas Province through digital innovation.
                  </p>
                  <p
                    className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary leading-relaxed max-w-2xl mx-auto md:mx-0 opacity-0 animate-slide-in"
                    style={{ animationDelay: "0.5s" }}
                  >
                    Our platform combines geospatial technology with
                    comprehensive fintech analysis to provide location-based
                    insights and advanced business tools. We're passionate about
                    bridging the digital divide for SMEs, helping them
                    understand and adopt financial technologies that can
                    transform their operations.
                  </p>
                  <p
                    className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary leading-relaxed max-w-2xl mx-auto md:mx-0 opacity-0 animate-slide-in"
                    style={{ animationDelay: "0.7s" }}
                  >
                    Through this capstone project, we aim to create lasting
                    impact by providing SMEs with data-driven insights about
                    fintech adoption trends, digital payment solutions, and
                    location-based market analysis that will empower their
                    growth in the digital economy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  number: string;
  label: string;
  index: number;
  icon: React.ReactNode;
}

function StatCard({ number, label, index, icon }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedNumber, setAnimatedNumber] = useState("0");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            entry.target.classList.add("animate-fade-in");
            setIsVisible(true);

            // Animate counter
            setTimeout(() => {
              animateCounter(number);
            }, index * 150 + 300);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -30px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, number, index]);

  const animateCounter = (target: string) => {
    const numericPart = target.replace(/[^0-9]/g, "");
    const suffix = target.replace(/[0-9]/g, "");
    const targetNum = parseInt(numericPart);
    const duration = 1500;
    const steps = 60;
    const increment = targetNum / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        setAnimatedNumber(target);
        clearInterval(timer);
      } else {
        setAnimatedNumber(
          Math.floor(current).toLocaleString() + suffix.replace(/[0-9]/g, "")
        );
      }
    }, duration / steps);
  };

  return (
    <div
      ref={cardRef}
      className="opacity-0 transform translate-y-8 scale-95 transition-all duration-800 ease-out text-center p-6 sm:p-8 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-primary-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Icon Section */}
      <div className="relative mb-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 pulse-glow">
          <div className="text-white">{icon}</div>
        </div>
      </div>

      {/* Number Section */}
      <div className="relative mb-3 sm:mb-4">
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-primary-500 block leading-none animate-counter group-hover:scale-110 transition-transform duration-300">
          {isVisible ? animatedNumber : "0"}
        </span>
      </div>

      {/* Label Section */}
      <p className="relative text-sm sm:text-base md:text-lg lg:text-xl text-text font-medium leading-relaxed group-hover:text-primary-700 transition-colors duration-300">
        {label}
      </p>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-primary-200/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 float-animation"></div>
      <div
        className="absolute bottom-4 left-4 w-6 h-6 bg-primary-300/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 float-animation"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  );
}

export default function OurStoryImpact() {
  const impactStats = [
    {
      number: "500+",
      label: "SMEs Analyzed for Fintech Adoption",
      icon: <Building2 className="w-6 h-6 sm:w-8 sm:h-8" />,
    },
    {
      number: "24",
      label: "Municipalities Covered in Research",
      icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />,
    },
    {
      number: "85%",
      label: "Fintech Adoption Gap Identified",
      icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />,
    },
    {
      number: "12",
      label: "Advanced Business Tools Developed",
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
    },
  ];

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Our Story Section */}
        <div className="mb-16 sm:mb-20 md:mb-24 lg:mb-32">
          <StoryContent index={0} />
        </div>

        {/* Our Impact Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-text mb-4 sm:mb-6 leading-tight">
            Our <span className="text-primary-500">Research</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Key findings from our capstone project research on SME fintech
            adoption and digital transformation in Batangas Province.
          </p>
        </div>

        {/* Impact Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {impactStats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              index={index}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
