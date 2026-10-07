function SkillGapMatrix({ analysis }) {
  const gaps = analysis?.critical_gaps || []

  const priorityStyle = {
    Critical: "bg-rose-100 text-rose-700 border-rose-200",
    High: "bg-orange-100 text-orange-700 border-orange-200",
    Important: "bg-amber-100 text-amber-700 border-amber-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    "Nice to Have": "bg-slate-100 text-slate-600 border-slate-200",
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Prioritized Gap Analysis
        </p>

        <h3 className="mt-1 text-xl font-bold text-slate-900">
          What you should learn next
        </h3>
      </div>

      <div className="space-y-3">
        {gaps.length === 0 ? (
          <div className="rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 border border-emerald-100">
            🎉 No critical skill gaps identified. Your technical requirements are completely satisfied!
          </div>
        ) : (
          gaps.map((gap, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition hover:bg-slate-50"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {gap.skill}
                  </h4>

                  <p className="mt-1 text-xs text-slate-500">
                    {gap.reason}
                  </p>

                  {gap.action && (
                    <p className="mt-2 text-xs font-semibold text-slate-700 bg-white rounded p-2 border border-slate-200/60 inline-block">
                      → {gap.action}
                    </p>
                  )}
                </div>

                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    priorityStyle[gap.priority] ||
                    priorityStyle["Nice to Have"]
                  }`}
                >
                  {gap.priority}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default SkillGapMatrix
