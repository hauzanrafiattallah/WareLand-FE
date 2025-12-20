import { axiosInstance } from "@/lib/axios";
import {
  PropertyListResponse,
  PropertyCreatePayload,
  ApiResponse,
  Property,
} from "./property.types";

export const propertyService = {
  async getAll(): Promise<Property[]> {
    const res = await axiosInstance.get<PropertyListResponse>(
      "/api/seller/properties"
    );
    return res.data.data;
  },

  async create(payload: PropertyCreatePayload) {
    const res = await axiosInstance.post<ApiResponse<Property>>(
      "/api/seller/properties",
      payload
    );
    return res.data.data;
  },

  async update(id: number, payload: PropertyCreatePayload) {
    await axiosInstance.put(
      `/api/seller/properties/${id}`,
      payload
    );
  },

  async delete(id: number) {
    await axiosInstance.delete(
      `/api/seller/properties/${id}`
    );
  },
};
