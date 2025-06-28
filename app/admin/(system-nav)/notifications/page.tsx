import { PageHeader } from "@/components/admin/ui/PageHeader";
import { NotificationPage } from "@/components/admin/page-components/system-nav";

export default function Notification() {
  return (
    <div>
      <PageHeader title="Notifications" />
      <NotificationPage />
    </div>
  );
}
