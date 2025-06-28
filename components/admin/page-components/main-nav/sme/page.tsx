"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/common/button";
import {
  Clock,
  Plus,
  SearchCheck,
  CheckCircle2,
  CircleX,
  Filter,
  Upload,
  Import,
} from "lucide-react";
import DashboardWidget from "@/components/admin/ui/DashboardWidget";
import { SMETable } from "@/components/admin/ui/SMETable";
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
  };

  const handleAddSME = () => {
    // Handle add SME logic here
    console.log("Add new SME");
  };

  const handleImport = () => {
    // Handle import logic here
    console.log("Import SMEs");
  };

  const handleExport = () => {
    // Handle export logic here
    console.log("Export SMEs");
  };

  return (
    <div className="py-4 px-4">
      {/* Header section with title, description, and buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
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

      {/* Import/Export section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4 mb-4">
        <Button variant="outline" icon={Import} onClick={handleImport}>
          Import
        </Button>
        <Button variant="outline" icon={Upload} onClick={handleExport}>
          Export
        </Button>
      </div>

      {/* SME Table */}
      <SMETable
        businesses={businesses}
        onStatusChange={handleStatusChange}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
    </div>
  );
}
