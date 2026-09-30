import { useEffect, useRef } from "react";
import { SILENT_AUDIO_SRC } from "../utils/silentKeepAlive";

const ARTWORK_BASE = import.meta.env.BASE_URL;

function artworkFor(theme) {
  const key = ["warm", "cool", "sakura"].includes(theme) ? theme : "warm";
  return [
    { src: `${ARTWORK_BASE}media-icon-${key}-192.png`, sizes: "192x192", type: "image/png" },
    { src: `${ARTWORK_BASE}media-icon-${key}-512.png`, sizes: "512x512", type: "image/png" },
  ];
}

const SUPPORTED = typeof navigator !== "undefined" && "mediaSession" in navigator;

// Publishes the running Pomodoro session to the OS via the Media Session
// API, so a lock-screen / notification-bar transport widget appears (like a
// music player) with working Play, Pause and Skip — even while the phone is
// locked or the browser tab is in the background.
//
// Support varies by platform: this works well on Chrome/Edge for Android and
// desktop, and in installed PWAs generally. iOS Safari's support for a plain
// web page (outside "Add to Home Screen") is limited or absent, and browsers
// only grant the lock-screen widget while an <audio> element is genuinely
// playing — which is what the inaudible keep-alive loop below provides.
export function useMediaSession({ active, isRunning, title, subtitle, theme, elapsedSeconds, totalSeconds, onPlay, onPause, onSkip, onStop }) {
  const keepAliveRef = useRef(null);
  const handlersRef = useRef({ onPlay, onPause, onSkip, onStop });
  handlersRef.current = { onPlay, onPause, onSkip, onStop };

  // One persistent, silent <audio> element for the lifetime of the app.
  useEffect(() => {
    if (!SUPPORTED) return undefined;
    const el = new Audio(SILENT_AUDIO_SRC);
    el.loop = true;
    el.volume = 0;
    el.preload = "auto";
    keepAliveRef.current = el;
    return () => {
      el.pause();
      el.removeAttribute("src");
    };
  }, []);

  // Action handlers registered once; they read the latest callbacks via a
  // ref so they never go stale without needing to re-register on every render.
  useEffect(() => {
    if (!SUPPORTED) return undefined;
    const ms = navigator.mediaSession;
    const safeSet = (action, handler) => {
      try {
        ms.setActionHandler(action, handler);
      } catch {
        /* action not supported by this browser — ignore */
      }
    };
    safeSet("play", () => handlersRef.current.onPlay());
    safeSet("pause", () => handlersRef.current.onPause());
    safeSet("nexttrack", () => handlersRef.current.onSkip());
    safeSet("stop", () => handlersRef.current.onStop());
    return () => {
      ["play", "pause", "nexttrack", "stop"].forEach((a) => safeSet(a, null));
    };
  }, []);

  // Metadata: title/subtitle/artwork follow the active task and app theme.
  useEffect(() => {
    if (!SUPPORTED) return;
    if (!active) {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.playbackState = "none";
      keepAliveRef.current?.pause();
      return;
    }
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist: subtitle,
      album: "Focus",
      artwork: artworkFor(theme),
    });
  }, [active, title, subtitle, theme]);

  // Playback state + the silent keep-alive track follow isRunning.
  useEffect(() => {
    if (!SUPPORTED || !active) return;
    navigator.mediaSession.playbackState = isRunning ? "playing" : "paused";
    const el = keepAliveRef.current;
    if (!el) return;
    if (isRunning) el.play().catch(() => {});
    else el.pause();
  }, [active, isRunning]);

  // Position state drives the OS's own progress bar / remaining-time display.
  useEffect(() => {
    if (!SUPPORTED || !active || !("setPositionState" in navigator.mediaSession)) return;
    try {
      navigator.mediaSession.setPositionState({
        duration: Math.max(totalSeconds, 1),
        playbackRate: 1,
        position: Math.min(elapsedSeconds, totalSeconds),
      });
    } catch {
      /* invalid state during a phase transition — safe to ignore */
    }
  }, [active, elapsedSeconds, totalSeconds]);
}
