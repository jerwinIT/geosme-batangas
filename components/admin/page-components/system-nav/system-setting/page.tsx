"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/main/ui/card";
import { Button } from "@/components/main/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Database,
  Map,
  Users,
  Shield,
  Bell,
  Globe,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

interface SystemSettings {
  // General Settings
  appName: string;
  appDescription: string;
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;

  // Map Configuration
  defaultLatitude: string;
  defaultLongitude: string;
  defaultZoom: string;
  mapApiKey: string;

  // Database Settings
  databaseUrl: string;
  maxConnections: string;
  connectionTimeout: string;

  // Security Settings
  sessionTimeout: string;
  maxLoginAttempts: string;
  passwordMinLength: string;
  enableTwoFactor: boolean;

  // Notification Settings
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;

  // SME Data Settings
  autoApproveSMEs: boolean;
  requireVerification: boolean;
  maxImagesPerSME: string;
  reviewModeration: boolean;
}

export default function SystemSettingPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    appName: "GeoSME Batangas",
    appDescription: "SME Directory and Analytics Platform for Batangas",
    contactEmail: "admin@geosme-batangas.com",
    contactPhone: "+63 912 345 6789",
    officeAddress: "Batangas City Hall, Batangas City",
    defaultLatitude: "13.7563",
    defaultLongitude: "121.0583",
    defaultZoom: "10",
    mapApiKey: "••••••••••••••••••••••••••••••••",
    databaseUrl: "postgresql://localhost:5432/geosme_batangas",
    maxConnections: "20",
    connectionTimeout: "30",
    sessionTimeout: "3600",
    maxLoginAttempts: "5",
    passwordMinLength: "8",
    enableTwoFactor: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    autoApproveSMEs: false,
    requireVerification: true,
    maxImagesPerSME: "10",
    reviewModeration: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleInputChange = (
    field: keyof SystemSettings,
    value: string | boolean
  ) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSaveStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    // Reset to default values
    setSettings({
      appName: "GeoSME Batangas",
      appDescription: "SME Directory and Analytics Platform for Batangas",
      contactEmail: "admin@geosme-batangas.com",
      contactPhone: "+63 912 345 6789",
      officeAddress: "Batangas City Hall, Batangas City",
      defaultLatitude: "13.7563",
      defaultLongitude: "121.0583",
      defaultZoom: "10",
      mapApiKey: "••••••••••••••••••••••••••••••••",
      databaseUrl: "postgresql://localhost:5432/geosme_batangas",
      maxConnections: "20",
      connectionTimeout: "30",
      sessionTimeout: "3600",
      maxLoginAttempts: "5",
      passwordMinLength: "8",
      enableTwoFactor: true,
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      autoApproveSMEs: false,
      requireVerification: true,
      maxImagesPerSME: "10",
      reviewModeration: true,
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text">System Settings</h1>
          <p className="text-gray-600 mt-2">
            Configure system environment and application settings
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleReset} disabled={isLoading}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Status Messages */}
      {saveStatus === "success" && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800">Settings saved successfully!</span>
        </div>
      )}

      {saveStatus === "error" && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <span className="text-red-800">
            Failed to save settings. Please try again.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              General Settings
            </CardTitle>
            <CardDescription>
              Basic application configuration and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Application Name</label>
              <Input
                value={settings.appName}
                onChange={(e) => handleInputChange("appName", e.target.value)}
                placeholder="Enter application name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                value={settings.appDescription}
                onChange={(e) =>
                  handleInputChange("appDescription", e.target.value)
                }
                placeholder="Enter application description"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Contact Email
              </label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) =>
                  handleInputChange("contactEmail", e.target.value)
                }
                placeholder="admin@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contact Phone
              </label>
              <Input
                value={settings.contactPhone}
                onChange={(e) =>
                  handleInputChange("contactPhone", e.target.value)
                }
                placeholder="+63 912 345 6789"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Office Address
              </label>
              <Input
                value={settings.officeAddress}
                onChange={(e) =>
                  handleInputChange("officeAddress", e.target.value)
                }
                placeholder="Enter office address"
              />
            </div>
          </CardContent>
        </Card>

        {/* Map Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="w-5 h-5" />
              Map Configuration
            </CardTitle>
            <CardDescription>
              Map settings and API configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Latitude</label>
                <Input
                  type="number"
                  step="0.0001"
                  value={settings.defaultLatitude}
                  onChange={(e) =>
                    handleInputChange("defaultLatitude", e.target.value)
                  }
                  placeholder="13.7563"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Default Longitude</label>
                <Input
                  type="number"
                  step="0.0001"
                  value={settings.defaultLongitude}
                  onChange={(e) =>
                    handleInputChange("defaultLongitude", e.target.value)
                  }
                  placeholder="121.0583"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Default Zoom Level</label>
              <Input
                type="number"
                min="1"
                max="20"
                value={settings.defaultZoom}
                onChange={(e) =>
                  handleInputChange("defaultZoom", e.target.value)
                }
                placeholder="10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Map API Key</label>
              <Input
                type="password"
                value={settings.mapApiKey}
                onChange={(e) => handleInputChange("mapApiKey", e.target.value)}
                placeholder="Enter your map API key"
              />
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Database Configuration
            </CardTitle>
            <CardDescription>
              Database connection and performance settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Database URL</label>
              <Input
                value={settings.databaseUrl}
                onChange={(e) =>
                  handleInputChange("databaseUrl", e.target.value)
                }
                placeholder="postgresql://localhost:5432/database"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Max Connections</label>
                <Input
                  type="number"
                  value={settings.maxConnections}
                  onChange={(e) =>
                    handleInputChange("maxConnections", e.target.value)
                  }
                  placeholder="20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Connection Timeout (s)
                </label>
                <Input
                  type="number"
                  value={settings.connectionTimeout}
                  onChange={(e) =>
                    handleInputChange("connectionTimeout", e.target.value)
                  }
                  placeholder="30"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Authentication and security configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Session Timeout (s)
                </label>
                <Input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) =>
                    handleInputChange("sessionTimeout", e.target.value)
                  }
                  placeholder="3600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Max Login Attempts
                </label>
                <Input
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) =>
                    handleInputChange("maxLoginAttempts", e.target.value)
                  }
                  placeholder="5"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password Min Length</label>
              <Input
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) =>
                  handleInputChange("passwordMinLength", e.target.value)
                }
                placeholder="8"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enableTwoFactor"
                checked={settings.enableTwoFactor}
                onChange={(e) =>
                  handleInputChange("enableTwoFactor", e.target.checked)
                }
                className="rounded border-gray-300"
              />
              <label htmlFor="enableTwoFactor" className="text-sm font-medium">
                Enable Two-Factor Authentication
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="emailNotifications"
                checked={settings.emailNotifications}
                onChange={(e) =>
                  handleInputChange("emailNotifications", e.target.checked)
                }
                className="rounded border-gray-300"
              />
              <label
                htmlFor="emailNotifications"
                className="text-sm font-medium"
              >
                Email Notifications
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="smsNotifications"
                checked={settings.smsNotifications}
                onChange={(e) =>
                  handleInputChange("smsNotifications", e.target.checked)
                }
                className="rounded border-gray-300"
              />
              <label htmlFor="smsNotifications" className="text-sm font-medium">
                SMS Notifications
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="pushNotifications"
                checked={settings.pushNotifications}
                onChange={(e) =>
                  handleInputChange("pushNotifications", e.target.checked)
                }
                className="rounded border-gray-300"
              />
              <label
                htmlFor="pushNotifications"
                className="text-sm font-medium"
              >
                Push Notifications
              </label>
            </div>
          </CardContent>
        </Card>

        {/* SME Data Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              SME Data Management
            </CardTitle>
            <CardDescription>
              Settings for SME registration and data management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoApproveSMEs"
                checked={settings.autoApproveSMEs}
                onChange={(e) =>
                  handleInputChange("autoApproveSMEs", e.target.checked)
                }
                className="rounded border-gray-300"
              />
              <label htmlFor="autoApproveSMEs" className="text-sm font-medium">
                Auto-approve SME Registrations
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="requireVerification"
                checked={settings.requireVerification}
                onChange={(e) =>
                  handleInputChange("requireVerification", e.target.checked)
                }
                className="rounded border-gray-300"
              />
              <label
                htmlFor="requireVerification"
                className="text-sm font-medium"
              >
                Require Business Verification
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Max Images per SME</label>
              <Input
                type="number"
                value={settings.maxImagesPerSME}
                onChange={(e) =>
                  handleInputChange("maxImagesPerSME", e.target.value)
                }
                placeholder="10"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="reviewModeration"
                checked={settings.reviewModeration}
                onChange={(e) =>
                  handleInputChange("reviewModeration", e.target.checked)
                }
                className="rounded border-gray-300"
              />
              <label htmlFor="reviewModeration" className="text-sm font-medium">
                Enable Review Moderation
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
