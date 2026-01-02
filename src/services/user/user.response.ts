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

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
