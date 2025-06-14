"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileNavLinks } from "@/constant/constant";
import { CgClose } from "react-icons/cg";

type MobileNavbarProps = {
  showNav: boolean;
  closeNav: () => void;
};

export default function MobileNavbar({ showNav, closeNav }: MobileNavbarProps) {
  const pathname = usePathname();

  // Helper function to check if link is active
  const isActiveLink = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      closeNav();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[1000] transition-opacity duration-300 ${
        showNav ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 transition-opacity duration-500 ease-in-out ${
          showNav ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeNav}
        aria-hidden="true"
      />

      {/* NavLinks */}
      <div
        className={`fixed right-0 top-0 h-full w-[80%] sm:w-[60%] bg-white transform transition-all duration-500 ease-in-out ${
          showNav ? "translate-x-0" : "translate-x-full"
        }`}
        role="navigation"
      >
        <div className="flex flex-col h-full pt-20 space-y-6">
          {mobileNavLinks.map((link, index) => {
            const IconComponent = link.icon;
            const isActive = isActiveLink(link.url);
            return (
              <Link
                key={link.id}
                href={link.url}
                className="group focus:outline-none focus:ring-2 focus:ring-[#d72323]/20 rounded-lg mx-4"
                onClick={closeNav}
                aria-current={isActive ? "page" : undefined}
                style={{
                  animation: showNav
                    ? `slideIn 0.5s ease-out ${index * 0.1}s forwards`
                    : "none",
                  opacity: 0,
                  transform: "translateX(20px)",
                }}
              >
                <div
                  className={`flex items-center gap-4 ml-8 py-3 px-4 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-[#d72323]/10 text-[#d72323]"
                      : "hover:bg-[#d72323]/5 hover:text-[#d72323]"
                  }`}
                >
                  <IconComponent
                    className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 ${
                      isActive ? "text-[#d72323]" : "text-[#d72323]"
                    }`}
                  />
                  <p
                    className={`text-[20px] sm:text-[30px] transition-colors duration-300 ${
                      isActive
                        ? "text-[#d72323] font-semibold"
                        : "text-black group-hover:text-[#d72323]"
                    }`}
                  >
                    {link.label}
                  </p>
                  {isActive && (
                    <div className="ml-auto w-1 h-8 bg-[#d72323] rounded-full"></div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Close Button */}
        <button
          onClick={closeNav}
          className="absolute top-10 right-10 sm:w-8 sm:h-8 w-6 h-6 text-[#d72323] cursor-pointer hover:rotate-90 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-[#d72323]/20 rounded-md"
          aria-label="Close navigation menu"
        >
          <CgClose className="w-full h-full" />
        </button>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
