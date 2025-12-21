export type UserRole = "SELLER" | "BUYER";

export interface UserProfile {
  id: number;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
