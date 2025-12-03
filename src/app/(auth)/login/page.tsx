"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#D6F5E7] px-4">
      <Card className="w-full max-w-md p-10 rounded-2xl shadow-xl border border-[#39D177]/20 bg-white space-y-6">
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-[#2FAE63]">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Masuk ke akun WareLand kamu</p>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          {/* EMAIL */}
          <div className="space-y-1">
            <Label className="text-[#2FAE63] text-sm">Email</Label>
            <Input
              type="email"
              placeholder="Masukkan email"
              className="border border-[#39D177]/40 focus-visible:ring-[#39D177] bg-white h-11 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <Label className="text-[#2FAE63] text-sm">Password</Label>
            <Input
              type="password"
              placeholder="Masukkan password"
              className="border border-[#39D177]/40 focus-visible:ring-[#39D177] bg-white h-11 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* BUTTON LOGIN */}
          <Button className="w-full bg-[#39D177] hover:bg-[#2FAE63] text-white text-[15px] py-5 rounded-full mt-2">
            Login
          </Button>
        </div>

        {/* FOOTER */}
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
