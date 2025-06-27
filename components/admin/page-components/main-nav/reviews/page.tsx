import { Button } from "@/components/common/button";
import {
  Clock,
  SearchCheck,
  CircleX,
  Filter,
  Upload,
  Import,
  Settings,
  Star,
} from "lucide-react";
import DashboardWidget from "@/components/admin/ui/DashboardWidget";
import { SearchBar } from "@/components/common";

export default function ReviewsManagementPage() {
  return (
    <div className="py-4 px-4">
      {/* Header section with title, description, and buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reviews Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and verify registered reviews in Batangas
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button icon={Settings}>Moderation Settings</Button>
          <Button variant="secondary" icon={Upload}>
            Export
          </Button>
        </div>
      </div>

      {/* Dashboard widgets */}
      <div className="w-full mb-8">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
          <DashboardWidget title="Total Reviews" value={125} icon={<Clock />} />
          <DashboardWidget
            title="Published"
            value={42}
            icon={<SearchCheck />}
          />
          <DashboardWidget title="Pending" value={83} icon={<Clock />} />
          <DashboardWidget title="Flagged" value="18" icon={<CircleX />} />
          <DashboardWidget title="Avg Rating" value="4.5" icon={<Star />} />
        </div>
      </div>

      {/* Search, Filter, and Export section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="w-full md:flex-1">
          <SearchBar placeholder="Search reviews..." />
        </div>
        <div className="flex gap-2 md:justify-end">
          <Button variant="outline" icon={Filter}>
            Filter: All Reviews
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
