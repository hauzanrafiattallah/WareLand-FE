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

export interface CreatePropertyPayload {
  address: string;
  price: number;
  description: string;
}

export interface UpdatePropertyPayload {
  address?: string;
  price?: number;
  description?: string;
}
