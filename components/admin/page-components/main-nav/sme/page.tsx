"use client";

import { useState, useMemo } from "react";
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
import Link from "next/link";

export default function SmeManagementPage() {
  const [businesses, setBusinesses] = useState<Business[]>(dummyBusinesses);
  const [filters, setFilters] = useState<SMEFilter>({
    status: "all",
    municipality: "",
    category: "",
    search: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
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
    setFilters(newFilters);
    // Reset to first page when filters change
    setCurrentPage(1);
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

  const handlePageChange = (page: number) => {
    setIsPaginationLoading(true);
    setCurrentPage(page);
    // Simulate loading delay
    setTimeout(() => {
      setIsPaginationLoading(false);
    }, 300);
  };

  return (
    <div className="py-4 px-4">
      {/* Header section with title, description, and buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-text">
            SME Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and verify registered SMEs in Batangas
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button icon={Plus} onClick={handleAddSME}>
            Add SME
          </Button>
          <Link href="/admin/sme/pending-verification">
            <Button variant="secondary">
              Pending Verification ({stats.pendingVerification})
            </Button>
          </Link>
        </div>
      </div>

      {/* Dashboard widgets */}
      <div className="w-full mb-8">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <DashboardWidget
            title="Pending Verification"
            value={stats.pendingVerification}
            icon={<Clock />}
            clickable={true}
            onClick={() => setFilters({ ...filters, status: "pending" })}
          />
          <DashboardWidget
            title="Under Review"
            value={stats.underReview}
            icon={<SearchCheck />}
            clickable={true}
            onClick={() => setFilters({ ...filters, status: "under_review" })}
          />
          <DashboardWidget
            title="Approved SMEs"
            value={stats.approvedSMEs}
            icon={<CheckCircle2 />}
            clickable={true}
            onClick={() => setFilters({ ...filters, status: "approved" })}
          />
          <DashboardWidget
            title="Rejected SMEs"
            value={stats.rejectedSMEs}
            icon={<CircleX />}
            clickable={true}
            onClick={() => setFilters({ ...filters, status: "rejected" })}
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
