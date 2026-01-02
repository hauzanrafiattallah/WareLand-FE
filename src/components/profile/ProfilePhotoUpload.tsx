/**
 * Komponen ProfilePhotoUpload
 * Komponen UI untuk upload foto profil dengan drag & drop
 */

"use client";

import { useProfilePhotoUpload } from "@/hooks/profile";
import { ALLOWED_IMAGE_TYPES, ProfilePhotoUploadProps } from "@/types/profile";
import { Camera, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";

/**
 * Komponen upload foto profil dengan fitur drag & drop
 * @param props - Props komponen
 */
export function ProfilePhotoUpload({
  currentImageUrl,
  onImageUploaded,
  disabled = false,
  size = 100,
}: ProfilePhotoUploadProps) {
  // Gunakan hook untuk logika upload
  const {
    previewUrl,
    isUploading,
    isDragOver,
    fileInputRef,
    displayUrl,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleClick,
    handleInputChange,
    clearPreview,
  } = useProfilePhotoUpload({
    currentImageUrl,
    onImageUploaded,
    disabled,
  });

  return (
    <div className="relative group" style={{ width: size, height: size }}>
      {/* Input file tersembunyi */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_IMAGE_TYPES.join(",")}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {/* Area drop / Container gambar */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative w-full h-full rounded-full overflow-hidden
          border-2 transition-all duration-300
          ${
            isDragOver
              ? "border-[#39D177] border-dashed bg-[#39D177]/10 scale-105"
              : "border-gray-200"
          }
          ${
            !disabled && !isUploading
              ? "cursor-pointer hover:border-[#39D177]/50"
              : ""
          }
          ${isUploading ? "cursor-wait" : ""}
        `}
      >
        {/* Gambar saat ini atau preview */}
        {displayUrl ? (
          <Image
            src={displayUrl}
            alt="Profile"
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Camera size={size * 0.3} className="text-gray-400" />
          </div>
        )}

        {/* Overlay loading */}
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}

        {/* Overlay hover - hanya tampil ketika tidak loading dan tidak disabled */}
        {!isUploading && !disabled && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex flex-col items-center text-white">
              <Upload size={20} />
              <span className="text-xs mt-1 font-medium">Upload</span>
            </div>
          </div>
        )}

        {/* Indikator drag */}
        {isDragOver && (
          <div className="absolute inset-0 bg-[#39D177]/20 flex items-center justify-center">
            <div className="flex flex-col items-center text-[#39D177]">
              <Upload size={24} className="animate-bounce" />
              <span className="text-xs mt-1 font-medium">Drop here</span>
            </div>
          </div>
        )}
      </div>

      {/* Tombol hapus - tampil ketika ada preview */}
      {previewUrl && !isUploading && !disabled && (
        <button
          onClick={clearPreview}
          className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-10"
        >
          <X size={14} />
        </button>
      )}

      {/* Badge indikator edit */}
      {!disabled && !isUploading && (
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#39D177] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all duration-200 group-hover:scale-110">
          <Camera size={14} />
        </div>
      )}
    </div>
  );
}
