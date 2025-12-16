import { axiosInstance } from "@/lib/axios";
import { UpdateUserPayload } from "./user.payload";
import { ApiResponse, UserProfile } from "./user.response";

export const userService = {
  getMe: async () => {
    const { data } = await axiosInstance.get<
      ApiResponse<UserProfile>
    >("/api/auth/me");
    return data;
  },

  updateProfile: async (
    id: number,
    payload: UpdateUserPayload
  ) => {
    const { data } = await axiosInstance.put<
      ApiResponse<UserProfile>
    >(`/api/users/${id}`, payload);
    return data;
  },
};
