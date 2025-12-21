"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { registerSchema } from "@/services/auth/auth.schema";
import { authService } from "@/services/auth/auth.service";

export type RegisterRole = "pembeli" | "penjual";

export function useRegister() {
  const router = useRouter();

  const [role, setRole] = useState<RegisterRole>("pembeli");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const validation = registerSchema.safeParse({
        username,
        email,
        password,
        confirmPassword,
        role,
      });

      if (!validation.success) {
        setError(validation.error.issues[0].message);
        return;
      }

      const apiRole: "BUYER" | "SELLER" =
        role === "pembeli" ? "BUYER" : "SELLER";

      await authService.register({
        username,
        password,
        email,
        role: apiRole,
        name: username,
        phoneNumber: "08123456789",
      });

      router.push("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          (err.response?.data as { message?: string })?.message ??
            "Gagal registrasi"
        );
      } else {
        setError("Terjadi kesalahan sistem");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    role,
    username,
    email,
    password,
    confirmPassword,
    isLoading,
    showPassword,
    showConfirmPassword,
    error,

    setRole,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,

    handleRegister,
  };
}
