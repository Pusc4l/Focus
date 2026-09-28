import { Clock3 } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function TotalFocusCard({ totalMinutes }) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return (
    <div className="bg-card-grad rounded-2xl p-5 text-oncard shadow-soft">
      <p className="text-sm opacity-90">Total Waktu Fokus</p>
      <p className="font-display text-3xl font-bold mt-1">
        {hours} Jam {minutes} Menit
      </p>
      <p className="text-xs opacity-80 mt-1">Pencapaian Bulan Ini ↗</p>
    </div>
  );
}

export function WeeklyChart({ minutesByDay }) {
  const max = Math.max(...minutesByDay, 30);
  const width = 300;
  const height = 100;
  const step = width / (minutesByDay.length - 1);
  const points = minutesByDay.map((m, i) => [i * step, 14 + (height - 14) - (m / max) * (height - 14)]);
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
      <p className="font-semibold text-ink mb-3">Grafik Fokus Mingguan</p>
      <svg viewBox={`-8 0 ${width + 16} ${height + 6}`} className="w-full h-32 overflow-visible">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "rgb(var(--c-ember))", stopOpacity: 0.35 }} />
            <stop offset="100%" style={{ stopColor: "rgb(var(--c-sage))", stopOpacity: 0.05 }} />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaFill)" />
        <path d={linePath} fill="none" strokeWidth="2.5" strokeLinejoin="round" style={{ stroke: "rgb(var(--c-ember))" }} />
        {points.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={minutesByDay[i] > 0 ? 4 : 2.5} style={{ fill: "rgb(var(--c-ember))" }} opacity={minutesByDay[i] > 0 ? 1 : 0.35} />
            {minutesByDay[i] > 0 && (
              <text x={x} y={y - 8} textAnchor="middle" fontSize="10" fontWeight="600" fill="#2B3050">
                {minutesByDay[i]}m
              </text>
            )}
          </g>
        ))}
      </svg>
      <div className="flex justify-between text-xs text-navy/50 mt-1">
        {DAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}

export function SessionHistoryList({ sessions }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
      <p className="font-semibold text-ink mb-3">Riwayat Sesi Terakhir</p>
      <div className="flex flex-col divide-y divide-black/5">
        {sessions.length === 0 && <p className="text-sm text-navy/50 py-4">Belum ada sesi tercatat.</p>}
        {sessions.slice(0, 6).map((s) => (
          <div key={s.id} className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-ink text-sm">
                {s.label} - {s.durationMinutes}m
              </p>
              <p className="text-xs text-navy/50">{s.timestamp}</p>
            </div>
            <Clock3 size={18} className="text-navy/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
