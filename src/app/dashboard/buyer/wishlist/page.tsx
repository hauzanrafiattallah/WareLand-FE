"use client";

import CatalogPropertyCard from "@/components/CatalogPropertyCard";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/property/useWishlist";
import { Heart, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, isLoaded, clearWishlist } = useWishlist();

  // Show loading state while hydrating
  if (!isLoaded) {
    return (
      <main className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-64 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200"
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
        </div>
      </main>
    );
  }

  return (
    <main className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-red-500 fill-red-500" />
            Wishlist
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Properti yang kamu simpan akan muncul di sini.
          </p>
        </div>

        {wishlist.length > 0 && (
          <Button
            variant="outline"
            onClick={clearWishlist}
            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 rounded-full"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Hapus Semua
          </Button>
        )}
      </div>

      {/* WISHLIST COUNT */}
      {wishlist.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-red-600">
              {wishlist.length}
            </span>{" "}
            properti tersimpan dalam wishlist kamu
          </p>
        </div>
      )}

      {/* EMPTY STATE */}
      {wishlist.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Wishlist Kosong
          </h3>
          <p className="text-gray-500 mb-4 max-w-md mx-auto">
            Belum ada properti yang disimpan. Klik ikon ❤️ pada properti untuk
            menambahkannya ke wishlist.
          </p>
          <Button
            asChild
            className="bg-[#39D177] hover:bg-[#2FAE63] text-white rounded-full"
          >
            <a href="/dashboard/buyer">Jelajahi Properti</a>
          </Button>
        </div>
      )}

      {/* WISHLIST GRID */}
      {wishlist.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {wishlist.map((property) => (
            <CatalogPropertyCard
              key={property.propertyId}
              property={property}
              badge="Saved"
            />
          ))}
        </div>
      )}
    </main>
  );
}
