// src/lib/auth.ts

export type UserRole = "SELLER" | "BUYER" | "ADMIN";

/**
 * Normalisasi role dari backend
 * - PASTI return string (tidak pernah undefined)
 * - Akan throw error jika role tidak valid
 */
export function normalizeRole(role: string): UserRole {
  const normalized = role.toUpperCase();

  if (
    normalized !== "SELLER" &&
    normalized !== "BUYER" &&
    normalized !== "ADMIN"
  ) {
    throw new Error("Role tidak valid");
  }

  return normalized;
}

/**
 * Mapping role ke dashboard path
 */
export function getDashboardPathByRole(role: UserRole): string {
  switch (role) {
    case "SELLER":
      return "/dashboard/seller";
    case "BUYER":
      return "/dashboard/buyer";
    case "ADMIN":
      return "/dashboard/admin";
    default:
      return "/login";
  }
}
