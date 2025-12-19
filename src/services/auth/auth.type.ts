export type UserRole = "SELLER" | "BUYER" | "ADMIN";

export interface UserProfile {
  id: number;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: UserRole; // ✅ SESUAI BACKEND
  createdAt: string;
  updatedAt: string;
}
