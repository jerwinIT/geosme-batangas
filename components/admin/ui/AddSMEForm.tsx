"use client";

import { useState } from "react";
import { Button } from "@/components/common/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload, FileText, X } from "lucide-react";

interface AddSMEFormProps {
  onAddSME?: (smeData: any) => void;
  onImportCSV?: (file: File) => void;
  isOpen: boolean;
  onClose: () => void;
}

const municipalities = [
  "Batangas City",
  "Lipa City",
  "Tanauan City",
  "Santo Tomas",
  "Malvar",
  "Balete",
  "Mataas na Kahoy",
  "San Nicolas",
  "Talisay",
  "Laurel",
  "Agoncillo",
  "Alitagtag",
  "Cuenca",
  "Ibaan",
  "Lemery",
  "Lian",
  "Lobo",
  "Mabini",
  "Nasugbu",
  "Padre Garcia",
  "Rosario",
  "San Jose",
  "San Juan",
  "San Luis",
  "San Pascual",
  "Santa Teresita",
  "Taal",
  "Taysan",
  "Tingloy",
  "Tuy",
];

const businessCategories = [
  "Restaurant",
  "Retail",
  "Services",
  "Manufacturing",
  "Technology",
  "Healthcare",
  "Education",
  "Transportation",
  "Construction",
  "Agriculture",
  "Tourism",
  "Entertainment",
  "Financial Services",
  "Real Estate",
  "Consulting",
  "Other",
];

const paymentMethods = [
  "Cash",
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "GCash",
  "PayMaya",
  "Online Payment",
  "Check",
];

export function AddSMEForm({
  onAddSME,
  onImportCSV,
  isOpen,
  onClose,
}: AddSMEFormProps) {
  const [activeTab, setActiveTab] = useState("single");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    email: "",
    contactNumber: "",
    municipality: "",
    category: "",
    address: "",
    description: "",
    businessLicense: "",
    operatingHours: "",
    website: "",
    priceRange: "",
    paymentMethods: [] as string[],
    status: "pending" as const,
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCoordinateChange = (
    field: "latitude" | "longitude",
    value: string
  ) => {
    const numValue = parseFloat(value) || 0;
    setFormData((prev) => ({
      ...prev,
      coordinates: {
        ...prev.coordinates,
        [field]: numValue,
      },
    }));
  };

  const handlePaymentMethodToggle = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter((m) => m !== method)
        : [...prev.paymentMethods, method],
    }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // More flexible file validation - check extension and size
      const fileName = file.name.toLowerCase();
      const isValidExtension = fileName.endsWith(".csv");
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit

      if (isValidExtension && isValidSize) {
        setSelectedFile(file);
      } else if (!isValidExtension) {
        alert("Please select a valid CSV file (.csv extension)");
      } else if (!isValidSize) {
        alert("File size must be less than 5MB");
      }
    }
  };

  const handleSubmitSingle = () => {
    if (onAddSME) {
      onAddSME(formData);
    }
    // Reset form
    setFormData({
      name: "",
      ownerName: "",
      email: "",
      contactNumber: "",
      municipality: "",
      category: "",
      address: "",
      description: "",
      businessLicense: "",
      operatingHours: "",
      website: "",
      priceRange: "",
      paymentMethods: [],
      status: "pending",
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
    });
    onClose();
  };

  const handleImportCSV = () => {
    if (selectedFile && onImportCSV) {
      onImportCSV(selectedFile);
    }
    setSelectedFile(null);
    onClose();
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find((file) =>
      file.name.toLowerCase().endsWith(".csv")
    );

    if (csvFile) {
      handleFileSelect({ target: { files: [csvFile] } } as any);
    } else {
      alert("Please drop a valid CSV file");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New SME
          </DialogTitle>
          <DialogDescription>
            Add a single SME or import multiple SMEs from a CSV file.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Add Single SME</TabsTrigger>
            <TabsTrigger value="import">Import from CSV</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Business Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter business name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name *</Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) =>
                    handleInputChange("ownerName", e.target.value)
                  }
                  placeholder="Enter owner name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number *</Label>
                <Input
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    handleInputChange("contactNumber", e.target.value)
                  }
                  placeholder="Enter contact number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="municipality">Municipality *</Label>
                <Select
                  value={formData.municipality}
                  onValueChange={(value) =>
                    handleInputChange("municipality", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select municipality" />
                  </SelectTrigger>
                  <SelectContent>
                    {municipalities.map((municipality) => (
                      <SelectItem key={municipality} value={municipality}>
                        {municipality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Business Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessLicense">Business License</Label>
                <Input
                  id="businessLicense"
                  value={formData.businessLicense}
                  onChange={(e) =>
                    handleInputChange("businessLicense", e.target.value)
                  }
                  placeholder="Enter business license number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceRange">Price Range</Label>
                <Input
                  id="priceRange"
                  value={formData.priceRange}
                  onChange={(e) =>
                    handleInputChange("priceRange", e.target.value)
                  }
                  placeholder="e.g., ₱100-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="operatingHours">Operating Hours</Label>
                <Input
                  id="operatingHours"
                  value={formData.operatingHours}
                  onChange={(e) =>
                    handleInputChange("operatingHours", e.target.value)
                  }
                  placeholder="e.g., 9:00 AM - 6:00 PM"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="Enter website URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude (Optional)</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.coordinates.latitude}
                  onChange={(e) =>
                    handleCoordinateChange("latitude", e.target.value)
                  }
                  placeholder="e.g., 13.7563"
                />
                <p className="text-xs text-gray-500">
                  Decimal degrees format (e.g., 13.7563 for Batangas City).
                  Leave empty for automatic geocoding.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude (Optional)</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.coordinates.longitude}
                  onChange={(e) =>
                    handleCoordinateChange("longitude", e.target.value)
                  }
                  placeholder="e.g., 121.0583"
                />
                <p className="text-xs text-gray-500">
                  Decimal degrees format (e.g., 121.0583 for Batangas City).
                  Leave empty for automatic geocoding.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter complete address"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Business Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe the business and its services"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Payment Methods</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {paymentMethods.map((method) => (
                  <label key={method} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.paymentMethods.includes(method)}
                      onChange={() => handlePaymentMethodToggle(method)}
                      className="rounded"
                    />
                    <span className="text-sm">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmitSingle}>Add SME</Button>
            </div>
          </TabsContent>

          <TabsContent value="import" className="space-y-6">
            <div className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragOver
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Upload CSV File</h3>
                  <p className="text-sm text-gray-500">
                    Upload a CSV file with SME data. The file should include
                    columns for: name, ownerName, email, contactNumber,
                    municipality, category, address, description. Latitude and
                    longitude are optional.
                  </p>
                  <div className="mt-4">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="csv-upload"
                    />
                    <label htmlFor="csv-upload" className="cursor-pointer">
                      <Button variant="outline" icon={FileText}>
                        Choose CSV File
                      </Button>
                    </label>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    or drag and drop your CSV file here
                  </p>
                </div>
              </div>

              {selectedFile && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">{selectedFile.name}</span>
                    <span className="text-sm text-gray-500">
                      ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  CSV Format Requirements:
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• First row should contain column headers</li>
                  <li>
                    • Required columns: name, ownerName, email, contactNumber,
                    municipality, category
                  </li>
                  <li>
                    • Optional columns: address, description, businessLicense,
                    operatingHours, website, priceRange, latitude, longitude
                  </li>
                  <li>
                    • Payment methods should be comma-separated values in a
                    single column
                  </li>
                  <li>
                    • Latitude and longitude are optional - can be left empty
                    for automatic geocoding
                  </li>
                  <li>
                    • If provided, coordinates should be decimal degrees (e.g.,
                    13.7563, 121.0583)
                  </li>
                  <li>• File size should be less than 5MB</li>
                </ul>
                <div className="mt-3">
                  <a
                    href="/sme-import-template.csv"
                    download
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                  >
                    Download CSV Template
                  </a>
                </div>
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Note:</strong> If latitude and longitude are left
                    empty, the system will automatically geocode the address
                    when the SME is displayed on the map.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleImportCSV} disabled={!selectedFile}>
                Import SMEs
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
