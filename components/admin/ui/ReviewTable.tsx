"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/common/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Star,
  Flag,
  ThumbsUp,
  AlertTriangle,
  Building,
  User,
  Calendar,
  MessageSquare,
  Upload,
} from "lucide-react";
import { Review, ReviewFilter } from "@/types";
import { cn } from "@/lib/utils";
import Pagination from "@/components/common/Pagination";

interface ReviewTableProps {
  reviews: Review[];
  onStatusChange: (id: string, status: Review["status"]) => void;
  onEdit: (review: Review) => void;
  onView: (review: Review) => void;
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onFlag: (id: string, reason: string) => void;
  filters: ReviewFilter;
  onFiltersChange: (filters: ReviewFilter) => void;
  onExport: () => void;
  // Pagination props
  currentPage?: number;
  totalPages?: number;
  isLoading?: boolean;
  isPaginationLoading?: boolean;
  startIndex?: number;
  endIndex?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  // Original reviews for filter options
  allReviews?: Review[];
}

export function ReviewTable({
  reviews,
  onStatusChange,
  onEdit,
  onView,
  onDelete,
  onApprove,
  onReject,
  onFlag,
  filters,
  onFiltersChange,
  onExport,
  // Pagination props
  currentPage = 1,
  totalPages = 1,
  isLoading = false,
  isPaginationLoading = false,
  startIndex = 0,
  endIndex = 0,
  totalItems = 0,
  onPageChange,
  // Original reviews for filter options
  allReviews = reviews,
}: ReviewTableProps) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const getStatusBadge = (status: Review["status"]) => {
    const baseClasses =
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold";

    switch (status) {
      case "published":
        return (
          <span
            className={cn(
              baseClasses,
              "bg-green-100 text-green-800 border-green-200"
            )}
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Published
          </span>
        );
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
      case "flagged":
        return (
          <span
            className={cn(
              baseClasses,
              "bg-orange-100 text-orange-800 border-orange-200"
            )}
          >
            <Flag className="w-3 h-3 mr-1" />
            Flagged
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-4 h-4",
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            )}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  const handleView = (review: Review) => {
    setSelectedReview(review);
    setIsViewDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
              placeholder="Search by title, content, business, or reviewer..."
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
              onFiltersChange({ ...filters, status: e.target.value as any })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="flagged">Flagged</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="w-full md:w-48">
          <label htmlFor="rating" className="block text-sm font-medium mb-2">
            Rating
          </label>
          <select
            id="rating"
            value={filters.rating || "all"}
            onChange={(e) =>
              onFiltersChange({ ...filters, rating: e.target.value as any })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="w-full md:w-48">
          <label htmlFor="business" className="block text-sm font-medium mb-2">
            Business
          </label>
          <select
            id="business"
            value={filters.business || ""}
            onChange={(e) =>
              onFiltersChange({ ...filters, business: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Businesses</option>
            {Array.from(
              new Set(allReviews.map((r) => r.businessName).filter(Boolean))
            ).map((businessName) => (
              <option key={businessName} value={businessName}>
                {businessName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            icon={Upload}
            onClick={onExport}
            className="h-10"
          >
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Review</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="font-medium text-sm">{review.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {review.content}
                      </div>
                      {review.tags && review.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {review.tags.slice(0, 3).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {review.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{review.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Building className="w-4 h-4 mr-1 text-gray-500" />
                      {review.businessName}
                    </div>
                  </TableCell>
                  <TableCell>{renderStars(review.rating)}</TableCell>
                  <TableCell>{getStatusBadge(review.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {review.reviewerName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">
                          {review.reviewerName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {review.reviewerEmail}
                        </div>
                        {review.isVerified && (
                          <div className="flex items-center text-xs text-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center text-green-600">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {review.helpfulCount}
                      </div>
                      {review.reportCount > 0 && (
                        <div className="flex items-center text-red-600">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {review.reportCount}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-500">
                      {formatDate(review.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleView(review)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(review)}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Edit Review
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Moderation</DropdownMenuLabel>
                        {review.status === "pending" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => onApprove(review.id)}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onReject(review.id)}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        {review.status === "published" && (
                          <DropdownMenuItem
                            onClick={() => onFlag(review.id, "Manual flag")}
                          >
                            <Flag className="mr-2 h-4 w-4" />
                            Flag Review
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDelete(review.id)}
                          className="text-red-600"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Delete Review
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* View Dialog */}
      {isViewDialogOpen && selectedReview && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Review Details</DialogTitle>
              <DialogDescription>
                Detailed information about the review
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback>
                    {selectedReview.reviewerName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {selectedReview.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    {renderStars(selectedReview.rating)}
                    {getStatusBadge(selectedReview.status)}
                  </div>
                  {selectedReview.isVerified && (
                    <div className="flex items-center mt-2 text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">Verified Reviewer</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Review Content</label>
                <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                  {selectedReview.content}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Business</label>
                  <p className="text-sm text-gray-600">
                    {selectedReview.businessName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Reviewer</label>
                  <p className="text-sm text-gray-600">
                    {selectedReview.reviewerName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-gray-600">
                    {selectedReview.reviewerEmail}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Rating</label>
                  <div className="mt-1">
                    {renderStars(selectedReview.rating)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Helpful Votes</label>
                  <p className="text-sm text-gray-600">
                    {selectedReview.helpfulCount}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Reports</label>
                  <p className="text-sm text-gray-600">
                    {selectedReview.reportCount}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Created</label>
                  <p className="text-sm text-gray-600">
                    {formatDateTime(selectedReview.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Last Updated</label>
                  <p className="text-sm text-gray-600">
                    {formatDateTime(selectedReview.updatedAt)}
                  </p>
                </div>
              </div>

              {selectedReview.publishedAt && (
                <div>
                  <label className="text-sm font-medium">Published</label>
                  <p className="text-sm text-gray-600">
                    {formatDateTime(selectedReview.publishedAt)}
                  </p>
                </div>
              )}

              {selectedReview.flaggedAt && (
                <div>
                  <label className="text-sm font-medium">Flagged</label>
                  <p className="text-sm text-gray-600">
                    {formatDateTime(selectedReview.flaggedAt)}
                  </p>
                  {selectedReview.flaggedReason && (
                    <div className="mt-1">
                      <label className="text-sm font-medium">Reason</label>
                      <p className="text-sm text-gray-600">
                        {selectedReview.flaggedReason}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {selectedReview.moderatorNotes && (
                <div>
                  <label className="text-sm font-medium">Moderator Notes</label>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedReview.moderatorNotes}
                  </p>
                </div>
              )}

              {selectedReview.tags && selectedReview.tags.length > 0 && (
                <div>
                  <label className="text-sm font-medium">Tags</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedReview.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
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
          itemType="reviews"
        />
      )}
    </div>
  );
}
