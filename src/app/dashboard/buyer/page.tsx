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
    <main className="px-6 py-10">
      {/* WELCOME */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Selamat Datang di WareLand 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Temukan properti ideal sesuai kebutuhanmu dengan mudah dan cepat.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white shadow-sm border rounded-xl p-4 flex items-center gap-3 mb-8">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Cari properti berdasarkan lokasi, nama, atau tipe..."
          className="flex-1 outline-none"
        />
        <button className="px-6 py-2 rounded-full bg-[#39D177] text-white hover:bg-[#2FAE63] transition">
          Cari
        </button>
      </div>

      {/* QUICK FILTERS */}
      <div className="flex gap-3 mb-6 overflow-x-auto">
        {["Rumah", "Apartment", "Villa", "Ruko", "Tanah"].map((item) => (
          <button
            key={item}
            className="px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition text-sm"
          >
            {item}
          </button>
        ))}
      </div>

      {/* FEATURED LISTINGS */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Rekomendasi Untukmu
        </h2>

        <Link
          href="/dashboard/properties"
          className="text-[#39D177] font-medium hover:underline"
        >
          Lihat Semua →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </main>
  );
}
