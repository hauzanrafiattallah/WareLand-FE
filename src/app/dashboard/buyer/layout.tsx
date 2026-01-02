/**
 * Layout Dashboard Buyer
 * Layout pembungkus untuk semua halaman dashboard pembeli dengan navigasi sidebar
 */

"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRoleGuard } from "@/hooks/auth/useRoleGuard";
import { useRoleNav } from "@/hooks/auth/useRoleNav";
import { useDashboardSidebar } from "@/hooks/useDashboardSidebar";
import { Menu } from "lucide-react";

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Proteksi route hanya untuk role buyer
  useRoleGuard("BUYER");

  // Inisialisasi hook untuk fungsi layout
  const { logout } = useLogout();
  const sidebar = useDashboardSidebar();
  const nav = useRoleNav("BUYER");

  return (
    <div className="min-h-screen flex bg-gray-50 overflow-x-hidden">
      {/* Komponen navigasi sidebar */}
      <DashboardSidebar
        {...nav}
        isOpen={sidebar.isOpen}
        onClose={sidebar.close}
        onLogout={logout}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header mobile dengan toggle menu */}
        <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center">
          <Button variant="ghost" size="icon" onClick={sidebar.open}>
            <Menu className="w-5 h-5" />
          </Button>
          <span className="ml-3 font-semibold">Buyer Dashboard</span>
        </header>

        {/* Area konten utama */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
