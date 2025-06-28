"use client";

import { useState } from "react";
import { Button } from "@/components/common/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Building,
  User,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Business } from "@/types";

interface DocumentViewerProps {
  business: Business;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (businessId: string) => void;
  onReject: (businessId: string) => void;
  onDownload: (businessId: string) => void;
}

export function DocumentViewer({
  business,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onDownload,
}: DocumentViewerProps) {
  const [activeTab, setActiveTab] = useState<"documents" | "details">(
    "documents"
  );

  const documents = [
    {
      name: "Business Registration Certificate",
      type: "PDF",
      size: "2.3 MB",
      uploaded: "2024-01-15",
      status: "verified",
    },
    {
      name: "Mayor's Permit",
      type: "PDF",
      size: "1.8 MB",
      uploaded: "2024-01-15",
      status: "pending",
    },
    {
      name: "DTI Certificate",
      type: "PDF",
      size: "3.1 MB",
      uploaded: "2024-01-15",
      status: "verified",
    },
    {
      name: "Barangay Clearance",
      type: "PDF",
      size: "1.2 MB",
      uploaded: "2024-01-15",
      status: "pending",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Document Verification - {business.name}
          </DialogTitle>
          <DialogDescription>
            Review business documents and verify compliance
          </DialogDescription>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex space-x-1 border-b">
          <button
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === "documents"
                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FileText className="w-4 h-4 mr-2 inline" />
            Documents
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === "details"
                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Eye className="w-4 h-4 mr-2 inline" />
            Business Details
          </button>
        </div>

        {activeTab === "documents" && (
          <div className="space-y-4">
            {/* Document List */}
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-sm text-gray-500">
                        {doc.type} • {doc.size} • Uploaded {doc.uploaded}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(doc.status)}
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={() => onDownload(business.id)}>
                <Download className="w-4 h-4 mr-2" />
                Download All Documents
              </Button>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="border-red-200 text-red-700 hover:bg-red-50"
                  onClick={() => onReject(business.id)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button onClick={() => onApprove(business.id)}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "details" && (
          <div className="space-y-6">
            {/* Business Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Business Name
                </label>
                <p className="text-sm">{business.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Category
                </label>
                <p className="text-sm">{business.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Owner Name
                </label>
                <p className="text-sm">{business.ownerName || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Contact Number
                </label>
                <p className="text-sm">{business.contactNumber || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="text-sm">{business.email || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Municipality
                </label>
                <p className="text-sm">{business.municipality}</p>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-500">
                  Address
                </label>
                <p className="text-sm">{business.address || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Business License
                </label>
                <p className="text-sm">{business.businessLicense || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Registration Date
                </label>
                <p className="text-sm">
                  {business.registrationDate
                    ? new Date(business.registrationDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-500">
                Description
              </label>
              <p className="text-sm mt-1">
                {business.description || "No description provided"}
              </p>
            </div>

            {/* Operating Hours */}
            <div>
              <label className="text-sm font-medium text-gray-500">
                Operating Hours
              </label>
              <p className="text-sm mt-1">
                {business.operatingHours || "Not specified"}
              </p>
            </div>

            {/* Payment Methods */}
            <div>
              <label className="text-sm font-medium text-gray-500">
                Payment Methods
              </label>
              <div className="flex flex-wrap gap-2 mt-1">
                {business.paymentMethods.map((method, index) => (
                  <Badge key={index} variant="secondary">
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
