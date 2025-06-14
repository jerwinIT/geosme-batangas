"use client";

import React, { useState, useEffect } from "react";
import BusinessCard from "@/components/ui/Cards/BusinessCard";
import BusinessCardSkeleton from "@/components/ui/Skeleton/BusinessCardSkeleton";
import { Business } from "@/types";
import { Button } from "@/components/ui/button";
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
          (method) =>
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
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
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
                <p className="text-text-secondary mt-2 text-sm sm:text-base">
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
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-9 px-4"
                >
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Grid</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-9 px-4"
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
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search businesses, locations, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all duration-300 bg-white shadow-sm"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Category Filter */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Filter className="h-4 w-4 text-primary-500" />
                    <span className="text-sm font-medium text-text">
                      Category:
                    </span>
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm transition-all duration-300 min-w-[140px]"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Municipality Filter */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <MapPin className="h-4 w-4 text-primary-500" />
                    <span className="text-sm font-medium text-text">
                      Location:
                    </span>
                  </div>
                  <select
                    value={selectedMunicipality}
                    onChange={(e) => setSelectedMunicipality(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm transition-all duration-300 min-w-[140px]"
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
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <CreditCard className="h-4 w-4 text-primary-500" />
                    <span className="text-sm font-medium text-text">
                      Payment:
                    </span>
                  </div>
                  <select
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm transition-all duration-300 min-w-[140px]"
                  >
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method === "all" ? "All Payment Methods" : method}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <SlidersHorizontal className="h-4 w-4 text-primary-500" />
                    <span className="text-sm font-medium text-text">Sort:</span>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white shadow-sm transition-all duration-300 min-w-[120px]"
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
                    className="whitespace-nowrap text-sm hover:bg-primary-50 hover:border-primary-300"
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
        {!isLoading && filteredBusinesses.length > 0 && totalPages > 1 && (
          <div className="flex flex-col items-center gap-6 py-8 border-t border-gray-200">
            {/* Page Info */}
            <div className="text-sm text-text-secondary">
              {isPaginationLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </div>
              ) : (
                `Showing ${startIndex + 1}-${Math.min(
                  endIndex,
                  filteredBusinesses.length
                )} of ${filteredBusinesses.length} businesses`
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isPaginationLoading}
                className="flex items-center gap-2 h-10 px-4"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {/* First page */}
                {currentPage > 3 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePageChange(1)}
                      disabled={isPaginationLoading}
                      className="h-10 w-10"
                    >
                      1
                    </Button>
                    {currentPage > 4 && (
                      <span className="px-2 text-text-secondary">...</span>
                    )}
                  </>
                )}

                {/* Visible page numbers */}
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  const isVisible =
                    pageNumber === currentPage ||
                    pageNumber === currentPage - 1 ||
                    pageNumber === currentPage + 1 ||
                    (currentPage <= 2 && pageNumber <= 3) ||
                    (currentPage >= totalPages - 1 &&
                      pageNumber >= totalPages - 2);

                  if (!isVisible) return null;

                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handlePageChange(pageNumber)}
                      disabled={isPaginationLoading}
                      className={`h-10 w-10 ${
                        currentPage === pageNumber
                          ? "bg-primary-500 text-white hover:bg-primary-600"
                          : "hover:bg-primary-500/10"
                      }`}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}

                {/* Last page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <span className="px-2 text-text-secondary">...</span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePageChange(totalPages)}
                      disabled={isPaginationLoading}
                      className="h-10 w-10"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>

              {/* Next Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isPaginationLoading}
                className="flex items-center gap-2 h-10 px-4"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Jump (for large datasets) */}
            {totalPages > 5 && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-secondary">Jump to page:</span>
                <select
                  value={currentPage}
                  onChange={(e) => handlePageChange(Number(e.target.value))}
                  disabled={isPaginationLoading}
                  className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessFeed;
