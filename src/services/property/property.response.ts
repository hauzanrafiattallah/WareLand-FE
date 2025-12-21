export interface SellerResponse {
  userId: number;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  userRole: "SELLER";
}

export interface PropertyResponse {
  propertyId: number;
  address: string;
  price: number;
  description?: string;
  seller: SellerResponse;
}
