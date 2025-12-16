export type AppUserRole = "BUYER" | "SELLER";

export function normalizeRole(role: unknown): AppUserRole | undefined {
  if (!role) return;

  const value = String(role).toLowerCase();

  if (value === "buyer" || value === "pembeli") return "BUYER";
  if (value === "seller" || value === "penjual") return "SELLER";

  return;
}

export function getDashboardPathByRole(
  role?: AppUserRole
): string {
  if (role === "SELLER") return "/dashboard/seller";
  return "/dashboard/buyer";
}
