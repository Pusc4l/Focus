import { Home, Timer as TimerIcon, BarChart2, Settings as SettingsIcon } from "lucide-react";

const TABS = [
  { key: "home", label: "Home", icon: Home },
  { key: "focus", label: "Focus", icon: TimerIcon },
  { key: "history", label: "History", icon: BarChart2 },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

export default function Navbar({ active, onChange, locked = false }) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur-md border-t border-white/40 px-4 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="flex justify-between items-center">
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          const blocked = locked && key !== "focus";
          return (
            <button
              key={key}
              onClick={() => !blocked && onChange(key)}
              disabled={blocked}
              className={`flex flex-col items-center gap-1 px-3 py-1 flex-1 transition-opacity ${blocked ? "opacity-30" : ""}`}
              aria-current={isActive ? "page" : undefined}
              title={blocked ? "Mode Jangan Ganggu aktif" : undefined}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.4 : 1.8}
                className={isActive ? "text-navy" : "text-navy/40"}
              />
              <span className={`text-[11px] ${isActive ? "text-navy font-semibold" : "text-navy/40"}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
