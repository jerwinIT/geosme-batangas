"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

// Add global styles for animations
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    .animate-slide-up {
      opacity: 1 !important;
      transform: translateY(0) scale(1) !important;
    }
    .team-card-hover {
      transition: all 0.3s ease-out;
    }
    .team-card-hover:hover {
      transform: translateY(-8px) scale(1.02);
    }
    @keyframes gentle-bounce {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    .gentle-bounce {
      animation: gentle-bounce 3s ease-in-out infinite;
    }
    @keyframes rotate-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .rotate-slow {
      animation: rotate-slow 20s linear infinite;
    }
  `;
  if (!document.head.querySelector("style[data-meet-our-team]")) {
    style.setAttribute("data-meet-our-team", "true");
    document.head.appendChild(style);
  }
}

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  image: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  index: number;
}

function TeamMemberCard({
  name,
  role,
  description,
  image,
  socialLinks,
  index,
}: TeamMemberProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="opacity-0 transform translate-y-8 scale-95 transition-all duration-800 ease-out team-card-hover"
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl overflow-hidden group relative">
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-primary-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Profile Image Section */}
        <div className="relative p-6 pb-4">
          <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40">
            {/* Rotating Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-full rotate-slow opacity-75"></div>
            <div className="absolute inset-1 bg-white rounded-full"></div>

            {/* Profile Image Placeholder */}
            <div className="absolute inset-2 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <p className="text-primary-700 font-medium text-xs">{image}</p>
              </div>
            </div>

            {/* Floating Decorations */}
            <div
              className="absolute -top-2 -right-2 w-6 h-6 bg-primary-400/30 rounded-full gentle-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary-500/40 rounded-full gentle-bounce"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 pb-6 text-center relative">
          {/* Role Badge */}
          <div className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full mb-3 group-hover:bg-primary-200 transition-colors duration-300">
            <MapPin className="w-3 h-3 mr-1" />
            {role}
          </div>

          {/* Name */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-text mb-3 group-hover:text-primary-600 transition-colors duration-300">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6 group-hover:text-text transition-colors duration-300">
            {description}
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                className="w-10 h-10 bg-gray-100 hover:bg-primary-100 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                className="w-10 h-10 bg-gray-100 hover:bg-primary-100 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {socialLinks.email && (
              <a
                href={`mailto:${socialLinks.email}`}
                className="w-10 h-10 bg-gray-100 hover:bg-primary-100 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Decorative Corner Elements */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-primary-200/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 gentle-bounce"></div>
        <div
          className="absolute bottom-4 left-4 w-6 h-6 bg-primary-300/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 gentle-bounce"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>
    </div>
  );
}

export default function MeetOurTeam() {
  const teamMembers = [
    {
      name: "Jerwin Louise G. Peria",
      role: "Fullstack Developer",
      description: "Description",
      image: "Profile Photo",
      socialLinks: {
        github: "#",
        linkedin: "#",
        email: "alex@geosme.com",
      },
    },
    {
      name: "Gea M. Cuevas",
      role: "Project Manager",
      description: "Description",
      image: "Profile Photo",
      socialLinks: {
        github: "#",
        linkedin: "#",
        email: "maria@geosme.com",
      },
    },
    {
      name: "Riana Herlaine V. Carandang",
      role: "Data Analyst",
      description: "Description",
      image: "Profile Photo",
      socialLinks: {
        github: "#",
        linkedin: "#",
        email: "james@geosme.com",
      },
    },
  ];

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-6">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            Our Leadership
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-text mb-4 sm:mb-6 leading-tight">
            Meet Our{" "}
            <span className="text-primary-500 relative">
              Team
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"></div>
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-text-secondary max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Meet the passionate individuals behind GeoSME Batangas who are
            dedicated to empowering local businesses through innovative
            technology.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              role={member.role}
              description={member.description}
              image={member.image}
              socialLinks={member.socialLinks}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
