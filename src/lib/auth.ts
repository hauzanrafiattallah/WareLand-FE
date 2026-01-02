/**
 * Utilitas Autentikasi
 * Fungsi helper untuk autentikasi dan otorisasi
 */

import { UserRole } from "@/types/auth";

/**
 * Normalisasi string role dari backend ke format standar
 * @param role - String role dari respons API
 * @returns UserRole yang sudah dinormalisasi
 * @throws Error jika role tidak valid
 */
export function normalizeRole(role: string): UserRole {
  const normalized = role.toUpperCase();

  if (
    normalized !== "SELLER" &&
    normalized !== "BUYER" &&
    normalized !== "ADMIN"
  ) {
    throw new Error("Role tidak valid");
  }

  return normalized;
}

/**
 * Mendapatkan path dashboard untuk role tertentu
 * @param role - Role pengguna
 * @returns Path URL dashboard
 */
export function getDashboardPathByRole(role: UserRole): string {
  switch (role) {
    case "SELLER":
      return "/dashboard/seller";
    case "BUYER":
      return "/dashboard/buyer";
    case "ADMIN":
      return "/dashboard/admin";
    default:
      return "/login";
  }
}
