import { PublicReview, BuyerReview } from "./review.types";

export type ApiResponse<T> = {
  success: boolean;
  message: string | null;
  data: T;
};

// list public (property)
export type PublicReviewListResponse = ApiResponse<PublicReview[]>;

// list buyer
export type BuyerReviewListResponse = ApiResponse<BuyerReview[]>;

// create / update / delete
export type ReviewActionResponse = ApiResponse<PublicReview>;
