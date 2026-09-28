import { OwlSleeping } from "../data/mascots";
import { TotalFocusCard, WeeklyChart, SessionHistoryList } from "../components/Statistics";

export default function History({ totalMinutes, minutesByDay, sessions }) {
  return (
    <div className="h-full bg-warm-grad px-5 pt-14 pb-24 overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-2xl font-bold text-ink">Ringkasan Mingguan</h1>
        <OwlSleeping className="w-12 h-12" />
      </div>
      <div className="flex flex-col gap-4">
        <TotalFocusCard totalMinutes={totalMinutes} />
        <WeeklyChart minutesByDay={minutesByDay} />
        <SessionHistoryList sessions={sessions} />
      </div>
    </div>
  );
}
