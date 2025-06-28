"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/common/button";
import {
  Users,
  CheckCircle,
  Briefcase,
  Clock,
  ShieldCheck,
  Filter,
  Import,
  Upload,
  Plus,
  UserPlus,
  Download,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { DashboardWidget, UserTable } from "@/components/admin/ui";
import { SearchBar } from "@/components/common";
import { User, UserFilter, UserStats } from "@/types";
import { mockUsers, mockUserStats } from "@/data/UserDataDummy";
import { toast } from "sonner";

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [userStats, setUserStats] = useState<UserStats>(mockUserStats);
  const [filters, setFilters] = useState<UserFilter>({
    role: "all",
    status: "all",
    municipality: "",
    search: "",
  });

  const handleStatusChange = useCallback(
    (id: string, status: User["status"]) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id
            ? { ...user, status, updatedAt: new Date().toISOString() }
            : user
        )
      );
      toast.success(`User status updated to ${status}`);
    },
    []
  );

  const handleRoleChange = useCallback((id: string, role: User["role"]) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, role, updatedAt: new Date().toISOString() }
          : user
      )
    );
    toast.success(`User role updated to ${role}`);
  }, []);

  const handleEdit = useCallback((user: User) => {
    // TODO: Implement edit user modal/form
    toast.info(`Edit user: ${user.name}`);
  }, []);

  const handleView = useCallback((user: User) => {
    // This is handled by the UserTable component
  }, []);

  const handleDelete = useCallback((id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    toast.success("User deleted successfully");
  }, []);

  const handleSuspend = useCallback((id: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status: "suspended",
              updatedAt: new Date().toISOString(),
            }
          : user
      )
    );
    toast.success("User suspended successfully");
  }, []);

  const handleActivate = useCallback((id: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, status: "active", updatedAt: new Date().toISOString() }
          : user
      )
    );
    toast.success("User activated successfully");
  }, []);

  const handleFiltersChange = useCallback((newFilters: UserFilter) => {
    setFilters(newFilters);
  }, []);

  const handleAddUser = useCallback(() => {
    // TODO: Implement add user modal/form
    toast.info("Add user functionality coming soon");
  }, []);

  const handleImportUsers = useCallback(() => {
    // TODO: Implement import users functionality
    toast.info("Import users functionality coming soon");
  }, []);

  const handleExportUsers = useCallback(() => {
    // TODO: Implement export users functionality
    toast.info("Export users functionality coming soon");
  }, []);

  // Calculate real-time stats from current users
  const currentStats: UserStats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "active").length,
    smeOwners: users.filter((u) => u.role === "sme_owner").length,
    admins: users.filter((u) => u.role === "admin").length,
    regularUsers: users.filter((u) => u.role === "regular_user").length,
    suspendedUsers: users.filter((u) => u.status === "suspended").length,
    newUsersThisMonth: users.filter((u) => {
      const createdAt = new Date(u.createdAt);
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      return createdAt >= oneMonthAgo;
    }).length,
  };

  return (
    <div className="py-4 px-4 space-y-6">
      {/* Header section with title, description, and buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            User Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage platform users, their roles, and permissions
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleAddUser} icon={UserPlus}>
            Add User
          </Button>
          <Button variant="secondary" onClick={handleImportUsers} icon={Import}>
            Import
          </Button>
          <Button
            variant="secondary"
            onClick={handleExportUsers}
            icon={Download}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Dashboard widgets */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <DashboardWidget
          title="Total Users"
          value={currentStats.totalUsers}
          icon={<Users className="text-blue-500" />}
          footer={`${currentStats.newUsersThisMonth} new this month`}
        />
        <DashboardWidget
          title="Active Users"
          value={currentStats.activeUsers}
          icon={<CheckCircle className="text-green-500" />}
          footer={`${Math.round(
            (currentStats.activeUsers / currentStats.totalUsers) * 100
          )}% of total`}
        />
        <DashboardWidget
          title="SME Owners"
          value={currentStats.smeOwners}
          icon={<Briefcase className="text-purple-500" />}
          footer="Business owners"
        />
        <DashboardWidget
          title="Admins"
          value={currentStats.admins}
          icon={<ShieldCheck className="text-red-500" />}
          footer="System administrators"
        />
      </div>

      {/* Additional stats row */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <DashboardWidget
          title="Regular Users"
          value={currentStats.regularUsers}
          icon={<Users className="text-gray-500" />}
          footer="Platform users"
        />
        <DashboardWidget
          title="Suspended Users"
          value={currentStats.suspendedUsers}
          icon={<AlertTriangle className="text-orange-500" />}
          footer="Temporarily disabled"
        />
        <DashboardWidget
          title="New Users (30 days)"
          value={currentStats.newUsersThisMonth}
          icon={<TrendingUp className="text-green-500" />}
          footer="Recent registrations"
        />
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg border">
        <UserTable
          users={users}
          onStatusChange={handleStatusChange}
          onRoleChange={handleRoleChange}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
          onSuspend={handleSuspend}
          onActivate={handleActivate}
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
      </div>
    </div>
  );
}
