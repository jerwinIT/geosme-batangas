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
} from "lucide-react";
import DashboardWidget from "@/components/admin/ui/DashboardWidget";
import { SearchBar } from "@/components/common";

export default function MapManagementPage() {
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
        <div className="flex flex-wrap ">
          <Button icon={Plus}>Add Location</Button>
        </div>
      </div>

      {/* Dashboard widgets */}
      <div className="w-full">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <DashboardWidget
            title="Total Locations"
            value={125}
            icon={<Clock />}
          />
          <DashboardWidget
            title="Published"
            value={42}
            icon={<SearchCheck />}
          />
          <DashboardWidget title="Pending" value={83} icon={<CheckCircle2 />} />
          <DashboardWidget title="Issues" value="18" icon={<CircleX />} />
        </div>
      </div>

      <div className="w-full h-[500px] bg-white border shadow-sm rounded-lg p-4">
        {/* Map */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold tracking-tight">
              Interactive Map
            </h2>
            <p className="text-sm text-muted-foreground">
              View all locations on the map and filter by municipality
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" icon={Settings}>
              Settings
            </Button>
          </div>
          {/* <Map /> */}
        </div>
      </div>

      {/* Municipality Coverage */}
      <div className="w-full h-[500px] grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {/* List of municipalities and number of SMEs */}
        <div className="w-full h-full bg-white border shadow-sm rounded-lg p-4">
          <h3 className="text-lg font-semibold tracking-tight">
            Municipality Coverage
          </h3>
        </div>

        {/* Location Quality Metrics */}
        <div className="w-full h-full bg-white border shadow-sm rounded-lg p-4">
          <h3 className="text-lg font-semibold tracking-tight">
            Location Quality Metrics
          </h3>
        </div>
      </div>

      {/* Search, Filter, and Export section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="w-full md:flex-1">
          <SearchBar placeholder="Search SMEs..." />
        </div>
        <div className="flex gap-2 md:justify-end">
          <Button variant="outline" icon={Filter}>
            Filter: All Municipalities
          </Button>
          <Button variant="outline" icon={Import}>
            Import
          </Button>
          <Button variant="outline" icon={Upload}>
            Export
          </Button>
        </div>
      </div>

      {/* Table placeholder */}
      <div className="w-full border rounded-lg p-4 bg-white shadow-sm">
        {/* Replace this with your actual table component */}
        <p className="text-center text-muted-foreground">Table goes here.</p>
      </div>
    </div>
  );
}
