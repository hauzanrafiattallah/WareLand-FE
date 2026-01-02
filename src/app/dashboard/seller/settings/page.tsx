/**
 * Halaman Pengaturan Seller
 * Manajemen profil toko dan pengaturan untuk akun penjual
 */

"use client";

import { ProfilePhotoUpload } from "@/components/profile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSetting } from "@/hooks/user/useSetting";
import { 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Loader2, 
  Mail, 
  Phone, 
  User, 
  Lock, 
  KeyRound,
  Shield,
  Trash2,
  Pencil,
  Save,
  X,
  Store
} from "lucide-react";

export default function SellerSettingsPage() {
  const {
    profile,
    setProfile,
    editMode,
    setEditMode,
    isLoading,
    saveProfile,
    deleteAccount,
    showOldPassword,
    setShowOldPassword,
    showNewPassword,
    setShowNewPassword,
  } = useSetting("Pengaturan toko berhasil diperbarui!", "Gagal memperbarui pengaturan toko");

  const handleImageUploaded = (url: string) => {
    setProfile({ ...profile, imageUrl: url });
  };

  // Ambil username dari localStorage
  const username = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "{}")?.username || "-"
    : "-";

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header dengan gradient */}
      <div className="bg-gradient-to-r from-[#39D177] via-[#2FAE63] to-[#1E8E4A] px-6 py-12 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Pengaturan Toko
          </h1>
          <p className="text-white/80">
            Kelola informasi toko dan keamanan akun penjual Anda
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 -mt-8 pb-12">
        {/* Kartu profil utama */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header profil */}
          <div className="p-6 lg:p-8 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar dengan upload */}
              <div className="relative">
                <ProfilePhotoUpload
                  currentImageUrl={profile.imageUrl || "/profile.png"}
                  onImageUploaded={handleImageUploaded}
                  disabled={!editMode}
                  size={100}
                />
                {editMode && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#39D177] rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <Pencil size={14} className="text-white" />
                  </div>
                )}
              </div>

              {/* Info penjual */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile.name || "Loading..."}
                </h2>
                <p className="text-gray-500 mt-1">
                  {profile.email || "Loading..."}
                </p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#E6FAEF] to-[#D6F5E7] text-[#1E8E4A] rounded-full text-sm font-medium border border-[#39D177]/20">
                    <CheckCircle2 size={14} />
                    Penjual Terverifikasi
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-full text-sm font-medium border border-amber-100">
                    <Store size={14} />
                    Penjual
                  </span>
                </div>
              </div>

              {/* Tombol edit */}
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#39D177] to-[#2FAE63] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#39D177]/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Pencil size={18} />
                  Edit Toko
                </button>
              )}
            </div>
          </div>

          {/* Form informasi */}
          <div className="p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Store className="text-[#39D177]" size={20} />
              Informasi Toko
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Nama Toko */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User size={14} className="text-gray-400" />
                  Nama Toko / Penjual
                </label>
                <input
                  type="text"
                  disabled={!editMode}
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    editMode
                      ? "border-[#39D177]/30 focus:border-[#39D177] focus:ring-4 focus:ring-[#39D177]/10 bg-white"
                      : "border-gray-100 bg-gray-50 text-gray-600"
                  } outline-none`}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail size={14} className="text-gray-400" />
                  Email
                </label>
                <input
                  type="email"
                  disabled={!editMode}
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    editMode
                      ? "border-[#39D177]/30 focus:border-[#39D177] focus:ring-4 focus:ring-[#39D177]/10 bg-white"
                      : "border-gray-100 bg-gray-50 text-gray-600"
                  } outline-none`}
                />
              </div>

              {/* Nomor Telepon */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone size={14} className="text-gray-400" />
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  disabled={!editMode}
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="08xxxxxxxxxx"
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                    editMode
                      ? "border-[#39D177]/30 focus:border-[#39D177] focus:ring-4 focus:ring-[#39D177]/10 bg-white"
                      : "border-gray-100 bg-gray-50 text-gray-600"
                  } outline-none`}
                />
              </div>

              {/* Username (readonly) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Shield size={14} className="text-gray-400" />
                  Username
                  <span className="text-xs text-gray-400">(tidak dapat diubah)</span>
                </label>
                <input
                  type="text"
                  disabled
                  value={username}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Section Password */}
            {editMode && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Lock className="text-[#39D177]" size={20} />
                  Ubah Password
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Password Lama */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Lock size={14} className="text-gray-400" />
                      Password Lama
                    </label>
                    <div className="relative">
                      <input
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Masukkan password lama"
                        value={profile.oldPassword}
                        onChange={(e) => setProfile({ ...profile, oldPassword: e.target.value })}
                        className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-[#39D177]/30 focus:border-[#39D177] focus:ring-4 focus:ring-[#39D177]/10 bg-white outline-none transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#39D177] transition-colors"
                      >
                        {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Password Baru */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <KeyRound size={14} className="text-gray-400" />
                      Password Baru
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Masukkan password baru"
                        value={profile.newPassword}
                        onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
                        className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-[#39D177]/30 focus:border-[#39D177] focus:ring-4 focus:ring-[#39D177]/10 bg-white outline-none transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#39D177] transition-colors"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tombol aksi */}
            {editMode && (
              <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3">
                <button
                  onClick={() => setEditMode(false)}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <X size={18} />
                  Batal
                </button>
                <button
                  onClick={saveProfile}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-gradient-to-r from-[#39D177] to-[#2FAE63] text-white font-semibold hover:shadow-lg hover:shadow-[#39D177]/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Simpan Perubahan
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Zona Bahaya */}
        <div className="mt-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-200/50 overflow-hidden">
          <div className="p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Trash2 className="text-red-500" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-600 mb-1">
                  Zona Berbahaya
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Menghapus akun akan menghilangkan seluruh data toko dan properti secara permanen.
                </p>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="px-6 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all duration-200 flex items-center gap-2">
                      <Trash2 size={16} />
                      Hapus Akun
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="rounded-2xl max-w-md">
                    <AlertDialogHeader className="text-center sm:text-left">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto sm:mx-0 mb-4">
                        <Trash2 className="text-red-500" size={32} />
                      </div>
                      <AlertDialogTitle className="text-xl">
                        Hapus Akun Permanen?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-500">
                        Tindakan ini tidak dapat dibatalkan. Semua data toko, properti, dan riwayat Anda akan dihapus secara permanen.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2 mt-4">
                      <AlertDialogCancel className="rounded-xl" disabled={isLoading}>
                        Batal
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={deleteAccount}
                        disabled={isLoading}
                        className="rounded-xl bg-red-500 hover:bg-red-600 text-white"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Menghapus...
                          </>
                        ) : (
                          "Ya, Hapus Akun Saya"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
