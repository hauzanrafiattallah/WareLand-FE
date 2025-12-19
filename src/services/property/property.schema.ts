import { z } from "zod";

export const propertySchema = z.object({
  address: z.string().min(5, "Alamat minimal 5 karakter"),
  price: z.number().min(0, "Harga tidak boleh negatif"),
  description: z.string().optional(),
});
