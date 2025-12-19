"use client";

import { Star, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useReview } from "@/hooks/review/useReview";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ReviewPage() {
  const {
    reviews,
    myReviews,
    loading,
    error,
    fetchReviewsByProperty,
    fetchReviewsByBuyer,
    deleteReview,
  } = useReview();

  const router = useRouter();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const propertyId = 8;

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const buyerId: number | null = user?.id ?? null;

  useEffect(() => {
    fetchReviewsByProperty(propertyId);

    if (buyerId) {
      fetchReviewsByBuyer(buyerId);
    }
  }, [fetchReviewsByProperty, fetchReviewsByBuyer, buyerId]);

  const handleDelete = async () => {
    if (!deleteId || !buyerId) return;

    try {
      await deleteReview(deleteId, buyerId);
      toast.success("Review berhasil dihapus");
      fetchReviewsByProperty(propertyId);
      fetchReviewsByBuyer(buyerId);
    } catch {
      toast.error("Gagal menghapus review");
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return <p className="text-center py-20">Memuat ulasan...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <main className="px-6 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Ulasan Properti</h1>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 py-20">
          Belum ada ulasan
        </p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => {
            const isMine = myReviews.some(
              (r) => r.reviewId === review.reviewId
            );

            return (
              <div
                key={review.reviewId}
                className="bg-white border rounded-xl p-5"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{review.buyerName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>

                  {isMine && (
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          router.push(`/reviews/${review.reviewId}/edit`)
                        }
                      >
                        <Pencil size={16} />
                      </Button>

                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => setDeleteId(review.reviewId)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 mt-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>

                <p className="italic text-gray-700 mt-3">
                  “{review.comment}”
                </p>
              </div>
            );
          })}
        </div>
      )}

      <AlertDialog open={!!deleteId}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Yakin ingin menghapus review ini?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}