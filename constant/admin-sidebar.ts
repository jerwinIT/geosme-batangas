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

export const adminSidebarLinks = {
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
      url: "/admin",
      icon: BarChart2,
      isActive: true,
    },
    {
      title: "SME Management",
      url: "/admin/sme",
      icon: Building,
    },
    {
      title: "User Management",
      url: "/admin/users",
      icon: User,
    },
    {
      title: "Reviews & Ratings",
      url: "/admin/reviews",
      icon: Star,
    },
    {
      title: "Map Management",
      url: "/admin/map",
      icon: MapPin,
    },
    {
      title: "Reports ",
      url: "/admin/reports",
      icon: FileText,
    },
  ],
  system: [
    {
      name: "System Settings",
      url: "/admin/settings",
      icon: SlidersHorizontal,
    },
    {
      name: "Audit Logs",
      url: "/admin/audit-logs",
      icon: ClipboardList,
    },

    {
      name: "Notifications",
      url: "/admin/notifications",
      icon: BellRing,
    },
  ],
};
