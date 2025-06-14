"use client";

import React, { useState, useEffect } from "react";
import { MdLightMode, MdDarkMode, MdComputer } from "react-icons/md";

type Theme = "light" | "dark" | "system";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("system");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  // Apply theme to document
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    if (newTheme === "system") {
      root.classList.remove("light", "dark");
      localStorage.removeItem("theme");
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);
    }

    // Dispatch custom event for same-tab theme changes
    window.dispatchEvent(new CustomEvent("themechange"));
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    setIsOpen(false);
  };

  const getCurrentIcon = () => {
    switch (theme) {
      case "light":
        return <MdLightMode className="w-5 h-5" />;
      case "dark":
        return <MdDarkMode className="w-5 h-5" />;
      case "system":
        return <MdComputer className="w-5 h-5" />;
    }
  };

  const themeOptions = [
    {
      value: "light",
      label: "Light",
      icon: <MdLightMode className="w-4 h-4" />,
    },
    { value: "dark", label: "Dark", icon: <MdDarkMode className="w-4 h-4" /> },
    {
      value: "system",
      label: "System",
      icon: <MdComputer className="w-4 h-4" />,
    },
  ];

  // Don't render during SSR to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Theme options panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-2 min-w-[140px] animate-in fade-in slide-in-from-bottom-2 duration-200">
          {themeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleThemeChange(option.value as Theme)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                hover:bg-gray-100 dark:hover:bg-gray-700
                ${
                  theme === option.value
                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                    : "text-gray-700 dark:text-gray-300"
                }
              `}
            >
              {option.icon}
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-14 h-14 bg-white dark:bg-gray-800 rounded-full shadow-2xl 
          border border-gray-200 dark:border-gray-700
          flex items-center justify-center
          text-gray-700 dark:text-gray-300
          hover:scale-110 hover:shadow-3xl
          active:scale-95
          transition-all duration-200 ease-out
          hover:bg-gray-50 dark:hover:bg-gray-750
        "
        aria-label="Toggle theme"
      >
        {getCurrentIcon()}
      </button>
    </div>
  );
};

export default ThemeToggle;
