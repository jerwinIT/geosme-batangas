import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function ReportsPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Reports</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-3 sm:gap-4 p-2 sm:p-4 pt-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">Reports</h1>
        </div>
        <div className="grid auto-rows-min gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl p-3 sm:p-4">
            <h3 className="font-semibold text-sm sm:text-base">
              Total Reports
            </h3>
            <p className="text-xl sm:text-2xl font-bold">1,234</p>
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl p-3 sm:p-4">
            <h3 className="font-semibold text-sm sm:text-base">
              Active Reports
            </h3>
            <p className="text-xl sm:text-2xl font-bold">1,156</p>
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl p-3 sm:p-4 sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-sm sm:text-base">
              Pending Approval Reports
            </h3>
            <p className="text-xl sm:text-2xl font-bold">78</p>
          </div>
        </div>
        <div className="bg-muted/50 min-h-[300px] sm:min-h-[400px] flex-1 rounded-xl p-3 sm:p-4">
          <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
            SME List
          </h2>
          <p className="text-muted-foreground text-sm">
            Reports management interface will be implemented here.
          </p>
        </div>
      </div>
    </>
  );
}
