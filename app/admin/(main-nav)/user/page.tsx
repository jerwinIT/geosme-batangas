import { PageHeader } from "@/components/admin/ui/PageHeader";

export default function UsersPage() {
  return (
    <>
      <PageHeader title="User Management" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl p-4">
            <h3 className="font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl p-4">
            <h3 className="font-semibold">Active Users</h3>
            <p className="text-2xl font-bold">1,156</p>
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl p-4">
            <h3 className="font-semibold">Pending Approval Users</h3>
            <p className="text-2xl font-bold">78</p>
          </div>
        </div>
        <div className="bg-muted/50 min-h-[400px] flex-1 rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">User List</h2>
          <p className="text-muted-foreground">
            User management interface will be implemented here.
          </p>
        </div>
      </div>
    </>
  );
}
