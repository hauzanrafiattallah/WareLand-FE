"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/auth/useLogin";

export default function LoginPage() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    isLoading,
  } = useLogin();

  return (
    <div className="space-y-4">
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleLogin} disabled={isLoading}>
        Login
      </Button>
    </div>
  );
}
