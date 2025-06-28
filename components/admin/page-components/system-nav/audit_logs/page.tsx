"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/main/ui/card";
import { Button } from "@/components/main/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  User,
  Activity,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Clock,
  MapPin,
  Database,
  Shield,
  Users,
  Settings,
} from "lucide-react";

interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  severity: "low" | "medium" | "high" | "critical";
  category: "authentication" | "data" | "system" | "user" | "sme";
  status: "success" | "failure" | "warning";
}

const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: new Date("2024-01-15T10:30:00Z"),
    userId: "admin-001",
    userName: "Admin User",
    action: "LOGIN",
    resource: "Authentication",
    details: "Successful login from IP 192.168.1.100",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    severity: "low",
    category: "authentication",
    status: "success",
  },
  {
    id: "2",
    timestamp: new Date("2024-01-15T10:25:00Z"),
    userId: "admin-002",
    userName: "System Admin",
    action: "UPDATE_SME",
    resource: "SME Data",
    resourceId: "sme-123",
    details: "Updated business information for 'Batangas Coffee Shop'",
    ipAddress: "192.168.1.101",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    severity: "medium",
    category: "sme",
    status: "success",
  },
  {
    id: "3",
    timestamp: new Date("2024-01-15T10:20:00Z"),
    userId: "user-001",
    userName: "John Doe",
    action: "FAILED_LOGIN",
    resource: "Authentication",
    details: "Failed login attempt with incorrect password",
    ipAddress: "203.123.45.67",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
    severity: "medium",
    category: "authentication",
    status: "failure",
  },
  {
    id: "4",
    timestamp: new Date("2024-01-15T10:15:00Z"),
    userId: "admin-001",
    userName: "Admin User",
    action: "DELETE_SME",
    resource: "SME Data",
    resourceId: "sme-456",
    details: "Deleted SME record 'Old Restaurant' due to closure",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    severity: "high",
    category: "sme",
    status: "success",
  },
  {
    id: "5",
    timestamp: new Date("2024-01-15T10:10:00Z"),
    userId: "system",
    userName: "System",
    action: "BACKUP_COMPLETED",
    resource: "Database",
    details: "Daily database backup completed successfully",
    ipAddress: "127.0.0.1",
    userAgent: "System/BackupService",
    severity: "low",
    category: "system",
    status: "success",
  },
  {
    id: "6",
    timestamp: new Date("2024-01-15T10:05:00Z"),
    userId: "admin-003",
    userName: "Data Manager",
    action: "BULK_IMPORT",
    resource: "SME Data",
    details: "Imported 150 new SME records from CSV file",
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    severity: "medium",
    category: "data",
    status: "success",
  },
  {
    id: "7",
    timestamp: new Date("2024-01-15T10:00:00Z"),
    userId: "user-002",
    userName: "Jane Smith",
    action: "UNAUTHORIZED_ACCESS",
    resource: "Admin Panel",
    details: "Attempted to access admin panel without proper permissions",
    ipAddress: "203.123.45.68",
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
    severity: "high",
    category: "authentication",
    status: "failure",
  },
  {
    id: "8",
    timestamp: new Date("2024-01-15T09:55:00Z"),
    userId: "admin-001",
    userName: "Admin User",
    action: "UPDATE_SETTINGS",
    resource: "System Settings",
    details: "Updated map API configuration",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    severity: "medium",
    category: "system",
    status: "success",
  },
];

const severityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

const statusColors = {
  success: "bg-green-100 text-green-800",
  failure: "bg-red-100 text-red-800",
  warning: "bg-yellow-100 text-yellow-800",
};

const categoryIcons = {
  authentication: Shield,
  data: Database,
  system: Settings,
  user: Users,
  sme: MapPin,
};

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const logsPerPage = 10;

  const filteredLogs = useMemo(() => {
    return mockAuditLogs.filter((log) => {
      const matchesSearch =
        log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSeverity =
        selectedSeverity === "all" || log.severity === selectedSeverity;
      const matchesCategory =
        selectedCategory === "all" || log.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "all" || log.status === selectedStatus;

      const matchesDateRange =
        selectedDateRange === "all" ||
        (selectedDateRange === "today" && isToday(log.timestamp)) ||
        (selectedDateRange === "week" && isWithinWeek(log.timestamp)) ||
        (selectedDateRange === "month" && isWithinMonth(log.timestamp));

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesCategory &&
        matchesStatus &&
        matchesDateRange
      );
    });
  }, [
    searchTerm,
    selectedSeverity,
    selectedCategory,
    selectedStatus,
    selectedDateRange,
  ]);

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isWithinWeek = (date: Date) => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return date >= weekAgo;
  };

  const isWithinMonth = (date: Date) => {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return date >= monthAgo;
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  const handleExport = () => {
    // Simulate export functionality
    console.log("Exporting audit logs...");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSeverity("all");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSelectedDateRange("all");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600 mt-2">
            Monitor system activities and user actions
          </p>
        </div>
        <Button onClick={handleExport} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Severity Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-between">
                  {selectedSeverity === "all"
                    ? "All Severities"
                    : selectedSeverity}
                  <Filter className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Severity</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedSeverity("all")}>
                  All Severities
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedSeverity("low")}>
                  Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedSeverity("medium")}>
                  Medium
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedSeverity("high")}>
                  High
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedSeverity("critical")}
                >
                  Critical
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Category Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-between">
                  {selectedCategory === "all"
                    ? "All Categories"
                    : selectedCategory}
                  <Filter className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedCategory("all")}>
                  All Categories
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedCategory("authentication")}
                >
                  Authentication
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory("data")}>
                  Data
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory("system")}>
                  System
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory("user")}>
                  User
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedCategory("sme")}>
                  SME
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-between">
                  {selectedStatus === "all" ? "All Status" : selectedStatus}
                  <Filter className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedStatus("all")}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("success")}>
                  Success
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("failure")}>
                  Failure
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedStatus("warning")}>
                  Warning
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Date Range Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-between">
                  {selectedDateRange === "all" ? "All Time" : selectedDateRange}
                  <Calendar className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Date Range</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSelectedDateRange("all")}>
                  All Time
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedDateRange("today")}>
                  Today
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedDateRange("week")}>
                  This Week
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedDateRange("month")}>
                  This Month
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Clear Filters */}
          {(searchTerm ||
            selectedSeverity !== "all" ||
            selectedCategory !== "all" ||
            selectedStatus !== "all" ||
            selectedDateRange !== "all") && (
            <div className="mt-4">
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredLogs.length} of {mockAuditLogs.length} logs
        </p>
        <p className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Audit Logs Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedLogs.map((log) => {
                  const CategoryIcon = categoryIcons[log.category];
                  return (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {formatTimestamp(log.timestamp)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                              <User className="w-4 h-4 text-gray-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {log.userName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {log.userId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {log.action}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.resource}
                        {log.resourceId && (
                          <span className="text-gray-500 ml-1">
                            ({log.resourceId})
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            severityColors[log.severity]
                          }`}
                        >
                          {log.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            statusColors[log.status]
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedLog(log)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Log Details</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedLog(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Log ID
                  </label>
                  <p className="text-sm">{selectedLog.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Timestamp
                  </label>
                  <p className="text-sm">
                    {formatTimestamp(selectedLog.timestamp)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    User
                  </label>
                  <p className="text-sm">
                    {selectedLog.userName} ({selectedLog.userId})
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Action
                  </label>
                  <p className="text-sm">{selectedLog.action}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Resource
                  </label>
                  <p className="text-sm">{selectedLog.resource}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Resource ID
                  </label>
                  <p className="text-sm">{selectedLog.resourceId || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Severity
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      severityColors[selectedLog.severity]
                    }`}
                  >
                    {selectedLog.severity}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      statusColors[selectedLog.status]
                    }`}
                  >
                    {selectedLog.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    IP Address
                  </label>
                  <p className="text-sm">{selectedLog.ipAddress}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Category
                  </label>
                  <p className="text-sm capitalize">{selectedLog.category}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Details
                </label>
                <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md">
                  {selectedLog.details}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  User Agent
                </label>
                <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md text-xs font-mono break-all">
                  {selectedLog.userAgent}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
