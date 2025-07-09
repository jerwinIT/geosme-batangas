import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/common";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  isPaginationLoading: boolean;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  itemType?: string; // Optional prop to customize the item type text
}

function Pagination({
  currentPage,
  totalPages,
  isLoading,
  isPaginationLoading,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
  itemType = "items",
}: PaginationProps) {
  if (isLoading || totalItems === 0 || totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-6 py-8 border-t border-gray-200">
      {/* Page Info */}
      <div className="text-sm text-text-secondary" aria-live="polite">
        {isPaginationLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            Loading...
          </div>
        ) : (
          `Showing ${startIndex + 1}-${Math.min(
            endIndex,
            totalItems
          )} of ${totalItems} ${itemType}`
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isPaginationLoading}
          className="flex items-center gap-2 h-10 px-4"
          aria-label="Previous page"
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
                onClick={() => onPageChange(1)}
                disabled={isPaginationLoading}
                className="h-10 w-10"
                aria-label="Page 1"
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
              (currentPage >= totalPages - 1 && pageNumber >= totalPages - 2);

            if (!isVisible) return null;

            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "ghost"}
                size="sm"
                onClick={() => onPageChange(pageNumber)}
                disabled={isPaginationLoading}
                className={`h-10 w-10 ${
                  currentPage === pageNumber
                    ? "bg-primary-500 text-white hover:bg-primary-600"
                    : "hover:bg-primary-500/10"
                }`}
                aria-label={`Page ${pageNumber}`}
                aria-current={currentPage === pageNumber ? "page" : undefined}
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
                onClick={() => onPageChange(totalPages)}
                disabled={isPaginationLoading}
                className="h-10 w-10"
                aria-label={`Page ${totalPages}`}
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
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isPaginationLoading}
          className="flex items-center gap-2 h-10 px-4"
          aria-label="Next page"
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
            onChange={(e) => onPageChange(Number(e.target.value))}
            disabled={isPaginationLoading}
            className="px-3 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Jump to page"
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
  );
}

export default Pagination;
