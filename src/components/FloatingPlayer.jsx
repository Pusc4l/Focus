import { Play, Pause, Volume2, VolumeX, SkipForward, ChevronUp } from "lucide-react";
import { OwlPeek } from "../data/mascots";

// Spotify-style mini player: stays fixed above the bottom nav on every
// screen except the Focus timer itself, so the session (and its ambient
// sound) is always reachable and controllable without losing your place.
// The outer shell is a div (not <button>) because it hosts several inner
// buttons — nesting interactive controls inside a <button> is invalid HTML.
export default function FloatingPlayer({ timer, taskTitle, muted, onToggleMute, onPlayPause, onSkip, onOpen }) {
  const isBreak = timer.phase !== "focus";
  const label = isBreak ? "Waktu Istirahat ☕" : taskTitle || "Sesi Fokus";

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
      className={`absolute left-3 right-3 z-40 rounded-2xl shadow-soft overflow-hidden text-left animate-popIn active:scale-[0.99] transition-transform cursor-pointer ${
        isBreak ? "bg-break-grad" : "bg-card-grad"
      }`}
      style={{ bottom: "calc(4.75rem + env(safe-area-inset-bottom, 0px))" }}
      aria-label="Buka layar fokus"
    >
      {/* Progress sliver along the top edge */}
      <div className="h-1 w-full bg-black/10">
        <div className="h-full bg-white/80 transition-all duration-1000" style={{ width: `${Math.min(100, timer.progress * 100)}%` }} />
      </div>

      <div className="flex items-center gap-2 px-3 py-2.5">
        <OwlPeek className="w-9 h-9 shrink-0" animated={timer.isRunning} />

        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-oncard/80 uppercase tracking-wide truncate">{isBreak ? "Istirahat" : "Fokus"}</p>
          <p className="text-sm font-semibold text-oncard truncate">{label}</p>
        </div>

        <span className="text-oncard font-display font-bold tabular-nums text-base shrink-0 mr-1">
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
        strong ? "bg-oncard text-navy" : "bg-black/10 text-oncard"
      }`}
    >
      {children}
    </button>
  );
}
