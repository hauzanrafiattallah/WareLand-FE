"use client";

import { useCallback, useState } from "react";
import { reviewService } from "@/services/review/review.service";
import { PublicReview, BuyerReview } from "@/services/review/review.types";
import {
  CreateReviewPayload,
  UpdateReviewPayload,
} from "@/services/review/review.payload";

export function useReview() {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [myReviews, setMyReviews] = useState<BuyerReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // PROPERTY REVIEWS (PUBLIC)
  const fetchReviewsByProperty = useCallback(async (propertyId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await reviewService.getByProperty(propertyId);
      setReviews(res.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Gagal memuat review properti"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // BUYER REVIEWS (MY REVIEWS)
  const fetchReviewsByBuyer = useCallback(async (buyerId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await reviewService.getByBuyer(buyerId);
      setMyReviews(res.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Gagal memuat ulasan Anda"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // CRUD
  const createReview = async (payload: CreateReviewPayload) => {
    return reviewService.create(payload);
  };

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
    createReview,
    updateReview,
    deleteReview,
  };
}
