import { axiosInstance } from "@/lib/axios";

// 1. Definisikan Interface agar tidak perlu pakai 'any'
export interface UpdateUserPayload {
  name: string;
  email: string;
  phoneNumber: string;
  oldPassword?: string;
  newPassword?: string;
}

export const userService = {
  getProfile: async (id: number) => {
    const response = await axiosInstance.get(`/api/users/${id}`);
    return response.data;
  },

  // 2. Gunakan interface tersebut di sini menggantikan 'any'
  updateProfile: async (id: number, data: UpdateUserPayload) => {
    const response = await axiosInstance.put(`/api/users/${id}`, data);
    return response.data;
  },
};