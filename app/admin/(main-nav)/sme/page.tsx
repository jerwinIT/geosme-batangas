import { PageHeader } from "@/components/admin/ui/PageHeader";
import { SmeManagementPage } from "@/components/admin/page-components/main-nav";

export default function SMEsPage() {
  const breadcrumbs = [
    { label: "Admin", href: "/admin" },
    { label: "SME Management", isCurrentPage: true },
  ];

  return (
    <>
      <PageHeader title="SME Management" breadcrumbs={breadcrumbs} />
      <SmeManagementPage />
    </>
  );
}
