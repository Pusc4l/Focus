import { Plus, Check, Pencil, Trash2, Play } from "lucide-react";
import { OwlEmpty } from "../data/mascots";

const PRIORITY_STYLES = {
  Penting: "text-ember bg-ember/10",
  Pending: "text-navy bg-navy/10",
  Santai: "text-moss bg-moss/10",
};

export function TaskCard({ task, onToggle, onStart, onEdit, onDelete }) {
  return (
    <div className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-black/5 transition-shadow hover:shadow-md">
      <button
        onClick={() => onToggle(task.id)}
        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
          task.done ? "bg-navy border-navy" : "border-navy/30"
        }`}
        aria-label="Tandai selesai"
      >
        {task.done && <Check size={14} className="text-white" />}
      </button>
      <button onClick={() => onStart(task.id)} className="flex-1 min-w-0 text-left" aria-label={`Mulai fokus: ${task.title}`}>
        {task.priority && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority] ?? "text-navy bg-navy/10"}`}>
            {task.priority}
          </span>
        )}
        <p className={`font-semibold text-ink truncate ${task.done ? "line-through opacity-50" : ""}`}>
          {task.title}
        </p>
        <p className="text-xs text-navy/50">
          Target: {task.estimatedSessions} sesi | Selesai: {task.completedSessions} sesi
        </p>
      </button>
      {onStart && (
        <button
          onClick={() => onStart(task.id)}
          className="w-8 h-8 rounded-full bg-navy flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          aria-label="Mulai timer"
        >
          <Play size={13} className="text-white" fill="white" />
        </button>
      )}
      <div className="flex items-center gap-1 shrink-0">
        {onEdit && (
          <button onClick={() => onEdit(task)} className="w-8 h-8 rounded-full bg-mist flex items-center justify-center" aria-label="Edit tugas">
            <Pencil size={14} className="text-navy/60" />
          </button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(task)} className="w-8 h-8 rounded-full bg-danger/10 flex items-center justify-center" aria-label="Hapus tugas">
            <Trash2 size={14} className="text-danger" />
          </button>
        )}
      </div>
    </div>
  );
}

export function HomeTaskPreview({ tasks, onToggle, onStart, onAdd }) {
  const preview = tasks.slice(0, 4);
  return (
    <div className="animate-fadeInUp" style={{ animationDelay: "150ms" }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold text-lg text-ink">Tugas Hari Ini</h3>
        {tasks.length > 0 && <span className="text-xs text-ink/60">Ketuk tugas untuk mulai fokus</span>}
      </div>
      {tasks.length === 0 ? (
        <button
          onClick={onAdd}
          className="w-full bg-white/70 border-2 border-dashed border-navy/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 text-navy/60"
        >
          <Plus size={22} />
          <span className="text-sm font-medium">Belum ada tugas — tambah yang pertama</span>
        </button>
      ) : (
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {preview.map((t) => (
            <div key={t.id} className="min-w-[150px] bg-white rounded-2xl p-4 shadow-sm border border-black/5">
              <button
                onClick={() => onToggle(t.id)}
                aria-label="Tandai selesai"
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mb-3 ${
                  t.done ? "bg-navy border-navy" : "border-navy/30"
                }`}
              >
                {t.done && <Check size={14} className="text-white" />}
              </button>
              <button onClick={() => onStart(t.id)} className="text-left w-full active:scale-[0.98] transition-transform">
                <p className={`font-semibold text-sm text-ink leading-snug ${t.done ? "line-through opacity-50" : ""}`}>
                  {t.title}
                </p>
                <p className="text-xs text-navy/50 mt-1 flex items-center gap-1">
                  <Play size={10} fill="currentColor" /> Focus - {t.estimatedSessions} Sesi
                </p>
              </button>
            </div>
          ))}
          <button
            onClick={onAdd}
            className="min-w-[120px] bg-white/60 border-2 border-dashed border-navy/20 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-navy/60"
          >
            <Plus size={22} />
            <span className="text-xs font-medium">Tambah Tugas Baru</span>
          </button>
        </div>
      )}
    </div>
  );
}

export function EmptyTaskState({ onAdd, title = "Daftar Tugas Kosong!", body, showRetry = false, onRetry }) {
  return (
    <div className="flex flex-col items-center text-center bg-white/70 rounded-2xl p-8 mt-4 animate-fadeInUp">
      <OwlEmpty className="w-24 h-24 mb-4 animate-float" />
      <h3 className="font-display font-bold text-lg text-ink mb-2">{title}</h3>
      <p className="text-sm text-navy/60 mb-5">
        {body ?? "Belum ada tugas yang ditambahkan. Tambahkan tugas baru untuk mulai sesi fokus."}
      </p>
      {showRetry && (
        <button onClick={onRetry} className="w-full bg-navy text-white font-semibold py-3 rounded-full mb-3">
          Coba Lagi
        </button>
      )}
      <button onClick={onAdd} className="w-full bg-navy text-white font-semibold py-3 rounded-full">
        + Tambah Tugas Baru
      </button>
    </div>
  );
}
