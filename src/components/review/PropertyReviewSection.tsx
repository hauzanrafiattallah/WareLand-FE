"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { reviewService } from "@/services/review/review.service";
import { PublicReview } from "@/services/review/review.types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Props = {
  propertyId: number;
};

export default function PropertyReviewSection({ propertyId }: Props) {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const buyerId = user?.id;

  /* ================= LOAD REVIEW PROPERTY ================= */
  const loadReviews = async () => {
    try {
      const res = await reviewService.getByProperty(propertyId);
      setReviews(res.data);
    } catch {
      toast.error("Gagal memuat review");
    }
  };

  useEffect(() => {
    loadReviews();
  }, [propertyId]);

  /* ================= SUBMIT REVIEW ================= */
  const handleSubmit = async () => {
    if (!buyerId) {
      toast.error("Silakan login sebagai buyer");
      return;
    }

    if (!comment.trim()) {
      toast.error("Komentar wajib diisi");
      return;
    }

    try {
      setLoading(true);

      await reviewService.create({
        buyerId,
        propertyId,
        rating,
        comment,
      });

      toast.success("Review berhasil dikirim");

      setComment("");
      setRating(5);

      // refresh list
      await loadReviews();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Gagal mengirim review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ================= FORM REVIEW ================= */}
      <div className="bg-white p-6 rounded-xl border">
        <h3 className="text-lg font-semibold mb-4">Tulis Ulasan</h3>

        {/* ⭐ STAR INPUT */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => {
            const value = i + 1;
            return (
              <Star
                key={value}
                onClick={() => setRating(value)}
                className={`cursor-pointer w-6 h-6 ${
                  value <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            );
          })}
        </div>

        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tulis pengalaman Anda..."
        />

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4"
        >
          {loading ? "Mengirim..." : "Kirim Review"}
        </Button>
      </div>

      {/* ================= LIST REVIEW ================= */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">
            Belum ada ulasan untuk properti ini
          </p>
        ) : (
          reviews.map((r) => (
            <div
              key={r.reviewId}
              className="bg-white p-4 rounded-lg border"
            >
              {/* ⭐ STAR DISPLAY */}
              <div className="flex gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < r.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700 mt-1">{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}