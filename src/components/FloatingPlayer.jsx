import { Play, Pause, Volume2, VolumeX, SkipForward, ChevronUp } from "lucide-react";
import { OwlPeek } from "../data/mascots";

// Spotify-style mini player: glassmorphism card, tinted with the current
// theme's accent colors via CSS variables (see index.css), so it always
// matches Hangat/Sejuk/Sakura without any per-theme JS branching. Stays
// fixed above the bottom nav on every screen except the Focus timer itself.
// The outer shell is a div (not <button>) because it hosts several inner
// buttons — nesting interactive controls inside a <button> is invalid HTML.
export default function FloatingPlayer({ timer, taskTitle, muted, onToggleMute, onPlayPause, onSkip, onOpen }) {
  const isBreak = timer.phase !== "focus";
  const label = isBreak ? "Waktu Istirahat ☕" : taskTitle || "Sesi Fokus";
  const ringColor = isBreak ? "rgb(var(--c-moss))" : "rgb(var(--c-ember))";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="absolute left-3 right-3 z-40 animate-popIn cursor-pointer"
      style={{ bottom: "calc(4.75rem + env(safe-area-inset-bottom, 0px))" }}
      aria-label="Buka layar fokus"
    >
      {/* Ambient glow behind the glass card, tinted to the current phase */}
      <div className="absolute -inset-2 rounded-[2rem] blur-xl animate-glow" style={{ background: ringColor, opacity: 0.45 }} aria-hidden="true" />

      <div
        className="relative rounded-2xl overflow-hidden shadow-soft backdrop-blur-xl border transition-transform active:scale-[0.98]"
        style={{
          background: isBreak
            ? "linear-gradient(120deg, rgb(var(--c-sage) / 0.55), rgb(var(--c-moss) / 0.45))"
            : "linear-gradient(120deg, rgb(var(--c-clay) / 0.55), rgb(var(--c-ember) / 0.45))",
          borderColor: "rgb(var(--c-timerglass) / 0.35)",
        }}
      >
        {/* Progress ring-style sliver along the top edge */}
        <div className="h-1 w-full bg-black/10">
          <div
            className="h-full transition-all duration-1000"
            style={{ width: `${Math.min(100, timer.progress * 100)}%`, background: "rgb(var(--c-timerglass) / 0.9)" }}
          />
        </div>

        <div className="flex items-center gap-2.5 px-3 py-2.5">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm"
            style={{ background: "rgb(var(--c-timerglass) / 0.35)" }}
          >
            <OwlPeek className="w-8 h-8" animated={timer.isRunning} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-bold text-oncard/80 uppercase tracking-wide truncate">{isBreak ? "Istirahat" : "Fokus"}</p>
            <p className="text-sm font-semibold text-oncard truncate">{label}</p>
          </div>

          <span className="text-oncard font-display font-bold tabular-nums text-base shrink-0 mr-0.5">
            {timer.minutes}:{timer.seconds}
          </span>

          <IconBtn onClick={onToggleMute} label={muted ? "Aktifkan suara" : "Bisukan suara"}>
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </IconBtn>
          <IconBtn onClick={onPlayPause} label={timer.isRunning ? "Jeda" : "Lanjutkan"} strong>
            {timer.isRunning ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
          </IconBtn>
          <IconBtn onClick={onSkip} label="Lewati sesi">
            <SkipForward size={16} />
          </IconBtn>
          <ChevronUp size={16} className="text-oncard/70 shrink-0" />
        </div>
      </div>
    </div>
  );
}

function IconBtn({ children, onClick, label, strong }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform ${
        strong ? "bg-oncard text-navy" : "text-oncard"
      }`}
      style={strong ? undefined : { background: "rgb(0 0 0 / 0.15)" }}
    >
      {children}
    </button>
  );
}
