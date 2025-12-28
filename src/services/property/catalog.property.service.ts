import { axiosInstance } from "@/lib/axios";

// TYPES
export type CatalogProperty = {
  propertyId: number;
  address: string;
  price: number;
  description: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string | null;
  data: T;
};

// SERVICE BUYER
export const CatalogPropertyService = {
  getById(propertyId: number): Promise<ApiResponse<CatalogProperty>> {
    return axiosInstance
      .get(`/api/catalog/properties/${propertyId}`)
      .then((res) => res.data);
  },
};
