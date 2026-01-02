/**
 * User Types
 * Type definitions for user-related data
 */

/** Complete user profile data */
export interface UserProfile {
  id: number;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: "BUYER" | "SELLER";
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/** Payload for updating user profile */
export interface UpdateUserPayload {
  name: string;
  email: string;
  phoneNumber: string;
  oldPassword?: string;
  newPassword?: string;
  imageUrl?: string;
}

/** State structure for settings form */
export interface SettingProfileState {
  name: string;
  email: string;
  phone: string;
  oldPassword: string;
  newPassword: string;
  imageUrl: string;
}
