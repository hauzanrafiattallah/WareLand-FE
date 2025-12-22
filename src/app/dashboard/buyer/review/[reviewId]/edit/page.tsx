"use client";

import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { reviewService } from "@/services/review/review.service";

export default function EditReviewPage() {
  const { reviewId } = useParams<{ reviewId: string }>();
  const router = useRouter();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const buyerId: number | undefined = user?.id;

  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!buyerId) {
      toast.error("User tidak valid, silakan login ulang");
      router.push("/auth/login");
    }
  }, [buyerId, router]);

  useEffect(() => {
    const loadReview = async () => {
      if (!buyerId) return;

      try {
        const res = await reviewService.getByBuyer(buyerId);
        const review = res.data.find((r) => r.reviewId === Number(reviewId));

        if (!review) {
          toast.error("Review tidak ditemukan");
          router.back();
          return;
        }

        setRating(review.rating);
        setComment(review.comment);
      } catch {
        toast.error("Gagal memuat data review");
      } finally {
        setInitialLoading(false);
      }
    };

    loadReview();
  }, [buyerId, reviewId, router]);

  const handleUpdate = async () => {
    if (!buyerId || rating === null) return;

    try {
      setLoading(true);

      await reviewService.update(Number(reviewId), buyerId, {
        rating,
        comment,
      });

      toast.success("Review berhasil diperbarui");
      router.back();
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message ?? "Gagal memperbarui review");
      } else {
        toast.error("Gagal memperbarui review");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!buyerId) return;

    try {
      setLoading(true);
      await reviewService.delete(Number(reviewId), buyerId);
      toast.success("Review berhasil dihapus");
      router.push("/dashboard/buyer/review");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message ?? "Gagal menghapus review");
      } else {
        toast.error("Gagal menghapus review");
      }
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <p className="text-center py-20 text-gray-500">Memuat data ulasan...</p>
    );
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-12">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Ulasan</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Rating (1 - 5)
            </label>
            <input
              type="number"
              min={1}
              max={5}
              value={rating ?? 1}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#39D177]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Komentar
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 focus:ring-[#39D177]"
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-[#39D177] hover:bg-[#2FAE63]"
            >
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
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Ya, Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
