function MetricCard({
  title,
  value,
  description,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-3xl font-black text-slate-900 tracking-tight">
            {value}
          </p>

          <p className="mt-1 text-[11px] font-medium text-slate-500">
            {description}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg font-bold text-slate-700">
          {icon}
        </div>
      </div>
    </div>
  )
}

export default MetricCard
