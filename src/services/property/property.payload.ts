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
export interface UpdatePropertyPayload {
  address: string;
  price: number;
  description?: string;
}
