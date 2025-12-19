export type CreateReviewPayload = {
  buyerId: number;
  propertyId: number;
  rating: number;
  comment: string;
};

export type UpdateReviewPayload = {
  rating: number;
  comment: string;
};
