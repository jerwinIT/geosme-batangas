import { AuditLogsPage } from "@/components/admin/page-components/system-nav";
import { PageHeader } from "@/components/admin/ui/PageHeader";

export default function AuditLogs() {
  return (
    <div>
      <PageHeader title="Audit Logs" />
      <AuditLogsPage />
    </div>
  );
}
