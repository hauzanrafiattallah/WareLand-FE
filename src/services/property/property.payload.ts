export interface CreatePropertyPayload {
  address: string;
  price: number;
  description?: string;
}

export type UpdatePropertyPayload = CreatePropertyPayload;
