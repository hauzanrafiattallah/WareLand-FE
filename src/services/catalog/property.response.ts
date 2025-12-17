export type Property = {
  propertyId: number;
  address: string;
  price: number;
  description: string;
};

export type PropertyListResponse = {
  success: boolean;
  message: string | null;
  data: Property[];
};

export type PropertyDetailResponse = {
  success: boolean;
  message: string | null;
  data: Property | null;
};