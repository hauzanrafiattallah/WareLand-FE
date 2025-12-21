import { z } from "zod";

export const propertySchema = z.object({
  address: z.string().min(5),
  price: z.number().min(0),
  description: z.string().optional(),
});
