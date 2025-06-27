import { ReviewsManagementPage } from "@/components/admin/page-components/main-nav";
import { PageHeader } from "@/components/admin/ui/PageHeader";

export default function ReviewsPage() {
  return (
    <>
      <PageHeader title="Reviews Management" />
      <ReviewsManagementPage />
    </>
  );
}
