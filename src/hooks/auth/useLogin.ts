/**
 * useLogin Hook
 * Manages login form state and authentication logic
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
 * Custom hook for handling user login
 * @returns Login form state and handlers
 */
export function useLogin() {
  const router = useRouter();

  // Form input states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // UI states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle login form submission
   * Validates input, calls API, and redirects on success
   */
  const handleLogin = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate form data with Zod
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

      // Call login API
      const response = await authService.login({
        username: email,
        password,
      });

      // Store auth data in localStorage
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.profile));

      toast.success("Login berhasil. Selamat datang!");

      // Redirect to appropriate dashboard
      const role = normalizeRole(response.data.profile.role);
      router.push(getDashboardPathByRole(role));
    } catch (err: unknown) {
      // Handle API errors
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
    // Form states
    email,
    password,
    isLoading,
    showPassword,
    error,

    // Form setters
    setEmail,
    setPassword,
    setShowPassword,

    // Actions
    handleLogin,
  };
}
