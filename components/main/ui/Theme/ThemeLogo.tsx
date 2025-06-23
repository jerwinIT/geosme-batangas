"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type Theme = "light" | "dark" | "system";

interface ThemeLogoProps {
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

const ThemeLogo: React.FC<ThemeLogoProps> = ({
  width = 153,
  height = 50,
  priority = false,
  className = "",
}) => {
  const [theme, setTheme] = useState<Theme>("system");
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme and system preference
  useEffect(() => {
    setMounted(true);

    // Get saved theme
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      setTheme(savedTheme);
    }

    // Check system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemPrefersDark(mediaQuery.matches);

    // Listen for system preference changes
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Listen for theme changes from localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme") {
        const newTheme = e.newValue as Theme | null;
        if (newTheme && ["light", "dark", "system"].includes(newTheme)) {
          setTheme(newTheme);
        } else if (newTheme === null) {
          setTheme("system");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Listen for manual theme changes (from the same tab)
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem("theme") as Theme | null;
      if (currentTheme && ["light", "dark", "system"].includes(currentTheme)) {
        setTheme(currentTheme);
      } else {
        setTheme("system");
      }
    };

    // Custom event for same-tab theme changes
    window.addEventListener("themechange", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("themechange", handleThemeChange);
    };
  }, []);

  // Determine which logo to show
  const shouldShowDarkLogo = () => {
    if (!mounted) {
      // Return false during SSR/initial hydration to avoid mismatch
      return false;
    }

    switch (theme) {
      case "dark":
        return true;
      case "light":
        return false;
      case "system":
        return systemPrefersDark;
      default:
        return systemPrefersDark;
    }
  };

  const isDark = shouldShowDarkLogo();

  // Show only light logo during SSR/initial render to avoid hydration mismatch
  if (!mounted) {
    return (
      <Image
        src="/Images/Logo/geosme-logo-light.png"
        alt="geosme-logo"
        width={width}
        height={height}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <>
      <Image
        src="/Images/Logo/geosme-logo-light.png"
        alt="geosme-logo"
        width={width}
        height={height}
        priority={priority}
        className={`${className} ${isDark ? "hidden" : "block"}`}
      />
      <Image
        src="/Images/Logo/geosme-logo-dark.png"
        alt="geosme-logo"
        width={width}
        height={height}
        priority={priority}
        className={`${className} ${isDark ? "block" : "hidden"}`}
      />
    </>
  );
};

export default ThemeLogo;
