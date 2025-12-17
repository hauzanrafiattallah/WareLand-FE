"use client";

import { dashboardNav, UserRole } from "@/lib/dashboard-nav";

export function useRoleNav(role: UserRole) {
  return dashboardNav[role];
}
