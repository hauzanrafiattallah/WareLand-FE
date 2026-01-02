/**
 * Layanan Autentikasi
 * Panggilan API untuk operasi terkait autentikasi
 */

import { axiosInstance } from "@/lib/axios";
import {
  LoginPayload,
  LoginResponseData,
  RegisterApiPayload,
  RegisterResponseData,
} from "@/types/auth";
import { ApiResponse } from "@/types/common";

export const authService = {
  /**
   * Autentikasi pengguna dengan username dan password
   * @param payload - Kredensial login
   * @returns Token dan data profil pengguna
   */
  login: async (payload: LoginPayload) => {
    const { data } = await axiosInstance.post<ApiResponse<LoginResponseData>>(
      "/api/auth/login",
      payload
    );
    return data;
  },

  /**
   * Registrasi akun pengguna baru
   * @param payload - Data registrasi termasuk role
   * @returns Profil pengguna yang dibuat
   */
  register: async (payload: RegisterApiPayload) => {
    const { data } = await axiosInstance.post<
      ApiResponse<RegisterResponseData>
    >("/api/auth/register", payload);
    return data;
  },

  /**
   * Logout sesi pengguna saat ini
   * @returns Respons konfirmasi
   */
  logout: async () => {
    const { data } = await axiosInstance.post<ApiResponse<null>>(
      "/api/auth/logout"
    );
    return data;
  },
};
