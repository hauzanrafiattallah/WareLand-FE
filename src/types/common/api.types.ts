/**
 * Common API Types
 * Shared type definitions for API responses across the application
 */

/** Generic API response wrapper */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
