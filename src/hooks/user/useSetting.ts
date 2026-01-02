/**
 * useSetting Hook
 * Manages user profile settings state and operations
 */

"use client";

import { userService } from "@/services/user/user.service";
import { UpdateUserPayload } from "@/types/user";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook for managing user settings
 * @param successMessage - Message to show on successful save
 * @param errorMessage - Message to show on save error
 * @returns Settings state and handlers
 */
export function useSetting(successMessage: string, errorMessage: string) {
  const router = useRouter();

  // UI states
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  // Password visibility states
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Profile form state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
    imageUrl: "",
  });

  /**
   * Initialize user data on mount
   * Checks authentication and fetches profile
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser) as { id: number };
    setUserId(parsedUser.id);
    fetchProfile();
  }, [router]);

  /**
   * Fetch current user profile from API
   */
  const fetchProfile = async () => {
    try {
      const res = await userService.getMe();
      setProfile((prev) => ({
        ...prev,
        name: res.data.name ?? "",
        email: res.data.email ?? "",
        phone: res.data.phoneNumber ?? "",
        imageUrl: res.data.imageUrl ?? "",
      }));
    } catch {
      toast.error("Gagal memuat data");
    }
  };

  /**
   * Save profile changes to API
   * Updates local storage on success
   */
  const saveProfile = async () => {
    if (!userId) return;
    setIsLoading(true);

    try {
      // Build update payload
      const payload: UpdateUserPayload = {
        name: profile.name,
        email: profile.email,
        phoneNumber: profile.phone,
      };

      // Add image URL if present
      if (profile.imageUrl) {
        payload.imageUrl = profile.imageUrl;
      }

      // Add password fields if changing password
      if (profile.newPassword) {
        payload.oldPassword = profile.oldPassword;
        payload.newPassword = profile.newPassword;
      }

      // Call update API
      await userService.updateProfile(userId, payload);

      toast.success(successMessage);
      setEditMode(false);

      // Update local storage with new profile data
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const u = JSON.parse(storedUser);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...u,
            name: profile.name,
            email: profile.email,
            phoneNumber: profile.phone,
            imageUrl: profile.imageUrl,
          })
        );
      }

      // Clear password fields
      setProfile((p) => ({ ...p, oldPassword: "", newPassword: "" }));
    } catch (err) {
      // Handle API errors
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || errorMessage);
      } else {
        toast.error("Terjadi kesalahan sistem");
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delete user account permanently
   * Clears session and redirects to login
   */
  const deleteAccount = async () => {
    if (!userId) return;
    setIsLoading(true);

    try {
      await userService.deleteAccount(userId);

      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      toast.success("Akun berhasil dihapus");
      router.replace("/login");
    } catch (err) {
      // Handle API errors
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Gagal menghapus akun");
      } else {
        toast.error("Terjadi kesalahan sistem");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Profile state
    profile,
    setProfile,

    // UI states
    editMode,
    setEditMode,
    isLoading,

    // Password visibility
    showOldPassword,
    setShowOldPassword,
    showNewPassword,
    setShowNewPassword,

    // Actions
    saveProfile,
    deleteAccount,
  };
}
