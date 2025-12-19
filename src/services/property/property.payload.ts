export interface CreatePropertyPayload {
  address: string;
  price: number;
  description?: string;
}

export interface UpdatePropertyPayload extends CreatePropertyPayload {
  propertyId: number;
}
