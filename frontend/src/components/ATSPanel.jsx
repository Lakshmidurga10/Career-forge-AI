function ATSPanel({ analysis }) {
  const ats = analysis?.ats_analysis

  if (!ats) return null

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-5 border-b border-slate-100 pb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Resume Intelligence
        </p>

        <h3 className="mt-1 text-xl font-bold text-slate-900">
          ATS Compatibility
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-8 border-indigo-500 bg-white shadow-sm">
          <div className="text-center">
            <p className="text-2xl font-black text-slate-900">
              {ats.ats_score}%
            </p>

            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              ATS Match
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <p className="text-xs font-semibold text-slate-700">
            <span className="font-bold text-emerald-600">{ats.matched_keywords?.length || 0}</span> job keywords detected in your profile.
          </p>

          <div className="flex flex-wrap gap-2">
            {(ats.matched_keywords || [])
              .slice(0, 10)
              .map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-lg bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700"
                >
                  ✓ {keyword}
                </span>
              ))}
          </div>

          {ats.missing_keywords && ats.missing_keywords.length > 0 && (
            <p className="text-[11px] text-slate-400 font-medium">
              Missing keywords ({ats.missing_keywords.length}): {ats.missing_keywords.slice(0, 4).join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ATSPanel
