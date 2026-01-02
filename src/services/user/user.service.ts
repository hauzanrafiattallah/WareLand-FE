/**
 * User Service
 * API calls for user-related operations
 */

import { axiosInstance } from "@/lib/axios";
import { ApiResponse } from "@/types/common";
import { UpdateUserPayload, UserProfile } from "@/types/user";

export const userService = {
  /**
   * Get current authenticated user profile
   * @returns Current user profile data
   */
  getMe: async () => {
    const { data } = await axiosInstance.get<ApiResponse<UserProfile>>(
      "/api/auth/me"
    );
    return data;
  },

  /**
   * Update user profile information
   * @param id - User ID to update
   * @param payload - Updated profile data
   * @returns Updated user profile
   */
  updateProfile: async (id: number, payload: UpdateUserPayload) => {
    const { data } = await axiosInstance.put<ApiResponse<UserProfile>>(
      `/api/users/${id}`,
      payload
    );
    return data;
  },

  /**
   * Delete user account permanently
   * @param id - User ID to delete
   * @returns Confirmation response
   */
  deleteAccount: async (id: number) => {
    const { data } = await axiosInstance.delete<ApiResponse<null>>(
      `/api/users/${id}`
    );
    return data;
  },
};
