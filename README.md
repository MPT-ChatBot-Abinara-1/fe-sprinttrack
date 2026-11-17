# fe-sprinttrack

Frontend Web Application untuk **SprintTrack Abinara-1** (Tim Robotik Abinara ITS) menggunakan **Next.js (App Router), TypeScript, Tailwind CSS, Socket.io Client, dan Recharts**.

Template ini menyediakan tampilan antarmuka siap pakai: Papan Kanban 4 kolom real-time, filter divisi, modal detail tugas dengan alur review & log aktivitas, autentikasi terikat divisi & peran, serta visualisasi Burndown Chart sesuai **PRD Baseline Sprint 1**.

---

## 🎯 Pemetaan Komponen Frontend ke PRD

| Kebutuhan PRD | Deskripsi | Letak File Komponen / Halaman |
|---|---|---|
| **FR-01 & FR-02** | Halaman masuk & registrasi dengan input peran, divisi, serta nomor WhatsApp aktif | `src/app/login/page.tsx`<br>`src/app/register/page.tsx` |
| **FR-06 & FR-08** | Papan Kanban 4 kolom (`TODO`, `IN_PROGRESS`, `REVIEW`, `DONE`) dengan kartu berisi badge divisi & deadline | `src/app/page.tsx`<br>`src/components/kanban-column.tsx`<br>`src/components/task-card.tsx` |
| **FR-07** | Sinkronisasi posisi kartu secara real-time via WebSocket Socket.io (<= 5 detik) | `src/lib/socket.ts`<br>`src/app/page.tsx` (`task:updated` listener) |
| **FR-09 & FR-10** | Drawer/Modal detail spesifikasi teknis, pembaruan status tugas, & pencatatan log aktivitas | `src/components/task-detail-modal.tsx` |
| **FR-11** | Tindakan review Staff Ahli (Approve ke Done atau Reject dengan catatan revisi wajib) | `src/components/task-detail-modal.tsx` |
| **FR-15 & FR-16** | Visualisasi Burndown Chart real-time (Recharts) & tombol unduh laporan performa PDF | `src/app/analytics/page.tsx` |

---

## 📁 Struktur Direktori

```text
fe-sprinttrack/
├── .env.example               # Variabel environment (API backend & WebSocket URL)
├── .gitignore                 # Konfigurasi ignore git Next.js
├── package.json               # Dependensi Next.js, React, Tailwind, Recharts
├── tsconfig.json              # Konfigurasi TypeScript Next.js
├── tailwind.config.ts         # Konfigurasi Tailwind CSS
├── postcss.config.mjs         # Konfigurasi PostCSS
├── README.md                  # Panduan proyek & checklist developer
└── src/
    ├── app/
    │   ├── globals.css        # Setup Tailwind directives & default theme
    │   ├── layout.tsx         # Root layout dengan Navbar navigasi
    │   ├── page.tsx           # Dashboard utama: Papan Kanban real-time (FR-06/07/08)
    │   ├── login/page.tsx     # Form masuk pengguna (FR-01)
    │   ├── register/page.tsx  # Form daftar dengan nomor WhatsApp (FR-01/02)
    │   └── analytics/page.tsx # Burndown Chart & download laporan PDF (FR-15/16)
    ├── components/
    │   ├── navbar.tsx         # Navigasi utama
    │   ├── kanban-column.tsx  # Kolom Kanban status tugas
    │   ├── task-card.tsx      # Kartu tugas dengan indikator divisi & deadline
    │   └── task-detail-modal.tsx # Modal detail tugas, review Staff Ahli, & log aktivitas
    ├── lib/
    │   ├── api.ts             # Fetch wrapper untuk integrasi REST API backend
    │   ├── socket.ts          # Socket.io client untuk sinkronisasi real-time
    │   └── utils.ts           # Helper classNames & formatting tanggal
    └── types/
        └── sprinttrack.ts     # Definisi tipe Task, User, Division, Status, dll.
```

---

## 🚀 Cara Menjalankan

### 1. Salin Environment
```bash
cp .env.example .env.local
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Jalankan Mode Pengembangan
```bash
npm run dev
```
Aplikasi web dapat diakses di `http://localhost:3000`.
