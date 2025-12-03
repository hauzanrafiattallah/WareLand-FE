"use client";

import PropertyCard from "@/components/PropertyCard";
import PropertyFilter from "@/components/PropertyFilter";
import { useState } from "react";

type Property = {
  id: number;
  title: string;
  price: string;
  location: string;
  seller: string;
  image: string;
  badge?: string;
};

const dummyProperties: Property[] = [
  {
    id: 1,
    title: "Rumah Modern Minimalis",
    price: "750.000.000",
    location: "Bandung",
    seller: "Andi Setiawan",
    image: "/home.png",
    badge: "New",
  },
  {
    id: 2,
    title: "Villa Pemandangan Gunung",
    price: "1.200.000.000",
    location: "Lembang",
    seller: "Sari Puspita",
    image: "/home.png",
    badge: "Premium",
  },
  {
    id: 3,
    title: "Villa Pemandangan Gunung",
    price: "1.200.000.000",
    location: "Lembang",
    seller: "Sari Puspita",
    image: "/home.png",
    badge: "Premium",
  },
];

type FilterParams = {
  keyword: string;
  location: string;
  type: string;
  priceRange: string;
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(dummyProperties);
  const [sortBy, setSortBy] = useState<string>("");

  function handleFilter(filters: FilterParams) {
    console.log("Filter Applied:", filters);
  }

  function handleSort(type: string) {
    setSortBy(type);

    const sorted = [...properties];
    if (type === "price-high") {
      sorted.sort(
        (a, b) =>
          parseInt(b.price.replace(/\./g, "")) -
          parseInt(a.price.replace(/\./g, ""))
      );
    }
    if (type === "price-low") {
      sorted.sort(
        (a, b) =>
          parseInt(a.price.replace(/\./g, "")) -
          parseInt(b.price.replace(/\./g, ""))
      );
    }
    setProperties(sorted);
  }

  return (
    <main className="px-6 py-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Cari Properti Impianmu
          </h1>
          <p className="text-gray-600 mt-1">
            Temukan rumah, apartment, atau villa sesuai kebutuhanmu.
          </p>
        </div>

        {/* SORTER */}
        <select
          className="mt-4 md:mt-0 border border-gray-300 rounded-full px-4 pr-10 py-2 bg-white shadow-sm"
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-high">Harga Tertinggi</option>
          <option value="price-low">Harga Terendah</option>
        </select>
      </div>

      {/* FILTER */}
      <PropertyFilter onFilter={handleFilter} />

      {/* PROPERTY LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {properties.map((item) => (
          <PropertyCard key={item.id} property={item} />
        ))}
      </div>

      {/* LOAD MORE */}
      <div className="flex justify-center mt-10">
        <button className="px-8 py-3 rounded-full bg-[#39D177] text-white font-medium hover:bg-[#2FAE63] transition">
          Load More
        </button>
      </div>
    </main>
  );
}
