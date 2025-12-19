"use client";

import { useEffect, useState } from "react";
import { propertyService } from "@/services/property/property.service";
import { PropertyResponse } from "@/services/property/property.response";

export function useSellerProperty() {
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const res = await propertyService.getAll();
      setProperties(res.data);
    } catch {
      setError("Gagal mengambil data properti");
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id: number): Promise<void> => {
    try {
      await propertyService.delete(id);
      setProperties((prev) =>
        prev.filter((property) => property.propertyId !== id)
      );
    } catch {
      setError("Gagal menghapus properti");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties,
    deleteProperty,
  };
}
