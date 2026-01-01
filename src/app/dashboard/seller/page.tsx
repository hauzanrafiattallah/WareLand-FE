"use client";

import { redirect } from "next/navigation";

export default function SellerDashboardPage() {
  redirect("/dashboard/seller/listings");
}
