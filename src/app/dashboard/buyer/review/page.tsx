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
    <main className="px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Ulasan Anda ✨</h1>
      <p className="text-gray-600 mb-8">
        Lihat ulasan yang telah Anda berikan kepada penjual setelah transaksi.
      </p>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border shadow-sm rounded-xl p-6 flex gap-5"
          >
            {/* Image */}
            <Image
              src={review.image}
              width={110}
              height={90}
              alt="property"
              className="rounded-lg object-cover"
            />

            {/* Review Content */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{review.property}</h2>
              <p className="text-gray-700 text-sm mt-1">
                Seller: <span className="font-medium">{review.seller}</span>
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-500 fill-yellow-500"
                  />
                ))}
                {Array.from({ length: 5 - review.rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-gray-300" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
