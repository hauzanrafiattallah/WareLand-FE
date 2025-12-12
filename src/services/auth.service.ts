import { axiosInstance } from "@/lib/axios";
import { z } from "zod";

// --- Zod Schemas ---
export const loginSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export const registerSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  confirmPassword: z.string().min(6, "Konfirmasi password minimal 6 karakter"),
  role: z.enum(["pembeli", "penjual"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

// --- Types ---
export type LoginPayload = z.infer<typeof loginSchema>;
// Kita butuh tipe khusus untuk API karena UI tidak menyediakan field name & phone
export type RegisterApiPayload = {
  username: string;
  password: string;
  email: string;
  role: "BUYER" | "SELLER"; // Sesuai API Spec
  name: string;        // Field wajib API
  phoneNumber: string; // Field wajib API
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    username: string;
    role: "BUYER" | "SELLER";
    // field lain diabaikan karena belum dipakai
  };
}

// --- API Functions ---

export const authService = {
  login: async (payload: LoginPayload) => {
    const response = await axiosInstance.post<AuthResponse>("/api/auth/login", payload);
    return response.data;
  },

  register: async (payload: RegisterApiPayload) => {
    const response = await axiosInstance.post<AuthResponse>("/api/auth/register", payload);
    return response.data;
  },
};