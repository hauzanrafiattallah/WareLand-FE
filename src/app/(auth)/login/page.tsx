/**
 * Halaman Login
 * Antarmuka autentikasi untuk pengguna yang sudah terdaftar
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

import { useLogin } from "@/hooks/auth/useLogin";

export default function LoginPage() {
  // Inisialisasi hook login untuk state dan handler form
  const {
    email,
    password,
    isLoading,
    showPassword,
    setEmail,
    setPassword,
    setShowPassword,
    handleLogin,
  } = useLogin();

  return (
    // Container halaman dengan layout kartu di tengah
    <div className="w-full min-h-screen flex items-center justify-center bg-[#D6F5E7] px-4">
      <Card className="w-full max-w-md p-10 rounded-2xl shadow-xl border border-[#39D177]/20 bg-white space-y-6">
        {/* Header halaman dengan judul dan subjudul */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-[#2FAE63]">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Masuk ke akun WareLand kamu</p>
        </div>

        {/* Field input form login */}
        <div className="space-y-4">
          {/* Field input email/username */}
          <div className="space-y-1">
            <Label className="text-[#2FAE63] text-sm">Username / Email</Label>
            <Input
              type="text"
              placeholder="Masukkan username"
              className="border border-[#39D177]/40 focus-visible:ring-[#39D177] bg-white h-11 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Field input password dengan toggle visibilitas */}
          <div className="space-y-1">
            <Label className="text-[#2FAE63] text-sm">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className="border border-[#39D177]/40 focus-visible:ring-[#39D177] bg-white h-11 rounded-xl pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              {/* Tombol toggle visibilitas password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2FAE63]/70 hover:text-[#2FAE63] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Tombol submit dengan state loading */}
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-[#39D177] hover:bg-[#2FAE63] text-white text-[15px] py-5 rounded-full mt-2 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5 text-white" />
            ) : (
              "Login"
            )}
          </Button>
        </div>

        {/* Footer dengan link registrasi */}
        <p className="text-sm text-center text-gray-700">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-[#39D177] font-semibold hover:underline"
          >
            Daftar di sini
          </Link>
        </p>
      </Card>
    </div>
  );
}
