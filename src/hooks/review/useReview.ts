"use client";

import { useCallback, useState } from "react";
import { reviewService } from "@/services/review/review.service";
import { Review } from "@/services/review/review.response";

export function useReview() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviewsByProperty = useCallback(async (propertyId: number) => {
    try {
      setLoading(true);
      const res = await reviewService.getByProperty(propertyId);
      setReviews(res.data);
    } catch {
      setError("Gagal memuat ulasan");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateReview = async (
    reviewId: number,
    buyerId: number,
    payload: { rating: number; comment: string }
  ) => {
    return reviewService.update(reviewId, buyerId, payload);
  };

  const deleteReview = async (reviewId: number, buyerId: number) => {
    return reviewService.delete(reviewId, buyerId);
  };

  return {
    reviews,
    loading,
    error,
    fetchReviewsByProperty,
    updateReview,
    deleteReview,
  };
}