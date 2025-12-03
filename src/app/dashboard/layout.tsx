"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 w-full min-h-screen bg-[#F5F6F7] flex flex-col transition-all duration-300 ease-in-out">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-white px-4 shadow-sm lg:h-[60px]">
          <SidebarTrigger />
          <div className="font-semibold text-gray-700">Dashboard</div>
        </header>

        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
