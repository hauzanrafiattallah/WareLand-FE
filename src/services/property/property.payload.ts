export interface CreatePropertyPayload {
  address: string;
  price: number;
  description?: string;
  imageUrl?: string;
}

export type UpdatePropertyPayload = CreatePropertyPayload;
