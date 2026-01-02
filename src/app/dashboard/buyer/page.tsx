"use client";

import { CatalogPropertyCard } from "@/components/property";
import { useCatalogProperties } from "@/hooks/property/useCatalogProperties";
import { Building, Loader2, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";

// Price range options (in Rupiah)
const PRICE_RANGES = [
  { label: "Semua Harga", min: 0, max: Infinity },
  { label: "< 500 Juta", min: 0, max: 500000000 },
  { label: "500 Jt - 1 M", min: 500000000, max: 1000000000 },
  { label: "1 M - 2 M", min: 1000000000, max: 2000000000 },
  { label: "2 M - 5 M", min: 2000000000, max: 5000000000 },
  { label: "> 5 M", min: 5000000000, max: Infinity },
];

export default function BuyerHome() {
  const {
    properties,
    loading,
    error,
    searchKeyword,
    setSearchKeyword,
    fetchProperties,
  } = useCatalogProperties();

  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // FETCH PROPERTIES ON MOUNT
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Filter properties by price range (client-side)
  const filteredProperties = properties.filter((property) => {
    const range = PRICE_RANGES[selectedPriceRange];
    return property.price >= range.min && property.price < range.max;
  });

  const hasActiveFilters = searchKeyword || selectedPriceRange !== 0;

  const clearFilters = () => {
    setSearchKeyword("");
    setSelectedPriceRange(0);
  };

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

      {/* SEARCH BAR */}
      <div className="bg-white shadow-sm border rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4 w-full">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Search className="text-gray-500 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
          <input
            type="text"
            placeholder="Cari properti berdasarkan lokasi atau deskripsi..."
            className="flex-1 outline-none text-sm sm:text-base min-w-0"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          {searchKeyword && (
            <button
              onClick={() => setSearchKeyword("")}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 sm:py-2 rounded-full border transition text-sm flex items-center gap-2 ${
              showFilters || selectedPriceRange !== 0
                ? "border-[#39D177] bg-[#39D177]/5 text-[#39D177]"
                : "border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
            {selectedPriceRange !== 0 && (
              <span className="w-5 h-5 bg-[#39D177] text-white text-xs rounded-full flex items-center justify-center">
                1
              </span>
            )}
          </button>
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
      </div>

      {/* PRICE FILTER */}
      {showFilters && (
        <div className="bg-white shadow-sm border rounded-xl p-4 mb-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900 text-sm">Filter Harga</h3>
            {selectedPriceRange !== 0 && (
              <button
                onClick={() => setSelectedPriceRange(0)}
                className="text-xs text-[#39D177] hover:underline"
              >
                Reset
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {PRICE_RANGES.map((range, index) => (
              <button
                key={index}
                onClick={() => setSelectedPriceRange(index)}
                className={`px-3 py-1.5 rounded-full text-sm transition ${
                  selectedPriceRange === index
                    ? "bg-[#39D177] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVE FILTERS BAR */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">Filter aktif:</span>
          {searchKeyword && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#39D177]/10 text-[#39D177] rounded-full text-sm">
              Keyword: "{searchKeyword}"
              <button
                onClick={() => setSearchKeyword("")}
                className="hover:bg-[#39D177]/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedPriceRange !== 0 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#39D177]/10 text-[#39D177] rounded-full text-sm">
              {PRICE_RANGES[selectedPriceRange].label}
              <button
                onClick={() => setSelectedPriceRange(0)}
                className="hover:bg-[#39D177]/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Hapus semua
          </button>
        </div>
      )}

      {/* SECTION HEADER */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          {hasActiveFilters
            ? `Hasil Pencarian (${filteredProperties.length})`
            : "Semua Properti"}
        </h2>
        <p className="text-sm text-gray-500">
          {filteredProperties.length} properti ditemukan
        </p>
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
          {[1, 2, 3, 4, 5, 6].map((i) => (
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

      {/* EMPTY STATE */}
      {!loading && filteredProperties.length === 0 && !error && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Tidak ada properti ditemukan
          </h3>
          <p className="text-gray-500 mb-4">
            {hasActiveFilters
              ? "Coba ubah filter atau kata kunci pencarian"
              : "Belum ada properti yang tersedia saat ini"}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-6 py-2 rounded-full bg-[#39D177] text-white hover:bg-[#2FAE63] transition"
            >
              Hapus Filter
            </button>
          )}
        </div>
      )}

      {/* PROPERTIES GRID */}
      {filteredProperties.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {filteredProperties.map((property, index) => (
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
