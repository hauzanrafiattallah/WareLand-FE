import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating minimal 1")
    .max(5, "Rating maksimal 5"),
  comment: z.string().min(1, "Komentar tidak boleh kosong"),
});

export type ReviewForm = z.infer<typeof reviewSchema>;