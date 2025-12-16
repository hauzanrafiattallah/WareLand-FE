"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { registerSchema } from "@/services/auth/auth.schema";
import { authService } from "@/services/auth/auth.service";

export type RegisterRole = "pembeli" | "penjual";

export function useRegister() {
  const router = useRouter();

  const [role, setRole] = useState<RegisterRole>("pembeli");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);

    try {
      // Validasi form (UI concern)
      const validation = registerSchema.safeParse({
        username,
        email,
        password,
        confirmPassword,
        role,
      });

      if (!validation.success) {
        toast.error(validation.error.issues[0].message);
        return;
      }

      //Mapping role ke format API
      const apiRole: "BUYER" | "SELLER" =
        role === "pembeli" ? "BUYER" : "SELLER";

      //Call API (fire & forget)
      await authService.register({
        username,
        password,
        email,
        role: apiRole,
        name: username,
        phoneNumber: "08123456789",
      });

      //Success flow
      toast.success("Registrasi berhasil! Silakan login.");
      router.push("/login");
    } catch (err: unknown) {
      //Error handling (robust & TS-safe)
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message ?? "Gagal registrasi");
      } else {
        toast.error("Terjadi kesalahan sistem");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // state
    role,
    username,
    email,
    password,
    confirmPassword,
    isLoading,
    showPassword,
    showConfirmPassword,

    // setter
    setRole,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,

    // action
    handleRegister,
  };
}
