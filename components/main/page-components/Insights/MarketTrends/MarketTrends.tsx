"use client";

import { useState } from "react";
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
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  MapPin,
  Calendar,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Navigation,
  Building2,
} from "lucide-react";

interface CategoryTrend {
  category: string;
  count: number;
  growth: number;
  color: string;
  hotspots: string[];
}

interface MunicipalityData {
  municipality: string;
  totalSMEs: number;
  dominantCategory: string;
  marketOpportunity: string;
  opportunityLevel: "High" | "Medium" | "Low";
  footTraffic: "High" | "Medium" | "Low";
}

const categoryTrends: CategoryTrend[] = [
  {
    category: "Food & Beverage",
    count: 342,
    growth: 25.3,
    color: "bg-red-500",
    hotspots: ["Lipa City", "Batangas City", "Tanauan City"],
  },
  {
    category: "Retail & Commerce",
    count: 298,
    growth: 18.7,
    color: "bg-blue-500",
    hotspots: ["Batangas City", "Santo Tomas", "Malvar"],
  },
  {
    category: "Agri-business",
    count: 256,
    growth: 12.4,
    color: "bg-green-500",
    hotspots: ["Santo Tomas", "Taal", "San Juan"],
  },
  {
    category: "Services",
    count: 234,
    growth: 8.9,
    color: "bg-purple-500",
    hotspots: ["Lipa City", "Batangas City", "Lemery"],
  },
  {
    category: "Manufacturing",
    count: 189,
    growth: 6.2,
    color: "bg-orange-500",
    hotspots: ["Tanauan City", "Malvar", "Santo Tomas"],
  },
  {
    category: "Technology",
    count: 145,
    growth: 32.1,
    color: "bg-cyan-500",
    hotspots: ["Lipa City", "Batangas City", "Tanauan City"],
  },
  {
    category: "Tourism & Hospitality",
    count: 123,
    growth: -2.3,
    color: "bg-pink-500",
    hotspots: ["Nasugbu", "Calatagan", "Lemery"],
  },
];

const municipalityData: MunicipalityData[] = [
  {
    municipality: "Lipa City",
    totalSMEs: 387,
    dominantCategory: "Food & Beverage",
    marketOpportunity: "Technology Services",
    opportunityLevel: "High",
    footTraffic: "High",
  },
  {
    municipality: "Batangas City",
    totalSMEs: 342,
    dominantCategory: "Retail & Commerce",
    marketOpportunity: "Manufacturing",
    opportunityLevel: "Medium",
    footTraffic: "High",
  },
  {
    municipality: "Tanauan City",
    totalSMEs: 298,
    dominantCategory: "Manufacturing",
    marketOpportunity: "Food & Beverage",
    opportunityLevel: "High",
    footTraffic: "Medium",
  },
  {
    municipality: "Santo Tomas",
    totalSMEs: 256,
    dominantCategory: "Agri-business",
    marketOpportunity: "Technology",
    opportunityLevel: "High",
    footTraffic: "Medium",
  },
  {
    municipality: "Nasugbu",
    totalSMEs: 189,
    dominantCategory: "Tourism",
    marketOpportunity: "Food & Beverage",
    opportunityLevel: "Medium",
    footTraffic: "High",
  },
];

const dateRanges = [
  "Last 3 Months",
  "Last 6 Months",
  "Last Year",
  "Last 2 Years",
  "All Time",
];

const categories = [
  "All Categories",
  ...categoryTrends.map((trend) => trend.category),
];

const keyInsights = [
  {
    title: "Food & Beverage Dominance",
    description:
      "Food & Beverage SMEs have grown 25% with highest concentration in urban areas like Lipa and Batangas City",
    trend: "up",
    value: "+25%",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Technology Sector Opportunity",
    description:
      "Technology SMEs showing 32% growth but still underrepresented in most municipalities",
    trend: "up",
    value: "+32%",
    icon: ArrowUpRight,
    color: "text-green-600",
  },
  {
    title: "Agricultural Hub Potential",
    description:
      "Santo Tomas and Taal show strong agri-business concentration with market expansion opportunities",
    trend: "peak",
    value: "High Potential",
    icon: Target,
    color: "text-blue-600",
  },
  {
    title: "Tourism Recovery Needed",
    description:
      "Coastal municipalities like Nasugbu show -2.3% decline in tourism SMEs despite high foot traffic",
    trend: "down",
    value: "-2.3%",
    icon: ArrowDownRight,
    color: "text-red-600",
  },
];

const marketOpportunities = [
  {
    opportunity: "Technology Services Gap",
    locations: ["Santo Tomas", "Malvar", "Taal"],
    potential: "High",
    description: "Low tech SME density despite growing demand",
  },
  {
    opportunity: "Food & Beverage Expansion",
    locations: ["Tanauan City", "San Juan", "Lemery"],
    potential: "Medium",
    description: "High foot traffic areas with room for F&B growth",
  },
  {
    opportunity: "Tourism Recovery",
    locations: ["Nasugbu", "Calatagan"],
    potential: "High",
    description: "Coastal areas with tourism potential but declining SMEs",
  },
];

export default function MarketTrends() {
  const [selectedDateRange, setSelectedDateRange] = useState("Last Year");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (
    <div className="container mx-auto p-4 space-y-6 pt-20">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Market Trends & Opportunities
        </h1>
        <p className="text-muted-foreground">
          Analyze SME distribution patterns and discover market opportunities
          across Batangas municipalities
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Analysis Filters
          </CardTitle>
          <CardDescription>
            Customize the market analysis by selecting specific time periods and
            SME categories
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="date-range-select"
              className="text-sm font-medium mb-2 block"
            >
              Date Range
            </label>
            <Select
              value={selectedDateRange}
              onValueChange={setSelectedDateRange}
            >
              <SelectTrigger id="date-range-select">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="category-select"
              className="text-sm font-medium mb-2 block"
            >
              SME Category
            </label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger id="category-select">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SME Categories by Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              SME Categories & Hotspots
            </CardTitle>
            <CardDescription>
              SME distribution by category with municipal hotspots
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryTrends.map((trend, index) => (
                <div key={trend.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {trend.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {trend.count} SMEs
                      </span>
                      <Badge
                        variant={trend.growth > 0 ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {trend.growth > 0 ? "+" : ""}
                        {trend.growth}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${trend.color}`}
                      style={{ width: `${(trend.count / 342) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    {trend.hotspots.map((hotspot, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {hotspot}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Municipality Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Municipality Analysis
            </CardTitle>
            <CardDescription>
              SME concentration and market opportunities by location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {municipalityData.map((data, index) => (
                <div key={data.municipality} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">
                      {data.municipality}
                    </h4>
                    <Badge variant="outline">{data.totalSMEs} SMEs</Badge>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Dominant:</span>
                      <span className="font-medium">
                        {data.dominantCategory}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Opportunity:
                      </span>
                      <Badge
                        variant={
                          data.opportunityLevel === "High"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {data.marketOpportunity}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Foot Traffic:
                      </span>
                      <span
                        className={`font-medium ${
                          data.footTraffic === "High"
                            ? "text-green-600"
                            : data.footTraffic === "Medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {data.footTraffic}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Market Opportunities
            </CardTitle>
            <CardDescription>
              Identified business opportunities based on location analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {marketOpportunities.map((opportunity, index) => (
              <div
                key={index}
                className="p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 mt-1">
                    <Target className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm text-blue-900">
                        {opportunity.opportunity}
                      </h4>
                      <Badge
                        variant={
                          opportunity.potential === "High"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {opportunity.potential} Potential
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-700 mb-2">
                      {opportunity.description}
                    </p>
                    <div className="flex items-center gap-1 flex-wrap">
                      <MapPin className="h-3 w-3 text-blue-600" />
                      {opportunity.locations.map((location, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs border-blue-300"
                        >
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Key Market Insights
            </CardTitle>
            <CardDescription>
              Important trends and patterns from location-based analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {keyInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className={`${insight.color} mt-1`}>
                    <insight.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">{insight.title}</h4>
                      <Badge
                        variant="outline"
                        className={`${insight.color} border-current`}
                      >
                        {insight.value}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">1,587</p>
                <p className="text-xs text-muted-foreground">Total SMEs</p>
              </div>
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Municipalities</p>
              </div>
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-xs text-muted-foreground">SME Categories</p>
              </div>
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">
                  Market Opportunities
                </p>
              </div>
              <Target className="h-6 w-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
