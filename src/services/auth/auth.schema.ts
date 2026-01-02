/**
 * Skema Validasi Autentikasi
 * Skema Zod untuk memvalidasi data form autentikasi
 */

import { z } from "zod";

/** Skema validasi form login */
export const loginSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

/** Skema validasi form registrasi dengan konfirmasi password */
export const registerSchema = z
  .object({
    username: z.string().min(3, "Username minimal 3 karakter"),
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Format email tidak valid"),
    phoneNumber: z
      .string()
      .min(10, "Nomor telepon minimal 10 digit")
      .regex(/^[0-9]+$/, "Nomor telepon hanya angka"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z
      .string()
      .min(6, "Konfirmasi password minimal 6 karakter"),
    role: z.enum(["pembeli", "penjual"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

/** Tipe yang diinferensikan dari skema login */
export type LoginForm = z.infer<typeof loginSchema>;

/** Tipe yang diinferensikan dari skema registrasi */
export type RegisterForm = z.infer<typeof registerSchema>;
