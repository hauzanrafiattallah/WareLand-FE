/**
 * Hook useLogout
 * Menangani logout pengguna dan pembersihan sesi
 */

"use client";

import { axiosInstance } from "@/lib/axios";
import { authService } from "@/services/auth/auth.service";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/**
 * Custom hook untuk menangani logout pengguna
 * @returns Fungsi logout
 */
export function useLogout() {
  const router = useRouter();

  /**
   * Logout pengguna dan hapus data sesi
   * Membersihkan localStorage dan redirect ke halaman login
   */
  const logout = async () => {
    try {
      // Panggil API logout
      await authService.logout();
    } catch (err) {
      // Tampilkan error tapi tetap lanjutkan pembersihan lokal
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Gagal logout");
      }
    } finally {
      // Bersihkan local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      // Hapus header authorization
      delete axiosInstance.defaults.headers.common.Authorization;

      toast.success("Logout berhasil");
      router.push("/login");
    }
  };

  return { logout };
}
