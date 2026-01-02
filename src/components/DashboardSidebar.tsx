/**
 * Komponen DashboardSidebar
 * Sidebar navigasi modern untuk dashboard dengan animasi dan efek
 */

"use client";

import { Button } from "@/components/ui/button";
import { LogOut, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [user, setUser] = useState<{ name?: string; imageUrl?: string } | null>(null);

  // Ambil data user dari localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  return (
    <>
      {/* Overlay dengan blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 
          bg-gradient-to-b from-white via-white to-gray-50
          border-r border-gray-100 shadow-2xl
          transform transition-all duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto lg:shadow-none
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header dengan Logo */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="w-10 h-10 bg-gradient-to-br from-[#39D177] to-[#1E8E4A] rounded-xl flex items-center justify-center shadow-lg shadow-[#39D177]/30">
                  <span className="text-white font-bold text-lg">W</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                  <p className="text-xs text-gray-500">{subtitle}</p>
                </div>
              </div>

              {/* Tombol close mobile */}
              <button 
                onClick={onClose} 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* User Profile Mini */}
          {user && (
            <div className="px-4 py-4 mx-4 mt-4 bg-gradient-to-r from-[#E6FAEF] to-[#D6F5E7] rounded-xl border border-[#39D177]/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={user.imageUrl || "/profile.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full object-cover ring-2 ring-white shadow"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#39D177] rounded-full border-2 border-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-[#2FAE63]">Online</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigasi */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Menu
            </p>
            {items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href} onClick={onClose}>
                  <div
                    className={`
                      group relative flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all duration-200 cursor-pointer
                      ${isActive 
                        ? "bg-gradient-to-r from-[#39D177] to-[#2FAE63] text-white shadow-lg shadow-[#39D177]/30" 
                        : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
                  >
                    {/* Ikon */}
                    <div className={`
                      flex items-center justify-center w-9 h-9 rounded-lg transition-all
                      ${isActive 
                        ? "bg-white/20" 
                        : "bg-gray-100 group-hover:bg-[#39D177]/10 group-hover:text-[#39D177]"
                      }
                    `}>
                      <item.icon className="w-5 h-5" />
                    </div>

                    {/* Label */}
                    <span className={`font-medium flex-1 ${isActive ? "" : "group-hover:text-gray-900"}`}>
                      {item.name}
                    </span>

                    {/* Arrow indicator */}
                    {isActive && (
                      <ChevronRight className="w-4 h-4 opacity-70" />
                    )}

                    {/* Active indicator bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer dengan Logout */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <Button
              variant="ghost"
              onClick={onLogout}
              className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl py-3 transition-all duration-200"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-50">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-medium">Keluar</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
