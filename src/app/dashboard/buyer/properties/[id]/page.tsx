"use client";

import PropertyReviewSection from "@/components/review/PropertyReviewSection";
import { Button } from "@/components/ui/button";
import { CatalogPropertyService } from "@/services/property/catalog.property.service";
import { useWishlist } from "@/hooks/property/useWishlist";
import {
  ArrowLeft,
  Building,
  Heart,
  Loader2,
  MapPin,
  Phone,
  Share2,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// TYPES
type PropertyDetail = {
  propertyId: number;
  address: string;
  price: number;
  description: string;
};

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();

  const propertyId = Number(params.id);

  const [property, setProperty] = useState<PropertyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const { isInWishlist, toggleWishlist } = useWishlist();

  // FETCH PROPERTY DETAIL
  useEffect(() => {
    if (isNaN(propertyId)) {
      toast.error("ID properti tidak valid");
      setLoading(false);
      return;
    }

    const fetchProperty = async () => {
      try {
        const res = await CatalogPropertyService.getById(propertyId);

        //  GUARD RESPONSE
        if (!res.success || !res.data) {
          setProperty(null);
          return;
        }

        setProperty(res.data);
      } catch (err) {
        toast.error("Gagal memuat detail properti");
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#39D177] animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Memuat detail properti...</p>
        </div>
      </div>
    );
  }

  // NOT FOUND STATE
  if (!property) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Properti tidak ditemukan
          </h2>
          <p className="text-gray-500 mb-4">
            Properti yang Anda cari mungkin sudah tidak tersedia
          </p>
          <Button
            onClick={() => router.push("/dashboard/buyer")}
            className="bg-[#39D177] hover:bg-[#2FAE63] text-white rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    );
  }

  // Extract location from address
  const location = property.address.split(",")[0] || property.address;

  // RENDER
  return (
    <main className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-[#39D177] transition mb-4 sm:mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm sm:text-base">Kembali</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* LEFT SECTION - PROPERTY DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          {/* PROPERTY IMAGE */}
          <div className="relative w-full h-[200px] sm:h-[300px] lg:h-[400px] rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src="/home.png"
              alt={property.address}
              fill
              priority
              className="object-cover"
            />

            {/* ACTION BUTTONS */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => property && toggleWishlist(property)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                  isInWishlist(property.propertyId)
                    ? "bg-red-500 text-white"
                    : "bg-white/90 text-gray-700 hover:bg-white hover:text-red-500"
                } shadow-lg`}
              >
                <Heart
                  className={`w-5 h-5 ${isInWishlist(property.propertyId) ? "fill-white" : ""}`}
                />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/90 text-gray-700 hover:bg-white flex items-center justify-center shadow-lg transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* BADGE */}
            <div className="absolute top-4 left-4">
              <span className="bg-[#39D177] text-white text-xs sm:text-sm px-3 py-1.5 rounded-full font-medium shadow-lg">
                Tersedia
              </span>
            </div>
          </div>

          {/* PROPERTY INFO CARD */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
            {/* TITLE & LOCATION */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {property.description || `Properti #${property.propertyId}`}
            </h1>

            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#39D177]" />
              <span className="text-sm sm:text-base">{property.address}</span>
            </div>

            {/* PRICE */}
            <div className="bg-gradient-to-r from-[#39D177]/10 to-[#39D177]/5 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Harga</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#39D177]">
                Rp {property.price.toLocaleString("id-ID")}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Deskripsi
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {property.description || "Tidak ada deskripsi tersedia."}
              </p>
            </div>
          </div>

          {/* REVIEW SECTION - WITH CREATE CAPABILITY */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <PropertyReviewSection
              propertyId={property.propertyId}
              readOnly={false}
            />
          </div>
        </div>

        {/* RIGHT SECTION - SIDEBAR */}
        <div className="space-y-4 sm:space-y-6">
          {/* CONTACT SELLER CARD */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Hubungi Penjual
            </h3>

            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#39D177] to-[#2FAE63] flex items-center justify-center">
                <span className="text-white font-semibold text-lg">S</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Seller</p>
                <p className="text-sm text-gray-500">Agen Properti</p>
              </div>
            </div>

            <Button className="w-full bg-[#39D177] hover:bg-[#2FAE63] text-white rounded-full py-3 font-medium transition-all">
              <Phone className="w-4 h-4 mr-2" />
              Hubungi Penjual
            </Button>

            <Button
              variant="outline"
              onClick={() => property && toggleWishlist(property)}
              className={`w-full mt-3 rounded-full py-3 transition-all ${
                isInWishlist(property.propertyId)
                  ? "border-red-300 text-red-500 bg-red-50 hover:bg-red-100"
                  : "border-[#39D177] text-[#39D177] hover:bg-[#39D177]/5"
              }`}
            >
              <Heart className={`w-4 h-4 mr-2 ${isInWishlist(property.propertyId) ? "fill-red-500" : ""}`} />
              {isInWishlist(property.propertyId) ? "Hapus dari Wishlist" : "Tambah ke Wishlist"}
            </Button>
          </div>

          {/* SECURITY BADGE */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 flex gap-3 items-start">
            <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-800 text-sm">
                Transaksi Aman
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Transaksi dilindungi oleh sistem keamanan WareLand
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
