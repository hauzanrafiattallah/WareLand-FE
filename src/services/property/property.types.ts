export interface Property {
  propertyId: number;
  address: string;
  price: number;
  description: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}

export type PropertyListResponse = ApiResponse<Property[]>;

export interface PropertyCreatePayload {
  address: string;
  price: number;
  description?: string;
}
