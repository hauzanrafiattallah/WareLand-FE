/**
 * useRegister Hook
 * Manages registration form state and user creation logic
 */

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { RegisterRole } from "@/types/auth";
import { registerSchema } from "@/services/auth/auth.schema";
import { authService } from "@/services/auth/auth.service";

/**
 * Custom hook for handling user registration
 * @returns Registration form state and handlers
 */
export function useRegister() {
  const router = useRouter();

  // Form input states
  const [role, setRole] = useState<RegisterRole>("pembeli");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle registration form submission
   * Validates input, calls API, and redirects to login on success
   */
  const handleRegister = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate form data with Zod
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

      // Convert role to API format
      const apiRole = role === "pembeli" ? "BUYER" : "SELLER";

      // Call register API
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
      // Handle API errors
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
    // Form states
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

    // Form setters
    setRole,
    setUsername,
    setName,
    setEmail,
    setPhoneNumber,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,

    // Actions
    handleRegister,
  };
}
