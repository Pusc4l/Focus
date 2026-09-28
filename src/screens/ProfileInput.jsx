import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { OwlLogo } from "../data/mascots";

const CATEGORIES = ["Self Learner", "Mahasiswa", "Siswa", "Lainnya"];

export default function ProfileInput({ onSubmit }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), category });
  }

  return (
    <div className="h-full overflow-y-auto bg-warm-grad flex flex-col justify-center px-8 py-12 animate-[fadeIn_0.5s_ease]">
      <div className="flex justify-center mb-6">
        <OwlLogo className="w-20 h-20" />
      </div>
      <h1 className="font-display text-2xl font-bold text-ink text-center mb-2">Kenalan Dulu, Yuk!</h1>
      <p className="text-ink/70 text-center text-sm mb-8">
        Cukup nama dan kategori — tanpa email atau kata sandi.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-semibold text-ink/80 mb-1.5 block">Nama</label>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama"
            className="w-full bg-white/90 rounded-xl px-4 py-3.5 text-ink outline-none shadow-sm focus:ring-2 focus:ring-navy/40"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-ink/80 mb-1.5 block">Kategori</label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none bg-white/90 rounded-xl px-4 py-3.5 text-ink outline-none shadow-sm focus:ring-2 focus:ring-navy/40"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/50 pointer-events-none" />
          </div>
        </div>

        <button
          type="submit"
          disabled={!name.trim()}
          className="mt-4 w-full bg-navy text-white font-semibold py-4 rounded-full disabled:opacity-40 transition-opacity"
        >
          Mulai Fokus
        </button>
      </form>
    </div>
  );
}
