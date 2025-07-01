import { PageHeader } from "@/components/admin/ui/PageHeader";
import { PendingVerificationPage } from "@/components/admin/page-components/main-nav/sme/pending-verification";

export default function PendingVerificationSMEsPage() {
  return (
    <>
      <PageHeader title="Pending Verification" />
      <PendingVerificationPage />
    </>
  );
}
