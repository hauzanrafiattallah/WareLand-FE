import { Property } from "@/services/property/property.types";

interface PropertyCardProps {
  property: Property;
  isSeller?: boolean;
  onDelete?: () => void;
  onEdit?: string;
}

export default function PropertyCard({
  property,
  isSeller = false,
  onDelete,
  onEdit,
}: PropertyCardProps) {
  return (
    <div className="border rounded p-4">
      <h3 className="font-semibold">{property.address}</h3>
      <p className="text-sm">Rp {property.price}</p>
      <p className="text-xs">{property.description}</p>

      {isSeller && (
        <div className="flex gap-3 mt-3">
          {onEdit && (
            <a
              href={onEdit}
              className="text-blue-500 text-sm"
            >
              Edit
            </a>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="text-red-500 text-sm"
            >
              Hapus
            </button>
          )}
        </div>
      )}
    </div>
  );
}
