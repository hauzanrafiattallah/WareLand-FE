"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UploadCloud,
  Loader2,
  X,
  MapPin,
  DollarSign,
  FileText,
  Home,
  ArrowLeft,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { PropertyService } from "@/services/property/property.service";
import {
  createPropertySchema,
  CreatePropertyInput,
} from "@/services/property/property.schema";
import { uploadToCloudinary } from "@/lib/cloudinary";
import Image from "next/image";
import Link from "next/link";

export default function AddPropertyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, dirtyFields },
  } = useForm<CreatePropertyInput>({
    resolver: zodResolver(createPropertySchema),
    mode: "onChange",
    defaultValues: {
      address: "",
      price: undefined,
      description: "",
      imageUrl: "",
    },
  });

  // Calculate form progress
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
      let imageUrl = "";
      if (imageFile) {
        setIsUploading(true);
        imageUrl = await uploadToCloudinary(imageFile);
        setIsUploading(false);
      }

      await PropertyService.create({
        address: data.address,
        price: data.price,
        description: data.description,
        imageUrl: imageUrl,
      });

      toast.success("Properti berhasil dipublikasikan!");
      router.push("/dashboard/seller/listings");
    } catch (error) {
      console.error(error);
      toast.error("Gagal mempublikasikan properti");
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };

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
              <Home className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Tambah Properti Baru
              </h1>
              <p className="text-gray-600 mt-1">
                Lengkapi informasi untuk mempublikasikan properti Anda
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
            <div className="flex justify-between mt-3">
              {["Alamat", "Harga", "Deskripsi", "Gambar"].map((label, idx) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      [
                        watchedFields.address?.length >= 10,
                        watchedFields.price && watchedFields.price > 0,
                        watchedFields.description?.length >= 10,
                        !!imagePreview,
                      ][idx]
                        ? "bg-[#39D177] text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-gray-500 hidden sm:inline">
                    {label}
                  </span>
                </div>
              ))}
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
                    <p className="text-sm text-gray-500">
                      Alamat lengkap properti Anda
                    </p>
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
                      errors.address ? "border-red-300 focus:border-red-500" : ""
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
                    <p className="text-sm text-gray-500">
                      Tentukan harga jual properti
                    </p>
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
                        errors.price ? "border-red-300 focus:border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                      {errors.price.message}
                    </p>
                  )}
                  {watchedFields.price && watchedFields.price > 0 && (
                    <p className="text-sm text-[#39D177] font-medium">
                      Rp {watchedFields.price.toLocaleString("id-ID")}
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
                    <p className="text-sm text-gray-500">
                      Jelaskan detail properti Anda
                    </p>
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
                    placeholder="Contoh: Rumah minimalis 2 lantai dengan 3 kamar tidur, 2 kamar mandi, carport untuk 2 mobil, taman depan dan belakang. Lokasi strategis dekat pusat perbelanjaan dan akses tol."
                    className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#39D177] focus:ring-2 focus:ring-[#39D177]/20 transition-all resize-none text-gray-900 placeholder:text-gray-400 ${
                      errors.description
                        ? "border-red-300 focus:border-red-500"
                        : ""
                    }`}
                  />
                  <div className="flex justify-between items-center">
                    {errors.description ? (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                        {errors.description.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="text-xs text-gray-400">
                      {watchedFields.description?.length || 0}/1000
                    </span>
                  </div>
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
                    <p className="text-sm text-gray-500">
                      Upload foto terbaik
                    </p>
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
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                        isDragOver
                          ? "bg-[#39D177] text-white scale-110"
                          : "bg-gray-100"
                      }`}
                    >
                      <UploadCloud
                        className={`w-8 h-8 ${
                          isDragOver ? "animate-bounce" : ""
                        }`}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {isDragOver ? "Lepaskan untuk upload" : "Drag & drop atau klik"}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      PNG, JPG, WEBP (Maks. 5MB)
                    </span>
                  </div>
                ) : (
                  <div className="relative h-56 rounded-2xl overflow-hidden border border-gray-100 group">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white text-gray-700 shadow-lg transition-all hover:scale-110"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-sm font-medium truncate">
                        {imageFile?.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="bg-gradient-to-br from-[#39D177]/10 to-[#39D177]/5 rounded-2xl p-6 border border-[#39D177]/20 space-y-4">
                <div className="text-center mb-2">
                  <p className="text-sm text-gray-600">
                    {isValid && imagePreview
                      ? "✨ Form sudah lengkap!"
                      : "Lengkapi semua field untuk publish"}
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !isValid}
                  className="w-full h-14 bg-gradient-to-r from-[#39D177] to-[#2FAE63] hover:from-[#2FAE63] hover:to-[#259953] text-white rounded-2xl text-base font-semibold shadow-lg shadow-[#39D177]/30 hover:shadow-xl hover:shadow-[#39D177]/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>
                        {isUploading
                          ? "Mengupload gambar..."
                          : "Mempublikasikan..."}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Publikasikan Properti</span>
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
