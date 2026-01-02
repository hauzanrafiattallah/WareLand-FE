/**
 * Auth Service
 * API calls for authentication-related operations
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
   * Authenticate user with username and password
   * @param payload - Login credentials
   * @returns Token and user profile data
   */
  login: async (payload: LoginPayload) => {
    const { data } = await axiosInstance.post<ApiResponse<LoginResponseData>>(
      "/api/auth/login",
      payload
    );
    return data;
  },

  /**
   * Register new user account
   * @param payload - Registration data including role
   * @returns Created user profile
   */
  register: async (payload: RegisterApiPayload) => {
    const { data } = await axiosInstance.post<
      ApiResponse<RegisterResponseData>
    >("/api/auth/register", payload);
    return data;
  },

  /**
   * Logout current user session
   * @returns Confirmation response
   */
  logout: async () => {
    const { data } = await axiosInstance.post<ApiResponse<null>>(
      "/api/auth/logout"
    );
    return data;
  },
};
