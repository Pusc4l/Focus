import { useState } from "react";
import { CloudRain, Bell, Moon, User, Palette, Info, Download } from "lucide-react";
import { SettingsSection, SettingsRow, SwitchRow, ActionRow, Stepper } from "../components/Settings";
import { InstallHelpSheet } from "../components/InstallHelp";
import { SoundMixerPanel } from "../components/SoundMixerPanel";
import { AccountSwitcherModal } from "../components/AccountSwitcher";
import { ThemePicker } from "../components/ThemePicker";
import AboutScreen from "./AboutScreen";
import { OwlLogo } from "../data/mascots";
import { themeLabel } from "../data/themes";
import { requestNotifyPermission } from "../utils/notify";

export default function SettingsScreen({
  settings,
  onUpdateSettings,
  profile,
  accounts,
  activeAccountId,
  onSwitchAccount,
  onAddAccount,
  onDeleteAccount,
  onChangeTheme,
  pwa,
  audio,
}) {
  const [showMixer, setShowMixer] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const update = (patch) => onUpdateSettings({ ...settings, ...patch });

  if (showAbout) return <AboutScreen onBack={() => setShowAbout(false)} />;

  // Native install dialog when the browser offered it; otherwise show manual steps.
  async function handleInstall() {
    if (pwa.canInstall) await pwa.promptInstall();
    else setShowInstallHelp(true);
  }

  function toggleNotifications(on) {
    update({ notificationsEnabled: on });
    if (on) requestNotifyPermission();
  }

  return (
    <div className="h-full bg-warm-grad px-5 pt-14 pb-24 overflow-y-auto no-scrollbar">
      <h1 className="font-display text-2xl font-bold text-ink text-center mb-6 drop-shadow-sm">Pengaturan</h1>

      <SettingsSection title="Timer Pomodoro">
        <Stepper
          label="Durasi Fokus"
          value={settings.focusMinutes}
          unit="Menit"
          onDecrease={() => update({ focusMinutes: Math.max(5, settings.focusMinutes - 5) })}
          onIncrease={() => update({ focusMinutes: Math.min(60, settings.focusMinutes + 5) })}
        />
        <Stepper
          label="Istirahat Pendek"
          value={settings.shortBreakMinutes}
          unit="Menit"
          onDecrease={() => update({ shortBreakMinutes: Math.max(1, settings.shortBreakMinutes - 1) })}
          onIncrease={() => update({ shortBreakMinutes: Math.min(15, settings.shortBreakMinutes + 1) })}
        />
        <Stepper
          label="Istirahat Panjang"
          value={settings.longBreakMinutes}
          unit="Menit"
          onDecrease={() => update({ longBreakMinutes: Math.max(10, settings.longBreakMinutes - 5) })}
          onIncrease={() => update({ longBreakMinutes: Math.min(30, settings.longBreakMinutes + 5) })}
        />
        <Stepper
          label="Siklus Istirahat"
          value={settings.cyclesBeforeLongBreak}
          unit="Sesi"
          onDecrease={() => update({ cyclesBeforeLongBreak: Math.max(2, settings.cyclesBeforeLongBreak - 1) })}
          onIncrease={() => update({ cyclesBeforeLongBreak: Math.min(8, settings.cyclesBeforeLongBreak + 1) })}
        />
      </SettingsSection>

      <SettingsSection title="Suara & Notifikasi">
        <SettingsRow icon={CloudRain} label="Suara Ambient" value="Atur mix suara" onClick={() => setShowMixer(true)} />
        <SwitchRow
          icon={Bell}
          label="Notifikasi Selesai"
          value={settings.notificationsEnabled ? "Aktif — pengingat & notifikasi sesi selesai" : "Nonaktif"}
          checked={settings.notificationsEnabled}
          onChange={toggleNotifications}
        />
        <SwitchRow
          icon={Moon}
          label="Mode Jangan Ganggu"
          value={settings.dndDuringFocus ? "Aktif — tab & pengingat dikunci saat fokus" : "Nonaktif"}
          checked={settings.dndDuringFocus}
          onChange={(v) => update({ dndDuringFocus: v })}
        />
      </SettingsSection>

      <SettingsSection title="Akun & Lainnya">
        <SettingsRow icon={User} label="Profil Saya" value={`${profile.name} · ${profile.category}`} onClick={() => setShowAccounts(true)} />
        <SettingsRow icon={Palette} label="Tema Aplikasi" value={themeLabel(settings.theme)} onClick={() => setShowThemes(true)} />
        <ActionRow
          icon={Download}
          label="Install Aplikasi (PWA)"
          value={pwa.installed ? "Focus sudah ada di layar utama" : "Pasang ke layar utama HP"}
          actionLabel="Install"
          done={pwa.installed}
          onAction={handleInstall}
        />
        <SettingsRow icon={Info} label="Tentang Kami" value="Versi 1.0.1" onClick={() => setShowAbout(true)} />
      </SettingsSection>

      <div className="flex justify-center mt-4 opacity-70">
        <OwlLogo className="w-10 h-10" />
      </div>

      {showMixer && (
        <SoundMixerPanel
          levels={settings.mixLevels}
          masterVolume={settings.masterVolume}
          activeTracks={audio.activeTracks}
          error={audio.error}
          onToggleTrack={audio.toggleTrack}
          onLevelChange={(key, val) => update({ mixLevels: { ...settings.mixLevels, [key]: val } })}
          onMasterChange={(val) => update({ masterVolume: val })}
          onClose={() => setShowMixer(false)}
        />
      )}

      {showInstallHelp && <InstallHelpSheet ios={pwa.ios} onClose={() => setShowInstallHelp(false)} />}

      {showThemes && (
        <ThemePicker
          current={settings.theme}
          onClose={() => setShowThemes(false)}
          onSelect={(key) => {
            setShowThemes(false);
            onChangeTheme(key);
          }}
        />
      )}

      {showAccounts && (
        <AccountSwitcherModal
          accounts={accounts}
          activeAccountId={activeAccountId}
          onSelect={(id) => {
            setShowAccounts(false);
            onSwitchAccount(id);
          }}
          onAddNew={() => {
            setShowAccounts(false);
            onAddAccount();
          }}
          onDelete={onDeleteAccount}
          onClose={() => setShowAccounts(false)}
        />
      )}
    </div>
  );
}
