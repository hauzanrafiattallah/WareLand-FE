"use client";

import { useSellerProperty } from "@/hooks/property/useSellerProperty";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function ManageListingsPage() {
  const { properties, loading, error, deleteProperty } = useSellerProperty();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {properties.map((item) => (
        <div key={item.propertyId} className="border p-4 rounded">
          <h3 className="font-bold">{item.address}</h3>
          <p>Rp {item.price.toLocaleString()}</p>
          <p>{item.description}</p>

          <Button
            variant="destructive"
            onClick={() => deleteProperty(item.propertyId)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Hapus
          </Button>
        </div>
      ))}
    </div>
  );
}
