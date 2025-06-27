import { PageHeader } from "@/components/admin/ui/PageHeader";
import { UserManagementPage } from "@/components/admin/page-components/main-nav";

export default function UsersPage() {
  return (
    <>
      <PageHeader title="User Management" />
      <UserManagementPage />
    </>
  );
}
