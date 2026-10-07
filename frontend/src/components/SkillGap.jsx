import { AlertCircle, ArrowUpRight, Flame, ShieldAlert, Sparkles } from "lucide-react"

function SkillGap({ analysis }) {
  if (!analysis) return null

  const criticalGaps = analysis.critical_gaps || []
  const recommendations = analysis.recommendations || []

  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case "critical":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-bold text-rose-700 uppercase tracking-wider">
            <Flame size={12} className="text-rose-600" /> Critical
          </span>
        )
      case "important":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
            <ShieldAlert size={12} className="text-amber-600" /> Important
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
            Nice to Have
          </span>
        )
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Skill Gaps & Prioritized Action Plan
          </h2>
          <p className="text-xs text-slate-500">
            Actionable skill deficits categorized by job priority with anti-hallucination guidance
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Missing Skills with Priority & Action */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Identified Gaps ({criticalGaps.length})
          </h3>

          <div className="space-y-3">
            {criticalGaps.length === 0 ? (
              <div className="rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 border border-emerald-100">
                🎉 No critical skill gaps found! Your profile covers all key requirements.
              </div>
            ) : (
              criticalGaps.map((gap, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-rose-100 bg-rose-50/30 p-4 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{gap.skill}</span>
                    {getPriorityBadge(gap.priority)}
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {gap.reason}
                  </p>
                  {gap.action && (
                    <div className="rounded-lg bg-white/80 border border-rose-200/50 p-2.5 text-[11px] font-medium text-slate-800 flex items-start gap-1.5">
                      <Sparkles size={13} className="text-rose-500 shrink-0 mt-0.5" />
                      <span>{gap.action}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Recruiter & Career Recommendations
          </h3>

          <div className="space-y-2.5">
            {recommendations.length > 0 ? (
              recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 text-xs text-slate-700"
                >
                  <ArrowUpRight size={15} className="text-indigo-600 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{rec}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No immediate recommendations generated.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillGap
