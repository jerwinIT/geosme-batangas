"use client";

import { useState } from "react";
import { Button } from "@/components/common/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Star,
  MapPin,
  FileText,
  Download,
} from "lucide-react";
import { Business, SMEFilter } from "@/types";
import { cn } from "@/lib/utils";
import Pagination from "@/components/common/Pagination";

interface SMETableProps {
  businesses: Business[];
  onStatusChange: (id: string, status: Business["status"]) => void;
  onEdit: (business: Business) => void;
  onView: (business: Business) => void;
  onDelete: (id: string) => void;
  filters: SMEFilter;
  onFiltersChange: (filters: SMEFilter) => void;
  showDocumentActions?: boolean;
  onViewDocuments?: (business: Business) => void;
  onDownloadDocuments?: (business: Business) => void;
  // Pagination props
  currentPage?: number;
  totalPages?: number;
  isLoading?: boolean;
  isPaginationLoading?: boolean;
  startIndex?: number;
  endIndex?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  // Original businesses for filter options
  allBusinesses?: Business[];
}

export function SMETable({
  businesses,
  onStatusChange,
  onEdit,
  onView,
  onDelete,
  filters,
  onFiltersChange,
  showDocumentActions,
  onViewDocuments,
  onDownloadDocuments,
  // Pagination props
  currentPage = 1,
  totalPages = 1,
  isLoading = false,
  isPaginationLoading = false,
  startIndex = 0,
  endIndex = 0,
  totalItems = 0,
  onPageChange,
  // Original businesses for filter options
  allBusinesses = businesses,
}: SMETableProps) {
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Use the businesses prop directly since filtering is now handled by parent components
  const displayBusinesses = businesses;

  const getStatusBadge = (status: Business["status"]) => {
    const baseClasses =
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold";

    switch (status) {
      case "pending":
        return (
          <span
            className={cn(
              baseClasses,
              "bg-yellow-100 text-yellow-800 border-yellow-200"
            )}
          >
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case "under_review":
        return (
          <span
            className={cn(
              baseClasses,
              "bg-blue-100 text-blue-800 border-blue-200"
            )}
          >
            <Search className="w-3 h-3 mr-1" />
            Under Review
          </span>
        );
      case "approved":
        return (
          <span
            className={cn(
              baseClasses,
              "bg-green-100 text-green-800 border-green-200"
            )}
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span
            className={cn(
              baseClasses,
              "bg-red-100 text-red-800 border-red-200"
            )}
          >
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span
            className={cn(
              baseClasses,
              "bg-gray-100 text-gray-800 border-gray-200"
            )}
          >
            Unknown
          </span>
        );
    }
  };

  const handleView = (business: Business) => {
    setSelectedBusiness(business);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (business: Business) => {
    setSelectedBusiness(business);
    setIsEditDialogOpen(true);
  };

  const handleStatusChange = (id: string, status: Business["status"]) => {
    onStatusChange(id, status);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="search"
              placeholder="Search by name, owner, or email..."
              value={filters.search || ""}
              onChange={(e) =>
                onFiltersChange({ ...filters, search: e.target.value })
              }
              className="pl-10"
            />
          </div>
        </div>

        <div className="w-full md:w-48">
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            value={filters.status || "all"}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                status: e.target.value as Business["status"],
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="w-full md:w-48">
          <label
            htmlFor="municipality"
            className="block text-sm font-medium mb-2"
          >
            Municipality
          </label>
          <select
            id="municipality"
            value={filters.municipality || ""}
            onChange={(e) =>
              onFiltersChange({ ...filters, municipality: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Municipalities</option>
            {Array.from(new Set(allBusinesses.map((b) => b.municipality))).map(
              (municipality) => (
                <option key={municipality} value={municipality}>
                  {municipality}
                </option>
              )
            )}
          </select>
        </div>

        <div className="w-full md:w-48">
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            value={filters.category || ""}
            onChange={(e) =>
              onFiltersChange({ ...filters, category: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {Array.from(new Set(allBusinesses.map((b) => b.category))).map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Business
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Owner
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Rating
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Registration Date
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayBusinesses.map((business) => (
                <tr key={business.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={business.imageUrl}
                          alt={business.name}
                        />
                        <AvatarFallback>
                          {business.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{business.name}</div>
                        <div className="text-sm text-gray-500">
                          {business.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium">
                        {business.ownerName || "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {business.contactNumber || "N/A"}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {business.municipality}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800 border-gray-200">
                      {business.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(business.status)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{business.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-500">
                      {business.registrationDate
                        ? new Date(
                            business.registrationDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleView(business)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(business)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        {showDocumentActions && onViewDocuments && (
                          <DropdownMenuItem
                            onClick={() => onViewDocuments(business)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            View Documents
                          </DropdownMenuItem>
                        )}
                        {showDocumentActions && onDownloadDocuments && (
                          <DropdownMenuItem
                            onClick={() => onDownloadDocuments(business)}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download Documents
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(business.id, "approved")
                          }
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(business.id, "rejected")
                          }
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(business.id, "under_review")
                          }
                        >
                          <Search className="mr-2 h-4 w-4" />
                          Mark for Review
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDelete(business.id)}
                          className="text-red-600"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Dialog */}
      {isViewDialogOpen && selectedBusiness && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Business Details</h2>
                <button
                  onClick={() => setIsViewDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={selectedBusiness.imageUrl}
                      alt={selectedBusiness.name}
                    />
                    <AvatarFallback>
                      {selectedBusiness.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      {selectedBusiness.name}
                    </h3>
                    <p className="text-gray-600">{selectedBusiness.category}</p>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{selectedBusiness.rating}</span>
                      <span className="mx-2">•</span>
                      <span>{selectedBusiness.priceRange}</span>
                    </div>
                  </div>
                  {getStatusBadge(selectedBusiness.status)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Owner Name</label>
                    <p className="text-sm text-gray-600">
                      {selectedBusiness.ownerName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Contact Number
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectedBusiness.contactNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-gray-600">
                      {selectedBusiness.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Municipality</label>
                    <p className="text-sm text-gray-600">
                      {selectedBusiness.municipality}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium">Address</label>
                    <p className="text-sm text-gray-600">
                      {selectedBusiness.address || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Business License
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectedBusiness.businessLicense || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Registration Date
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectedBusiness.registrationDate
                        ? new Date(
                            selectedBusiness.registrationDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium">Description</label>
                    <p className="text-sm text-gray-600">
                      {selectedBusiness.description || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Operating Hours
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectedBusiness.operatingHours || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Website</label>
                    <p className="text-sm text-gray-600">
                      {selectedBusiness.website || "N/A"}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Payment Methods</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedBusiness.paymentMethods.map((method, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800 border-gray-200"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {isEditDialogOpen && selectedBusiness && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Edit Business</h2>
                <button
                  onClick={() => setIsEditDialogOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Business Name
                    </label>
                    <Input id="name" defaultValue={selectedBusiness.name} />
                  </div>
                  <div>
                    <label
                      htmlFor="owner"
                      className="block text-sm font-medium mb-2"
                    >
                      Owner Name
                    </label>
                    <Input
                      id="owner"
                      defaultValue={selectedBusiness.ownerName || ""}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={selectedBusiness.email || ""}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Contact Number
                    </label>
                    <Input
                      id="phone"
                      defaultValue={selectedBusiness.contactNumber || ""}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="municipality"
                      className="block text-sm font-medium mb-2"
                    >
                      Municipality
                    </label>
                    <Input
                      id="municipality"
                      defaultValue={selectedBusiness.municipality}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium mb-2"
                    >
                      Category
                    </label>
                    <Input
                      id="category"
                      defaultValue={selectedBusiness.category}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium mb-2"
                    >
                      Address
                    </label>
                    <Textarea
                      id="address"
                      defaultValue={selectedBusiness.address || ""}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium mb-2"
                    >
                      Description
                    </label>
                    <Textarea
                      id="description"
                      defaultValue={selectedBusiness.description || ""}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      // Handle save logic here
                      setIsEditDialogOpen(false);
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isLoading}
          isPaginationLoading={isPaginationLoading}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
