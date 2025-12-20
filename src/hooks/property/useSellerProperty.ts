"use client";

import { useEffect, useState } from "react";
import { propertyService } from "@/services/property/property.service";
import { Property } from "@/services/property/property.types";

interface UseSellerPropertyState {
  properties: Property[];
  loading: boolean;
  error: string | null;
}

export function useSellerProperty() {
  const [state, setState] = useState<UseSellerPropertyState>({
    properties: [],
    loading: false,
    error: null,
  });

  const fetchProperties = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const properties = await propertyService.getAll();
      setState({
        properties,
        loading: false,
        error: null,
      });
    } catch {
      setState({
        properties: [],
        loading: false,
        error: "Gagal mengambil data properti",
      });
    }
  };

  const deleteProperty = async (id: number) => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      await propertyService.delete(id);
      await fetchProperties();
    } catch {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Gagal menghapus properti",
      }));
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties: state.properties,
    loading: state.loading,
    error: state.error,
    refetch: fetchProperties,
    deleteProperty,
  };
}
