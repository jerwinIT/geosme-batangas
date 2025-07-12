"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/main/ui/card";
import { Button } from "@/components/main/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  AlertTriangle,
  Shield,
  User,
  Database,
  Map,
  Settings,
  Calendar,
  Clock,
  Activity,
  FileText,
  Trash2,
  Edit,
  Plus,
  Lock,
  Unlock,
  LogIn,
  LogOut,
  UserPlus,
  UserMinus,
  Building,
  Star,
  MessageSquare,
  Navigation,
  BarChart3,
  Download as DownloadIcon,
  XCircle,
} from "lucide-react";
import { AuditPageSkeleton } from "@/components/admin/ui/Skeleton";

interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: "admin" | "user" | "system";
  action: string;
  category:
    | "authentication"
    | "data"
    | "system"
    | "security"
    | "user_management"
    | "sme_management"
    | "analytics"
    | "file_operations"
    | string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  ipAddress: string;
  userAgent: string;
  resource: string;
  details: Record<string, any>;
  status: "success" | "failure" | "warning";
  sessionId: string;
}

interface AuditStats {
  totalLogs: number;
  todayLogs: number;
  criticalEvents: number;
  failedActions: number;
  uniqueUsers: number;
  topActions: { action: string; count: number }[];
  topCategories: { category: string; count: number }[];
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [stats, setStats] = useState<AuditStats>({
    totalLogs: 0,
    todayLogs: 0,
    criticalEvents: 0,
    failedActions: 0,
    uniqueUsers: 0,
    topActions: [],
    topCategories: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{
    start: string;
    end: string;
  }>({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(20);

  // Generate mock audit logs
  const generateMockLogs = (): AuditLog[] => {
    const actions = [
      {
        action: "User Login",
        category: "authentication",
        severity: "low" as const,
      },
      {
        action: "User Logout",
        category: "authentication",
        severity: "low" as const,
      },
      {
        action: "Failed Login Attempt",
        category: "security",
        severity: "medium" as const,
      },
      {
        action: "Password Changed",
        category: "security",
        severity: "medium" as const,
      },
      {
        action: "SME Created",
        category: "sme_management",
        severity: "medium" as const,
      },
      {
        action: "SME Updated",
        category: "sme_management",
        severity: "medium" as const,
      },
      {
        action: "SME Deleted",
        category: "sme_management",
        severity: "high" as const,
      },
      {
        action: "User Created",
        category: "user_management",
        severity: "high" as const,
      },
      {
        action: "User Updated",
        category: "user_management",
        severity: "medium" as const,
      },
      {
        action: "User Deleted",
        category: "user_management",
        severity: "critical" as const,
      },
      {
        action: "System Settings Changed",
        category: "system",
        severity: "high" as const,
      },
      {
        action: "Database Backup",
        category: "system",
        severity: "low" as const,
      },
      {
        action: "File Uploaded",
        category: "file_operations",
        severity: "medium" as const,
      },
      {
        action: "File Deleted",
        category: "file_operations",
        severity: "high" as const,
      },
      {
        action: "Analytics Generated",
        category: "analytics",
        severity: "low" as const,
      },
      {
        action: "Map Data Updated",
        category: "data",
        severity: "medium" as const,
      },
      {
        action: "Review Posted",
        category: "sme_management",
        severity: "low" as const,
      },
      {
        action: "Review Moderated",
        category: "sme_management",
        severity: "medium" as const,
      },
    ];

    const users = [
      {
        id: "1",
        name: "Admin User",
        email: "admin@geosme-batangas.com",
        role: "admin" as const,
      },
      {
        id: "2",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "user" as const,
      },
      {
        id: "3",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "user" as const,
      },
      {
        id: "4",
        name: "System",
        email: "system@geosme-batangas.com",
        role: "system" as const,
      },
    ];

    const mockLogs: AuditLog[] = [];
    const now = new Date();

    for (let i = 0; i < 150; i++) {
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const timestamp = new Date(
        now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000
      );
      const status = Math.random() > 0.1 ? "success" : "failure";
      const severity = status === "failure" ? "high" : randomAction.severity;

      mockLogs.push({
        id: `log-${i + 1}`,
        timestamp,
        userId: randomUser.id,
        userName: randomUser.name,
        userEmail: randomUser.email,
        userRole: randomUser.role,
        action: randomAction.action,
        category: randomAction.category,
        severity,
        description: `${randomAction.action} by ${randomUser.name}`,
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        resource: `/api/${randomAction.category}`,
        details: {
          browser: "Chrome",
          os: "Windows 10",
          location: "Batangas City, Philippines",
          sessionDuration: Math.floor(Math.random() * 3600),
        },
        status,
        sessionId: `session-${Math.random().toString(36).substr(2, 9)}`,
      });
    }

    return mockLogs.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  };

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setIsInitialLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockLogs = generateMockLogs();
        setLogs(mockLogs);
        setFilteredLogs(mockLogs);

        // Calculate stats
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayLogs = mockLogs.filter((log) => log.timestamp >= today);
        const criticalEvents = mockLogs.filter(
          (log) => log.severity === "critical"
        ).length;
        const failedActions = mockLogs.filter(
          (log) => log.status === "failure"
        ).length;
        const uniqueUsers = new Set(mockLogs.map((log) => log.userId)).size;

        // Top actions
        const actionCounts = mockLogs.reduce((acc, log) => {
          acc[log.action] = (acc[log.action] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const topActions = Object.entries(actionCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([action, count]) => ({ action, count }));

        // Top categories
        const categoryCounts = mockLogs.reduce((acc, log) => {
          acc[log.category] = (acc[log.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const topCategories = Object.entries(categoryCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([category, count]) => ({ category, count }));

        setStats({
          totalLogs: mockLogs.length,
          todayLogs: todayLogs.length,
          criticalEvents,
          failedActions,
          uniqueUsers,
          topActions,
          topCategories,
        });
      } catch (error) {
        console.error("Failed to load audit logs:", error);
      } finally {
        setIsLoading(false);
        setIsInitialLoading(false);
      }
    };

    loadData();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = logs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.ipAddress.includes(searchTerm)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((log) => log.category === selectedCategory);
    }

    // Severity filter
    if (selectedSeverity !== "all") {
      filtered = filtered.filter((log) => log.severity === selectedSeverity);
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((log) => log.status === selectedStatus);
    }

    // User filter
    if (selectedUser !== "all") {
      filtered = filtered.filter((log) => log.userId === selectedUser);
    }

    // Date range filter
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999);

      filtered = filtered.filter(
        (log) => log.timestamp >= startDate && log.timestamp <= endDate
      );
    }

    setFilteredLogs(filtered);
    setCurrentPage(1);
  }, [
    logs,
    searchTerm,
    selectedCategory,
    selectedSeverity,
    selectedStatus,
    selectedUser,
    dateRange,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const endIndex = startIndex + logsPerPage;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "authentication":
        return <LogIn className="w-4 h-4" />;
      case "security":
        return <Shield className="w-4 h-4" />;
      case "user_management":
        return <User className="w-4 h-4" />;
      case "sme_management":
        return <Building className="w-4 h-4" />;
      case "system":
        return <Settings className="w-4 h-4" />;
      case "data":
        return <Database className="w-4 h-4" />;
      case "analytics":
        return <BarChart3 className="w-4 h-4" />;
      case "file_operations":
        return <FileText className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "failure":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(timestamp);
  };

  const handleExport = () => {
    const csvContent = [
      [
        "ID",
        "Timestamp",
        "User",
        "Action",
        "Category",
        "Severity",
        "Status",
        "IP Address",
        "Description",
      ],
      ...filteredLogs.map((log) => [
        log.id,
        formatTimestamp(log.timestamp),
        log.userName,
        log.action,
        log.category,
        log.severity,
        log.status,
        log.ipAddress,
        log.description,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  // Show skeleton loading during initial load
  if (isInitialLoading) {
    return <AuditPageSkeleton />;
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            Audit Logs
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm">
            System activity and security monitoring
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleExport} className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalLogs.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.todayLogs} today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Events
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.criticalEvents}
            </div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Failed Actions
            </CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.failedActions}
            </div>
            <p className="text-xs text-muted-foreground">
              {((stats.failedActions / stats.totalLogs) * 100).toFixed(1)}%
              failure rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.uniqueUsers}</div>
            <p className="text-xs text-muted-foreground">
              Unique users in period
            </p>
          </CardContent>
        </Card>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="authentication">Authentication</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="user_management">
                    User Management
                  </SelectItem>
                  <SelectItem value="sme_management">SME Management</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="data">Data</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="file_operations">
                    File Operations
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Severity</Label>
              <Select
                value={selectedSeverity}
                onValueChange={setSelectedSeverity}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failure">Failure</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, start: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, end: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>User</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="1">Admin User</SelectItem>
                  <SelectItem value="2">John Doe</SelectItem>
                  <SelectItem value="3">Jane Smith</SelectItem>
                  <SelectItem value="4">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
          <CardDescription>
            Showing {currentLogs.length} of {filteredLogs.length} logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">
                    {formatTimestamp(log.timestamp)}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{log.userName}</div>
                      <div className="text-sm text-gray-500">
                        {log.userEmail}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {log.userRole}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{log.action}</div>
                    <div className="text-sm text-gray-500">
                      {log.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(log.category)}
                      <span className="capitalize">
                        {log.category.replace("_", " ")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(log.severity)}>
                      {log.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(log.status)}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {log.ipAddress}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedLog(log)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Log Details</DialogTitle>
                          <DialogDescription>
                            Detailed information about this audit log entry
                          </DialogDescription>
                        </DialogHeader>
                        {selectedLog && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">
                                  Log ID
                                </Label>
                                <p className="text-sm">{selectedLog.id}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Timestamp
                                </Label>
                                <p className="text-sm">
                                  {formatTimestamp(selectedLog.timestamp)}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  User
                                </Label>
                                <p className="text-sm">
                                  {selectedLog.userName} (
                                  {selectedLog.userEmail})
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Role
                                </Label>
                                <p className="text-sm capitalize">
                                  {selectedLog.userRole}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Action
                                </Label>
                                <p className="text-sm">{selectedLog.action}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Category
                                </Label>
                                <p className="text-sm capitalize">
                                  {selectedLog.category.replace("_", " ")}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Severity
                                </Label>
                                <Badge
                                  className={getSeverityColor(
                                    selectedLog.severity
                                  )}
                                >
                                  {selectedLog.severity}
                                </Badge>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Status
                                </Label>
                                <Badge
                                  className={getStatusColor(selectedLog.status)}
                                >
                                  {selectedLog.status}
                                </Badge>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  IP Address
                                </Label>
                                <p className="text-sm font-mono">
                                  {selectedLog.ipAddress}
                                </p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">
                                  Session ID
                                </Label>
                                <p className="text-sm font-mono">
                                  {selectedLog.sessionId}
                                </p>
                              </div>
                            </div>

                            <div>
                              <Label className="text-sm font-medium">
                                Description
                              </Label>
                              <p className="text-sm">
                                {selectedLog.description}
                              </p>
                            </div>

                            <div>
                              <Label className="text-sm font-medium">
                                Resource
                              </Label>
                              <p className="text-sm font-mono">
                                {selectedLog.resource}
                              </p>
                            </div>

                            <div>
                              <Label className="text-sm font-medium">
                                User Agent
                              </Label>
                              <p className="text-sm font-mono text-xs">
                                {selectedLog.userAgent}
                              </p>
                            </div>

                            <div>
                              <Label className="text-sm font-medium">
                                Additional Details
                              </Label>
                              <pre className="text-sm bg-gray-50 p-3 rounded-md overflow-auto">
                                {JSON.stringify(selectedLog.details, null, 2)}
                              </pre>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, filteredLogs.length)} of{" "}
                {filteredLogs.length} logs
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="flex items-center px-3 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
