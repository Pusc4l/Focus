import { useState } from "react";
import { UserCircle2, Plus, Check, Trash2 } from "lucide-react";
import { Backdrop, ConfirmModal } from "./Modals";

const FADE_MS = 320;

export function AccountSwitcherModal({ accounts, activeAccountId, onSelect, onAddNew, onDelete, onClose }) {
  const [pendingDelete, setPendingDelete] = useState(null); // account awaiting confirmation
  const [blockedActive, setBlockedActive] = useState(null); // active account the user tried to delete
  const [removingId, setRemovingId] = useState(null); // account currently fading out

  function handleTrash(acc) {
    if (acc.id === activeAccountId) setBlockedActive(acc);
    else setPendingDelete(acc);
  }

  // Play the fade-out first, then actually remove the account + its data.
  function confirmDelete() {
    const target = pendingDelete;
    setPendingDelete(null);
    setRemovingId(target.id);
    setTimeout(() => {
      onDelete(target.id);
      setRemovingId(null);
    }, FADE_MS);
  }

  return (
    <>
      <Backdrop onClose={onClose}>
        <div className="bg-white rounded-t-3xl p-6 pb-8 max-h-[80vh] overflow-y-auto animate-fadeInUp">
          <h3 className="font-display font-bold text-lg text-ink mb-1">Profil Saya</h3>
          <p className="text-sm text-navy/60 mb-4">Akun yang pernah masuk di perangkat ini.</p>

          <div className="mb-5">
            {accounts.map((acc) => {
              const isActive = acc.id === activeAccountId;
              const isRemoving = acc.id === removingId;
              return (
                <div
                  key={acc.id}
                  style={{ transitionDuration: `${FADE_MS}ms` }}
                  className={`overflow-hidden transition-all ease-out ${
                    isRemoving ? "max-h-0 mb-0 opacity-0 -translate-x-6 scale-95" : "max-h-24 mb-2 opacity-100 translate-x-0 scale-100"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 rounded-xl p-2 pl-3 transition-colors ${
                      isActive ? "bg-navy text-white" : "bg-mist text-ink"
                    }`}
                  >
                    <button
                      onClick={() => onSelect(acc.id)}
                      className="flex flex-1 items-center gap-3 min-w-0 py-1 text-left"
                    >
                      <UserCircle2 size={30} className={isActive ? "text-white" : "text-navy/50"} />
                      <span className="flex-1 min-w-0">
                        <span className="block font-semibold text-sm truncate">{acc.name}</span>
                        <span className={`block text-xs ${isActive ? "text-white/70" : "text-navy/50"}`}>
                          {acc.category}
                          {isActive && " · Aktif"}
                        </span>
                      </span>
                      {isActive && <Check size={18} className="shrink-0" />}
                    </button>
                    <button
                      onClick={() => handleTrash(acc)}
                      aria-label={`Hapus akun ${acc.name}`}
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all active:scale-90 ${
                        isActive ? "bg-white/15 text-white/60 hover:bg-white/25" : "bg-danger/10 text-danger hover:bg-danger/20"
                      }`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={onAddNew}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full border-2 border-dashed border-navy/30 text-navy font-semibold"
          >
            <Plus size={18} /> Tambah User
          </button>
        </div>
      </Backdrop>

      {pendingDelete && (
        <ConfirmModal
          title="Hapus Akun?"
          message={`Akun "${pendingDelete.name}" beserta seluruh tugas, pengaturan, dan riwayat sesinya akan dihapus permanen dan tidak bisa dikembalikan.`}
          confirmLabel="Hapus Akun"
          onCancel={() => setPendingDelete(null)}
          onConfirm={confirmDelete}
        />
      )}

      {blockedActive && (
        <ConfirmModal
          title="Akun Aktif Tidak Bisa Dihapus"
          message={`"${blockedActive.name}" sedang dipakai. Ganti ke akun lain terlebih dahulu, lalu hapus akun ini dari daftar.`}
          confirmLabel="Mengerti"
          danger={false}
          hideCancel
          onCancel={() => setBlockedActive(null)}
          onConfirm={() => setBlockedActive(null)}
        />
      )}
    </>
  );
}
