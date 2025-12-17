"use client";

import PropertyCard from "@/components/PropertyCard";
import { Search } from "lucide-react";
import Link from "next/link";

const featuredProperties = [
  {
    id: 1,
    title: "Rumah Modern Minimalis",
    price: "750.000.000",
    location: "Bandung",
    seller: "Andi Setiawan",
    image: "/home.png",
    badge: "Featured",
  },
  {
    id: 2,
    title: "Villa Pemandangan Gunung",
    price: "1.200.000.000",
    location: "Lembang",
    seller: "Sari Puspita",
    image: "/home.png",
    badge: "Hot",
  },
  {
    id: 3,
    title: "Villa Pemandangan Gunung",
    price: "1.200.000.000",
    location: "Lembang",
    seller: "Sari Puspita",
    image: "/home.png",
    badge: "Hot",
  },
];

export default function BuyerHome() {
  return (
    <main className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 overflow-x-hidden">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 break-words">
          Selamat Datang di WareLand
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
          Temukan properti ideal sesuai kebutuhanmu dengan mudah dan cepat.
        </p>
      </div>

      <div className="bg-white shadow-sm border rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 sm:mb-8 w-full">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Search className="text-gray-500 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
          <input
            type="text"
            placeholder="Cari properti berdasarkan lokasi, nama, atau tipe..."
            className="flex-1 outline-none text-sm sm:text-base min-w-0"
          />
        </div>
        <button className="px-6 py-2.5 sm:py-2 rounded-full bg-[#39D177] text-white hover:bg-[#2FAE63] transition text-sm sm:text-base whitespace-nowrap flex-shrink-0">
          Cari
        </button>
      </div>

      <div className="flex gap-2 sm:gap-3 mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {["Rumah", "Apartment", "Villa", "Ruko", "Tanah"].map((item) => (
          <button
            key={item}
            className="px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition text-sm whitespace-nowrap flex-shrink-0"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Rekomendasi Untukmu
        </h2>

        <Link
          href="/dashboard/properties"
          className="text-[#39D177] font-medium hover:underline text-sm sm:text-base whitespace-nowrap flex-shrink-0"
        >
          Lihat Semua →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {featuredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </main>
  );
}
