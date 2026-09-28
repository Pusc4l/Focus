import { X } from "lucide-react";
import { Backdrop } from "./Modals";

export function LegalSheet({ title, sections, onClose }) {
  return (
    <Backdrop onClose={onClose}>
      <div className="bg-white rounded-t-3xl p-6 pb-8 max-h-[80vh] overflow-y-auto animate-fadeInUp">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg text-ink">{title}</h3>
          <button onClick={onClose} aria-label="Tutup">
            <X size={20} className="text-navy/50" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {sections.map((s, i) => (
            <section key={s.h}>
              <h4 className="font-semibold text-sm text-ink mb-1">
                {i + 1}. {s.h}
              </h4>
              <p className="text-sm text-navy/70 leading-relaxed">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </Backdrop>
  );
}
