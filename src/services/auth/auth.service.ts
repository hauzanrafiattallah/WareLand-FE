import { axiosInstance } from "@/lib/axios";
import { LoginPayload, RegisterApiPayload } from "./auth.payload";
import {
  ApiResponse,
  LoginResponseData,
  RegisterResponseData,
} from "./auth.response";

export const authService = {
  login: async (payload: LoginPayload) => {
    const { data } = await axiosInstance.post<ApiResponse<LoginResponseData>>(
      "/api/auth/login",
      payload
    );
    return data;
  },

  register: async (payload: RegisterApiPayload) => {
    const { data } = await axiosInstance.post<
      ApiResponse<RegisterResponseData>
    >("/api/auth/register", payload);
    return data;
  },

  logout: async () => {
    const { data } = await axiosInstance.post<ApiResponse<null>>(
      "/api/auth/logout"
    );
    return data;
  },
};
