"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useRoleGuard(allowedRole: "BUYER" | "SELLER") {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userRaw = localStorage.getItem("user");

    if (!token || !userRaw) {
      router.replace("/login");
      return;
    }

    try {
      const user = JSON.parse(userRaw);

      if (user.role === allowedRole) {
        return;
      }

      if (user.role === "BUYER") {
        router.replace("/dashboard/buyer");
        return;
      }

      if (user.role === "SELLER") {
        router.replace("/dashboard/seller");
        return;
      }

      router.replace("/login");
    } catch {
      router.replace("/login");
    }
  }, [allowedRole, router]);
}
