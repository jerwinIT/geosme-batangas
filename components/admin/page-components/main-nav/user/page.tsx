"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/common/button";
import {
  Users,
  CheckCircle,
  Briefcase,
  ShieldCheck,
  UserPlus,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { DashboardWidget, UserTable, AddUserForm } from "@/components/admin/ui";
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

  // Add User form state
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const itemsPerPage = 10;

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
    setIsAddUserFormOpen(true);
  }, []);

  const handleAddUserSubmit = useCallback((userData: any) => {
    // Handle adding single user
    const newUser: User = {
      id: `user-${Date.now()}`, // Generate temporary ID
      ...userData,
      avatar: "",
      lastLogin: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      permissions: userData.permissions || [],
    };
    setUsers((prev) => [...prev, newUser]);
    toast.success("User added successfully");
    console.log("Added new user:", newUser);
  }, []);

  const handleImportCSV = useCallback((file: File) => {
    // Handle CSV import logic here
    console.log("Importing CSV file:", file.name);
    toast.info("CSV import functionality coming soon");
    // TODO: Implement CSV parsing and import logic
  }, []);

  const handleExportUsers = useCallback(() => {
    // Handle export logic here
    console.log("Exporting users");
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
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        !filters.search ||
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.businessName?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesRole =
        !filters.role || filters.role === "all" || user.role === filters.role;

      const matchesStatus =
        !filters.status ||
        filters.status === "all" ||
        user.status === filters.status;

      const matchesMunicipality =
        !filters.municipality || user.municipality === filters.municipality;

      return (
        matchesSearch && matchesRole && matchesStatus && matchesMunicipality
      );
    });
  }, [users, filters]);

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-text">
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
      <div>
        <UserTable
          users={paginatedUsers}
          onStatusChange={handleStatusChange}
          onRoleChange={handleRoleChange}
          onEdit={handleEdit}
          onView={handleView}
          onExport={handleExportUsers}
          onDelete={handleDelete}
          onSuspend={handleSuspend}
          onActivate={handleActivate}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          // Pagination props
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isLoading}
          isPaginationLoading={isPaginationLoading}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          allUsers={users}
        />
      </div>

      {/* Add User Form */}
      <AddUserForm
        isOpen={isAddUserFormOpen}
        onClose={() => setIsAddUserFormOpen(false)}
        onAddUser={handleAddUserSubmit}
        onImportCSV={handleImportCSV}
      />
    </div>
  );
}
