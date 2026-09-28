import { useState } from "react";
import { Plus } from "lucide-react";
import { TaskCard, EmptyTaskState } from "../components/TaskList";
import { AddTaskModal, ConfirmModal } from "../components/Modals";

const FILTERS = ["Semua", "Belum Selesai", "Selesai"];

export default function TaskScreen({ tasks, onToggleTask, onStartTask, onAddTask, onEditTask, onDeleteTask, onStartFocus }) {
  const [filter, setFilter] = useState("Semua");
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const filtered = tasks.filter((t) => {
    if (filter === "Belum Selesai") return !t.done;
    if (filter === "Selesai") return t.done;
    return true;
  });

  return (
    <div className="h-full bg-warm-grad px-5 pt-14 pb-24 overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-2xl font-bold text-ink">Daftar Tugas Hari Ini</h1>
        <button
          onClick={onAddTask}
          className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shrink-0"
          aria-label="Tambah tugas"
        >
          <Plus size={20} className="text-white" />
        </button>
      </div>
      <p className="text-navy/60 text-sm mb-4">{tasks.length} Tugas Menanti</p>

      <div className="flex gap-2 mb-5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              filter === f ? "bg-navy text-white" : "bg-white/60 text-navy/60"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <EmptyTaskState onAdd={onAddTask} />
      ) : filtered.length === 0 ? (
        <EmptyTaskState
          title="Tidak Ada Tugas di Sini"
          body="Tidak ada tugas yang cocok dengan filter ini."
          showRetry
          onRetry={() => setFilter("Semua")}
          onAdd={onAddTask}
        />
      ) : (
        <>
          <button onClick={onStartFocus} className="w-full bg-navy text-white font-semibold py-3.5 rounded-full mb-4">
            Mulai Sesi Fokus
          </button>
          <div className="flex flex-col gap-3">
            {filtered.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onToggle={onToggleTask}
                onStart={onStartTask}
                onEdit={setEditingTask}
                onDelete={setDeletingTask}
              />
            ))}
          </div>
        </>
      )}

      {editingTask && (
        <AddTaskModal
          task={editingTask}
          onCancel={() => setEditingTask(null)}
          onSave={(updated) => {
            onEditTask(updated);
            setEditingTask(null);
          }}
        />
      )}

      {deletingTask && (
        <ConfirmModal
          title="Hapus Tugas?"
          message={`"${deletingTask.title}" akan dihapus permanen dari daftar tugas.`}
          confirmLabel="Hapus"
          onCancel={() => setDeletingTask(null)}
          onConfirm={() => {
            onDeleteTask(deletingTask.id);
            setDeletingTask(null);
          }}
        />
      )}
    </div>
  );
}
