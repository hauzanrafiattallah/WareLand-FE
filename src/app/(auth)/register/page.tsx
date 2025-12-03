"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState<"pembeli" | "penjual">("pembeli");

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#D6F5E7] px-4">
      <Card className="w-full max-w-md p-10 rounded-2xl shadow-xl border border-[#39D177]/20 bg-white space-y-6">
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-[#2FAE63]">
            Create Account
          </h1>
          <p className="text-gray-600 text-sm">
            Daftar untuk mulai menggunakan WareLand
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Username */}
          <div className="space-y-1">
            <Label className="text-[#2FAE63] text-sm">Username</Label>
            <Input
              placeholder="Masukkan username"
              className="border border-[#39D177]/40 focus-visible:ring-[#39D177] h-11 rounded-xl"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label className="text-[#2FAE63] text-sm">Email</Label>
            <Input
              type="email"
              placeholder="Masukkan email"
              className="border border-[#39D177]/40 focus-visible:ring-[#39D177] h-11 rounded-xl"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Label className="text-[#2FAE63] text-sm">Password</Label>
            <Input
              type="password"
              placeholder="Masukkan password"
              className="border border-[#39D177]/40 focus-visible:ring-[#39D177] h-11 rounded-xl"
            />
          </div>

          {/* Konfirmasi Password */}
          <div className="space-y-1">
            <Label className="text-[#2FAE63] text-sm">
              Konfirmasi Password
            </Label>
            <Input
              type="password"
              placeholder="Konfirmasi password"
              className="border border-[#39D177]/40 focus-visible:ring-[#39D177] h-11 rounded-xl"
            />
          </div>

          {/* ROLE SEGMENTED CONTROL */}
          <div className="space-y-2">
            <Label className="text-[#2FAE63] text-sm">Daftar sebagai:</Label>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setRole("pembeli")}
                className={`h-11 rounded-xl border text-sm 
                  ${
                    role === "pembeli"
                      ? "bg-[#39D177] text-white border-[#39D177]"
                      : "bg-white text-[#39D177] border-[#39D177]/40 hover:bg-[#E9FBF3]"
                  }`}
              >
                Pembeli
              </button>

              <button
                onClick={() => setRole("penjual")}
                className={`h-11 rounded-xl border text-sm 
                  ${
                    role === "penjual"
                      ? "bg-[#39D177] text-white border-[#39D177]"
                      : "bg-white text-[#39D177] border-[#39D177]/40 hover:bg-[#E9FBF3]"
                  }`}
              >
                Penjual
              </button>
            </div>
          </div>
        </div>

        {/* Register Button */}
        <Button className="w-full bg-[#39D177] hover:bg-[#2FAE63] text-white text-[15px] py-5 rounded-full">
          Register
        </Button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-700">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-[#39D177] font-semibold hover:underline"
          >
            Login di sini
          </Link>
        </p>
      </Card>
    </div>
  );
}
