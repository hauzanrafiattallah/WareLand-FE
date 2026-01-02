/**
 * Tipe Respons Autentikasi
 * Definisi tipe untuk respons API autentikasi
 */

/** Data profil pengguna yang dikembalikan dari endpoint auth */
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

/** Data respons endpoint login */
export interface LoginResponseData {
  token: string;
  profile: AuthUserProfile;
}

/** Data respons endpoint registrasi (sama dengan profil pengguna) */
export type RegisterResponseData = AuthUserProfile;
