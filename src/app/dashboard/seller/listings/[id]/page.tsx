"use client";

import PropertyReviewSection from "@/components/review/PropertyReviewSection";
import { Button } from "@/components/ui/button";
import {
  CatalogProperty,
  CatalogPropertyService,
} from "@/services/property/catalog.property.service";
import {
  ArrowLeft,
  Building,
  Calendar,
  Edit,
  Loader2,
  MapPin,
  Share2,
  ShieldCheck,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
} from "@/components/ui/alert-dialog";
import { PropertyService } from "@/services/property/property.service";

export default function SellerPropertyDetailPage() {
  const params = useParams();
  const router = useRouter();

  const propertyId = Number(params.id);

  const [property, setProperty] = useState<CatalogProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await PropertyService.delete(propertyId);
      toast.success("Properti berhasil dihapus");
      router.push("/dashboard/seller/listings");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus properti");
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
    }
  };

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

        if (!res.success || !res.data) {
          setProperty(null);
          return;
        }

        setProperty(res.data);
      } catch (err) {
        console.error(err);
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
            Properti mungkin sudah dihapus atau tidak tersedia
          </p>
          <Button
            onClick={() => router.push("/dashboard/seller/listings")}
            className="bg-[#39D177] hover:bg-[#2FAE63] text-white rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Listing
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-[#39D177] transition mb-4 sm:mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm sm:text-base">Kembali ke Listing</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* LEFT SECTION - PROPERTY DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          {/* PROPERTY IMAGE */}
          <div className="relative w-full h-[200px] sm:h-[300px] lg:h-[400px] rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={property.imageUrl || "/home.png"}
              alt={property.address}
              fill
              priority
              className="object-cover"
            />

            {/* ACTION BUTTONS */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white/90 text-gray-700 hover:bg-white flex items-center justify-center shadow-lg transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* BADGE */}
            <div className="absolute top-4 left-4">
              <span className="bg-[#39D177] text-white text-xs sm:text-sm px-3 py-1.5 rounded-full font-medium shadow-lg">
                Published
              </span>
            </div>
          </div>

          {/* PROPERTY INFO CARD */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
            {/* TITLE & LOCATION */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {property.description?.split("\n")[0] ||
                `Properti #${property.propertyId}`}
            </h1>

            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#39D177]" />
              <span className="text-sm sm:text-base">{property.address}</span>
            </div>

            {/* PRICE */}
            <div className="bg-gradient-to-r from-[#39D177]/10 to-[#39D177]/5 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Harga Penawaran</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#39D177]">
                Rp {property.price.toLocaleString("id-ID")}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Deskripsi
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {property.description || "Tidak ada deskripsi tersedia."}
              </p>
            </div>
          </div>

          {/* REVIEWS SECTION */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <PropertyReviewSection
              propertyId={property.propertyId}
              readOnly={true} // Seller just views reviews
            />
          </div>
        </div>

        {/* RIGHT SECTION - SIDEBAR */}
        <div className="space-y-4 sm:space-y-6">
          {/* SELLER ACTIONS CARD */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Aksi Seller
            </h3>

            <div className="space-y-2">
              <Link
                href={`/dashboard/seller/listings/edit/${property.propertyId}`}
                className="block w-full"
              >
                <Button className="w-full bg-[#39D177] hover:bg-[#2FAE63] text-white rounded-full py-3 font-medium transition-all">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Properti
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full rounded-full text-red-500 border-red-200 hover:bg-red-50"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Hapus Properti
              </Button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Diposting: {new Date().toLocaleDateString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          {/* STATUS INFO */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-4 flex gap-3 items-start">
            <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-800 text-sm">Status: Aktif</p>
              <p className="text-xs text-blue-600 mt-1">
                Properti Anda sedang ditampilkan di katalog publik.
              </p>
            </div>
          </div>
        </div>
      </div>
       {/* DELETE CONFIRMATION MODAL */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="rounded-3xl max-w-md border-0 ring-1 ring-gray-100 shadow-2xl p-0 overflow-hidden">
          <div className="bg-red-50/50 p-8 flex flex-col items-center pt-10">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4 shadow-inner ring-4 ring-white">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-gray-900 text-center">
              Hapus Properti?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 text-center mt-2 max-w-xs">
              Properti yang dihapus tidak dapat dikembalikan. Tindakan ini bersifat permanen.
            </AlertDialogDescription>
          </div>

          <AlertDialogFooter className="p-6 bg-white flex flex-col-reverse sm:flex-row gap-3 items-center justify-center sm:justify-center w-full">
            <AlertDialogCancel className="w-full sm:w-auto rounded-xl px-8 py-3 border-gray-200 text-gray-700 hover:bg-gray-50 h-12">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="w-full sm:w-auto rounded-xl px-8 py-3 bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 h-12 border-0"
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Ya, Hapus Permanen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
