export interface PublicReview {
  reviewId: number;
  rating: number;
  comment: string;
  buyerName: string;
  createdAt: string;
}

export interface BuyerReview {
  reviewId: number;
  propertyId: number;
  propertyTitle: string;
  rating: number;
  comment: string;
  createdAt: string;
}
