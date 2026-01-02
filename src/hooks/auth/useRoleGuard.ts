/**
 * Hook useRoleGuard
 * Melindungi route berdasarkan role pengguna
 */

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { UserRole } from "@/types/auth";

/**
 * Custom hook untuk proteksi route berdasarkan role
 * Mengarahkan pengguna yang tidak berwenang ke halaman yang sesuai
 * @param allowedRole - Role yang diizinkan mengakses route ini
 */
export function useRoleGuard(allowedRole: UserRole) {
  const router = useRouter();

  useEffect(() => {
    // Cek token autentikasi
    const token = localStorage.getItem("accessToken");
    const userRaw = localStorage.getItem("user");

    // Redirect ke login jika tidak terautentikasi
    if (!token || !userRaw) {
      router.replace("/login");
      return;
    }

    try {
      const user = JSON.parse(userRaw);

      // Izinkan akses jika role cocok
      if (user.role === allowedRole) {
        return;
      }

      // Redirect BUYER ke dashboard buyer
      if (user.role === "BUYER") {
        router.replace("/dashboard/buyer");
        return;
      }

      // Redirect SELLER ke dashboard seller
      if (user.role === "SELLER") {
        router.replace("/dashboard/seller");
        return;
      }

      // Fallback ke login untuk role yang tidak dikenal
      router.replace("/login");
    } catch {
      // Tangani error parsing JSON
      router.replace("/login");
    }
  }, [allowedRole, router]);
}
