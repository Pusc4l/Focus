# RULES.md (Project Constraints & Coding Guidelines)

## 1. Tech Stack & Architecture Rules
- **Stack Mandatori:** Gunakan React (via Vite), Tailwind CSS, Lucide React, dan state management lokal berbasis `localStorage`. Jangan gunakan Next.js atau backend server eksternal agar proses *deployment* statis tetap praktis.
- **Modularitas File:** Pecah komponen kode menjadi file-file kecil yang terpisah dan terorganisir (misal: `Navbar.jsx`, `Timer.jsx`, `TaskList.jsx`, `Statistics.jsx`, `Settings.jsx`, dan `Modals.jsx`). Jaga agar panjang baris per file tetap ringkas (di bawah 200 baris).

## 2. UI/UX & Desain Aturan
- **Desain Responsif Mobile-First:** Rancang tata letak aplikasi selayaknya container aplikasi seluler yang bersih, menggunakan sudut elemen melengkung (*rounded corners*) dan efek *glassmorphism* tipis.
- **Konsistensi Tema Warna:** Terapkan palet warna gradasi hangat (*warm gradient* seperti oranye, peach, krem, dan hijau teduh) sesuai dengan spesifikasi desain.

## 3. Strategi Eksekusi Bertahap (Step-by-Step Build)
* **Fase 1:** Setup project Vite + Tailwind, konfigurasi dasar, serta kerangka layout utama (Splash Screen, Onboarding, dan Bottom Navigation Bar).
* **Fase 2:** Implementasi logika Core Screen (Timer Pomodoro fungsional dengan fitur *Play, Pause, Reset*) dan Break Screen otomatis.
* **Fase 3:** Integrasi modul Task Management, filter status tugas, dan penyimpanan data via `localStorage`.
* **Fase 4:** Pembuatan grafik statistik/history, panel pengaturan (*Settings*), serta modul interaktif pendukung seperti *Sound Mixer* ambient dan pop-up modal.