/**
 * Auth Validation Schemas
 * Zod schemas for validating authentication form data
 */

import { z } from "zod";

/** Login form validation schema */
export const loginSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

/** Register form validation schema with password confirmation */
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

/** Inferred type from login schema */
export type LoginForm = z.infer<typeof loginSchema>;

/** Inferred type from register schema */
export type RegisterForm = z.infer<typeof registerSchema>;
