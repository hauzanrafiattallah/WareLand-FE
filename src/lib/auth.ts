// Utilities for auth role normalization and dashboard path resolution

export type AppUserRole = "BUYER" | "SELLER";

export function normalizeRole(role: unknown): AppUserRole | undefined {
  if (!role) return undefined;
  const raw = String(role).trim().toLowerCase();
  if (raw === "buyer" || raw === "pembeli") return "BUYER";
  if (raw === "seller" || raw === "penjual") return "SELLER";
  return undefined;
}

export function getDashboardPathByRole(role: unknown): string {
  const norm = normalizeRole(role);
  if (norm === "SELLER") return "/dashboard/seller";
  // default safe route
  return "/dashboard/buyer";
}
