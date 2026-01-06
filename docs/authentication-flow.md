# Rangkuman Alur Fitur Autentikasi WareLand

## Arsitektur Sistem

```
[Backend API] ←→ [Axios] ←→ [Services] ←→ [Hooks] ←→ [Pages/Components]
```

---

## Axios (HTTP Client)

**File:** `src/lib/axios.ts`

**Fungsi:**
- HTTP client untuk komunikasi dengan backend API
- Base URL dari environment variable `NEXT_PUBLIC_API_BASE_URL`
- **Request Interceptor:** Otomatis menambahkan `Authorization: Bearer <token>` dari localStorage
- **Response Interceptor:** Hapus token dari localStorage jika respons 401 (unauthorized)

---

## 1. LOGIN

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Types** | `types/auth/auth.types.ts` | `LoginPayload`, `LoginFormData` |
| **Schema** | `services/auth/auth.schema.ts` | Validasi Zod: username & password wajib diisi |
| **Service** | `services/auth/auth.service.ts` | `authService.login()` → POST `/api/auth/login` |
| **Hook** | `hooks/auth/useLogin.ts` | `useLoginSubmit()` → panggil service, simpan token ke localStorage, redirect berdasarkan role |
| **Page** | `app/(auth)/login/page.tsx` | Form dengan react-hook-form + Zod resolver |

### Detail Alur
1. User submit form login
2. Zod validasi input
3. Hook panggil `authService.login()`
4. Axios kirim POST ke `/api/auth/login`
5. Respons: simpan `accessToken` dan `user` ke localStorage
6. Redirect ke dashboard sesuai role (BUYER/SELLER/ADMIN)

---

## 2. REGISTER

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Types** | `types/auth/auth.types.ts` | `RegisterApiPayload`, `RegisterFormData`, `RegisterRole` |
| **Schema** | `services/auth/auth.schema.ts` | Validasi: username, name, email, phoneNumber, password, confirmPassword, role |
| **Service** | `services/auth/auth.service.ts` | `authService.register()` → POST `/api/auth/register` |
| **Hook** | `hooks/auth/useRegister.ts` | `useRegisterSubmit()` → konversi role (pembeli→BUYER, penjual→SELLER), panggil service |
| **Page** | `app/(auth)/register/page.tsx` | Form dengan pilihan role (Pembeli/Penjual) |

### Detail Alur
1. User pilih role dan isi form
2. Zod validasi (termasuk password match)
3. Hook konversi role ke format API
4. Axios kirim POST ke `/api/auth/register`
5. Sukses: redirect ke halaman login

---

## 3. LOGOUT

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Service** | `services/auth/auth.service.ts` | `authService.logout()` → POST `/api/auth/logout` |
| **Hook** | `hooks/auth/useLogout.ts` | `useLogout()` → panggil API, hapus localStorage, redirect ke login |

### Detail Alur
1. User klik logout
2. Hook panggil `authService.logout()`
3. Axios kirim POST ke `/api/auth/logout`
4. Hapus `accessToken` dan `user` dari localStorage
5. Hapus header Authorization dari axios
6. Redirect ke `/login`

---

## 4. UPDATE USER

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Types** | `types/user/user.types.ts` | `UpdateUserPayload`, `UserProfile` |
| **Service** | `services/user/user.service.ts` | `userService.updateProfile()` → PUT `/api/users/{id}` |
| **Hook** | `hooks/user/useSetting.ts` | `useSetting()` → `saveProfile()` untuk update profil |

### Detail Alur
1. Hook ambil user ID dari localStorage
2. Panggil `userService.getMe()` untuk data profil awal
3. User edit profil (name, email, phone, password, imageUrl)
4. `saveProfile()` panggil `userService.updateProfile()`
5. Axios kirim PUT ke `/api/users/{id}`
6. Update localStorage dengan data baru

---

## 5. DELETE USER

### Alur Server → Client

| Layer | File | Fungsi |
|-------|------|--------|
| **Service** | `services/user/user.service.ts` | `userService.deleteAccount()` → DELETE `/api/users/{id}` |
| **Hook** | `hooks/user/useSetting.ts` | `useSetting()` → `deleteAccount()` untuk hapus akun |

### Detail Alur
1. User konfirmasi hapus akun
2. Hook panggil `userService.deleteAccount()`
3. Axios kirim DELETE ke `/api/users/{id}`
4. Hapus `accessToken` dan `user` dari localStorage
5. Redirect ke `/login`

---

## Ringkasan Endpoint API

| Fitur | Method | Endpoint |
|-------|--------|----------|
| Login | POST | `/api/auth/login` |
| Register | POST | `/api/auth/register` |
| Logout | POST | `/api/auth/logout` |
| Get Profile | GET | `/api/auth/me` |
| Update User | PUT | `/api/users/{id}` |
| Delete User | DELETE | `/api/users/{id}` |

---

## Struktur File Terkait

```
src/
├── lib/
│   └── axios.ts              # Axios instance + interceptors
│   └── auth.ts               # Utility (normalizeRole, getDashboardPathByRole)
├── types/
│   ├── auth/
│   │   └── auth.types.ts     # Tipe autentikasi
│   └── user/
│       └── user.types.ts     # Tipe user
├── services/
│   ├── auth/
│   │   ├── auth.service.ts   # login, register, logout
│   │   └── auth.schema.ts    # Zod schema validasi
│   └── user/
│       └── user.service.ts   # getMe, updateProfile, deleteAccount
├── hooks/
│   ├── auth/
│   │   ├── useLogin.ts       # Hook login
│   │   ├── useLogout.ts      # Hook logout
│   │   └── useRegister.ts    # Hook register
│   └── user/
│       └── useSetting.ts     # Hook update & delete user
└── app/(auth)/
    ├── login/page.tsx        # Halaman login
    └── register/page.tsx     # Halaman register
```
