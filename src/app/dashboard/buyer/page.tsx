"use client";

import CatalogPropertyCard from "@/components/CatalogPropertyCard";
import { useCatalogProperties } from "@/hooks/property/useCatalogProperties";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function BuyerHome() {
  const {
    properties,
    loading,
    error,
    searchKeyword,
    setSearchKeyword,
    fetchProperties,
  } = useCatalogProperties();

  // FETCH PROPERTIES ON MOUNT
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

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

      {/* SEARCH BAR WITH DEBOUNCE */}
      <div className="bg-white shadow-sm border rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 sm:mb-8 w-full">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Search className="text-gray-500 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
          <input
            type="text"
            placeholder="Cari properti berdasarkan lokasi, nama, atau tipe..."
            className="flex-1 outline-none text-sm sm:text-base min-w-0"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <button
          className="px-6 py-2.5 sm:py-2 rounded-full bg-[#39D177] text-white hover:bg-[#2FAE63] transition text-sm sm:text-base whitespace-nowrap flex-shrink-0 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : (
            "Cari"
          )}
        </button>
      </div>

      {/* FILTER BUTTONS */}
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

      {/* SECTION HEADER */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          {searchKeyword
            ? `Hasil Pencarian "${searchKeyword}"`
            : "Rekomendasi Untukmu"}
        </h2>

        <Link
          href="/dashboard/buyer/properties"
          className="text-[#39D177] font-medium hover:underline text-sm sm:text-base whitespace-nowrap flex-shrink-0"
        >
          Lihat Semua →
        </Link>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* LOADING STATE */}
      {loading && properties.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200 rounded-t-xl" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-5 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PROPERTIES GRID */}
      {!loading && properties.length === 0 && !error && (
        <div className="text-center py-12 text-gray-500">
          <p>Tidak ada properti ditemukan</p>
        </div>
      )}

      {properties.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {properties.map((property, index) => (
            <CatalogPropertyCard
              key={property.propertyId}
              property={property}
              badge={index === 0 ? "Featured" : index < 3 ? "Hot" : undefined}
            />
          ))}
        </div>
      )}
    </main>
  );
}
