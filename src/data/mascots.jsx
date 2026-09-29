// Mascot illustrations, drawn as inline SVG to match the flat, rounded
// warm-gradient art style shown in the reference screens (owl, fox, sloth).
// Each mascot carries small CSS-driven motions (index.css): a slow breathing
// scale on the body, an occasional eye blink, gentle wing/ear sway, and
// floating "Z" sleep marks — subtle enough not to be distracting.

export function OwlLogo({ className = "w-24 h-24", animated = true }) {
  const a = animated ? "mascot-breathe" : "";
  const b = animated ? "mascot-blink" : "";
  return (
    <svg viewBox="0 0 200 200" className={`${className} ${a}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="owlBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0A868" />
          <stop offset="100%" stopColor="#9AC7B5" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="110" rx="62" ry="66" fill="url(#owlBody)" />
      <path d="M55 60 Q70 20 100 45 Q130 20 145 60 Z" fill="#EFA766" />
      <g className={b}>
        <circle cx="100" cy="100" r="8" fill="#2A2A35" />
      </g>
      <path d="M78 95 Q84 80 96 95" stroke="#2A2A35" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M88 108 Q100 118 112 108" stroke="#2A2A35" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="100" cy="118" rx="9" ry="7" fill="#E8895C" />
    </svg>
  );
}

export function OwlSleeping({ className = "w-20 h-20", animated = true }) {
  const a = animated ? "mascot-breathe" : "";
  const z = animated ? "mascot-zzz" : "";
  return (
    <svg viewBox="0 0 200 200" className={`${className} ${a}`} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="115" rx="58" ry="60" fill="#C7AE8E" />
      <ellipse cx="100" cy="70" rx="46" ry="42" fill="#DFC7A3" />
      <path d="M70 62 Q80 45 92 60" stroke="#2A2A35" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M108 60 Q120 45 130 62" stroke="#2A2A35" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="100" cy="82" rx="10" ry="8" fill="#E8895C" />
      <rect x="60" y="95" width="80" height="55" rx="26" fill="#5F8B6B" opacity="0.5" />
      <text x="128" y="42" fontSize="16" fill="#2B3050" opacity="0.6" className={z} style={{ animationDelay: "0s" }}>
        z
      </text>
      <text x="142" y="28" fontSize="22" fill="#2B3050" opacity="0.6" className={z} style={{ animationDelay: "0.6s" }}>
        Z
      </text>
    </svg>
  );
}

export function FoxWriting({ className = "w-32 h-40", animated = true }) {
  const a = animated ? "mascot-breathe" : "";
  return (
    <svg viewBox="0 0 200 260" className={`${className} ${a}`} xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="180" width="120" height="10" rx="4" fill="#8B5A2B" />
      <rect x="55" y="150" width="90" height="45" rx="8" fill="#B97A45" />
      <ellipse cx="100" cy="110" rx="46" ry="48" fill="#E8895C" />
      <path d="M62 80 L45 40 L80 68 Z" fill="#E8895C" />
      <path d="M138 80 L155 40 L120 68 Z" fill="#E8895C" />
      <ellipse cx="100" cy="130" rx="24" ry="18" fill="#FBEBD8" />
      <circle cx="86" cy="108" r="6" fill="#2A2A35" />
      <circle cx="114" cy="108" r="6" fill="#2A2A35" />
      <ellipse cx="100" cy="126" rx="6" ry="4" fill="#2A2A35" />
      <circle cx="70" cy="95" r="4" fill="#2A2A35" opacity="0.3" />
      <circle cx="130" cy="95" r="4" fill="#2A2A35" opacity="0.3" />
    </svg>
  );
}

export function SlothReading({ className = "w-32 h-40", animated = true }) {
  const a = animated ? "mascot-breathe" : "";
  const z = animated ? "mascot-zzz" : "";
  return (
    <svg viewBox="0 0 200 260" className={`${className} ${a}`} xmlns="http://www.w3.org/2000/svg">
      <rect x="45" y="150" width="110" height="70" rx="20" fill="#C97A4A" />
      <ellipse cx="100" cy="120" rx="50" ry="52" fill="#B08867" />
      <ellipse cx="100" cy="132" rx="30" ry="24" fill="#E7D2B4" />
      <circle cx="86" cy="118" r="6" fill="#2A2A35" />
      <circle cx="114" cy="118" r="6" fill="#2A2A35" />
      <ellipse cx="100" cy="136" rx="6" ry="4" fill="#5F4632" />
      <rect x="70" y="185" width="60" height="35" rx="4" fill="#FDF6EC" />
      <line x1="100" y1="185" x2="100" y2="220" stroke="#CBB995" strokeWidth="2" />
      <path d="M60 95 Q40 100 50 130" stroke="#5F8B6B" strokeWidth="6" fill="none" strokeLinecap="round" />
      <text x="118" y="70" fontSize="16" fill="#2B3050" opacity="0.6" className={z}>
        z
      </text>
      <text x="132" y="55" fontSize="22" fill="#2B3050" opacity="0.6" className={z} style={{ animationDelay: "0.6s" }}>
        Z
      </text>
    </svg>
  );
}

export function OwlPerched({ className = "w-32 h-40", animated = true }) {
  const a = animated ? "mascot-breathe" : "";
  const wl = animated ? "mascot-wing-l" : "";
  const wr = animated ? "mascot-wing-r" : "";
  const b = animated ? "mascot-blink" : "";
  return (
    <svg viewBox="0 0 200 260" className={`${className} ${a}`} xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="190" width="160" height="10" rx="5" fill="#8B5A2B" />
      <ellipse cx="100" cy="130" rx="55" ry="58" fill="#B99A72" />
      <path className={wl} d="M40 130 Q10 110 30 150 Q45 165 55 145 Z" fill="#DCC49C" />
      <path className={wr} d="M160 130 Q190 110 170 150 Q155 165 145 145 Z" fill="#DCC49C" />
      <ellipse cx="100" cy="150" rx="28" ry="22" fill="#EFE0C6" />
      <g className={b}>
        <path d="M78 118 Q86 105 96 118" stroke="#2A2A35" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M104 118 Q114 105 122 118" stroke="#2A2A35" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <ellipse cx="100" cy="150" rx="8" ry="6" fill="#E8895C" />
    </svg>
  );
}

export function OwlEmpty({ className = "w-28 h-28", animated = true }) {
  const a = animated ? "mascot-breathe" : "";
  const b = animated ? "mascot-blink" : "";
  return (
    <svg viewBox="0 0 200 200" className={`${className} ${a}`} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="115" rx="55" ry="58" fill="#B08867" />
      <ellipse cx="100" cy="128" rx="28" ry="22" fill="#E7D2B4" />
      <g className={b}>
        <path d="M80 108 Q88 95 98 108" stroke="#2A2A35" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M104 108 Q114 95 122 108" stroke="#2A2A35" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <ellipse cx="100" cy="132" rx="7" ry="5" fill="#5F4632" />
      <ellipse cx="100" cy="185" rx="26" ry="8" fill="#E8895C" />
    </svg>
  );
}

// Small owl that peeks from behind the timer ring while a focus session runs
// — a lightweight "alive" touch without a full illustration.
export function OwlPeek({ className = "w-16 h-16", animated = true }) {
  const a = animated ? "mascot-breathe" : "";
  const b = animated ? "mascot-blink" : "";
  return (
    <svg viewBox="0 0 120 120" className={`${className} ${a}`} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="70" rx="42" ry="40" fill="#EFA766" />
      <ellipse cx="60" cy="66" rx="26" ry="20" fill="#FCEFDD" />
      <g className={b}>
        <circle cx="50" cy="64" r="4.5" fill="#2A2A35" />
        <circle cx="70" cy="64" r="4.5" fill="#2A2A35" />
      </g>
      <ellipse cx="60" cy="74" rx="5" ry="3.5" fill="#E8895C" />
    </svg>
  );
}

// Steaming mug for the break screen's "Waktu Istirahat ☕" moment.
export function CoffeeCup({ className = "w-10 h-10", animated = true }) {
  const s = animated ? "mascot-steam" : "";
  return (
    <svg viewBox="0 0 60 60" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M14 40 L46 40 L43 54 Q42 58 38 58 L22 58 Q18 58 17 54 Z" fill="#8B5A2B" />
      <rect x="12" y="26" width="36" height="16" rx="4" fill="#C97A4A" />
      <path d="M46 28 Q56 28 56 36 Q56 44 46 44" stroke="#8B5A2B" strokeWidth="4" fill="none" />
      <path className={s} d="M22 22 Q20 16 24 12" stroke="#B0A18F" strokeWidth="3" fill="none" strokeLinecap="round" style={{ animationDelay: "0s" }} />
      <path className={s} d="M32 22 Q30 14 34 8" stroke="#B0A18F" strokeWidth="3" fill="none" strokeLinecap="round" style={{ animationDelay: "0.5s" }} />
      <path className={s} d="M42 22 Q40 16 44 12" stroke="#B0A18F" strokeWidth="3" fill="none" strokeLinecap="round" style={{ animationDelay: "1s" }} />
    </svg>
  );
}
