"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { getDashboardPathByRole, normalizeRole } from "@/lib/auth";
import { loginSchema } from "@/services/auth/auth.schema";
import { authService } from "@/services/auth/auth.service";

export function useLogin() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const validation = loginSchema.safeParse({
        username: email,
        password,
      });

      if (!validation.success) {
        setError(validation.error.issues[0].message);
        return;
      }

      const response = await authService.login({
        username: email,
        password,
      });

      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.profile));

      const role = normalizeRole(response.data.profile.role);
      router.push(getDashboardPathByRole(role));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          (err.response?.data as { message?: string })?.message ??
            "Gagal login, periksa kredensial Anda"
        );
      } else {
        setError("Terjadi kesalahan sistem");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    isLoading,
    showPassword,
    error,
    setEmail,
    setPassword,
    setShowPassword,
    handleLogin,
  };
}
