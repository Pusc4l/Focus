import { useCallback, useEffect, useRef, useState } from "react";

function durationFor(phase, cfg) {
  if (phase === "focus") return cfg.focusMinutes * 60;
  if (phase === "shortBreak") return cfg.shortBreakMinutes * 60;
  return cfg.longBreakMinutes * 60;
}

// Pomodoro state machine: focus -> short break -> ... -> long break.
// Counting is based on an end timestamp (not tick counting), so it stays
// accurate even when the browser throttles a background tab. Completion
// side effects run in the interval callback, never inside a state updater,
// so they fire exactly once (also under React StrictMode).
export function usePomodoroTimer({
  focusMinutes = 25,
  shortBreakMinutes = 5,
  longBreakMinutes = 15,
  cyclesBeforeLongBreak = 4,
  onSessionComplete,
} = {}) {
  const [phase, setPhase] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(focusMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedFocusCount, setCompletedFocusCount] = useState(0);

  // Always-fresh snapshot for callbacks created once.
  const live = useRef({});
  live.current = { phase, secondsLeft, completedFocusCount, focusMinutes, shortBreakMinutes, longBreakMinutes, cyclesBeforeLongBreak };
  const callbackRef = useRef(onSessionComplete);
  useEffect(() => {
    callbackRef.current = onSessionComplete;
  });

  // Keep the idle countdown in sync when durations change in Settings.
  useEffect(() => {
    if (!isRunning) setSecondsLeft(durationFor(phase, live.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusMinutes, shortBreakMinutes, longBreakMinutes]);

  const completePhase = useCallback(() => {
    const s = live.current;
    setIsRunning(false);
    if (s.phase === "focus") {
      const nextCount = s.completedFocusCount + 1;
      setCompletedFocusCount(nextCount);
      callbackRef.current?.({ phase: "focus", durationMinutes: s.focusMinutes });
      const nextPhase = nextCount % s.cyclesBeforeLongBreak === 0 ? "longBreak" : "shortBreak";
      setPhase(nextPhase);
      setSecondsLeft(durationFor(nextPhase, s));
    } else {
      callbackRef.current?.({ phase: s.phase, durationMinutes: durationFor(s.phase, s) / 60 });
      setPhase("focus");
      setSecondsLeft(durationFor("focus", s));
    }
  }, []);

  useEffect(() => {
    if (!isRunning) return undefined;
    const endAt = Date.now() + live.current.secondsLeft * 1000;
    const id = setInterval(() => {
      const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left <= 0) {
        clearInterval(id);
        completePhase();
      }
    }, 250);
    return () => clearInterval(id);
  }, [isRunning, completePhase]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(durationFor(live.current.phase, live.current));
  }, []);

  // Jump straight into a fresh focus session and start counting.
  const startFocus = useCallback(() => {
    setPhase("focus");
    setSecondsLeft(live.current.focusMinutes * 60);
    setIsRunning(true);
  }, []);

  const skipBreak = useCallback(() => {
    setIsRunning(false);
    setPhase("focus");
    setSecondsLeft(live.current.focusMinutes * 60);
  }, []);

  const totalSeconds = durationFor(phase, { focusMinutes, shortBreakMinutes, longBreakMinutes });
  const elapsedSeconds = Math.max(0, totalSeconds - secondsLeft);

  return {
    phase,
    isRunning,
    minutes: String(Math.floor(secondsLeft / 60)).padStart(2, "0"),
    seconds: String(secondsLeft % 60).padStart(2, "0"),
    secondsLeft,
    elapsedSeconds,
    progress: totalSeconds ? elapsedSeconds / totalSeconds : 0,
    completedFocusCount,
    start,
    pause,
    reset,
    startFocus,
    skipBreak,
  };
}
