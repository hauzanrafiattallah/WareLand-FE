/**
 * useRoleNav Hook
 * Returns navigation items based on user role
 */

"use client";

import { dashboardNav, UserRole } from "@/lib/dashboard-nav";

/**
 * Custom hook for getting role-specific navigation
 * @param role - Current user's role
 * @returns Navigation configuration for the role
 */
export function useRoleNav(role: UserRole) {
  return dashboardNav[role];
}
