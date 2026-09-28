import { useEffect, useState } from "react";

// Defensive localStorage-backed state: parses safely and always falls back
// to the provided default if the key is missing, malformed, or storage
// throws (private browsing, quota, etc).
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return defaultValue;
      return JSON.parse(raw);
    } catch (err) {
      console.warn(`useLocalStorage: failed to read "${key}"`, err);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`useLocalStorage: failed to write "${key}"`, err);
    }
  }, [key, value]);

  return [value, setValue];
}
