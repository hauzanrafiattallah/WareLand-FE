/**
 * Utilitas Pengecekan Role
 * Fungsi helper untuk mengecek role pengguna dari local storage
 */

import { normalizeRole } from "@/lib/auth";
import { UserRole } from "@/types/auth";

/**
 * Mendapatkan role pengguna saat ini dari local storage
 * @returns Role pengguna atau null jika tidak ditemukan/invalid
 */
export function getStoredUserRole(): UserRole | null {
  if (typeof window === "undefined") return null;

  const role = localStorage.getItem("userRole");
  if (!role) return null;

  try {
    return normalizeRole(role);
  } catch {
    return null;
  }
}

/**
 * Mengecek apakah pengguna saat ini adalah seller
 * @returns True jika pengguna memiliki role SELLER
 */
export function isSeller(): boolean {
  const role = getStoredUserRole();
  return role === "SELLER";
}
