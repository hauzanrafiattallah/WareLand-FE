"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  CreatePropertyInput,
  createPropertySchema,
} from "@/services/property/property.schema";
import { PropertyService } from "@/services/property/property.service";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  FileText,
  Image as ImageIcon,
  Loader2,
  MapPin,
  UploadCloud,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = Number(params.id);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<CreatePropertyInput>({
    resolver: zodResolver(createPropertySchema),
    mode: "onChange",
  });

  // Fetch Existing Data
  useEffect(() => {
    if (!propertyId) return;
    const fetchData = async () => {
      try {
        const res = await PropertyService.getById(propertyId);
        if (res.success && res.data) {
          const { address, price, description, imageUrl } = res.data;

          reset({
            address,
            price,
            description,
            imageUrl: imageUrl || "",
          });

          if (imageUrl) {
            setImagePreview(imageUrl);
          }
        } else {
          toast.error("Properti tidak ditemukan");
          router.push("/dashboard/seller/listings");
        }
      } catch (error) {
        console.error(error);
        toast.error("Gagal memuat data properti");
        router.push("/dashboard/seller/listings");
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [propertyId, reset, router]);

  // Use existing "New Property" logic for form handling...
  const watchedFields = watch();
  const fieldCount = 4;
  const filledFields = [
    watchedFields.address?.length >= 10,
    watchedFields.price && watchedFields.price > 0,
    watchedFields.description?.length >= 10,
    !!imagePreview,
  ].filter(Boolean).length;
  const progress = (filledFields / fieldCount) * 100;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processImage(file);
  };

  const processImage = (file?: File) => {
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran gambar maksimal 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setValue("imageUrl", "");
  };

  const onSubmit = async (data: CreatePropertyInput) => {
    setIsLoading(true);
    try {
      let imageUrl = data.imageUrl; // Keep existing URL by default

      if (imageFile) {
        setIsUploading(true);
        imageUrl = await uploadToCloudinary(imageFile);
        setIsUploading(false);
      }

      await PropertyService.update(propertyId, {
        address: data.address,
        price: data.price,
        description: data.description,
        imageUrl: imageUrl,
      });

      toast.success("Properti berhasil diperbarui!");
      router.push("/dashboard/seller/listings");
    } catch (error) {
      console.error(error);
      toast.error("Gagal memperbarui properti");
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#39D177] animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Memuat data properti...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#39D177]/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/seller/listings"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#39D177] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Kembali ke Listing</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#39D177] to-[#2FAE63] flex items-center justify-center shadow-lg shadow-[#39D177]/30">
              <EditIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Edit Properti
              </h1>
              <p className="text-gray-600 mt-1">
                Perbarui informasi properti Anda
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Kelengkapan Form
              </span>
              <span className="text-sm font-bold text-[#39D177]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#39D177] to-[#2FAE63] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Address Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Lokasi Properti
                    </h3>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    {...register("address")}
                    placeholder="Contoh: Jl. Mawar No. 20, Jakarta Selatan"
                    className={`h-12 rounded-xl border-gray-200 focus:border-[#39D177] focus:ring-[#39D177]/20 transition-all ${
                      errors.address
                        ? "border-red-300 focus:border-red-500"
                        : ""
                    }`}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Price Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#39D177] to-[#2FAE63] flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Harga</h3>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-700">
                    Harga (Rupiah) <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      Rp
                    </span>
                    <Input
                      id="price"
                      type="number"
                      {...register("price", { valueAsNumber: true })}
                      placeholder="1.500.000.000"
                      className={`h-12 pl-12 rounded-xl border-gray-200 focus:border-[#39D177] focus:ring-[#39D177]/20 transition-all ${
                        errors.price
                          ? "border-red-300 focus:border-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Deskripsi</h3>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700">
                    Deskripsi Properti <span className="text-red-500">*</span>
                  </Label>
                  <textarea
                    id="description"
                    {...register("description")}
                    rows={5}
                    placeholder="Deskripsi properti..."
                    className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#39D177] focus:ring-2 focus:ring-[#39D177]/20 transition-all resize-none text-gray-900 placeholder:text-gray-400 ${
                      errors.description
                        ? "border-red-300 focus:border-red-500"
                        : ""
                    }`}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Image & Submit */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Upload Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Foto Properti
                    </h3>
                  </div>
                </div>

                {!imagePreview ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl h-56 flex flex-col items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-[#39D177]/5 hover:to-[#39D177]/10 transition-all cursor-pointer relative ${
                      isDragOver
                        ? "border-[#39D177] bg-[#39D177]/10"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageSelect}
                    />
                    <UploadCloud className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Upload Gambar</span>
                  </div>
                ) : (
                  <div className="relative h-56 rounded-2xl overflow-hidden border border-gray-100 group">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white text-gray-700 shadow-lg transition-all hover:scale-110"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {/* If new file selected show name, else show 'Current Image' */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm font-medium truncate drop-shadow-md">
                        {imageFile
                          ? imageFile.name
                          : imagePreview.startsWith("http")
                            ? "Gambar Saat Ini"
                            : "Preview"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="bg-gradient-to-br from-[#39D177]/10 to-[#39D177]/5 rounded-2xl p-6 border border-[#39D177]/20 space-y-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-gradient-to-r from-[#39D177] to-[#2FAE63] hover:from-[#2FAE63] hover:to-[#259953] text-white rounded-2xl text-base font-semibold shadow-lg shadow-[#39D177]/30 hover:shadow-xl hover:shadow-[#39D177]/40 transition-all"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Menyimpan...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Simpan Perubahan</span>
                    </div>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  className="w-full h-12 rounded-2xl border-gray-200 hover:bg-gray-50"
                  onClick={() => router.push("/dashboard/seller/listings")}
                >
                  Batal
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}
