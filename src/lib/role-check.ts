import { normalizeRole, UserRole } from "@/lib/auth";

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

export function isSeller(): boolean {
  const role = getStoredUserRole();
  return role === "SELLER";
}
