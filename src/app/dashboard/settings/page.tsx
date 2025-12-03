"use client";

import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProfileSettings() {
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, Anytown, USA",
    password: "",
  });

  return (
    <main className="p-6 sm:p-10 max-w-3xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-1">
        User Profile & Settings
      </h1>
      <p className="text-gray-600 mb-8">
        Manage your personal information and security settings.
      </p>

      {/* HEADER PROFILE CARD */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* LEFT - Modified to stack on mobile */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto text-center sm:text-left">
          <Image
            src="/profile.png"
            width={70}
            height={70}
            alt="Avatar"
            className="rounded-full border"
          />

          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-gray-600 text-sm break-all">{profile.email}</p>

            {/* MODERN VERIFIED BADGE */}
            <span className="inline-flex items-center gap-1 mt-2 text-xs bg-[#E6FAEF] text-[#1E8E4A] px-3 py-1 rounded-full font-medium border border-[#39D177]/30">
              <CheckCircle size={14} className="text-[#39D177]" />
              Verified Account
            </span>
          </div>
        </div>

        {/* EDIT BUTTON */}
        <button
          onClick={() => setEditMode(true)}
          className="w-full sm:w-auto px-6 py-2 rounded-full bg-[#39D177] text-white hover:bg-[#2FAE63] transition"
        >
          Edit Profile
        </button>
      </div>

      {/* FORM SECTION */}
      <div className="bg-white mt-8 p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Personal Information
        </h3>

        {/* GRID FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
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

          {/* Email */}
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

          {/* Phone */}
          <div>
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

          {/* Address */}
          <div>
            <label className="text-sm text-gray-700">Address</label>
            <input
              type="text"
              disabled={!editMode}
              value={profile.address}
              onChange={(e) =>
                setProfile({ ...profile, address: e.target.value })
              }
              className={`w-full mt-2 px-4 py-3 rounded-xl border ${
                editMode
                  ? "border-[#39D177]/40 focus:border-[#39D177] outline-none"
                  : "bg-gray-100 text-gray-500 border-gray-300"
              }`}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-700">New Password</label>
            <input
              type="password"
              disabled={!editMode}
              placeholder="••••••••"
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
              className={`w-full mt-2 px-4 py-3 rounded-xl border ${
                editMode
                  ? "border-[#39D177]/40 focus:border-[#39D177] outline-none"
                  : "bg-gray-100 text-gray-500 border-gray-300"
              }`}
            />
          </div>
        </div>

        {/* BUTTONS */}
        {editMode && (
          <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => setEditMode(false)}
              className="w-full sm:w-auto px-6 py-3 sm:py-2 rounded-xl sm:rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 font-medium transition"
            >
              Cancel
            </button>

            <button className="w-full sm:w-auto px-8 py-3 sm:py-2 rounded-xl sm:rounded-full bg-[#39D177] text-white hover:bg-[#2FAE63] font-medium transition shadow-sm hover:shadow">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
