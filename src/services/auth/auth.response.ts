// Generic wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// USER PROFILE
export interface UserProfile {
  id: number;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: "BUYER" | "SELLER";
  createdAt: string;
  updatedAt: string;
}

// LOGIN
export interface LoginResponseData {
  token: string;
  profile: UserProfile;
}

// REGISTER
export type RegisterResponseData = UserProfile;
