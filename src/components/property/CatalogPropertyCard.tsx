/**
 * Komponen CatalogPropertyCard
 * Kartu properti untuk katalog dengan fitur wishlist
 */

"use client";

import { useWishlist } from "@/hooks/property/useWishlist";
import { CatalogProperty } from "@/services/property/catalog.property.service";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CatalogPropertyCardProps {
  property: CatalogProperty;
  badge?: string;
  showWishlist?: boolean;
}

/**
 * Menampilkan kartu properti katalog dengan tombol wishlist
 * @param props - Props komponen
 */
export default function CatalogPropertyCard({
  property,
  badge,
  showWishlist = true,
}: CatalogPropertyCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(property.propertyId);

  // Format harga ke Rupiah Indonesia
  const formattedPrice = property.price.toLocaleString("id-ID");

  // Ekstrak lokasi dari alamat (bagian pertama sebelum koma)
  const location = property.address.split(",")[0] || property.address;

  /**
   * Handler klik tombol wishlist
   */
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(property);
  };

  return (
    <Link
      href={`/dashboard/buyer/properties/${property.propertyId}`}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 block group"
    >
      {/* Container gambar */}
      <div className="relative w-full h-48 rounded-t-xl overflow-hidden bg-gray-100">
        <Image
          src={property.imageUrl || "/home.png"}
          alt={property.address}
          fill
          priority
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge properti */}
        {badge && (
          <span className="absolute top-3 left-3 bg-[#39D177] text-white text-xs px-3 py-1 rounded-full shadow">
            {badge}
          </span>
        )}

        {/* Tombol wishlist */}
        {showWishlist && (
          <button
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
              isWishlisted
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500"
            }`}
            title={isWishlisted ? "Hapus dari wishlist" : "Tambah ke wishlist"}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-white" : ""}`} />
          </button>
        )}
      </div>

      {/* Info properti */}
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-lg line-clamp-1">
          {property.description || `Properti #${property.propertyId}`}
        </h3>

        <p className="text-[#39D177] font-bold text-lg">Rp {formattedPrice}</p>

        <p className="text-gray-600 text-sm line-clamp-1">{location}</p>

        <p className="text-gray-400 text-xs line-clamp-2">{property.address}</p>
      </div>
    </Link>
  );
}
