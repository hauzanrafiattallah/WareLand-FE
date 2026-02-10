import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      <main className="pt-32 max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT TEXT SECTION */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Transaksi Properti <br />
            Lebih <span className="text-[#39D177]">Transparan &</span>{" "}
            <br />
            <span className="text-[#39D177]">Terlindungi</span>
          </h1>

          <p className="text-gray-600 max-w-md">
            WareLand membantu Anda membeli dan menjual properti dengan mudah
            melalui marketplace properti yang transparan dan terpercaya.
          </p>

          {/* TOMBOL */}
          <div className="flex gap-4">
            <Link
              href="/register"
              className="px-6 py-3 rounded-full text-white bg-[#39D177] hover:bg-[#2FAE63] transition font-medium"
            >
              Daftar
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex justify-center"> 
          <Image
            src="/home.png"
            width={450}
            height={450}
            alt="WareLand Property Image"
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>
      </main>
    </div>
  );
}
