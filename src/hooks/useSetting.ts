"use client";

import { UpdateUserPayload } from "@/services/user/user.payload";
import { userService } from "@/services/user/user.service";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useSetting(successMessage: string, errorMessage: string) {
  const router = useRouter();

  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
    imageUrl: "",
  });

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

  const saveProfile = async () => {
    if (!userId) return;
    setIsLoading(true);

    try {
      const payload: UpdateUserPayload = {
        name: profile.name,
        email: profile.email,
        phoneNumber: profile.phone,
      };

      if (profile.imageUrl) {
        payload.imageUrl = profile.imageUrl;
      }

      if (profile.newPassword) {
        payload.oldPassword = profile.oldPassword;
        payload.newPassword = profile.newPassword;
      }

      await userService.updateProfile(userId, payload);

      toast.success(successMessage);
      setEditMode(false);

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

      setProfile((p) => ({ ...p, oldPassword: "", newPassword: "" }));
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || errorMessage);
      } else {
        toast.error("Terjadi kesalahan sistem");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async () => {
    if (!userId) return;
    setIsLoading(true);

    try {
      await userService.deleteAccount(userId);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      toast.success("Akun berhasil dihapus");
      router.replace("/login");
    } catch (err) {
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
    profile,
    setProfile,
    editMode,
    setEditMode,
    isLoading,
    saveProfile,
    deleteAccount,
    showOldPassword,
    setShowOldPassword,
    showNewPassword,
    setShowNewPassword,
  };
}
