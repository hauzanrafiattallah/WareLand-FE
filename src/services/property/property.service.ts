import { axiosInstance } from "@/lib/axios";
import { CreatePropertyPayload, UpdatePropertyPayload } from "./property.payload";
import { PropertyResponse } from "./property.response";

interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}

export const propertyService = {
  create(payload: CreatePropertyPayload) {
    return axiosInstance
      .post<ApiResponse<PropertyResponse>>("/api/seller/properties", payload)
      .then(res => res.data);
  },

  getAll() {
    return axiosInstance
      .get<ApiResponse<PropertyResponse[]>>("/api/seller/properties")
      .then(res => res.data);
  },

  update(id: number, payload: UpdatePropertyPayload) {
    return axiosInstance
      .put<ApiResponse<null>>(`/api/seller/properties/${id}`, payload)
      .then(res => res.data);
  },

  delete(id: number) {
    return axiosInstance
      .delete<ApiResponse<null>>(`/api/seller/properties/${id}`)
      .then(res => res.data);
  },
};
