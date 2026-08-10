"use client";

export default function ProjectMetrics({ metrics = [] }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-3 border-y border-white/[0.08] py-4 my-4">
      {metrics.map((metric, idx) => (
        <div key={idx} className="flex flex-col pr-2 border-r last:border-r-0 border-white/[0.06] min-w-0">
          <span className="text-xl sm:text-2xl font-display font-light text-white tracking-tight truncate">
            {metric.value}
          </span>
          <span className="text-[9px] font-mono tracking-wider text-white/40 uppercase truncate">
            {metric.label}
          </span>
        </div>
      ))}
    </div>
  );
}
