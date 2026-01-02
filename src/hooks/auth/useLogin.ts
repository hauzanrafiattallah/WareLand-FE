/**
 * Hook useLogin
 * Mengelola state form login dan logika autentikasi
 */

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { getDashboardPathByRole, normalizeRole } from "@/lib/auth";
import { loginSchema } from "@/services/auth/auth.schema";
import { authService } from "@/services/auth/auth.service";

/**
 * Custom hook untuk menangani login pengguna
 * @returns State dan handler form login
 */
export function useLogin() {
  const router = useRouter();

  // State input form
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // State UI
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Menangani submit form login
   * Memvalidasi input, memanggil API, dan redirect jika berhasil
   */
  const handleLogin = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validasi data form dengan Zod
      const validation = loginSchema.safeParse({
        username: email,
        password,
      });

      if (!validation.success) {
        const message = validation.error.issues[0].message;
        setError(message);
        toast.error(message);
        return;
      }

      // Panggil API login
      const response = await authService.login({
        username: email,
        password,
      });

      // Simpan data auth di localStorage
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.profile));

      toast.success("Login berhasil. Selamat datang!");

      // Redirect ke dashboard yang sesuai
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

      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State form
    email,
    password,
    isLoading,
    showPassword,
    error,

    // Setter form
    setEmail,
    setPassword,
    setShowPassword,

    // Aksi
    handleLogin,
  };
}
