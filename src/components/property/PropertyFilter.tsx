/**
 * Komponen PropertyFilter
 * Form filter untuk pencarian properti
 */

"use client";

import { useState } from "react";
import { PropertyFilterParams } from "./property.types";

interface PropertyFilterProps {
  onFilter: (params: PropertyFilterParams) => void;
}

/**
 * Menampilkan form filter properti dengan keyword, lokasi, tipe, dan range harga
 * @param props - Props komponen
 */
export default function PropertyFilter({ onFilter }: PropertyFilterProps) {
  // State form filter
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
      {/* Grid input filter */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Input keyword pencarian */}
        <input
          type="text"
          placeholder="Cari properti..."
          className="border border-gray-300 rounded-xl px-4 py-3"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* Input lokasi */}
        <input
          type="text"
          placeholder="Lokasi"
          className="border border-gray-300 rounded-xl px-4 py-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Select tipe properti */}
        <select
          className="border border-gray-300 rounded-xl px-4 py-3"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Tipe Properti</option>
          <option value="house">Rumah</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
        </select>

        {/* Select range harga */}
        <select
          className="border border-gray-300 rounded-xl px-4 py-3"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="">Harga</option>
          <option value="low">0 - 500jt</option>
          <option value="mid">500jt - 2M</option>
          <option value="high">&gt; 2M</option>
        </select>
      </div>

      {/* Tombol terapkan filter */}
      <button
        onClick={() => onFilter({ keyword, location, type, priceRange })}
        className="mt-4 px-6 py-3 rounded-full bg-[#39D177] text-white hover:bg-[#2FAE63] transition"
      >
        Terapkan Filter
      </button>
    </div>
  );
}
