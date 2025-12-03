"use client";

import PropertyCard from "@/components/PropertyCard";

const savedProperties = [
  {
    id: 1,
    title: "Rumah Modern Minimalis",
    price: "750.000.000",
    location: "Bandung",
    seller: "Andi Setiawan",
    image: "/home.png",
    badge: "Saved",
  },
  {
    id: 2,
    title: "Villa Pemandangan Gunung",
    price: "1.200.000.000",
    location: "Lembang",
    seller: "Sari Puspita",
    image: "/home.png",
    badge: "Saved",
  },
];

export default function WishlistPage() {
  return (
    <main className="px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Wishlist</h1>
      <p className="text-gray-600 mb-8">
        Properti yang kamu simpan akan muncul di sini.
      </p>

      {savedProperties.length === 0 ? (
        <p className="text-gray-500">Belum ada properti disimpan.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.map((item) => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      )}
    </main>
  );
}
