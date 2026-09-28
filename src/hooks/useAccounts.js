// Multi-account bookkeeping. Each account's own data (tasks/settings/sessions)
// lives in its own namespaced localStorage key, so switching accounts never
// overwrites another account's data.

export const ACCOUNTS_KEY = "focus.accounts";
export const ACTIVE_ACCOUNT_KEY = "focus.activeAccountId";
const LEGACY_KEYS = ["focus.stage", "focus.tasks", "focus.settings", "focus.sessions"];
const MAX_SESSIONS_KEPT = 200;

export function accountDataKey(accountId) {
  return `focus.account.${accountId}.data`;
}

// Runs once per app load: drops legacy single-account keys from older builds
// and any per-account data whose account no longer exists, so storage stays
// small and the app keeps loading fast.
export function purgeStaleCache() {
  try {
    LEGACY_KEYS.forEach((k) => localStorage.removeItem(k));

    const rawAccounts = localStorage.getItem(ACCOUNTS_KEY);
    const accounts = rawAccounts ? JSON.parse(rawAccounts) : [];
    const validIds = new Set(accounts.map((a) => a.id));

    Object.keys(localStorage)
      .filter((k) => k.startsWith("focus.account."))
      .forEach((k) => {
        const match = k.match(/^focus\.account\.(.+)\.data$/);
        if (match && !validIds.has(match[1])) {
          localStorage.removeItem(k);
        }
      });
  } catch (err) {
    console.warn("purgeStaleCache failed", err);
  }
}

// Caps how much session history a single account can accumulate, keeping
// only the most recent entries so the app stays light over months of use.
export function trimSessions(sessions) {
  return sessions.length > MAX_SESSIONS_KEPT ? sessions.slice(0, MAX_SESSIONS_KEPT) : sessions;
}
