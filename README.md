# fe-sprinttrack

Aplikasi web frontend untuk sistem manajemen sprint **SprintTrack Abinara-1** (Tim Robotik Abinara ITS). Repositori ini dibangun menggunakan Next.js (App Router), TypeScript, Tailwind CSS, Socket.io Client, dan Recharts, menyediakan kerangka antarmuka papan Kanban real-time, filter divisi, modal detail tugas beserta alur review dan log aktivitas, halaman autentikasi, serta visualisasi analitik sprint.

## Prasyarat

- Node.js v18 atau lebih baru
- npm v9 atau lebih baru

## Teknologi Utama

- Next.js 15 (App Router) & React 19
- TypeScript
- Tailwind CSS
- Socket.io Client
- Recharts & Lucide React

## Instalasi dan Menjalankan Proyek

1. Clone repositori ini:

   ```bash
   git clone https://github.com/MPT-ChatBot-Abinara-1/fe-sprinttrack.git
   cd fe-sprinttrack
   ```

2. Pasang seluruh dependensi:

   ```bash
   npm install
   ```

3. Salin file konfigurasi environment dan sesuaikan URL layanan backend:

   ```bash
   cp .env.example .env.local
   ```

   Untuk Windows PowerShell:

   ```powershell
   Copy-Item .env.example .env.local
   ```

   Pastikan `NEXT_PUBLIC_API_URL` dan `NEXT_PUBLIC_WS_URL` pada `.env.local` mengarah ke server `be-sprinttrack` yang sedang berjalan.

4. Jalankan aplikasi dalam mode pengembangan:

   ```bash
   npm run dev
   ```

   Buka `http://localhost:3000` di browser untuk mengakses aplikasi.

5. Untuk membangun dan menjalankan versi produksi:

   ```bash
   npm run build
   npm run start
   ```

## Struktur Proyek

```text
fe-sprinttrack/
├── .env.example                  # Contoh konfigurasi variabel environment
├── .gitignore                    # Daftar file dan direktori yang diabaikan Git
├── package.json                  # Metadata proyek, dependensi, dan skrip npm
├── tsconfig.json                 # Konfigurasi compiler TypeScript
├── tailwind.config.ts            # Konfigurasi Tailwind CSS
├── postcss.config.mjs            # Konfigurasi PostCSS
├── README.md                     # Dokumentasi proyek
└── src/
    ├── app/
    │   ├── globals.css           # Konfigurasi dasar styling dan directive Tailwind
    │   ├── layout.tsx            # Root layout aplikasi beserta navbar
    │   ├── page.tsx              # Halaman utama papan Kanban dan filter divisi
    │   ├── login/
    │   │   └── page.tsx          # Halaman masuk pengguna
    │   ├── register/
    │   │   └── page.tsx          # Halaman pendaftaran pengguna dan nomor WhatsApp
    │   ├── analytics/
    │   │   └── page.tsx          # Halaman analitik Burndown Chart dan ekspor laporan
    │   └── not-found.tsx         # Halaman 404 ketika rute tidak ditemukan
    ├── components/
    │   ├── navbar.tsx            # Navigasi utama aplikasi
    │   ├── kanban-column.tsx     # Komponen kolom status papan Kanban
    │   ├── task-card.tsx         # Komponen kartu tugas pada kolom Kanban
    │   └── task-detail-modal.tsx # Modal detail tugas, alur review, dan log aktivitas
    ├── lib/
    │   ├── api.ts                # Helper HTTP fetch untuk komunikasi ke REST API backend
    │   ├── socket.ts             # Inisialisasi koneksi WebSocket Socket.io Client
    │   └── utils.ts              # Fungsi utilitas penggabungan class CSS dan format tanggal
    └── types/
        └── sprinttrack.ts        # Definisi tipe TypeScript untuk data domain aplikasi
```

## Skrip Tersedia

| Perintah | Deskripsi |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan Next.js |
| `npm run build` | Membangun bundle aplikasi siap produksi |
| `npm run start` | Menjalankan hasil build produksi Next.js |
| `npm run typecheck` | Memeriksa validitas tipe TypeScript tanpa menghasilkan file output |
| `npm run lint` | Menjalankan linter Next.js untuk pemeriksaan kode |
