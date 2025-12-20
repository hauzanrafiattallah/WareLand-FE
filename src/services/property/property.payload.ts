/**
 * Payload CREATE property
 */
export interface CreatePropertyPayload {
  address: string;
  price: number;
  description?: string;
}

/**
 * Payload UPDATE property
 */
export interface UpdatePropertyPayload extends CreatePropertyPayload {
  propertyId: number;
}
