"use client";

import { useCallback, useState } from "react";
import { reviewService } from "@/services/review/review.service";
import { Review } from "@/services/review/review.response";
import { UpdateReviewPayload } from "@/services/review/review.payload";

export function useReview() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // PUBLIC
  const fetchReviewsByProperty = useCallback(async (propertyId: number) => {
    try {
      setLoading(true);
      const res = await reviewService.getByProperty(propertyId);
      setReviews(res.data);
    } catch {
      setError("Gagal memuat review");
    } finally {
      setLoading(false);
    }
  }, []);

  // PRIVATE
  const fetchReviewsByBuyer = useCallback(async (buyerId: number) => {
    try {
      const res = await reviewService.getByBuyer(buyerId);
      setMyReviews(res.data);
    } catch {
      // ignore
    }
  }, []);

  const updateReview = async (
    reviewId: number,
    buyerId: number,
    payload: UpdateReviewPayload
  ) => {
    return reviewService.update(reviewId, buyerId, payload);
  };

  const deleteReview = async (reviewId: number, buyerId: number) => {
    return reviewService.delete(reviewId, buyerId);
  };

  return {
    reviews,
    myReviews,
    loading,
    error,
    fetchReviewsByProperty,
    fetchReviewsByBuyer,
    updateReview,
    deleteReview,
  };
}