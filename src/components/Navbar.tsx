"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={60}
            height={60}
            alt="WareLand Logo"
            className="object-contain"
          />
          <span className="text-lg font-semibold text-gray-900">WareLand</span>
        </Link>

        {/* CTA */}
        <Link
          href="/login"
          className="px-6 py-2 rounded-full text-white bg-[#39D177] hover:bg-[#2FAE63] transition font-medium"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
