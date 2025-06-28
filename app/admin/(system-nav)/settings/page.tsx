import { SystemSettingPage } from "@/components/admin/page-components/system-nav";
import { PageHeader } from "@/components/admin/ui/PageHeader";
export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" />
      <SystemSettingPage />
    </div>
  );
}
