"use client";

import { useReview } from "@/hooks/review/useReview";
import {
  Star,
  MessageSquare,
  ExternalLink,
  Loader2,
  Building,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function ReviewPage() {
  const { myReviews, loading, error, fetchReviewsByBuyer } = useReview();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const buyerId: number | null = user?.id ?? null;

  useEffect(() => {
    if (buyerId) {
      fetchReviewsByBuyer(buyerId);
    }
  }, [fetchReviewsByBuyer, buyerId]);

  // Get rating color
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "from-green-400 to-emerald-500";
    if (rating >= 3) return "from-yellow-400 to-amber-500";
    return "from-orange-400 to-red-500";
  };

  // Get rating label
  const getRatingLabel = (rating: number) => {
    if (rating >= 5) return "Sangat Bagus";
    if (rating >= 4) return "Bagus";
    if (rating >= 3) return "Cukup";
    if (rating >= 2) return "Kurang";
    return "Buruk";
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#39D177] animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Memuat ulasan Anda...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      {/* HEADER */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#39D177] to-[#2FAE63] flex items-center justify-center">
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Ulasan Saya
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Kelola ulasan yang telah Anda berikan
            </p>
          </div>
        </div>
      </div>

      {/* STATS CARD */}
      {myReviews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#39D177]/10 to-[#39D177]/20 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-[#39D177]">
              {myReviews.length}
            </p>
            <p className="text-sm text-gray-600">Total Ulasan</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-amber-600">
              {(
                myReviews.reduce((sum, r) => sum + r.rating, 0) /
                myReviews.length
              ).toFixed(1)}
            </p>
            <p className="text-sm text-gray-600">Rata-rata Rating</p>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">
              {new Set(myReviews.map((r) => r.propertyId)).size}
            </p>
            <p className="text-sm text-gray-600">Properti Diulas</p>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {myReviews.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Belum Ada Ulasan
          </h3>
          <p className="text-gray-500 mb-4 max-w-md mx-auto">
            Anda belum memberikan ulasan untuk properti manapun. Kunjungi
            halaman properti untuk memberikan ulasan.
          </p>
          <Link
            href="/dashboard/buyer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#39D177] text-white rounded-full hover:bg-[#2FAE63] transition"
          >
            Jelajahi Properti
          </Link>
        </div>
      )}

      {/* REVIEW LIST */}
      {myReviews.length > 0 && (
        <div className="space-y-4">
          {myReviews.map((review) => (
            <Link
              key={review.reviewId}
              href={`/dashboard/buyer/properties/${review.propertyId}`}
              className="block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#39D177]/30 transition-all group overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                {/* IMAGE */}
                <div className="relative w-full sm:w-40 h-32 sm:h-auto flex-shrink-0 bg-gray-100">
                  <Image
                    src="/home.png"
                    alt={review.propertyTitle}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* RATING BADGE */}
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r ${getRatingColor(
                      review.rating
                    )} text-white text-sm font-medium shadow-lg flex items-center gap-1`}
                  >
                    <Star className="w-4 h-4 fill-white" />
                    {review.rating}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex-1 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="flex-1">
                      {/* PROPERTY TITLE */}
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#39D177] transition line-clamp-1 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        {review.propertyTitle}
                      </h3>

                      {/* DATE */}
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(review.createdAt).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>

                      {/* STARS */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {getRatingLabel(review.rating)}
                        </span>
                      </div>

                      {/* COMMENT */}
                      <p className="text-gray-600 mt-3 line-clamp-2">
                        "{review.comment}"
                      </p>
                    </div>

                    {/* ACTION HINT */}
                    <div className="flex items-center gap-2 text-[#39D177] text-sm font-medium mt-2 sm:mt-0">
                      <span className="hidden sm:inline">Lihat Detail</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* INFO CARD */}
      {myReviews.length > 0 && (
        <div className="mt-8 bg-gradient-to-br from-[#39D177]/5 to-[#39D177]/10 rounded-2xl border border-[#39D177]/20 p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#39D177]/20 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-[#39D177]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Kelola Ulasan Anda
              </h3>
              <p className="text-sm text-gray-600">
                Klik pada ulasan untuk melihat detail properti. Di halaman
                detail, Anda dapat mengedit atau menghapus ulasan Anda.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
