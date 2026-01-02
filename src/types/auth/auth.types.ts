/**
 * Auth Types
 * Type definitions for authentication-related data
 */

/** Available user roles in the system */
export type UserRole = "SELLER" | "BUYER" | "ADMIN";

/** Role options for registration form (Indonesian) */
export type RegisterRole = "pembeli" | "penjual";

/** Payload for login API request */
export interface LoginPayload {
  username: string;
  password: string;
}

/** Payload for register API request */
export interface RegisterApiPayload {
  username: string;
  password: string;
  email: string;
  role: "BUYER" | "SELLER";
  name: string;
  phoneNumber: string;
}

/** Login form data structure */
export interface LoginFormData {
  username: string;
  password: string;
}

/** Register form data structure */
export interface RegisterFormData {
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: RegisterRole;
}
