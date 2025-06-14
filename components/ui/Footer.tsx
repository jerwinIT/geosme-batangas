"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ThemeLogo from "@/components/ui/Theme/ThemeLogo";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // Set the current year only on the client side to avoid hydration mismatch
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <ThemeLogo width={153} height={50} className="mb-4" />
            <p className="text-text-secondary max-w-md">
              Discover and connect with Small and Medium Enterprises across
              Batangas Province. Find services, explore market trends, and
              support local businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/map"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Map
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/register-business"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Business Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-text font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/login"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm">
            © {currentYear || "2024"} GeoSME. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link
              href="/privacy"
              className="text-text-secondary hover:text-primary text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-text-secondary hover:text-primary text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
