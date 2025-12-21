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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const validation = registerSchema.safeParse({
        username,
        name,
        email,
        phoneNumber,
        password,
        confirmPassword,
        role,
      });

      if (!validation.success) {
        const message = validation.error.issues[0].message;
        setError(message);
        toast.error(message);
        return;
      }

      const apiRole = role === "pembeli" ? "BUYER" : "SELLER";

      await authService.register({
        username,
        name,
        email,
        phoneNumber,
        password,
        role: apiRole,
      });

      toast.success("Registrasi berhasil. Silakan login.");
      router.push("/login");
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message ?? "Gagal registrasi"
        : "Terjadi kesalahan sistem";

      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    role,
    username,
    name,
    email,
    phoneNumber,
    password,
    confirmPassword,
    isLoading,
    showPassword,
    showConfirmPassword,
    error,

    setRole,
    setUsername,
    setName,
    setEmail,
    setPhoneNumber,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,

    handleRegister,
  };
}
