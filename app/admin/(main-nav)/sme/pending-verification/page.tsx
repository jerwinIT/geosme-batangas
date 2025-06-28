import { PageHeader } from "@/components/admin/ui/PageHeader";
import { PendingVerificationPage } from "@/components/admin/page-components/main-nav/sme/pending-verification";

export default function PendingVerificationSMEsPage() {
  const breadcrumbs = [
    { label: "Admin", href: "/admin" },
    { label: "SME Management", href: "/admin/sme" },
    { label: "Pending Verification", isCurrentPage: true },
  ];

  return (
    <>
      <PageHeader title="Pending Verification" breadcrumbs={breadcrumbs} />
      <PendingVerificationPage />
    </>
  );
}
