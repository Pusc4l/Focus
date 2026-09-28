// Browser notifications are optional: they only fire when the user enabled
// "Notifikasi Selesai", granted permission, and the tab is in the background.
export async function requestNotifyPermission() {
  try {
    if (typeof Notification === "undefined") return "unsupported";
    if (Notification.permission === "default") return await Notification.requestPermission();
    return Notification.permission;
  } catch {
    return "unsupported";
  }
}

export function notify(title, body) {
  try {
    if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
    if (!document.hidden) return; // in-app UI already covers the visible case
    new Notification(title, { body });
  } catch {
    /* ignore */
  }
}
