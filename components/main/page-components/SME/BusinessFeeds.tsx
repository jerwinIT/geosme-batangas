"use client";

import React, { useState, useEffect } from "react";
import BusinessCard from "@/components/main/ui/Cards/BusinessCard";
import BusinessCardSkeleton from "@/components/main/ui/Skeleton/BusinessCardSkeleton";
import { Button } from "@/components/common";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Grid3X3,
  List,
  SlidersHorizontal,
  MapPin,
  CreditCard,
} from "lucide-react";
import { dummyBusinesses } from "@/data/BusinessDataDummy";
import { Business } from "@/types";
import Pagination from "@/components/common/Pagination";

const ITEMS_PER_PAGE = 12; // Increased for better UX

const BusinessFeed: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMunicipality, setSelectedMunicipality] = useState("all");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    // Simulate API call
    const fetchBusinesses = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setBusinesses(dummyBusinesses);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const handleFavoriteToggle = (id: string) => {
    // TODO: Implement favorite toggle logic
    console.log("Toggle favorite for business:", id);
  };

  const handleError = (error: Error) => {
    console.error("Error loading business image:", error);
  };

  // Filter and sort businesses
  const filteredBusinesses = businesses
    .filter((business) => {
      const matchesSearch =
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.municipality
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        business.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        business.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesMunicipality =
        selectedMunicipality === "all" ||
        business.municipality.toLowerCase() ===
          selectedMunicipality.toLowerCase();
      const matchesPaymentMethod =
        selectedPaymentMethod === "all" ||
        business.paymentMethods.some(
          (method: string) =>
            method.toLowerCase() === selectedPaymentMethod.toLowerCase()
        );
      return (
        matchesSearch &&
        matchesCategory &&
        matchesMunicipality &&
        matchesPaymentMethod
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "municipality":
          return a.municipality.localeCompare(b.municipality);
        default:
          return 0;
      }
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredBusinesses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBusinesses = filteredBusinesses.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedCategory,
    selectedMunicipality,
    selectedPaymentMethod,
    sortBy,
  ]);

  const handlePageChange = async (newPage: number) => {
    // Set pagination loading state
    setIsPaginationLoading(true);

    // Scroll to Business Categories section
    const businessCategoriesElement = document.getElementById(
      "business-categories"
    );
    if (businessCategoriesElement) {
      businessCategoriesElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }

    // Simulate loading delay for smooth transition
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update page
    setCurrentPage(newPage);

    // Remove loading state after a brief moment
    setTimeout(() => {
      setIsPaginationLoading(false);
    }, 300);
  };

  // Get unique categories, municipalities, and payment methods for filters
  const categories = [
    "all",
    ...Array.from(new Set(businesses.map((b) => b.category))),
  ];
  const municipalities = [
    "all",
    ...Array.from(new Set(businesses.map((b) => b.municipality))),
  ];
  const paymentMethods = [
    "all",
    ...Array.from(new Set(businesses.flatMap((b) => b.paymentMethods))),
  ];

  return (
    <div className="pt-8 md:pt-12 relative overflow-visible">
      {/* Container with consistent width */}
      <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-4">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col gap-6">
            {/* Title and Results Count */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text">
                  Discover Local{" "}
                  <span className="text-primary-500">Businesses</span>
                </h2>
                <p
                  className="text-text-secondary mt-2 text-sm sm:text-base"
                  aria-live="polite"
                >
                  {!isLoading && (
                    <>
                      {filteredBusinesses.length === 0
                        ? "No businesses found"
                        : `${filteredBusinesses.length} ${
                            filteredBusinesses.length === 1
                              ? "business"
                              : "businesses"
                          } found`}
                      {(searchTerm ||
                        selectedCategory !== "all" ||
                        selectedMunicipality !== "all" ||
                        selectedPaymentMethod !== "all") && (
                        <span className="ml-2 text-primary-500 font-medium">
                          • Filtered results
                        </span>
                      )}
                    </>
                  )}
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 shadow-sm">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-9 px-4 focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                >
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Grid</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-9 px-4 focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                >
                  <List className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">List</span>
                </Button>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search businesses, locations, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all duration-300 bg-white shadow-sm focus:shadow-md"
                  aria-label="Search businesses"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {/* Category Filter */}
                <div className="flex items-center gap-2 min-w-0">
                  <Filter className="h-4 w-4 text-primary-500" />
                  <label
                    htmlFor="category-filter"
                    className="text-sm font-medium text-text sr-only"
                  >
                    Category
                  </label>
                  <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm min-w-[120px]"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Municipality Filter */}
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="h-4 w-4 text-primary-500" />
                  <label
                    htmlFor="municipality-filter"
                    className="text-sm font-medium text-text sr-only"
                  >
                    Location
                  </label>
                  <select
                    id="municipality-filter"
                    value={selectedMunicipality}
                    onChange={(e) => setSelectedMunicipality(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm min-w-[120px]"
                  >
                    {municipalities.map((municipality) => (
                      <option key={municipality} value={municipality}>
                        {municipality === "all"
                          ? "All Locations"
                          : municipality}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Payment Method Filter */}
                <div className="flex items-center gap-2 min-w-0">
                  <CreditCard className="h-4 w-4 text-primary-500" />
                  <label
                    htmlFor="payment-filter"
                    className="text-sm font-medium text-text sr-only"
                  >
                    Payment
                  </label>
                  <select
                    id="payment-filter"
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm min-w-[120px]"
                  >
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method === "all" ? "All Payment Methods" : method}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div className="flex items-center gap-2 min-w-0">
                  <SlidersHorizontal className="h-4 w-4 text-primary-500" />
                  <label
                    htmlFor="sort-filter"
                    className="text-sm font-medium text-text sr-only"
                  >
                    Sort
                  </label>
                  <select
                    id="sort-filter"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm min-w-[100px]"
                  >
                    <option value="name">Name A-Z</option>
                    <option value="rating">Highest Rated</option>
                    <option value="municipality">Location</option>
                  </select>
                </div>

                {/* Clear Filters */}
                {(searchTerm ||
                  selectedCategory !== "all" ||
                  selectedMunicipality !== "all" ||
                  selectedPaymentMethod !== "all") && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                      setSelectedMunicipality("all");
                      setSelectedPaymentMethod("all");
                      setSortBy("name");
                    }}
                    className="whitespace-nowrap text-sm hover:bg-primary-50 hover:border-primary-300 focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Business Grid */}
        <div className="mb-12">
          {isLoading || isPaginationLoading ? (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <BusinessCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredBusinesses.length === 0 ? (
            // Empty State
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                No businesses found
              </h3>
              <p className="text-text-secondary mb-6 max-w-md mx-auto">
                {searchTerm ||
                selectedCategory !== "all" ||
                selectedMunicipality !== "all" ||
                selectedPaymentMethod !== "all"
                  ? "Try adjusting your search terms or filters to find what you're looking for."
                  : "We couldn't find any businesses at the moment. Please try again later."}
              </p>
              {(searchTerm ||
                selectedCategory !== "all" ||
                selectedMunicipality !== "all" ||
                selectedPaymentMethod !== "all") && (
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedMunicipality("all");
                    setSelectedPaymentMethod("all");
                    setSortBy("name");
                  }}
                  className="mx-auto"
                >
                  Clear all filters
                </Button>
              )}
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 lg:grid-cols-2"
              }`}
            >
              {currentBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  {...business}
                  onFavoriteToggle={handleFavoriteToggle}
                  onError={handleError}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isLoading}
          isPaginationLoading={isPaginationLoading}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={filteredBusinesses.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default BusinessFeed;
