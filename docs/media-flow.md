# Rangkuman Alur Fitur Media/Upload WareLand

## Arsitektur Sistem

```
[Cloudinary API] ←→ [Axios] ←→ [Lib] ←→ [Hook] ←→ [Component]
```

---

## Cloudinary (Third-Party Storage)

**File:** `src/lib/cloudinary.ts`

**Fungsi:**

- Upload file gambar ke Cloudinary CDN
- Menggunakan **unsigned upload** dengan upload preset
- Environment variables:
  - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
  - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`

**Endpoint:** `https://api.cloudinary.com/v1_1/{cloudName}/image/upload`

---

## Alur Upload Foto Profil

### Alur Client → Cloudinary → Update Profile

| Layer         | File                                        | Fungsi                                          |
| ------------- | ------------------------------------------- | ----------------------------------------------- |
| **Types**     | `types/profile/profile.types.ts`            | Konstanta validasi file, props, return types    |
| **Lib**       | `lib/cloudinary.ts`                         | `uploadToCloudinary()` → POST ke Cloudinary API |
| **Hook**      | `hooks/profile/useProfilePhotoUpload.ts`    | Logika upload dengan drag & drop support        |
| **Component** | `components/profile/ProfilePhotoUpload.tsx` | UI upload dengan preview dan loading state      |

---

## Detail Alur Upload

### 1. Validasi File (Client-side)

```
File dipilih → Cek tipe file → Cek ukuran file
```

**Validasi:**
| Kriteria | Nilai |
|----------|-------|
| Tipe file diizinkan | `image/jpeg`, `image/png`, `image/webp` |
| Ukuran maksimal | 5MB |

### 2. Preview (Client-side)

```
File valid → FileReader → setPreviewUrl (base64)
```

### 3. Upload ke Cloudinary

```
FormData (file + preset) → POST Cloudinary → Return secure_url
```

### 4. Update Profile

```
secure_url → onImageUploaded callback → Update state parent
```

---

## Fitur Drag & Drop

Hook `useProfilePhotoUpload` mendukung:

| Event         | Handler                      |
| ------------- | ---------------------------- |
| `onDrop`      | Ambil file, validasi, upload |
| `onDragOver`  | Set visual indicator         |
| `onDragLeave` | Reset visual indicator       |
| `onClick`     | Trigger file input           |

---

## Struktur File Terkait

```
src/
├── lib/
│   └── cloudinary.ts           # Upload ke Cloudinary API
├── types/profile/
│   └── profile.types.ts        # ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE, Props
├── hooks/profile/
│   └── useProfilePhotoUpload.ts # Hook logika upload + drag & drop
└── components/profile/
    └── ProfilePhotoUpload.tsx   # UI komponen upload
```

---

## Flow Diagram

```
┌─────────────────┐
│   User Action   │
│  (Click/Drag)   │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Validate File  │
│ (Type + Size)   │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Create Preview │
│   (FileReader)  │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Upload to      │
│  Cloudinary     │──────► Return secure_url
└────────┬────────┘
         ▼
┌─────────────────┐
│  Callback to    │
│  Parent (URL)   │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Update Profile │
│  via API        │
└─────────────────┘
```

---

## Catatan Penting

1. **Tidak melalui backend** - File langsung diupload ke Cloudinary dari client
2. **Unsigned upload** - Menggunakan upload preset, tidak butuh API secret
3. **Axios standar** - Bukan axios instance karena endpoint berbeda (Cloudinary, bukan backend)
4. **URL disimpan ke profile** - Setelah upload, URL disimpan ke database via profile update API
