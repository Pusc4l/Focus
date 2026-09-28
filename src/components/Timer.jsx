import { Play, RotateCcw, CloudRain, Wind, Waves, Flame, Volume2, VolumeX } from "lucide-react";
import { TRACKS } from "../hooks/useAmbientAudio";

const ICONS = { rain: CloudRain, forest: Wind, wave: Waves, fire: Flame };

export function CircularTimer({ minutes, seconds, progress, phase, isRunning }) {
  const radius = 112;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);
  const trackColor = phase === "focus" ? "rgb(var(--c-peach) / 0.45)" : "rgb(var(--c-sage) / 0.35)";
  const barColor = phase === "focus" ? "rgb(var(--c-ember))" : "rgb(var(--c-moss))";

  return (
    <div className="relative w-72 h-72 mx-auto">
      <svg viewBox="0 0 260 260" className="w-full h-full -rotate-90">
        <circle cx="130" cy="130" r={radius} fill="none" strokeWidth="14" style={{ stroke: trackColor }} />
        <circle
          cx="130"
          cy="130"
          r={radius}
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ stroke: barColor, transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-display font-extrabold text-ink tabular-nums leading-none transition-transform ${
            isRunning ? "scale-100" : "scale-95"
          }`}
          style={{ fontSize: "4.25rem" }}
        >
          {minutes}:{seconds}
        </span>
        <span className="text-navy/60 font-semibold mt-2 text-sm tracking-wide uppercase">
          {phase === "focus" ? "Focus" : phase === "shortBreak" ? "Istirahat Pendek" : "Istirahat Panjang"}
        </span>
      </div>
    </div>
  );
}

export function TimerControls({ isRunning, onStart, onReset, onRequestStop, muted, onToggleMute }) {
  return (
    <div className="flex items-center justify-center gap-5 mt-8">
      <button
        onClick={onReset}
        className="w-14 h-14 rounded-full bg-white/70 flex items-center justify-center shadow-soft active:scale-95 transition-transform"
        aria-label="Reset"
      >
        <RotateCcw size={20} className="text-navy" />
      </button>
      {isRunning ? (
        <button
          onClick={onRequestStop}
          className="px-10 py-4 rounded-full bg-navy text-white font-semibold text-lg shadow-soft active:scale-95 transition-transform"
        >
          Stop
        </button>
      ) : (
        <button
          onClick={onStart}
          className="px-10 py-4 rounded-full bg-navy text-white font-semibold text-lg shadow-soft flex items-center gap-2 active:scale-95 transition-transform"
        >
          <Play size={20} fill="white" /> Start
        </button>
      )}
      <button
        onClick={onToggleMute}
        className="w-14 h-14 rounded-full bg-white/70 flex items-center justify-center shadow-soft active:scale-95 transition-transform"
        aria-label="Mute"
      >
        {muted ? <VolumeX size={20} className="text-navy" /> : <Volume2 size={20} className="text-navy" />}
      </button>
    </div>
  );
}

export function SoundBoard({ activeTracks, onToggle, error }) {
  return (
    <div className="mt-10 animate-fadeInUp" style={{ animationDelay: "200ms" }}>
      <p className="text-navy/70 font-medium mb-3">Sounds to Focus</p>
      <div className="grid grid-cols-4 gap-3">
        {TRACKS.map(({ key, label }) => {
          const Icon = ICONS[key];
          const isActive = activeTracks.has(key);
          return (
            <button
              key={key}
              onClick={() => onToggle(key)}
              className={`flex flex-col items-center gap-1.5 py-4 rounded-2xl transition-all ${
                isActive ? "bg-navy text-white shadow-soft scale-[1.03]" : "bg-white/60 text-navy"
              }`}
              aria-pressed={isActive}
            >
              <Icon size={20} className={isActive ? "animate-pulse-soft" : ""} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
      {error && (
        <p className="text-xs text-danger font-medium mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
