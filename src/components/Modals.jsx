import { useState } from "react";
import { X } from "lucide-react";
import { OwlSleeping } from "../data/mascots";

export function Backdrop({ children, onClose }) {
  return (
    <div className="absolute inset-0 z-30 flex items-end justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

// Generic bottom-sheet confirmation, reused for "stop session" and
// "delete task" so both flows share one consistent, accessible pattern.
export function ConfirmModal({ title, message, confirmLabel = "Ya", cancelLabel = "Batal", danger = true, hideCancel = false, onCancel, onConfirm }) {
  return (
    <Backdrop onClose={onCancel}>
      <div className="bg-white rounded-t-3xl sm:rounded-3xl sm:m-6 p-6 mx-3 mb-6 animate-fadeInUp">
        <h3 className="font-display font-bold text-lg text-ink mb-2">{title}</h3>
        <p className="text-sm text-navy/60 mb-6">{message}</p>
        <div className="flex gap-3">
          {!hideCancel && (
            <button onClick={onCancel} className="flex-1 py-3 rounded-full bg-mist text-navy font-semibold">
              {cancelLabel}
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 rounded-full text-white font-semibold ${danger ? "bg-danger" : "bg-navy"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

export function SessionCompleteModal({ minutes, onStartBreak, onClose }) {
  return (
    <Backdrop onClose={onClose}>
      <div className="bg-white rounded-t-3xl sm:rounded-3xl sm:m-6 p-6 mx-3 mb-6 text-center animate-fadeInUp">
        <OwlSleeping className="w-24 h-24 mx-auto mb-2 animate-float" />
        <h3 className="font-display font-bold text-xl text-ink mb-1">Hebat! {minutes} Menit Fokus Selesai.</h3>
        <p className="text-sm text-navy/60 mb-6">Saatnya mengisi ulang energi dengan istirahat.</p>
        <button onClick={onStartBreak} className="w-full py-3.5 rounded-full bg-navy text-white font-semibold">
          Mulai Istirahat
        </button>
      </div>
    </Backdrop>
  );
}

const PRIORITIES = ["Penting", "Pending", "Santai"];

// Handles both creating a new task and editing an existing one — pass
// `task` to pre-fill the form and switch the button/title to edit mode.
export function AddTaskModal({ task, onCancel, onSave }) {
  const isEdit = Boolean(task);
  const [title, setTitle] = useState(task?.title ?? "");
  const [sessions, setSessions] = useState(task?.estimatedSessions ?? 2);
  const [priority, setPriority] = useState(task?.priority ?? "Penting");

  function handleSave() {
    if (!title.trim()) return;
    onSave({ id: task?.id, title: title.trim(), estimatedSessions: sessions, priority });
  }

  return (
    <Backdrop onClose={onCancel}>
      <div className="bg-white rounded-t-3xl p-6 pb-8 animate-fadeInUp">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg text-ink">{isEdit ? "Edit Tugas" : "Tambah Tugas Baru"}</h3>
          <button onClick={onCancel} aria-label="Tutup">
            <X size={20} className="text-navy/50" />
          </button>
        </div>
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul Tugas..."
          className="w-full bg-mist rounded-xl px-4 py-3 text-sm text-ink mb-4 outline-none"
        />
        <p className="text-sm font-medium text-navy/70 mb-2">Estimasi Pomodoro</p>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => setSessions(n)}
              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-colors ${
                sessions === n ? "bg-navy border-navy text-white" : "border-navy/20 text-navy/60"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="flex gap-2 mb-6">
          {PRIORITIES.map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                priority === p ? "bg-navy text-white" : "bg-mist text-navy/60"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <button onClick={handleSave} className="w-full py-3.5 rounded-full bg-navy text-white font-semibold">
          {isEdit ? "Simpan Perubahan" : "Simpan Tugas"}
        </button>
      </div>
    </Backdrop>
  );
}

export function ToastNotice({ icon: Icon, title, subtitle, actions, onClose }) {
  return (
    <div className="absolute top-4 left-3 right-3 z-40 bg-white/90 backdrop-blur-md rounded-2xl p-3.5 shadow-soft flex items-start gap-3 animate-fadeInUp">
      <span className="w-9 h-9 rounded-full bg-mist flex items-center justify-center shrink-0">
        <Icon size={18} className="text-navy" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-ink">{title}</p>
        {subtitle && <p className="text-xs text-navy/60">{subtitle}</p>}
        {actions && <div className="flex gap-2 mt-2">{actions}</div>}
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="Tutup notifikasi">
          <X size={16} className="text-navy/40" />
        </button>
      )}
    </div>
  );
}
