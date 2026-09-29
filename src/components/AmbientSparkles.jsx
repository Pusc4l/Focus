// Purely decorative floating sparkles/leaves for a livelier background,
// without competing with foreground content. Respects prefers-reduced-motion
// via the .animate-drift/.animate-twinkle rules in index.css.
// Kept to the far corners/edges only, well clear of centered timer, cards
// and full-width buttons, so nothing visually bleeds through them.
const DOTS = [
  { top: "6%", left: "6%", size: 16, kind: "sparkle", delay: "0s", dur: "drift" },
  { top: "10%", left: "90%", size: 12, kind: "sparkle", delay: "1.2s", dur: "twinkle" },
  { top: "46%", left: "3%", size: 9, kind: "dot", delay: "0.4s", dur: "twinkle" },
  { top: "46%", left: "95%", size: 9, kind: "dot", delay: "0.9s", dur: "twinkle" },
  { top: "94%", left: "8%", size: 10, kind: "sparkle", delay: "1.6s", dur: "twinkle" },
];

function Glyph({ kind, size }) {
  if (kind === "sparkle") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="currentColor" />
      </svg>
    );
  }
  if (kind === "leaf") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4 20 C4 10 12 4 20 4 C20 14 12 20 4 20 Z" fill="currentColor" />
      </svg>
    );
  }
  return <span style={{ width: size, height: size, display: "block", borderRadius: "9999px", background: "currentColor" }} />;
}

export default function AmbientSparkles({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden text-ink/20 ${className}`} aria-hidden="true">
      {DOTS.map((d, i) => (
        <div
          key={i}
          className={d.dur === "drift" ? "animate-drift" : "animate-twinkle"}
          style={{ position: "absolute", top: d.top, left: d.left, animationDelay: d.delay }}
        >
          <Glyph kind={d.kind} size={d.size} />
        </div>
      ))}
    </div>
  );
}
