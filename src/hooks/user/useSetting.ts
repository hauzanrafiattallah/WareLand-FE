/**
 * Hook useSetting
 * Mengelola state pengaturan profil pengguna dan operasinya
 */

"use client";

import { userService } from "@/services/user/user.service";
import { UpdateUserPayload } from "@/types/user";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Custom hook untuk mengelola pengaturan pengguna
 * @param successMessage - Pesan yang ditampilkan saat berhasil menyimpan
 * @param errorMessage - Pesan yang ditampilkan saat gagal menyimpan
 * @returns State dan handler pengaturan
 */
export function useSetting(successMessage: string, errorMessage: string) {
  const router = useRouter();

  // State UI
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  // State visibilitas password
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // State form profil
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
    imageUrl: "",
  });

  /**
   * Inisialisasi data pengguna saat mount
   * Cek autentikasi dan ambil profil
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
   * Ambil profil pengguna saat ini dari API
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
   * Simpan perubahan profil ke API
   * Update local storage jika berhasil
   */
  const saveProfile = async () => {
    if (!userId) return;
    setIsLoading(true);

    try {
      // Bangun payload update
      const payload: UpdateUserPayload = {
        name: profile.name,
        email: profile.email,
        phoneNumber: profile.phone,
      };

      // Tambahkan URL gambar jika ada
      if (profile.imageUrl) {
        payload.imageUrl = profile.imageUrl;
      }

      // Tambahkan field password jika mengubah password
      if (profile.newPassword) {
        payload.oldPassword = profile.oldPassword;
        payload.newPassword = profile.newPassword;
      }

      // Panggil API update
      await userService.updateProfile(userId, payload);

      toast.success(successMessage);
      setEditMode(false);

      // Update local storage dengan data profil baru
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

      // Bersihkan field password
      setProfile((p) => ({ ...p, oldPassword: "", newPassword: "" }));
    } catch (err) {
      // Tangani error API
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
   * Hapus akun pengguna secara permanen
   * Bersihkan sesi dan redirect ke login
   */
  const deleteAccount = async () => {
    if (!userId) return;
    setIsLoading(true);

    try {
      await userService.deleteAccount(userId);

      // Bersihkan local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      toast.success("Akun berhasil dihapus");
      router.replace("/login");
    } catch (err) {
      // Tangani error API
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
    // State profil
    profile,
    setProfile,

    // State UI
    editMode,
    setEditMode,
    isLoading,

    // Visibilitas password
    showOldPassword,
    setShowOldPassword,
    showNewPassword,
    setShowNewPassword,

    // Aksi
    saveProfile,
    deleteAccount,
  };
}
