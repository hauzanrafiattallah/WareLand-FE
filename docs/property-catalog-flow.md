# Rangkuman Alur Fitur Catalog WareLand

## Arsitektur Sistem

```
[Backend API] ←→ [Axios] ←→ [Services] ←→ [Hooks] ←→ [Components/Pages]
```

---

## Axios (HTTP Client)

**File:** `src/lib/axios.ts`

Sama seperti autentikasi, semua request catalog menggunakan axios instance dengan:
- Auto-inject token `Authorization: Bearer <token>`
- Auto-logout jika respons 401

---

## Pembagian Fitur Catalog

| Pengguna | Fitur | Service |
|----------|-------|---------|
| **Buyer** | Lihat, cari properti | `CatalogPropertyService` |
| **Seller** | CRUD properti sendiri | `PropertyService` |

---

## 1. BUYER - LIHAT SEMUA PROPERTI

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Types** | `services/property/catalog.property.service.ts` | `CatalogProperty`, `Seller` |
| **Service** | `services/property/catalog.property.service.ts` | `CatalogPropertyService.getAll()` → GET `/api/catalog/properties` |
| **Hook** | `hooks/property/useCatalogProperties.ts` | `useCatalogProperties()` → `fetchProperties()` |
| **Component** | `components/property/CatalogPropertyCard.tsx` | Kartu properti dengan wishlist |

### Detail Alur
1. Hook panggil `CatalogPropertyService.getAll()`
2. Axios kirim GET ke `/api/catalog/properties`
3. Respons: array properti dengan info seller
4. Data ditampilkan dalam `CatalogPropertyCard`

---

## 2. BUYER - CARI PROPERTI

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Payload** | `services/catalog/property.payload.ts` | `SearchPropertiesPayload` (keyword, minPrice, maxPrice) |
| **Service** | `services/property/catalog.property.service.ts` | `CatalogPropertyService.search()` → GET `/api/catalog/properties/search` |
| **Hook** | `hooks/property/useCatalogProperties.ts` | `setSearchKeyword()` dengan debounce 500ms |
| **Component** | `components/property/PropertyFilter.tsx` | Form filter (keyword, lokasi, tipe, harga) |

### Detail Alur
1. User ketik keyword di search bar
2. Hook debounce 500ms sebelum panggil API
3. Axios kirim GET ke `/api/catalog/properties/search?keyword=...`
4. Update state properties dengan hasil pencarian

---

## 3. BUYER - LIHAT DETAIL PROPERTI

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Service** | `services/property/catalog.property.service.ts` | `CatalogPropertyService.getById()` → GET `/api/catalog/properties/{id}` |
| **Component** | `CatalogPropertyCard.tsx` | Link ke `/dashboard/buyer/properties/{id}` |

### Detail Alur
1. User klik kartu properti
2. Navigate ke halaman detail
3. Panggil `getById(propertyId)`
4. Tampilkan detail lengkap properti + info seller

---

## 4. SELLER - LIHAT PROPERTI SENDIRI

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Types** | `services/property/property.types.ts` | `Property`, `Seller`, `ApiResponse` |
| **Service** | `services/property/property.service.ts` | `PropertyService.findAll()` → GET `/api/seller/properties` |
| **Hook** | `hooks/property/useProperty.ts` | `useProperty()` → `fetchProperties()` |

### Detail Alur
1. Cek user dari localStorage (harus role SELLER)
2. Hook panggil `PropertyService.findAll()`
3. Axios kirim GET ke `/api/seller/properties`
4. Tampilkan daftar properti milik seller

---

## 5. SELLER - TAMBAH PROPERTI

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Payload** | `services/property/property.payload.ts` | `CreatePropertyPayload` |
| **Schema** | `services/property/property.schema.ts` | Validasi Zod: address, price, description, imageUrl |
| **Service** | `services/property/property.service.ts` | `PropertyService.create()` → POST `/api/seller/properties` |
| **Hook** | `hooks/property/useProperty.ts` | `createProperty()` |

### Detail Alur
1. Seller isi form tambah properti
2. Zod validasi input
3. Hook panggil `PropertyService.create()`
4. Axios kirim POST ke `/api/seller/properties`
5. Refresh daftar properti

---

## 6. SELLER - UPDATE PROPERTI

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Payload** | `services/property/property.payload.ts` | `UpdatePropertyPayload` (sama dengan create) |
| **Service** | `services/property/property.service.ts` | `PropertyService.update()` → PUT `/api/seller/properties/{id}` |
| **Hook** | `hooks/property/useProperty.ts` | `updateProperty()` |

### Detail Alur
1. Seller edit data properti
2. Hook panggil `PropertyService.update(propertyId, payload)`
3. Axios kirim PUT ke `/api/seller/properties/{id}`
4. Refresh daftar properti

---

## 7. SELLER - HAPUS PROPERTI

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Service** | `services/property/property.service.ts` | `PropertyService.delete()` → DELETE `/api/seller/properties/{id}` |
| **Hook** | `hooks/property/useProperty.ts` | `deleteProperty()` |

### Detail Alur
1. Seller konfirmasi hapus properti
2. Hook panggil `PropertyService.delete(propertyId)`
3. Axios kirim DELETE ke `/api/seller/properties/{id}`
4. Refresh daftar properti

---

## Ringkasan Endpoint API

### Buyer (Catalog)
| Fitur | Method | Endpoint |
|-------|--------|----------|
| Semua properti | GET | `/api/catalog/properties` |
| Cari properti | GET | `/api/catalog/properties/search` |
| Detail properti | GET | `/api/catalog/properties/{id}` |

### Seller (CRUD)
| Fitur | Method | Endpoint |
|-------|--------|----------|
| Properti sendiri | GET | `/api/seller/properties` |
| Tambah | POST | `/api/seller/properties` |
| Update | PUT | `/api/seller/properties/{id}` |
| Hapus | DELETE | `/api/seller/properties/{id}` |

---

## Struktur File Terkait

```
src/
├── services/
│   ├── catalog/
│   │   ├── property.service.ts      # getProperties, searchProperties, getPropertyDetail
│   │   ├── property.payload.ts      # SearchPropertiesPayload
│   │   └── property.response.ts     # PropertyListResponse, PropertyDetailResponse
│   └── property/
│       ├── catalog.property.service.ts  # CatalogPropertyService (buyer)
│       ├── property.service.ts          # PropertyService (seller CRUD)
│       ├── property.payload.ts          # CreatePropertyPayload, UpdatePropertyPayload
│       ├── property.schema.ts           # Zod validation schema
│       └── property.types.ts            # Property, Seller, ApiResponse
├── hooks/property/
│   ├── useCatalogProperties.ts   # Hook buyer (fetch, search dengan debounce)
│   └── useProperty.ts            # Hook seller (CRUD properti)
└── components/property/
    ├── CatalogPropertyCard.tsx   # Kartu properti dengan wishlist
    └── PropertyFilter.tsx        # Form filter pencarian
```
