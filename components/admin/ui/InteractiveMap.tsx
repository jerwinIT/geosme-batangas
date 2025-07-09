"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/common/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  ZoomIn,
  ZoomOut,
  Navigation,
  Layers,
  Target,
  Globe,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Search,
} from "lucide-react";
import { Business } from "@/types";
import { cn } from "@/lib/utils";

interface InteractiveMapProps {
  businesses: Business[];
  selectedBusiness?: Business | null;
  onBusinessSelect?: (business: Business) => void;
  mapView?: "standard" | "satellite" | "heatmap";
  showHeatmap?: boolean;
  filters?: {
    municipality: string;
    category: string;
    status: string;
  };
  className?: string;
}

interface MapMarker {
  id: string;
  position: { lat: number; lng: number };
  business: Business;
  isSelected: boolean;
}

export default function InteractiveMap({
  businesses,
  selectedBusiness,
  onBusinessSelect,
  mapView = "standard",
  showHeatmap = false,
  filters,
  className,
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [mapCenter, setMapCenter] = useState({ lat: 13.7563, lng: 121.0583 }); // Batangas center
  const [zoom, setZoom] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  // Generate markers from businesses
  useEffect(() => {
    const newMarkers: MapMarker[] = businesses
      .filter((business) => business.coordinates)
      .map((business) => ({
        id: business.id,
        position: {
          lat: business.coordinates!.latitude,
          lng: business.coordinates!.longitude,
        },
        business,
        isSelected: selectedBusiness?.id === business.id,
      }));

    setMarkers(newMarkers);
  }, [businesses, selectedBusiness]);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: Business["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      case "under_review":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: Business["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-3 w-3" />;
      case "pending":
        return <Clock className="h-3 w-3" />;
      case "rejected":
        return <XCircle className="h-3 w-3" />;
      case "under_review":
        return <Search className="h-3 w-3" />;
      default:
        return <AlertTriangle className="h-3 w-3" />;
    }
  };

  const handleMarkerClick = (business: Business) => {
    onBusinessSelect?.(business);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 1, 20));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 1, 1));
  };

  const handleCenterMap = () => {
    setMapCenter({ lat: 13.7563, lng: 121.0583 });
    setZoom(10);
  };

  const handleFitBounds = () => {
    if (markers.length === 0) return;

    const lats = markers.map((m) => m.position.lat);
    const lngs = markers.map((m) => m.position.lng);
    const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
    const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;

    setMapCenter({ lat: centerLat, lng: centerLng });
    setZoom(12);
  };

  if (isLoading) {
    return (
      <Card className={cn("h-[600px]", className)}>
        <CardContent className="p-0 h-full">
          <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("h-[600px]", className)}>
      <CardContent className="p-0 h-full relative">
        {/* Map Container */}
        <div
          ref={mapRef}
          className="w-full h-full bg-gray-100 rounded-lg relative overflow-hidden"
        >
          {/* Map Background */}
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative">
            {/* Simulated map tiles */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-8 h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 bg-white"
                  ></div>
                ))}
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                className="w-10 h-10 p-0"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                className="w-10 h-10 p-0"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCenterMap}
                className="w-10 h-10 p-0"
              >
                <Target className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFitBounds}
                className="w-10 h-10 p-0"
              >
                <Navigation className="h-4 w-4" />
              </Button>
            </div>

            {/* Map Info */}
            <div className="absolute top-4 left-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-primary-600" />
                  <span className="text-sm font-semibold">
                    Batangas Province
                  </span>
                </div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div>Zoom: {zoom}</div>
                  <div>Markers: {markers.length}</div>
                  <div>View: {mapView}</div>
                  {showHeatmap && (
                    <Badge variant="outline" className="text-xs">
                      Heatmap Active
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Map Markers */}
            {markers.map((marker) => (
              <div
                key={marker.id}
                className={cn(
                  "absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all duration-200 hover:scale-125",
                  getStatusColor(marker.business.status),
                  marker.isSelected && "ring-4 ring-primary-400 scale-125"
                )}
                style={{
                  left: `${50 + (marker.position.lng - 121.0583) * 1000}%`,
                  top: `${50 - (marker.position.lat - 13.7563) * 1000}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => handleMarkerClick(marker.business)}
                title={`${marker.business.name} - ${marker.business.municipality}`}
              >
                <div className="w-full h-full flex items-center justify-center text-white">
                  {getStatusIcon(marker.business.status)}
                </div>
              </div>
            ))}

            {/* Heatmap Overlay */}
            {showHeatmap && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Simulated heatmap areas */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-red-400 opacity-30 rounded-full blur-md"></div>
                <div className="absolute bottom-32 right-32 w-40 h-40 bg-red-600 opacity-30 rounded-full blur-md"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-400 opacity-30 rounded-full blur-md"></div>
                <div className="absolute bottom-20 left-32 w-20 h-20 bg-green-400 opacity-30 rounded-full blur-md"></div>
              </div>
            )}

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-xs font-semibold mb-2">Legend</div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Rejected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Under Review</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Business Info */}
            {selectedBusiness && (
              <div className="absolute bottom-4 right-4 max-w-xs">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary-600">
                        {selectedBusiness.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">
                        {selectedBusiness.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {selectedBusiness.category}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedBusiness.municipality}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {getStatusBadge(selectedBusiness.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Map Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600">Loading map data...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getStatusBadge(status: Business["status"]) {
  const baseClasses =
    "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold";

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
          className={cn(baseClasses, "bg-red-100 text-red-800 border-red-200")}
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
}
