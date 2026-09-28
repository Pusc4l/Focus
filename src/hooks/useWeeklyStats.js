import { useMemo } from "react";

// Local calendar date (YYYY-MM-DD). Using toISOString() would give the UTC
// date and flip the "day" at 07:00 in WIB, so build it from local parts.
export function isoDate(d = new Date()) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function parseLocal(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function startOfWeek(d = new Date()) {
  const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const mondayIndex = (copy.getDay() + 6) % 7; // 0=Mon..6=Sun
  copy.setDate(copy.getDate() - mondayIndex);
  return { date: copy, mondayIndex };
}

// Progress is computed from the dated session log on every render, so a new
// day/week starts empty by itself, with no stored counter to reset.
export function useWeeklyStats(sessions) {
  return useMemo(() => {
    const focusSessions = sessions.filter((s) => s.phase === "focus");
    const today = isoDate();
    const { date: weekStart, mondayIndex } = startOfWeek();

    const minutesByDay = Array(7).fill(0);
    const activeDays = Array(7).fill(false);
    focusSessions.forEach((s) => {
      const diff = Math.round((parseLocal(s.dateISO) - weekStart) / 86400000);
      if (diff >= 0 && diff < 7) {
        minutesByDay[diff] += s.durationMinutes;
        activeDays[diff] = true;
      }
    });

    return {
      sessionsToday: focusSessions.filter((s) => s.dateISO === today).length,
      weekStatus: activeDays.map((a, i) => (i === mondayIndex ? "today" : a ? "done" : "upcoming")),
      minutesByDay,
      totalMinutes: focusSessions.reduce((sum, s) => sum + s.durationMinutes, 0),
      historySessions: focusSessions,
    };
  }, [sessions]);
}
