/**
 * useRoleGuard Hook
 * Protects routes based on user role
 */

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { UserRole } from "@/types/auth";

/**
 * Custom hook for role-based route protection
 * Redirects unauthorized users to appropriate pages
 * @param allowedRole - The role allowed to access this route
 */
export function useRoleGuard(allowedRole: UserRole) {
  const router = useRouter();

  useEffect(() => {
    // Check for authentication token
    const token = localStorage.getItem("accessToken");
    const userRaw = localStorage.getItem("user");

    // Redirect to login if not authenticated
    if (!token || !userRaw) {
      router.replace("/login");
      return;
    }

    try {
      const user = JSON.parse(userRaw);

      // Allow access if role matches
      if (user.role === allowedRole) {
        return;
      }

      // Redirect BUYER to buyer dashboard
      if (user.role === "BUYER") {
        router.replace("/dashboard/buyer");
        return;
      }

      // Redirect SELLER to seller dashboard
      if (user.role === "SELLER") {
        router.replace("/dashboard/seller");
        return;
      }

      // Fallback to login for unknown roles
      router.replace("/login");
    } catch {
      // Handle JSON parse errors
      router.replace("/login");
    }
  }, [allowedRole, router]);
}
