import { OwlLogo } from "../data/mascots";
import { themeLabel } from "../data/themes";

// Full-screen loading veil shown while the theme swaps. It carries the
// *target* theme via data-theme, so it already looks like the new palette:
// old UI -> veil fades in -> theme switches underneath -> veil fades out.
export default function ThemeTransition({ target, stage }) {
  return (
    <div
      data-theme={target}
      className="absolute inset-0 z-[60] bg-warm-grad flex flex-col items-center justify-center gap-4"
      style={{ animation: `${stage === "in" ? "fadeIn" : "fadeOut"} 0.4s ease forwards` }}
      role="status"
      aria-live="polite"
    >
      <OwlLogo className="w-20 h-20 animate-pulse-soft" />
      <p className="font-display font-semibold text-ink">Menerapkan {themeLabel(target)}…</p>
      <div className="w-40 h-1.5 rounded-full bg-white/50 overflow-hidden">
        <div className="h-full w-1/3 rounded-full bg-ember" style={{ animation: "shimmer 0.9s ease-in-out infinite" }} />
      </div>
    </div>
  );
}
