"use client";

import { useEffect, useState } from "react";
import { PropertyService } from "@/services/property/property.service";
import { Property } from "@/services/property/property.types";

interface UsePropertyState {
  properties: Property[];
  loading: boolean;
  error: string | null;
}

export function useProperty() {
  const [state, setState] = useState<UsePropertyState>({
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
      const res = await PropertyService.findAll();

      setState({
        properties: res.data,
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

  const deleteProperty = async (propertyId: number) => {
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      await PropertyService.delete(propertyId);
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
