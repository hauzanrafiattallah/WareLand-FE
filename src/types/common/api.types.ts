/**
 * Tipe API Umum
 * Definisi tipe yang digunakan bersama untuk respons API di seluruh aplikasi
 */

/** Wrapper respons API generik */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
