"use client";

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
import { Button } from "@/components/ui/button";
import { useProperty } from "@/hooks/property/useProperty";
import {
  Edit,
  Plus,
  Trash2,
  Loader2,
  Building,
  MapPin,
  Search,
  AlertTriangle,
  Home,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ManageListingsPage() {
  const { properties, loading, error, deleteProperty } = useProperty();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleConfirmDelete = async () => {
    if (selectedId !== null) {
      setDeleting(true);
      await deleteProperty(selectedId);
      setDeleting(false);
      setSelectedId(null);
      setOpen(false);
    }
  };

  // Filter properties by search
  const filteredProperties = properties.filter(
    (p) =>
      p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#39D177] animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Memuat properti Anda...</p>
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
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {/* HEADER */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#39D177] to-[#2FAE63] flex items-center justify-center">
                <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Listing Saya
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Kelola properti yang Anda jual
                </p>
              </div>
            </div>

            <Link href="/dashboard/seller/listings/new">
              <Button className="w-full sm:w-auto bg-[#39D177] hover:bg-[#2FAE63] text-white rounded-full px-6">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Properti
              </Button>
            </Link>
          </div>
        </div>

        {/* STATS */}
        {properties.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-[#39D177]/10 to-[#39D177]/20 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-[#39D177]">
                {properties.length}
              </p>
              <p className="text-sm text-gray-600">Total Listing</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">
                {new Set(properties.map((p) => p.address.split(",")[0])).size}
              </p>
              <p className="text-sm text-gray-600">Lokasi</p>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">
                Rp{" "}
                {(
                  properties.reduce((sum, p) => sum + p.price, 0) / 1000000000
                ).toFixed(1)}
                M
              </p>
              <p className="text-sm text-gray-600">Total Nilai</p>
            </div>
          </div>
        )}

        {/* SEARCH BAR */}
        {properties.length > 0 && (
          <div className="bg-white shadow-sm border rounded-xl p-3 mb-6 flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari properti..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-sm sm:text-base"
            />
          </div>
        )}

        {/* EMPTY STATE */}
        {properties.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Belum Ada Listing
            </h3>
            <p className="text-gray-500 mb-4 max-w-md mx-auto">
              Anda belum memiliki properti yang dijual. Tambahkan properti
              pertama Anda sekarang!
            </p>
            <Link href="/dashboard/seller/listings/new">
              <Button className="bg-[#39D177] hover:bg-[#2FAE63] text-white rounded-full px-6">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Properti
              </Button>
            </Link>
          </div>
        )}

        {/* PROPERTY GRID */}
        {filteredProperties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProperties.map((item) => (
              <div
                key={item.propertyId}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden group"
              >
                {/* IMAGE */}
                <div className="relative w-full h-48 bg-gray-100">
                  <Image
                    src={item.imageUrl || "/home.png"}
                    alt={item.address}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* ACTIONS */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/dashboard/seller/listings/edit/${item.propertyId}`}>
                      <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-[#39D177] hover:bg-gray-50 transition">
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedId(item.propertyId);
                        setOpen(true);
                      }}
                      className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                    {item.description?.split("\n")[0]?.replace("Title: ", "") ||
                      `Properti #${item.propertyId}`}
                  </h3>

                  <p className="text-[#39D177] font-bold text-lg mt-1">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="line-clamp-1">{item.address}</span>
                  </div>

                  {/* MOBILE ACTIONS */}
                  <div className="flex gap-2 mt-4 sm:hidden">
                    <Link
                      href={`/dashboard/seller/listings/edit/${item.propertyId}`}
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full rounded-full text-sm"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="rounded-full text-red-500 border-red-200 hover:bg-red-50"
                      onClick={() => {
                        setSelectedId(item.propertyId);
                        setOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NO SEARCH RESULTS */}
        {properties.length > 0 && filteredProperties.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              Tidak ada properti yang cocok dengan pencarian
            </p>
          </div>
        )}
      </main>

      {/* DELETE CONFIRMATION MODAL */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="rounded-2xl max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <AlertDialogTitle className="text-xl">
                Hapus Properti?
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-600">
              Properti yang dihapus tidak dapat dikembalikan. Apakah Anda yakin
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
              {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Ya, Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
