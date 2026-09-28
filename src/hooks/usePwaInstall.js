import { useCallback, useEffect, useState } from "react";

const isStandalone = () =>
  window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true;

const isIos = () => /iphone|ipad|ipod/i.test(window.navigator.userAgent);

// Captures the browser's `beforeinstallprompt` event. It can fire before the
// Settings screen exists, so this hook must live at the app root (App.jsx)
// and hand the result down.
export function usePwaInstall() {
  const [deferred, setDeferred] = useState(null);
  const [installed, setInstalled] = useState(() => isStandalone());

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault(); // keep the event so we can show it from our own button
      setDeferred(e);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  // Opens the native install dialog. Resolves to "accepted" | "dismissed" | "unavailable".
  const promptInstall = useCallback(async () => {
    if (!deferred) return "unavailable";
    deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null); // an event can only be used once
    if (outcome === "accepted") setInstalled(true);
    return outcome;
  }, [deferred]);

  return { canInstall: Boolean(deferred), installed, ios: isIos(), promptInstall };
}
