# Product Requirements Document (PRD): Aplikasi Pomodoro ("Focus")

## 1. Tech Stack & Arsitektur Simpel
* **Frontend Framework:** React (via Vite) — Ringan, cepat, tanpa konfigurasi server yang rumit.
* **Styling:** Tailwind CSS — Styling cepat berbasis *utility classes*.
* **Icons:** Lucide React — Kumpulan ikon modern yang bersih.
* **State & Storage:** React LocalStorage / State Management lokal (tanpa backend database).
* **Deployment Target:** Vercel / Netlify (Static Deploy instan).

---

## 2. Alur Pengguna (User Flow)
1. **Splash Screen:** Layar pembuka logo 3D maskot[cite: 3] -> otomatis / klik masuk ke Onboarding.
2. **Onboarding:** 3 langkah pengenalan singkat (*Tetapkan Tujuan* -> *Fokus 25 Menit* -> *Waktunya Istirahat*)[cite: 4] -> Masuk ke **Home Screen**.
3. **Navigasi Utama (Bottom Bar - 4 Tab):**
   * **Home:** Dashboard harian & tugas cepat[cite: 2].
   * **Focus (Timer):** Layar timer utama & ambient sound[cite: 5].
   * **History (Statistik):** Grafik & riwayat sesi[cite: 8].
   * **Settings:** Pengaturan durasi & preferensi[cite: 9].

---

## 3. Rincian Fitur per Modul

### A. Splash & Onboarding
* **Splash Screen:** Logo maskot burung hantu 3D dengan teks "focus" berlatar gradasi hangat[cite: 3].
* **Onboarding:** Carousel 3 halaman pengenalan fitur dengan tombol aksi bertahap hingga *Finish Setup*[cite: 4].

### B. Home Screen (Tab 1)
* Sapaan personal pengguna (`Halo, [Nama Pengguna]!`)[cite: 2].
* Banner aksi cepat (*Mulai Sesi Fokus Baru*) untuk langsung melompat ke timer[cite: 2].
* Indikator progress harian (misal: *3/8 Sesi Selesai*) dan widget hari dalam seminggu[cite: 2].
* Ringkasan daftar tugas hari ini (*Task List Preview* dengan status centang)[cite: 2].

### C. Core Screen / Timer (Tab 2 - Focus)
* Tampilan timer hitung mundur melingkar (*circular countdown*) berukuran besar[cite: 5].
* Kontrol timer: Tombol *Start*, *Pause/Stop*, dan *Reset*[cite: 5].
* Sound board instan di bawah timer untuk menyalakan white noise (*Rain*, *Wind*, *Wave*, *Fire*)[cite: 5].

### D. Break Screen / Relax Mode (Otomatis saat Timer Selesai)
* Tampilan layar berubah otomatis ke nuansa hijau santai saat waktu istirahat tiba[cite: 6].
* Tombol *Lewati Istirahat*[cite: 6].
* Menu aktivitas relaksasi interaktif (*Minum Air*, *Peregangan*, *Tarik Napas*)[cite: 6].

### E. Task & History Screen (Tab 3 - History & Task Management)
* **Task Screen:** Filter status (*Semua*, *Belum Selesai*, *Selesai*), kategori prioritas (*Penting*, *Pending*, *Santai*), serta info target vs sesi selesai[cite: 7].
* **Empty State (Task):** Tampilan saat tugas kosong dengan ilustrasi burung hantu dan tombol tambah tugas[cite: 10].
* **History / Statistik:** Total waktu fokus kumulatif (*45 Jam 20 Menit*), grafik kurva mingguan (*Mon-Sun*), dan riwayat sesi terakhir dengan stempel waktu[cite: 8].

### F. Settings Screen (Tab 4)
* **Timer Settings:** Pengaturan durasi fokus, istirahat pendek, istirahat panjang, dan siklus istirahat[cite: 9].
* **Sound & Notification:** Pengaturan suara ambient default, toggle notifikasi selesai, dan mode *Jangan Ganggu*[cite: 9].
* **Account & Info:** Profil pengguna (*Bunda Zahra*), tema aplikasi, dan info versi (v1.0.1)[cite: 9].

---

## 4. Sistem Modal, Popup, & Notifikasi Pendukung
* **Modal Konfirmasi Berhenti:** Peringatan *"Yakin Berhenti? Menghentikan sesi akan membatalkan progress saat ini"* (Opsi: *Lanjutkan* / *Berhenti*)[cite: 11, 12].
* **Modal Tambah Tugas:** Form pop-up untuk input *Judul Tugas* & *Estimasi Sesi Pomodoro*[cite: 11, 12].
* **Modal Selesai Sesi:** Pop-up perayaan 25 menit selesai (*"Hebat! 25 Menit Fokus Selesai"*) dengan tombol *Mulai Istirahat*[cite: 11, 12].
* **Sound Layer Ambient Panel (Mixer):** Panel kustom untuk *mix & match* volume beberapa suara sekaligus (*Hujan Deras*, *Hutan Pinus*, *Ombak Pantai*, *Perapian Hangat*) lengkap dengan *slider* volume individu, *Total Volume*, dan tombol *Simpan Mix Baru*[cite: 13].
* **In-App Toast / Notice:** Banner notifikasi melayang untuk pengingat status timer (misal: *"10 Menit Tersisa"* dengan tombol *Perpanjang* / *Berhenti* atau info transisi sesi)[cite: 14].