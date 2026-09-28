import { useEffect, useState } from "react";
import { GlassWater, PersonStanding, Wind as BreathIcon, ChevronLeft, AlarmClock, Moon, CheckCircle2 } from "lucide-react";
import { CircularTimer, TimerControls, SoundBoard } from "../components/Timer";
import { ConfirmModal, SessionCompleteModal, ToastNotice } from "../components/Modals";
import { OwlSleeping } from "../data/mascots";

const RELAX_ACTIVITIES = [
  { key: "water", label: "Minum Air", icon: GlassWater },
  { key: "stretch", label: "Peregangan", icon: PersonStanding },
  { key: "breathe", label: "Tarik Napas", icon: BreathIcon },
];

export default function Focus({
  timer,
  activeTaskTitle,
  activeTracks,
  onToggleTrack,
  muted,
  onToggleMute,
  focusCompleteToken,
  focusMinutes,
  onBackToTasks,
  onConfirmStop,
  dndActive,
  reminderEnabled,
  recordedNotice,
  audioError,
}) {
  const [showConfirmStop, setShowConfirmStop] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showTenMinNotice, setShowTenMinNotice] = useState(false);

  // Fire the "10 minutes remaining" toast once per focus session.
  useEffect(() => {
    if (reminderEnabled && timer.phase === "focus" && timer.isRunning && timer.secondsLeft === 600) {
      setShowTenMinNotice(true);
    }
  }, [timer.secondsLeft, timer.phase, timer.isRunning, reminderEnabled]);

  // Do Not Disturb: drop any visible reminder as soon as it turns on.
  useEffect(() => {
    if (dndActive) setShowTenMinNotice(false);
  }, [dndActive]);

  // App.jsx bumps this token whenever a focus session completes.
  useEffect(() => {
    if (focusCompleteToken > 0) setShowComplete(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusCompleteToken]);

  const isBreak = timer.phase !== "focus";

  return (
    <div
      className={`h-full px-5 pt-14 pb-24 relative overflow-y-auto no-scrollbar transition-colors duration-700 ${
        isBreak ? "bg-break-grad" : "bg-warm-grad"
      }`}
    >
      {recordedNotice && !showTenMinNotice && (
        <ToastNotice
          icon={CheckCircle2}
          title={`Tercatat ${recordedNotice.minutes} menit fokus`}
          subtitle={recordedNotice.taskTitle ? `Tugas selesai: ${recordedNotice.taskTitle}` : "Masuk ke grafik History"}
        />
      )}

      {showTenMinNotice && !dndActive && (
        <ToastNotice
          icon={AlarmClock}
          title="10 Menit Tersisa"
          subtitle={`Sesi: ${activeTaskTitle || "Fokus"}`}
          onClose={() => setShowTenMinNotice(false)}
          actions={
            <>
              <button
                onClick={() => setShowTenMinNotice(false)}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-mist text-navy"
              >
                Perpanjang
              </button>
              <button
                onClick={() => {
                  setShowTenMinNotice(false);
                  setShowConfirmStop(true);
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-navy text-white"
              >
                Berhenti
              </button>
            </>
          }
        />
      )}

      {!isBreak && (
        <div key="focus-view" className="animate-fadeInUp">
          {onBackToTasks && (
            <button onClick={onBackToTasks} className="flex items-center gap-1 text-navy/60 text-sm mb-1">
              <ChevronLeft size={16} /> Tugas
            </button>
          )}
          <p className="text-center text-navy/60 text-sm mb-1 truncate">{activeTaskTitle || "Sesi Fokus"}</p>
          {dndActive && (
            <p className="mx-auto w-fit flex items-center gap-1.5 text-xs font-semibold bg-navy text-white rounded-full px-3 py-1">
              <Moon size={12} /> Jangan Ganggu aktif
            </p>
          )}
          <div className="mt-6">
            <CircularTimer
              minutes={timer.minutes}
              seconds={timer.seconds}
              progress={timer.progress}
              phase={timer.phase}
              isRunning={timer.isRunning}
            />
          </div>
          <TimerControls
            isRunning={timer.isRunning}
            onStart={timer.start}
            onReset={timer.reset}
            muted={muted}
            onToggleMute={onToggleMute}
            onRequestStop={() => setShowConfirmStop(true)}
          />
          <SoundBoard activeTracks={activeTracks} onToggle={onToggleTrack} error={audioError} />
        </div>
      )}

      {isBreak && (
        <div key="break-view" className="animate-fadeInUp">
          <p className="text-center text-ink font-semibold mb-4">Break Screen / Relax Mode</p>
          <CircularTimer
            minutes={timer.minutes}
            seconds={timer.seconds}
            progress={timer.progress}
            phase={timer.phase}
            isRunning={timer.isRunning}
          />
          <div className="flex justify-center my-4">
            <OwlSleeping className="w-16 h-16 animate-float" />
          </div>
          <button
            onClick={timer.skipBreak}
            className="w-full bg-white/70 text-navy font-semibold py-3.5 rounded-full mb-6"
          >
            Lewati Istirahat
          </button>
          <p className="font-semibold text-ink mb-3">Aktivitas Relaksasi</p>
          <div className="grid grid-cols-3 gap-3">
            {RELAX_ACTIVITIES.map(({ key, label, icon: Icon }) => (
              <div key={key} className="bg-white/80 rounded-2xl py-4 flex flex-col items-center gap-2">
                <Icon size={22} className="text-navy" />
                <span className="text-xs font-medium text-ink text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {showConfirmStop && (
        <ConfirmModal
          title="Yakin Berhenti?"
          message="Waktu fokus yang sudah berjalan tetap dicatat ke History dan tugas ini ditandai selesai."
          confirmLabel="Berhenti"
          cancelLabel="Lanjutkan"
          onCancel={() => setShowConfirmStop(false)}
          onConfirm={() => {
            setShowConfirmStop(false);
            onConfirmStop();
          }}
        />
      )}

      {showComplete && (
        <SessionCompleteModal
          minutes={focusMinutes}
          onClose={() => setShowComplete(false)}
          onStartBreak={() => {
            setShowComplete(false);
            timer.start();
          }}
        />
      )}
    </div>
  );
}
