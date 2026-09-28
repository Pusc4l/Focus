import { Check } from "lucide-react";
import { Backdrop } from "./Modals";
import { THEMES } from "../data/themes";

export function ThemePicker({ current, onSelect, onClose }) {
  return (
    <Backdrop onClose={onClose}>
      <div className="bg-white rounded-t-3xl p-6 pb-8 animate-fadeInUp">
        <h3 className="font-display font-bold text-lg text-ink mb-1">Tema Aplikasi</h3>
        <p className="text-sm text-navy/60 mb-4">Pilih gradasi warna favoritmu.</p>
        <div className="flex flex-col gap-3">
          {THEMES.map((t) => {
            const active = t.key === current;
            return (
              <button
                key={t.key}
                onClick={() => onSelect(t.key)}
                aria-pressed={active}
                className={`flex items-center gap-3 rounded-2xl p-3 text-left border-2 transition-colors ${
                  active ? "border-navy bg-mist" : "border-transparent bg-mist/60"
                }`}
              >
                <span className="w-14 h-14 rounded-xl shrink-0 shadow-sm" style={{ background: t.preview }} />
                <span className="flex-1 min-w-0">
                  <span className="block font-semibold text-sm text-ink">{t.label}</span>
                  <span className="block text-xs text-navy/60">{t.desc}</span>
                </span>
                {active && <Check size={18} className="text-navy" />}
              </button>
            );
          })}
        </div>
      </div>
    </Backdrop>
  );
}
