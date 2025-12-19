export type Review = {
  reviewId: number;
  rating: number;
  comment: string;
  buyerName: string;
  createdAt: string;
};

export type ReviewListResponse = {
  success: boolean;
  message: string | null;
  data: Review[];
};

export type ReviewResponse = {
  success: boolean;
  message: string | null;
  data: Review;
};
