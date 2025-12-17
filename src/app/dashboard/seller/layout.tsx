"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useLogout } from "@/hooks/auth/useLogout";
import { useRoleGuard } from "@/hooks/useRoleGuard";
import { useDashboardSidebar } from "@/hooks/useDashboardSidebar";
import { useRoleNav } from "@/hooks/useRoleNav";

import DashboardSidebar from "@/components/DashboardSidebar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRoleGuard("SELLER");

  const { logout } = useLogout();
  const sidebar = useDashboardSidebar();
  const nav = useRoleNav("SELLER");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar
        {...nav}
        isOpen={sidebar.isOpen}
        onClose={sidebar.close}
        onLogout={logout}
      />

      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center">
          <Button variant="ghost" size="icon" onClick={sidebar.open}>
            <Menu className="w-5 h-5" />
          </Button>
          <span className="ml-3 font-semibold">Seller Dashboard</span>
        </header>

        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
