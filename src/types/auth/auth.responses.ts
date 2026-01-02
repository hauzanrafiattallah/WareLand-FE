/**
 * Auth Response Types
 * Type definitions for authentication API responses
 */

/** User profile data returned from auth endpoints */
export interface AuthUserProfile {
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

/** Login endpoint response data */
export interface LoginResponseData {
  token: string;
  profile: AuthUserProfile;
}

/** Register endpoint response data (same as user profile) */
export type RegisterResponseData = AuthUserProfile;
