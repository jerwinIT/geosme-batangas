"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constant/constant";
import { HiBars3BottomRight } from "react-icons/hi2";
import ThemeLogo from "@/components/main/ui/Theme/ThemeLogo";
import { Button } from "@/components/common";
import { ChevronDown } from "lucide-react";

type NavProps = {
  openNav: () => void;
};

export default function Nav({ openNav }: NavProps) {
  const [showTooltip, setShowTooltip] = useState(true);
  const [showMobileTooltip, setShowMobileTooltip] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
      setShowMobileTooltip(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Helper function to check if link is active
  const isActiveLink = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  // Helper function to check if any dropdown item is active
  const isDropdownActive = (items: any[]) => {
    return items?.some((item) => pathname.startsWith(item.url));
  };

  return (
    <div className="flex w-full h-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-[100px] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] fixed z-[1000]">
      <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-4 w-1/4">
          <Link
            href="/"
            className="transition-transform hover:scale-105 duration-200"
          >
            <ThemeLogo width={153} height={50} priority={true} />
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center justify-center gap-8 w-2/4">
          {navLinks.map((links) => {
            const isActive = links.dropdownItems
              ? isDropdownActive(links.dropdownItems)
              : isActiveLink(links.url);

            return (
              <div
                key={links.id}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(links.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {links.dropdownItems ? (
                  // Dropdown trigger
                  <button
                    className={`flex items-center gap-1 group ${
                      isActive
                        ? "text-[#d72323] font-medium"
                        : "text-text-secondary hover:text-[#d72323]"
                    }`}
                  >
                    <span className="text-sm font-poppins font-normal leading-normal">
                      {links.label}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === links.label ? "rotate-180" : ""
                      }`}
                    />
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                        isActive
                          ? "w-full bg-[#d72323]"
                          : "w-0 bg-black/50 group-hover:w-full group-hover:bg-[#d72323]"
                      }`}
                    ></span>
                  </button>
                ) : (
                  // Regular link
                  <Link
                    href={links.url}
                    className="relative group"
                    aria-current={isActive ? "page" : undefined}
                  >
                    <p
                      className={`relative text-sm font-poppins font-normal leading-normal transition-colors duration-300 ${
                        isActive
                          ? "text-[#d72323] font-medium"
                          : "text-text-secondary hover:text-[#d72323]"
                      }`}
                    >
                      {links.label}
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                          isActive
                            ? "w-full bg-[#d72323]"
                            : "w-0 bg-black/50 group-hover:w-full group-hover:bg-[#d72323]"
                        }`}
                      ></span>
                    </p>
                  </Link>
                )}

                {/* Dropdown menu */}

                {links.dropdownItems && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ease-out z-50 ${
                      activeDropdown === links.label
                        ? "opacity-100 visible translate-y-0 scale-100"
                        : "opacity-0 invisible translate-y-4 scale-95"
                    }`}
                  >
                    <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden min-w-[280px] p-3">
                      {/* Arrow pointer */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-lg border border-gray-100"></div>

                      {/* Card grid */}
                      <div className="grid gap-2">
                        {links.dropdownItems.map((item, index) => (
                          <Link
                            key={item.id}
                            href={item.url}
                            className={`group relative overflow-hidden rounded-xl transition-all duration-300 ease-out transform hover:scale-[1.02] hover:-translate-y-1 ${
                              isActiveLink(item.url)
                                ? "bg-gradient-to-br from-[#d72323]/10 to-[#d72323]/5 border-2 border-[#d72323]/20 shadow-lg"
                                : "bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:bg-white hover:border-gray-300/50 hover:shadow-xl"
                            }`}
                            style={{
                              animationDelay: `${index * 100}ms`,
                            }}
                          >
                            {/* Card content */}
                            <div className="relative p-4">
                              {/* Background pattern for active card */}
                              {isActiveLink(item.url) && (
                                <div className="absolute inset-0 opacity-5">
                                  <div className="absolute top-2 right-2 w-8 h-8 bg-[#d72323] rounded-full"></div>
                                  <div className="absolute bottom-2 left-2 w-4 h-4 bg-[#d72323] rounded-full"></div>
                                </div>
                              )}

                              {/* Hover shimmer effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>

                              <div className="relative flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div>
                                    <h4
                                      className={`font-semibold text-sm transition-colors duration-200 ${
                                        isActiveLink(item.url)
                                          ? "text-[#d72323]"
                                          : "text-gray-800 group-hover:text-gray-900"
                                      }`}
                                    >
                                      {item.label}
                                    </h4>

                                    {/* Optional subtitle/description */}
                                    <p className="text-xs text-gray-500 mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                                      Navigate to {item.label.toLowerCase()}
                                    </p>
                                  </div>
                                </div>

                                {/* Arrow icon */}
                                <div
                                  className={`flex-shrink-0 transition-all duration-200 ${
                                    isActiveLink(item.url)
                                      ? "text-[#d72323] scale-110"
                                      : "text-gray-400 group-hover:text-[#d72323] group-hover:scale-110 group-hover:translate-x-1"
                                  }`}
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            {/* Card shadow overlay */}
                            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 pointer-events-none"></div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/*Auth Buttons */}
        <div className="hidden lg:flex items-center justify-end gap-6 w-1/4">
          <div className="relative group">
            <Link
              href="/business-portal"
              className="relative group"
              aria-current={
                isActiveLink("/business-portal") ? "page" : undefined
              }
            >
              <p
                className={`relative text-sm font-poppins font-normal leading-normal transition-colors duration-300 ${
                  isActiveLink("/business-portal")
                    ? "text-[#d72323] font-medium"
                    : "text-text-secondary group-hover:text-[#d72323]"
                }`}
              >
                Business Portal
                <span
                  className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                    isActiveLink("/business-portal")
                      ? "w-full bg-[#d72323]"
                      : "w-0 bg-black/50 group-hover:w-full group-hover:bg-[#d72323]"
                  }`}
                ></span>
              </p>
            </Link>
            <div
              className={`absolute top-full mt-2 right-0 transition-all duration-300 ease-in-out whitespace-nowrap ${
                showTooltip
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
              }`}
            >
              <div className="relative bg-white p-4 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-text/10 backdrop-blur-sm">
                <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-text/10 rotate-45"></div>
                <p className="text-text-secondary text-sm font-medium relative z-10">
                  Are you a Business Owner?
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-black/20"></div>

          <Link href="/auth/user/login">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </Link>

          <Link
            href="/auth/user/register"
            className="relative group"
            aria-current={
              isActiveLink("/auth/user/register") ? "page" : undefined
            }
          >
            <p
              className={`relative text-sm font-poppins font-normal leading-normal transition-colors duration-300 ${
                isActiveLink("/auth/user/register")
                  ? "text-[#d72323] font-medium"
                  : "text-text-secondary group-hover:text-[#d72323]"
              }`}
            >
              Sign Up
              <span
                className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                  isActiveLink("/auth/user/register")
                    ? "w-full bg-[#d72323]"
                    : "w-0 bg-black/50 group-hover:w-full group-hover:bg-[#d72323]"
                }`}
              ></span>
            </p>
          </Link>
        </div>

        {/* Mobile Menu Button with Tooltip */}
        <div className="relative lg:hidden">
          <button
            onClick={openNav}
            className="w-8 h-8 cursor-pointer text-[#d72323] hover:scale-110 active:scale-95 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#d72323]/20 rounded-md"
            aria-label="Open navigation menu"
            aria-expanded="false"
          >
            <HiBars3BottomRight className="w-full h-full" />
          </button>
          <div
            className={`absolute top-full mt-2 right-0 transition-all duration-300 ease-in-out ${
              showMobileTooltip
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <div className="relative bg-white p-5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-text/10 backdrop-blur-sm max-w-[280px]">
              <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-text/10 rotate-45"></div>
              <div className="space-y-2">
                <p className="text-text-secondary text-sm font-medium relative z-10">
                  Are you a Business Owner?
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[#d72323] font-semibold">
                    Open Menu
                  </span>
                  <span className="text-text/70">→</span>
                  <span className="text-text/80">Go to Business Portal</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
