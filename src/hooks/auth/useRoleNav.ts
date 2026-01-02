/**
 * Hook useRoleNav
 * Mengembalikan item navigasi berdasarkan role pengguna
 */

"use client";

import { dashboardNav, UserRole } from "@/lib/dashboard-nav";

/**
 * Custom hook untuk mendapatkan navigasi sesuai role
 * @param role - Role pengguna saat ini
 * @returns Konfigurasi navigasi untuk role tersebut
 */
export function useRoleNav(role: UserRole) {
  return dashboardNav[role];
}
