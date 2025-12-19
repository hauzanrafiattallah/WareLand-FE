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
  const { reviews, loading, error, fetchReviewsByProperty, deleteReview } =
    useReview();
  const router = useRouter();

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const propertyId = 8;
  const buyerId =
    typeof window !== "undefined"
      ? Number(localStorage.getItem("userId"))
      : 0;

  useEffect(() => {
    fetchReviewsByProperty(propertyId);
  }, [fetchReviewsByProperty]);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteReview(deleteId, buyerId);
      toast.success("Review berhasil dihapus");
      fetchReviewsByProperty(propertyId);
    } catch {
      toast.error("Gagal menghapus review");
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat ulasan...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="px-6 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Ulasan Properti</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center py-20">
          Belum ada ulasan
        </p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
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
                <span className="text-xs text-gray-500 ml-2">
                  ({review.rating}/5)
                </span>
              </div>

              <p className="italic text-gray-700 mt-3">
                “{review.comment}”
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CONFIRM DELETE */}
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
