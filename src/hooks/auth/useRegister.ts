/**
 * Hook useRegisterSubmit
 * Mengelola logika submit registrasi dengan react-hook-form
 */

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authService } from "@/services/auth/auth.service";
import { RegisterForm } from "@/services/auth/auth.schema";

/**
 * Custom hook untuk menangani submit registrasi
 * Digunakan bersama react-hook-form
 * @returns Handler submit
 */
export function useRegisterSubmit() {
  const router = useRouter();

  /**
   * Handler submit form registrasi
   * @param data - Data form yang sudah divalidasi oleh Zod
   */
  const onSubmit = async (data: RegisterForm): Promise<void> => {
    try {
      // Konversi role ke format API
      const apiRole = data.role === "pembeli" ? "BUYER" : "SELLER";

      // Panggil API registrasi
      await authService.register({
        username: data.username,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        role: apiRole,
      });

      toast.success("Registrasi berhasil! Silakan login untuk melanjutkan");
      router.push("/login");
    } catch (err: unknown) {
      // Tangani error API
      let message = "Terjadi kesalahan sistem";
      if (axios.isAxiosError(err)) {
        message =
          (err.response?.data as { message?: string })?.message ??
          "Gagal registrasi";
      }
      toast.error(message);
      throw err; // Re-throw untuk ditangani oleh form
    }
  };

  return { onSubmit };
}
