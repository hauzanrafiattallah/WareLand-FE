/**
 * Komponen PropertyCard
 * Kartu display untuk item properti dengan badge dan info
 */

import Image from "next/image";
import Link from "next/link";
import { Property } from "./property.types";

interface PropertyCardProps {
  property: Property;
}

/**
 * Menampilkan kartu properti dengan gambar, harga, dan info lokasi
 * @param props - Props komponen
 */
export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/dashboard/buyer/properties/${property.id}`}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 block"
    >
      {/* Container gambar dengan badge */}
      <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          priority
          className="object-cover"
        />

        {/* Badge properti */}
        {property.badge && (
          <span className="absolute top-3 left-3 bg-[#39D177] text-white text-xs px-3 py-1 rounded-full shadow">
            {property.badge}
          </span>
        )}
      </div>

      {/* Info properti */}
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>

        <p className="text-[#39D177] font-bold text-lg">Rp {property.price}</p>

        <p className="text-gray-600 text-sm">{property.location}</p>

        <p className="text-gray-400 text-xs">Listed by {property.seller}</p>
      </div>
    </Link>
  );
}
