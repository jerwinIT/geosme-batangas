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
import { MapPin, TrendingUp, TrendingDown } from "lucide-react";

interface DensityLevel {
  level: string;
  color: string;
  description: string;
}

const densityLevels: DensityLevel[] = [
  { level: "Very High", color: "bg-red-600", description: "50+ SMEs per km²" },
  { level: "High", color: "bg-red-400", description: "30-49 SMEs per km²" },
  {
    level: "Medium",
    color: "bg-yellow-400",
    description: "15-29 SMEs per km²",
  },
  { level: "Low", color: "bg-green-400", description: "5-14 SMEs per km²" },
  { level: "Very Low", color: "bg-green-200", description: "0-4 SMEs per km²" },
];

const smeCategories = [
  "All Categories",
  "Café & Restaurants",
  "Retail & Commerce",
  "Agri-business",
  "Manufacturing",
  "Services",
  "Technology",
  "Tourism & Hospitality",
];

const municipalities = [
  "All Municipalities",
  "Lipa City",
  "Batangas City",
  "Tanauan City",
  "Santo Tomas",
  "Malvar",
  "Nasugbu",
  "San Juan",
  "Calatagan",
  "Lemery",
  "Taal",
];

export default function SMEDensityHeatmaps() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedMunicipality, setSelectedMunicipality] =
    useState("All Municipalities");

  return (
    <div className="container mx-auto p-4 space-y-6 pt-20">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Business Density Heatmaps
        </h1>
        <p className="text-muted-foreground">
          Visualize the concentration of SMEs by type and area across Batangas
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
          <CardDescription>
            Customize the heatmap view by selecting specific categories and
            locations
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
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
                {smeCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label
              htmlFor="municipality-select"
              className="text-sm font-medium mb-2 block"
            >
              Municipality
            </label>
            <Select
              value={selectedMunicipality}
              onValueChange={setSelectedMunicipality}
            >
              <SelectTrigger id="municipality-select">
                <SelectValue placeholder="Select a municipality" />
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
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardContent className="p-0 h-full">
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center relative">
                <div className="text-center space-y-4">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-600">
                      Interactive Map Placeholder
                    </h3>
                    <p className="text-sm text-gray-500 max-w-md">
                      Google Maps integration will be implemented here to
                      display the SME density heatmap
                    </p>
                    <Badge variant="outline" className="mt-2">
                      Category: {selectedCategory}
                    </Badge>
                    <Badge variant="outline" className="mt-2 ml-2">
                      Area: {selectedMunicipality}
                    </Badge>
                  </div>
                </div>

                {/* Simulated heatmap overlay areas */}
                <div className="absolute top-20 left-20 w-24 h-24 bg-red-400 opacity-60 rounded-full blur-sm"></div>
                <div className="absolute bottom-32 right-32 w-32 h-32 bg-red-600 opacity-60 rounded-full blur-sm"></div>
                <div className="absolute top-40 right-20 w-20 h-20 bg-yellow-400 opacity-60 rounded-full blur-sm"></div>
                <div className="absolute bottom-20 left-32 w-16 h-16 bg-green-400 opacity-60 rounded-full blur-sm"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Density Legend</CardTitle>
              <CardDescription>SME concentration levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {densityLevels.map((level) => (
                <div key={level.level} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded ${level.color}`}></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{level.level}</div>
                    <div className="text-xs text-muted-foreground">
                      {level.description}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Insights Box */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Market Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-green-700 flex items-center gap-2">
                  <TrendingUp className="h-3 w-3" />
                  Most Dense Areas
                </h4>
                <div className="space-y-1">
                  <Badge variant="secondary" className="mr-1 mb-1">
                    Lipa City
                  </Badge>
                  <Badge variant="secondary" className="mr-1 mb-1">
                    Batangas City
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  High concentration of SMEs suggests established business
                  districts
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-orange-700 flex items-center gap-2">
                  <TrendingDown className="h-3 w-3" />
                  Low Presence Areas
                </h4>
                <div className="space-y-1">
                  <Badge variant="outline" className="mr-1 mb-1">
                    Nasugbu
                  </Badge>
                  <Badge variant="outline" className="mr-1 mb-1">
                    San Juan
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Potential opportunities for business expansion
                </p>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  <strong>Current View:</strong> {selectedCategory} in{" "}
                  {selectedMunicipality}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
