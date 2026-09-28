import { X } from "lucide-react";
import { Backdrop } from "./Modals";

const ANDROID = [
  "Buka Focus di Chrome (bukan di dalam aplikasi lain).",
  "Ketuk menu ⋮ di pojok kanan atas.",
  "Pilih “Instal aplikasi” atau “Tambahkan ke layar utama”.",
];
const IOS = [
  "Buka Focus di Safari.",
  "Ketuk tombol Bagikan (kotak dengan panah ke atas).",
  "Pilih “Tambah ke Layar Utama”, lalu ketuk Tambah.",
];

// Fallback when the native prompt is not available (iOS Safari, the browser
// has not offered it yet, or it was dismissed): manual steps per platform.
export function InstallHelpSheet({ ios, onClose }) {
  const steps = ios ? IOS : ANDROID;
  return (
    <Backdrop onClose={onClose}>
      <div className="bg-white rounded-t-3xl p-6 pb-8 animate-fadeInUp">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display font-bold text-lg text-ink">Install Focus</h3>
          <button onClick={onClose} aria-label="Tutup">
            <X size={20} className="text-navy/50" />
          </button>
        </div>
        <p className="text-sm text-navy/60 mb-4">
          {ios ? "Di iPhone/iPad, pemasangan dilakukan manual lewat Safari:" : "Pop-up instalasi otomatis belum tersedia di browser ini. Pasang secara manual:"}
        </p>
        <ol className="flex flex-col gap-3 mb-5">
          {steps.map((t, i) => (
            <li key={t} className="flex gap-3 text-sm text-ink">
              <span className="w-6 h-6 rounded-full bg-navy text-white text-xs font-semibold flex items-center justify-center shrink-0">{i + 1}</span>
              <span className="pt-0.5">{t}</span>
            </li>
          ))}
        </ol>
        <p className="text-xs text-navy/50 mb-5">Instalasi memerlukan koneksi HTTPS (atau localhost saat pengembangan).</p>
        <button onClick={onClose} className="w-full py-3.5 rounded-full bg-navy text-white font-semibold">
          Mengerti
        </button>
      </div>
    </Backdrop>
  );
}
