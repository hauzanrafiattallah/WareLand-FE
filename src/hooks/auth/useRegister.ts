/**
 * Hook useRegister
 * Mengelola state form registrasi dan logika pembuatan akun
 */

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { registerSchema } from "@/services/auth/auth.schema";
import { authService } from "@/services/auth/auth.service";
import { RegisterRole } from "@/types/auth";

/**
 * Custom hook untuk menangani registrasi pengguna
 * @returns State dan handler form registrasi
 */
export function useRegister() {
  const router = useRouter();

  // State input form
  const [role, setRole] = useState<RegisterRole>("pembeli");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State UI
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Menangani submit form registrasi
   * Memvalidasi input, memanggil API, dan redirect ke login jika berhasil
   */
  const handleRegister = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validasi data form dengan Zod
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

      // Konversi role ke format API
      const apiRole = role === "pembeli" ? "BUYER" : "SELLER";

      // Panggil API registrasi
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
      // Tangani error API
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
    // State form
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

    // Setter form
    setRole,
    setUsername,
    setName,
    setEmail,
    setPhoneNumber,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,

    // Aksi
    handleRegister,
  };
}
