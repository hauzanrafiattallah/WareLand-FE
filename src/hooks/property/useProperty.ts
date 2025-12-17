'use client';

import { useEffect, useState, useCallback } from "react";
import { PropertyService } from "@/services/property/property.service";
import { Property } from "@/services/property/property.types";
import { AxiosError } from "axios";

export const useProperty = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);

    // 🔹 CEK TOKEN DI FE
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const userRole = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;

    if (!token) {
      setError("Silakan login kembali.");
      setLoading(false);
      return;
    }

    if (userRole !== "SELLER") {
      setError("Akun kamu bukan seller.");
      setLoading(false);
      return;
    }

    try {
      const response = await PropertyService.findAll();

      if (!response.success) {
        setError(response.message ?? "Gagal memuat property");
        return;
      }

      setProperties(response.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          setError("Silakan login kembali.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userRole");
        } else if (err.response?.status === 403) {
          setError("Akun kamu bukan seller.");
        } else {
          setError("Terjadi kesalahan pada server.");
        }
      } else {
        setError("Terjadi kesalahan pada server.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!isMounted) return;
      await fetchProperties();
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [fetchProperties]);

  const createProperty = async (payload: { address: string; price: number; description: string }) => {
    await PropertyService.create(payload);
    await fetchProperties();
  };

  const updateProperty = async (propertyId: number, payload: { address?: string; price?: number; description?: string }) => {
    await PropertyService.update(propertyId, payload);
    await fetchProperties();
  };

  const deleteProperty = async (propertyId: number) => {
    await PropertyService.delete(propertyId);
    await fetchProperties();
  };

  return {
    properties,
    loading,
    error,
    fetchProperties,
    createProperty,
    updateProperty,
    deleteProperty,
  };
};
