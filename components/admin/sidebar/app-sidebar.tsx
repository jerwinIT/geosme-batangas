"use client";

import * as React from "react";
import {
  BarChart2,
  Building,
  User,
  ChartLine,
  Star,
  MapPin,
  FileText,
  SlidersHorizontal,
  ShieldCheck,
  BellRing,
  ClipboardList,
  GalleryVerticalEnd,
} from "lucide-react";

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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "GeoSME Admin",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: BarChart2,
      isActive: true,
    },
    {
      title: "SME Management",
      url: "#",
      icon: Building,
      // items: [
      //   {
      //     title: "Genesis",
      //     url: "#",
      //   },
      //   {
      //     title: "Explorer",
      //     url: "#",
      //   },
      //   {
      //     title: "Quantum",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "User Management",
      url: "#",
      icon: User,
      // items: [
      //   {
      //     title: "Introduction",
      //     url: "#",
      //   },
      //   {
      //     title: "Get Started",
      //     url: "#",
      //   },
      //   {
      //     title: "Tutorials",
      //     url: "#",
      //   },
      //   {
      //     title: "Changelog",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartLine,
      // items: [
      //   {
      //     title: "General",
      //     url: "#",
      //   },
      //   {
      //     title: "Team",
      //     url: "#",
      //   },
      //   {
      //     title: "Billing",
      //     url: "#",
      //   },
      //   {
      //     title: "Limits",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Reviews & Ratings",
      url: "#",
      icon: Star,
      // items: [
      //   {
      //     title: "General",
      //     url: "#",
      //   },
      //   {
      //     title: "Team",
      //     url: "#",
      //   },
      //   {
      //     title: "Billing",
      //     url: "#",
      //   },
      //   {
      //     title: "Limits",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Map Management",
      url: "#",
      icon: MapPin,
    },
    {
      title: "Reports ",
      url: "#",
      icon: FileText,
    },
  ],
  system: [
    {
      name: "System Settings",
      url: "#",
      icon: SlidersHorizontal,
    },
    {
      name: "Audit Logs",
      url: "#",
      icon: ClipboardList,
    },
    {
      name: "Access Control",
      url: "#",
      icon: ShieldCheck,
    },
    {
      name: "Notifications",
      url: "#",
      icon: BellRing,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSystem system={data.system} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
