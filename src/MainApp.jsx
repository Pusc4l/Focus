import { useEffect, useRef, useState } from "react";
import { useAccountData } from "./hooks/useAccountData";
import { usePomodoroTimer } from "./hooks/usePomodoroTimer";
import { useAmbientAudio } from "./hooks/useAmbientAudio";
import { useWeeklyStats, isoDate } from "./hooks/useWeeklyStats";
import { notify } from "./utils/notify";
import Home from "./screens/Home";
import Focus from "./screens/Focus";
import TaskScreen from "./screens/TaskScreen";
import History from "./screens/History";
import SettingsScreen from "./screens/SettingsScreen";
import Navbar from "./components/Navbar";
import ThemeTransition from "./components/ThemeTransition";
import { AddTaskModal } from "./components/Modals";

const DAILY_GOAL = 8;

export default function MainApp({ accountId, profile, accounts, onSwitchAccount, onAddAccount, onDeleteAccount }) {
  const { tasks, settings, sessions, setTasks, setSettings, setSessions } = useAccountData(accountId);
  const [tab, setTab] = useState("home");
  const [focusView, setFocusView] = useState("list"); // "list" | "timer"
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [muted, setMuted] = useState(false);
  const [focusCompleteToken, setFocusCompleteToken] = useState(0);
  const [recordedNotice, setRecordedNotice] = useState(null);
  const [themeFx, setThemeFx] = useState(null); // { target, stage: "in" | "out" }
  const fxTimers = useRef([]);

  const audio = useAmbientAudio(settings.mixLevels, settings.masterVolume, muted);
  const stats = useWeeklyStats(sessions);

  // ---- Theme: applied on <html> so every screen re-colors together ----
  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
  }, [settings.theme]);

  useEffect(
    () => () => {
      delete document.documentElement.dataset.theme;
      fxTimers.current.forEach(clearTimeout);
    },
    []
  );

  function changeTheme(key) {
    if (key === settings.theme || themeFx) return;
    setThemeFx({ target: key, stage: "in" });
    fxTimers.current = [
      setTimeout(() => setSettings((s) => ({ ...s, theme: key })), 450), // swap while veil is opaque
      setTimeout(() => setThemeFx((f) => f && { ...f, stage: "out" }), 950),
      setTimeout(() => setThemeFx(null), 1400),
    ];
  }

  // Auto-hide the "session recorded" toast.
  useEffect(() => {
    if (!recordedNotice) return undefined;
    const id = setTimeout(() => setRecordedNotice(null), 4500);
    return () => clearTimeout(id);
  }, [recordedNotice]);

  // ---- Tasks ----
  const activeTask = tasks.find((t) => t.id === activeTaskId) ?? null;

  function toggleTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }
  function addTask({ title, estimatedSessions, priority }) {
    setTasks((prev) => [...prev, { id: `t${Date.now()}`, title, estimatedSessions, completedSessions: 0, done: false, priority }]);
    setShowAddTask(false);
  }
  function editTask({ id, title, estimatedSessions, priority }) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title, estimatedSessions, priority } : t)));
  }
  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (activeTaskId === id) setActiveTaskId(null);
  }

  // Logs focus time to History (drives the chart/totals) and, if the session
  // was for a task, marks that task done. Used for both a finished session
  // and one stopped midway.
  function recordFocus(minutes) {
    setSessions((prev) => [
      {
        id: `${Date.now()}`,
        phase: "focus",
        label: activeTask?.title ?? "Sesi Fokus",
        taskId: activeTaskId,
        durationMinutes: minutes,
        dateISO: isoDate(),
        timestamp: new Date().toLocaleString("id-ID", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }),
      },
      ...prev,
    ]);
    if (activeTaskId) {
      setTasks((prev) =>
        prev.map((t) => (t.id === activeTaskId ? { ...t, done: true, completedSessions: t.completedSessions + 1 } : t))
      );
    }
  }

  const timer = usePomodoroTimer({
    focusMinutes: settings.focusMinutes,
    shortBreakMinutes: settings.shortBreakMinutes,
    longBreakMinutes: settings.longBreakMinutes,
    cyclesBeforeLongBreak: settings.cyclesBeforeLongBreak,
    onSessionComplete: ({ phase, durationMinutes }) => {
      if (phase === "focus") {
        recordFocus(durationMinutes);
        setActiveTaskId(null);
        setFocusCompleteToken((t) => t + 1);
        if (settings.notificationsEnabled) notify("Sesi fokus selesai 🎉", `${durationMinutes} menit fokus tercatat. Waktunya istirahat!`);
      } else if (settings.notificationsEnabled) {
        notify("Istirahat selesai", "Siap untuk sesi fokus berikutnya?");
      }
    },
  });

  // Tap a task -> open the timer and start it for that task.
  function startTask(id) {
    setTab("focus");
    setFocusView("timer");
    if (timer.isRunning) return; // a session is already counting; just show it
    setActiveTaskId(id);
    timer.startFocus();
  }

  function startFocusForToday() {
    setActiveTaskId(null);
    setFocusView("timer");
    setTab("focus");
  }

  // Stop midway: whatever time already ran is logged (even 1 minute) and the
  // task is marked done, so it always shows up in History.
  function handleConfirmStop() {
    const elapsed = timer.elapsedSeconds;
    if (timer.phase === "focus" && elapsed >= 1) {
      const minutes = Math.max(1, Math.round(elapsed / 60));
      recordFocus(minutes);
      setRecordedNotice({ minutes, taskTitle: activeTask?.title ?? null });
    }
    timer.reset();
    audio.stopAll();
    setActiveTaskId(null);
  }

  // ---- Do Not Disturb: while a focus session runs, lock the other tabs and
  // silence in-app reminders. (A web page cannot toggle the OS-level DND.)
  const dndActive = settings.dndDuringFocus && timer.isRunning && timer.phase === "focus";
  const reminderEnabled = settings.notificationsEnabled && !dndActive;

  return (
    <div className="app-shell">
      {tab === "home" && (
        <Home
          userName={profile.name}
          tasks={tasks}
          onToggleTask={toggleTask}
          onStartTask={startTask}
          onAddTask={() => setShowAddTask(true)}
          onStartFocus={startFocusForToday}
          onOpenSettings={() => setTab("settings")}
          sessionsToday={stats.sessionsToday}
          dailyGoal={DAILY_GOAL}
          weekStatus={stats.weekStatus}
        />
      )}

      {tab === "focus" && focusView === "timer" && (
        <Focus
          timer={timer}
          activeTaskTitle={activeTask?.title ?? ""}
          activeTracks={audio.activeTracks}
          onToggleTrack={audio.toggleTrack}
          audioError={audio.error}
          muted={muted}
          onToggleMute={() => setMuted((m) => !m)}
          focusCompleteToken={focusCompleteToken}
          focusMinutes={settings.focusMinutes}
          onBackToTasks={!timer.isRunning ? () => setFocusView("list") : null}
          onConfirmStop={handleConfirmStop}
          dndActive={dndActive}
          reminderEnabled={reminderEnabled}
          recordedNotice={recordedNotice}
        />
      )}
      {tab === "focus" && focusView === "list" && (
        <TaskScreen
          tasks={tasks}
          onToggleTask={toggleTask}
          onStartTask={startTask}
          onAddTask={() => setShowAddTask(true)}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
          onStartFocus={startFocusForToday}
        />
      )}

      {tab === "history" && (
        <History totalMinutes={stats.totalMinutes} minutesByDay={stats.minutesByDay} sessions={stats.historySessions} />
      )}

      {tab === "settings" && (
        <SettingsScreen
          settings={settings}
          onUpdateSettings={setSettings}
          profile={profile}
          accounts={accounts}
          activeAccountId={accountId}
          onSwitchAccount={onSwitchAccount}
          onAddAccount={onAddAccount}
          onDeleteAccount={onDeleteAccount}
          onChangeTheme={changeTheme}
          audio={audio}
        />
      )}

      <Navbar
        active={tab}
        locked={dndActive}
        onChange={(next) => {
          if (dndActive && next !== "focus") return;
          if (next === "focus") setFocusView(timer.isRunning ? "timer" : "list");
          setTab(next);
        }}
      />

      {showAddTask && <AddTaskModal onCancel={() => setShowAddTask(false)} onSave={addTask} />}
      {themeFx && <ThemeTransition target={themeFx.target} stage={themeFx.stage} />}
    </div>
  );
}
