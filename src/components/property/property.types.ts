/**
 * Tipe Property
 * Definisi tipe untuk komponen property
 */

/** Tipe data properti untuk kartu */
export interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  seller: string;
  image: string;
  badge?: string;
}

/** Tipe parameter filter properti */
export interface PropertyFilterParams {
  keyword: string;
  location: string;
  type: string;
  priceRange: string;
}
