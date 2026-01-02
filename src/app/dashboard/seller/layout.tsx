/**
 * Layout Dashboard Seller
 * Layout pembungkus untuk semua halaman dashboard penjual dengan navigasi sidebar
 */

"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import { useLogout } from "@/hooks/auth/useLogout";
import { useRoleGuard } from "@/hooks/auth/useRoleGuard";
import { useRoleNav } from "@/hooks/auth/useRoleNav";
import { useDashboardSidebar } from "@/hooks/useDashboardSidebar";

import DashboardSidebar from "@/components/DashboardSidebar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Proteksi route hanya untuk role seller
  useRoleGuard("SELLER");

  // Inisialisasi hook untuk fungsi layout
  const { logout } = useLogout();
  const sidebar = useDashboardSidebar();
  const nav = useRoleNav("SELLER");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Komponen navigasi sidebar */}
      <DashboardSidebar
        {...nav}
        isOpen={sidebar.isOpen}
        onClose={sidebar.close}
        onLogout={logout}
      />

      <div className="flex-1 flex flex-col">
        {/* Header mobile dengan toggle menu */}
        <header className="lg:hidden bg-white border-b px-4 py-3 flex items-center">
          <Button variant="ghost" size="icon" onClick={sidebar.open}>
            <Menu className="w-5 h-5" />
          </Button>
          <span className="ml-3 font-semibold">Seller Dashboard</span>
        </header>

        {/* Area konten utama */}
        <main className="flex-1 p-6 lg:p-10 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
