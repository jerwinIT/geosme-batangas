"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/common/button";
import {
  Clock,
  SearchCheck,
  CircleX,
  Filter,
  Upload,
  Import,
  Settings,
  Star,
  Flag,
  ThumbsUp,
  AlertTriangle,
} from "lucide-react";
import { DashboardWidget, ReviewTable } from "@/components/admin/ui";
import { Review, ReviewFilter, ReviewStats } from "@/types";
import { mockReviews, mockReviewStats } from "@/data/ReviewDataDummy";
import { toast } from "sonner";

export default function ReviewsManagementPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [reviewStats, setReviewStats] = useState<ReviewStats>(mockReviewStats);
  const [filters, setFilters] = useState<ReviewFilter>({
    status: "all",
    rating: "all",
    business: "",
    reviewer: "",
    search: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const itemsPerPage = 10;

  const handleStatusChange = useCallback(
    (id: string, status: Review["status"]) => {
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === id
            ? { ...review, status, updatedAt: new Date().toISOString() }
            : review
        )
      );
      toast.success(`Review status updated to ${status}`);
    },
    []
  );

  const handleEdit = useCallback((review: Review) => {
    // TODO: Implement edit review modal/form
    toast.info(`Edit review: ${review.title}`);
  }, []);

  const handleView = useCallback((review: Review) => {
    // This is handled by the ReviewTable component
  }, []);

  const handleDelete = useCallback((id: string) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== id)
    );
    toast.success("Review deleted successfully");
  }, []);

  const handleApprove = useCallback((id: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? {
              ...review,
              status: "published",
              publishedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : review
      )
    );
    toast.success("Review approved and published");
  }, []);

  const handleReject = useCallback((id: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? {
              ...review,
              status: "rejected",
              updatedAt: new Date().toISOString(),
            }
          : review
      )
    );
    toast.success("Review rejected");
  }, []);

  const handleFlag = useCallback((id: string, reason: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? {
              ...review,
              status: "flagged",
              flaggedAt: new Date().toISOString(),
              flaggedReason: reason,
              updatedAt: new Date().toISOString(),
            }
          : review
      )
    );
    toast.success("Review flagged for moderation");
  }, []);

  const handleFiltersChange = useCallback((newFilters: ReviewFilter) => {
    setFilters(newFilters);
  }, []);

  const handleExportReviews = useCallback(() => {
    // Handle export logic here
    console.log("Exporting reviews");
    toast.info("Export functionality coming soon");
    // TODO: Implement export functionality
  }, []);

  // Pagination handlers
  const handlePageChange = useCallback((page: number) => {
    setIsPaginationLoading(true);
    setCurrentPage(page);
    // Simulate API call delay
    setTimeout(() => {
      setIsPaginationLoading(false);
    }, 500);
  }, []);

  // Calculate pagination values
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        !filters.search ||
        review.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        review.content.toLowerCase().includes(filters.search.toLowerCase()) ||
        review.businessName
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        review.reviewerName
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesStatus =
        !filters.status ||
        filters.status === "all" ||
        review.status === filters.status;

      const matchesRating =
        !filters.rating ||
        filters.rating === "all" ||
        review.rating.toString() === filters.rating;

      const matchesBusiness =
        !filters.business || review.businessName === filters.business;

      const matchesReviewer =
        !filters.reviewer || review.reviewerName === filters.reviewer;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRating &&
        matchesBusiness &&
        matchesReviewer
      );
    });
  }, [reviews, filters]);

  const totalItems = filteredReviews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

  // Calculate real-time stats from current reviews
  const currentStats: ReviewStats = {
    totalReviews: reviews.length,
    publishedReviews: reviews.filter((r) => r.status === "published").length,
    pendingReviews: reviews.filter((r) => r.status === "pending").length,
    flaggedReviews: reviews.filter((r) => r.status === "flagged").length,
    rejectedReviews: reviews.filter((r) => r.status === "rejected").length,
    averageRating:
      reviews.length > 0
        ? Math.round(
            (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) *
              10
          ) / 10
        : 0,
    totalHelpfulVotes: reviews.reduce((sum, r) => sum + r.helpfulCount, 0),
    totalReports: reviews.reduce((sum, r) => sum + r.reportCount, 0),
  };

  return (
    <div className="py-4 px-4 space-y-6">
      {/* Header section with title, description, and buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-text">
            Reviews Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and verify registered reviews in Batangas
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button icon={Settings}>Moderation Settings</Button>
        </div>
      </div>

      {/* Dashboard widgets */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <DashboardWidget
          title="Total Reviews"
          value={currentStats.totalReviews}
          icon={<Clock className="text-blue-500" />}
        />
        <DashboardWidget
          title="Published"
          value={currentStats.publishedReviews}
          icon={<SearchCheck className="text-green-500" />}
          footer={`${Math.round(
            (currentStats.publishedReviews / currentStats.totalReviews) * 100
          )}% of total`}
        />
        <DashboardWidget
          title="Pending"
          value={currentStats.pendingReviews}
          icon={<Clock className="text-yellow-500" />}
          footer="Awaiting moderation"
        />
        <DashboardWidget
          title="Flagged"
          value={currentStats.flaggedReviews}
          icon={<Flag className="text-orange-500" />}
          footer="Needs attention"
        />
      </div>

      {/* Additional stats row */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <DashboardWidget
          title="Rejected"
          value={currentStats.rejectedReviews}
          icon={<CircleX className="text-red-500" />}
          footer="Not approved"
        />
        <DashboardWidget
          title="Avg Rating"
          value={currentStats.averageRating.toString()}
          icon={<Star className="text-yellow-500" />}
          footer="Overall score"
        />
        <DashboardWidget
          title="Helpful Votes"
          value={currentStats.totalHelpfulVotes}
          icon={<ThumbsUp className="text-green-500" />}
          footer="Community engagement"
        />
      </div>

      {/* Review Table */}
      <div>
        <ReviewTable
          reviews={paginatedReviews}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
          onApprove={handleApprove}
          onReject={handleReject}
          onFlag={handleFlag}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onExport={handleExportReviews}
          // Pagination props
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isLoading}
          isPaginationLoading={isPaginationLoading}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          allReviews={reviews}
        />
      </div>
    </div>
  );
}
