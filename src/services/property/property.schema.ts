import { z } from "zod";

export const createPropertySchema = z.object({
  address: z
    .string()
    .min(10, "Alamat minimal 10 karakter")
    .max(200, "Alamat maksimal 200 karakter"),
  price: z
    .number({ error: "Harga wajib diisi dan harus berupa angka" })
    .min(1, "Harga harus lebih dari 0")
    .max(999999999999, "Harga terlalu besar"),
  description: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter")
    .max(1000, "Deskripsi maksimal 1000 karakter"),
  imageUrl: z.string().optional(),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
