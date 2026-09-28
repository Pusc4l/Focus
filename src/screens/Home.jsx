import { Settings as SettingsIcon } from "lucide-react";
import { OwlSleeping } from "../data/mascots";
import { HomeTaskPreview } from "../components/TaskList";

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Home({
  userName,
  tasks,
  onToggleTask,
  onStartTask,
  onAddTask,
  onStartFocus,
  onOpenSettings,
  sessionsToday,
  dailyGoal,
  weekStatus,
}) {
  return (
    <div className="h-full bg-animated-warm px-5 pt-14 pb-24 overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-5 animate-fadeInUp">
        <div>
          <p className="text-ink/70 text-sm">Halo,</p>
          <h1 className="font-display text-2xl font-bold text-ink">{userName}!</h1>
        </div>
        <button
          onClick={onOpenSettings}
          className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Pengaturan"
        >
          <SettingsIcon size={19} className="text-navy" />
        </button>
      </div>

      <div className="bg-card-grad rounded-2xl p-5 flex items-center gap-4 shadow-soft mb-5 animate-fadeInUp" style={{ animationDelay: "60ms" }}>
        <div className="flex-1">
          <h2 className="font-display text-xl font-bold text-oncard leading-snug mb-1">Mulai Sesi Fokus Baru</h2>
          <p className="text-oncard/85 text-sm mb-4">Siap untuk 25 menit produktivitas?</p>
          <button
            onClick={onStartFocus}
            className="bg-navy text-white font-semibold px-5 py-2.5 rounded-full text-sm active:scale-95 transition-transform"
          >
            Mulai Sekarang
          </button>
        </div>
        <OwlSleeping className="w-20 h-20 shrink-0 animate-float" />
      </div>

      <div className="bg-white/80 rounded-2xl p-4 mb-6 animate-fadeInUp" style={{ animationDelay: "120ms" }}>
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-ink text-sm">Progress Harian</p>
          <p className="text-xs text-navy/50">{sessionsToday}/{dailyGoal} Sesi Selesai.</p>
        </div>
        <div className="flex justify-between">
          {WEEK.map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-1.5">
              <span
                className={`w-8 h-8 rounded-full transition-colors ${
                  weekStatus[i] === "done" ? "bg-moss" : weekStatus[i] === "today" ? "bg-ember animate-pulse-soft" : "bg-navy/10"
                }`}
              />
              <span className="text-[10px] text-navy/50">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <HomeTaskPreview tasks={tasks} onToggle={onToggleTask} onStart={onStartTask} onAdd={onAddTask} />
    </div>
  );
}
