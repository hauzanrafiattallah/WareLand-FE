/**
 * Register Page
 * User registration interface for new users
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

import { useRegister } from "@/hooks/auth/useRegister";

export default function RegisterPage() {
  // Initialize register hook for form state and handlers
  const {
    role,
    username,
    name,
    email,
    phoneNumber,
    password,
    confirmPassword,
    isLoading,
    showPassword,
    showConfirmPassword,
    setRole,
    setUsername,
    setName,
    setEmail,
    setPhoneNumber,
    setPassword,
    setConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleRegister,
  } = useRegister();

  return (
    // Page container with centered card layout
    <div className="w-full min-h-screen flex items-center justify-center bg-[#D6F5E7] px-4">
      <Card className="w-full max-w-md p-10 rounded-2xl shadow-xl border border-[#39D177]/20 bg-white space-y-6">
        {/* Page header with title and subtitle */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-[#2FAE63]">Create Account</h1>
          <p className="text-gray-600 text-sm">
            Daftar untuk mulai menggunakan WareLand
          </p>
        </div>

        {/* Registration form fields */}
        <div className="space-y-4">
          {/* Username input field */}
          <div className="space-y-1">
            <Label className="text-[#2FAE63] text-sm">Username</Label>
            <Input
              placeholder="Masukkan username"
              className="border border-[#39D177]/40 focus-visible:ring-[#39D177] h-11 rounded-xl"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Full name input field */}
          <div className="space-y-1">
            <Label className="text-[#2FAE63] text-sm">Nama Lengkap</Label>
            <Input
              placeholder="Masukkan nama lengkap"
              className="border border-[#39D177]/40 focus-visible:ring-[#39D177] h-11 rounded-xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Email input field */}
          <div className="space-y-1">
            <Label className="text-[#2FAE63] text-sm">Email</Label>
            <Input
              type="email"
              placeholder="Masukkan email"
              className="border border-[#39D177]/40 focus-visible:ring-[#39D177] h-11 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Phone number input field */}
          <div className="space-y-1">
            <Label className="text-[#2FAE63] text-sm">Nomor Telepon</Label>
            <Input
              placeholder="08xxxxxxxxxx"
              className="border border-[#39D177]/40 focus-visible:ring-[#39D177] h-11 rounded-xl"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Password input field with visibility toggle */}
          <div className="space-y-1">
            <Label className="text-[#2FAE63] text-sm">Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                className="border border-[#39D177]/40 focus-visible:ring-[#39D177] h-11 rounded-xl pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              {/* Password visibility toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2FAE63]/70 hover:text-[#2FAE63]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm password input field with visibility toggle */}
          <div className="space-y-1">
            <Label className="text-[#2FAE63] text-sm">
              Konfirmasi Password
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Konfirmasi password"
                className="border border-[#39D177]/40 focus-visible:ring-[#39D177] h-11 rounded-xl pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
              {/* Confirm password visibility toggle button */}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2FAE63]/70 hover:text-[#2FAE63]"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Role selection buttons */}
          <div className="space-y-2">
            <Label className="text-[#2FAE63] text-sm">Daftar sebagai:</Label>

            <div className="grid grid-cols-2 gap-2">
              {/* Buyer role button */}
              <button
                type="button"
                onClick={() => setRole("pembeli")}
                disabled={isLoading}
                className={`h-11 rounded-xl border text-sm transition-colors
                  ${
                    role === "pembeli"
                      ? "bg-[#39D177] text-white border-[#39D177]"
                      : "bg-white text-[#39D177] border-[#39D177]/40 hover:bg-[#E9FBF3]"
                  }`}
              >
                Pembeli
              </button>

              {/* Seller role button */}
              <button
                type="button"
                onClick={() => setRole("penjual")}
                disabled={isLoading}
                className={`h-11 rounded-xl border text-sm transition-colors
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

        {/* Submit button with loading state */}
        <Button
          onClick={handleRegister}
          disabled={isLoading}
          className="w-full bg-[#39D177] hover:bg-[#2FAE63] text-white text-[15px] py-5 rounded-full flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5 text-white" />
          ) : (
            "Register"
          )}
        </Button>

        {/* Footer with login link */}
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
