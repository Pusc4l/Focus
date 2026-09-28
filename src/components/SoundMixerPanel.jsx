import { CloudRain, Wind, Waves, Flame, Volume2 } from "lucide-react";
import { Backdrop } from "./Modals";
import { TRACKS } from "../hooks/useAmbientAudio";

const ICONS = { rain: CloudRain, forest: Wind, wave: Waves, fire: Flame };

export function SoundMixerPanel({ levels, masterVolume, activeTracks, error, onLevelChange, onMasterChange, onToggleTrack, onClose }) {
  return (
    <Backdrop onClose={onClose}>
      <div className="bg-white rounded-t-3xl p-6 pb-8 max-h-[85vh] overflow-y-auto animate-fadeInUp">
        <h3 className="font-display font-bold text-lg text-ink mb-1">Layer Ambient Sound</h3>
        <p className="text-sm text-navy/60 mb-4">Mix & match suara favorit kamu untuk fokus yang lebih baik.</p>
        <div className="flex flex-col gap-3 mb-4">
          {TRACKS.map((t) => {
            const Icon = ICONS[t.key];
            const isActive = activeTracks.has(t.key);
            return (
              <div key={t.key} className={`rounded-xl p-3 transition-colors ${isActive ? "bg-clay/10" : "bg-mist"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <button
                    onClick={() => onToggleTrack(t.key)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? "bg-navy text-white" : "bg-white text-navy/60"
                    }`}
                    aria-pressed={isActive}
                    aria-label={`Putar ${t.mixLabel}`}
                  >
                    <Icon size={15} />
                  </button>
                  <span className="text-sm font-semibold text-ink flex-1">{t.mixLabel}</span>
                  <span className="text-xs text-navy/50 tabular-nums">{levels[t.key] ?? 0}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={levels[t.key] ?? 0}
                  onChange={(e) => onLevelChange(t.key, Number(e.target.value))}
                  className="w-full accent-navy"
                />
                <p className="text-xs text-navy/50 mt-1">{t.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="mb-6 bg-mist rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Volume2 size={16} className="text-navy" />
            <span className="text-sm font-semibold text-ink flex-1">Total Volume</span>
            <span className="text-xs text-navy/50 tabular-nums">{masterVolume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={masterVolume}
            onChange={(e) => onMasterChange(Number(e.target.value))}
            className="w-full accent-ember"
          />
          <p className="text-xs text-navy/50 mt-1">
            Master independen — tidak membatasi persentase tiap suara, hanya mengatur volume keseluruhan.
          </p>
        </div>
        {error && (
          <p className="text-xs text-danger font-medium mb-3" role="alert">
            {error}
          </p>
        )}
        <button onClick={onClose} className="w-full py-3.5 rounded-full bg-navy text-white font-semibold">
          Simpan Mix
        </button>
      </div>
    </Backdrop>
  );
}
