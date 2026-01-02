/**
 * Halaman Login Modern
 * Antarmuka autentikasi dengan react-hook-form dan Zod
 */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2, LogIn, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, LoginForm } from "@/services/auth/auth.schema";
import { useLoginSubmit } from "@/hooks/auth";

export default function LoginPage() {
  // State untuk toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Hook untuk logika submit
  const { onSubmit: submitLogin } = useLoginSubmit();

  // Inisialisasi react-hook-form dengan Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="min-h-screen w-full flex">
      {/* Panel kiri - Ilustrasi (hidden di mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#39D177] via-[#2FAE63] to-[#1E8E4A] relative overflow-hidden">
        {/* Dekorasi bubble */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-32 right-20 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-lg" />
        
        {/* Konten ilustrasi */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-white">
          <div className="mb-8">
            <Image
              src="/home.png"
              alt="WareLand"
              width={280}
              height={280}
              className="rounded-3xl shadow-2xl"
            />
          </div>
          <h2 className="text-4xl font-bold mb-4 text-center">Selamat Datang di WareLand</h2>
          <p className="text-white/80 text-center text-lg max-w-md">
            Platform terpercaya untuk jual beli properti dengan pengalaman yang mudah dan aman.
          </p>
          
          {/* Fitur highlight */}
          <div className="mt-10 flex gap-6">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">100% Aman</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Terverifikasi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Panel kanan - Form login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-2 text-2xl font-bold text-[#39D177]">
              <div className="w-10 h-10 bg-[#39D177] rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">W</span>
              </div>
              WareLand
            </div>
          </div>

          {/* Header form */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Masuk ke Akun
            </h1>
            <p className="text-gray-500">
              Silakan masukkan kredensial Anda untuk melanjutkan
            </p>
          </div>

          {/* Form login */}
          <form onSubmit={handleSubmit(submitLogin)} className="space-y-5">
            {/* Field username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                {...register("username")}
                disabled={isSubmitting}
                className={`h-12 rounded-xl border-2 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${
                  errors.username
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-[#39D177] focus:ring-[#39D177]/20"
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Field password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  {...register("password")}
                  disabled={isSubmitting}
                  className={`h-12 rounded-xl border-2 pr-12 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${
                    errors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-[#39D177] focus:ring-[#39D177]/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#39D177] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Tombol submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-[#39D177] to-[#2FAE63] hover:from-[#2FAE63] hover:to-[#1E8E4A] text-white font-semibold rounded-xl shadow-lg shadow-[#39D177]/30 hover:shadow-xl hover:shadow-[#39D177]/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Masuk
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-400">atau</span>
            </div>
          </div>

          {/* Link register */}
          <p className="text-center text-gray-600">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-[#39D177] font-semibold hover:text-[#2FAE63] transition-colors hover:underline"
            >
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
