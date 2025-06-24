import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";

export default function SmeManagementPage() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          SME Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage and verify registered SMEs in Batangas
        </p>
      </div>
      <div className="flex gap-4">
        <Button icon={Plus}>Add SME</Button>
        <Button variant="secondary">Pending Verification</Button>
      </div>
    </div>
  );
}
