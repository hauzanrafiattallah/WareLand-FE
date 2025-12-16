"use client";

import { axiosInstance } from "@/lib/axios";
import { authService } from "@/services/auth/auth.service";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Gagal logout");
      }
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      delete axiosInstance.defaults.headers.common.Authorization;

      toast.success("Logout berhasil");
      router.push("/login");
    }
  };

  return { logout };
}
