/**
 * Hook useLoginForm
 * Mengelola logika submit login dengan react-hook-form
 */

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getDashboardPathByRole, normalizeRole } from "@/lib/auth";
import { authService } from "@/services/auth/auth.service";
import { LoginForm } from "@/services/auth/auth.schema";

/**
 * Custom hook untuk menangani submit login
 * Digunakan bersama react-hook-form
 * @returns Handler submit dan state loading
 */
export function useLoginSubmit() {
  const router = useRouter();

  /**
   * Handler submit form login
   * @param data - Data form yang sudah divalidasi oleh Zod
   */
  const onSubmit = async (data: LoginForm): Promise<void> => {
    try {
      // Panggil API login
      const response = await authService.login({
        username: data.username,
        password: data.password,
      });

      // Simpan data auth di localStorage
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.profile));

      toast.success("Login berhasil! Selamat datang kembali");

      // Redirect ke dashboard sesuai role
      const role = normalizeRole(response.data.profile.role);
      router.push(getDashboardPathByRole(role));
    } catch (err: unknown) {
      // Tangani error API
      let message = "Terjadi kesalahan sistem";
      if (axios.isAxiosError(err)) {
        message =
          (err.response?.data as { message?: string })?.message ??
          "Gagal login, periksa kredensial Anda";
      }
      toast.error(message);
      throw err; // Re-throw untuk ditangani oleh form
    }
  };

  return { onSubmit };
}
