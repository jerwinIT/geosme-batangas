"use client";

import * as React from "react";

// This is the data for the sidebar.
import { adminSidebarLinks } from "@/constant/admin-sidebar";

import { NavMain } from "./nav-main";
import { NavSystem } from "./nav-system";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={adminSidebarLinks.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={adminSidebarLinks.navMain} />
        <NavSystem system={adminSidebarLinks.system} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={adminSidebarLinks.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
