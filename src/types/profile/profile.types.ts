/**
 * Tipe Profile Photo Upload
 * Definisi tipe untuk komponen upload foto profil
 */

/** Tipe file gambar yang diizinkan */
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Ukuran maksimal file (5MB) */
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

/** Props untuk komponen ProfilePhotoUpload */
export interface ProfilePhotoUploadProps {
  currentImageUrl?: string;
  onImageUploaded: (url: string) => void;
  disabled?: boolean;
  size?: number;
}

/** Return type dari hook useProfilePhotoUpload */
export interface UseProfilePhotoUploadReturn {
  previewUrl: string | null;
  isUploading: boolean;
  isDragOver: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  displayUrl: string | undefined;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleClick: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearPreview: (e: React.MouseEvent) => void;
}
