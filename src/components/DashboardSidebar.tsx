"use client";

import { Button } from "@/components/ui/button";
import { LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LucideIcon } from "lucide-react";

type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

type Props = {
  title: string;
  subtitle: string;
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
};

export default function DashboardSidebar({
  title,
  subtitle,
  items,
  isOpen,
  onClose,
  onLogout,
}: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>

            <button onClick={onClose} className="lg:hidden">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Nav */}
          <nav className="space-y-2 flex-1">
            {items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href} onClick={onClose}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 ${
                      isActive
                        ? "bg-[#39D177] text-white hover:bg-[#39D177]"
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

          {/* Logout */}
          <div className="pt-4 border-t">
            <Button
              variant="ghost"
              onClick={onLogout}
              className="w-full justify-start gap-3 text-red-600 hover:bg-red-50 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
