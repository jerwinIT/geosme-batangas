"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Nav, MobileNavbar } from "@/components/main/ui/Navbar";

export default function ResponsiveNavbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const pathname = usePathname();

  const handNavShow = () => setShowNavbar(true);
  const handCloseNav = () => setShowNavbar(false);

  // Close mobile nav when route changes
  useEffect(() => {
    setShowNavbar(false);
  }, [pathname]);

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (showNavbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showNavbar]);

  // Handle escape key to close mobile nav
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showNavbar) {
        handCloseNav();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showNavbar]);

  return (
    <div>
      <Nav openNav={handNavShow} />
      <MobileNavbar showNav={showNavbar} closeNav={handCloseNav} />
    </div>
  );
}
