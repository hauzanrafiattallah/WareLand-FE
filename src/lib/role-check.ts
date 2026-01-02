/**
 * Role Check Utilities
 * Helper functions for checking user roles from local storage
 */

import { normalizeRole } from "@/lib/auth";
import { UserRole } from "@/types/auth";

/**
 * Get current user role from local storage
 * @returns User role or null if not found/invalid
 */
export function getStoredUserRole(): UserRole | null {
  if (typeof window === "undefined") return null;

  const role = localStorage.getItem("userRole");
  if (!role) return null;

  try {
    return normalizeRole(role);
  } catch {
    return null;
  }
}

/**
 * Check if current user is a seller
 * @returns True if user has SELLER role
 */
export function isSeller(): boolean {
  const role = getStoredUserRole();
  return role === "SELLER";
}
