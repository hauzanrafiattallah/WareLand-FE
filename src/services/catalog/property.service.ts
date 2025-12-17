import { axiosInstance } from "@/lib/axios";
import {
  GetPropertyDetailPayload,
  SearchPropertiesPayload,
} from "./property.payload";
import {
  PropertyDetailResponse,
  PropertyListResponse,
} from "./property.response";

/**
 * GET /api/catalog/properties
 */
export async function getProperties(): Promise<PropertyListResponse> {
  const { data } = await axiosInstance.get<PropertyListResponse>(
    "/api/catalog/properties"
  );

  return data;
}

/**
 * GET /api/catalog/properties/search
 * Semua param optional → axios akan ignore undefined
 */
export async function searchProperties(
  params: SearchPropertiesPayload
): Promise<PropertyListResponse> {
  const { data } = await axiosInstance.get<PropertyListResponse>(
    "/api/catalog/properties/search",
    { params }
  );

  return data;
}

/**
 * GET /api/catalog/properties/{propertyId}
 */
export async function getPropertyDetail(
  payload: GetPropertyDetailPayload
): Promise<PropertyDetailResponse> {
  const { data } = await axiosInstance.get<PropertyDetailResponse>(
    `/api/catalog/properties/${payload.propertyId}`
  );

  return data;
}
