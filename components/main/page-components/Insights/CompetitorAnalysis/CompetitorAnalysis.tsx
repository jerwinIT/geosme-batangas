"use client";

import { useState, useMemo } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Search,
  Target,
  Users,
  Building2,
  Navigation,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Phone,
  Mail,
  Globe,
  Map,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Circle,
  Zap,
  Lightbulb,
  Award,
  Eye,
  Filter,
  Info,
} from "lucide-react";
import { Business } from "@/types";
import { dummyBusinesses } from "@/data/BusinessDataDummy";

interface CompetitorAnalysisResult {
  selectedBusiness: Business;
  competitors: Business[];
  radius: number;
  totalCompetitors: number;
  averageRating: number;
  marketSaturation: "Low" | "Medium" | "High";
  recommendations: string[];
}

// Haversine formula to calculate distance between two points
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

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

const radiusOptions = [
  { value: 0.5, label: "0.5 km" },
  { value: 1, label: "1 km" },
  { value: 2, label: "2 km" },
  { value: 5, label: "5 km" },
  { value: 10, label: "10 km" },
];

const categories = Array.from(
  new Set(businessesWithCoordinates.map((b) => b.category))
).sort();

export default function CompetitorAnalysis() {
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>("");
  const [selectedRadius, setSelectedRadius] = useState<number>(1);
  const [analysisResult, setAnalysisResult] =
    useState<CompetitorAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const selectedBusiness = useMemo(() => {
    return businessesWithCoordinates.find((b) => b.id === selectedBusinessId);
  }, [selectedBusinessId]);

  const performAnalysis = () => {
    if (!selectedBusiness?.coordinates) return;

    setIsAnalyzing(true);

    // Simulate API call delay
    setTimeout(() => {
      const competitors = businessesWithCoordinates.filter((business) => {
        if (
          business.id === selectedBusiness.id ||
          business.category !== selectedBusiness.category ||
          !business.coordinates ||
          !selectedBusiness.coordinates
        ) {
          return false;
        }

        const distance = calculateDistance(
          selectedBusiness.coordinates.latitude,
          selectedBusiness.coordinates.longitude,
          business.coordinates.latitude,
          business.coordinates.longitude
        );

        return distance <= selectedRadius;
      });

      const totalCompetitors = competitors.length;
      const averageRating =
        competitors.length > 0
          ? competitors.reduce((sum, comp) => sum + comp.rating, 0) /
            competitors.length
          : 0;

      let marketSaturation: "Low" | "Medium" | "High";
      if (totalCompetitors <= 2) marketSaturation = "Low";
      else if (totalCompetitors <= 5) marketSaturation = "Medium";
      else marketSaturation = "High";

      const recommendations = [];
      if (marketSaturation === "Low") {
        recommendations.push(
          "Market opportunity available - consider expanding"
        );
        recommendations.push(
          "Focus on quality and customer service to establish dominance"
        );
      } else if (marketSaturation === "Medium") {
        recommendations.push(
          "Competitive market - differentiate your offerings"
        );
        recommendations.push("Consider niche specialization to stand out");
      } else {
        recommendations.push(
          "Highly competitive market - focus on unique value proposition"
        );
        recommendations.push(
          "Consider exploring adjacent categories or locations"
        );
      }

      if (averageRating > selectedBusiness.rating) {
        recommendations.push(
          "Competitors have higher ratings - improve service quality"
        );
      }

      setAnalysisResult({
        selectedBusiness,
        competitors,
        radius: selectedRadius,
        totalCompetitors,
        averageRating,
        marketSaturation,
        recommendations,
      });

      setIsAnalyzing(false);
    }, 1000);
  };

  const getMarketSaturationColor = (saturation: string) => {
    switch (saturation) {
      case "Low":
        return "text-green-600 bg-green-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "High":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Enhanced Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            <Target className="h-4 w-4" />
            Business Intelligence Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Competitor Analysis
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Unlock market insights by analyzing your competition. Select a
            business and radius to discover nearby competitors in the same
            category. Get actionable intelligence to drive strategic decisions.
          </p>
        </div>

        {/* Analysis Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Analysis Parameters
            </CardTitle>
            <CardDescription>
              Select a business and radius to analyze competitors in the same
              category
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="business-select">Select Business</Label>
                <Select
                  value={selectedBusinessId}
                  onValueChange={setSelectedBusinessId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a business to analyze" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessesWithCoordinates.map((business) => (
                      <SelectItem key={business.id} value={business.id}>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          {business.name} - {business.category}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="radius-select">Analysis Radius</Label>
                <Select
                  value={selectedRadius.toString()}
                  onValueChange={(value) => setSelectedRadius(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select radius" />
                  </SelectTrigger>
                  <SelectContent>
                    {radiusOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
                        <div className="flex items-center gap-2">
                          <Navigation className="h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={performAnalysis}
              disabled={!selectedBusinessId || isAnalyzing}
              className="w-full md:w-auto"
            >
              {isAnalyzing ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Analyze Competitors
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Total Competitors</p>
                      <p className="text-2xl font-bold">
                        {analysisResult.totalCompetitors}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm text-gray-600">
                        Avg. Competitor Rating
                      </p>
                      <p className="text-2xl font-bold">
                        {analysisResult.averageRating.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Market Saturation</p>
                      <Badge
                        className={`${getMarketSaturationColor(
                          analysisResult.marketSaturation
                        )}`}
                      >
                        {analysisResult.marketSaturation}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Analysis Radius</p>
                      <p className="text-2xl font-bold">
                        {analysisResult.radius} km
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Selected Business Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Selected Business
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <img
                    src={analysisResult.selectedBusiness.imageUrl}
                    alt={analysisResult.selectedBusiness.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {analysisResult.selectedBusiness.name}
                    </h3>
                    <p className="text-gray-600">
                      {analysisResult.selectedBusiness.category}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">
                          {analysisResult.selectedBusiness.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {analysisResult.selectedBusiness.municipality}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Competitors List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Competitors Found ({analysisResult.competitors.length})
                </CardTitle>
                <CardDescription>
                  Businesses in the same category within {analysisResult.radius}{" "}
                  km radius
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analysisResult.competitors.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      No competitors found in the same category within the
                      specified radius.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {analysisResult.competitors.map((competitor) => (
                      <div
                        key={competitor.id}
                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <img
                          src={competitor.imageUrl}
                          alt={competitor.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">
                                {competitor.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {competitor.municipality}
                              </p>
                              <div className="flex items-center gap-4 mt-1">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                  <span className="text-sm">
                                    {competitor.rating}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                  {competitor.priceRange}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {competitor.rating >
                              analysisResult.selectedBusiness.rating ? (
                                <TrendingUp className="h-4 w-4 text-red-500" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                          </div>
                          {competitor.description && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                              {competitor.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-2">
                            {competitor.contactNumber && (
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Phone className="h-3 w-3" />
                                {competitor.contactNumber}
                              </div>
                            )}
                            {competitor.website && (
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Globe className="h-3 w-3" />
                                {competitor.website}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Strategic Recommendations
                </CardTitle>
                <CardDescription>
                  Actionable insights based on your competitor analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisResult.recommendations.map(
                    (recommendation, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
                      >
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">
                          {recommendation}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Market Map Visualization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  Market Visualization
                </CardTitle>
                <CardDescription>
                  Visual representation of your business and competitors in the
                  market
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Map className="h-12 w-12 text-gray-400 mx-auto" />
                    <p className="text-gray-600">
                      Interactive map visualization
                    </p>
                    <p className="text-sm text-gray-500">
                      Map showing {analysisResult.selectedBusiness.name} and{" "}
                      {analysisResult.competitors.length} competitors within{" "}
                      {analysisResult.radius} km radius
                    </p>
                  </div>

                  {/* Simple visual representation */}
                  <div className="absolute inset-4 flex items-center justify-center">
                    <div className="relative">
                      {/* Center point (selected business) */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Circle className="h-6 w-6 text-blue-600 fill-current" />
                      </div>

                      {/* Competitor points */}
                      {analysisResult.competitors
                        .slice(0, 8)
                        .map((_, index) => (
                          <div
                            key={index}
                            className="absolute"
                            style={{
                              top: `${20 + (index % 3) * 30}%`,
                              left: `${20 + Math.floor(index / 3) * 30}%`,
                            }}
                          >
                            <Circle className="h-4 w-4 text-red-500 fill-current" />
                          </div>
                        ))}

                      {/* Radius circle */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-gray-400 rounded-full w-32 h-32"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Instructions */}
        {!analysisResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                How to Use Competitor Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Select a Business</p>
                    <p className="text-sm text-gray-600">
                      Choose the business you want to analyze from the dropdown
                      menu
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Set Analysis Radius</p>
                    <p className="text-sm text-gray-600">
                      Choose the distance radius to search for competitors
                      (0.5km to 10km)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Analyze Results</p>
                    <p className="text-sm text-gray-600">
                      Review competitor information, market saturation, and
                      strategic recommendations
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
