import { axiosInstance } from "@/lib/axios";
import {
  PublicReviewListResponse,
  BuyerReviewListResponse,
  ReviewActionResponse,
  ApiResponse,
} from "./review.response";
import {
  CreateReviewPayload,
  UpdateReviewPayload,
} from "./review.payload";

export const reviewService = {
  // PUBLIC
  getByProperty: async (propertyId: number) => {
    const { data } = await axiosInstance.get<PublicReviewListResponse>(
      `/api/reviews/property/${propertyId}`
    );
    return data;
  },

  // BUYER
  getByBuyer: async (buyerId: number) => {
    const { data } = await axiosInstance.get<BuyerReviewListResponse>(
      `/api/reviews/buyer/${buyerId}`
    );
    return data;
  },

  // CREATE
  create: async (payload: CreateReviewPayload) => {
    const { data } = await axiosInstance.post<ReviewActionResponse>(
      `/api/reviews`,
      payload
    );
    return data;
  },

  // UPDATE
  update: async (
    reviewId: number,
    buyerId: number,
    payload: UpdateReviewPayload
  ) => {
    const { data } = await axiosInstance.put<ReviewActionResponse>(
      `/api/reviews/${reviewId}?buyerId=${buyerId}`,
      payload
    );
    return data;
  },

  // DELETE
  delete: async (reviewId: number, buyerId: number) => {
    const { data } = await axiosInstance.delete<ApiResponse<null>>(
      `/api/reviews/${reviewId}?buyerId=${buyerId}`
    );
    return data;
  },
};
