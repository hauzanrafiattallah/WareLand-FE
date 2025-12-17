"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Review = {
  id: number;
  seller: string;
  property: string;
  rating: number;
  comment: string;
  image: string;
};

const dummyReviews: Review[] = [
  {
    id: 1,
    seller: "Andi Setiawan",
    property: "Rumah Modern Minimalis",
    rating: 5,
    comment: "Penjual sangat ramah, proses transaksi cepat dan aman!",
    image: "/home.png",
  },
  {
    id: 2,
    seller: "Sari Puspita",
    property: "Villa Pemandangan Gunung",
    rating: 4,
    comment: "Pelayanan bagus, villa sesuai deskripsi. Sedikit telat respons.",
    image: "/home.png",
  },
];

export default function ReviewPage() {
  const [reviews] = useState<Review[]>(dummyReviews);

  return (
    <main className="px-2 py-6 md:px-6 md:py-10 mx-auto min-h-screen bg-gray-50">
      <div className="mb-6 px-2 md:px-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Ulasan Anda
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          Lihat ulasan yang telah Anda berikan kepada penjual setelah transaksi.
        </p>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white shadow-sm border rounded-xl overflow-hidden flex flex-col md:flex-row md:items-start md:p-5 transition hover:shadow-md"
          >
            <div className="relative w-full h-48 md:w-[140px] md:h-[110px] flex-shrink-0 bg-gray-100">
              <Image
                src={review.image}
                fill
                alt="property"
                className="object-cover md:rounded-lg"
              />
            </div>

            <div className="flex-1 p-4 md:p-0 md:ml-5">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 leading-tight">
                    {review.property}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Seller:{" "}
                    <span className="font-medium text-gray-900">
                      {review.seller}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-2 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200 fill-gray-100"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-2 font-medium">
                  ({review.rating}/5)
                </span>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-gray-700 text-sm leading-relaxed italic">
                  &quot;{review.comment}&quot;
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
