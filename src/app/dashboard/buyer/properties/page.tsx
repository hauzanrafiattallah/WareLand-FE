"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  ShieldCheck,
  User,
  Phone,
  Share2,
  Heart,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import { useReview } from "@/hooks/review/useReview";

/* ======================================================
   TYPES
====================================================== */
type PropertyDetail = {
  id: number;
  title: string;
  price: string;
  location: string;
  address: string;
  seller: {
    name: string;
    role: string;
  };
  images: string[];
  specs: {
    beds: number;
    baths: number;
    buildingArea: number;
  };
  description: string;
};

/* ======================================================
   DUMMY FETCH PROPERTY (SESUAI CODE KAMU)
====================================================== */
async function getPropertyDetail(id: string): Promise<PropertyDetail | null> {
  await new Promise((r) => setTimeout(r, 300));

  return {
    id: Number(id),
    title: "Rumah Modern Minimalis",
    price: "750.000.000",
    location: "Bandung",
    address: "Jl. Sukajadi No. 123, Bandung",
    seller: {
      name: "Andi Setiawan",
      role: "Agen Properti",
    },
    images: ["/home.png"],
    specs: {
      beds: 3,
      baths: 2,
      buildingArea: 90,
    },
    description:
      "Hunian nyaman dengan desain modern, cocok untuk keluarga muda.",
  };
}

/* ======================================================
   PAGE
====================================================== */
export default function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [property, setProperty] = useState<PropertyDetail | null>(null);

  const { reviews, fetchReviewsByProperty, createReview } = useReview();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const buyerId: number | null = user?.id ?? null;

  /* ===== FETCH PROPERTY ===== */
  useEffect(() => {
    getPropertyDetail(params.id).then((res) => {
      if (!res) return notFound();
      setProperty(res);
    });
  }, [params.id]);

  /* ===== FETCH REVIEW BY PROPERTY ===== */
  useEffect(() => {
    if (property?.id) {
      fetchReviewsByProperty(property.id);
    }
  }, [property?.id, fetchReviewsByProperty]);

  if (!property) return null;

  /* ===== CREATE REVIEW ===== */
  const handleCreateReview = async () => {
    if (!buyerId) {
      toast.error("Silakan login untuk memberi review");
      return;
    }

    try {
      await createReview({
        buyerId,
        propertyId: property.id,
        rating,
        comment,
      });

      toast.success("Review berhasil dikirim");
      setComment("");
      setRating(5);
      fetchReviewsByProperty(property.id);
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? "Gagal mengirim review");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* ================= HEADER IMAGE ================= */}
      <div className="relative w-full h-[400px] bg-gray-200">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover"
        />

        <div className="absolute top-6 right-6 flex gap-3">
          <Button size="icon" variant="secondary">
            <Share2 />
          </Button>
          <Button size="icon" variant="secondary">
            <Heart />
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold">{property.title}</h1>
              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <MapPin size={16} />
                {property.address}
              </div>

              <h2 className="text-2xl font-bold text-[#39D177] mt-4">
                Rp {property.price}
              </h2>

              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-1">
                  <BedDouble size={18} /> {property.specs.beds}
                </div>
                <div className="flex items-center gap-1">
                  <Bath size={18} /> {property.specs.baths}
                </div>
                <div className="flex items-center gap-1">
                  <Maximize size={18} /> {property.specs.buildingArea} m²
                </div>
              </div>

              <Separator className="my-6" />

              <p className="text-gray-700">{property.description}</p>
            </CardContent>
          </Card>

          {/* ================= CREATE REVIEW ================= */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Tulis Ulasan</h3>

              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`cursor-pointer ${
                      i < rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(i + 1)}
                  />
                ))}
              </div>

              <textarea
                className="w-full border rounded-lg p-3 text-sm"
                placeholder="Bagaimana pengalaman Anda?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <Button className="mt-3" onClick={handleCreateReview}>
                Kirim Review
              </Button>
            </CardContent>
          </Card>

          {/* ================= LIST REVIEW ================= */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Ulasan Pembeli</h3>

            {reviews.length === 0 ? (
              <p className="text-gray-500">Belum ada ulasan</p>
            ) : (
              reviews.map((r) => (
                <Card key={r.reviewId}>
                  <CardContent className="p-4">
                    <p className="font-semibold">{r.buyerName}</p>

                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < r.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 mt-2">“{r.comment}”</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <User />
                <div>
                  <p className="font-semibold">{property.seller.name}</p>
                  <p className="text-xs text-gray-500">
                    {property.seller.role}
                  </p>
                </div>
              </div>

              <Button className="w-full bg-[#39D177] text-white">
                <Phone className="mr-2" size={16} />
                Hubungi Penjual
              </Button>
            </CardContent>
          </Card>

          <div className="bg-blue-50 p-4 rounded-xl flex gap-3">
            <ShieldCheck className="text-blue-600" />
            <p className="text-xs text-blue-700">
              Transaksi dilindungi oleh sistem WareLand
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
