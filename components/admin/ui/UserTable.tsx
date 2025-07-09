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
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Shield,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertTriangle,
  UserCheck,
  UserX,
  Lock,
  Unlock,
  Upload,
} from "lucide-react";
import { User as UserType, UserFilter } from "@/types";
import { cn } from "@/lib/utils";
import Pagination from "@/components/common/Pagination";

interface UserTableProps {
  users: UserType[];
  onStatusChange: (id: string, status: UserType["status"]) => void;
  onRoleChange: (id: string, role: UserType["role"]) => void;
  onEdit: (user: UserType) => void;
  onView: (user: UserType) => void;
  onDelete: (id: string) => void;
  onSuspend: (id: string) => void;
  onActivate: (id: string) => void;
  filters: UserFilter;
  onFiltersChange: (filters: UserFilter) => void;
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
  // Original users for filter options
  allUsers?: UserType[];
}

export function UserTable({
  users,
  onStatusChange,
  onRoleChange,
  onEdit,
  onView,
  onDelete,
  onSuspend,
  onActivate,
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
  // Original users for filter options
  allUsers = users,
}: UserTableProps) {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

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

  const getRoleBadge = (role: UserType["role"]) => {
    const baseClasses =
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold";

    switch (role) {
      case "admin":
        return (
          <span
            className={cn(
              baseClasses,
              "bg-red-100 text-red-800 border-red-200"
            )}
          >
            <Shield className="w-3 h-3 mr-1" />
            Admin
          </span>
        );
      case "sme_owner":
        return (
          <span
            className={cn(
              baseClasses,
              "bg-blue-100 text-blue-800 border-blue-200"
            )}
          >
            <Building className="w-3 h-3 mr-1" />
            SME Owner
          </span>
        );
      case "regular_user":
        return (
          <span
            className={cn(
              baseClasses,
              "bg-gray-100 text-gray-800 border-gray-200"
            )}
          >
            <User className="w-3 h-3 mr-1" />
            User
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

  const getStatusBadge = (status: UserType["status"]) => {
    const baseClasses =
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold";

    switch (status) {
      case "active":
        return (
          <span
            className={cn(
              baseClasses,
              "bg-green-100 text-green-800 border-green-200"
            )}
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </span>
        );
      case "inactive":
        return (
          <span
            className={cn(
              baseClasses,
              "bg-gray-100 text-gray-800 border-gray-200"
            )}
          >
            <Clock className="w-3 h-3 mr-1" />
            Inactive
          </span>
        );
      case "suspended":
        return (
          <span
            className={cn(
              baseClasses,
              "bg-red-100 text-red-800 border-red-200"
            )}
          >
            <XCircle className="w-3 h-3 mr-1" />
            Suspended
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

  const handleView = (user: UserType) => {
    setSelectedUser(user);
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
              placeholder="Search by name, email, or business..."
              value={filters.search || ""}
              onChange={(e) =>
                onFiltersChange({ ...filters, search: e.target.value })
              }
              className="pl-10"
            />
          </div>
        </div>

        <div className="w-full md:w-48">
          <label htmlFor="role" className="block text-sm font-medium mb-2">
            Role
          </label>
          <select
            id="role"
            value={filters.role || "all"}
            onChange={(e) =>
              onFiltersChange({ ...filters, role: e.target.value as any })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="sme_owner">SME Owner</option>
            <option value="regular_user">Regular User</option>
          </select>
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
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
            {Array.from(
              new Set(allUsers.map((u) => u.municipality).filter(Boolean))
            ).map((municipality) => (
              <option key={municipality} value={municipality}>
                {municipality}
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
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    {user.municipality ? (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {user.municipality}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.businessName ? (
                      <div className="text-sm font-medium">
                        {user.businessName}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.lastLogin ? (
                      <div className="text-sm text-gray-500">
                        {formatDateTime(user.lastLogin)}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Never</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-500">
                      {formatDate(user.createdAt)}
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
                        <DropdownMenuItem onClick={() => handleView(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Status Actions</DropdownMenuLabel>
                        {user.status === "suspended" ? (
                          <DropdownMenuItem onClick={() => onActivate(user.id)}>
                            <Unlock className="mr-2 h-4 w-4" />
                            Activate User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => onSuspend(user.id)}>
                            <Lock className="mr-2 h-4 w-4" />
                            Suspend User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Role Management</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => onRoleChange(user.id, "admin")}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Make Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onRoleChange(user.id, "sme_owner")}
                        >
                          <Building className="mr-2 h-4 w-4" />
                          Make SME Owner
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onRoleChange(user.id, "regular_user")}
                        >
                          <User className="mr-2 h-4 w-4" />
                          Make Regular User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDelete(user.id)}
                          className="text-red-600"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Delete User
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
      {isViewDialogOpen && selectedUser && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedUser.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback>
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    {getRoleBadge(selectedUser.role)}
                    {getStatusBadge(selectedUser.status)}
                  </div>
                  {selectedUser.isVerified && (
                    <div className="flex items-center mt-2 text-green-600">
                      <UserCheck className="w-4 h-4 mr-1" />
                      <span className="text-sm">Verified User</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-sm text-gray-600">
                    {selectedUser.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Municipality</label>
                  <p className="text-sm text-gray-600">
                    {selectedUser.municipality || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Business</label>
                  <p className="text-sm text-gray-600">
                    {selectedUser.businessName || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Last Login</label>
                  <p className="text-sm text-gray-600">
                    {selectedUser.lastLogin
                      ? formatDateTime(selectedUser.lastLogin)
                      : "Never"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Joined</label>
                  <p className="text-sm text-gray-600">
                    {formatDate(selectedUser.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Last Updated</label>
                  <p className="text-sm text-gray-600">
                    {formatDateTime(selectedUser.updatedAt)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">User ID</label>
                  <p className="text-sm text-gray-600 font-mono">
                    {selectedUser.id}
                  </p>
                </div>
              </div>

              {selectedUser.permissions &&
                selectedUser.permissions.length > 0 && (
                  <div>
                    <label className="text-sm font-medium">Permissions</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedUser.permissions.map((permission, index) => (
                        <Badge key={index} variant="secondary">
                          {permission}
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
          itemType="users"
        />
      )}
    </div>
  );
}
