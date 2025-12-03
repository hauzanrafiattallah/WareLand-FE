"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  ShoppingCart,
  MessageSquare,
  BarChart3,
  Wallet,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sellerNavItems = [
  { name: "Dashboard", href: "/dashboard/seller", icon: LayoutDashboard },
  { name: "My Listings", href: "/dashboard/seller/listings", icon: Home },
  { name: "Orders", href: "/dashboard/seller/orders", icon: ShoppingCart },
  { name: "Chat", href: "/dashboard/seller/chat", icon: MessageSquare },
  { name: "Analytics", href: "/dashboard/seller/analytics", icon: BarChart3 },
  { name: "Wallet", href: "/dashboard/seller/wallet", icon: Wallet },
  { name: "Settings", href: "/dashboard/seller/settings", icon: Settings },
];

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* SELLER SIDEBAR */}
      <aside className="w-full lg:w-64 bg-white border-r border-gray-200 lg:min-h-screen p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">Seller Panel</h2>
          <p className="text-sm text-gray-500">Manage your business</p>
        </div>
        <nav className="space-y-2">
          {sellerNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    isActive
                      ? "bg-[#39D177] hover:bg-[#2FAE63] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}
