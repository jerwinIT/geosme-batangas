"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/common/button";
import {
  Clock,
  Filter,
  ArrowLeft,
  Eye,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Building,
  User,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { SMETable } from "@/components/admin/ui/SMETable";
import { DocumentViewer } from "@/components/admin/ui/DocumentViewer";
import { SearchBar } from "@/components/common";
import { Business, SMEFilter } from "@/types";
import { dummyBusinesses } from "@/data/BusinessDataDummy";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
  const [expandedBusiness, setExpandedBusiness] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const itemsPerPage = 10;

  // Mock documents for each business
  const getBusinessDocuments = (businessId: string) => [
    {
      name: "Business Registration Certificate",
      type: "PDF",
      size: "2.3 MB",
      uploaded: "2024-01-15",
      status: "verified",
    },
    {
      name: "Mayor's Permit",
      type: "PDF",
      size: "1.8 MB",
      uploaded: "2024-01-15",
      status: "pending",
    },
    {
      name: "DTI Certificate",
      type: "PDF",
      size: "3.1 MB",
      uploaded: "2024-01-15",
      status: "verified",
    },
    {
      name: "Barangay Clearance",
      type: "PDF",
      size: "1.2 MB",
      uploaded: "2024-01-15",
      status: "pending",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
    }
  };

  const handleStatusChange = (id: string, status: Business["status"]) => {
    setBusinesses((prev) =>
      prev.map((business) =>
        business.id === id ? { ...business, status } : business
      )
    );
    // Close expanded view after status change
    setExpandedBusiness(null);
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
    // Reset to first page when filters change
    setCurrentPage(1);
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

  const toggleExpanded = (businessId: string) => {
    setExpandedBusiness(expandedBusiness === businessId ? null : businessId);
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

  const pendingCount = businesses.length;

  return (
    <div className="py-4 px-4">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/sme">SME Management</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pending Verification</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Header section with title, description, and stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-text">
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

      {/* Enhanced SME List with Inline Document Viewing */}
      <div className="space-y-4">
        {paginatedBusinesses.map((business) => {
          const documents = getBusinessDocuments(business.id);
          const isExpanded = expandedBusiness === business.id;

          return (
            <div
              key={business.id}
              className="border rounded-lg overflow-hidden"
            >
              {/* Business Header */}
              <div className="p-4 bg-white hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{business.name}</h3>
                      <p className="text-sm text-gray-600">
                        {business.category} • {business.municipality}
                      </p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {business.ownerName || "N/A"}
                        </span>
                        <span className="flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {business.email || "N/A"}
                        </span>
                        <span className="flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {business.contactNumber || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      Pending Review
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(business.id)}
                    >
                      <Eye className="w-4 h-4" />
                      {isExpanded ? "Hide" : "View"} Documents
                    </Button>
                  </div>
                </div>
              </div>

              {/* Expanded Document Section */}
              {isExpanded && (
                <div className="border-t bg-gray-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">
                        Business Documents
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download All
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-700 hover:bg-red-50"
                          onClick={() => handleReject(business.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApprove(business.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>

                    {/* Document List */}
                    <div className="grid gap-3">
                      {documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <FileText className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <h5 className="font-medium text-sm">
                                {doc.name}
                              </h5>
                              <p className="text-xs text-gray-500">
                                {doc.type} • {doc.size} • Uploaded{" "}
                                {doc.uploaded}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(doc.status)}
                            <Button variant="ghost" size="sm">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Business Details Summary */}
                    <div className="mt-4 p-3 bg-white rounded-lg border">
                      <h5 className="font-medium text-sm mb-2">
                        Business Summary
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div>
                          <span className="text-gray-500">Address:</span>
                          <p className="font-medium">
                            {business.address || "N/A"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">License:</span>
                          <p className="font-medium">
                            {business.businessLicense || "N/A"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Hours:</span>
                          <p className="font-medium">
                            {business.operatingHours || "N/A"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Website:</span>
                          <p className="font-medium">
                            {business.website || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Document Viewer (for detailed view) */}
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
