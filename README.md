# focus — Aplikasi Pomodoro (Revisi Besar v1.0.1)

Aplikasi Pomodoro mobile-first — **React (Vite) + Tailwind CSS + Lucide React**,
100% berjalan di sisi klien dengan `localStorage`, tanpa backend.

## Menjalankan

```bash
npm install
npm run dev       # development server
npm run build     # build produksi ke folder dist/
npm run preview   # preview hasil build
```

## Struktur Proyek

```
public/sounds/               # rain.mp3, forest.mp3, wave.mp3, fire.mp3 (ambient loop)
src/
  main.jsx                   # entry point
  App.jsx                    # alur global: Splash → Onboarding → Input Profil → MainApp
  MainApp.jsx                # shell per-akun: timer, tasks, audio, navigasi 4 tab
  index.css                  # Tailwind layers + keyframes animasi (fadeInUp, float, gradientShift)
  hooks/
    useLocalStorage.js       # localStorage wrapper aman (parsing + fallback)
    usePomodoroTimer.js      # state machine timer: focus → short/long break
    useAccounts.js           # bookkeeping multi-akun + auto-purge cache basi
    useAccountData.js        # data per-akun (tasks/settings/sessions) dalam satu key
    useWeeklyStats.js        # progres harian & grafik mingguan dihitung dari log sesi
    useAmbientAudio.js       # engine audio loop lokal, master volume independen
  data/
    mascots.jsx               # ilustrasi maskot (owl, fox, sloth) sebagai SVG inline
  components/
    Navbar, Timer, TaskList, Statistics, Settings, Modals,
    SoundMixerPanel, AccountSwitcher
  screens/
    Splash, Onboarding, ProfileInput, Home, Focus,
    TaskScreen, History, SettingsScreen
```

## Ringkasan Revisi v1.0.1

1. **Onboarding & Profil** — setelah Splash + Onboarding, wajib mengisi Nama +
   kategori (Self Learner/Mahasiswa/Siswa/Lainnya) tanpa email/password. Nama
   tampil dinamis di Home & Settings.
2. **Home tanpa dummy data** — akun baru mulai bersih. Progress harian & grafik
   mingguan dihitung langsung dari log sesi bertanggal, jadi otomatis "reset"
   setiap hari berganti tanpa counter yang bisa basi. Visual dipercantik dengan
   gradasi hangat beranimasi (`bg-animated-warm`) dan micro-animation
   (`animate-fadeInUp`, `animate-float`).
3. **Core Timer** — font timer diperbesar (~4.25rem), transisi warna halus saat
   masuk mode istirahat, tombol dengan efek `active:scale-95`.
4. **Task Management** — empty state asli untuk akun baru, tombol edit
   (pensil) dan hapus (sampah) di tiap kartu tugas dengan konfirmasi hapus.
5. **Settings & Audio Mixer**
   - Kontras teks judul section diperkuat (`text-ink/80` + `drop-shadow`).
   - 4 suara ambient memutar file lokal `/public/sounds/*.mp3` lewat
     `HTML5 Audio` dengan `loop = true` — *seamless looping* selama dipilih.
   - **Master Volume independen**: volume akhir = `(level track/100) ×
     (master/100)` — track 100% + master 10% tetap hanya berbunyi 10%.
   - "Profil Saya" membuka bottom-sheet daftar akun tersimpan + tombol
     **Tambah User** yang mengulang alur Splash → Onboarding → Input Profil,
     data akun lama tidak tertimpa (setiap akun punya key `localStorage` sendiri).
   - Tentang Kami: versi **1.0.1**, © **Pascal**.
6. **Performa & Cache** — setiap akun disimpan di
   `focus.account.<id>.data` (tasks+settings+sessions dalam satu key).
   Saat aplikasi dimuat, `purgeStaleCache()` otomatis membuang key versi lama
   dan data akun yang sudah tidak ada, serta riwayat sesi dibatasi ke 200
   entri terbaru per akun agar tetap ringan.

## Catatan
- Audio ambient akan mulai diputar begitu track dipilih (di Sound Board layar
  Focus atau panel Mixer di Settings) — beberapa track bisa aktif bersamaan.
- Menekan **Stop** pada sesi fokus akan menghentikan semua ambient sound juga.

## Revisi Terakhir (v1.0.1)

1. **Input Profil** — placeholder nama kini "Masukkan nama".
2. **Tugas → Timer → History** — ketuk tugas (Home atau tab Focus) dan timer langsung berjalan untuk tugas itu.
   Sesi selesai *atau* dihentikan di tengah jalan (tercatat minimal 1 menit) → durasi masuk History
   (grafik, total, riwayat) dan tugas otomatis ditandai selesai. Tanggal harian memakai zona waktu lokal.
3. **Toggle & DND** — baris switch dipisah dari baris tombol (tidak lagi bersarang) dan tiap switch punya label sendiri.
   DND aktif selama sesi fokus berjalan: tab lain dikunci, pengingat "10 menit tersisa" ditahan, dan muncul lencana
   "Jangan Ganggu aktif". (Halaman web tidak bisa menyalakan DND tingkat sistem operasi.)
4. **Tema** — Gradasi Hangat, Pastel Sejuk, Pastel Sakura (CSS variables di `index.css`) dengan overlay loading
   singkat saat berganti tema; berlaku di semua layar dan tersimpan per akun.
5. **Tentang Kami** — halaman baru (logo burung 3D di `public/logo-bird.png`, deskripsi, Instagram/GitHub/Email,
   Kebijakan Privasi, Syarat & Ketentuan, © 2026 Pascal). Teks ada di `src/data/legal.js`.
6. **Audio ambient** — dimuat saat tombol ditekan, `loop = true`; nama file asli maupun alias
   (`rain.mp3`, dst.) dicoba otomatis dan error tampil di UI. Volume akhir = level track × master.

## PWA (Install ke Home Screen)

- `public/manifest.json` — nama "Focus - Pomodoro & Productivity", short name "Focus", `display: standalone`,
  ikon `/logo-bird.png` + `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` (dibuat dari logo burung).
- `public/sw.js` — service worker minimal (app shell bisa dibuka offline; file audio tidak di-cache).
  Didaftarkan hanya pada build produksi di `src/main.jsx`.
- `src/hooks/usePwaInstall.js` — menangkap event `beforeinstallprompt` sejak aplikasi dimuat.
- Settings → Akun & Lainnya → **Install Aplikasi (PWA)**: memanggil dialog instalasi native; bila belum tersedia
  (mis. iOS Safari) tampil panduan manual.
- Syarat: harus dibuka lewat **HTTPS** (Vercel/Netlify) atau `localhost`. Uji dengan `npm run build && npm run preview`.

## Revisi Major: Floating Player, Alarm, Motion & DND Nyata

1. **Floating Mini Player (ala Spotify)** — `src/components/FloatingPlayer.jsx`.
   Muncul otomatis di atas bottom-nav setiap kali ada sesi berjalan (fokus **atau** istirahat) dan kamu
   sedang tidak berada di layar timer utama (mis. sambil melihat Home/History/Settings). Berisi info sesi,
   Play/Pause, Mute/Unmute ambience, Skip Sesi, dan tap di mana saja pada widget untuk kembali ke layar timer.
   Berganti warna & label otomatis jadi "Waktu Istirahat ☕" saat masuk fase istirahat.
   Timer berbasis timestamp (`Date.now()`), jadi tetap akurat walau tab browser di-throttle; audio ambient
   (elemen `<audio loop>`) juga terus berbunyi di background selama tab tidak ditutup.
2. **Alarm Selesai (Web Audio API) & Getar** — `src/utils/alarm.js`. Lonceng lembut disintesis langsung di
   browser (tanpa file audio) plus `navigator.vibrate(...)`, terpicu tepat saat waktu Fokus **atau** Istirahat
   habis secara alami (bukan saat Stop/Skip manual). Nada Fokus naik (ceria), nada Istirahat turun (lembut).
   Audio context di-*resume* pada sentuhan pertama (`unlockAudio()`) supaya kebijakan browser tidak memblokirnya.
3. **Kontras & Maskot Animasi** — `components/Timer.jsx` kini punya *glass backdrop* (lingkaran putih
   tembus pandang) di belakang angka timer, jadi angka tetap tajam terbaca di ketiga tema (Hangat/Sejuk/Sakura)
   apa pun warna gradasinya — sudah diverifikasi lewat screenshot otomatis tiap tema. Maskot (`data/mascots.jsx`)
   kini berkedip, "bernapas", mengepakkan sayap, dan mengeluarkan "Z" melayang lewat kelas CSS di `index.css`
   (menghormati `prefers-reduced-motion`). Ada owl kecil yang mengintip di pojok ring timer, cangkir kopi
   beruap di layar istirahat, dan partikel sparkle halus di pojok-pojok layar (`AmbientSparkles.jsx`).
4. **DND Nyata** — saat "Mode Jangan Ganggu" aktif dan sesi fokus berjalan: Navbar mengunci tab lain
   (termasuk ikon Settings di Home, yang berubah jadi ikon gembok), dan bila DND baru dinyalakan saat kamu
   sedang di tab lain, aplikasi otomatis membawamu kembali ke layar timer. Alarm & getar tetap berbunyi
   walau DND aktif (itu bukan "gangguan", itu sinyal sesi selesai); yang diredam DND hanya pengingat
   "10 menit tersisa". **Catatan jujur:** ini adalah DND di dalam aplikasi, bukan DND sistem operasi HP —
   halaman web tidak punya akses untuk mengubah pengaturan notifikasi HP kamu.

**Diverifikasi otomatis** (Playwright, headless Chrome) sebelum dikirim: floating player muncul/hilang di
saat yang tepat, tombol Play/Pause/Mute/Skip di dalamnya berfungsi, DND mengunci navigasi & auto-snap
kembali ke timer, alarm memicu `navigator.vibrate`, dan seluruh fitur revisi sebelumnya (integrasi
tugas→History, hapus akun, PWA) tetap utuh setelah perubahan ini.
