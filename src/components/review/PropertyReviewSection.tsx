"use client";

import { useEffect, useState, useMemo } from "react";
import { Star, Send, MessageCircle, User, Loader2, Edit3, X, Check, Trash2, AlertTriangle } from "lucide-react";
import { reviewService } from "@/services/review/review.service";
import { PublicReview } from "@/services/review/review.types";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type Props = {
  propertyId: number;
  readOnly?: boolean;
};

export default function PropertyReviewSection({
  propertyId,
  readOnly = false,
}: Props) {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const buyerId = user?.id;
  const buyerName = user?.name || user?.username;

  // Check if user already has a review for this property
  const myReview = useMemo(() => {
    if (!buyerName) return null;
    return reviews.find((r) => r.buyerName === buyerName) || null;
  }, [reviews, buyerName]);

  /* ================= LOAD REVIEW PROPERTY ================= */
  const loadReviews = async () => {
    setLoadingReviews(true);
    try {
      const res = await reviewService.getByProperty(propertyId);
      setReviews(res.data);
    } catch {
      toast.error("Gagal memuat review");
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [propertyId]);

  // Pre-fill form when editing
  useEffect(() => {
    if (myReview && isEditing) {
      setRating(myReview.rating);
      setComment(myReview.comment);
    }
  }, [myReview, isEditing]);

  /* ================= SUBMIT/UPDATE REVIEW ================= */
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

      if (myReview && isEditing) {
        // UPDATE existing review
        await reviewService.update(myReview.reviewId, Number(buyerId), {
          rating: Number(rating),
          comment: comment.trim(),
        });
        toast.success("Review berhasil diperbarui");
        setIsEditing(false);
      } else {
        // CREATE new review
        await reviewService.create({
          buyerId: Number(buyerId),
          propertyId: Number(propertyId),
          rating: Number(rating),
          comment: comment.trim(),
        });
        toast.success("Review berhasil dikirim");
      }

      setComment("");
      setRating(5);
      await loadReviews();
    } catch (e: any) {
      const errorMsg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        (isEditing ? "Gagal memperbarui review" : "Gagal mengirim review");
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setComment("");
    setRating(5);
  };

  const handleStartEdit = () => {
    if (myReview) {
      setIsEditing(true);
      setRating(myReview.rating);
      setComment(myReview.comment);
    }
  };

  /* ================= DELETE REVIEW ================= */
  const openDeleteDialog = (reviewId: number) => {
    setReviewToDelete(reviewId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!buyerId || !reviewToDelete) {
      toast.error("Silakan login sebagai buyer");
      return;
    }

    try {
      setDeletingId(reviewToDelete);
      setDeleteDialogOpen(false);
      await reviewService.delete(reviewToDelete, Number(buyerId));
      toast.success("Ulasan berhasil dihapus");
      await loadReviews();
    } catch (e: any) {
      const errorMsg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        "Gagal menghapus ulasan";
      toast.error(errorMsg);
    } finally {
      setDeletingId(null);
      setReviewToDelete(null);
    }
  };

  // Determine if form should be shown
  const showCreateForm = !readOnly && !myReview && !isEditing;
  const showEditForm = !readOnly && isEditing;
  const showEditButton = !readOnly && myReview && !isEditing;

  return (
    <div className="space-y-6">
      {/* ================= CREATE FORM ================= */}
      {showCreateForm && (
        <div className="bg-gradient-to-br from-[#39D177]/5 to-[#39D177]/10 p-4 sm:p-6 rounded-2xl border border-[#39D177]/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#39D177] flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Tulis Ulasan
            </h3>
          </div>

          {/* STAR INPUT */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Rating Anda</p>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const value = i + 1;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 sm:w-8 sm:h-8 ${
                        value <= rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 hover:text-yellow-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* COMMENT INPUT */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Bagikan pengalaman Anda tentang properti ini..."
            className="w-full min-h-[100px] sm:min-h-[120px] p-3 sm:p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#39D177]/50 focus:border-[#39D177] text-sm sm:text-base bg-white"
            disabled={loading}
          />

          {/* SUBMIT BUTTON */}
          <Button
            onClick={handleSubmit}
            disabled={loading || !comment.trim()}
            className="mt-4 w-full sm:w-auto bg-[#39D177] hover:bg-[#2FAE63] text-white rounded-full px-6 py-2.5 font-medium transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            {loading ? "Mengirim..." : "Kirim Review"}
          </Button>
        </div>
      )}

      {/* ================= EDIT FORM ================= */}
      {showEditForm && (
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 sm:p-6 rounded-2xl border border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                <Edit3 className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Ulasan Anda
              </h3>
            </div>
            <button
              onClick={handleCancelEdit}
              className="p-2 hover:bg-amber-200 rounded-full transition"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* STAR INPUT */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Rating Anda</p>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const value = i + 1;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 sm:w-8 sm:h-8 ${
                        value <= rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 hover:text-yellow-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* COMMENT INPUT */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Perbarui ulasan Anda..."
            className="w-full min-h-[100px] sm:min-h-[120px] p-3 sm:p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 text-sm sm:text-base bg-white"
            disabled={loading}
          />

          {/* ACTION BUTTONS */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleSubmit}
              disabled={loading || !comment.trim()}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white rounded-full px-6 py-2.5 font-medium transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Check className="w-4 h-4 mr-2" />
              )}
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
            <Button
              onClick={handleCancelEdit}
              variant="outline"
              className="w-full sm:w-auto rounded-full px-6 py-2.5"
            >
              Batal
            </Button>
          </div>
        </div>
      )}

      {/* ================= ALREADY REVIEWED NOTICE ================= */}
      {showEditButton && (
        <div className="bg-gradient-to-br from-[#39D177]/5 to-[#39D177]/10 p-4 sm:p-6 rounded-2xl border border-[#39D177]/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#39D177] flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Anda sudah memberikan ulasan
                </p>
                <p className="text-sm text-gray-500">
                  Anda dapat mengedit ulasan Anda kapan saja
                </p>
              </div>
            </div>
            <Button
              onClick={handleStartEdit}
              variant="outline"
              className="w-full sm:w-auto border-[#39D177] text-[#39D177] hover:bg-[#39D177]/5 rounded-full px-6"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Ulasan
            </Button>
          </div>
        </div>
      )}

      {/* ================= LIST REVIEW ================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#39D177]" />
            Ulasan ({reviews.length})
          </h3>
        </div>

        {/* LOADING STATE */}
        {loadingReviews && (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl border animate-pulse"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-20" />
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loadingReviews && reviews.length === 0 && (
          <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Belum ada ulasan untuk properti ini</p>
            {!readOnly && (
              <p className="text-sm text-gray-400 mt-1">
                Jadilah yang pertama memberikan ulasan!
              </p>
            )}
          </div>
        )}

        {/* REVIEW LIST */}
        {!loadingReviews &&
          reviews.map((r) => {
            const isMyReview = r.buyerName === buyerName;
            return (
              <div
                key={r.reviewId}
                className={`bg-white p-4 sm:p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow ${
                  isMyReview ? "border-[#39D177]/30 ring-1 ring-[#39D177]/20" : "border-gray-100"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* AVATAR */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isMyReview
                        ? "bg-gradient-to-br from-[#39D177] to-[#2FAE63]"
                        : "bg-gradient-to-br from-gray-400 to-gray-500"
                    }`}
                  >
                    <User className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* NAME & DATE */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">
                          {r.buyerName || "Pembeli"}
                        </p>
                        {isMyReview && (
                          <span className="text-xs bg-[#39D177]/10 text-[#39D177] px-2 py-0.5 rounded-full font-medium">
                            Anda
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        {new Date(r.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    {/* STAR DISPLAY */}
                    <div className="flex gap-0.5 my-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < r.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>

                    {/* COMMENT */}
                    <p className="text-gray-600 text-sm sm:text-base mt-2 leading-relaxed">
                      {r.comment}
                    </p>

                    {/* DELETE BUTTON - Only for user's own review */}
                    {isMyReview && !readOnly && (
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                        <button
                          onClick={() => openDeleteDialog(r.reviewId)}
                          disabled={deletingId === r.reviewId}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 disabled:opacity-50"
                        >
                          {deletingId === r.reviewId ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                          {deletingId === r.reviewId ? "Menghapus..." : "Hapus"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-2xl max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <AlertDialogTitle className="text-xl">
                Hapus Ulasan?
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-600">
              Ulasan yang dihapus tidak dapat dikembalikan. Apakah Anda yakin
              ingin melanjutkan?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 mt-4">
            <AlertDialogCancel className="rounded-full px-6 py-2.5 border-gray-300">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="rounded-full px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white"
            >
              {deletingId ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}