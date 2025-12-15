import axios from "axios";

// Base URL dari environment variable
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menyisipkan JWT secara otomatis di setiap request
axiosInstance.interceptors.request.use((config) => {
  try {
    // Simpan token login Anda dengan key "accessToken"
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers = config.headers ?? {};
        (config.headers as any).Authorization = `Bearer ${token}`;
      }
    }
  } catch (_) {
    // abaikan jika storage tidak tersedia
  }
  return config;
});

// Interceptor untuk handle error global (opsional tapi recommended)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
