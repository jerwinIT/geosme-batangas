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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  Eye,
  EyeOff,
  ExternalLink,
  Info,
  Server,
  Lock,
  FileText,
  Activity,
  Zap,
  Clock,
  HardDrive,
  Key,
  AlertCircle,
} from "lucide-react";

interface SystemSettings {
  // General Settings
  appName: string;
  appDescription: string;
  appVersion: string;
  environment: "development" | "staging" | "production";
  timezone: string;
  language: string;
  theme: "light" | "dark" | "auto";

  // Contact Information
  contactEmail: string;
  contactPhone: string;
  officeAddress: string;
  supportHours: string;
  websiteUrl: string;

  // Map Configuration
  defaultLatitude: string;
  defaultLongitude: string;
  defaultZoom: string;
  mapApiKey: string;
  mapProvider: "google" | "openstreetmap" | "mapbox";

  // Database Settings
  databaseUrl: string;
  databaseType: "postgresql" | "mysql" | "sqlite";
  maxConnections: string;
  connectionTimeout: string;
  enableSSL: boolean;

  // Security Settings
  sessionTimeout: string;
  maxLoginAttempts: string;
  passwordMinLength: string;
  passwordRequireUppercase: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireSymbols: boolean;
  enableTwoFactor: boolean;
  enableRateLimiting: boolean;
  enableCSRF: boolean;

  // Notification Settings
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  emailProvider: "smtp" | "sendgrid" | "mailgun";
  smtpHost: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword: string;

  // SME Data Settings
  autoApproveSMEs: boolean;
  requireVerification: boolean;
  maxImagesPerSME: string;
  maxFileSize: string;
  allowedFileTypes: string;
  reviewModeration: boolean;
  autoDeleteInactive: boolean;
  inactiveDaysThreshold: string;

  // Performance Settings
  enableCaching: boolean;
  cacheTTL: string;
  enableCompression: boolean;
  maxUploadSize: string;
  enableCDN: boolean;
  cdnUrl: string;

  // Analytics & Monitoring
  enableAnalytics: boolean;
  analyticsProvider: "google" | "plausible" | "custom";
  analyticsKey: string;
  enableErrorTracking: boolean;
  enablePerformanceMonitoring: boolean;
  logLevel: "debug" | "info" | "warn" | "error";
}

interface ValidationErrors {
  [key: string]: string;
}

export default function SystemSettingPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    appName: "GeoSME Batangas",
    appDescription:
      "SME Directory and Analytics Platform for Batangas Province",
    appVersion: "1.0.0",
    environment: "production",
    timezone: "Asia/Manila",
    language: "en",
    theme: "auto",
    contactEmail: "admin@geosme-batangas.com",
    contactPhone: "+63 912 345 6789",
    officeAddress: "Batangas City Hall, Batangas City, Philippines",
    supportHours: "Monday - Friday, 8:00 AM - 5:00 PM",
    websiteUrl: "https://geosme-batangas.com",
    defaultLatitude: "13.7563",
    defaultLongitude: "121.0583",
    defaultZoom: "10",
    mapApiKey: "••••••••••••••••••••••••••••••••",
    mapProvider: "google",
    databaseUrl: "postgresql://localhost:5432/geosme_batangas",
    databaseType: "postgresql",
    maxConnections: "20",
    connectionTimeout: "30",
    enableSSL: true,
    sessionTimeout: "3600",
    maxLoginAttempts: "5",
    passwordMinLength: "8",
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: true,
    enableTwoFactor: true,
    enableRateLimiting: true,
    enableCSRF: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    emailProvider: "smtp",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    autoApproveSMEs: false,
    requireVerification: true,
    maxImagesPerSME: "10",
    maxFileSize: "5",
    allowedFileTypes: "jpg,jpeg,png,pdf,doc,docx",
    reviewModeration: true,
    autoDeleteInactive: false,
    inactiveDaysThreshold: "365",
    enableCaching: true,
    cacheTTL: "3600",
    enableCompression: true,
    maxUploadSize: "10",
    enableCDN: false,
    cdnUrl: "",
    enableAnalytics: true,
    analyticsProvider: "google",
    analyticsKey: "",
    enableErrorTracking: true,
    enablePerformanceMonitoring: true,
    logLevel: "info",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [showPasswords, setShowPasswords] = useState<{
    [key: string]: boolean;
  }>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Track changes
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [settings]);

  const handleInputChange = (
    field: keyof SystemSettings,
    value: string | boolean
  ) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validateSettings = (): boolean => {
    const errors: ValidationErrors = {};

    // Required fields validation
    if (!settings.appName.trim())
      errors.appName = "Application name is required";
    if (!settings.contactEmail.trim())
      errors.contactEmail = "Contact email is required";
    if (!settings.databaseUrl.trim())
      errors.databaseUrl = "Database URL is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (settings.contactEmail && !emailRegex.test(settings.contactEmail)) {
      errors.contactEmail = "Invalid email format";
    }

    // Number validations
    if (parseInt(settings.maxConnections) < 1)
      errors.maxConnections = "Must be at least 1";
    if (parseInt(settings.sessionTimeout) < 300)
      errors.sessionTimeout = "Must be at least 300 seconds";
    if (parseInt(settings.passwordMinLength) < 6)
      errors.passwordMinLength = "Must be at least 6 characters";

    // URL validation
    if (settings.websiteUrl && !settings.websiteUrl.startsWith("http")) {
      errors.websiteUrl =
        "Must be a valid URL starting with http:// or https://";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateSettings()) {
      setSaveStatus("error");
      return;
    }

    setIsLoading(true);
    setSaveStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSaveStatus("success");
      setHasUnsavedChanges(false);
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (
      confirm(
        "Are you sure you want to reset all settings to default values? This action cannot be undone."
      )
    ) {
      setSettings({
        appName: "GeoSME Batangas",
        appDescription:
          "SME Directory and Analytics Platform for Batangas Province",
        appVersion: "1.0.0",
        environment: "production",
        timezone: "Asia/Manila",
        language: "en",
        theme: "auto",
        contactEmail: "admin@geosme-batangas.com",
        contactPhone: "+63 912 345 6789",
        officeAddress: "Batangas City Hall, Batangas City, Philippines",
        supportHours: "Monday - Friday, 8:00 AM - 5:00 PM",
        websiteUrl: "https://geosme-batangas.com",
        defaultLatitude: "13.7563",
        defaultLongitude: "121.0583",
        defaultZoom: "10",
        mapApiKey: "••••••••••••••••••••••••••••••••",
        mapProvider: "google",
        databaseUrl: "postgresql://localhost:5432/geosme_batangas",
        databaseType: "postgresql",
        maxConnections: "20",
        connectionTimeout: "30",
        enableSSL: true,
        sessionTimeout: "3600",
        maxLoginAttempts: "5",
        passwordMinLength: "8",
        passwordRequireUppercase: true,
        passwordRequireNumbers: true,
        passwordRequireSymbols: true,
        enableTwoFactor: true,
        enableRateLimiting: true,
        enableCSRF: true,
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        emailProvider: "smtp",
        smtpHost: "smtp.gmail.com",
        smtpPort: "587",
        smtpUsername: "",
        smtpPassword: "",
        autoApproveSMEs: false,
        requireVerification: true,
        maxImagesPerSME: "10",
        maxFileSize: "5",
        allowedFileTypes: "jpg,jpeg,png,pdf,doc,docx",
        reviewModeration: true,
        autoDeleteInactive: false,
        inactiveDaysThreshold: "365",
        enableCaching: true,
        cacheTTL: "3600",
        enableCompression: true,
        maxUploadSize: "10",
        enableCDN: false,
        cdnUrl: "",
        enableAnalytics: true,
        analyticsProvider: "google",
        analyticsKey: "",
        enableErrorTracking: true,
        enablePerformanceMonitoring: true,
        logLevel: "info",
      });
      setValidationErrors({});
      setHasUnsavedChanges(false);
    }
  };

  const renderField = (
    field: keyof SystemSettings,
    label: string,
    type:
      | "text"
      | "email"
      | "number"
      | "password"
      | "textarea"
      | "select"
      | "switch" = "text",
    placeholder?: string,
    options?: { value: string; label: string }[],
    icon?: React.ReactNode,
    helpText?: string
  ) => {
    const value = settings[field];
    const error = validationErrors[field];
    const isPassword = type === "password";
    const showPassword = showPasswords[field as string];

    return (
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          {icon}
          {label}
          {helpText && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{helpText}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </Label>

        {type === "switch" ? (
          <div className="flex items-center space-x-2">
            <Switch
              checked={value as boolean}
              onCheckedChange={(checked: boolean) =>
                handleInputChange(field, checked)
              }
            />
            <span className="text-sm text-gray-600">
              {value ? "Enabled" : "Disabled"}
            </span>
          </div>
        ) : type === "select" ? (
          <Select
            value={value as string}
            onValueChange={(val) => handleInputChange(field, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : type === "textarea" ? (
          <Textarea
            value={value as string}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={placeholder}
            rows={3}
          />
        ) : (
          <div className="relative">
            <Input
              type={isPassword && showPassword ? "text" : type}
              value={value as string}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={placeholder}
              className={error ? "border-red-500" : ""}
            />
            {isPassword && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => togglePasswordVisibility(field as string)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        )}

        {error && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text">System Settings</h1>
          <p className="text-gray-600 mt-2">
            Configure system environment and application settings for GeoSME
            Batangas
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasUnsavedChanges && (
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-800"
            >
              Unsaved Changes
            </Badge>
          )}
          <Button variant="outline" onClick={handleReset} disabled={isLoading}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || !hasUnsavedChanges}
            className="min-w-[140px]"
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
            Failed to save settings. Please check the form for errors and try
            again.
          </span>
        </div>
      )}

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Database
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="sme" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            SME Settings
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Application Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Application Settings
                </CardTitle>
                <CardDescription>
                  Basic application configuration and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderField(
                  "appName",
                  "Application Name",
                  "text",
                  "GeoSME Batangas",
                  undefined,
                  undefined,
                  "The name displayed throughout the application"
                )}
                {renderField(
                  "appDescription",
                  "Description",
                  "textarea",
                  "Application description",
                  undefined,
                  undefined,
                  "Brief description of the application"
                )}
                {renderField(
                  "appVersion",
                  "Version",
                  "text",
                  "1.0.0",
                  undefined,
                  undefined,
                  "Current application version"
                )}
                {renderField(
                  "environment",
                  "Environment",
                  "select",
                  undefined,
                  [
                    { value: "development", label: "Development" },
                    { value: "staging", label: "Staging" },
                    { value: "production", label: "Production" },
                  ],
                  undefined,
                  "Current deployment environment"
                )}
                {renderField(
                  "timezone",
                  "Timezone",
                  "text",
                  "Asia/Manila",
                  undefined,
                  undefined,
                  "Default timezone for the application"
                )}
                {renderField(
                  "language",
                  "Default Language",
                  "select",
                  undefined,
                  [
                    { value: "en", label: "English" },
                    { value: "tl", label: "Tagalog" },
                  ],
                  undefined,
                  "Default language for the application"
                )}
                {renderField(
                  "theme",
                  "Theme",
                  "select",
                  undefined,
                  [
                    { value: "light", label: "Light" },
                    { value: "dark", label: "Dark" },
                    { value: "auto", label: "Auto (System)" },
                  ],
                  undefined,
                  "Default theme for the application"
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Contact details and support information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderField(
                  "contactEmail",
                  "Contact Email",
                  "email",
                  "admin@example.com",
                  undefined,
                  <Mail className="w-4 h-4" />
                )}
                {renderField(
                  "contactPhone",
                  "Contact Phone",
                  "text",
                  "+63 912 345 6789",
                  undefined,
                  <Phone className="w-4 h-4" />
                )}
                {renderField(
                  "officeAddress",
                  "Office Address",
                  "textarea",
                  "Enter office address",
                  undefined,
                  <MapPin className="w-4 h-4" />
                )}
                {renderField(
                  "supportHours",
                  "Support Hours",
                  "text",
                  "Monday - Friday, 8:00 AM - 5:00 PM",
                  undefined,
                  <Clock className="w-4 h-4" />
                )}
                {renderField(
                  "websiteUrl",
                  "Website URL",
                  "text",
                  "https://geosme-batangas.com",
                  undefined,
                  <ExternalLink className="w-4 h-4" />
                )}
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
                {renderField(
                  "mapProvider",
                  "Map Provider",
                  "select",
                  undefined,
                  [
                    { value: "google", label: "Google Maps" },
                    { value: "openstreetmap", label: "OpenStreetMap" },
                    { value: "mapbox", label: "Mapbox" },
                  ],
                  undefined,
                  "Map service provider"
                )}
                <div className="grid grid-cols-2 gap-4">
                  {renderField(
                    "defaultLatitude",
                    "Default Latitude",
                    "number",
                    "13.7563",
                    undefined,
                    undefined,
                    "Default map center latitude"
                  )}
                  {renderField(
                    "defaultLongitude",
                    "Default Longitude",
                    "number",
                    "121.0583",
                    undefined,
                    undefined,
                    "Default map center longitude"
                  )}
                </div>
                {renderField(
                  "defaultZoom",
                  "Default Zoom Level",
                  "number",
                  "10",
                  undefined,
                  undefined,
                  "Default map zoom level (1-20)"
                )}
                {renderField(
                  "mapApiKey",
                  "Map API Key",
                  "password",
                  "Enter your map API key",
                  undefined,
                  <Key className="w-4 h-4" />,
                  "API key for map services"
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Authentication Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Authentication Settings
                </CardTitle>
                <CardDescription>
                  User authentication and session management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderField(
                  "sessionTimeout",
                  "Session Timeout (seconds)",
                  "number",
                  "3600",
                  undefined,
                  <Clock className="w-4 h-4" />,
                  "Session timeout in seconds"
                )}
                {renderField(
                  "maxLoginAttempts",
                  "Max Login Attempts",
                  "number",
                  "5",
                  undefined,
                  undefined,
                  "Maximum failed login attempts before lockout"
                )}
                {renderField(
                  "passwordMinLength",
                  "Password Min Length",
                  "number",
                  "8",
                  undefined,
                  undefined,
                  "Minimum password length"
                )}
                {renderField(
                  "passwordRequireUppercase",
                  "Require Uppercase",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Require at least one uppercase letter"
                )}
                {renderField(
                  "passwordRequireNumbers",
                  "Require Numbers",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Require at least one number"
                )}
                {renderField(
                  "passwordRequireSymbols",
                  "Require Symbols",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Require at least one special character"
                )}
                {renderField(
                  "enableTwoFactor",
                  "Two-Factor Authentication",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Enable 2FA for enhanced security"
                )}
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Features
                </CardTitle>
                <CardDescription>
                  Additional security measures and protections
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderField(
                  "enableRateLimiting",
                  "Rate Limiting",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Enable rate limiting for API endpoints"
                )}
                {renderField(
                  "enableCSRF",
                  "CSRF Protection",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Enable CSRF token protection"
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Database Settings Tab */}
        <TabsContent value="database" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Database Configuration */}
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
                {renderField(
                  "databaseType",
                  "Database Type",
                  "select",
                  undefined,
                  [
                    { value: "postgresql", label: "PostgreSQL" },
                    { value: "mysql", label: "MySQL" },
                    { value: "sqlite", label: "SQLite" },
                  ],
                  undefined,
                  "Database management system"
                )}
                {renderField(
                  "databaseUrl",
                  "Database URL",
                  "text",
                  "postgresql://localhost:5432/database",
                  undefined,
                  <Server className="w-4 h-4" />,
                  "Database connection string"
                )}
                {renderField(
                  "maxConnections",
                  "Max Connections",
                  "number",
                  "20",
                  undefined,
                  undefined,
                  "Maximum database connections"
                )}
                {renderField(
                  "connectionTimeout",
                  "Connection Timeout (s)",
                  "number",
                  "30",
                  undefined,
                  undefined,
                  "Database connection timeout"
                )}
                {renderField(
                  "enableSSL",
                  "Enable SSL",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Use SSL for database connections"
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure notification delivery methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderField(
                  "emailNotifications",
                  "Email Notifications",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Enable email notifications"
                )}
                {renderField(
                  "smsNotifications",
                  "SMS Notifications",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Enable SMS notifications"
                )}
                {renderField(
                  "pushNotifications",
                  "Push Notifications",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Enable push notifications"
                )}
              </CardContent>
            </Card>

            {/* Email Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Configuration
                </CardTitle>
                <CardDescription>
                  SMTP settings for email delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderField(
                  "emailProvider",
                  "Email Provider",
                  "select",
                  undefined,
                  [
                    { value: "smtp", label: "SMTP" },
                    { value: "sendgrid", label: "SendGrid" },
                    { value: "mailgun", label: "Mailgun" },
                  ],
                  undefined,
                  "Email service provider"
                )}
                {renderField(
                  "smtpHost",
                  "SMTP Host",
                  "text",
                  "smtp.gmail.com",
                  undefined,
                  undefined,
                  "SMTP server hostname"
                )}
                {renderField(
                  "smtpPort",
                  "SMTP Port",
                  "text",
                  "587",
                  undefined,
                  undefined,
                  "SMTP server port"
                )}
                {renderField(
                  "smtpUsername",
                  "SMTP Username",
                  "text",
                  "your-email@gmail.com",
                  undefined,
                  undefined,
                  "SMTP authentication username"
                )}
                {renderField(
                  "smtpPassword",
                  "SMTP Password",
                  "password",
                  "Enter SMTP password",
                  undefined,
                  <Key className="w-4 h-4" />,
                  "SMTP authentication password"
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* SME Settings Tab */}
        <TabsContent value="sme" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SME Registration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  SME Registration
                </CardTitle>
                <CardDescription>
                  Settings for SME registration and approval process
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderField(
                  "autoApproveSMEs",
                  "Auto-approve SMEs",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Automatically approve new SME registrations"
                )}
                {renderField(
                  "requireVerification",
                  "Require Verification",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Require business verification before approval"
                )}
                {renderField(
                  "reviewModeration",
                  "Review Moderation",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Moderate reviews before publishing"
                )}
              </CardContent>
            </Card>

            {/* File Upload Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  File Upload Settings
                </CardTitle>
                <CardDescription>
                  Configure file upload limits and restrictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderField(
                  "maxImagesPerSME",
                  "Max Images per SME",
                  "number",
                  "10",
                  undefined,
                  undefined,
                  "Maximum number of images per SME"
                )}
                {renderField(
                  "maxFileSize",
                  "Max File Size (MB)",
                  "number",
                  "5",
                  undefined,
                  undefined,
                  "Maximum file size in megabytes"
                )}
                {renderField(
                  "allowedFileTypes",
                  "Allowed File Types",
                  "text",
                  "jpg,jpeg,png,pdf,doc,docx",
                  undefined,
                  undefined,
                  "Comma-separated list of allowed file extensions"
                )}
                {renderField(
                  "maxUploadSize",
                  "Max Upload Size (MB)",
                  "number",
                  "10",
                  undefined,
                  undefined,
                  "Maximum total upload size"
                )}
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="w-5 h-5" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Automated data cleanup and maintenance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderField(
                  "autoDeleteInactive",
                  "Auto-delete Inactive",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Automatically delete inactive SME accounts"
                )}
                {renderField(
                  "inactiveDaysThreshold",
                  "Inactive Days Threshold",
                  "number",
                  "365",
                  undefined,
                  undefined,
                  "Days of inactivity before deletion"
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Advanced Settings Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Performance Settings
                </CardTitle>
                <CardDescription>
                  Performance optimization and caching configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderField(
                  "enableCaching",
                  "Enable Caching",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Enable application caching"
                )}
                {renderField(
                  "cacheTTL",
                  "Cache TTL (seconds)",
                  "number",
                  "3600",
                  undefined,
                  undefined,
                  "Cache time-to-live in seconds"
                )}
                {renderField(
                  "enableCompression",
                  "Enable Compression",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Enable response compression"
                )}
                {renderField(
                  "enableCDN",
                  "Enable CDN",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Use CDN for static assets"
                )}
                {renderField(
                  "cdnUrl",
                  "CDN URL",
                  "text",
                  "https://cdn.example.com",
                  undefined,
                  undefined,
                  "CDN base URL for static assets"
                )}
              </CardContent>
            </Card>

            {/* Analytics & Monitoring */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Analytics & Monitoring
                </CardTitle>
                <CardDescription>
                  Analytics tracking and system monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderField(
                  "enableAnalytics",
                  "Enable Analytics",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Enable analytics tracking"
                )}
                {renderField(
                  "analyticsProvider",
                  "Analytics Provider",
                  "select",
                  undefined,
                  [
                    { value: "google", label: "Google Analytics" },
                    { value: "plausible", label: "Plausible" },
                    { value: "custom", label: "Custom" },
                  ],
                  undefined,
                  "Analytics service provider"
                )}
                {renderField(
                  "analyticsKey",
                  "Analytics Key",
                  "text",
                  "Enter analytics key",
                  undefined,
                  <Key className="w-4 h-4" />,
                  "Analytics service API key"
                )}
                {renderField(
                  "enableErrorTracking",
                  "Error Tracking",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Enable error tracking and reporting"
                )}
                {renderField(
                  "enablePerformanceMonitoring",
                  "Performance Monitoring",
                  "switch",
                  undefined,
                  undefined,
                  undefined,
                  "Enable performance monitoring"
                )}
                {renderField(
                  "logLevel",
                  "Log Level",
                  "select",
                  undefined,
                  [
                    { value: "debug", label: "Debug" },
                    { value: "info", label: "Info" },
                    { value: "warn", label: "Warning" },
                    { value: "error", label: "Error" },
                  ],
                  undefined,
                  "Application log level"
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
