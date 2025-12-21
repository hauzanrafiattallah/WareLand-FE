"use client";

import { PropertyService } from "@/services/property/property.service";
import { Property } from "@/services/property/property.types";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

export const useProperty = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("accessToken");
    const userRaw = localStorage.getItem("user");
    const user = userRaw ? JSON.parse(userRaw) : null;

    if (!token || !user || user.role !== "SELLER") {
      setError("Akun kamu bukan seller.");
      setLoading(false);
      return;
    }

    try {
      const res = await PropertyService.findAll();
      if (!res.success) {
        setError(res.message ?? "Gagal memuat properti");
        return;
      }
      setProperties(res.data);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        localStorage.clear();
        setError("Silakan login kembali.");
      } else {
        setError("Terjadi kesalahan pada server.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const createProperty = async (payload: {
    address: string;
    price: number;
    description?: string;
  }) => {
    await PropertyService.create(payload);
    await fetchProperties();
  };

  const updateProperty = async (
    propertyId: number,
    payload: {
      address: string;
      price: number;
      description?: string;
    }
  ) => {
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
