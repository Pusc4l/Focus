import { useLocalStorage } from "./useLocalStorage";
import { accountDataKey, trimSessions } from "./useAccounts";

export const DEFAULT_SETTINGS = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  cyclesBeforeLongBreak: 4,
  notificationsEnabled: true,
  dndDuringFocus: true,
  mixLevels: { rain: 70, forest: 40, wave: 60, fire: 20 },
  masterVolume: 50,
  theme: "warm",
};

const DEFAULT_DATA = {
  tasks: [],
  settings: DEFAULT_SETTINGS,
  sessions: [],
};

// One localStorage entry per account holds everything that account owns,
// so switching accounts (remounting with a new key) never touches another
// account's tasks, settings, or session history.
export function useAccountData(accountId) {
  const [data, setData] = useLocalStorage(accountDataKey(accountId), DEFAULT_DATA);

  // Cap session history once on load so long-lived accounts stay light.
  const sessions = trimSessions(data.sessions ?? []);

  function setTasks(updater) {
    setData((prev) => ({ ...prev, tasks: typeof updater === "function" ? updater(prev.tasks) : updater }));
  }
  function setSettings(updater) {
    setData((prev) => ({ ...prev, settings: typeof updater === "function" ? updater(prev.settings) : updater }));
  }
  function setSessions(updater) {
    setData((prev) => ({
      ...prev,
      sessions: trimSessions(typeof updater === "function" ? updater(prev.sessions) : updater),
    }));
  }

  return {
    tasks: data.tasks ?? [],
    settings: { ...DEFAULT_SETTINGS, ...data.settings },
    sessions,
    setTasks,
    setSettings,
    setSessions,
  };
}
