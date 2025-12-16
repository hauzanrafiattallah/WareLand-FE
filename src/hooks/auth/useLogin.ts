"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { getDashboardPathByRole, normalizeRole } from "@/lib/auth";
import { loginSchema } from "@/services/auth/auth.schema";
import { authService } from "@/services/auth/auth.service";

export function useLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      // Validasi form
      const validation = loginSchema.safeParse({
        username: email,
        password,
      });

      if (!validation.success) {
        toast.error(validation.error.issues[0].message);
        return;
      }

      // Call API
      const response = await authService.login({
        username: email,
        password,
      });

      toast.success(response.message);

      // Simpan token & profile
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.profile));

      // Redirect berdasarkan role
      const role = normalizeRole(response.data.profile.role);
      router.push(getDashboardPathByRole(role));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ?? "Gagal login, periksa kredensial Anda"
        );
      } else {
        toast.error("Terjadi kesalahan sistem");
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
    setEmail,
    setPassword,
    setShowPassword,
    handleLogin,
  };
}
