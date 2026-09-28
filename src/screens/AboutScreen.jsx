import { useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, Github, Mail, ShieldCheck, FileText, ExternalLink } from "lucide-react";
import { APP_INFO, PRIVACY_POLICY, TERMS } from "../data/legal";
import { LegalSheet } from "../components/LegalSheet";

function LinkRow({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-3.5"
    >
      <span className="w-9 h-9 rounded-full bg-mist flex items-center justify-center shrink-0">
        <Icon size={17} className="text-navy" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-ink text-sm">{label}</p>
        <p className="text-xs text-navy/60 truncate">{value}</p>
      </div>
      <ExternalLink size={16} className="text-navy/30" />
    </a>
  );
}

function MenuRow({ icon: Icon, label, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3.5 text-left">
      <span className="w-9 h-9 rounded-full bg-mist flex items-center justify-center shrink-0">
        <Icon size={17} className="text-navy" />
      </span>
      <span className="flex-1 font-medium text-ink text-sm">{label}</span>
      <ChevronRight size={18} className="text-navy/30" />
    </button>
  );
}

export default function AboutScreen({ onBack }) {
  const [sheet, setSheet] = useState(null); // "privacy" | "terms" | null
  const base = import.meta.env.BASE_URL;

  return (
    <div className="h-full bg-warm-grad px-5 pt-14 pb-24 overflow-y-auto no-scrollbar">
      <button onClick={onBack} className="flex items-center gap-1 text-ink/80 text-sm font-semibold mb-4">
        <ChevronLeft size={18} /> Pengaturan
      </button>

      <div className="flex flex-col items-center text-center mb-6 animate-fadeInUp">
        <img
          src={`${base}logo-bird.png`}
          alt="Logo burung Focus"
          className="w-28 h-28 rounded-full object-cover shadow-soft ring-4 ring-white/60 animate-float"
        />
        <h1 className="font-display text-3xl font-extrabold text-ink mt-4">{APP_INFO.name}</h1>
        <span className="mt-1 text-xs font-semibold bg-white/60 text-navy rounded-full px-3 py-1">v{APP_INFO.version}</span>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5 mb-5 animate-fadeInUp" style={{ animationDelay: "80ms" }}>
        <p className="text-sm text-ink/80 leading-relaxed">{APP_INFO.description}</p>
        <p className="text-xs text-navy/50 mt-3">— {APP_INFO.author}</p>
      </div>

      <p className="text-sm font-bold text-ink/80 mb-2 px-1">Terhubung</p>
      <div className="bg-white rounded-2xl divide-y divide-black/5 shadow-sm border border-black/5 mb-5">
        <LinkRow icon={Instagram} label="Instagram" value={APP_INFO.instagram.handle} href={APP_INFO.instagram.url} />
        <LinkRow icon={Github} label="GitHub" value={APP_INFO.github.handle} href={APP_INFO.github.url} />
        <LinkRow icon={Mail} label="Email" value={APP_INFO.email} href={`mailto:${APP_INFO.email}`} />
      </div>

      <p className="text-sm font-bold text-ink/80 mb-2 px-1">Informasi</p>
      <div className="bg-white rounded-2xl divide-y divide-black/5 shadow-sm border border-black/5 mb-6">
        <MenuRow icon={ShieldCheck} label="Kebijakan Privasi" onClick={() => setSheet("privacy")} />
        <MenuRow icon={FileText} label="Syarat & Ketentuan" onClick={() => setSheet("terms")} />
      </div>

      <p className="text-center text-xs text-ink/70 font-medium">{APP_INFO.copyright}</p>

      {sheet === "privacy" && <LegalSheet title="Kebijakan Privasi" sections={PRIVACY_POLICY} onClose={() => setSheet(null)} />}
      {sheet === "terms" && <LegalSheet title="Syarat & Ketentuan" sections={TERMS} onClose={() => setSheet(null)} />}
    </div>
  );
}
