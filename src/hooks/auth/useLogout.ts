/**
 * useLogout Hook
 * Handles user logout and session cleanup
 */

"use client";

import { axiosInstance } from "@/lib/axios";
import { authService } from "@/services/auth/auth.service";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/**
 * Custom hook for handling user logout
 * @returns Logout function
 */
export function useLogout() {
  const router = useRouter();

  /**
   * Logout user and clear session data
   * Clears localStorage and redirects to login page
   */
  const logout = async () => {
    try {
      // Call logout API
      await authService.logout();
    } catch (err) {
      // Show error but still proceed with local cleanup
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Gagal logout");
      }
    } finally {
      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      // Clear authorization header
      delete axiosInstance.defaults.headers.common.Authorization;

      toast.success("Logout berhasil");
      router.push("/login");
    }
  };

  return { logout };
}
