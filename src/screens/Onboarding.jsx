import { useState } from "react";
import { FoxWriting, SlothReading, OwlPerched } from "../data/mascots";

const STEPS = [
  {
    title: "Tetapkan Tujuan",
    body: "Tentukan target harian Anda untuk produktivitas maksimal.",
    Mascot: FoxWriting,
    bg: "bg-warm-grad",
    cta: "Get Started",
  },
  {
    title: "Fokus 25 Menit",
    body: "Kerja intensif selama satu sesi pomodoro penuh tanpa gangguan.",
    Mascot: SlothReading,
    bg: "bg-gradient-to-b from-[#F0A868] to-[#CFE0C4]",
    cta: "Next Step",
  },
  {
    title: "Waktunya Istirahat",
    body: "Isi ulang energi Anda dengan istirahat singkat yang berkualitas.",
    Mascot: OwlPerched,
    bg: "bg-break-grad",
    cta: "Finish Setup",
  },
];

export default function Onboarding({ onFinish }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  function handleNext() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else onFinish();
  }

  return (
    <div className={`h-full ${current.bg} flex flex-col px-8 pt-16 pb-10`}>
      <h2 className="font-display text-4xl font-bold text-ink leading-tight mb-3">{current.title}</h2>
      <p className="text-ink/70 text-base mb-10 max-w-xs">{current.body}</p>
      <div className="flex-1 flex items-center justify-center">
        <current.Mascot className="w-48 h-56" />
      </div>
      <button
        onClick={handleNext}
        className="w-full bg-navy text-white font-semibold py-4 rounded-full mb-4"
      >
        {current.cta}
      </button>
      <div className="flex justify-center gap-1.5">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === step ? "w-6 bg-ink/70" : "w-1.5 bg-ink/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
