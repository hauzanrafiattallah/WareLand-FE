"use client";

import { UpdateUserPayload, userService } from "@/services/user/user.service";
import { AxiosError } from "axios";
import { CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BuyerProfileSettings() {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
      fetchUserProfile();
    } else {
      router.push("/login");
    }
  }, [router]);

  const fetchUserProfile = async () => {
    try {
      const response = await userService.getMe();
      if (response.success || response.data) {
        setProfile((prev) => ({
          ...prev,
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.phoneNumber || "",
        }));
      }
    } catch (error) {
      toast.error("Gagal memuat data profil");
    }
  };

  const handleSave = async () => {
    if (!userId) return;
    setIsLoading(true);

    try {
      const payload: UpdateUserPayload = {
        name: profile.name,
        email: profile.email,
        phoneNumber: profile.phone,
      };

      if (profile.newPassword) {
        payload.oldPassword = profile.oldPassword;
        payload.newPassword = profile.newPassword;
      }

      const response = await userService.updateProfile(userId, payload);

      if (response.success) {
        toast.success("Profil berhasil diperbarui!");
        setEditMode(false);

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const updatedUser = {
            ...parsedUser,
            name: profile.name,
            email: profile.email,
            phoneNumber: profile.phone,
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }

        setProfile((prev) => ({
          ...prev,
          oldPassword: "",
          newPassword: "",
        }));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Gagal memperbarui profil"
        );
      } else {
        toast.error("Terjadi kesalahan sistem");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-6 sm:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-900 mb-1">
        User Profile & Settings
      </h1>
      <p className="text-gray-600 mb-8">
        Manage your personal information and security settings.
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
              Verified Account
            </span>
          </div>
        </div>

        <button
          onClick={() => setEditMode(true)}
          className="w-full sm:w-auto px-6 py-2 rounded-full bg-[#39D177] text-white hover:bg-[#2FAE63] transition"
        >
          Edit Profile
        </button>
      </div>

      <div className="bg-white mt-8 p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-700">Full Name</label>
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

          <div className="md:col-span-2">
            <label className="text-sm text-gray-700">Phone Number</label>
            <input
              type="text"
              disabled={!editMode}
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              className={`w-full mt-2 px-4 py-3 rounded-xl border ${
                editMode
                  ? "border-[#39D177]/40 focus:border-[#39D177] outline-none"
                  : "bg-gray-100 text-gray-500 border-gray-300"
              }`}
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
              onClick={handleSave}
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
    </main>
  );
}
