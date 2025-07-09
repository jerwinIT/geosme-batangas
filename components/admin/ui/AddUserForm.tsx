"use client";

import { useState } from "react";
import { Button } from "@/components/common/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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

interface AddUserFormProps {
  onAddUser?: (userData: any) => void;
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

const userRoles = [
  { value: "regular_user", label: "Regular User" },
  { value: "sme_owner", label: "SME Owner" },
  { value: "admin", label: "Admin" },
];

const userStatuses = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
  { value: "suspended", label: "Suspended" },
];

export function AddUserForm({
  onAddUser,
  onImportCSV,
  isOpen,
  onClose,
}: AddUserFormProps) {
  const [activeTab, setActiveTab] = useState("single");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    municipality: "",
    role: "regular_user" as const,
    status: "active" as const,
    businessName: "",
    businessId: "",
    isVerified: false,
    permissions: [] as string[],
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleSubmitSingle = () => {
    if (onAddUser) {
      onAddUser(formData);
    }
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      municipality: "",
      role: "regular_user",
      status: "active",
      businessName: "",
      businessId: "",
      isVerified: false,
      permissions: [],
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New User
          </DialogTitle>
          <DialogDescription>
            Add a single user or import multiple users from a CSV file.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Add Single User</TabsTrigger>
            <TabsTrigger value="import">Import from CSV</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
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
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="municipality">Municipality</Label>
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
                <Label htmlFor="role">User Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">User Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {userStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) =>
                    handleInputChange("businessName", e.target.value)
                  }
                  placeholder="Enter business name (for SME owners)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessId">Business ID</Label>
                <Input
                  id="businessId"
                  value={formData.businessId}
                  onChange={(e) =>
                    handleInputChange("businessId", e.target.value)
                  }
                  placeholder="Enter business ID (for SME owners)"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isVerified}
                  onChange={(e) =>
                    handleInputChange("isVerified", e.target.checked)
                  }
                  className="rounded"
                />
                <span>Verified User</span>
              </Label>
              <p className="text-xs text-gray-500">
                Check this if the user has been verified through email or phone
                verification
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmitSingle}>Add User</Button>
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
                    Upload a CSV file with user data. The file should include
                    columns for: name, email, phone, municipality, role, status,
                    businessName
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
                  <li>• Required columns: name, email, role, status</li>
                  <li>
                    • Optional columns: phone, municipality, businessName,
                    businessId, isVerified
                  </li>
                  <li>• Role values: regular_user, sme_owner, admin</li>
                  <li>• Status values: active, inactive, pending, suspended</li>
                  <li>• isVerified should be true/false or 1/0</li>
                  <li>• File size should be less than 5MB</li>
                </ul>
                <div className="mt-3">
                  <a
                    href="/user-import-template.csv"
                    download
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                  >
                    Download CSV Template
                  </a>
                </div>
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Note:</strong> Users will be created with default
                    permissions based on their role.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleImportCSV} disabled={!selectedFile}>
                Import Users
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
