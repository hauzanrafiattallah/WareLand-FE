# Rangkuman Alur Fitur Review WareLand

## Arsitektur Sistem

```
[Backend API] ←→ [Axios] ←→ [Service] ←→ [Hook] ←→ [Components/Pages]
```

---

## Axios (HTTP Client)

**File:** `src/lib/axios.ts`

Sama seperti fitur lain, semua request review menggunakan axios instance dengan:
- Auto-inject token `Authorization: Bearer <token>`
- Auto-logout jika respons 401

---

## Pembagian Fitur Review

| Pengguna | Fitur |
|----------|-------|
| **Public** | Lihat review properti |
| **Buyer** | Lihat, tambah, edit, hapus review sendiri |

---

## 1. LIHAT REVIEW PROPERTI (PUBLIC)

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Types** | `services/review/review.types.ts` | `PublicReview` (reviewId, rating, comment, buyerName, createdAt) |
| **Service** | `services/review/review.service.ts` | `reviewService.getByProperty()` → GET `/api/reviews/property/{propertyId}` |
| **Hook** | `hooks/review/useReview.ts` | `fetchReviewsByProperty()` |
| **Component** | `components/review/PropertyReviewSection.tsx` | Menampilkan daftar review dengan rating bintang |

### Detail Alur
1. Component mount dengan propertyId
2. Panggil `reviewService.getByProperty(propertyId)`
3. Axios kirim GET ke `/api/reviews/property/{id}`
4. Tampilkan list review dengan nama buyer, rating, dan komentar

---

## 2. LIHAT REVIEW SENDIRI (BUYER)

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Types** | `services/review/review.types.ts` | `BuyerReview` (reviewId, propertyId, propertyTitle, rating, comment) |
| **Service** | `services/review/review.service.ts` | `reviewService.getByBuyer()` → GET `/api/reviews/buyer/{buyerId}` |
| **Hook** | `hooks/review/useReview.ts` | `fetchReviewsByBuyer()` |

### Detail Alur
1. Ambil buyerId dari localStorage
2. Panggil `reviewService.getByBuyer(buyerId)`
3. Axios kirim GET ke `/api/reviews/buyer/{id}`
4. Tampilkan daftar review yang pernah dibuat buyer

---

## 3. TAMBAH REVIEW

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Payload** | `services/review/review.payload.ts` | `CreateReviewPayload` (buyerId, propertyId, rating, comment) |
| **Schema** | `services/review/review.schema.ts` | Validasi Zod: rating 1-5, comment wajib diisi |
| **Service** | `services/review/review.service.ts` | `reviewService.create()` → POST `/api/reviews` |
| **Hook** | `hooks/review/useReview.ts` | `createReview()` |
| **Component** | `PropertyReviewSection.tsx` | Form dengan input rating bintang dan textarea komentar |

### Detail Alur
1. Buyer isi rating (1-5 bintang) dan komentar
2. Validasi: komentar tidak boleh kosong
3. Panggil `reviewService.create(payload)`
4. Axios kirim POST ke `/api/reviews`
5. Refresh daftar review

---

## 4. UPDATE REVIEW

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Payload** | `services/review/review.payload.ts` | `UpdateReviewPayload` (rating, comment) |
| **Service** | `services/review/review.service.ts` | `reviewService.update()` → PUT `/api/reviews/{reviewId}?buyerId={buyerId}` |
| **Hook** | `hooks/review/useReview.ts` | `updateReview()` |
| **Component** | `PropertyReviewSection.tsx` | Form edit dengan pre-fill data review lama |

### Detail Alur
1. Buyer klik tombol "Edit Ulasan"
2. Form terisi dengan data review sebelumnya
3. Buyer edit rating/komentar
4. Panggil `reviewService.update(reviewId, buyerId, payload)`
5. Axios kirim PUT ke `/api/reviews/{id}?buyerId={buyerId}`
6. Refresh daftar review

---

## 5. HAPUS REVIEW

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Service** | `services/review/review.service.ts` | `reviewService.delete()` → DELETE `/api/reviews/{reviewId}?buyerId={buyerId}` |
| **Hook** | `hooks/review/useReview.ts` | `deleteReview()` |
| **Component** | `PropertyReviewSection.tsx` | Dialog konfirmasi hapus |

### Detail Alur
1. Buyer klik tombol "Hapus" pada review sendiri
2. Dialog konfirmasi muncul
3. Buyer konfirmasi hapus
4. Panggil `reviewService.delete(reviewId, buyerId)`
5. Axios kirim DELETE ke `/api/reviews/{id}?buyerId={buyerId}`
6. Refresh daftar review

---

## Ringkasan Endpoint API

| Fitur | Method | Endpoint |
|-------|--------|----------|
| Review properti | GET | `/api/reviews/property/{propertyId}` |
| Review buyer | GET | `/api/reviews/buyer/{buyerId}` |
| Tambah review | POST | `/api/reviews` |
| Update review | PUT | `/api/reviews/{reviewId}?buyerId={buyerId}` |
| Hapus review | DELETE | `/api/reviews/{reviewId}?buyerId={buyerId}` |

---

## Struktur File Terkait

```
src/
├── services/review/
│   ├── review.service.ts    # CRUD + fetch review
│   ├── review.types.ts      # PublicReview, BuyerReview
│   ├── review.payload.ts    # CreateReviewPayload, UpdateReviewPayload
│   ├── review.response.ts   # Response types
│   └── review.schema.ts     # Zod validation (rating 1-5, comment required)
├── hooks/review/
│   └── useReview.ts         # Hook untuk CRUD review
├── components/review/
│   └── PropertyReviewSection.tsx  # UI review (form + list + dialog hapus)
└── app/dashboard/buyer/review/
    ├── page.tsx             # Halaman list review buyer
    └── [reviewId]/          # Detail review
```

---

## Fitur UI Component

`PropertyReviewSection.tsx` memiliki 4 state utama:

| State | Deskripsi |
|-------|-----------|
| **Create Form** | Form input review baru (jika belum pernah review) |
| **Edit Form** | Form edit review dengan data pre-filled |
| **Already Reviewed** | Notifikasi sudah review + tombol edit |
| **Review List** | Daftar semua review properti dengan highlight review sendiri |
