"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { reviewService } from "@/services/review/review.service";

export default function EditReviewPage() {
  const { reviewId } = useParams<{ reviewId: string }>();
  const router = useRouter();

  /**
   * Ambil user dari localStorage (BENAR)
   */
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const buyerId: number | undefined = user?.id;

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(false);

  /**
   * Guard: user tidak valid
   */
  useEffect(() => {
    if (!buyerId) {
      toast.error("User tidak valid, silakan login ulang");
      router.push("/auth/login");
    }
  }, [buyerId, router]);

  /**
   * Load data review sebelumnya
   * (pakai GET property → cari reviewId)
   */
  useEffect(() => {
    const loadReview = async () => {
      try {
        const propertyId = Number(localStorage.getItem("currentPropertyId"));
        if (!propertyId) return;

        const res = await reviewService.getByProperty(propertyId);
        const review = res.data.find(
          (r) => r.reviewId === Number(reviewId)
        );

        if (!review) {
          toast.error("Review tidak ditemukan");
          router.back();
          return;
        }

        setRating(review.rating);
        setComment(review.comment);
      } catch (err) {
        toast.error("Gagal memuat data review");
      }
    };

    loadReview();
  }, [reviewId, router]);

  /**
   * UPDATE REVIEW
   */
  const handleUpdate = async () => {
    if (!buyerId) return;

    try {
      setLoading(true);

      await reviewService.update(Number(reviewId), buyerId, {
        rating,
        comment,
      });

      toast.success("Review berhasil diperbarui");
      router.back();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Gagal memperbarui review");
    } finally {
      setLoading(false);
    }
  };

  /**
   * DELETE REVIEW
   */
  const handleDelete = async () => {
    if (!buyerId) return;

    try {
      setLoading(true);

      await reviewService.delete(Number(reviewId), buyerId);

      toast.success("Review berhasil dihapus");
      router.push("/dashboard/buyer/review");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Gagal menghapus review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Ulasan</h1>

      <div className="space-y-5 bg-white p-6 rounded-xl border shadow-sm">
        {/* Rating */}
        <div>
          <label className="text-sm font-medium">Rating (1 - 5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-1 w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Comment */}
        <div>
          <label className="text-sm font-medium">Komentar</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tulis ulasan Anda..."
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4">
          <Button onClick={handleUpdate} disabled={loading}>
            Simpan Perubahan
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={loading}>
                Hapus Review
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Yakin ingin menghapus review?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini tidak dapat dibatalkan.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Ya, Hapus
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </main>
  );
}