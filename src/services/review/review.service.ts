import { axiosInstance } from "@/lib/axios";
import { UpdateReviewPayload } from "./review.payload";
import { ReviewListResponse, ReviewResponse } from "./review.response";

export const reviewService = {
  getByProperty: async (propertyId: number) => {
    const { data } = await axiosInstance.get<ReviewListResponse>(
      `/api/reviews/property/${propertyId}`
    );
    return data;
  },

  getByBuyer: async (buyerId: number) => {
    const { data } = await axiosInstance.get<ReviewListResponse>(
      `/api/reviews/buyer/${buyerId}`
    );
    return data;
  },

  update: async (
    reviewId: number,
    buyerId: number,
    payload: UpdateReviewPayload
  ) => {
    const { data } = await axiosInstance.put<ReviewResponse>(
      `/api/reviews/${reviewId}?buyerId=${buyerId}`,
      payload
    );
    return data;
  },

  delete: async (reviewId: number, buyerId: number) => {
    const { data } = await axiosInstance.delete(
      `/api/reviews/${reviewId}?buyerId=${buyerId}`
    );
    return data;
  },
};