"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { reviewService } from "@/services/review/review.service";

export default function EditReviewPage() {
  const { reviewId } = useParams();
  const router = useRouter();

  const buyerId =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("userId"))
      : 0;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await reviewService.update(Number(reviewId), buyerId, {
        rating,
        comment,
      });
      toast.success("Review berhasil diperbarui");
      router.back();
    } catch {
      toast.error("Gagal memperbarui review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Review</h1>

      <div className="space-y-4">
        <Textarea
          placeholder="Tulis ulasan..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </main>
  );
}
