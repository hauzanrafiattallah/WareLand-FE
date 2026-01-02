/**
 * Tipe Autentikasi
 * Definisi tipe untuk data terkait autentikasi
 */

/** Role pengguna yang tersedia di sistem */
export type UserRole = "SELLER" | "BUYER" | "ADMIN";

/** Opsi role untuk form registrasi (Bahasa Indonesia) */
export type RegisterRole = "pembeli" | "penjual";

/** Payload untuk request API login */
export interface LoginPayload {
  username: string;
  password: string;
}

/** Payload untuk request API registrasi */
export interface RegisterApiPayload {
  username: string;
  password: string;
  email: string;
  role: "BUYER" | "SELLER";
  name: string;
  phoneNumber: string;
}

/** Struktur data form login */
export interface LoginFormData {
  username: string;
  password: string;
}

/** Struktur data form registrasi */
export interface RegisterFormData {
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: RegisterRole;
}
