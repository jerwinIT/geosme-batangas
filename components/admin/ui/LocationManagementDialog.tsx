"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/common/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Globe,
  Navigation,
  Target,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Search,
  Building,
  User,
  Mail,
  Phone,
  FileText,
  Save,
  X,
} from "lucide-react";
import { Business } from "@/types";
import { Municipalities } from "@/data/Municipalities";
import { cn } from "@/lib/utils";

interface LocationManagementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  business?: Business | null;
  mode: "add" | "edit";
  onSave: (business: Partial<Business>) => void;
}

const businessCategories = [
  "Restaurant",
  "Café",
  "Retail",
  "Technology",
  "Healthcare",
  "Education",
  "Automotive",
  "Beauty",
  "Fitness",
  "Entertainment",
  "Professional Services",
  "Manufacturing",
  "Agriculture",
  "Construction",
  "Transportation",
  "Real Estate",
  "Financial Services",
  "Other",
];

const paymentMethods = [
  "Cash",
  "GCash",
  "PayMaya",
  "Bank Transfer",
  "Credit Card",
  "Debit Card",
  "PayPal",
  "Other",
];

export default function LocationManagementDialog({
  isOpen,
  onClose,
  business,
  mode,
  onSave,
}: LocationManagementDialogProps) {
  const [formData, setFormData] = useState<Partial<Business>>({
    name: "",
    category: "",
    municipality: "",
    address: "",
    ownerName: "",
    email: "",
    contactNumber: "",
    description: "",
    operatingHours: "",
    website: "",
    businessLicense: "",
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    paymentMethods: [],
    status: "pending",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coordinateSource, setCoordinateSource] = useState<
    "manual" | "map" | "geocode"
  >("manual");

  // Initialize form data when business prop changes
  useEffect(() => {
    if (business && mode === "edit") {
      setFormData({
        ...business,
        coordinates: business.coordinates || { latitude: 0, longitude: 0 },
        paymentMethods: business.paymentMethods || [],
      });
    } else {
      setFormData({
        name: "",
        category: "",
        municipality: "",
        address: "",
        ownerName: "",
        email: "",
        contactNumber: "",
        description: "",
        operatingHours: "",
        website: "",
        businessLicense: "",
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
        paymentMethods: [],
        status: "pending",
      });
    }
    setErrors({});
  }, [business, mode]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Business name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.municipality) {
      newErrors.municipality = "Municipality is required";
    }

    if (!formData.address?.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.ownerName?.trim()) {
      newErrors.ownerName = "Owner name is required";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.coordinates) {
      if (
        formData.coordinates.latitude === 0 &&
        formData.coordinates.longitude === 0
      ) {
        newErrors.coordinates = "Coordinates are required";
      } else if (
        formData.coordinates.latitude < -90 ||
        formData.coordinates.latitude > 90
      ) {
        newErrors.coordinates = "Invalid latitude (must be between -90 and 90)";
      } else if (
        formData.coordinates.longitude < -180 ||
        formData.coordinates.longitude > 180
      ) {
        newErrors.coordinates =
          "Invalid longitude (must be between -180 and 180)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleCoordinateChange = (
    field: "latitude" | "longitude",
    value: string
  ) => {
    const numValue = parseFloat(value) || 0;
    setFormData((prev) => ({
      ...prev,
      coordinates: {
        ...prev.coordinates!,
        [field]: numValue,
      },
    }));
    if (errors.coordinates) {
      setErrors((prev) => ({ ...prev, coordinates: "" }));
    }
  };

  const handlePaymentMethodToggle = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods?.includes(method)
        ? prev.paymentMethods.filter((m) => m !== method)
        : [...(prev.paymentMethods || []), method],
    }));
  };

  const handleGeocode = async () => {
    if (!formData.address) {
      setErrors((prev) => ({
        ...prev,
        address: "Address is required for geocoding",
      }));
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate geocoding API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock coordinates for Batangas area
      const mockCoordinates = {
        latitude: 13.7563 + (Math.random() - 0.5) * 0.1,
        longitude: 121.0583 + (Math.random() - 0.5) * 0.1,
      };

      setFormData((prev) => ({
        ...prev,
        coordinates: mockCoordinates,
      }));
      setCoordinateSource("geocode");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        coordinates: "Failed to geocode address",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMapSelection = () => {
    // This would open a map picker component
    setCoordinateSource("map");
    // For now, set some mock coordinates
    setFormData((prev) => ({
      ...prev,
      coordinates: {
        latitude: 13.7563 + (Math.random() - 0.5) * 0.1,
        longitude: 121.0583 + (Math.random() - 0.5) * 0.1,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving location:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: Business["status"]) => {
    const baseClasses =
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold";

    switch (status) {
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
      case "approved":
        return (
          <span
            className={cn(
              baseClasses,
              "bg-green-100 text-green-800 border-green-200"
            )}
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span
            className={cn(
              baseClasses,
              "bg-red-100 text-red-800 border-red-200"
            )}
          >
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      case "under_review":
        return (
          <span
            className={cn(
              baseClasses,
              "bg-blue-100 text-blue-800 border-blue-200"
            )}
          >
            <Search className="w-3 h-3 mr-1" />
            Under Review
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {mode === "add" ? "Add New Location" : "Edit Location"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Add a new SME location to the map"
              : "Update location information for " + business?.name}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Business Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter business name"
                    className={cn(errors.name && "border-red-500")}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category || ""}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger
                      className={cn(errors.category && "border-red-500")}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="municipality">Municipality *</Label>
                  <Select
                    value={formData.municipality || ""}
                    onValueChange={(value) =>
                      handleInputChange("municipality", value)
                    }
                  >
                    <SelectTrigger
                      className={cn(errors.municipality && "border-red-500")}
                    >
                      <SelectValue placeholder="Select municipality" />
                    </SelectTrigger>
                    <SelectContent>
                      {Municipalities.filter((m) => m.id !== "all").map(
                        (municipality) => (
                          <SelectItem
                            key={municipality.id}
                            value={municipality.name}
                          >
                            {municipality.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  {errors.municipality && (
                    <p className="text-sm text-red-500">
                      {errors.municipality}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address || ""}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="Enter complete address"
                    className={cn(errors.address && "border-red-500")}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ""}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe the business"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name *</Label>
                  <Input
                    id="ownerName"
                    value={formData.ownerName || ""}
                    onChange={(e) =>
                      handleInputChange("ownerName", e.target.value)
                    }
                    placeholder="Enter owner name"
                    className={cn(errors.ownerName && "border-red-500")}
                  />
                  {errors.ownerName && (
                    <p className="text-sm text-red-500">{errors.ownerName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    className={cn(errors.email && "border-red-500")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    value={formData.contactNumber || ""}
                    onChange={(e) =>
                      handleInputChange("contactNumber", e.target.value)
                    }
                    placeholder="Enter contact number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website || ""}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    placeholder="Enter website URL"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location & Coordinates */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Location & Coordinates
                </CardTitle>
                <CardDescription>
                  Set the exact location coordinates for the map
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Navigation}
                    onClick={handleGeocode}
                    disabled={isSubmitting || !formData.address}
                    className="flex-1"
                  >
                    Geocode Address
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Target}
                    onClick={handleMapSelection}
                    className="flex-1"
                  >
                    Pick on Map
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude *</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="0.000001"
                      value={formData.coordinates?.latitude || ""}
                      onChange={(e) =>
                        handleCoordinateChange("latitude", e.target.value)
                      }
                      placeholder="13.7563"
                      className={cn(errors.coordinates && "border-red-500")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude *</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="0.000001"
                      value={formData.coordinates?.longitude || ""}
                      onChange={(e) =>
                        handleCoordinateChange("longitude", e.target.value)
                      }
                      placeholder="121.0583"
                      className={cn(errors.coordinates && "border-red-500")}
                    />
                  </div>
                </div>

                {errors.coordinates && (
                  <p className="text-sm text-red-500">{errors.coordinates}</p>
                )}

                {coordinateSource !== "manual" && (
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-700">
                      Coordinates set via{" "}
                      {coordinateSource === "geocode"
                        ? "address geocoding"
                        : "map selection"}
                    </span>
                  </div>
                )}

                {/* Map Preview Placeholder */}
                <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Globe className="h-8 w-8 text-gray-400 mx-auto" />
                    <p className="text-sm text-gray-600">Map Preview</p>
                    <p className="text-xs text-gray-500">
                      {formData.coordinates?.latitude &&
                      formData.coordinates?.longitude
                        ? `${formData.coordinates.latitude.toFixed(
                            6
                          )}, ${formData.coordinates.longitude.toFixed(6)}`
                        : "No coordinates set"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Business Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessLicense">Business License</Label>
                  <Input
                    id="businessLicense"
                    value={formData.businessLicense || ""}
                    onChange={(e) =>
                      handleInputChange("businessLicense", e.target.value)
                    }
                    placeholder="Enter business license number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operatingHours">Operating Hours</Label>
                  <Input
                    id="operatingHours"
                    value={formData.operatingHours || ""}
                    onChange={(e) =>
                      handleInputChange("operatingHours", e.target.value)
                    }
                    placeholder="e.g., 9:00 AM - 6:00 PM"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Payment Methods</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {paymentMethods.map((method) => (
                      <label
                        key={method}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={
                            formData.paymentMethods?.includes(method) || false
                          }
                          onChange={() => handlePaymentMethodToggle(method)}
                          className="rounded"
                        />
                        <span className="text-sm">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {mode === "edit" && (
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(formData.status || "pending")}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting
              ? "Saving..."
              : mode === "add"
              ? "Add Location"
              : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
