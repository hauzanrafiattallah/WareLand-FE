"use client";

import { uploadToCloudinary } from "@/lib/cloudinary";
import { Camera, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

interface ProfilePhotoUploadProps {
  currentImageUrl?: string;
  onImageUploaded: (url: string) => void;
  disabled?: boolean;
  size?: number;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function ProfilePhotoUpload({
  currentImageUrl,
  onImageUploaded,
  disabled = false,
  size = 100,
}: ProfilePhotoUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Format file tidak didukung. Gunakan JPG, PNG, atau WebP.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Ukuran file maksimal 5MB.");
      return false;
    }

    return true;
  };

  const handleFile = useCallback(
    async (file: File) => {
      if (!validateFile(file)) return;

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      setIsUploading(true);
      try {
        const url = await uploadToCloudinary(file);
        onImageUploaded(url);
        toast.success("Foto berhasil diupload!");
      } catch {
        toast.error("Gagal mengupload foto. Silakan coba lagi.");
        setPreviewUrl(null);
      } finally {
        setIsUploading(false);
      }
    },
    [onImageUploaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (disabled || isUploading) return;

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [disabled, isUploading, handleFile]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled && !isUploading) {
        setIsDragOver(true);
      }
    },
    [disabled, isUploading]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
    },
    []
  );

  const handleClick = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const clearPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    onImageUploaded("");
  };

  const displayUrl = previewUrl || currentImageUrl;

  return (
    <div className="relative group" style={{ width: size, height: size }}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {/* Drop zone / Image container */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative w-full h-full rounded-full overflow-hidden
          border-2 transition-all duration-300
          ${isDragOver
            ? "border-[#39D177] border-dashed bg-[#39D177]/10 scale-105"
            : "border-gray-200"
          }
          ${!disabled && !isUploading ? "cursor-pointer hover:border-[#39D177]/50" : ""}
          ${isUploading ? "cursor-wait" : ""}
        `}
      >
        {/* Current or Preview Image */}
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

        {/* Loading overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}

        {/* Hover overlay - Only show when not uploading and not disabled */}
        {!isUploading && !disabled && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex flex-col items-center text-white">
              <Upload size={20} />
              <span className="text-xs mt-1 font-medium">Upload</span>
            </div>
          </div>
        )}

        {/* Drag indicator */}
        {isDragOver && (
          <div className="absolute inset-0 bg-[#39D177]/20 flex items-center justify-center">
            <div className="flex flex-col items-center text-[#39D177]">
              <Upload size={24} className="animate-bounce" />
              <span className="text-xs mt-1 font-medium">Drop here</span>
            </div>
          </div>
        )}
      </div>

      {/* Clear button - shows when there's a preview */}
      {previewUrl && !isUploading && !disabled && (
        <button
          onClick={clearPreview}
          className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-10"
        >
          <X size={14} />
        </button>
      )}

      {/* Edit indicator badge */}
      {!disabled && !isUploading && (
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#39D177] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all duration-200 group-hover:scale-110">
          <Camera size={14} />
        </div>
      )}
    </div>
  );
}
