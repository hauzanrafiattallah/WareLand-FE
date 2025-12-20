export interface Seller {
  userId: number;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  userRole: "SELLER";
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  propertyId: number;
  address: string;
  price: number;
  description: string;
  seller: Seller;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}

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
