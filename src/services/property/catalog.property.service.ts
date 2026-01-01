import { axiosInstance } from "@/lib/axios";

// TYPES
export type Seller = {
  userId: number;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  userRole: string;
  createdAt: string;
  updatedAt: string;
};

export type CatalogProperty = {
  propertyId: number;
  address: string;
  price: number;
  description: string;
  imageUrl?: string;
  seller?: Seller;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string | null;
  data: T;
};

// SERVICE BUYER
export const CatalogPropertyService = {
  // GET ALL PROPERTIES
  getAll(): Promise<ApiResponse<CatalogProperty[]>> {
    return axiosInstance
      .get("/api/catalog/properties")
      .then((res) => res.data);
  },

  // SEARCH PROPERTIES BY KEYWORD
  search(keyword: string): Promise<ApiResponse<CatalogProperty[]>> {
    return axiosInstance
      .get("/api/catalog/properties/search", { params: { keyword } })
      .then((res) => res.data);
  },

  // GET PROPERTY BY ID
  getById(propertyId: number): Promise<ApiResponse<CatalogProperty>> {
    return axiosInstance
      .get(`/api/catalog/properties/${propertyId}`)
      .then((res) => res.data);
  },
};
