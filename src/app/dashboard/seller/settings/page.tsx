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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSetting } from "@/hooks/useSetting";
import { CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";

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
  } = useSetting(
    "Pengaturan toko berhasil diperbarui!",
    "Gagal memperbarui pengaturan toko"
  );

  return (
    <main className="p-6 sm:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-900 mb-1">
        Shop Settings
      </h1>
      <p className="text-gray-600 mb-8">
        Manage your shop information and security settings.
      </p>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto text-center sm:text-left">
          <Image
            src="/profile.png"
            width={70}
            height={70}
            alt="Avatar"
            className="rounded-full border"
          />

          <div>
            <h2 className="text-xl font-semibold">
              {profile.name || "Loading..."}
            </h2>
            <p className="text-gray-600 text-sm break-all">
              {profile.email || "Loading..."}
            </p>

            <span className="inline-flex items-center gap-1 mt-2 text-xs bg-[#E6FAEF] text-[#1E8E4A] px-3 py-1 rounded-full font-medium border border-[#39D177]/30">
              <CheckCircle size={14} className="text-[#39D177]" />
              Verified Seller
            </span>
          </div>
        </div>

        <button
          onClick={() => setEditMode(true)}
          className="w-full sm:w-auto px-6 py-2 rounded-full bg-[#39D177] text-white hover:bg-[#2FAE63] transition"
        >
          Edit Shop
        </button>
      </div>

      <div className="bg-white mt-8 p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Shop Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-700">Nama Toko / Penjual</label>
            <input
              type="text"
              disabled={!editMode}
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className={`w-full mt-2 px-4 py-3 rounded-xl border ${
                editMode
                  ? "border-[#39D177]/40 focus:border-[#39D177] outline-none"
                  : "bg-gray-100 text-gray-500 border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              disabled={!editMode}
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className={`w-full mt-2 px-4 py-3 rounded-xl border ${
                editMode
                  ? "border-[#39D177]/40 focus:border-[#39D177] outline-none"
                  : "bg-gray-100 text-gray-500 border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Phone Number</label>
            <input
              type="text"
              disabled={!editMode}
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              placeholder="08xxxxxxxxxx"
              className={`w-full mt-2 px-4 py-3 rounded-xl border ${
                editMode
                  ? "border-[#39D177]/40 focus:border-[#39D177] outline-none"
                  : "bg-gray-100 text-gray-500 border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Username</label>
            <input
              type="text"
              disabled
              value={
                typeof window !== "undefined"
                  ? JSON.parse(localStorage.getItem("user") || "{}")?.username || "-"
                  : "-"
              }
              className="w-full mt-2 px-4 py-3 rounded-xl border bg-gray-100 text-gray-500 border-gray-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Old Password</label>
            <div className="relative mt-2">
              <input
                type={showOldPassword ? "text" : "password"}
                disabled={!editMode}
                placeholder="••••••••"
                value={profile.oldPassword}
                onChange={(e) =>
                  setProfile({ ...profile, oldPassword: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl border pr-10 ${
                  editMode
                    ? "border-[#39D177]/40 focus:border-[#39D177] outline-none"
                    : "bg-gray-100 text-gray-500 border-gray-300"
                }`}
              />
              {editMode && (
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#39D177]"
                >
                  {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700">New Password</label>
            <div className="relative mt-2">
              <input
                type={showNewPassword ? "text" : "password"}
                disabled={!editMode}
                placeholder="••••••••"
                value={profile.newPassword}
                onChange={(e) =>
                  setProfile({ ...profile, newPassword: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl border pr-10 ${
                  editMode
                    ? "border-[#39D177]/40 focus:border-[#39D177] outline-none"
                    : "bg-gray-100 text-gray-500 border-gray-300"
                }`}
              />
              {editMode && (
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#39D177]"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {editMode && (
          <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => setEditMode(false)}
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 sm:py-2 rounded-xl sm:rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={saveProfile}
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-3 sm:py-2 rounded-xl sm:rounded-full bg-[#39D177] text-white hover:bg-[#2FAE63] font-medium transition shadow-sm hover:shadow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        )}
      </div>

      <div className="bg-red-50/40 mt-8 p-6 rounded-xl border border-red-200 shadow-sm">
        <h3 className="text-lg font-semibold text-red-500 mb-2">Danger Zone</h3>

        <p className="text-sm text-gray-600 mb-4">
          Menghapus akun akan menghilangkan seluruh data dan tidak dapat
          dibatalkan.
        </p>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="px-6 py-3 cursor-pointer rounded-xl sm:rounded-full bg-red-500 text-white hover:bg-red-600 transition w-full sm:w-auto">
              Delete Account
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-500">
                Hapus Akun Permanen?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                Tindakan ini tidak dapat dibatalkan. Semua data akun, profil,
                dan akses Anda akan dihapus secara permanen dari sistem.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-3">
              <AlertDialogCancel
                className="rounded-full cursor-pointer"
                disabled={isLoading}
              >
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={deleteAccount}
                disabled={isLoading}
                className="rounded-full cursor-pointer bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete My Account"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
