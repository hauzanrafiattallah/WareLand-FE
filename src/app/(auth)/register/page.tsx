/**
 * Halaman Registrasi Modern
 * Antarmuka registrasi dengan react-hook-form dan Zod
 */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Eye, EyeOff, Loader2, UserPlus, ShoppingBag, Store, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, RegisterForm } from "@/services/auth/auth.schema";
import { useRegisterSubmit } from "@/hooks/auth";

export default function RegisterPage() {
  // State untuk toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Hook untuk logika submit
  const { onSubmit: submitRegister } = useRegisterSubmit();

  // Inisialisasi react-hook-form dengan Zod resolver
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      role: "pembeli",
    },
  });

  // Watch role untuk styling kondisional
  const selectedRole = watch("role");

  return (
    <div className="min-h-screen w-full flex">
      {/* Panel kiri - Form registrasi */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-white overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Logo mobile */}
          <div className="lg:hidden text-center mb-6">
            <div className="inline-flex items-center gap-2 text-2xl font-bold text-[#39D177]">
              <div className="w-10 h-10 bg-[#39D177] rounded-xl flex items-center justify-center">
                <span className="text-white text-lg">W</span>
              </div>
              WareLand
            </div>
          </div>

          {/* Header form */}
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Buat Akun Baru
            </h1>
            <p className="text-gray-500">
              Bergabung dengan WareLand dan mulai eksplorasi properti
            </p>
          </div>

          {/* Form registrasi */}
          <form onSubmit={handleSubmit(submitRegister)} className="space-y-4">
            {/* Pilihan role */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Daftar sebagai</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 gap-3">
                    {/* Tombol Pembeli */}
                    <button
                      type="button"
                      onClick={() => field.onChange("pembeli")}
                      disabled={isSubmitting}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                        field.value === "pembeli"
                          ? "border-[#39D177] bg-[#39D177]/5 shadow-lg shadow-[#39D177]/20"
                          : "border-gray-200 hover:border-[#39D177]/50 hover:bg-gray-50"
                      }`}
                    >
                      {field.value === "pembeli" && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#39D177] rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <ShoppingBag className={`w-8 h-8 mx-auto mb-2 ${
                        field.value === "pembeli" ? "text-[#39D177]" : "text-gray-400"
                      }`} />
                      <p className={`font-semibold ${
                        field.value === "pembeli" ? "text-[#39D177]" : "text-gray-600"
                      }`}>Pembeli</p>
                      <p className="text-xs text-gray-400 mt-1">Cari properti impian</p>
                    </button>

                    {/* Tombol Penjual */}
                    <button
                      type="button"
                      onClick={() => field.onChange("penjual")}
                      disabled={isSubmitting}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                        field.value === "penjual"
                          ? "border-[#39D177] bg-[#39D177]/5 shadow-lg shadow-[#39D177]/20"
                          : "border-gray-200 hover:border-[#39D177]/50 hover:bg-gray-50"
                      }`}
                    >
                      {field.value === "penjual" && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#39D177] rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <Store className={`w-8 h-8 mx-auto mb-2 ${
                        field.value === "penjual" ? "text-[#39D177]" : "text-gray-400"
                      }`} />
                      <p className={`font-semibold ${
                        field.value === "penjual" ? "text-[#39D177]" : "text-gray-600"
                      }`}>Penjual</p>
                      <p className="text-xs text-gray-400 mt-1">Jual properti Anda</p>
                    </button>
                  </div>
                )}
              />
            </div>

            {/* Grid fields - 2 kolom di desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username123"
                  {...register("username")}
                  disabled={isSubmitting}
                  className={`h-11 rounded-xl border-2 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${
                    errors.username
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#39D177]"
                  }`}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs">{errors.username.message}</p>
                )}
              </div>

              {/* Field nama */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Nama Lengkap
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  disabled={isSubmitting}
                  className={`h-11 rounded-xl border-2 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${
                    errors.name
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#39D177]"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
            </div>

            {/* Grid fields - 2 kolom di desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                  disabled={isSubmitting}
                  className={`h-11 rounded-xl border-2 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${
                    errors.email
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#39D177]"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Field phone */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-gray-700 font-medium">
                  Nomor Telepon
                </Label>
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder="08123456789"
                  {...register("phoneNumber")}
                  disabled={isSubmitting}
                  className={`h-11 rounded-xl border-2 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${
                    errors.phoneNumber
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#39D177]"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
                )}
              </div>
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
                  placeholder="Minimal 6 karakter"
                  {...register("password")}
                  disabled={isSubmitting}
                  className={`h-11 rounded-xl border-2 pr-12 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${
                    errors.password
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#39D177]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#39D177] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password.message}</p>
              )}
            </div>

            {/* Field konfirmasi password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                Konfirmasi Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Ulangi password"
                  {...register("confirmPassword")}
                  disabled={isSubmitting}
                  className={`h-11 rounded-xl border-2 pr-12 transition-all duration-200 bg-white disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed ${
                    errors.confirmPassword
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-[#39D177]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#39D177] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Tombol submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-[#39D177] to-[#2FAE63] hover:from-[#2FAE63] hover:to-[#1E8E4A] text-white font-semibold rounded-xl shadow-lg shadow-[#39D177]/30 hover:shadow-xl hover:shadow-[#39D177]/40 transition-all duration-300 flex items-center justify-center gap-2 mt-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Daftar Sekarang
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-400">atau</span>
            </div>
          </div>

          {/* Link login */}
          <p className="text-center text-gray-600">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-[#39D177] font-semibold hover:text-[#2FAE63] transition-colors hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>

      {/* Panel kanan - Ilustrasi (hidden di mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#39D177] via-[#2FAE63] to-[#1E8E4A] relative overflow-hidden">
        {/* Dekorasi bubble */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-32 left-20 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-white/5 rounded-full blur-lg" />
        
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
          <h2 className="text-4xl font-bold mb-4 text-center">Bergabung dengan Kami</h2>
          <p className="text-white/80 text-center text-lg max-w-md">
            Ribuan properti menanti Anda. Daftar sekarang dan temukan hunian impian.
          </p>
          
          {/* Fitur highlight */}
          <div className="mt-10 space-y-3">
            <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-xl backdrop-blur-sm">
              <Sparkles className="w-5 h-5" />
              <span>Verifikasi properti terjamin</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-xl backdrop-blur-sm">
              <Sparkles className="w-5 h-5" />
              <span>Transaksi aman & terpercaya</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-xl backdrop-blur-sm">
              <Sparkles className="w-5 h-5" />
              <span>Dukungan pelanggan 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
