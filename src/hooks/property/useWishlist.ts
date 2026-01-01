"use client";

import { CatalogProperty } from "@/services/property/catalog.property.service";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const WISHLIST_KEY = "wareland_wishlist";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<CatalogProperty[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(WISHLIST_KEY);
        if (stored) {
          setWishlist(JSON.parse(stored));
        }
      } catch {
        // Invalid JSON, reset
        localStorage.removeItem(WISHLIST_KEY);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  // Check if property is in wishlist
  const isInWishlist = useCallback(
    (propertyId: number) => {
      return wishlist.some((p) => p.propertyId === propertyId);
    },
    [wishlist]
  );

  // Add to wishlist
  const addToWishlist = useCallback(
    (property: CatalogProperty) => {
      if (isInWishlist(property.propertyId)) {
        return;
      }
      setWishlist((prev) => [...prev, property]);
      toast.success("Ditambahkan ke wishlist");
    },
    [isInWishlist]
  );

  // Remove from wishlist
  const removeFromWishlist = useCallback((propertyId: number) => {
    setWishlist((prev) => prev.filter((p) => p.propertyId !== propertyId));
    toast.success("Dihapus dari wishlist");
  }, []);

  // Toggle wishlist
  const toggleWishlist = useCallback(
    (property: CatalogProperty) => {
      if (isInWishlist(property.propertyId)) {
        removeFromWishlist(property.propertyId);
      } else {
        addToWishlist(property);
      }
    },
    [isInWishlist, addToWishlist, removeFromWishlist]
  );

  // Clear all wishlist
  const clearWishlist = useCallback(() => {
    setWishlist([]);
    toast.success("Wishlist dikosongkan");
  }, []);

  return {
    wishlist,
    isLoaded,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
  };
}
