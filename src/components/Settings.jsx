import { ChevronRight } from "lucide-react";

export function SettingsSection({ title, children }) {
  return (
    <div className="mb-6">
      <p className="text-sm font-bold text-ink/80 mb-2 px-1 drop-shadow-sm">{title}</p>
      <div className="bg-white rounded-2xl divide-y divide-black/5 overflow-hidden shadow-sm border border-black/5">
        {children}
      </div>
    </div>
  );
}

function RowBody({ icon: Icon, label, value }) {
  return (
    <>
      {Icon && (
        <span className="w-9 h-9 rounded-full bg-mist flex items-center justify-center shrink-0">
          <Icon size={17} className="text-navy" />
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-ink text-sm">{label}</p>
        {value && <p className="text-xs text-navy/60">{value}</p>}
      </div>
    </>
  );
}

// A row is either a tappable link (button + chevron) or a switch row
// (plain div + toggle). They are never nested, so a tap on one row can
// never fire another row's control.
export function SettingsRow({ icon, label, value, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3.5 text-left">
      <RowBody icon={icon} label={label} value={value} />
      <ChevronRight size={18} className="text-navy/30" />
    </button>
  );
}

export function SwitchRow({ icon, label, value, checked, onChange }) {
  return (
    <div className="w-full flex items-center gap-3 px-4 py-3.5">
      <RowBody icon={icon} label={label} value={value} />
      <ToggleSwitch checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

export function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`w-12 h-7 rounded-full transition-colors relative shrink-0 ${checked ? "bg-moss" : "bg-navy/20"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function Stepper({ label, value, unit, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <p className="font-medium text-ink text-sm">{label}</p>
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrease}
          aria-label={`Kurangi ${label}`}
          className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-navy font-semibold"
        >
          −
        </button>
        <span className="w-16 text-center text-sm text-navy/70 tabular-nums">
          {value} {unit}
        </span>
        <button
          onClick={onIncrease}
          aria-label={`Tambah ${label}`}
          className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-navy font-semibold"
        >
          +
        </button>
      </div>
    </div>
  );
}
