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
  imageUrl?: string;
  seller: Seller;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}
