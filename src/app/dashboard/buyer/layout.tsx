"use client";

import { Button } from "@/components/ui/button";
import {
  Eye,
  Heart,
  Home,
  MessageSquare,
  Settings as SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const buyerNavItems = [
  { name: "Home", href: "/dashboard/buyer", icon: Home },
  { name: "Wishlist", href: "/dashboard/buyer/wishlist", icon: Heart },
  { name: "Chat", href: "/dashboard/buyer/chat", icon: MessageSquare },
  { name: "Review", href: "/dashboard/buyer/review", icon: Eye },
  { name: "Settings", href: "/dashboard/buyer/settings", icon: SettingsIcon },
];

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* BUYER SIDEBAR */}
      <aside className="w-full lg:w-64 bg-white border-r border-gray-200 lg:min-h-screen p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">Buyer Panel</h2>
          <p className="text-sm text-gray-500">Explore your properties</p>
        </div>

        <nav className="space-y-2">
          {buyerNavItems.map((item) => {
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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-10 overflow-auto">{children}</main>
    </div>
  );
}
