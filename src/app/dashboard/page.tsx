"use client";

import { getDashboardPathByRole, normalizeRole } from "@/lib/auth";
import { userService } from "@/services/user/user.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        // Coba dapatkan role dari localStorage terlebih dahulu
        let role: string | undefined;
        if (typeof window !== "undefined") {
          const userRaw = localStorage.getItem("user");
          if (userRaw) {
            try {
              const parsed = JSON.parse(userRaw);
              role = parsed?.role;
            } catch (_) {
              // ignore parse error
            }
          }
        }

        let normalized = normalizeRole(role);

        // Jika belum ada role, coba fetch dari /me (butuh token via interceptor)
        if (!normalized) {
          try {
            const me = await userService.getMe();
            normalized = normalizeRole(me?.data?.role);
            if (me?.data && typeof window !== "undefined") {
              localStorage.setItem("user", JSON.stringify(me.data));
            }
          } catch (_) {
            // Jika tidak bisa mengambil profil, arahkan ke login
            if (!cancelled) router.replace("/login");
            return;
          }
        }

        const target = getDashboardPathByRole(normalized);
        if (!cancelled) router.replace(target);
      } catch (_) {
        if (!cancelled) router.replace("/login");
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [router]);

  // Simple loading UI
  return (
    <main className="w-full min-h-[60vh] flex items-center justify-center">
      <span className="text-gray-600">Mengarahkan ke dashboard…</span>
    </main>
  );
}
