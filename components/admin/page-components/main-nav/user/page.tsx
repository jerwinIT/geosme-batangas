import { Button } from "@/components/common/button";
import {
  Users,
  CheckCircle,
  Briefcase,
  Clock,
  ShieldCheck,
  Filter,
  Import,
  Upload,
  Plus,
} from "lucide-react";
import DashboardWidget from "@/components/admin/ui/DashboardWidget";
import { SearchBar } from "@/components/common";

export default function UserManagementPage() {
  return (
    <div className="py-4 px-4">
      {/* Header section with title, description, and buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            User Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage platform users and their permissions
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button icon={Plus}>Add User</Button>
          <Button variant="secondary" icon={Import}>
            Import
          </Button>
          <Button variant="secondary" icon={Upload}>
            Export
          </Button>
        </div>
      </div>

      {/* Dashboard widgets */}
      <div className="w-full mb-8">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <DashboardWidget title="Total Users" value={125} icon={<Users />} />
          <DashboardWidget
            title="Active Users"
            value={42}
            icon={<CheckCircle />}
          />
          <DashboardWidget title="SME Owners" value={83} icon={<Briefcase />} />
          <DashboardWidget title="Admins" value="18" icon={<ShieldCheck />} />
        </div>
      </div>

      {/* Search, Filter, and Export section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="w-full md:flex-1">
          <SearchBar placeholder="Search SMEs..." />
        </div>
        <div className="flex gap-2 md:justify-end">
          <Button variant="outline" icon={Filter}>
            Filter: All Users
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
