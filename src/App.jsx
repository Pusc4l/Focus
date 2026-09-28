import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ACCOUNTS_KEY, ACTIVE_ACCOUNT_KEY, accountDataKey, purgeStaleCache } from "./hooks/useAccounts";
import Splash from "./screens/Splash";
import Onboarding from "./screens/Onboarding";
import ProfileInput from "./screens/ProfileInput";
import MainApp from "./MainApp";

export default function App() {
  const [accounts, setAccounts] = useLocalStorage(ACCOUNTS_KEY, []);
  const [activeAccountId, setActiveAccountId] = useLocalStorage(ACTIVE_ACCOUNT_KEY, null);
  const hasActiveAccount = Boolean(activeAccountId) && accounts.some((a) => a.id === activeAccountId);

  const [stage, setStage] = useState(() => (hasActiveAccount ? "app" : "splash"));
  const [addingNew, setAddingNew] = useState(false);

  // Auto-purge legacy/orphaned localStorage entries once per app load, so
  // the app keeps loading fast even after many accounts come and go.
  useEffect(() => {
    purgeStaleCache();
  }, []);

  function handleSplashDone() {
    setStage(addingNew || !hasActiveAccount ? "onboarding" : "app");
  }

  function handleOnboardingFinish() {
    setStage("profile");
  }

  function handleProfileSubmit({ name, category }) {
    const id = `u${Date.now()}`;
    const newAccount = { id, name, category, createdAt: new Date().toISOString() };
    setAccounts((prev) => [...prev, newAccount]);
    setActiveAccountId(id);
    setAddingNew(false);
    setStage("app");
  }

  function handleAddAccount() {
    setAddingNew(true);
    setStage("splash");
  }

  function handleSwitchAccount(id) {
    setActiveAccountId(id);
  }

  // Removes the account from the list and wipes its stored data. The active
  // account is refused here as a safety net (the UI also blocks it).
  function handleDeleteAccount(id) {
    if (id === activeAccountId) return;
    try {
      localStorage.removeItem(accountDataKey(id));
    } catch (err) {
      console.warn("Failed to clear account data", err);
    }
    setAccounts((prev) => prev.filter((a) => a.id !== id));
  }

  if (stage === "splash") {
    return (
      <div className="app-shell">
        <Splash onDone={handleSplashDone} />
      </div>
    );
  }

  if (stage === "onboarding") {
    return (
      <div className="app-shell">
        <Onboarding onFinish={handleOnboardingFinish} />
      </div>
    );
  }

  if (stage === "profile") {
    return (
      <div className="app-shell">
        <ProfileInput onSubmit={handleProfileSubmit} />
      </div>
    );
  }

  if (!hasActiveAccount) {
    // Defensive fallback — should not happen, but never render a broken
    // shell if account bookkeeping ever gets out of sync.
    return (
      <div className="app-shell">
        <ProfileInput onSubmit={handleProfileSubmit} />
      </div>
    );
  }

  const activeProfile = accounts.find((a) => a.id === activeAccountId);

  return (
    <MainApp
      key={activeAccountId}
      accountId={activeAccountId}
      profile={activeProfile}
      accounts={accounts}
      onSwitchAccount={handleSwitchAccount}
      onAddAccount={handleAddAccount}
      onDeleteAccount={handleDeleteAccount}
    />
  );
}
