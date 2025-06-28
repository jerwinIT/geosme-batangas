"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/common/button";
import {
  Clock,
  CheckCircle2,
  CircleX,
  Filter,
  Eye,
  FileText,
  Download,
  ArrowLeft,
} from "lucide-react";
import { SMETable } from "@/components/admin/ui/SMETable";
import { DocumentViewer } from "@/components/admin/ui/DocumentViewer";
import { SearchBar } from "@/components/common";
import { Business, SMEFilter } from "@/types";
import { dummyBusinesses } from "@/data/BusinessDataDummy";
import Link from "next/link";

export function PendingVerificationPage() {
  const [businesses, setBusinesses] = useState<Business[]>(
    dummyBusinesses.filter((b) => b.status === "pending")
  );
  const [filters, setFilters] = useState<SMEFilter>({
    status: "pending",
    municipality: "",
    category: "",
    search: "",
  });
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [isDocumentViewerOpen, setIsDocumentViewerOpen] = useState(false);

  const handleStatusChange = (id: string, status: Business["status"]) => {
    setBusinesses((prev) =>
      prev.map((business) =>
        business.id === id ? { ...business, status } : business
      )
    );
  };

  const handleView = (business: Business) => {
    // Handle view logic here
    console.log("View business:", business);
  };

  const handleEdit = (business: Business) => {
    // Handle edit logic here
    console.log("Edit business:", business);
  };

  const handleViewDocuments = (business: Business) => {
    setSelectedBusiness(business);
    setIsDocumentViewerOpen(true);
  };

  const handleDownloadDocuments = (business: Business) => {
    // Handle document download logic here
    console.log("Download documents for:", business);
  };

  const handleFiltersChange = (newFilters: SMEFilter) => {
    setFilters(newFilters);
  };

  const handleApprove = (businessId: string) => {
    handleStatusChange(businessId, "approved");
    setIsDocumentViewerOpen(false);
    setSelectedBusiness(null);
  };

  const handleReject = (businessId: string) => {
    handleStatusChange(businessId, "rejected");
    setIsDocumentViewerOpen(false);
    setSelectedBusiness(null);
  };

  const handleDownload = (businessId: string) => {
    console.log("Download all documents for:", businessId);
  };

  const pendingCount = businesses.length;

  return (
    <div className="py-4 px-4">
      {/* Back button */}
      <div className="mb-4">
        <Link href="/admin/sme">
          <Button variant="ghost" icon={ArrowLeft}>
            Back to SME Management
          </Button>
        </Link>
      </div>

      {/* Header section with title, description, and stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Pending Verification
          </h1>
          <p className="text-sm text-muted-foreground">
            Review and verify SME documents for approval
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">
              {pendingCount} Pending Review
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filter section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="w-full md:flex-1">
          <SearchBar placeholder="Search pending SMEs..." />
        </div>
        <div className="flex gap-2 md:justify-end">
          <Button
            variant="outline"
            icon={Filter}
            onClick={() => setFilters({ ...filters, status: "pending" })}
          >
            Filter: Pending Only
          </Button>
        </div>
      </div>

      {/* SME Table with document verification actions */}
      <SMETable
        businesses={businesses}
        onStatusChange={handleStatusChange}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={() => {}} // Disable delete for pending verification
        filters={filters}
        onFiltersChange={handleFiltersChange}
        showDocumentActions={true}
        onViewDocuments={handleViewDocuments}
        onDownloadDocuments={handleDownloadDocuments}
      />

      {/* Document Viewer */}
      {selectedBusiness && (
        <DocumentViewer
          business={selectedBusiness}
          isOpen={isDocumentViewerOpen}
          onClose={() => {
            setIsDocumentViewerOpen(false);
            setSelectedBusiness(null);
          }}
          onApprove={handleApprove}
          onReject={handleReject}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}
