import Image from "next/image";
import Link from "next/link";
import { CatalogProperty } from "@/services/property/catalog.property.service";

type Props = {
  property: CatalogProperty;
  badge?: string;
};

export default function CatalogPropertyCard({ property, badge }: Props) {
  // Format price to Indonesian Rupiah
  const formattedPrice = property.price.toLocaleString("id-ID");

  // Extract location from address (first part before comma)
  const location = property.address.split(",")[0] || property.address;

  return (
    <Link
      href={`/dashboard/buyer/properties/${property.propertyId}`}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 block"
    >
      <div className="relative w-full h-48 rounded-t-xl overflow-hidden bg-gray-100">
        <Image
          src="/home.png"
          alt={property.address}
          fill
          priority
          className="object-cover"
        />

        {badge && (
          <span className="absolute top-3 left-3 bg-[#39D177] text-white text-xs px-3 py-1 rounded-full shadow">
            {badge}
          </span>
        )}
      </div>

      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-lg line-clamp-1">
          {property.description || `Properti #${property.propertyId}`}
        </h3>

        <p className="text-[#39D177] font-bold text-lg">
          Rp {formattedPrice}
        </p>

        <p className="text-gray-600 text-sm line-clamp-1">{location}</p>

        <p className="text-gray-400 text-xs line-clamp-2">
          {property.address}
        </p>
      </div>
    </Link>
  );
}
