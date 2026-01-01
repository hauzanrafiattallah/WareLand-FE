"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import {
  CatalogPropertyService,
  CatalogProperty,
} from "@/services/property/catalog.property.service";

export function useCatalogProperties() {
  const [properties, setProperties] = useState<CatalogProperty[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchKeyword, setSearchKeywordInternal] = useState("");

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // FETCH ALL PROPERTIES
  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await CatalogPropertyService.getAll();
      if (res.success) {
        setProperties(res.data);
      } else {
        setError(res.message || "Gagal memuat properti");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Gagal memuat properti");
    } finally {
      setLoading(false);
    }
  }, []);

  // SEARCH PROPERTIES
  const searchProperties = useCallback(async (keyword: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await CatalogPropertyService.search(keyword);
      if (res.success) {
        setProperties(res.data);
      } else {
        setError(res.message || "Gagal mencari properti");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Gagal mencari properti");
    } finally {
      setLoading(false);
    }
  }, []);

  // SET SEARCH KEYWORD WITH DEBOUNCE
  const setSearchKeyword = useCallback(
    (keyword: string) => {
      setSearchKeywordInternal(keyword);

      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new debounce timer (500ms)
      debounceTimerRef.current = setTimeout(() => {
        if (keyword.trim()) {
          searchProperties(keyword);
        } else {
          fetchProperties();
        }
      }, 500);
    },
    [searchProperties, fetchProperties]
  );

  // CLEANUP DEBOUNCE TIMER
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    properties,
    loading,
    error,
    searchKeyword,
    setSearchKeyword,
    fetchProperties,
    searchProperties,
  };
}
