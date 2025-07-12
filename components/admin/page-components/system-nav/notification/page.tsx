"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/common/button";
import { Search } from "lucide-react";
import DashboardWidget from "@/components/admin/ui/DashboardWidget";
import {
  Bell,
  AlertTriangle,
  Clock,
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
  X,
} from "lucide-react";
import { NotificationPageSkeleton } from "@/components/admin/ui/Skeleton";

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

// SendNotificationModal Component
interface SendNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SendNotificationModal({
  isOpen,
  onClose,
}: SendNotificationModalProps) {
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    type: "system" as const,
    priority: "medium" as const,
    recipient: "all" as const,
  });

  const handleSend = () => {
    // Send notification logic here
    console.log("Sending notification:", notification);
    setNotification({
      title: "",
      message: "",
      type: "system",
      priority: "medium",
      recipient: "all",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Send Notification</h2>
              <p className="text-sm text-gray-600 mt-1">
                Create and send a new notification to users
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <input
                type="text"
                value={notification.title}
                onChange={(e) =>
                  setNotification((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Notification title"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                value={notification.message}
                onChange={(e) =>
                  setNotification((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                rows={4}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Notification message"
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Type</label>
              <select
                value={notification.type}
                onChange={(e) =>
                  setNotification((prev) => ({
                    ...prev,
                    type: e.target.value as any,
                  }))
                }
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="system">System</option>
                <option value="user">User</option>
                <option value="sme">SME</option>
                <option value="review">Review</option>
                <option value="alert">Alert</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Priority</label>
              <select
                value={notification.priority}
                onChange={(e) =>
                  setNotification((prev) => ({
                    ...prev,
                    priority: e.target.value as any,
                  }))
                }
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Recipient</label>
              <select
                value={notification.recipient}
                onChange={(e) =>
                  setNotification((prev) => ({
                    ...prev,
                    recipient: e.target.value as any,
                  }))
                }
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Users</option>
                <option value="admin">Admins Only</option>
                <option value="sme">SME Owners</option>
                <option value="users">Regular Users</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={!notification.title || !notification.message}
          >
            Send Notification
          </Button>
        </div>
      </div>
    </div>
  );
}

// NotificationSettings Component
interface NotificationSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

function NotificationSettings({ isOpen, onClose }: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    autoArchive: false,
    archiveAfterDays: 30,
    emailProvider: "smtp",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
  });

  const handleSave = () => {
    // Save notification settings logic here
    console.log("Saving notification settings:", settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Notification Settings</h2>
              <p className="text-sm text-gray-600 mt-1">
                Configure notification preferences and delivery methods
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Notification Types */}
          <div>
            <h3 className="text-lg font-medium mb-4">Notification Types</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">
                    Email Notifications
                  </label>
                  <p className="text-xs text-gray-500">
                    Receive notifications via email
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      emailNotifications: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">
                    SMS Notifications
                  </label>
                  <p className="text-xs text-gray-500">
                    Receive notifications via SMS
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      smsNotifications: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">
                    Push Notifications
                  </label>
                  <p className="text-xs text-gray-500">
                    Receive browser push notifications
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      pushNotifications: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Auto Archive Settings */}
          <div>
            <h3 className="text-lg font-medium mb-4">Auto Archive Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Auto Archive</label>
                  <p className="text-xs text-gray-500">
                    Automatically archive old notifications
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoArchive}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      autoArchive: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300"
                />
              </div>
              {settings.autoArchive && (
                <div>
                  <label className="text-sm font-medium">
                    Archive After (days)
                  </label>
                  <input
                    type="number"
                    value={settings.archiveAfterDays}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        archiveAfterDays: parseInt(e.target.value) || 30,
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="1"
                    max="365"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Email Configuration */}
          {settings.emailNotifications && (
            <div>
              <h3 className="text-lg font-medium mb-4">Email Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">SMTP Host</label>
                  <input
                    type="text"
                    value={settings.smtpHost}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        smtpHost: e.target.value,
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">SMTP Port</label>
                  <input
                    type="text"
                    value={settings.smtpPort}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        smtpPort: e.target.value,
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="587"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">SMTP Username</label>
                  <input
                    type="email"
                    value={settings.smtpUsername}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        smtpUsername: e.target.value,
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="your-email@gmail.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">SMTP Password</label>
                  <input
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        smtpPassword: e.target.value,
                      }))
                    }
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    </div>
  );
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    []
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isSendNotificationOpen, setIsSendNotificationOpen] =
    useState<boolean>(false);

  // Loading states
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handleBulkAction = (action: "read" | "archived" | "delete") => {
    if (selectedNotifications.length === 0) return;

    setIsLoading(true);
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

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id));
    }
  };

  // Simulate initial data loading
  useEffect(() => {
    const loadInitialData = async () => {
      setIsInitialLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setNotifications(mockNotifications);
      setIsInitialLoading(false);
    };

    loadInitialData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Show skeleton loading during initial load
  if (isInitialLoading) {
    return <NotificationPageSkeleton />;
  }

  return (
    <div className="py-2 sm:py-4 px-2 sm:px-4 lg:px-6">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight">
            Notification Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage system notifications, user alerts, and communication
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <Button
            icon={Send}
            onClick={() => setIsSendNotificationOpen(true)}
            className="w-full sm:w-auto"
          >
            Send Notification
          </Button>
          <Button
            variant="secondary"
            icon={Settings}
            onClick={() => setIsSettingsOpen(true)}
            className="w-full sm:w-auto"
          >
            Settings
          </Button>
        </div>
      </div>

      {/* Dashboard widgets */}
      <div className="w-full mb-6 sm:mb-8">
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardWidget
            title="Total Notifications"
            value={isLoading ? "..." : stats.total}
            icon={<Bell />}
            isLoading={isLoading}
          />
          <DashboardWidget
            title="Unread"
            value={isLoading ? "..." : stats.unread}
            icon={<Clock />}
            isLoading={isLoading}
          />
          <DashboardWidget
            title="Read"
            value={isLoading ? "..." : stats.read}
            icon={<Eye />}
            isLoading={isLoading}
          />
          <DashboardWidget
            title="Archived"
            value={isLoading ? "..." : stats.archived}
            icon={<EyeOff />}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Search, Filter, and Actions section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 mb-4">
        <div className="w-full lg:flex-1">
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
        <div className="flex flex-col sm:flex-row gap-2 lg:justify-end">
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
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("read")}
                className="w-full sm:w-auto"
              >
                Mark Read
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("archived")}
                className="w-full sm:w-auto"
              >
                Archive
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("delete")}
                className="text-red-600 hover:text-red-700 w-full sm:w-auto"
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

      {/* Send Notification Modal */}
      <SendNotificationModal
        isOpen={isSendNotificationOpen}
        onClose={() => setIsSendNotificationOpen(false)}
      />
    </div>
  );
}
