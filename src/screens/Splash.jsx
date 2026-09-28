import { useEffect } from "react";
import { OwlLogo } from "../data/mascots";

export default function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      onClick={onDone}
      className="h-full bg-warm-grad flex flex-col items-center justify-center gap-4 cursor-pointer"
    >
      <OwlLogo className="w-28 h-28 animate-pulse-soft" />
      <h1 className="font-display text-4xl font-bold text-navy tracking-tight">focus</h1>
    </div>
  );
}
