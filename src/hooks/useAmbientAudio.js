import { useCallback, useEffect, useRef, useState } from "react";

const BASE = import.meta.env.BASE_URL; // works at "/" and on sub-path deploys

// Each track lists candidate file names inside /public/sounds/. The first is
// the original file name, the second a short alias; if one 404s the next is
// tried automatically, so renamed or original files both work.
export const TRACKS = [
  { key: "rain", label: "Rain", mixLabel: "Hujan Deras", desc: "Suara tetesan air yang menenangkan.", files: ["liecio-calming-rain-257596.mp3", "rain.mp3"] },
  { key: "forest", label: "Wind", mixLabel: "Hutan Pinus", desc: "Desiran angin sepoi-sepoi.", files: ["freesound_community-forest-wind-and-birds-6881.mp3", "forest.mp3"] },
  { key: "wave", label: "Wave", mixLabel: "Ombak Pantai", desc: "Ritme laut yang ritmis.", files: ["juliush-sandy-beach-calm-waves-water-nature-sounds-8052.mp3", "wave.mp3"] },
  { key: "fire", label: "Fire", mixLabel: "Perapian Hangat", desc: "Suara kayu terbakar yang nyaman.", files: ["alexzavesa-bonfire-2-468367.mp3", "fire.mp3"] },
];

const clamp01 = (n) => Math.max(0, Math.min(1, n));

// Final volume = track level x master volume, so master never caps a track's
// own percentage, it only scales the overall loudness.
export function useAmbientAudio(levels, masterVolume, muted = false) {
  const audioRefs = useRef({});
  const activeRef = useRef(new Set());
  const volumeRef = useRef({ levels, masterVolume });
  const [activeTracks, setActiveTracks] = useState(() => new Set());
  const [error, setError] = useState("");

  volumeRef.current = { levels, masterVolume, muted };
  const volumeFor = (key) => clamp01(((volumeRef.current.levels?.[key] ?? 0) / 100) * (volumeRef.current.masterVolume / 100));

  // Apply volume live (no restart) whenever a slider moves.
  useEffect(() => {
    Object.entries(audioRefs.current).forEach(([key, el]) => {
      el.volume = volumeFor(key);
      el.muted = muted;
    });
  }, [levels, masterVolume, muted]);

  // Elements are created lazily on first play (inside the click gesture, which
  // satisfies autoplay rules) so the app doesn't download ~12 MB at startup.
  const getAudio = useCallback((track) => {
    let el = audioRefs.current[track.key];
    if (el) return el;
    let idx = 0;
    el = new Audio(`${BASE}sounds/${track.files[0]}`);
    el.loop = true;
    el.preload = "auto";
    el.volume = volumeFor(track.key);
    el.muted = volumeRef.current.muted;
    el.addEventListener("error", () => {
      if (idx < track.files.length - 1) {
        idx += 1;
        el.src = `${BASE}sounds/${track.files[idx]}`;
        el.load();
        if (activeRef.current.has(track.key)) el.play().catch(() => {});
      } else {
        activeRef.current.delete(track.key);
        setActiveTracks(new Set(activeRef.current));
        setError(`File suara "${track.mixLabel}" tidak ditemukan di public/sounds/.`);
      }
    });
    audioRefs.current[track.key] = el;
    return el;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTrack = useCallback(
    (key) => {
      const track = TRACKS.find((t) => t.key === key);
      if (!track) return;
      setError("");
      const el = getAudio(track);
      if (activeRef.current.has(key)) {
        el.pause();
        activeRef.current.delete(key);
      } else {
        activeRef.current.add(key);
        el.volume = volumeFor(key);
        el.play().catch((err) => {
          if (err?.name === "NotAllowedError") {
            activeRef.current.delete(key);
            setActiveTracks(new Set(activeRef.current));
            setError("Browser memblokir suara. Tap tombol suara sekali lagi.");
          }
          // AbortError / load errors are handled by the "error" listener.
        });
      }
      setActiveTracks(new Set(activeRef.current));
    },
    [getAudio]
  );

  const stopAll = useCallback(() => {
    Object.values(audioRefs.current).forEach((el) => el.pause());
    activeRef.current = new Set();
    setActiveTracks(new Set());
  }, []);

  // Release everything when the account view unmounts.
  useEffect(() => {
    const refs = audioRefs.current;
    return () => {
      Object.values(refs).forEach((el) => {
        el.pause();
        el.removeAttribute("src");
        el.load();
      });
    };
  }, []);

  return { activeTracks, toggleTrack, stopAll, error };
}
