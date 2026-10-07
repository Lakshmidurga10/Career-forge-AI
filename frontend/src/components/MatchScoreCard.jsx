function MatchScoreCard({ score }) {
  const safeScore = Math.round(score || 0)
  const scoreColor =
    safeScore >= 75
      ? "text-emerald-600 border-emerald-500"
      : safeScore >= 50
      ? "text-amber-600 border-amber-500"
      : "text-rose-600 border-rose-500"

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Overall Job Match Fit
          </p>
          <p className="mt-2 text-4xl font-black text-slate-900">
            {safeScore}%
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            {safeScore >= 75
              ? "High candidate alignment"
              : safeScore >= 50
              ? "Moderate fit with bridgeable gaps"
              : "Substantial upskilling required"}
          </p>
        </div>

        <div className={`flex h-20 w-20 items-center justify-center rounded-full border-4 bg-slate-50 ${scoreColor}`}>
          <span className="text-xl font-black">
            {safeScore}
          </span>
        </div>
      </div>

      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100 border border-slate-200/60">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-1000"
          style={{ width: `${safeScore}%` }}
        />
      </div>
    </div>
  )
}

export default MatchScoreCard
