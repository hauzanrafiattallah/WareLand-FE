import { axiosInstance } from "@/lib/axios";
import {
  ApiResponse,
  Property,
  CreatePropertyPayload,
  UpdatePropertyPayload,
} from "./property.types";

const BASE_PATH = "/api/seller/properties";

export const PropertyService = {
  create(payload: CreatePropertyPayload): Promise<ApiResponse<Property>> {
    return axiosInstance.post(BASE_PATH, payload).then((res) => res.data);
  },

  findAll(): Promise<ApiResponse<Property[]>> {
    return axiosInstance.get(BASE_PATH).then((res) => res.data);
  },

  update(propertyId: number, payload: UpdatePropertyPayload): Promise<ApiResponse<null>> {
    return axiosInstance.put(`${BASE_PATH}/${propertyId}`, payload).then((res) => res.data);
  },

  delete(propertyId: number): Promise<ApiResponse<null>> {
    return axiosInstance.delete(`${BASE_PATH}/${propertyId}`).then((res) => res.data);
  },
};
