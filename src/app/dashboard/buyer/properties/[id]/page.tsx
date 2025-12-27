"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PropertyReviewSection from "@/components/review/PropertyReviewSection";
import { CatalogPropertyService } from "@/services/property/catalog.property.service";
import { toast } from "sonner";

// TYPES
type PropertyDetail = {
  propertyId: number;
  address: string;
  price: number;
  description: string;
};

export default function PropertyDetailPage() {
  const params = useParams();

  const propertyId = Number(params.id);

  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // FETCH PROPERTY DETAIL
  useEffect(() => {
    if (isNaN(propertyId)) {
      toast.error("ID properti tidak valid");
      setLoading(false);
      return;
    }

    const fetchProperty = async () => {
      try {
        const res = await CatalogPropertyService.getById(propertyId);

        //  GUARD RESPONSE
        if (!res.success || !res.data) {
          setProperty(null);
          return;
        }

        setProperty(res.data);
      } catch (err) {
        toast.error("Gagal memuat detail properti");
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  // STATE HANDLING
  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!property) {
    return (
      <div className="p-10 text-center text-gray-500">
        Properti tidak ditemukan
      </div>
    );
  }

  // RENDER
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      {/* PROPERTY DETAIL */}
      <Card>
        <CardContent className="p-6">
          <h1 className="text-xl font-bold">
            Properti #{property.propertyId}
          </h1>

          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <MapPin size={16} />
            {property.address}
          </div>

          <p className="text-2xl font-semibold text-[#39D177] mt-4">
            Rp {property.price.toLocaleString("id-ID")}
          </p>

          {property.description && (
            <p className="mt-4 text-gray-700">
              {property.description}
            </p>
          )}
        </CardContent>
      </Card>

      {/* REVIEW SECTION */}
      <PropertyReviewSection propertyId={property.propertyId} />
    </main>
  );
}
