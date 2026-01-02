/**
 * Hook useProfilePhotoUpload
 * Mengelola logika upload foto profil termasuk drag & drop
 */

"use client";

import { uploadToCloudinary } from "@/lib/cloudinary";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  UseProfilePhotoUploadReturn,
} from "@/types/profile";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

interface UseProfilePhotoUploadOptions {
  currentImageUrl?: string;
  onImageUploaded: (url: string) => void;
  disabled?: boolean;
}

/**
 * Custom hook untuk mengelola upload foto profil
 * @param options - Opsi konfigurasi hook
 * @returns State dan handler untuk upload foto
 */
export function useProfilePhotoUpload({
  currentImageUrl,
  onImageUploaded,
  disabled = false,
}: UseProfilePhotoUploadOptions): UseProfilePhotoUploadReturn {
  // State untuk preview dan loading
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Validasi file sebelum upload
   * @param file - File yang akan divalidasi
   * @returns true jika valid
   */
  const validateFile = (file: File): boolean => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Format file tidak didukung. Gunakan JPG, PNG, atau WebP.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Ukuran file maksimal 5MB.");
      return false;
    }

    return true;
  };

  /**
   * Proses file yang dipilih untuk preview dan upload
   * @param file - File gambar yang akan diproses
   */
  const handleFile = useCallback(
    async (file: File) => {
      if (!validateFile(file)) return;

      // Buat preview gambar
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload ke Cloudinary
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

  /**
   * Handler untuk event drop file
   */
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

  /**
   * Handler untuk event drag over
   */
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

  /**
   * Handler untuk event drag leave
   */
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  /**
   * Handler untuk klik area upload
   */
  const handleClick = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  /**
   * Handler untuk perubahan input file
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // Reset input agar file yang sama bisa dipilih lagi
    e.target.value = "";
  };

  /**
   * Hapus preview dan reset gambar
   */
  const clearPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    onImageUploaded("");
  };

  // URL yang ditampilkan (preview atau current)
  const displayUrl = previewUrl || currentImageUrl;

  return {
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
  };
}
