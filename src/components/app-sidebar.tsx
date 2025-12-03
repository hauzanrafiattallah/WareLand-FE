"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Home, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Home",
    url: "/dashboard/properties",
    icon: Home,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      {/* LOGO */}
      <SidebarHeader className="px-4 py-6">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" width={45} height={45} alt="Logo" />
          <span className="text-xl font-semibold">WareLand</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.url)}
                  >
                    <a
                      href={item.url}
                      className={`flex items-center gap-3 ${
                        pathname.startsWith(item.url)
                          ? "text-green-600"
                          : "text-gray-700"
                      }`}
                    >
                      <item.icon
                        className={`w-5 h-5 ${
                          pathname.startsWith(item.url)
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER: LOGOUT */}
      <SidebarFooter className="mb-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="flex items-center gap-3 text-red-600 w-full">
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
