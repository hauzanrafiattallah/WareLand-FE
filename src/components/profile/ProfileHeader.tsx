/**
 * Komponen ProfileHeader
 * Header profil dengan avatar dan info pengguna
 */

import Image from "next/image";

/**
 * Menampilkan header profil dengan avatar, nama, dan status verifikasi
 */
export default function ProfileHeader() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between shadow-sm">
      {/* Info pengguna dengan avatar */}
      <div className="flex items-center gap-4">
        <Image
          src="/avatar.png"
          width={70}
          height={70}
          alt="Profile Avatar"
          className="rounded-full"
        />

        <div>
          <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
          <p className="text-gray-600 text-sm">john.doe@example.com</p>

          {/* Badge verifikasi */}
          <span className="inline-block mt-1 text-xs bg-[#39D177] text-white px-3 py-1 rounded-full">
            ✔ Verified
          </span>
        </div>
      </div>

      {/* Tombol edit profil */}
      <button className="px-5 py-2 rounded-full bg-[#39D177] text-white hover:bg-[#2FAE63] transition">
        Edit Profile
      </button>
    </div>
  );
}
