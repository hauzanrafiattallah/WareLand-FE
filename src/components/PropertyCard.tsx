import Image from "next/image";
import Link from "next/link";

type Property = {
  id: number;
  title: string;
  price: string;
  location: string;
  seller: string;
  image: string;
  badge?: string;
};

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/dashboard/buyer/properties/${property.id}`}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 block"
    >
      <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          priority
          className="object-cover"
        />

        {property.badge && (
          <span className="absolute top-3 left-3 bg-[#39D177] text-white text-xs px-3 py-1 rounded-full shadow">
            {property.badge}
          </span>
        )}
      </div>

      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>

        <p className="text-[#39D177] font-bold text-lg">Rp {property.price}</p>

        <p className="text-gray-600 text-sm">{property.location}</p>

        <p className="text-gray-400 text-xs">Listed by {property.seller}</p>
      </div>
    </Link>
  );
}
