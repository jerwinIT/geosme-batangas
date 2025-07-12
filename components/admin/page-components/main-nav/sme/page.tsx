"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/common/button";
import {
  Clock,
  Plus,
  SearchCheck,
  CheckCircle2,
  CircleX,
  Upload,
  Import,
} from "lucide-react";
import DashboardWidget from "@/components/admin/ui/DashboardWidget";
import { SMETable } from "@/components/admin/ui/SMETable";
import { AddSMEForm } from "@/components/admin/ui/AddSMEForm";
import { Business, SMEFilter, SMEStats } from "@/types";
import { dummyBusinesses } from "@/data/BusinessDataDummy";
import { SmePageSkeleton } from "@/components/admin/ui/Skeleton";
import Link from "next/link";

export default function SmeManagementPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filters, setFilters] = useState<SMEFilter>({
    status: "all",
    municipality: "",
    category: "",
    search: "",
  });

  // Loading states
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Add SME form state
  const [isAddSMEFormOpen, setIsAddSMEFormOpen] = useState(false);

  // Calculate stats based on current data
  const stats: SMEStats = useMemo(() => {
    const pendingVerification = businesses.filter(
      (b) => b.status === "pending"
    ).length;
    const underReview = businesses.filter(
      (b) => b.status === "under_review"
    ).length;
    const approvedSMEs = businesses.filter(
      (b) => b.status === "approved"
    ).length;
    const rejectedSMEs = businesses.filter(
      (b) => b.status === "rejected"
    ).length;
    const totalSMEs = businesses.length;

    return {
      pendingVerification,
      underReview,
      approvedSMEs,
      rejectedSMEs,
      totalSMEs,
    };
  }, [businesses]);

  const handleStatusChange = (id: string, status: Business["status"]) => {
    setBusinesses((prev) =>
      prev.map((business) =>
        business.id === id ? { ...business, status } : business
      )
    );
  };

  const handleEdit = (business: Business) => {
    // Handle edit logic here
    console.log("Edit business:", business);
  };

  const handleView = (business: Business) => {
    // Handle view logic here
    console.log("View business:", business);
  };

  const handleDelete = (id: string) => {
    setBusinesses((prev) => prev.filter((business) => business.id !== id));
  };

  const handleFiltersChange = (newFilters: SMEFilter) => {
    setIsLoading(true);
    setFilters(newFilters);
    // Reset to first page when filters change
    setCurrentPage(1);

    // Simulate filter loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleAddSME = () => {
    setIsAddSMEFormOpen(true);
  };

  const handleAddSMESubmit = (smeData: any) => {
    // Handle adding single SME
    const newSME: Business = {
      id: `sme-${Date.now()}`, // Generate temporary ID
      ...smeData,
      rating: 0,
      imageUrl: "",
      registrationDate: new Date().toISOString(),
      coordinates:
        smeData.coordinates?.latitude && smeData.coordinates?.longitude
          ? smeData.coordinates
          : undefined, // Leave undefined for automatic geocoding later
    };
    setBusinesses((prev) => [...prev, newSME]);
    console.log("Added new SME:", newSME);
  };

  const handleImportCSV = (file: File) => {
    // Handle CSV import logic here
    console.log("Importing CSV file:", file.name);
    // TODO: Implement CSV parsing and import logic
  };

  const handleExport = () => {
    // Handle export logic here
    console.log("Exporting SMEs");
    // TODO: Implement export functionality
  };

  const handleImport = () => {
    // Handle import logic here
    console.log("Import SMEs");
  };

  // Pagination logic
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const matchesSearch =
        !filters.search ||
        business.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        business.ownerName
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        business.email?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        !filters.status ||
        filters.status === "all" ||
        business.status === filters.status;
      const matchesMunicipality =
        !filters.municipality || business.municipality === filters.municipality;
      const matchesCategory =
        !filters.category || business.category === filters.category;

      return (
        matchesSearch && matchesStatus && matchesMunicipality && matchesCategory
      );
    });
  }, [businesses, filters]);

  const totalItems = filteredBusinesses.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBusinesses = filteredBusinesses.slice(startIndex, endIndex);

  // Simulate initial data loading
  useEffect(() => {
    const loadInitialData = async () => {
      setIsInitialLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setBusinesses(dummyBusinesses);
      setIsInitialLoading(false);
    };

    loadInitialData();
  }, []);

  const handlePageChange = (page: number) => {
    setIsPaginationLoading(true);
    setCurrentPage(page);
    // Simulate loading delay
    setTimeout(() => {
      setIsPaginationLoading(false);
    }, 300);
  };

  // Show skeleton loading during initial load
  if (isInitialLoading) {
    return <SmePageSkeleton />;
  }

  return (
    <div className="py-2 sm:py-4 px-2 sm:px-4 lg:px-6">
      {/* Header section with title, description, and buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-text">
            SME Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage and verify registered SMEs in Batangas
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full lg:w-auto">
          <Button
            icon={Plus}
            onClick={handleAddSME}
            className="w-full sm:w-auto"
          >
            Add SME
          </Button>
          <Link
            href="/admin/sme/pending-verification"
            className="w-full sm:w-auto"
          >
            <Button variant="secondary" className="w-full sm:w-auto">
              Pending Verification ({stats.pendingVerification})
            </Button>
          </Link>
        </div>
      </div>

      {/* Dashboard widgets */}
      <div className="w-full mb-6 sm:mb-8">
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardWidget
            title="Pending Verification"
            value={isLoading ? "..." : stats.pendingVerification}
            icon={<Clock />}
            clickable={true}
            onClick={() => setFilters({ ...filters, status: "pending" })}
            isLoading={isLoading}
          />
          <DashboardWidget
            title="Under Review"
            value={isLoading ? "..." : stats.underReview}
            icon={<SearchCheck />}
            clickable={true}
            onClick={() => setFilters({ ...filters, status: "under_review" })}
            isLoading={isLoading}
          />
          <DashboardWidget
            title="Approved SMEs"
            value={isLoading ? "..." : stats.approvedSMEs}
            icon={<CheckCircle2 />}
            clickable={true}
            onClick={() => setFilters({ ...filters, status: "approved" })}
            isLoading={isLoading}
          />
          <DashboardWidget
            title="Rejected SMEs"
            value={isLoading ? "..." : stats.rejectedSMEs}
            icon={<CircleX />}
            clickable={true}
            onClick={() => setFilters({ ...filters, status: "rejected" })}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* SME Table */}
      <SMETable
        businesses={paginatedBusinesses}
        onStatusChange={handleStatusChange}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onExport={handleExport}
        // Pagination props
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        isPaginationLoading={isPaginationLoading}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        // Original businesses for filter options
        allBusinesses={businesses}
      />

      {/* Add SME Form */}
      <AddSMEForm
        isOpen={isAddSMEFormOpen}
        onClose={() => setIsAddSMEFormOpen(false)}
        onAddSME={handleAddSMESubmit}
        onImportCSV={handleImportCSV}
      />
    </div>
  );
}
