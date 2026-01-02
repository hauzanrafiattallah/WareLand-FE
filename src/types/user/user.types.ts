/**
 * Tipe Pengguna
 * Definisi tipe untuk data terkait pengguna
 */

/** Data profil pengguna lengkap */
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

/** Payload untuk memperbarui profil pengguna */
export interface UpdateUserPayload {
  name: string;
  email: string;
  phoneNumber: string;
  oldPassword?: string;
  newPassword?: string;
  imageUrl?: string;
}

/** Struktur state untuk form pengaturan */
export interface SettingProfileState {
  name: string;
  email: string;
  phone: string;
  oldPassword: string;
  newPassword: string;
  imageUrl: string;
}
