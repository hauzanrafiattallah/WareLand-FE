export type SearchPropertiesPayload = {
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type GetPropertyDetailPayload = {
  propertyId: number;
};