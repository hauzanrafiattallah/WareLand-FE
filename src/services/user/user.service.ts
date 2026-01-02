/**
 * Layanan Pengguna
 * Panggilan API untuk operasi terkait pengguna
 */

import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/types/common";
import { UpdateUserPayload, UserProfile } from "@/types/user";

export const userService = {
  /**
   * Mendapatkan profil pengguna yang sedang login
   * @returns Data profil pengguna saat ini
   */
  getMe: async () => {
    const { data } = await axiosInstance.get<ApiResponse<UserProfile>>(
      "/api/auth/me"
    );
    return data;
  },

  /**
   * Memperbarui informasi profil pengguna
   * @param id - ID pengguna yang akan diperbarui
   * @param payload - Data profil yang diperbarui
   * @returns Profil pengguna yang sudah diperbarui
   */
  updateProfile: async (id: number, payload: UpdateUserPayload) => {
    const { data } = await axiosInstance.put<ApiResponse<UserProfile>>(
      `/api/users/${id}`,
      payload
    );
    return data;
  },

  /**
   * Menghapus akun pengguna secara permanen
   * @param id - ID pengguna yang akan dihapus
   * @returns Respons konfirmasi
   */
  deleteAccount: async (id: number) => {
    const { data } = await axiosInstance.delete<ApiResponse<null>>(
      `/api/users/${id}`
    );
    return data;
  },
};
