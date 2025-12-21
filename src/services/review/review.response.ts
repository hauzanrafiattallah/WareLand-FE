import { PublicReview, BuyerReview } from "./review.types";

export type PublicReviewListResponse = {
  success: boolean;
  message: string | null;
  data: PublicReview[];
};

export type BuyerReviewListResponse = {
  success: boolean;
  message: string | null;
  data: BuyerReview[];
};

export type ReviewResponse<T> = {
  success: boolean;
  message: string | null;
  data: T;
};
