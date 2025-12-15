"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService, loginSchema } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { getDashboardPathByRole, normalizeRole } from "@/lib/auth";
import { AxiosError } from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const validationResult = loginSchema.safeParse({
        username: email,
        password,
      });

      if (!validationResult.success) {
        const errorMessage = validationResult.error.issues[0].message;
        toast.error(errorMessage);
        setIsLoading(false);
        return;
      }

      const response = await authService.login({
        username: email,
        password: password,
      });

      if (response.success) {
        toast.success(response.message);
        // Simpan token untuk Authorization header (dipakai oleh /api/auth/me)
        const token = (response as any)?.data?.token || (response as any)?.data?.accessToken;
        if (token) {
          localStorage.setItem("accessToken", token);
        }

        // Simpan user seadanya dari response
        localStorage.setItem("user", JSON.stringify(response.data));

        // Tentukan role dan tujuan redirect secara lebih robust
        let role = normalizeRole((response as any)?.data?.role);

        // Jika role belum jelas dari response, coba ambil dari /me
        if (!role && token) {
          try {
            const me = await userService.getMe();
            role = normalizeRole(me?.data?.role);
            // Update cache user bila info lebih lengkap
            if (me?.data) {
              localStorage.setItem("user", JSON.stringify(me.data));
            }
          } catch (_) {
            // abaikan error; akan pakai default safe route
          }
        }

        const target = getDashboardPathByRole(role);
        router.push(target);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ||
            "Gagal login, periksa kredensial Anda"
        );
      } else {
        toast.error("Terjadi kesalahan sistem");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#D6F5E7] px-4">
      <Card className="w-full max-w-md p-10 rounded-2xl shadow-xl border border-[#39D177]/20 bg-white space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-[#2FAE63]">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Masuk ke akun WareLand kamu</p>
        </div>

        <div className="space-y-4">
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2FAE63]/70 hover:text-[#2FAE63] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

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
