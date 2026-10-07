import { HelpCircle, Award, CheckCircle2 } from "lucide-react"

function ExplainableScore({ report }) {
  if (!report) return null

  return (
    <div className="space-y-6">
      {/* Overall Explanation Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex items-center gap-2">
          <HelpCircle size={16} className="text-indigo-600" />
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Explainable AI Reasoning
          </p>
        </div>

        <h2 className="mt-2 text-xl font-black text-slate-900 leading-snug">
          Why this match score?
        </h2>

        <p className="mt-2 text-xs leading-relaxed text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 font-medium">
          {report.overall_explanation}
        </p>
      </div>

      {/* Multi-Factor Point Attribution */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-5">
          Scoring Signal Attribution
        </h3>

        <div className="space-y-3.5">
          {report.score_explanations.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition hover:bg-slate-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    {item.factor}
                  </p>
                  <span
                    className={`inline-block mt-0.5 rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                      item.status === "Strong" || item.status === "Relevant"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <span className="text-lg font-black text-slate-900">
                  {item.contribution.toFixed(1)} <span className="text-xs font-normal text-slate-400">pts</span>
                </span>
              </div>

              <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExplainableScore
