"use client";

import { useState } from "react";
import { Button } from "@/components/common/button";
import { Search } from "lucide-react";
import DashboardWidget from "@/components/admin/ui/DashboardWidget";
import { NotificationSettings } from "./notification-settings";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  Trash2,
  Eye,
  EyeOff,
  Send,
  Settings,
  Users,
  Building,
  MapPin,
  Star,
  MessageSquare,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "system" | "user" | "sme" | "review" | "alert";
  priority: "low" | "medium" | "high" | "critical";
  status: "unread" | "read" | "archived";
  recipient: string;
  createdAt: string;
  readAt?: string;
  metadata?: {
    userId?: string;
    smeId?: string;
    reviewId?: string;
    location?: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New SME Registration",
    message: "Batangas Coffee Shop has submitted their registration for review",
    type: "sme",
    priority: "medium",
    status: "unread",
    recipient: "admin",
    createdAt: "2024-01-15T10:30:00Z",
    metadata: {
      smeId: "sme_001",
      location: "Batangas City",
    },
  },
  {
    id: "2",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM",
    type: "system",
    priority: "high",
    status: "read",
    recipient: "all",
    createdAt: "2024-01-15T09:00:00Z",
    readAt: "2024-01-15T09:15:00Z",
  },
  {
    id: "3",
    title: "New User Review",
    message: "User John Doe left a 5-star review for Batangas Bakery",
    type: "review",
    priority: "low",
    status: "unread",
    recipient: "admin",
    createdAt: "2024-01-15T08:45:00Z",
    metadata: {
      userId: "user_123",
      smeId: "sme_002",
      reviewId: "review_456",
    },
  },
  {
    id: "4",
    title: "Database Backup Failed",
    message: "Automatic database backup failed. Manual intervention required.",
    type: "alert",
    priority: "critical",
    status: "unread",
    recipient: "admin",
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "5",
    title: "User Account Verification",
    message: "New user account requires verification: maria.santos@email.com",
    type: "user",
    priority: "medium",
    status: "read",
    recipient: "admin",
    createdAt: "2024-01-15T07:30:00Z",
    readAt: "2024-01-15T08:00:00Z",
    metadata: {
      userId: "user_789",
    },
  },
];

const notificationTypeIcons = {
  system: Settings,
  user: Users,
  sme: Building,
  review: Star,
  alert: AlertTriangle,
};

const priorityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

const typeColors = {
  system: "bg-blue-100 text-blue-800",
  user: "bg-purple-100 text-purple-800",
  sme: "bg-green-100 text-green-800",
  review: "bg-yellow-100 text-yellow-800",
  alert: "bg-red-100 text-red-800",
};

export default function NotificationPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      selectedFilter === "all" || notification.status === selectedFilter;
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: notifications.length,
    unread: notifications.filter((n) => n.status === "unread").length,
    read: notifications.filter((n) => n.status === "read").length,
    archived: notifications.filter((n) => n.status === "archived").length,
  };

  const handleStatusChange = (
    notificationId: string,
    newStatus: Notification["status"]
  ) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              status: newStatus,
              readAt:
                newStatus === "read"
                  ? new Date().toISOString()
                  : notification.readAt,
            }
          : notification
      )
    );
  };

  const handleBulkAction = (action: "read" | "archived" | "delete") => {
    if (selectedNotifications.length === 0) return;

    setNotifications((prev) => {
      if (action === "delete") {
        return prev.filter(
          (notification) => !selectedNotifications.includes(notification.id)
        );
      }

      return prev.map((notification) =>
        selectedNotifications.includes(notification.id)
          ? {
              ...notification,
              status: action,
              readAt:
                action === "read"
                  ? new Date().toISOString()
                  : notification.readAt,
            }
          : notification
      );
    });

    setSelectedNotifications([]);
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="py-4 px-4">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Notification Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage system notifications, user alerts, and communication
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button icon={Send}>Send Notification</Button>
          <Button
            variant="secondary"
            icon={Settings}
            onClick={() => setIsSettingsOpen(true)}
          >
            Settings
          </Button>
        </div>
      </div>

      {/* Dashboard widgets */}
      <div className="w-full mb-8">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <DashboardWidget
            title="Total Notifications"
            value={stats.total}
            icon={<Bell />}
          />
          <DashboardWidget
            title="Unread"
            value={stats.unread}
            icon={<Clock />}
          />
          <DashboardWidget title="Read" value={stats.read} icon={<Eye />} />
          <DashboardWidget
            title="Archived"
            value={stats.archived}
            icon={<EyeOff />}
          />
        </div>
      </div>

      {/* Search, Filter, and Actions section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="w-full md:flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-2 md:justify-end">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="archived">Archived</option>
          </select>

          {selectedNotifications.length > 0 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("read")}
              >
                Mark Read
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("archived")}
              >
                Archive
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("delete")}
                className="text-red-600 hover:text-red-700"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={
                selectedNotifications.length === filteredNotifications.length &&
                filteredNotifications.length > 0
              }
              onChange={handleSelectAll}
              className="rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">
              {selectedNotifications.length > 0
                ? `${selectedNotifications.length} selected`
                : `${filteredNotifications.length} notifications`}
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p>No notifications found</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const TypeIcon = notificationTypeIcons[notification.type];
              const isSelected = selectedNotifications.includes(
                notification.id
              );

              return (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    notification.status === "unread" ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedNotifications((prev) => [
                            ...prev,
                            notification.id,
                          ]);
                        } else {
                          setSelectedNotifications((prev) =>
                            prev.filter((id) => id !== notification.id)
                          );
                        }
                      }}
                      className="mt-1 rounded border-gray-300"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <TypeIcon className="h-5 w-5 text-gray-500" />
                          <h3 className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              priorityColors[notification.priority]
                            }`}
                          >
                            {notification.priority}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              typeColors[notification.type]
                            }`}
                          >
                            {notification.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {formatDate(notification.createdAt)}
                          </span>
                          <div className="flex gap-1">
                            {notification.status === "unread" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleStatusChange(notification.id, "read")
                                }
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            )}
                            {notification.status !== "archived" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleStatusChange(
                                    notification.id,
                                    "archived"
                                  )
                                }
                                className="h-8 w-8 p-0"
                              >
                                <EyeOff className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleStatusChange(notification.id, "archived")
                              }
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <p className="mt-2 text-sm text-gray-600">
                        {notification.message}
                      </p>

                      {notification.metadata && (
                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                          {notification.metadata.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {notification.metadata.location}
                            </div>
                          )}
                          {notification.metadata.userId && (
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              User: {notification.metadata.userId}
                            </div>
                          )}
                          {notification.metadata.smeId && (
                            <div className="flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              SME: {notification.metadata.smeId}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Notification Settings Modal */}
      <NotificationSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
