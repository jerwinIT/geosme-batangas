"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/common/button";
import {
  Clock,
  Plus,
  SearchCheck,
  CheckCircle2,
  CircleX,
  Filter,
  Upload,
  Import,
  Settings,
  MapPin,
  Layers,
  Target,
  BarChart3,
  Globe,
  Download,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter as FilterIcon,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Navigation,
  Info,
  Star,
  Building,
  Users,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import DashboardWidget from "@/components/admin/ui/DashboardWidget";
import { SearchBar } from "@/components/common";
import { Business } from "@/types";
import { dummyBusinesses } from "@/data/BusinessDataDummy";
import { Municipalities } from "@/data/Municipalities";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import InteractiveMap from "@/components/admin/ui/InteractiveMap";
import LocationManagementDialog from "@/components/admin/ui/LocationManagementDialog";

// Add coordinates to businesses for demo purposes
const businessesWithCoordinates: Business[] = dummyBusinesses.map(
  (business, index) => ({
    ...business,
    coordinates: {
      latitude: 13.7563 + (Math.random() - 0.5) * 0.5, // Batangas area coordinates
      longitude: 121.0583 + (Math.random() - 0.5) * 0.5,
    },
  })
);

interface MapFilter {
  municipality: string;
  category: string;
  status: string;
  search: string;
}

interface LocationQualityMetrics {
  totalLocations: number;
  verifiedLocations: number;
  pendingVerification: number;
  missingCoordinates: number;
  duplicateLocations: number;
  qualityScore: number;
}

export default function MapManagementPage() {
  const [filters, setFilters] = useState<MapFilter>({
    municipality: "all",
    category: "all",
    status: "all",
    search: "",
  });
  const [selectedLocation, setSelectedLocation] = useState<Business | null>(
    null
  );
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [mapView, setMapView] = useState<"standard" | "satellite" | "heatmap">(
    "standard"
  );
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [locationDialogMode, setLocationDialogMode] = useState<"add" | "edit">(
    "add"
  );
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);

  // Filter businesses based on current filters
  const filteredBusinesses = useMemo(() => {
    return businessesWithCoordinates.filter((business) => {
      const matchesMunicipality =
        filters.municipality === "all" ||
        business.municipality === filters.municipality;
      const matchesCategory =
        filters.category === "all" || business.category === filters.category;
      const matchesStatus =
        filters.status === "all" || business.status === filters.status;
      const matchesSearch =
        !filters.search ||
        business.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        business.ownerName
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        business.address?.toLowerCase().includes(filters.search.toLowerCase());

      return (
        matchesMunicipality && matchesCategory && matchesStatus && matchesSearch
      );
    });
  }, [filters]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = businessesWithCoordinates.length;
    const verified = businessesWithCoordinates.filter((b) => b.verified).length;
    const pending = businessesWithCoordinates.filter(
      (b) => b.status === "pending"
    ).length;
    const missingCoords = businessesWithCoordinates.filter(
      (b) => !b.coordinates
    ).length;
    const qualityScore = Math.round(
      ((verified / total) * 0.6 + ((total - pending) / total) * 0.4) * 100
    );

    return {
      totalLocations: total,
      published: verified,
      pending,
      issues: missingCoords + pending,
      qualityScore,
    };
  }, []);

  // Calculate location quality metrics
  const locationQualityMetrics: LocationQualityMetrics = useMemo(() => {
    const total = businessesWithCoordinates.length;
    const verified = businessesWithCoordinates.filter((b) => b.verified).length;
    const pending = businessesWithCoordinates.filter(
      (b) => b.status === "pending"
    ).length;
    const missingCoords = businessesWithCoordinates.filter(
      (b) => !b.coordinates
    ).length;
    const qualityScore = Math.round(
      ((verified / total) * 0.6 + ((total - pending) / total) * 0.4) * 100
    );

    return {
      totalLocations: total,
      verifiedLocations: verified,
      pendingVerification: pending,
      missingCoordinates: missingCoords,
      duplicateLocations: 0, // Would be calculated based on proximity
      qualityScore,
    };
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(
      new Set(businessesWithCoordinates.map((b) => b.category))
    ).sort();
  }, []);

  const handleLocationSelect = (business: Business) => {
    setSelectedLocation(business);
    setIsLocationDialogOpen(true);
  };

  const handleAddLocation = () => {
    setLocationDialogMode("add");
    setEditingBusiness(null);
    setIsLocationDialogOpen(true);
  };

  const handleEditLocation = (business: Business) => {
    setLocationDialogMode("edit");
    setEditingBusiness(business);
    setIsLocationDialogOpen(true);
  };

  const handleSaveLocation = async (businessData: Partial<Business>) => {
    // This would typically call an API to save the location
    console.log("Saving location:", businessData);
    // For now, just close the dialog
    setIsLocationDialogOpen(false);
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
    <div className="py-4 px-4 grid gap-6">
      {/* Header section with title, description, and buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-text">
            Map Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and verify registered SMEs in Batangas on the map
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" icon={Import}>
            Import Locations
          </Button>
          <Button icon={Plus} onClick={handleAddLocation}>
            Add Location
          </Button>
        </div>
      </div>

      {/* Dashboard widgets */}
      <div className="w-full">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <DashboardWidget
            title="Total Locations"
            value={metrics.totalLocations}
            icon={<MapPin />}
          />
          <DashboardWidget
            title="Published"
            value={metrics.published}
            icon={<SearchCheck />}
          />
          <DashboardWidget
            title="Pending"
            value={metrics.pending}
            icon={<CheckCircle2 />}
          />
          <DashboardWidget
            title="Issues"
            value={metrics.issues}
            icon={<CircleX />}
          />
        </div>
      </div>

      {/* Map Controls and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Map Container */}
        <div className="flex-1">
          <Card className="h-[600px]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Interactive Map
                  </CardTitle>
                  <CardDescription>
                    View all locations on the map and filter by municipality
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={mapView}
                    onValueChange={(value: any) => setMapView(value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="satellite">Satellite</SelectItem>
                      <SelectItem value="heatmap">Heatmap</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Layers}
                    onClick={() => setShowHeatmap(!showHeatmap)}
                  >
                    {showHeatmap ? "Hide" : "Show"} Heatmap
                  </Button>
                  <Button variant="outline" size="sm" icon={Settings}>
                    Settings
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-full">
              <InteractiveMap
                businesses={filteredBusinesses}
                selectedBusiness={selectedLocation}
                onBusinessSelect={handleLocationSelect}
                mapView={mapView}
                showHeatmap={showHeatmap}
                filters={filters}
              />
            </CardContent>
          </Card>
        </div>

        {/* Map Controls Sidebar */}
        <div className="w-full lg:w-80 space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilterIcon className="h-5 w-5" />
                Map Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Municipality</Label>
                <Select
                  value={filters.municipality}
                  onValueChange={(value) =>
                    setFilters({ ...filters, municipality: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select municipality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Municipalities</SelectItem>
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
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={filters.category}
                  onValueChange={(value) =>
                    setFilters({ ...filters, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) =>
                    setFilters({ ...filters, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Search</Label>
                <Input
                  placeholder="Search locations..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={RefreshCw}
                  onClick={() =>
                    setFilters({
                      municipality: "all",
                      category: "all",
                      status: "all",
                      search: "",
                    })
                  }
                  className="flex-1"
                >
                  Reset
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Target}
                  className="flex-1"
                >
                  Center Map
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                icon={ZoomIn}
                className="w-full justify-start"
              >
                Zoom to Fit All
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={Navigation}
                className="w-full justify-start"
              >
                Show Route
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={BarChart3}
                className="w-full justify-start"
              >
                Show Analytics
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={Download}
                className="w-full justify-start"
              >
                Export Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {/* Municipality Coverage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Municipality Coverage
            </CardTitle>
            <CardDescription>
              SME distribution across municipalities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {Municipalities.filter((m) => m.id !== "all")
                .slice(0, 10)
                .map((municipality) => {
                  const businessCount = businessesWithCoordinates.filter(
                    (b) => b.municipality === municipality.name
                  ).length;
                  const percentage = Math.round(
                    (businessCount / metrics.totalLocations) * 100
                  );

                  return (
                    <div
                      key={municipality.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary-600">
                            {municipality.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {municipality.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {businessCount} businesses
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{percentage}%</p>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        {/* Location Quality Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Location Quality Metrics
            </CardTitle>
            <CardDescription>
              Data quality and verification status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Overall Quality Score
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary-600">
                    {locationQualityMetrics.qualityScore}%
                  </span>
                  {locationQualityMetrics.qualityScore >= 80 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {locationQualityMetrics.verifiedLocations}
                  </div>
                  <div className="text-xs text-green-700">Verified</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {locationQualityMetrics.pendingVerification}
                  </div>
                  <div className="text-xs text-yellow-700">Pending</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {locationQualityMetrics.missingCoordinates}
                  </div>
                  <div className="text-xs text-red-700">Missing Coords</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {locationQualityMetrics.duplicateLocations}
                  </div>
                  <div className="text-xs text-blue-700">Duplicates</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Data Completeness</span>
                  <span className="font-semibold">85%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Locations Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Management
              </CardTitle>
              <CardDescription>
                Manage and verify SME locations on the map
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" icon={Upload}>
                Export
              </Button>
              <Button variant="outline" icon={Import}>
                Import
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Coordinates</TableHead>
                  <TableHead>Quality</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBusinesses.slice(0, 10).map((business) => (
                  <TableRow key={business.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary-600">
                            {business.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{business.name}</div>
                          <div className="text-sm text-gray-500">
                            {business.category}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {business.municipality}
                        </div>
                        <div className="text-gray-500">{business.address}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(business.status)}</TableCell>
                    <TableCell>
                      {business.coordinates ? (
                        <div className="text-sm font-mono">
                          <div>{business.coordinates.latitude.toFixed(6)}</div>
                          <div>{business.coordinates.longitude.toFixed(6)}</div>
                        </div>
                      ) : (
                        <Badge variant="destructive">Missing</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {business.verified ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                        <span className="text-sm">
                          {business.verified ? "Verified" : "Unverified"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <Filter className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleLocationSelect(business)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditLocation(business)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Location
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MapPin className="mr-2 h-4 w-4" />
                            Update Coordinates
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Verify Location
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Target className="mr-2 h-4 w-4" />
                            Center on Map
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Location
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Location Management Dialog */}
      <LocationManagementDialog
        isOpen={isLocationDialogOpen}
        onClose={() => setIsLocationDialogOpen(false)}
        business={editingBusiness}
        mode={locationDialogMode}
        onSave={handleSaveLocation}
      />
    </div>
  );
}
