import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ThemeProvider from "@/components/main/ui/Theme/ThemeProvider";
import { AppSidebar } from "@/components/admin/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/main/ui";
import { Toaster } from "sonner";
import "../globals.css";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard - GeoSME Batangas",
  description: "Administrative dashboard for GeoSME Batangas platform",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font.className} antialiased bg-light-gray`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-light-gray">{children}</SidebarInset>
          </SidebarProvider>
          <ThemeToggle />
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
