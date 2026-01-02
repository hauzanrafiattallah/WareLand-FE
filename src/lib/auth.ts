/**
 * Auth Utilities
 * Helper functions for authentication and authorization
 */

import { UserRole } from "@/types/auth";

/**
 * Normalize role string from backend to standard format
 * @param role - Role string from API response
 * @returns Normalized UserRole
 * @throws Error if role is not valid
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
 * Get dashboard path for a specific role
 * @param role - User's role
 * @returns Dashboard URL path
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
