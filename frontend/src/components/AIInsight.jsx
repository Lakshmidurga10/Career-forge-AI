import { Sparkles } from "lucide-react"

function AIInsight({ analysis }) {
  if (!analysis) {
    return null
  }

  return (
    <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/70 to-violet-50/70 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
          <Sparkles size={18} className="text-amber-300" />
        </div>

        <div>
          <h2 className="text-sm font-bold text-indigo-950">
            AI Career Intelligence Synthesis
          </h2>

          <p className="mt-1 text-xs leading-relaxed text-slate-700">
            Candidate profile is classified as <strong className="text-indigo-900 font-bold">{analysis.career_level}</strong> with an overall fit of <strong className="text-indigo-900 font-bold">{analysis.match_score}%</strong>. Focus first on your {analysis.critical_gaps?.length || 0} critical skill gaps before targeting top-tier interview panels.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AIInsight
