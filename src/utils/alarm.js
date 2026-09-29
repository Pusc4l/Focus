// Session-end alarm: a soft bell chime (Web Audio API, no audio file needed)
// plus phone vibration. Browsers only allow audio after a user gesture, so
// unlockAudio() is called on the first tap; after that the chime can fire even
// while the tab is in the background.
let ctx = null;

function getCtx() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  return ctx;
}

export function unlockAudio() {
  const c = getCtx();
  if (c && c.state === "suspended") c.resume().catch(() => {});
}

// One bell strike: a fundamental plus a few soft overtones, fast attack, long decay.
function bell(c, when, freq, duration, peak) {
  const master = c.createGain();
  master.gain.setValueAtTime(0.0001, when);
  master.gain.exponentialRampToValueAtTime(peak, when + 0.015);
  master.gain.exponentialRampToValueAtTime(0.0001, when + duration);
  master.connect(c.destination);
  [
    [1, 1],
    [2.01, 0.32],
    [3.02, 0.16],
    [4.2, 0.07],
  ].forEach(([mult, gain]) => {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = "sine";
    osc.frequency.value = freq * mult;
    g.gain.value = gain;
    osc.connect(g);
    g.connect(master);
    osc.start(when);
    osc.stop(when + duration + 0.05);
  });
}

// kind: "focus" (rising, cheerful "done!") | "break" (gentle falling "back to it")
export function playChime(kind) {
  const c = getCtx();
  if (!c) return;
  c.resume?.().catch(() => {});
  const t = c.currentTime + 0.05;
  const notes = kind === "focus" ? [659.25, 783.99, 1046.5] : [783.99, 659.25];
  notes.forEach((freq, i) => bell(c, t + i * 0.32, freq, 1.9, 0.2));
}

export function vibrate(pattern) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* unsupported */
  }
}

export function alarm(kind) {
  playChime(kind);
  vibrate(kind === "focus" ? [250, 120, 250, 120, 500] : [300, 150, 300]);
}
